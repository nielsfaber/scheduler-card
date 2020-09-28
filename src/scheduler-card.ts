
import { LitElement, html, customElement, property, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';

import { Config } from './config';
import { ITimeSlot, IEntry, IScheduleEntry, IUserConfig, IActionElement, IGroupElement, IEntityElement, IHassData, ILevelVariableConfig, IListVariableConfig, IHassEntity, IDictionary, EVariableType, ILevelVariable, IListVariable, IListVariableOption } from './types'
import { PrettyPrintDays, PrettyPrintTime, PrettyPrintName, PrettyPrintIcon, PrettyPrintAction, capitalize, calculateTimeSlots, IsEqual, pick, filterObject } from './helpers'
import { styles } from './styles';
import { ValidateConfig } from './config-validation'
import { CARD_VERSION, DefaultUserConfig, RoutineAction, DefaultEntry, FieldTemperature } from './const'
import { localize, getLanguage } from './localize/localize';
import { parseTimestamp, EDayType, IDays, ETimeEvent, daysToArray } from './date-time';
import { ImportFromHass, ExportToHass } from './interface';
import { IsSchedulerEntity } from './entity';

import './time-picker';
import './variable-slider';
import './timeslot-editor';


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

  @property({ type: Object })
  _entry: IEntry = { ...DefaultEntry };

  @property({ type: Array })
  _slots: ITimeSlot[] = [];

  @property({ type: Number })
  _slotNum: number | null = null;

  @property({ type: String })
  _selectedGroup: string = '';


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
  }

  protected updateScheduleList(hass) {
    let entities = <IDictionary<IHassEntity>>filterObject(hass.states, (_, e) => IsSchedulerEntity(e));
    if (IsEqual(entities, this._entities)) return;
    this._entities = entities;

    this.scheduleItems = Object.values(entities).map(e => ImportFromHass(e, this.Config)).filter(e => e) as IScheduleEntry[];
  }

  setConfig(config) {
    const userCfgKeys = ['groups', 'domains', 'entities', 'discover_existing', 'standard_configuration'];
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
    else if (this._entry.action == RoutineAction.id) {
      return html`
      <ha-card>
        ${this.getTitle()}
        ${this.showRoutineEditor()}
      </ha-card>
      `;
    }
    else {
      return html`
      <ha-card>
        ${this.getTitle()}
        ${this.showEditor()}
      </ha-card>
      `;
    }
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
              ${capitalize(PrettyPrintTime(scheduleItem.entries[0].time, { amPm: this._config.am_pm, sunrise: this._config.sunrise, sunset: this._config.sunset }))}
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
          let timeStr = PrettyPrintTime(el.time, { amPm: this._config.am_pm, sunrise: this._config.sunrise, sunset: this._config.sunset });
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
    this._entry = Object.assign({ ...this._entry }, { entity: entity });
    if (this.Config.GetActionsForEntity(entity).length == 1) this.selectAction(this.Config.GetActionsForEntity(entity)[0].id);
  }

  getActions() {
    if (!this._entry.entity) {
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
    if (actions.length == 1) this.selectAction(actions[0].id);
    let options_list = actions.filter(e => { return e.id != RoutineAction.id }).map((el: IActionElement) => {
      return html`
        <mwc-button class="${this._entry.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    });

    let createRoutineButton = [html``];
    createRoutineButton = actions.filter(e => { return e.id == RoutineAction.id }).map((el: IActionElement) => {
      return html`
        <div class="card-section first">
          <div class="header">or</div>
          <div class="option-list">
            <mwc-button class="${this._entry.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
              ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
              ${PrettyPrintName(el.name)}
            </mwc-button>
          </div>
        </div>
      `;
    });

    return html`
          <div class="card-section">
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
              ${options_list}
            </div>
          </div>
          ${createRoutineButton}
      `;
  }

  selectAction(action: string): void {
    this._entry = Object.assign({ ...this._entry }, <IEntry>{ action: action });
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
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Daily ? ' active' : ''}" @click="${() => this.selectDays('daily')}">${localize('fields.day_type_daily')}</mwc-button>
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Weekdays ? ' active' : ''}" @click="${() => this.selectDays('weekdays')}">${localize('fields.day_type_weekdays')}</mwc-button>
        <mwc-button class="day-item${this._entry.days?.type == EDayType.Custom ? ' active' : ''}" @click="${() => this.selectDays('custom')}">${localize('fields.day_type_custom')}</mwc-button>
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

  selectDays(input: number | string) {
    let daysCfg: IDays = { ...this._entry.days! };
    if (typeof input == "string") {
      let dayType = EDayType.Custom;
      if (input == "daily") dayType = EDayType.Daily;
      else if (input == "weekdays") dayType = EDayType.Weekdays;
      Object.assign(daysCfg, { type: dayType });
      if (dayType == EDayType.Custom && !daysCfg.custom_days) Object.assign(daysCfg, { custom_days: daysToArray(this._entry.days!) });
    } else {
      let day_list = this._entry.days?.custom_days ? [... this._entry.days.custom_days] : [];
      if (!day_list.includes(input)) day_list.push(input);
      else if (day_list.length > 1) day_list = day_list.filter(e => e != input);
      Object.assign(daysCfg, { custom_days: day_list });
    }
    this._entry = Object.assign({ ...this._entry }, <IEntry>{ days: daysCfg });
  }

  showRoutineEditor(): TemplateResult {
    let entity = this.Config.FindEntity(this._entry.entity);
    let action = this.Config.FindAction(this._entry.entity, this._entry.action);
    if (!entity || !action) return html``;

    let actions = this.Config.GetActionsForEntity(this._entry.entity).filter(e => e.routine);
    let activeSlot = this._slotNum !== null ? this._slots[this._slotNum] : null;
    let activeAction = activeSlot ? actions.find(e => { return e.id == activeSlot!.action }) : null;

    //if (!this.selection.plannerSlots) Object.assign(this.selection, { plannerSlots: defaultRoutineSlots });

    if (this._slotNum !== null && activeAction && activeAction.variable) {
      let slots = [... this._slots];
      let activeSlot: ITimeSlot = { ...slots[this._slotNum] };

      if (this._entry.variable?.type == EVariableType.Level) {
        let variable = this._entry.variable as ILevelVariable;
        Object.assign(activeSlot, <ITimeSlot>{ variable: { value: variable.value, enabled: variable.enabled } });
      }
      else if (this._entry.variable?.type == EVariableType.List) {
        let variable = this._entry.variable as IListVariable;
        Object.assign(activeSlot, <ITimeSlot>{ variable: { value: variable.value } });
      }
      slots[this._slotNum] = activeSlot;
      this._slots = slots;
    }

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
    ${this.getDayPicker()}
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <timeslot-editor
        actions=${JSON.stringify(actions)}
        slots=${JSON.stringify(this._slots)}
        @update=${this.handlePlannerUpdate}
      >
      </timeslot-editor>
    </div>
    <div class="card-section">
      <div class="header">${localize('fields.action')}</div>
      <div class="option-list">
        <div class="text-field">${this.getPlannerActions()}</div>
      </div>
    </div>
     ${activeAction && activeAction.variable ? this.getLevelPanel(activeAction.variable as ILevelVariableConfig, true) : ''}

    <div class="card-section last">
      <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
      ${this.newItem || !this._config.is_admin ? '' : html`<mwc-button outlined @click="${this._deleteItemClick}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${this._saveItemClick}">${localize('actions.save')}</mwc-button>
    </div>
    `;
  }

  handlePlannerUpdate(e: CustomEvent) {
    let el = e.target as HTMLInputElement;

    if (e.detail.hasOwnProperty('slot')) {
      let num = Number(e.detail.slot);
      this._slotNum = num;

      let activeSlot = this._slots[num];
      if (activeSlot.variable) {
        let variable = activeSlot.variable as ILevelVariable; //TBD
        Object.assign(this._entry, { variable: { level: Number(variable.value), levelEnabled: variable.enabled } });
      }
      else Object.assign(this._entry, { variable: undefined });

    } else if (e.detail.hasOwnProperty('slots')) {
      let slots: ITimeSlot[] = e.detail.slots;
      this._slots = [...slots];
    }
    this.requestUpdate();
  }


  getPlannerActions() {
    if (this._slotNum === null) return html`<div class="text-field">select a timeslot first</div>`;
    let actions = this.Config.GetActionsForEntity(this._entry.entity);
    let activeSlot = this._slots[this._slotNum];

    return actions.filter(e => { return e.id != RoutineAction.id }).map((el: IActionElement) => {
      return html`
        <mwc-button class="${activeSlot.action == el.id ? ' active' : ''}" @click="${() => { this.selectPlannerAction(el) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    });
  }

  selectPlannerAction(action: IActionElement) {
    let slots: ITimeSlot[] = [... this._slots];
    let activeSlot = { ...slots[this._slotNum!] };
    Object.assign(activeSlot, { action: (activeSlot.action == action.id) ? null : action.id });

    if (activeSlot.action && action.variable) {
      if (action.variable.type == EVariableType.Level) {
        let variable = activeSlot.variable as ILevelVariable;
        let cfg = action.variable as ILevelVariableConfig;
        Object.assign(this._entry, {
          variable: {
            level: variable.value !== undefined ? variable.value : cfg.min,
            levelEnabled: variable.enabled !== undefined ? variable.enabled : !cfg.optional
          }
        });
      }
    }

    slots[this._slotNum!] = activeSlot;
    this._slots = slots;
    this.requestUpdate();
  }


  getLevelPanel(cfg: ILevelVariableConfig, updateCard: boolean = false): TemplateResult {
    if (!cfg.unit.length && cfg.field == FieldTemperature) Object.assign(cfg, { unit: this._config.temperature_unit });
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
    if (!this._entry.variable) return;

    let variable: ILevelVariable = { type: EVariableType.Level, value: Number(el.value), enabled: String(el.disabled) == "false" };
    Object.assign(this._entry, { variable: variable });
    if (updateCard) this.requestUpdate();
  }

  getListPanel(cfg: IListVariableConfig): TemplateResult {
    let options = cfg.options;
    let fields;
    if (!options.length) fields = html`<div class="text-field">No options</div>`;
    else fields = options.map((el: IListVariableOption) => {
      return html`
        <mwc-button class="${this._entry.variable?.value == el.value ? ' active' : ''}" @click="${() => { this.selectListItem(el.value) }}">
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

  selectListItem(val: string) {
    let variable: IListVariable = { type: EVariableType.List, value: String(val) };
    this._entry = Object.assign({ ...this._entry }, { variable: variable });
  }

  private _addItemClick() {
    this.newItem = true;
    this.newItemConfirmed = false;
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
    if (actionCfg && actionCfg!.variable) {
      let cfg;
      if (actionCfg?.variable.type == EVariableType.Level) {
        let levelConfig = actionCfg.variable as ILevelVariableConfig;
        cfg = <ILevelVariable>{ type: EVariableType.Level, value: null, enabled: !levelConfig.optional };
      }
      else if (actionCfg?.variable.type == EVariableType.List) {
        let listConfig = actionCfg.variable as IListVariableConfig;
        cfg = <IListVariable>{ type: EVariableType.List, value: listConfig.options[0].value };
      }
      this._entry = Object.assign(this._entry, <IEntry>{ variable: cfg });
    }
  }

  _saveItemClick() {
    let data: IHassData, entries: IEntry[];
    if (this._entry.action == RoutineAction.id) {
      let slots = this._slots.filter(e => e.action);
      entries = slots.map(e => {
        return Object.assign({ ...e }, <IEntry>{
          time: { value: e.startTime },
          days: this._entry.days,
          action: e.action!,
          entity: this._entry.entity,
        });
      });
    }
    else {
      entries = [this._entry];
    }

    data = ExportToHass(entries, this.Config);

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

    if (item.entries.length == 1) {
      this._entry = { ...item.entries[0] };
    }
    else {
      this._entry = { ...item.entries[0] };
      this._slots = calculateTimeSlots(item.entries);
      this._slotNum = null;
    }
    this.editItem = entity_id;
  }
}