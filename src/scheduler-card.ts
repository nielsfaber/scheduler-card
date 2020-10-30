import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import {
  EVariableType,
  LevelVariable,
  ListVariable,
  CardConfig,
  EntityElement,
  ActionElement,
  ImportedEntry,
  Entry,
  HassAction,
  HassEntry,
  HassData,
  OptionConfig,
  Condition,
  EDayType,
} from './types';
import { CARD_VERSION, EViews, CreateTimeScheme } from './const';
import { parseTimestamp, MinutesPerDay, formatTime, timeEventToString } from './date-time';
import { importEntry } from './data/import_entry';
import { pick, calculateTimeline } from './helpers';
import { exportActionVariable } from './actionVariables';
import { ValidateConfig } from './config-validation';

import './custom-elements/scheduler-entities-card';
import './custom-elements/scheduler-entitypicker-card';
import './custom-elements/scheduler-timepicker-card';
import './custom-elements/scheduler-options-card';
import './custom-elements/scheduler-card-editor';
import { importAction } from './data/import_action';
import { parseAction } from './data/parse_action';
import { parseEntity } from './data/parse_entity';
import { computeEntityActions } from './data/compute_entity_actions';
import { uniqueId, equalAction } from './data/compute_action_id';
import { IsSchedulerEntity } from './data/filter_entity';

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

  @property() entries: Entry[] = [];
  @property() entity?: EntityElement;
  @property() actions: ActionElement[] = [];
  @property() friendlyName?: string;

  translationsLoaded = false;
  editItem: string | null = null;
  scheduleEntities: string[] = [];

  set hass(hass: HomeAssistant) {
    this.scheduleEntities = Object.keys(hass.states).filter(el => IsSchedulerEntity(el));
    this._hass = hass;
  }

  firstUpdated() {
    const hass = this._hass!;
    const el = document.querySelector('home-assistant') as HTMLElement & { _loadFragmentTranslations: any };
    el._loadFragmentTranslations(hass.language, 'config').then(() => {
      this._hass!.localize;
    });
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1) {
      if (!oldHass.localize('ui.panel.config.automation.editor.actions.name')) {
        this.translationsLoaded = true;
        return true;
      }
      const scheduleEntities = Object.keys(oldHass.states).filter(el => IsSchedulerEntity(el));
      if (scheduleEntities.length !== this.scheduleEntities.length) return true;
      if (scheduleEntities.some((e, i) => e !== this.scheduleEntities[i])) return true;
      if (scheduleEntities.some(e => oldHass.states[e] !== this._hass!.states[e])) return true;
      return false;
    }
    return true;
  }

  setConfig(config: CardConfig) {
    ValidateConfig(config);
    this._config = config;
  }

  public getCardSize() {
    if (!this._hass || !this.scheduleEntities.length) return 6;
    return 6 + this.scheduleEntities.length;
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
          .entries=${this.entries}
          .entity=${this.entity}
          .actions=${this.actions}
          ?timeslots=${this._view == EViews.TimeScheme}
          ?editItem=${this.editItem !== null}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
        >
        </scheduler-timepicker-card>
      `;
    } else if (this._view == EViews.Options) {
      return html`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .entries=${this.entries}
        .friendlyName=${this.friendlyName}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${ev => this._optionsBackClick(ev, true)}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `;
    } else return html``; //shouldnt happen!
  }

  private _addItemClick(): void {
    this._view = EViews.NewSchedule;
    this.editItem = null;
    this.friendlyName = undefined;
  }

  private _cancelEditClick(): void {
    this._view = EViews.Overview;
    this.editItem = null;
  }

  private _confirmItemClick(ev: CustomEvent): void {
    if (!this._hass || !this._config) return;
    const entity = String(ev.detail.entity);
    this.entity = parseEntity(entity, this._hass, this._config)!;
    const action = String(ev.detail.action);

    if (action != CreateTimeScheme) {
      this.entries = [
        {
          entity: ev.detail.entity,
          action: action,
          time: { value: parseTimestamp('12:00') },
          days: { type: EDayType.Daily },
        },
      ];

      this._view = EViews.TimePicker;

      this.actions = [computeEntityActions(entity, this._hass, this._config).find(e => e.id == action)!];
    } else {
      this.entries = [
        {
          entity: ev.detail.entity,
          action: '',
          time: { value: parseTimestamp('00:00') },
          endTime: { value: parseTimestamp('08:00') },
          days: { type: EDayType.Daily },
        },
        {
          entity: ev.detail.entity,
          action: '',
          time: { value: parseTimestamp('08:00') },
          endTime: { value: parseTimestamp('16:00') },
          days: { type: EDayType.Daily },
        },
        {
          entity: ev.detail.entity,
          action: '',
          time: { value: parseTimestamp('16:00') },
          endTime: { value: MinutesPerDay },
          days: { type: EDayType.Daily },
        },
      ];
      this.actions = computeEntityActions(entity, this._hass, this._config);
      this._view = EViews.TimeScheme;
    }
  }

  _saveItemClick(ev?: CustomEvent): void {
    if (!this._hass || !this._config) return;

    if (ev) this.entries = ev.detail as Entry[];
    const actions: HassAction[] = [];
    const entries: HassEntry[] = [];
    const conditions: Condition[] = [];
    const options: OptionConfig = {};

    this.entries.forEach(entry => {
      if (!entry.action || !entry.entity) return;

      const action = this.actions.find(e => e.id == entry.action)!;
      const variableData = exportActionVariable(action, entry);

      const output: HassAction = {
        entity: entry.entity,
        service: action.service,
        service_data: { ...(action.service_data || {}), ...variableData },
      };

      let num = actions.findIndex(e => uniqueId(e) == uniqueId(output));
      if (num == -1) num = actions.push(output) - 1;

      const hassEntry: HassEntry = {
        actions: [num],
      };

      if (!entry.time.event) Object.assign(hassEntry, { time: formatTime(entry.time.value).time });
      else if (entry.time.event)
        Object.assign(hassEntry, {
          time: { event: timeEventToString(entry.time.event), offset: formatTime(entry.time.value).time },
        });

      if (entry.endTime) {
        if (!entry.time.event) Object.assign(hassEntry, { end_time: formatTime(entry.endTime.value).time });
        else if (entry.time.event)
          Object.assign(hassEntry, {
            end_time: { event: timeEventToString(entry.endTime.event!), offset: formatTime(entry.endTime.value).time },
          });
      }
      let dayType = 'daily';
      if (entry.days.type == EDayType.Workday) dayType = 'workday';
      else if (entry.days.type == EDayType.Weekend) dayType = 'weekend';
      else if (entry.days.type == EDayType.Custom) dayType = 'custom';

      if (entry.days.type == EDayType.Custom)
        Object.assign(hassEntry, { days: { type: dayType, list: entry.days.custom_days } });
      else Object.assign(hassEntry, { days: { type: dayType } });

      if ('conditions' in entry) {
        const conditionNums: number[] = [];
        entry.conditions?.items.forEach(condition => {
          let num = conditions.findIndex(e => e === condition);
          if (num < 0) num = conditions.push(condition) - 1;
          conditionNums.push(num);
        });
        Object.assign(hassEntry, { conditions: { list: conditionNums, type: entry.conditions!.type } } as HassEntry);
      }

      if (entry.options) {
        const optionNums: number[] = [];
        Object.entries(entry.options).forEach(([key, val]) => {
          let num = Object.entries(options).findIndex(([k, v]) => ({ [key]: val } === { [k]: v }));
          if (num < 0) {
            Object.assign(options, { [key]: val });
            num = Object.keys(options).length - 1;
          }
          optionNums.push(num);
        });
        Object.assign(hassEntry, { options: optionNums } as HassEntry);
      }

      entries.push(hassEntry);
    });

    const data: HassData = {
      entries: entries,
      actions: actions,
    };

    if (conditions.length) Object.assign(data, { conditions: conditions });
    if (this.friendlyName) Object.assign(data, { name: this.friendlyName });
    if (Object.keys(options).length) Object.assign(data, { options: options });

    if (this.editItem) {
      this._hass!.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.editItem }));
    } else {
      this._hass!.callService('scheduler', 'add', data);
    }

    this.editItem = null;
    this._view = EViews.Overview;
  }

  _deleteItemClick(): void {
    const entity_id = this.editItem;
    this._hass!.callService('scheduler', 'remove', { entity_id: entity_id });
    this.editItem = null;
    this._view = EViews.Overview;
  }

  _editItemClick(ev: CustomEvent): void {
    if (!this._hass || !this._config) return;
    const scheduleEntity = this._hass.states[ev.detail]!;

    const entries: ImportedEntry[] = scheduleEntity.attributes.entries.map(importEntry);
    const action = importAction(scheduleEntity.attributes.actions[0]);

    const entityConfig = parseEntity(action.entity, this._hass, this._config);
    this.entity = entityConfig;

    this.actions = computeEntityActions(action.entity, this._hass, this._config);

    const conditions: Condition[] = scheduleEntity.attributes.conditions || [];
    const options: OptionConfig = scheduleEntity.attributes.options || {};
    this.entries = entries.map(el => {
      const hassAction = el.actions
        .filter(e => e < scheduleEntity.attributes.actions.length)
        .map(e => importAction(scheduleEntity.attributes.actions[e]))
        .shift()!;
      const action = parseAction(hassAction, this._hass!, this._config!);

      const res = this.actions.find(e => equalAction(e, action));
      if (!res) {
        const actions = [...this.actions];
        actions.push(action);
        this.actions = actions;
      }
      let output: Entry = {
        time: el.time,
        endTime: el.endTime,
        days: el.days,
        entity: this.entity!.id,
        action: res ? res.id : action.id,
      };

      if (action.variable && hassAction.service_data && action.variable.field in hassAction.service_data) {
        if (action.variable.type == EVariableType.Level) {
          const variableConfig: LevelVariable = {
            type: EVariableType.Level,
            value: Number(hassAction.service_data[action.variable.field]),
            enabled: true,
          };
          output = { ...output, variable: variableConfig };
        } else {
          const variableConfig: ListVariable = {
            type: EVariableType.List,
            value: String(hassAction.service_data[action.variable.field]),
          };
          output = { ...output, variable: variableConfig };
        }
      }

      if (el.conditions && el.conditions.items.length) {
        Object.assign(output, {
          conditions: {
            type: el.conditions.type,
            items: el.conditions.items.filter(e => conditions.length >= e - 1).map(e => conditions[e]),
          },
        });
      }

      if (el.options && Object.keys(el.options).length) {
        Object.assign(output, {
          options: el.options.reduce((obj, el) => Object.assign(obj, pick(options, [Object.keys(options)[el]])), {}),
        });
      }
      return output;
    });

    this.editItem = scheduleEntity.entity_id;
    this.friendlyName = scheduleEntity.attributes.friendly_name;

    if (this.entries.every(e => e.endTime)) {
      this._view = EViews.TimeScheme;
      this.entries = calculateTimeline(this.entries);
    } else {
      this.actions = this.actions.filter(e => e.id == this.entries[0].action);
      this._view = EViews.TimePicker;
    }
  }
  _gotoOptionsClick(ev: CustomEvent): void {
    this.entries = ev.detail as Entry[];
    this._view = EViews.Options;
  }

  _optionsBackClick(ev: CustomEvent, saveAfter?: boolean): void {
    this.entries = ev.detail.entries as Entry[];
    this.friendlyName = ev.detail.friendlyName as string;

    if (this.entries.every(e => e.endTime)) this._view = EViews.TimeScheme;
    else this._view = EViews.TimePicker;

    if (saveAfter) {
      this._saveItemClick();
    }
  }
}
