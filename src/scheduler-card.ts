
import { LitElement, html, customElement, property, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { Config } from './config';
import { IEntry, IScheduleEntry, IUserConfig, IActionElement, IGroupElement, IEntityElement, ILevelVariableConfig, IListVariableConfig, IHassEntity, IDictionary, EVariableType, ILevelVariable, IListVariable, IListVariableOption, ICardConfig } from './types'
import { PrettyPrintDays, PrettyPrintTime, PrettyPrintName, PrettyPrintIcon, PrettyPrintAction, capitalize, IsEqual, pick, filterObject, calculateTimeline } from './helpers'
import { styles } from './styles';
import { ValidateConfig } from './config-validation'
import { CARD_VERSION, DefaultUserConfig, DefaultEntry, FieldTemperature, CreateTimeline, DefaultTimelineEntries } from './const'
import { localize, getLanguage } from './localize/localize';
import { parseTimestamp, EDayType, IDays, ETimeEvent, daysToArray } from './date-time';
import { ImportFromHass, ExportToHass } from './interface';
import { IsSchedulerEntity } from './entity';

import './time-picker';
import './variable-slider';
import './timeslot-editor';
import './editor';


(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-card',
  name: 'Scheduler Card',
  description: 'Card to manage schedule entities made with scheduler-component.',
});


