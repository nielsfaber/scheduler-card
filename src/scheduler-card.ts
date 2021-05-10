import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { fireEvent, HomeAssistant, LovelaceCardEditor, computeDomain } from 'custom-card-helpers';

import {
  CardConfig,
  EntityElement,
  ScheduleConfig,
  Action,
  ERepeatType,
  Timeslot,
} from './types';
import { CARD_VERSION, EViews, DefaultCardConfig } from './const';
import { calculateTimeline, flatten, unique, omit, IsDefaultName, isDefined } from './helpers';
import { ValidateConfig } from './config-validation';

import './views/scheduler-entities-card';
import './views/scheduler-entitypicker-card';
import './views/scheduler-timepicker-card';
import './views/scheduler-options-card';
import './views/scheduler-card-editor';

import './components/dialog-error';
import './components/dialog-delete-defective';
import { parseEntity } from './data/entities/parse_entity';
import { fetchScheduleItem, editSchedule, saveSchedule, handleError, deleteSchedule } from './data/websockets';
import { computeActions } from './data/actions/compute_actions';
import { compareActions } from './data/actions/compare_actions';
import { importAction } from './data/actions/import_action';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-card',
  name: 'Scheduler Card',
  description: 'Card to manage schedule entities made with scheduler-component.',
});

