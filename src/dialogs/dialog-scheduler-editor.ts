import { mdiArrowLeft, mdiArrowRight, mdiClose, mdiCog } from "@mdi/js";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators";
import { CardConfig, Schedule } from "../types";
import { EditorDialogStyles } from "../card.styles";
import { localize } from "../localize/localize";
import { HomeAssistant } from "../lib/types";
import { validateSchedule } from "../data/schedule/validate_schedule";
import { GenericDialogParams } from "./generic-dialog";
import { saveSchedule } from "../data/store/save_schedule";
import { handleWebsocketError } from "../data/store/handle_websocket_error";
import { deleteSchedule } from "../data/store/delete_schedule";
import { fireEvent } from "../lib/fire_event";

import './scheduler-main-panel';
import './scheduler-options-panel';
import './generic-dialog';

export type SchedulerDialogParams = {
  schedule: Schedule,
  cardConfig: CardConfig,
  editItem?: string
};

@customElement('dialog-scheduler-editor')
export class DialogSchedulerEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: SchedulerDialogParams;

  @property({ type: Boolean, reflect: true }) public large = false;

  @state() schedule!: Schedule;
  @state() selectedEntry: number | null = 0;
  @state() selectedSlot: number | null = 0;

  @state() _panel: "main" | "options" = "main";

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    this.schedule = params.schedule;
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
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
            .path=${mdiClose}
          ></ha-icon-button>
          <ha-icon-button
            slot="actionItems"
            .label=""
            .path=${this._panel == "main" ? mdiArrowRight : mdiArrowLeft}
            @click=${this._toggleOptionsPanel}
          ></ha-icon-button>

          <span slot="title" @click=${() => this.large = !this.large}>
            ${this._params.editItem
        ? this.schedule.name
          ? this.schedule?.name
          : localize('ui.panel.common.default_name', this.hass, '{id}', this._params.editItem)
        : localize('ui.panel.common.new_schedule', this.hass)
      }
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
          >
          </scheduler-main-panel>
            `
        : html`
          <scheduler-options-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
          >
          </scheduler-options-panel>
        `
      }
        </div>


        <div class="buttons">
          <mwc-button @click=${this._handleSaveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
          <mwc-button @click=${this._handleDeleteClick} class="warning">
            ${this.hass.localize('ui.common.delete')}
          </mwc-button>
        </div>
      </ha-dialog>
    `;

  }



  private _toggleOptionsPanel() {
    this._panel = this._panel == "main" ? "options" : "main";
  }

  private async _handleSaveClick(ev: Event) {
    const error = validateSchedule(this.schedule, this.hass);
    if (error) {
      await new Promise<boolean>(resolve => {
        const params: GenericDialogParams = {
          cancel: () => resolve(false),
          confirm: () => resolve(true),
          title: this.hass.localize('state_badge.default.error'),
          description: localize(`ui.panel.editor.validation_errors.${error}`, this.hass),
          primaryButtonLabel: this.hass.localize('ui.common.ok')
        };

        fireEvent(ev.target as HTMLElement, 'show-dialog', {
          dialogTag: 'scheduler-generic-dialog',
          dialogImport: () => import('./generic-dialog'),
          dialogParams: params,
        });
      });
    }
    else {
      saveSchedule(this.hass, this.schedule)
        .catch(e => handleWebsocketError(e, this, this.hass))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  private async _handleDeleteClick(ev: Event) {
    await new Promise<boolean>(resolve => {
      const params: GenericDialogParams = {
        cancel: () => resolve(false),
        confirm: () => resolve(true),
        title: localize('ui.dialog.confirm_delete.title', this.hass),
        description: localize('ui.dialog.confirm_delete.description', this.hass),
        primaryButtonLabel: this.hass.localize('ui.dialogs.generic.ok'),
        secondaryButtonLabel: this.hass.localize('ui.dialogs.generic.cancel'),
      };

      fireEvent(ev.target as HTMLElement, 'show-dialog', {
        dialogTag: 'scheduler-generic-dialog',
        dialogImport: () => import('./generic-dialog'),
        dialogParams: params,
      });
    })
      .then(res => {
        if (!res) return;
        deleteSchedule(this.hass, this._params!.editItem!)
          .catch(e => handleWebsocketError(e, this, this.hass))
          .then(() => {
            this.closeDialog();
          });
      })
  }

  static styles = EditorDialogStyles;
}