console.info(
  `%c   SCHEDULER-CARD   \n%c   Version: ${CARD_VERSION.padEnd(8, ' ')}\n%c   Language: ${getLanguage().padEnd(7, ' ')}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('scheduler-card')
export class SchedulerCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('scheduler-card-editor') as LovelaceCardEditor;
  }

  static get styles(): CSSResult {
    return styles;
  }

  _config: IUserConfig = DefaultUserConfig;

  Config: Config = new Config;


  shadowRoot: any;

  _entities: IDictionary<IHassEntity> = {};

  @property({ type: Array })
  scheduleItems: IScheduleEntry[] = [];

  @property({ type: Object })
  private _hass?: HomeAssistant;

  @property({ type: Boolean })
  newItem: boolean = false;

  @property({ type: Boolean })
  editItem: boolean = false;

  @property({ type: Boolean })
  newItemConfirmed: boolean = false;

  _entries: IEntry[] = [];
  _activeEntry: number | null = null;

  @property({ type: Object })
  _entry: IEntry = { ...DefaultEntry };

  @property({ type: String })
  _selectedGroup: string = '';

  _timeline = false;

  set hass(hass: HomeAssistant) {
    if (!this._hass) this.init(hass);

    this.updateScheduleList(hass);
    this._hass = hass;
  }

  private init(hass) {
    if (hass.states['sun.sun'] !== undefined) {
      this._config = Object.assign({ ...this._config }, {
        sunrise: parseTimestamp(hass.states['sun.sun'].attributes.next_rising),
        sunset: parseTimestamp(hass.states['sun.sun'].attributes.next_setting),
      })
    }
    if (hass.config.unit_system && hass.config.unit_system.temperature) {
      this._config = Object.assign({ ...this._config }, <IUserConfig>{ temperature_unit: hass.config.unit_system.temperature });
    }
    if (!hass.user.is_admin) this._config = Object.assign({ ...this._config }, { is_admin: false });

    this.Config.LoadEntities(hass.states);

    // this.newItem = true;
    // this._timeline = true;
    // this.newItemConfirmed = true;
    // this._entries = [...DefaultTimelineEntries].map(e => Object.assign(e, { entity: 'climate.mqtt_hvac' }));
  }

  protected updateScheduleList(hass) {
    let entities = <IDictionary<IHassEntity>>filterObject(hass.states, (_, e) => IsSchedulerEntity(e));
    if (IsEqual(entities, this._entities)) return;
    this._entities = entities;

    this.scheduleItems = Object.values(entities).map(e => ImportFromHass(e, this.Config)).filter(e => e) as IScheduleEntry[];
  }

  setConfig(config: ICardConfig) {
    ValidateConfig(config);
    const userCfgKeys = ['discover_existing', 'standard_configuration', 'include', 'exclude', 'groups', 'customize'];
    this._config = Object.assign({ ...this._config }, pick(config, Object.keys(this._config)));
    this.Config.setUserConfig(pick(config, userCfgKeys));
  }

  public getCardSize() {
    if (!this._hass || !this.scheduleItems.length) return 6;
    return (6 + this.scheduleItems.length * 2);
  }

  protected render(): TemplateResult {
    if (!this.newItem && !this.editItem) {
      return html`
      <ha-card>
        ${this.getTitle()}
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        ${this._config.is_admin ? html`
        <div class="card-section last">
          <mwc-button outlined @click="${this._addItemClick}">${localize('actions.add')}</mwc-button>
        </div>`: ''}
      </ha-card>
      `;

    } else if (this.newItem && !this.newItemConfirmed) {
      return html`
        <ha-card>
          ${this.getTitle()}
          <div class="card-section first">
            <div class="header">${localize('fields.group')}</div>
            <div class="option-list">
            ${this.getGroups()}
            </div>
          </div>
          <div class="card-section">
            <div class="header">${localize('fields.entity')}</div>
            <div class="option-list">
            ${this.getEntities()}
            </div>
          </div>
          ${this.getActions()}
          <div class="card-section last">
            <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
            ${this._entry.action ? html`<mwc-button outlined @click="${this._confirmItemClick}">${localize('actions.next')}</mwc-button>` : html`<mwc-button outlined disabled>${localize('actions.next')}</mwc-button>`}
          </div>
        </ha-card>
      `;
    }
    else if (this._entries.length && !this._timeline) {
      return html`
      <ha-card>
        ${this.getTitle()}
        ${this.showEditor()}
      </ha-card>
      `;
    }
    else if (this._entries.length && this._timeline) {
      return html`
      <ha-card>
        ${this.getTitle()}
        ${this.showRoutineEditor()}
      </ha-card>
      `;
    }
    return html`
      <ha-card>
        ${this.getTitle()}
        <div class="card-section first">
          Something went wrong, refresh the page.
        </div>
      </ha-card>
      `;;
  }

  private getTitle() {
    if (typeof this._config.title == "string") return html`<div class="card-header">${this._config.title}</div>`;
    else if (this._config.title) return html`<div class="card-header">${localize('scheduler')}</div>`;
    else return html``;
  }

  getEntries(): TemplateResult[] {
    if (!this.scheduleItems || !this.scheduleItems.length) return [html`
      <div class="text-field">
        ${localize('instructions.no_entries_defined')}
      </div>
    `];
    return this.scheduleItems.map(scheduleItem => {
      let entity = this.Config.FindEntity(scheduleItem.entries[0].entity);
      let action = this.Config.FindAction(scheduleItem.entries[0].entity, scheduleItem.entries[0].action);
      if (!entity || !action) return html``;
      if (scheduleItem.entries.length == 1) {

        return html`
          <div class="list-item${scheduleItem['enabled'] ? '' : ' disabled'}" @click="${() => this._editItemClick(scheduleItem.id)}">
            <div class="list-item-icon">
              ${entity.icon ? html`<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
            </div>
            <div class="list-item-name">
              ${PrettyPrintName(entity.name)}
            </div>
            <div class="list-item-action">
              ${PrettyPrintAction(scheduleItem.entries[0], action, { temperature_unit: this._config.temperature_unit })}
            </div>
            <div class="list-item-days">
              ${capitalize(PrettyPrintDays(scheduleItem.entries[0].days))}
            </div>
            <div class="list-item-time">
              ${capitalize(PrettyPrintTime(scheduleItem.entries[0].time, { amPm: this._config.am_pm, sunrise: this._config.sunrise, sunset: this._config.sunset, endTime: scheduleItem.entries[0].endTime }))}
            </div>
            <div class="list-item-switch">
              ${scheduleItem.enabled ? html`<ha-switch checked="checked" @click="${(e) => this.toggleDisable(scheduleItem.id, e)}"></ha-switch>` : html`<ha-switch @click="${(e) => this.toggleDisable(scheduleItem.id, e)}"></ha-switch>`}
            </div>
          </div>
      `;
      }
      else {
        let description: TemplateResult[] = scheduleItem.entries.map(el => {
          let currentAction = this.Config.FindAction(el.entity, el.action) as IActionElement;
          let actionStr = PrettyPrintAction(el, currentAction, { temperature_unit: this._config.temperature_unit });
          let timeStr = PrettyPrintTime(el.time, { amPm: this._config.am_pm, sunrise: this._config.sunrise, sunset: this._config.sunset, endTime: el.endTime });
          return html`${actionStr} ${timeStr}<br>`;
        });

        return html`
          <div class="list-item${scheduleItem['enabled'] ? '' : ' disabled'}" @click="${() => this._editItemClick(scheduleItem.id)}">
            <div class="list-item-icon">
              ${entity.icon ? html`<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
            </div>
            <div class="list-item-name">
              ${PrettyPrintName(entity.name)}
            </div>
            <div class="list-item-action">
              ${description}
            </div>
            <div class="list-item-days">
              ${capitalize(PrettyPrintDays(scheduleItem.entries[0].days))}
            </div>
            <div class="list-item-time">
            </div>
            <div class="list-item-switch">
              ${scheduleItem.enabled ? html`<ha-switch checked="checked" @click="${(e) => this.toggleDisable(scheduleItem.id, e)}"></ha-switch>` : html`<ha-switch @click="${(e) => this.toggleDisable(scheduleItem.id, e)}"></ha-switch>`}
            </div>
          </div>
        `;
      }
    });
  }

  toggleDisable(entity_id, evt) {
    evt.stopPropagation();
    let enabled = !evt.target.checked;
    if (enabled) {
      this._hass!.callService('switch', 'turn_on', { entity_id: entity_id });
    } else {
      this._hass!.callService('switch', 'turn_off', { entity_id: entity_id });
    }
  }

  getGroups(): TemplateResult[] {
    let groups = this.Config.GetGroups();
    if (!groups.length) return [html`<div class="text-field">${localize('instructions.no_groups_defined')}</div>`];
    return groups.map((el: IGroupElement) => {
      return html`
        <mwc-button class="${this._selectedGroup == el.id ? ' active' : ''}" @click="${() => { this.selectGroup(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    })
  }

  selectGroup(group: string): void {
    this._selectedGroup = group;
    if (this.Config.GetEntitiesForGroup(group).length == 1) this.selectEntity(this.Config.GetEntitiesForGroup(group)[0].id);
    else this._entry = { ...DefaultEntry };
  }

  getEntities(): TemplateResult[] {
    if (!this._selectedGroup) return [html`<div class="text-field">${localize('instructions.no_group_selected')}</div>`];
    let entities = this.Config.GetEntitiesForGroup(this._selectedGroup);
    if (!entities.length) return [html`<div class="text-field">${localize('instructions.no_entities_for_group')}</div>`];
    return entities.map((el: IEntityElement) => {
      return html`
        <mwc-button class="${this._entry.entity == el.id ? ' active' : ''}" @click="${() => { this.selectEntity(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    })
  }

  selectEntity(entity: string): void {
    if (this._entry.entity != entity) {
      this._entry = <IEntry>Object.assign({ ...this._entry }, { entity: entity, action: '' });
      if (this.Config.GetActionsForEntity(entity).length == 1) this.selectAction(this.Config.GetActionsForEntity(entity)[0].id);
    }
  }

  getActions() {
    if (!this._entry || !this._entry.entity) {
      return html`
          <div class="card-section">
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
              <div class="text-field">${localize('instructions.no_entity_selected')}</div>
            </div>
          </div>
      `;
    }
    let actions = this.Config.GetActionsForEntity(this._entry.entity);
    if (!actions.length) {
      return html`
          <div class="card-section">
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
              <div class="text-field">${localize('instructions.no_actions_for_entity')}</div>
            </div>
          </div>
      `;
    }
    if (actions.length == 1 && !this._entry.action) this.selectAction(actions[0].id);
    let options_list = actions.map((el: IActionElement) => {
      return html`
        <mwc-button class="${this._entry.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    });

    let createTimelineButton = html`
        <div class="card-section first">
          <div class="header">or</div>
          <div class="option-list">
            <mwc-button class="${this._entry.action == CreateTimeline ? ' active' : ''}" @click="${() => { this.selectAction(CreateTimeline) }}">
              <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
              Create timeline
            </mwc-button>
          </div>
        </div>
      `;


    //createTimelineButton = html``;

    return html`
          <div class="card-section">
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
              ${options_list}
            </div>
          </div>
          ${createTimelineButton}
      `;
  }

  selectAction(action: string): void {
    let actionCfg = this.Config.FindAction(this._entry.entity, action);
    let entry = { ...this._entry };
    if (!actionCfg) {
      if (action == CreateTimeline) this._entry = Object.assign({ ...this._entry }, <IEntry>{ action: CreateTimeline });
      return;
    }

    if (entry.action == action) Object.assign(entry, <IEntry>{ action: '' });
    else Object.assign(entry, <IEntry>{ action: action });
    if (actionCfg.variable) {
      if (actionCfg.variable.type == EVariableType.Level) {
        Object.assign(entry, <IEntry>{ variable: { type: EVariableType.Level, value: (actionCfg.variable as ILevelVariableConfig).min, enabled: !(actionCfg.variable as ILevelVariableConfig).optional } });
      }
      else if (actionCfg.variable.type == EVariableType.List) {
        Object.assign(entry, <IEntry>{ variable: { type: EVariableType.List, value: (actionCfg.variable as IListVariableConfig).options[0].value } });
      }
    } else if (entry.variable) delete entry.variable;
    this._entry = entry;
    this._entries[this._activeEntry!] = this._entry;
  }

  showEditor(): TemplateResult {
    let entity = this.Config.FindEntity(this._entry.entity);
    let action = this.Config.FindAction(this._entry.entity, this._entry.action);
    if (!entity || !action) return html``;

    return html`
    <div class="card-section first">
      <div class="header">${localize('fields.action')}</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${entity.icon ? html`<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(entity.name)}
          </div>
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"></ha-icon>
        </div>
        <div class="summary-action">
          <div class="summary-icon">
            ${action.icon ? html`<ha-icon icon="${PrettyPrintIcon(action.icon)}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(action.name)}
          </div>
        </div>
      </div>
     </div>
     ${action.variable && action.variable.type == EVariableType.Level ? this.getLevelPanel(action.variable as ILevelVariableConfig) : ''}
     ${action.variable && action.variable.type == EVariableType.List ? this.getListPanel(action.variable as IListVariableConfig) : ''}
     ${this.getDayPicker()}
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <time-picker value=${this._entry.time!.value} event=${this._entry.time!.event} stepSize="${this._config.time_step}" formatAmPm="${this._config.am_pm}" sunrise="${this._config.sunrise}" sunset="${this._config.sunset}" @change="${this.updateTime}"></timepicker>
    </div>

    <div class="card-section last">
      <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
      ${this.newItem || !this._config.is_admin ? '' : html`<mwc-button outlined @click="${this._deleteItemClick}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${this._saveItemClick}">${localize('actions.save')}</mwc-button>
    </div>
    `;
  }


  getDayPicker() {
    let customDayList = this._entry.days?.custom_days ? this._entry.days?.custom_days : [];
    let customDayPicker = this._entry.days?.type == EDayType.Custom ? html`
      <div class="day-list" id="day-list-custom">
        <mwc-button class="day-item${customDayList.includes(1) ? ' active' : ''}" @click="${() => this.selectDays(1)}">${localize('days_short.mon')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(2) ? ' active' : ''}" @click="${() => this.selectDays(2)}">${localize('days_short.tue')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(3) ? ' active' : ''}" @click="${() => this.selectDays(3)}">${localize('days_short.wed')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(4) ? ' active' : ''}" @click="${() => this.selectDays(4)}">${localize('days_short.thu')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(5) ? ' active' : ''}" @click="${() => this.selectDays(5)}">${localize('days_short.fri')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(6) ? ' active' : ''}" @click="${() => this.selectDays(6)}">${localize('days_short.sat')}</mwc-button>
        <mwc-button class="day-item${customDayList.includes(7) ? ' active' : ''}" @click="${() => this.selectDays(7)}">${localize('days_short.sun')}</mwc-button>
      </div>` : '';

    return html`
    <div class="card-section">
      <div class="header">${localize('fields.days')}</div>
      <div class="day-list">
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Daily ? ' active' : ''}" @click="${() => this.selectDays(EDayType.Daily)}">${localize('fields.day_type_daily')}</mwc-button>
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Workday ? ' active' : ''}" @click="${() => this.selectDays(EDayType.Workday)}">${localize('fields.day_type_workday')}</mwc-button>
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Weekend ? ' active' : ''}" @click="${() => this.selectDays(EDayType.Weekend)}">${localize('fields.day_type_weekend')}</mwc-button>
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Custom ? ' active' : ''}" @click="${() => this.selectDays(EDayType.Custom)}">${localize('fields.day_type_custom')}</mwc-button>
      </div>
      ${customDayPicker}
    </div>`;
  }

  updateTime(e: CustomEvent) {
    let el = e.target as HTMLInputElement;
    let value = Number(el.value);
    let event = e.detail.event == "sunrise" ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
    Object.assign(this._entry, <IEntry>{ time: e.detail.event ? { event: event, value: value } : { value: value } });
  }

  selectDays(input: number | EDayType) {
    let daysCfg: IDays = { ...this._entry.days! };
    if (typeof input == "string") {
      let dayType = input;
      Object.assign(daysCfg, { type: dayType });
      if (dayType == EDayType.Custom && !daysCfg.custom_days) {
        Object.assign(daysCfg, { custom_days: daysToArray(this._entry.days!) });
      }
    } else {
      let day_list = this._entry.days?.custom_days ? [... this._entry.days.custom_days] : [];
      if (!day_list.includes(input)) day_list.push(input);
      else if (day_list.length > 1) day_list = day_list.filter(e => e != input);
      Object.assign(daysCfg, { custom_days: day_list });
    }
    this._entry = Object.assign({ ...this._entry }, <IEntry>{ days: daysCfg });
    if (this._activeEntry === null) this._entries = this._entries.map(e => Object.assign(e, { days: daysCfg }));
  }

  showRoutineEditor(): TemplateResult {
    let entity = this.Config.FindEntity(this._entries[0].entity);
    if (!entity) return html``;

    let actions = this.Config.GetActionsForEntity(entity.id);
    let action = (this._activeEntry !== null) ? this.Config.FindAction(this._entry.entity, this._entry.action) : null;
    return html`
    <div class="card-section first">
      <div class="header">${localize('fields.action')}</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${entity.icon ? html`<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(entity.name)}
          </div>
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"></ha-icon>
        </div>
        <div class="summary-action">
          <div class="summary-icon">
            <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"></ha-icon>
          </div>
          <div class="summary-text">
            Create Timeline
          </div>
        </div>
      </div>
     </div>
    ${this.getDayPicker()}
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <timeslot-editor
        actions=${JSON.stringify(actions)}
        @update=${this.handlePlannerUpdate}
        temperatureunit=${this._config.temperature_unit}
        entries=${JSON.stringify(this._entries)}
      >
      </timeslot-editor>
    </div>
    <div class="card-section">
      <div class="header">${localize('fields.action')}</div>
      <div class="option-list">
        <div class="text-field">${this.getPlannerActions()}</div>
      </div>
    </div>
     ${action && this._entry.variable && this._entry.variable.type == EVariableType.Level ? this.getLevelPanel(action.variable as ILevelVariableConfig, true) : ''}
     ${action && this._entry.variable && this._entry.variable.type == EVariableType.List ? this.getListPanel(action.variable as IListVariableConfig, true) : ''}

    <div class="card-section last">
      <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
      ${this.newItem || !this._config.is_admin ? '' : html`<mwc-button outlined @click="${this._deleteItemClick}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${this._saveItemClick}">${localize('actions.save')}</mwc-button>
    </div>
    `;
  }

  handlePlannerUpdate(e: CustomEvent) {
    if (e.detail.hasOwnProperty('entries')) {
      let entries: IEntry[] = e.detail.entries;
      if (entries.length < this._entries.length && this._activeEntry == (this._entries.length - 1)) this._activeEntry = this._entries.length - 2;
      this._entries = [...entries];
      if (this._activeEntry !== null) this._entry = this._entries[this._activeEntry];
    }
    else if (e.detail.hasOwnProperty('entry')) {
      if (this._activeEntry !== null) this._entries[this._activeEntry] = this._entry;
      if (e.detail.entry !== null) {
        let activeEntry = Number(e.detail.entry);

        this._activeEntry = activeEntry;
        this._entry = this._entries[activeEntry];
      }
      else {
        this._activeEntry = null;
        this._entry = { ... this._entry };
      }
    }
  }


  getPlannerActions() {
    if (this._activeEntry === null) return html`<div class="text-field">Select a timeslot first</div>`;
    let actions = this.Config.GetActionsForEntity(this._entry.entity);
    return actions.map((el: IActionElement) => {
      return html`
        <mwc-button class="${this._entry.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    });
  }

  getLevelPanel(cfg: ILevelVariableConfig, updateCard: boolean = false): TemplateResult {
    if (!cfg.unit.length && cfg.field == FieldTemperature) cfg = Object.assign({ ...cfg }, { unit: this._config.temperature_unit });
    let variable = this._entry.variable as ILevelVariable;
    return html`
    <div class="card-section">
      <div class="header">${cfg['name']}</div>
      <div class="option-item">
        <variable-slider
          min=${cfg.min}
          max=${cfg.max}
          step=${cfg.step}
          value=${variable.value}      
          unit=${cfg.unit}
          optional=${cfg.optional}
          disabled=${!variable.enabled}
          @change="${e => { this.updateLevel(e, updateCard) }}"
        >
        </variable-slider>
      </div>
     </div>`;
  }

  updateLevel(e: Event, updateCard: boolean) {
    let el = e.target as HTMLInputElement;

    let variable: ILevelVariable = { type: EVariableType.Level, value: Number(el.value), enabled: String(el.disabled) == "false" };
    Object.assign(this._entry, { variable: variable });
    if (updateCard) this.requestUpdate();
  }

  getListPanel(cfg: IListVariableConfig, updateCard: boolean = false): TemplateResult {
    let options = cfg.options;
    let fields;
    if (!options.length) fields = html`<div class="text-field">${localize('instructions.no_entries_defined')}</div>`;
    else fields = options.map((el: IListVariableOption) => {
      return html`
        <mwc-button class="${this._entry.variable?.value == el.value ? ' active' : ''}" @click="${() => { this.selectListItem(el.value, updateCard) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.value)}
        </mwc-button>
      `;
    });

    return html`
    <div class="card-section">
      <div class="header">${cfg['name']}</div>
      ${fields}
     </div>`;
  }

  selectListItem(val: string, updateCard: boolean) {
    let variable: IListVariable = { type: EVariableType.List, value: String(val) };
    this._entry = Object.assign({ ...this._entry }, { variable: variable });
    if (updateCard) this.requestUpdate();
  }

  private _addItemClick() {
    this.newItem = true;
    this.newItemConfirmed = false;
    this._timeline = true;
    this._entry = { ...DefaultEntry };
    let groups = this.Config.GetGroups();
    if (groups.length == 1) {
      this.selectGroup(groups[0].id);
      if (this._entry.action) this._confirmItemClick();
    }
  }

  private _cancelEditClick() {
    this.newItem = false;
    this.editItem = false;
  }

  private _confirmItemClick() {
    this.newItemConfirmed = true;
    let actionCfg = this.Config.FindAction(this._entry.entity, this._entry.action);
    if (actionCfg) {
      this._entries = [this._entry];
      this._activeEntry = 0;
      this._timeline = false;
    }
    else if (this._entry.action == CreateTimeline) {
      this._timeline = true;
      this._entries = [...DefaultTimelineEntries].map(e => Object.assign(e, { entity: this._entry.entity }));
      this._entry = this._entries[0];
      this._activeEntry = null;
    }
  }

  _saveItemClick() {
    let entries = this._entries;
    if (this._activeEntry !== null) entries[this._activeEntry] = this._entry;

    let data = ExportToHass(entries, this.Config);

    if (this.newItem) {
      this._hass!.callService('scheduler', 'add', data);
    } else if (this.editItem) {
      this._hass!.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.editItem }));
    }

    this.newItem = false;
    this.editItem = false;
  }

  _deleteItemClick(): void {
    let entity_id = this.editItem;
    this._hass!.callService('scheduler', 'remove', { entity_id: entity_id });
    this.newItem = false;
    this.editItem = false;
  }


  _editItemClick(entity_id) {
    let item = this.scheduleItems.find(e => e.id == entity_id);
    if (!item) return;

    let entries = [...item.entries];

    if (item.entries.every(e => e.endTime)) {
      this._timeline = true;
      entries = calculateTimeline(entries);
    }
    else {
      this._timeline = false;
    }

    this._entry = entries[0];
    this._entries = entries;
    this._activeEntry = 0;

    this.editItem = entity_id;
  }
}