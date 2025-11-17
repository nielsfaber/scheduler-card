import { mdiArrowLeft, mdiClose, mdiCogOutline } from "@mdi/js";
import { LitElement, PropertyValues, html } from "lit";
import { customElement, property, state } from "lit/decorators";
import { CardConfig, EditorMode, Schedule, ScheduleEntry } from "../types";
import { EditorDialogStyles } from "../card.styles";
import { localize } from "../localize/localize";
import { HomeAssistant } from "../lib/types";
import { validateSchedule } from "../data/schedule/validate_schedule";
import { GenericDialogParams } from "./generic-dialog";
import { saveSchedule } from "../data/store/save_schedule";
import { handleWebsocketError } from "../data/store/handle_websocket_error";
import { deleteSchedule } from "../data/store/delete_schedule";
import { fireEvent } from "../lib/fire_event";
import { updateSchedule } from "../data/store/update_schedule";
import { fetchScheduleItem } from "../data/store/fetch_item";
import { deepCompare } from "../lib/deep_compare";
import { parseTimeBar } from "../data/time/parse_time_bar";
import { hassLocalize } from "../localize/hassLocalize";
import { convertSchemeToSingle } from "../data/schedule/convert_scheme_to_single";
import { isDefined } from "../lib/is_defined";

import "./scheduler-main-panel";
import "./scheduler-options-panel";
import "./generic-dialog";

export type SchedulerDialogParams = {
  schedule: Schedule;
  cardConfig: CardConfig;
  editItem?: string;
};

