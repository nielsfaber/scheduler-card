import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { computeDomain, fireEvent, HomeAssistant } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';
import { Action, CardConfig, EntityElement, ScheduleConfig, Timeslot } from '../types';
import { getLocale, IsDefaultName, isDefined, isEqual, omit, pick } from '../helpers';
import { dialogStyle } from '../styles';
import { deleteSchedule, editSchedule, fetchScheduleItem, handleError, saveSchedule } from '../data/websockets';
import { ETabOptions } from '../const';
import { DialogParams } from '../components/generic-dialog';
import { localize } from '../localize/localize';
import { showDialog } from '../data/custom_dialog';

import './scheduler-editor-entity';
import './scheduler-editor-time';
import './scheduler-editor-options';

export type ScheduleDialogParams = {
  config: CardConfig;
  entities: EntityElement[];
  actions: Action[];
  schedule: ScheduleConfig;
  editItem: string | null;
  cardEmbeddedInPopup: boolean;
};

@customElement('scheduler-editor-dialog')
export class SchedulerEditorDialog extends LitElement {
  public hass!: HomeAssistant;

  @property() _config!: CardConfig;

  @state()
  private _params?: ScheduleDialogParams;

  entities?: EntityElement[];

  actions: Action[] = [];

  schedule?: ScheduleConfig;

  @property()
  editItem: null | string = null;

  @property({ type: Boolean, reflect: true }) public large = false;

  @state() private _currTab: ETabOptions = ETabOptions.Entity;
  _tabs = [ETabOptions.Entity, ETabOptions.Time, ETabOptions.Options];

  cardEmbeddedInPopup?: boolean;

  provideHass(el: any) {
    el.hass = this.hass;
  }

  public async showDialog(params: ScheduleDialogParams): Promise<void> {
    this._params = params;
    this._config = params.config;
    this.entities = params.entities;
    this.actions = params.actions;
    this.schedule = params.schedule;
    this.editItem = params.editItem;
    this.cardEmbeddedInPopup = params.cardEmbeddedInPopup;

    this._currTab = this.editItem !== null ? ETabOptions.Time : ETabOptions.Entity;

    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
    this.large = false;
  }

