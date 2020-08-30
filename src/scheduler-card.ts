
import { LitElement, html, customElement, property, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import _ from "lodash";
import { Config } from './config-parser';
import { IButtonEntry, IUserSelection } from './types'
import { DefaultUserSelection } from './default-config'
import { ExportToHass, ImportFromHass, PrettyPrintDays, PrettyPrintTime, ComputeDaysType, PrettyPrintName, IsSchedulerEntity } from './helpers'
import { styles } from './styles';
import { ValidateConfig } from './config-validation'

@customElement('scheduler-card')
export class SchedulerCard extends LitElement {

  static get styles(): CSSResult {
    return styles;
  }

  @property()
  Config;

  entries: any[] = [];

  selection: IUserSelection = { ...DefaultUserSelection };

  @property({ type: Number })
  count = 0;
  shadowRoot: any;
  await_update: boolean = true;


  @property() private _hass?: HomeAssistant;

  set hass(hass: HomeAssistant) {
    if (!this.await_update) return;
    if (!this.Config) return;

    if (!this._hass) this.Config.LoadEntities(hass.states);
    this.update_entries(hass);
    this._hass = hass;
  }

  protected update_entries(hass) {
    let entries = _.filter(hass.states, entity => IsSchedulerEntity(entity.entity_id))
      .map(e => ImportFromHass(e, this.Config))
      .filter(e => { return e.actions[0] !== undefined });

    if (entries != this.entries) {
      this.entries = entries;
      this.await_update = false;
      this.requestUpdate();
    }
  }

  protected awaitUpdate() {
    this.await_update = true;
  }

  protected render(): TemplateResult {
    if (!this.selection.newItem && !this.selection.editItem) {
      return html`
      <ha-card>
        <div class="card-header">Scheduler</div>
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${() => { this.newItem() }}">Add item</mwc-button>
        </div>
      </ha-card>
      `;

    } else if (this.selection.newItem && !this.selection.actionConfirmed) {
      return html`
        <ha-card>
          <div class="card-header">Scheduler</div>
          <div class="card-section first">
            <div class="header">Group</div>
            <div class="option-list">
            ${this.getGroups()}
            </div>
            <div class="header">Entity</div>
            <div class="option-list">
            ${this.getEntities()}
            </div>
            <div class="header">Action</div>
            <div class="option-list">
            ${this.getActions()}
            </div>
          </div>
          <div class="card-section last">
            <mwc-button outlined @click="${() => this.editItemCancel()}">cancel</mwc-button>
            ${this.selection.action ? html`<mwc-button outlined @click="${() => this.newItemConfirm()}">Next</mwc-button>` : html`<mwc-button outlined disabled>Next</mwc-button>`}
          </div>
        </ha-card>
      `;
    }
    else {
      return html`
      <ha-card>
        <div class="card-header">Scheduler</div>
        ${this.showEditor()}
      </ha-card>
      `;
    }
  }

  private newItem() {
    this.selection = _.extend({ ...DefaultUserSelection }, {
      newItem: true,
    });
    this.requestUpdate();
  }

  private editItemCancel() {
    this.selection = { ...DefaultUserSelection };
    this.requestUpdate();
  }

  private newItemConfirm() {
    this.selection = _.extend({ ...DefaultUserSelection }, {
      newItem: true,
      actionConfirmed: true,
      entity: this.selection.entity,
      action: this.selection.action
    });
    this.requestUpdate();
  }

  getEntries(): TemplateResult[] {
    if (!this.entries || !this.entries.length) return [html`
      <div class="text-field">
        There are no items to show
      </div>
    `];
    return this.entries.map(entry => {
      if (!entry.actions[0]) return html``;
      let entity = this.Config.GetEntity(entry.actions[0].entity);
      let action = this.Config.GetAction(entry.actions[0].entity, entry.actions[0].action);

      return html`
      <div class="list-item${entry['enabled'] ? '' : ' disabled'}" @click="${() => this.editItem(entry.id)}">
        <div class="list-item-icon">
          ${entity.icon ? html`<ha-icon icon="hass:${entity.icon}"></ha-icon>` : ''}
        </div>
        <div class="list-item-name">
          ${PrettyPrintName(entity.name)}
        </div>
        <div class="list-item-action">
          ${PrettyPrintName(action.name)}
        </div>
        <div class="list-item-days">
          ${PrettyPrintDays(entry.entries[0].days)}
        </div>
        <div class="list-item-time">
          ${PrettyPrintTime(_.pick(entry.entries[0], ['time', 'event', 'offset']))}
        </div>
        <div class="list-item-switch">
          ${entry['enabled'] ? html`<ha-switch checked="checked" @click="${(e) => this.toggleDisable(entry.id, e)}"></ha-switch>` : html`<ha-switch @click="${(e) => this.toggleDisable(entry.id, e)}"></ha-switch>`}
        </div>
      </div>
      `;
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
    this.awaitUpdate();
  }

  editItem(entity_id) {
    let data = _.find(this.entries, { id: entity_id });
    this.selection = _.extend({ ...DefaultUserSelection }, {
      editItem: entity_id,
      entity: data['actions'][0].entity,
      action: data['actions'][0].action,
      timeHours: data['entries'][0].time.split(':').shift(),
      timeMinutes: data['entries'][0].time.split(':').pop(),
      days: data['entries'][0].days,
      daysType: ComputeDaysType(data['entries'][0].days),
      sun: (data['entries'][0].event !== undefined),
    });
    this.requestUpdate();
  }

  getGroups(): TemplateResult[] {
    let groups = this.Config.GetGroups();
    if (!_(groups).size()) return [html`<div class="text-field">There are no groups defined</div>`];
    return _.map(groups, (el: IButtonEntry, key: string) => {
      return html`
        <mwc-button class="${this.selection.group == key ? ' active' : ''}" @click="${() => { this.selectGroup(key) }}">
          ${el.icon ? html`<ha-icon icon="hass:${el.icon}" class="padded-right"></ha-icon>` : ''}
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
    if (!this.selection.group) return [html`<div class="text-field">Select a group first</div>`];
    let entities = this.Config.GetEntities(this.selection.group);
    if (!_(entities).size()) return [html`<div class="text-field">There are no entities in this group</div>`];
    return _.map(entities, (el: IButtonEntry, key: string) => {
      return html`
        <mwc-button class="${this.selection.entity == key ? ' active' : ''}" @click="${() => { this.selectEntity(key) }}">
          ${el.icon ? html`<ha-icon icon="hass:${el.icon}" class="padded-right"></ha-icon>` : ''}
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

  getActions(): TemplateResult[] {
    if (!this.selection.entity) return [html`<div class="text-field">Select an entity first</div>`];
    let actions = this.Config.GetActions(this.selection.entity);
    if (!_(actions).size()) return [html`<div class="text-field">There are no actions for this entity</div>`];
    return _.map(actions, (el: IButtonEntry, key: string) => {
      return html`
        <mwc-button class="${this.selection.action == key ? ' active' : ''}" @click="${() => { this.selectAction(key) }}">
          ${el.icon ? html`<ha-icon icon="hass:${el.icon}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
    })
  }

  selectAction(action: string): void {
    Object.assign(this.selection, {
      action: action
    });
    this.requestUpdate();
  }

  setConfig(config) {
    ValidateConfig(config);
    this.Config = new Config(config);
  }

  showEditor(): TemplateResult {
    let entity = this.Config.GetEntity(this.selection.entity);
    let action = this.Config.GetAction(this.selection.entity, this.selection.action);

    return html`
    <div class="card-section first">
      <div class="header">Action</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${entity.icon ? html`<ha-icon icon="hass:${entity.icon}"></ha-icon>` : ''}
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
            ${action.icon ? html`<ha-icon icon="hass:${action.icon}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(action.name)}
          </div>
        </div>
      </div>
     </div>
    <div class="card-section">
      <div class="header">Days</div>
      <div class="day-list">
        <mwc-button class="day-item${this.selection.daysType == 'daily' ? ' active' : ''}" index="daily" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">every day</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'weekdays' ? ' active' : ''}" index="weekdays" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">weekdays</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'custom' ? ' active' : ''}" index="custom" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">other</mwc-button>
      </div>
      <div class="day-list${this.selection.daysType == 'custom' ? '' : ' closed'}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.days.includes(1) ? ' active' : ''}" index="1" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">mon</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(2) ? ' active' : ''}" index="2" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">tue</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(3) ? ' active' : ''}" index="3" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">wed</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(4) ? ' active' : ''}" index="4" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">thu</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(5) ? ' active' : ''}" index="5" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">fri</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(6) ? ' active' : ''}" index="6" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">sat</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(7) ? ' active' : ''}" index="7" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">sun</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">Time</div>
      <div class="time-picker">
        <div class="time-picker-hours-up">
          <mwc-button @click="${() => this.updateTime('time-hours-up')}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-hours" id="time-hours">
        ${this.selection.timeHours}
        </div>
        <div class="time-picker-hours-down">
          <mwc-button @click="${() => this.updateTime('time-hours-down')}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-separator">
        :
        </div>
        <div class="time-picker-minutes-up">
          <mwc-button @click="${() => this.updateTime('time-minutes-up')}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-minutes" id="time-minutes">
        ${this.selection.timeMinutes}
        </div>
        <div class="time-picker-minutes-down">
          <mwc-button @click="${() => this.updateTime('time-minutes-down')}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
      </div>
    </div>
    <div class="card-section">
      <div class="header">Options</div>
        <div class="option-item">
          ${this.selection.sun ? html`<paper-checkbox checked name="option-item-sun" @change="${(e) => this.toggleSun(e.target.checked)}">automatically adjust time to sunrise/sunset</paper-checkbox>` : html`<paper-checkbox name="option-item-sun" @change="${(e) => this.toggleSun(e.target)}">automatically adjust time to sunrise/sunset</paper-checkbox>`}
        </div>
      </div>
    </div>
    <div class="card-section last">
      <mwc-button outlined @click="${() => this.editItemCancel()}">Cancel</mwc-button>
      ${this.selection.editItem === undefined ? '' : html`<mwc-button outlined @click="${() => this.editItemDelete()}">Delete</mwc-button>`}
      <mwc-button outlined @click="${() => this.editItemSave()}">Save</mwc-button>
    </div>
    `;
  }

  updateDays(action: string): void {
    var daysTypes = Array('daily', 'weekdays', 'custom');
    if (daysTypes.includes(action)) this.selection.daysType = action;
    else {
      if (!this.selection.days.includes(Number(action))) this.selection.days.push(Number(action));
      else _.pull(this.selection.days, Number(action));
      this.selection.daysType = 'custom';
    }
    this.shadowRoot.querySelectorAll(".day-item").forEach(el => {
      let index = String(el.getAttribute('index'));
      if (daysTypes.includes(index)) {
        if (this.selection.daysType == index) el.classList.add("active");
        else el.classList.remove("active");
      } else if (this.selection.days.includes(Number(index))) el.classList.add("active");
      else el.classList.remove("active");
    });

    if (this.selection.daysType == 'custom') this.shadowRoot.querySelector('#day-list-custom').classList.remove('closed');
    else this.shadowRoot.querySelector('#day-list-custom').classList.add('closed');
  }

  updateTime(action: string): void {
    let hours = Number(this.selection.timeHours);
    let minutes = Number(this.selection.timeMinutes);

    if (action == 'time-hours-up') hours++;
    else if (action == 'time-hours-down') hours--;
    else if (action == 'time-minutes-up') minutes += 10;
    else if (action == 'time-minutes-down') minutes -= 10;

    if (hours < 0) hours = 23;
    else if (hours > 23) hours = 0;
    else if (minutes < 0) minutes = 50;
    else if (minutes > 50) minutes = 0;

    let hours_string = String(hours).padStart(2, '0');
    let minutes_string = String(minutes).padStart(2, '0');

    this.shadowRoot.querySelector('#time-hours').innerHTML = hours_string;
    this.shadowRoot.querySelector('#time-minutes').innerHTML = minutes_string;

    this.selection.timeHours = hours_string;
    this.selection.timeMinutes = minutes_string;
  }

  editItemSave(): void {
    var data = ExportToHass(this.selection, this.Config);

    if (this.selection.newItem) {
      this._hass!.callService('scheduler', 'add', data);
    } else if (this.selection.editItem) {
      this._hass!.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.selection.editItem }));
    }
    this.selection = { ...DefaultUserSelection };
    this.awaitUpdate();

  }

  editItemDelete(): void {
    let entity_id = this.selection.editItem;
    this._hass!.callService('scheduler', 'remove', { entity_id: entity_id });
    this.selection = { ...DefaultUserSelection };
    this.awaitUpdate();
  }

  toggleSun(selected: boolean): void {
    this.selection.sun = selected;
  }
}

// declare global {  
//   interface HTMLElementTagNameMap {
//     'scheduler-card': SchedulerCard;
//   }
// }