@customElement("dialog-scheduler-editor")
export class DialogSchedulerEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: SchedulerDialogParams;

  @property({ type: Boolean, reflect: true }) public large = false;

  @state() schedule!: Schedule;
  @state() selectedEntry: number | null = 0;
  @state() selectedSlot: number | null = null;

  @state() _panel: "main" | "options" = "main";

  @state() _viewMode: EditorMode = EditorMode.Single;
  set viewMode(mode: EditorMode) {
    this._viewMode = mode;

    if (mode == EditorMode.Single) {
      const slotIdx = this.schedule.entries[this.selectedEntry!].slots.findIndex((e) => e.actions.length);
      this.selectedSlot = slotIdx >= 0 ? slotIdx : 1;
    }
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.size == 1 && changedProps.has("hass") && isDefined(this.hass)) return false;
    return true;
  }

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    this.schedule = params.schedule;
    this._panel = "main";
    this.large = false;

    const isTimeSchemeType =
      this.schedule.entries[this.selectedEntry!].slots.filter((e) => e.actions.length && isDefined(e.stop)).length >
        0 ||
      this.schedule.entries[this.selectedEntry!].slots.filter((e) => e.actions.length).length > 1 ||
      this.schedule.entries[this.selectedEntry!].slots.length > 3;

    const slotIdx = this.schedule.entries[this.selectedEntry!].slots.findIndex((e) => e.actions.length);
    this.selectedSlot = slotIdx >= 0 ? slotIdx : null;

    this.viewMode = isTimeSchemeType ? EditorMode.Scheme : this._params?.cardConfig.default_editor || EditorMode.Single;

    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  protected willUpdate(): void {
    (this.hass as any).loadBackendTranslation("config");
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open @closed=${this.closeDialog} .heading=${true} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          ${this._panel == "main"
            ? html`
                <ha-icon-button
                  slot="navigationIcon"
                  dialogAction="cancel"
                  .label=${hassLocalize("ui.dialogs.more_info_control.dismiss", this.hass)}
                  .path=${mdiClose}
                ></ha-icon-button>
                <ha-icon-button
                  slot="actionItems"
                  .label=""
                  .path=${mdiCogOutline}
                  @click=${() => {
                    this._panel = "options";
                  }}
                ></ha-icon-button>
              `
            : html`
                <ha-icon-button
                  slot="navigationIcon"
                  .label=${hassLocalize("ui.dialogs.more_info_control.dismiss", this.hass)}
                  .path=${mdiArrowLeft}
                  @click=${() => {
                    this._panel = "main";
                  }}
                ></ha-icon-button>
              `}
          <span slot="title" @click=${() => (this.large = !this.large)}>
            ${this._params.editItem
              ? this.schedule.name
                ? this.schedule?.name
                : localize("ui.panel.common.default_name", this.hass, "{id}", this._params.editItem)
              : localize("ui.panel.common.new_schedule", this.hass)}
          </span>
        </ha-dialog-header>

        <div class="content">
          ${this._panel == "main"
            ? html`
                <scheduler-main-panel
                  .hass=${this.hass}
                  .config=${this._params.cardConfig}
                  .schedule=${this.schedule}
                  .large=${this.large}
                  @change=${this._updateSchedule}
                  @setViewMode=${this._setViewMode}
                  .viewMode=${this._viewMode}
                  .selectedSlot=${this.selectedSlot}
                >
                </scheduler-main-panel>
              `
            : html`
                <scheduler-options-panel
                  .hass=${this.hass}
                  .config=${this._params.cardConfig}
                  .schedule=${this.schedule}
                  @change=${this._updateSchedule}
                >
                </scheduler-options-panel>
              `}
        </div>

        <div class="buttons">
          <ha-button
            appearance="plain"
            @click=${this._handleDeleteClick}
            variant="danger"
            ?disabled=${!this.schedule.entity_id}
          >
            ${hassLocalize("ui.common.delete", this.hass)}
          </ha-button>
          <ha-button appearance="plain" @click=${this._handleSaveClick}>
            ${hassLocalize("ui.common.save", this.hass)}
          </ha-button>
        </div>
      </ha-dialog>
    `;
  }

  _updateSchedule(ev: CustomEvent) {
    const changedProps = Object.keys(ev.detail);
    if (changedProps.includes("schedule")) {
      const schedule = ev.detail.schedule;
      this.schedule = schedule;
    }
    if (changedProps.includes("selectedSlot")) {
      this.selectedSlot = ev.detail.selectedSlot;
    }
  }

  private async _handleSaveClick(ev: Event) {
    const error = validateSchedule(this.schedule, this.hass, this._params!.cardConfig.customize);
    if (error) {
      await new Promise<boolean>((resolve) => {
        const params: GenericDialogParams = {
          cancel: () => resolve(false),
          confirm: () => resolve(true),
          title: hassLocalize("state_badge.default.error", this.hass),
          description: localize(`ui.panel.editor.validation_errors.${error}`, this.hass),
          primaryButtonLabel: hassLocalize("ui.common.ok", this.hass),
        };

        fireEvent(ev.target as HTMLElement, "show-dialog", {
          dialogTag: "scheduler-generic-dialog",
          dialogImport: () => import("./generic-dialog"),
          dialogParams: params,
        });
      });
    } else if (this.schedule.schedule_id) {
      const oldSchedule = parseTimeBar(await fetchScheduleItem(this.hass, this.schedule.schedule_id!), this.hass);
      //do not save if there are no changes made
      if (deepCompare(this.schedule, oldSchedule)) {
        this.closeDialog();
        return;
      }

      if (!oldSchedule.enabled) {
        const result = await new Promise((resolve) => {
          const params: GenericDialogParams = {
            title: localize("ui.dialog.enable_schedule.title", this.hass),
            description: localize("ui.dialog.enable_schedule.description", this.hass),
            primaryButtonLabel: hassLocalize("ui.common.yes", this.hass),
            secondaryButtonLabel: hassLocalize("ui.common.no", this.hass),
            cancel: () => {
              resolve(false);
            },
            confirm: () => {
              resolve(true);
            },
          };
          fireEvent(ev.target as HTMLElement, "show-dialog", {
            dialogTag: "scheduler-generic-dialog",
            dialogImport: () => import("./generic-dialog"),
            dialogParams: params,
          });
        });
        if (result) this.hass!.callService("switch", "turn_on", { entity_id: oldSchedule.entity_id });
      }

      updateSchedule(this.hass, this.schedule as Schedule & { schedule_id: string })
        .catch((e) => handleWebsocketError(e, this, this.hass))
        .then(() => {
          this.closeDialog();
        });
    } else {
      saveSchedule(this.hass, this.schedule)
        .catch((e) => handleWebsocketError(e, this, this.hass))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  private async _handleDeleteClick(ev: Event) {
    await new Promise<boolean>((resolve) => {
      const params: GenericDialogParams = {
        cancel: () => resolve(false),
        confirm: () => resolve(true),
        title: localize("ui.dialog.confirm_delete.title", this.hass),
        description: localize("ui.dialog.confirm_delete.description", this.hass),
        primaryButtonLabel: hassLocalize("ui.common.ok", this.hass),
        secondaryButtonLabel: hassLocalize("ui.common.cancel", this.hass),
      };

      fireEvent(ev.target as HTMLElement, "show-dialog", {
        dialogTag: "scheduler-generic-dialog",
        dialogImport: () => import("./generic-dialog"),
        dialogParams: params,
      });
    }).then((res) => {
      if (!res) return;
      deleteSchedule(this.hass, this._params!.editItem!)
        .catch((e) => handleWebsocketError(e, this, this.hass))
        .then(() => {
          this.closeDialog();
        });
    });
  }

  _setViewMode(ev: CustomEvent) {
    const viewMode: EditorMode = ev.detail;
    const multipleActionsDefined =
      this.schedule.entries[this.selectedEntry!].slots.filter((e) => e.actions.length).length > 1;

    if (viewMode == EditorMode.Scheme) {
      this.viewMode = viewMode;
      return;
    } else if (viewMode == EditorMode.Single && !multipleActionsDefined) {
      const schedule = {
        ...this.schedule,
        entries: this.schedule.entries.map((e) => {
          let idx = e.slots.findIndex((e) => e.actions.length);
          if (idx < 0) idx = Math.floor(e.slots.length / 2);
          return <ScheduleEntry>{
            ...e,
            slots: e.slots.map((e, i) => (i == idx ? { ...e, stop: undefined } : null)).filter(isDefined),
          };
        }),
      };
      this.schedule = parseTimeBar(schedule, this.hass);
      this.viewMode = viewMode;
      return;
    }

    new Promise<boolean>((resolve) => {
      const params: GenericDialogParams = {
        title: localize("ui.dialog.confirm_migrate.title", this.hass),
        description: localize("ui.dialog.confirm_migrate.description", this.hass),
        primaryButtonLabel: this.hass.localize("ui.common.yes"),
        secondaryButtonLabel: this.hass.localize("ui.common.no"),
        cancel: () => {
          resolve(false);
        },
        confirm: () => {
          resolve(true);
        },
      };

      fireEvent(ev.target as HTMLElement, "show-dialog", {
        dialogTag: "scheduler-generic-dialog",
        dialogImport: () => import("./generic-dialog"),
        dialogParams: params,
      });
    }).then((res: boolean) => {
      if (!res) return;
      this.schedule = convertSchemeToSingle(this.schedule);
      this.viewMode = viewMode;
    });
  }

  static styles = EditorDialogStyles;
}