  render() {
    const useTimeScheme = this.schedule?.timeslots.every(e => e.stop);

    const tabLabel = (tab: ETabOptions) => {
      if (tab == ETabOptions.Entity) return this.hass.localize('ui.components.entity.entity-picker.entity');
      if (tab == ETabOptions.Time) return this.hass.localize('ui.dialogs.helper_settings.input_datetime.time');
      if (tab == ETabOptions.Options) return this.hass.localize('ui.dialogs.helper_settings.input_select.options');
      return tab;
    };

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
          <span slot="title" @click=${this._enlarge}>
            ${this.editItem
              ? this.schedule?.name
                ? this.schedule?.name
                : localize('ui.panel.common.default_name', getLocale(this.hass), '{id}', this.editItem)
              : localize('ui.panel.common.new_schedule', getLocale(this.hass))}
          </span>
        </ha-dialog-header>
        <paper-tabs .selected=${this._tabs.indexOf(this._currTab)} @iron-activate=${this._handleTabChanged}>
          ${this._tabs.map(
            tab => html`
              <paper-tab ?disabled=${tab != ETabOptions.Entity && !this.schedule}>${tabLabel(tab)}</paper-tab>
            `
          )}
        </paper-tabs>
        ${this._currTab == ETabOptions.Entity
          ? html`
              <scheduler-editor-entity
                .hass=${this.hass}
                .config=${this._params.config}
                .entities=${this.entities?.map(e => e.id)}
                .schedule=${this.schedule}
                .actions=${this.actions}
                .cardEmbeddedInPopup=${this.cardEmbeddedInPopup}
                ?editItem=${this.editItem !== null}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-entity>
            `
          : this._currTab == ETabOptions.Time
          ? html`
              <scheduler-editor-time
                .hass=${this.hass}
                .config=${this._params.config}
                .schedule=${this.schedule}
                .entities=${this.entities}
                .actions=${this.actions}
                ?timeslots=${useTimeScheme}
                ?editItem=${this.editItem !== null}
                .large=${this.large}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-time>
            `
          : this._currTab == ETabOptions.Options
          ? html`
              <scheduler-editor-options
                .hass=${this.hass}
                .config=${this._config}
                .schedule=${this.schedule}
                ?editItem=${this.editItem !== null}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-options>
            `
          : ''}
      </ha-dialog>
    `;
  }

  private _handleUpdateParams(ev: CustomEvent): void {
    const changes = ev.detail as {
      schedule?: ScheduleConfig;
      actions?: Action[];
      entities?: EntityElement[];
      tab?: ETabOptions;
    };

    if (changes.schedule) this.schedule = changes.schedule;
    if (changes.actions) this.actions = changes.actions;
    if (changes.entities) this.entities = changes.entities;
    if (changes.tab) this._currTab = changes.tab;
  }

  private _handleTabChanged(ev: CustomEvent): void {
    const oldTab = this._currTab;
    const newTab = this._tabs[ev.detail.selected] as ETabOptions;
    if (newTab != ETabOptions.Time && !this.schedule) {
      ev.preventDefault();
      (ev.target as any).activeIndex = 0;
      return;
    }
    if (newTab === oldTab) return;
    this._currTab = newTab;
  }

  private _enlarge() {
    this.large = !this.large;
  }

  private async _handleSaveClick() {
    if (!this.hass) return;
    let schedule = { ...this.schedule! };

    schedule = {
      ...schedule,
      timeslots: schedule.timeslots
        .map(slot => {
          if (!slot.actions || !slot.actions.length) return null;
          if (slot.actions.some(e => !e.entity_id || computeDomain(e.entity_id || '') == 'notify')) {
            slot = {
              ...slot,
              actions: slot.actions.map(action =>
                !action.entity_id || computeDomain(action.entity_id || '') == 'notify'
                  ? omit(action, 'entity_id')
                  : action
              ),
            };
          }
          if (!slot.stop) slot = omit(slot, 'stop');
          if (!slot.conditions?.length) slot = omit(slot, 'conditions', 'condition_type') as Timeslot;
          return slot;
        })
        .filter(isDefined),
    };

    if (this.editItem) {
      const oldSchedule = await fetchScheduleItem(this.hass, this.editItem);
      if (
        isEqual(omit(schedule, 'timeslots'), omit(pick(oldSchedule, Object.keys(schedule)), 'timeslots')) &&
        schedule.timeslots.length == oldSchedule.timeslots.length &&
        schedule.timeslots.every((slot, i) => isEqual(slot, oldSchedule.timeslots[i]))
      ) {
        // don't save if there are no changes
      } else {
        if (!oldSchedule.enabled) {
          const result = await new Promise(resolve => {
            const params: DialogParams = {
              title: localize('ui.dialog.enable_schedule.title', getLocale(this.hass)),
              description: localize('ui.dialog.enable_schedule.description', getLocale(this.hass)),
              primaryButtonLabel: this.hass.localize('ui.common.yes'),
              secondaryButtonLabel: this.hass.localize('ui.common.no'),
              cancel: () => {
                resolve(false);
              },
              confirm: () => {
                resolve(true);
              },
            };
            showDialog(
              this,
              {
                dialogTag: 'generic-dialog',
                dialogImport: () => import('../components/generic-dialog'),
                dialogParams: params,
              },
              this.cardEmbeddedInPopup
            );
          });
          if (result) this.hass!.callService('switch', 'turn_on', { entity_id: oldSchedule.entity_id });
        }
        if (IsDefaultName(schedule.name)) schedule = { ...schedule, name: '' };
        editSchedule(this.hass, { ...schedule, schedule_id: this.editItem })
          .catch(e => handleError(e, this, this.hass, this.cardEmbeddedInPopup))
          .then(() => {
            this.closeDialog();
          });
      }
    } else {
      saveSchedule(this.hass, schedule)
        .catch(e => handleError(e, this, this.hass, this.cardEmbeddedInPopup))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  private async _handleDeleteClick(ev: Event) {
    if (!this.editItem) return;
    const element = ev.target as HTMLElement;
    const result = await new Promise(resolve => {
      const params: DialogParams = {
        title: localize('ui.dialog.confirm_delete.title', getLocale(this.hass)),
        description: localize('ui.dialog.confirm_delete.description', getLocale(this.hass)),
        primaryButtonLabel: this.hass.localize('ui.dialogs.generic.ok'),
        secondaryButtonLabel: this.hass.localize('ui.dialogs.generic.cancel'),
        cancel: () => {
          resolve(false);
        },
        confirm: () => {
          resolve(true);
        },
      };
      showDialog(
        this,
        {
          dialogTag: 'generic-dialog',
          dialogImport: () => import('../components/generic-dialog'),
          dialogParams: params,
        },
        this.cardEmbeddedInPopup
      );
    });
    if (result) {
      deleteSchedule(this.hass, this.editItem)
        .catch(e => handleError(e, this, this.hass, this.cardEmbeddedInPopup))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      ${dialogStyle}

      paper-tabs {
        --paper-tabs-selection-bar-color: var(--primary-color);
        --paper-tab-ink: var(--primary-color);
        text-transform: uppercase;
        font-size: 0.875rem;
      }
      paper-tab.iron-selected {
        color: var(--primary-color);
      }
    `;
  }
}
