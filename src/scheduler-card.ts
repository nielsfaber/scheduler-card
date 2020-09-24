
import { LitElement, html, customElement, property, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { find, filter, extend, pull, isEqual } from "lodash-es";


import { Config } from './config-parser';
import { IEntityElement, IGroupElement, IActionElement, IUserSelection, IActionVariable, IUserConfig, ITimeSlot, IEntry, IHassData, IScheduleEntry } from './types'
import { ExportToHass, ImportFromHass, PrettyPrintDays, PrettyPrintTime, PrettyPrintName, PrettyPrintIcon, PrettyPrintAction, ComputeDaysType, IsSchedulerEntity, capitalize, calculateTimeSlots } from './helpers'
import { styles } from './styles';
import { ValidateConfig } from './config-validation'
import { CARD_VERSION, DefaultUserSelection, DefaultUserConfig } from './const'
import { localize, getLanguage } from './localize/localize';
import { parseTimestamp, parseDayArray } from './date-time';
import { RoutineAction, defaultRoutineSlots } from './default-config';

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

  scheduleItems: IScheduleEntry[] = [];

  selection: IUserSelection = { ...DefaultUserSelection };

  shadowRoot: any;

  @property() private _hass?: HomeAssistant;

  set hass(hass: HomeAssistant) {
    if (!this._hass) this.init(hass);

    this.updateScheduleList(hass);
    this._hass = hass;
  }

  private init(hass) {
    if (hass.states['sun.sun'] !== undefined) {
      Object.assign(this._config, {
        sunrise: parseTimestamp(hass.states['sun.sun'].attributes.next_rising),
        sunset: parseTimestamp(hass.states['sun.sun'].attributes.next_setting),
      })
    }

    this.Config.LoadEntities(hass.states);
  }


  protected updateScheduleList(hass) {
    let scheduleItems = filter(hass.states, entity => IsSchedulerEntity(entity.entity_id))
      .map(e => ImportFromHass(e, this.Config)).filter(e => e);

    if (isEqual(scheduleItems, this.scheduleItems)) return;

    this.scheduleItems = scheduleItems;
    this.requestUpdate();
  }

  public getCardSize() {
    if (!this._hass || !this.scheduleItems.length) return 6;
    return (6 + this.scheduleItems.length * 2);
  }

  protected render(): TemplateResult {
    if (!this.selection.newItem && !this.selection.editItem) {
      return html`
      <ha-card>
        ${this.getTitle()}
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${() => { this.newItem() }}">${localize('actions.add')}</mwc-button>
        </div>
      </ha-card>
      `;

    } else if (this.selection.newItem && !this.selection.actionConfirmed) {
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
            <mwc-button outlined @click="${() => this.editItemCancel()}">${localize('actions.cancel')}</mwc-button>
            ${this.selection.action ? html`<mwc-button outlined @click="${() => this.newItemConfirm()}">${localize('actions.next')}</mwc-button>` : html`<mwc-button outlined disabled>${localize('actions.next')}</mwc-button>`}
          </div>
        </ha-card>
      `;
    }
    else if (this.selection.action == RoutineAction.id) {
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

  private newItem() {
    this.selection = extend({ ...DefaultUserSelection }, {
      newItem: true,
    });
    this.requestUpdate();
  }

  private editItemCancel() {
    this.selection = { ...DefaultUserSelection };
    this.requestUpdate();
  }

  private newItemConfirm() {
    this.selection = extend({ ...DefaultUserSelection }, {
      newItem: true,
      actionConfirmed: true,
      entity: this.selection.entity,
      action: this.selection.action
    });
    this.requestUpdate();
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
          <div class="list-item${scheduleItem['enabled'] ? '' : ' disabled'}" @click="${() => this.editItem(scheduleItem.id)}">
            <div class="list-item-icon">
              ${entity.icon ? html`<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
            </div>
            <div class="list-item-name">
              ${PrettyPrintName(entity.name)}
            </div>
            <div class="list-item-action">
              ${PrettyPrintAction(scheduleItem.entries[0], action)}
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
          let actionStr = PrettyPrintAction(el, currentAction);
          let timeStr = PrettyPrintTime(el.time, { amPm: this._config.am_pm, sunrise: this._config.sunrise, sunset: this._config.sunset });
          return html`${actionStr} ${timeStr}<br>`;
        });

        return html`
          <div class="list-item${scheduleItem['enabled'] ? '' : ' disabled'}" @click="${() => this.editItem(scheduleItem.id)}">
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

  editItem(entity_id) {
    let scheduleItem: IScheduleEntry = find(this.scheduleItems, { id: entity_id });

    if (scheduleItem.entries.length == 1) {
      this.selection = extend({ ...DefaultUserSelection }, {
        editItem: entity_id,
        entity: scheduleItem.entries[0].entity,
        action: scheduleItem.entries[0].action,
        time: scheduleItem.entries[0].time,
        days: scheduleItem.entries[0].days,
        daysType: ComputeDaysType(scheduleItem.entries[0].days)
      });
      if (scheduleItem.entries[0].level !== undefined) {
        Object.assign(this.selection, {
          levelEnabled: true,
          level: scheduleItem.entries[0].level
        });
      }
    }
    else {
      this.selection = extend({ ...DefaultUserSelection }, {
        editItem: entity_id,
        entity: scheduleItem.entries[0].entity,
        action: RoutineAction.id,
        days: scheduleItem.entries[0].days,
        daysType: ComputeDaysType(scheduleItem.entries[0].days),
        plannerSlots: calculateTimeSlots(scheduleItem.entries)
      });
    }
    this.requestUpdate();
  }

  getGroups(): TemplateResult[] {
    let groups = this.Config.GetGroups();
    if (!groups.length) return [html`<div class="text-field">${localize('instructions.no_groups_defined')}</div>`];
    return groups.map((el: IGroupElement) => {
      return html`
        <mwc-button class="${this.selection.group == el.id ? ' active' : ''}" @click="${() => { this.selectGroup(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    })
  }

  selectGroup(group: string): void {
    Object.assign(this.selection, {
      group: group,
      entity: null,
      action: null
    });
    this.requestUpdate();
  }

  getEntities(): TemplateResult[] {
    if (!this.selection.group) return [html`<div class="text-field">${localize('instructions.no_group_selected')}</div>`];
    let entities = this.Config.GetEntitiesForGroup(this.selection.group);
    if (!entities.length) return [html`<div class="text-field">${localize('instructions.no_entities_for_group')}</div>`];
    return entities.map((el: IEntityElement) => {
      return html`
        <mwc-button class="${this.selection.entity == el.id ? ' active' : ''}" @click="${() => { this.selectEntity(el.id) }}">
          ${el.icon ? html`<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    })
  }

  selectEntity(entity: string): void {
    Object.assign(this.selection, {
      entity: entity,
      action: null
    });
    this.requestUpdate();
  }

  getActions() {
    if (!this.selection.entity) {
      return html`
          <div class="card-section">
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
              <div class="text-field">${localize('instructions.no_entity_selected')}</div>
            </div>
          </div>
      `;
    }
    let actions = this.Config.GetActionsForEntity(this.selection.entity);
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

    let options_list = actions.filter(e => { return e.id != RoutineAction.id }).map((el: IActionElement) => {
      return html`
        <mwc-button class="${this.selection.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
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
            <mwc-button class="${this.selection.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id) }}">
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
    Object.assign(this.selection, {
      action: action
    });
    this.requestUpdate();
  }

  setConfig(config) {
    let userCfg: any = {}, options: any = {};

    ValidateConfig(config);
    const userCfgKeys = ['groups', 'domains', 'entities', 'discover_existing', 'standard_configuration'];

    userCfg = Object.entries(config)
      .filter(([key]) => userCfgKeys.includes(key))
      .reduce((userCfg, [key, val]) => Object.assign(userCfg, { [key]: val }), {});

    options = Object.entries(config)
      .filter(([key]) => Object.keys(this._config).includes(key))
      .reduce((options, [key, val]) => Object.assign(options, { [key]: val }), {});

    Object.assign(this._config, options);

    this.Config.setUserConfig(userCfg);
  }

  showEditor(): TemplateResult {
    let entity = this.Config.FindEntity(this.selection.entity);
    let action = this.Config.FindAction(this.selection.entity, this.selection.action);
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
     ${action.hasOwnProperty('variable') ? this.getLevelPanel(action['variable']!) : ''}
    <div class="card-section">
      <div class="header">${localize('fields.days')}</div>
      <div class="day-list">
        <mwc-button class="day-item${this.selection.daysType == 'daily' ? ' active' : ''}" index="daily" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_daily')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'weekdays' ? ' active' : ''}" index="weekdays" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_weekdays')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'custom' ? ' active' : ''}" index="custom" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_custom')}</mwc-button>
      </div>
      <div class="day-list${this.selection.daysType == 'custom' ? '' : ' closed'}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.daysCustom.includes(1) ? ' active' : ''}" index="1" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.mon')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(2) ? ' active' : ''}" index="2" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.tue')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(3) ? ' active' : ''}" index="3" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.wed')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(4) ? ' active' : ''}" index="4" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.thu')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(5) ? ' active' : ''}" index="5" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.fri')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(6) ? ' active' : ''}" index="6" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sat')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(7) ? ' active' : ''}" index="7" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sun')}</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <time-picker value=${this.selection.time.value} event=${this.selection.time.event} stepSize="${this._config.time_step}" formatAmPm="${this._config.am_pm}" sunrise="${this._config.sunrise}" sunset="${this._config.sunset}" @change="${this.updateTime}"></timepicker>
    </div>

    <div class="card-section last">
      <mwc-button outlined @click="${() => this.editItemCancel()}">${localize('actions.cancel')}</mwc-button>
      ${this.selection.editItem === undefined ? '' : html`<mwc-button outlined @click="${() => this.editItemDelete()}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${() => this.editItemSave()}">${localize('actions.save')}</mwc-button>
    </div>
    `;
  }


  showRoutineEditor(): TemplateResult {
    let entity = this.Config.FindEntity(this.selection.entity);
    let action = this.Config.FindAction(this.selection.entity, this.selection.action);
    let actions = this.Config.GetActionsForEntity(this.selection.entity).filter(e => e.routine);
    let activeSlot = !isNaN(this.selection.activePlannerSlot!) ? this.selection.plannerSlots![this.selection.activePlannerSlot!] : null;
    let activeAction = activeSlot ? actions.find(e => { return e.id == activeSlot!.action }) : null;

    if (!this.selection.plannerSlots) Object.assign(this.selection, { plannerSlots: defaultRoutineSlots });

    if (activeAction && activeAction.variable) {
      let i = this.selection.activePlannerSlot!;
      let entries: ITimeSlot[] = [... this.selection.plannerSlots!];
      let activeSlot = { ...entries[i] };

      Object.assign(activeSlot, { level: this.selection.level, levelEnabled: this.selection.levelEnabled });

      entries[i] = activeSlot;
      this.selection.plannerSlots = entries;
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
    <div class="card-section">
      <div class="header">${localize('fields.days')}</div>
      <div class="day-list">
        <mwc-button class="day-item${this.selection.daysType == 'daily' ? ' active' : ''}" index="daily" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_daily')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'weekdays' ? ' active' : ''}" index="weekdays" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_weekdays')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'custom' ? ' active' : ''}" index="custom" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_custom')}</mwc-button>
      </div>
      <div class="day-list${this.selection.daysType == 'custom' ? '' : ' closed'}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.daysCustom.includes(1) ? ' active' : ''}" index="1" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.mon')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(2) ? ' active' : ''}" index="2" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.tue')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(3) ? ' active' : ''}" index="3" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.wed')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(4) ? ' active' : ''}" index="4" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.thu')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(5) ? ' active' : ''}" index="5" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.fri')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(6) ? ' active' : ''}" index="6" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sat')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysCustom.includes(7) ? ' active' : ''}" index="7" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sun')}</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <timeslot-editor
        actions=${JSON.stringify(actions)}
        slots=${JSON.stringify(this.selection.plannerSlots)}
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
     ${activeAction && activeAction.hasOwnProperty('variable') ? this.getLevelPanel(activeAction.variable!, true) : ''}

    <div class="card-section last">
      <mwc-button outlined @click="${() => this.editItemCancel()}">${localize('actions.cancel')}</mwc-button>
      ${this.selection.editItem === undefined ? '' : html`<mwc-button outlined @click="${() => this.editItemDelete()}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${() => this.editItemSave()}">${localize('actions.save')}</mwc-button>
    </div>
    `;
  }

  handlePlannerUpdate(e: CustomEvent) {
    let el = e.target as HTMLInputElement;

    if (e.detail.hasOwnProperty('slot')) {
      let num = Number(e.detail.slot);
      this.selection.activePlannerSlot = num;

      let activeSlot = this.selection.plannerSlots![num];
      if (activeSlot.level !== undefined) Object.assign(this.selection, { level: activeSlot.level, levelEnabled: activeSlot.levelEnabled });
      else Object.assign(this.selection, { level: null, levelEnabled: null });

    } else if (e.detail.hasOwnProperty('slots')) {
      let slots: ITimeSlot[] = e.detail.slots;
      this.selection.plannerSlots = [...slots];
    }
    this.requestUpdate();
  }


  getPlannerActions() {
    if (this.selection.activePlannerSlot === null || this.selection.activePlannerSlot === undefined) return html`<div class="text-field">select a timeslot first</div>`;
    let actions = this.Config.GetActionsForEntity(this.selection.entity);
    let activeSlot = this.selection.plannerSlots![this.selection.activePlannerSlot!];

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
    let i = this.selection.activePlannerSlot!;
    let slots: ITimeSlot[] = [... this.selection.plannerSlots!];
    let activeSlot = { ...slots[i] };
    Object.assign(activeSlot, { action: (activeSlot.action == action.id) ? null : action.id });

    if (activeSlot.action && action.variable) {
      Object.assign(this.selection, {
        level: activeSlot.level !== undefined ? activeSlot.level : action.variable.min,
        levelEnabled: activeSlot.levelEnabled !== undefined ? activeSlot.levelEnabled : !action.variable.optional
      });
    }

    slots[i] = activeSlot;
    this.selection.plannerSlots = slots;
    this.requestUpdate();
  }


  getLevelPanel(cfg: IActionVariable, updateCard: boolean = false): TemplateResult {
    return html`
    <div class="card-section">
      <div class="header">${cfg['name']}</div>
      <div class="option-item">
        <variable-slider
          min=${cfg.min}
          max=${cfg.max}
          step=${cfg.step}
          value=${this.selection.level}      
          unit=${cfg.unit}
          optional=${cfg.optional}
          disabled=${!this.selection.levelEnabled}
          show_percentage=${cfg.show_percentage}
          @change="${e => { this.updateLevel(e, updateCard) }}"
        >
        </variable-slider>
      </div>
     </div>`;
  }

  updateLevel(e: Event, updateCard: boolean) {
    let el = e.target as HTMLInputElement;
    this.selection.level = Number(el.value);
    this.selection.levelEnabled = (String(el.disabled) == "false");
    if (updateCard) this.requestUpdate();
  }

  updateDays(action: string): void {
    var daysTypes = Array('daily', 'weekdays', 'custom');
    if (daysTypes.includes(action)) this.selection.daysType = action;
    else {
      if (!this.selection.daysCustom.includes(Number(action))) this.selection.daysCustom.push(Number(action));
      else pull(this.selection.daysCustom, Number(action));
      this.selection.daysType = 'custom';
    }
    this.shadowRoot.querySelectorAll(".day-item").forEach(el => {
      let index = String(el.getAttribute('index'));
      if (daysTypes.includes(index)) {
        if (this.selection.daysType == index) el.classList.add("active");
        else el.classList.remove("active");
      } else if (this.selection.daysCustom.includes(Number(index))) el.classList.add("active");
      else el.classList.remove("active");
    });

    if (this.selection.daysType == 'custom') this.shadowRoot.querySelector('#day-list-custom').classList.remove('closed');
    else this.shadowRoot.querySelector('#day-list-custom').classList.add('closed');
  }

  updateTime(e: CustomEvent) {
    let el = e.target as HTMLInputElement;
    let value = Number(el.value);
    let event = e.detail.event;

    this.selection.time = (event) ? { event: event, value: value } : { value: value };
  }

  editItemSave(): void {
    let data: IHassData, entries: IEntry[];
    if (this.selection.plannerSlots !== undefined) {
      let slots = this.selection.plannerSlots;
      slots = slots.filter(e => e.action);
      entries = slots.map(e => {
        return Object.assign({ ...e }, {
          time: { value: e.startTime },
          days: parseDayArray(this.selection),
          action: e.action!,
          entity: this.selection.entity,
        });
      });
    }
    else {
      entries = [Object.assign({ ... this.selection }, { days: parseDayArray(this.selection) })];
    }

    data = ExportToHass(entries, this.Config);

    if (this.selection.newItem) {
      this._hass!.callService('scheduler', 'add', data);
    } else if (this.selection.editItem) {
      this._hass!.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.selection.editItem }));
    }
    this.selection = { ...DefaultUserSelection };
    this.requestUpdate();

  }

  editItemDelete(): void {
    let entity_id = this.selection.editItem;
    this._hass!.callService('scheduler', 'remove', { entity_id: entity_id });
    this.selection = { ...DefaultUserSelection };
    this.requestUpdate();
  }
}