console.info(
  `%c  SCHEDULER-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

@customElement('scheduler-card')
export class SchedulerCard extends LitElement {
  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement('scheduler-card-editor');
  }

  @property() _config?: CardConfig;
  @property() private _hass?: HomeAssistant;
  @property() _view: EViews = EViews.Overview;

  @property() entities?: EntityElement[];
  @property() actions: Action[] = [];
  @property() schedule?: ScheduleConfig;

  @property() translationsLoaded = false;
  editItem: string | null = null;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  firstUpdated() {
    const hass = this._hass!;
    if (hass.localize('ui.panel.config.automation.editor.actions.name')) this.translationsLoaded = true;
    else {
      const el = document.querySelector('home-assistant') as HTMLElement & { _loadFragmentTranslations: any };
      el._loadFragmentTranslations(hass.language, 'config').then(() => {
        this._hass!.localize;
      });
    }

    const myEvent = new CustomEvent('editClick', { detail: "e6f89d" });
    this._editItemClick(myEvent);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1) {
      if (!oldHass.localize('ui.panel.config.automation.editor.actions.name')) {
        this.translationsLoaded = true;
        return true;
      }
      else if (this._view == EViews.Overview) return true;
      return false;
    }
    return true;
  }

  setConfig(userConfig: Partial<CardConfig>) {
    ValidateConfig(userConfig);
    const config: CardConfig = {
      ...DefaultCardConfig,
      ...userConfig
    };
    this._config = config;
  }

  public getCardSize() {
    return 9;
  }

  protected render() {
    if (!this._hass || !this._config || !this.translationsLoaded) return html``;
    if (this._view == EViews.Overview) {
      return html`
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `;
    } else if (this._view == EViews.NewSchedule) {
      return html`
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entities=${this.entities}
          .schedule=${this.schedule}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `;
    } else if (this._view == EViews.TimePicker || this._view == EViews.TimeScheme) {
      return html`
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .schedule=${this.schedule}
          .entities=${this.entities}
          .actions=${this.actions}
          ?timeslots=${this._view == EViews.TimeScheme}
          ?editItem=${this.editItem !== null}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `;
    } else if (this._view == EViews.Options) {
      return html`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .schedule=${this.schedule}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${this._saveItemClick}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `;
    } else return html``; //shouldnt happen!
  }

  private _addItemClick(): void {
    this._view = EViews.NewSchedule;
    this.editItem = null;
    this.entities = [];
    this.actions = [];
    this.schedule = undefined;
  }

  private _cancelEditClick(): void {
    this._view = EViews.Overview;
    this.editItem = null;
  }

  private _confirmItemClick(ev: CustomEvent): void {
    if (!this._hass || !this._config) return;
    const entities: string[] = ev.detail.entities;
    this.entities = entities.map(e => parseEntity(e, this._hass!, this._config!));

    const timeSchemeSelected = Boolean(ev.detail.timeSchemeSelected);
    const action: Action = ev.detail.action;
    const oldSchedule = this.schedule;
    if (!timeSchemeSelected) {
      this.actions = [action];
      const defaultTimeslot: Timeslot = {
        start: '12:00:00',
        actions: flatten(entities.map(e =>
          Object({
            service: this.actions[0].service,
            entity_id: e,
            service_data: this.actions[0].service_data
          })
        ))
      };

      this.schedule = oldSchedule
        ? {
          ...oldSchedule,
          timeslots: oldSchedule.timeslots.length == 1 && !oldSchedule.timeslots[0].stop
            ? [{ ...oldSchedule.timeslots[0], actions: defaultTimeslot.actions }]
            : [defaultTimeslot]
        }
        : {
          weekdays: ['daily'],
          timeslots: [defaultTimeslot],
          repeat_type: ERepeatType.Repeat
        };
      this._view = EViews.TimePicker;
    } else {
      this.actions = computeActions(entities, this._hass, this._config);
      const defaultTimeslots = [
        {
          start: '00:00:00',
          stop: '08:00:00',
          actions: []
        },
        {
          start: '08:00:00',
          stop: '16:00:00',
          actions: []
        },
        {
          start: '16:00:00',
          stop: '00:00:00',
          actions: []
        }
      ];

      this.schedule = oldSchedule
        ? {
          ...oldSchedule,
          timeslots: oldSchedule.timeslots.length > 1 && oldSchedule.timeslots.every(e => e.stop)
            ? oldSchedule.timeslots.map(slot => Object.assign(slot, { actions: [] }))
            : defaultTimeslots
        }
        : {
          weekdays: ['daily'],
          timeslots: defaultTimeslots,
          repeat_type: ERepeatType.Repeat
        };
      this._view = EViews.TimeScheme;
    }
  }

  private _editActionClick(ev: CustomEvent): void {
    this.schedule = ev.detail;
    this._view = EViews.NewSchedule;
  }

  _saveItemClick(ev: CustomEvent): void {
    if (!this._hass) return;
    let schedule = ev.detail as ScheduleConfig;
    schedule = {
      ...schedule,
      timeslots: schedule.timeslots.map(slot => {
        if (!slot.actions || !slot.actions.length) return null;
        if (slot.actions.some(e => !e.entity_id || computeDomain(e.entity_id || "") == "notify")) {
          slot = {
            ...slot,
            actions: slot.actions.map(action => !action.entity_id || computeDomain(action.entity_id || "") == "notify"
              ? omit(action, "entity_id")
              : action
            )
          };
        }
        if (!slot.stop) slot = omit(slot, 'stop');
        if (!slot.conditions?.length) slot = omit(slot, 'conditions', 'condition_type') as Timeslot;
        return slot;
      })
        .filter(isDefined)
    }

    if (this.editItem) {
      if (IsDefaultName(schedule.name)) schedule = { ...schedule, name: "" };
      editSchedule(this._hass, { ...schedule, schedule_id: this.editItem })
        .catch(e => handleError(e, this))
        .then(() => {
          this.editItem = null;
          this._view = EViews.Overview;
        });
    }
    else {
      saveSchedule(this._hass, schedule)
        .catch(e => handleError(e, this))
        .then(() => {
          this._view = EViews.Overview;
        });
    }
  }

  _deleteItemClick(): void {
    if (!this.editItem || !this._hass) return;
    const entity_id = this.editItem;
    deleteSchedule(this._hass, entity_id)
      .catch(e => handleError(e, this))
      .then(() => {
        this.editItem = null;
        this._view = EViews.Overview;
      });
  }

  async _editItemClick(ev: CustomEvent) {
    if (!this._hass || !this._config) return;

    const data = await fetchScheduleItem(this._hass, ev.detail);
    if (!data) return;
    const entities = unique(flatten(data.timeslots.map(e => e.actions.map(e => e.entity_id || e.service))));
    this.entities = entities.map(e => parseEntity(e, this._hass!, this._config!));
    let actions = computeActions(entities, this._hass, this._config);
    const usedActions: Action[] = unique(flatten(data.timeslots.map(e => e.actions)));

    let extraActions = usedActions.filter(e => !actions.some(a => compareActions(a, e)));
    if (extraActions.length) {
      //actions that are not in the card
      unique(extraActions).forEach(e => actions.push(importAction(e, this._hass!)));
    }

    this.actions = actions;

    this.schedule = {
      weekdays: data.weekdays,
      timeslots: data.timeslots,
      repeat_type: data.repeat_type,
      name: data.name
    }
    this.editItem = data.schedule_id!;

    if (!this.entities.length || !this.schedule.timeslots.length) {
      const result = await new Promise((resolve) => {
        fireEvent(this, 'show-dialog', {
          dialogTag: 'dialog-delete-defective',
          dialogImport: () => import('./components/dialog-delete-defective'),
          dialogParams: {
            cancel: () => {
              resolve(false);
            },
            confirm: () => {
              resolve(true);
            },
          }
        });
      });
      if (result) this._deleteItemClick();
      else this._cancelEditClick();
      return;
    }

    if (this.schedule.timeslots.every(e => e.stop)) {
      this._view = EViews.TimeScheme;
      this.schedule = { ...this.schedule, timeslots: calculateTimeline(this.schedule!.timeslots) };
    } else {
      this._view = EViews.TimePicker;
      this.actions = this.actions.filter(e => usedActions.find(a => compareActions(e, a)));
    }
  }
  _gotoOptionsClick(ev: CustomEvent): void {
    this.schedule = ev.detail as ScheduleConfig;
    this._view = EViews.Options;
  }

  _optionsBackClick(ev: CustomEvent): void {
    this.schedule = ev.detail as ScheduleConfig;

    if (this.schedule.timeslots.every(e => e.stop)) this._view = EViews.TimeScheme;
    else this._view = EViews.TimePicker;
  }
}