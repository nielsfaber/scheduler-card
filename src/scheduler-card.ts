import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import {
  CardConfig,
  EntityElement,
  ActionElement,
  ScheduleConfig,
  Action,
  ERepeatType,
  Timeslot,
} from './types';
import { CARD_VERSION, EViews, CreateTimeScheme } from './const';
import { calculateTimeline, flatten, unique, omit, IsDefaultName } from './helpers';
import { ValidateConfig } from './config-validation';

import './custom-elements/scheduler-entities-card';
import './custom-elements/scheduler-entitypicker-card';
import './custom-elements/scheduler-timepicker-card';
import './custom-elements/scheduler-options-card';
import './custom-elements/scheduler-card-editor';
import './custom-elements/dialog-error';
import './custom-elements/dialog-delete-defective';
import { parseAction } from './data/parse_action';
import { parseEntity } from './data/parse_entity';
import { computeEntityActions } from './data/compute_entity_actions';
import { equalAction } from './data/compute_action_id';
import { fetchScheduleItem, editSchedule, saveSchedule, handleError, deleteSchedule } from './data/websockets';

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

  _config?: CardConfig;

  @property()
  private _hass?: HomeAssistant;

  @property()
  _view: EViews = EViews.Overview;

  @property() entities?: EntityElement[];
  @property() actions: ActionElement[] = [];
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

  setConfig(config: CardConfig) {
    ValidateConfig(config);
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

    const action: string = ev.detail.action;
    const oldSchedule = this.schedule;
    if (action != CreateTimeScheme) {
      this.actions = [computeEntityActions(entities, this._hass, this._config).find(e => e.id == action)!];
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
          weekdays: ['once'],
          timeslots: [defaultTimeslot],
          repeat_type: ERepeatType.Repeat,
          sdate: ''
        };
      this._view = EViews.TimePicker;
    } else {
      this.actions = computeEntityActions(entities, this._hass, this._config);
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
          repeat_type: ERepeatType.Repeat,
          sdate: ''
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
        if (!slot.stop) slot = omit(slot, ['stop']) as Timeslot;
        if (!slot.conditions?.length) slot = omit(slot, ['conditions', 'condition_type']) as Timeslot;
        return slot;
      })
        .filter(e => e) as Timeslot[]
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
    const entities = unique(flatten(data.timeslots.map(e => e.actions.map(e => e.entity_id))));
    this.entities = entities.map(e => parseEntity(e, this._hass!, this._config!));
    let actions = computeEntityActions(entities, this._hass, this._config);
    const usedActions: Action[] = unique(flatten(data.timeslots.map(e => e.actions)));

    usedActions
      .forEach(e => {
        if (!actions.find(a => equalAction(a, e)))
          actions.push(parseAction(e, this._hass!, this._config!))
      });
    this.actions = actions;

    this.schedule = {
      weekdays: data.weekdays,
      timeslots: data.timeslots,
      repeat_type: data.repeat_type,
      sdate: data.sdate,
      name: data.name
    }
    this.editItem = data.schedule_id!;

    if (!this.entities.length || !this.schedule.timeslots.length) {
      const result = await new Promise((resolve) => {
        fireEvent(this, 'show-dialog', {
          dialogTag: 'dialog-delete-defective',
          dialogImport: () => import('./custom-elements/dialog-delete-defective'),
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
      this.actions = this.actions.filter(e => usedActions.find(a => equalAction(e, a)));
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