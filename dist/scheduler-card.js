import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import Entitylist from "./entitylist.js"
import {
  ImportEntity,
  ExportEntity,
  parseWeekdays,
  parseTime,
} from "./helpers.js"

const EntityIdPattern = /^switch.schedule_[0-9a-f]{6}$/;


class SchedulerCard extends LitElement {
  set hass(hass) {

    if (this.initialized && !this.listenForEntities) return;
    this._hass = hass;
    this.initialized = true;

    this._entities = Object.keys(hass.states)
      .filter(id => id.match(EntityIdPattern))
      .reduce((obj, key) => {
        obj[key] = hass.states[key];
        return obj;
      }, {});
    this.selection = {};

    this.config = new Entitylist(hass);
    this.config.Parselist(this.cardInfo);

    if (hass.states['sun.sun'] !== undefined) {
      let time_sunrise = new Date(hass.states['sun.sun'].attributes['next_rising']);
      let time_sunset = new Date(hass.states['sun.sun'].attributes['next_setting']);

      this.sunData = {
        sunrise: `${time_sunrise.getHours()}:${time_sunrise.getMinutes()}`,
        sunset: `${time_sunset.getHours()}:${time_sunset.getMinutes()}`
      };
    }
  }

  render() {
    if (this.selection.newItem || this.selection.editItem !== undefined) {
      if (this.selection.newItemConfirmed || this.selection.editItem !== undefined) {
        return html`
          <ha-card>
            <div class="card-header">Scheduler</div>
            ${this.getEditor()}
          </ha-card>
        `;
      }
      return html`
          <ha-card>
            <div class="card-header">Scheduler</div>
            <div class="card-section first">
              <div class="header">Group</div>
              <div class="option-list">
              ${this.getGroups()}
              </div>
            </div>
            <div class="card-section">
              <div class="header">Entity</div>
              <div class="option-list">
              ${this.getEntities()}
              </div>
            </div>
            <div class="card-section">
              <div class="header">Action</div>
              <div class="option-list">
              ${this.getActions()}
              </div>
            </div>
            <div class="card-section last">
              <mwc-button outlined @click="${(e) => this.editItemCancel()}">cancel</mwc-button>
              ${this.selection.action ? html`<mwc-button outlined @click="${(e) => this.newItemConfirm()}">Next</mwc-button>` : html`<mwc-button outlined disabled>Next</mwc-button>`}
            </div>
          </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="card-header">Scheduler</div>
        <div class="card-section first">
          ${this.getList()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${(e) => { this.newItem() }}">Add item</mwc-button>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    this.cardInfo = config;
  }

  getGroups() {
    if (!Object.keys(this.config.Groups()).length) return html`<div class="text-field">There are no groups defined</div>`;
    return Object.values(this.config.Groups()).map(el => {
      return html`
      <mwc-button class="${this.selection.group == el.id ? ' active' : ''}" @click="${(e) => { this.selectGroup(el.id) }}">
        <ha-icon icon="mdi:${el.icon}" class="padded-right"></ha-icon>
        ${el.name}
      </mwc-button>
      `;
    });
  }

  getEntities() {
    if (!this.selection.group) return html`<div class="text-field">Select a group first</div>`;
    if (!this.config.Groups(this.selection.group).entities.length) return html`<div class="text-field">This group has no entities</div>`;
    return this.config.Groups(this.selection.group).entities.map(el => {
      return html`
      <mwc-button class="${this.selection.entity == el ? ' active' : ''}" @click="${(e) => { this.selectEntity(el.id) }}">
        <ha-icon icon="mdi:${el.icon}" class="padded-right"></ha-icon>
        ${el.name}
      </mwc-button>
      `;
    });
  }

  getActions() {
    if (!this.selection.entity) return html`<div class="text-field">Select an entity first</div>`;
    if (!this.selection.entity.GetActions().length) return html`<div class="text-field">This entity has no actions</div>`;
    return this.selection.entity.GetActions().map(el => {
      return html`
      <mwc-button class="${this.selection.action == el ? ' active' : ''}" @click="${(e) => { this.selectAction(el.id) }}">
        <ha-icon icon="mdi:${el.icon}" class="padded-right"></ha-icon>
        ${el.name}
      </mwc-button>
      `;
    });
  }

  selectGroup(el) {
    if (this.selection.group && this.selection.group == el) return; //no change
    Object.assign(this.selection, {
      group: el,
      entity: null,
      action: null
    });
    this.requestUpdate();
  }

  selectEntity(el) {
    if (this.selection.entity && this.selection.entity == el) return; //no change
    Object.assign(this.selection, {
      entity: this.config.Entities(el),
      action: null
    });
    this.requestUpdate();
  }

  selectAction(el) {
    if (this.selection.action && this.selection.action == el) return;
    Object.assign(this.selection, {
      action: this.selection.entity.GetActions(el)
    });
    this.requestUpdate();
  }

  newItem() {
    this.selection = {
      newItem: true
    };
    this.requestUpdate();
  }

  newItemConfirm() {
    Object.assign(this.selection, {
      newItemConfirmed: true,
      timeHours: '12',
      timeMinutes: '00',
      days: [],
      daysType: 'daily',
      sun: false
    });
    this.requestUpdate();
  }

  getList() {
    var list = Object.entries(this._entities).filter(([id, el]) => {

      if (el.state == 'unavailable') return false;
      if (el.state == 'initializing') return false;
      return true;
    });

    if (!Object.keys(list).length) {
      return html`
      <div class="text-field">
        There are no items to show
      </div>
      `;
    }

    return list.map(([id, cfg]) => {
      var data = ImportEntity(this._entities[id], this.config, this.sunData);
      if (!data) return ``;

      let disabled = (cfg.state == 'off');
      let time = parseTime(`${data.timeHours}:${data.timeMinutes}`, data.timeRaw);
      let days = parseWeekdays(data.days);

      return html`
      <div class="list-item${disabled ? ' disabled' : ''}" @click="${(e) => this.editItem(id)}">
        <div class="list-item-icon">
          <ha-icon icon="mdi:${data.entity.icon}"></ha-icon>
        </div>
        <div class="list-item-name">
          ${data.entity.name}
        </div>
        <div class="list-item-action">
          ${data.action.name}
        </div>
        <div class="list-item-days">
          ${days}
        </div>
        <div class="list-item-time">
          ${time}
        </div>
        <div class="list-item-switch">
          ${disabled ? html`<ha-switch @click="${(e) => this.toggleDisable(id, e)}"></ha-switch>` : html`<ha-switch checked="checked" @click="${(e) => this.toggleDisable(id, e)}"></ha-switch>`}
        </div>
      </div>`;
    });
  }


  toggleDisable(entity_id, evt) {
    evt.stopPropagation();
    let enabled = !evt.target.checked;
    if (enabled) {
      this._hass.callService('switch', 'turn_on', { entity_id: entity_id });
    } else {
      this._hass.callService('switch', 'turn_off', { entity_id: entity_id });
    }
    this.waitForUpdate(entity_id);
  }

  editItem(entity_id) {
    var data = ImportEntity(this._entities[entity_id], this.config, this.sunData);
    if (!data) return; //should never occur
    Object.assign(this.selection, data);
    Object.assign(this.selection, { editItem: entity_id });
    this.requestUpdate();
  }

  waitForUpdate(entity_id) {
    this.listenForEntities = true;
    clearInterval(this.timer);
    clearTimeout(this.timeout);
    if (!entity_id) var old_state = Object.keys(this._hass.states).filter(e => { return (e.startsWith('scheduler.') && this._hass.states[e].state != 'initializing') }).length;
    else var old_state = this._hass.states[entity_id];

    this.timer = setInterval(() => {
      if (!entity_id) var new_state = Object.keys(this._hass.states).filter(e => { return (e.startsWith('scheduler.') && this._hass.states[e].state != 'initializing') }).length;
      else var new_state = this._hass.states[entity_id];

      if (old_state != new_state) {
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        this.requestUpdate();
        this.listenForEntities = false;
      }
    }, 100);

    this.timeout = setTimeout(() => {
      clearInterval(this.timer);
      this.requestUpdate();
    }, 1000);

  }

  getEditor() {
    let entity = this.selection.entity;
    let action = this.selection.action;

    return html`
      <div class="card-section first">
        <div class="header">Action</div>
        <div class="summary">
          <div class="summary-entity">
            <div class="summary-icon">
              <ha-icon icon="mdi:${entity.icon}"></ha-icon>
            </div>
            <div class="summary-text">
              ${entity.name}
            </div>
          </div>
          <div class="summary-arrow">
            <ha-icon icon="mdi:arrow-right"></ha-icon>
          </div>
          <div class="summary-action">
            <div class="summary-icon">
              <ha-icon icon="mdi:${action.icon}"></ha-icon>
            </div>
            <div class="summary-text">
              ${action.name}
            </div>
          </div>
        </div>
       </div>


      <div class="card-section">
        <div class="header">Days</div>
        <div class="day-list">
          <mwc-button class="day-item${this.selection.daysType == 'daily' ? ' active' : ''}" index="daily" @click="${(e) => this.updateDays(e.target)}">every day</mwc-button>
          <mwc-button class="day-item${this.selection.daysType == 'weekdays' ? ' active' : ''}" index="weekdays" @click="${(e) => this.updateDays(e.target)}">weekdays</mwc-button>
          <mwc-button class="day-item${this.selection.daysType == 'custom' ? ' active' : ''}" index="custom" @click="${(e) => this.updateDays(e.target)}">other</mwc-button>
        </div>
        <div class="day-list${this.selection.daysType == 'custom' ? '' : ' closed'}" id="day-list-custom">
          <mwc-button class="day-item${this.selection.days.includes(1) ? ' active' : ''}" index="1" @click="${(e) => this.updateDays(e.target)}">mon</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(2) ? ' active' : ''}" index="2" @click="${(e) => this.updateDays(e.target)}">tue</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(3) ? ' active' : ''}" index="3" @click="${(e) => this.updateDays(e.target)}">wed</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(4) ? ' active' : ''}" index="4" @click="${(e) => this.updateDays(e.target)}">thu</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(5) ? ' active' : ''}" index="5" @click="${(e) => this.updateDays(e.target)}">fri</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(6) ? ' active' : ''}" index="6" @click="${(e) => this.updateDays(e.target)}">sat</mwc-button>
          <mwc-button class="day-item${this.selection.days.includes(7) ? ' active' : ''}" index="7" @click="${(e) => this.updateDays(e.target)}">sun</mwc-button>
        </div>
      </div>
        
      <div class="card-section">
        <div class="header">Time</div>
        <div class="time-picker">
          <div class="time-picker-hours-up">
            <mwc-button @click="${(e) => this.updateTime('time-hours-up')}">
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </mwc-button>
          </div>
          <div class="time-picker-hours" id="time-hours">
          ${this.selection.timeHours}
          </div>
          <div class="time-picker-hours-down">
            <mwc-button @click="${(e) => this.updateTime('time-hours-down')}">
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </mwc-button>
          </div>

          <div class="time-picker-separator">
          :
          </div>

          <div class="time-picker-minutes-up">
            <mwc-button @click="${(e) => this.updateTime('time-minutes-up')}">
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </mwc-button>
          </div>
          <div class="time-picker-minutes" id="time-minutes">
          ${this.selection.timeMinutes}
          </div>
          <div class="time-picker-minutes-down">
            <mwc-button @click="${(e) => this.updateTime('time-minutes-down')}">
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </mwc-button>
          </div>
        </div>
      </div>
      <div class="card-section">
        <div class="header">Options</div>
          <div class="option-item">
            ${this.selection.sun ? html`<paper-checkbox checked name="option-item-sun" @change="${(e) => this.toggleSun(e.target)}">automatically adjust time to sunrise/sunset</paper-checkbox>` : html`<paper-checkbox name="option-item-sun" @change="${(e) => this.toggleSun(e.target)}">automatically adjust time to sunrise/sunset</paper-checkbox>`}
          </div>
        </div>
      </div>
      <div class="card-section last">
        <mwc-button outlined @click="${(e) => this.editItemCancel()}">Cancel</mwc-button>
        ${this.selection.editItem === undefined ? '' : html`<mwc-button outlined @click="${(e) => this.editItemDelete()}">Delete</mwc-button>`}
        <mwc-button outlined @click="${(e) => this.editItemSave()}">Save</mwc-button>
      </div>
    `;

  }

  toggleSun(obj) {
    this.selection.sun = obj.checked;
  }

  editItemCancel() {
    this.selection = {};
    this.requestUpdate();
  }

  editItemSave() {
    var data = ExportEntity(this.selection, this.sunData);

    if (this.selection.newItem) {
      this._hass.callService('scheduler', 'add', data);
      this.waitForUpdate(null);
    } else {
      this._hass.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.selection.editItem }));
      this.waitForUpdate(this.selection.editItem);
    }
    this.selection = {};
  }

  editItemDelete() {
    let entity_id = this.selection.editItem;
    this._hass.callService('scheduler', 'remove', { entity_id: entity_id });
    this.selection = {};
    this.waitForUpdate();
  }

  getCardSize() {
    return 3;
  }

  updateTime(action) {
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

    hours = (hours < 10) ? `0${hours}` : `${hours}`;
    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

    this.shadowRoot.querySelector('#time-hours').innerHTML = hours;
    this.shadowRoot.querySelector('#time-minutes').innerHTML = minutes;

    this.selection.timeHours = hours;
    this.selection.timeMinutes = minutes;
  }

  updateDays(obj) {
    let action = obj.getAttribute('index');
    var daysTypes = Array('daily', 'weekdays', 'custom');
    if (daysTypes.includes(action)) this.selection.daysType = action;
    else {
      action = Number(action);
      if (!this.selection.days.includes(action)) this.selection.days.push(action);
      else this.selection.days.splice(this.selection.days.indexOf(action), 1);
      this.selection.daysType = 'custom';
    }
    this.shadowRoot.querySelectorAll(".day-item").forEach((el, i) => {
      var index = el.getAttribute('index');
      if (index.length == 1) index = Number(index);
      if (daysTypes.includes(index)) {
        if (this.selection.daysType == index) el.classList.add("active");
        else el.classList.remove("active");
      } else if (this.selection.days.includes(index)) el.classList.add("active");
      else el.classList.remove("active");
    });

    if (this.selection.daysType == 'custom') this.shadowRoot.querySelector('#day-list-custom').classList.remove('closed');
    else this.shadowRoot.querySelector('#day-list-custom').classList.add('closed');
  }



  static get styles() {
    return css`
      /* list view */

      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        grid-template-rows: min-content min-content min-content min-content;
        grid-template-areas: "icon name switch"
                             "icon action switch"
                             "icon days switch"
                             "icon time switch";
        grid-gap: 2px 20px;
        background: var(--list-item-background-color);
        cursor: pointer;
        padding: 10px 20px;
      }

      div.list-item:hover {
        background: var(--paper-grey-200);
      }

      div.list-item-icon {
        grid-area: icon;
        color: var(--state-icon-color);
      }

      div.list-item-icon ha-icon {
        width: 24px;
        height: 24px;
      }

      div.list-item-icon.enabled {
        color: var(--state-icon-active-color);
      }

      div.list-item-switch {
        grid-area: switch;
      }

      div.list-item-switch ha-switch {
        margin-top: 3px;
      }

      div.list-item-name {
        grid-area: name;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-action {
        grid-area: action;
        color: var(--secondary-text-color);
      }

      div.list-item-days {
        grid-area: days;
        color: var(--secondary-text-color);
      }

      div.list-item-time {
        grid-area: time;
        color: var(--secondary-text-color);
      }

      div.list-item-name:first-letter, div.list-item-action:first-letter, div.list-item-days:first-letter, div.list-item-time:first-letter {
        text-transform: capitalize;
      }

      div.disabled div.list-item-icon, div.disabled div.list-item-name, div.disabled div.list-item-action, div.disabled div.list-item-days, div.disabled div.list-item-time {
        color: var(--disabled-text-color);
      }


      /* add/edit view */
   

      div.header {
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        margin: 0px 0px 0px 0px;
      }

      div.card-section {
        padding: 10px 10px;
      }

      div.card-section.first {
        padding-top: 0px;
      }
      
      div.card-section.last {
        padding-bottom: 10px;
      }

      div.text-field {
        color: var(--disabled-text-color);
      }

      div.summary {
        display: grid;
        grid-template-columns: 1fr max-content 1fr;
        grid-template-areas: "entity arrow action";
        grid-auto-flow: column;
        grid-gap: 5px;
      }

      div.summary-entity { grid-area: entity; }
      div.summary-action { grid-area: action; }
      div.summary-text { grid-area: text; }
      div.summary-icon { grid-area: icon; }

      div.summary-arrow {
        grid-area: arrow;
        color: var(--secondary-text-color);
        display: flex;
        justify-content:center;
        align-items:center;
      }

      div.summary-entity, div.summary-action {
        color: var(--dark-primary-color);
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        --mdc-icon-size: 20px;
        position: relative;
        display: flex;
        justify-content:center;
        align-items:center;

        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-areas: "icon text";
        grid-auto-flow: column;
        grid-gap: 10px;
      }

       div.summary-entity:before, div.summary-action:before  {
        content: " ";
        background: var(--primary-color);
        opacity: 0.15;
        border-radius: 4px;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
       }

       div.summary-text::first-letter {
        text-transform: uppercase;
       }

      div.time-picker {
        display: grid;
        grid-template-columns: min-content min-content min-content;
        grid-template-rows: min-content min-content min-content;
        grid-template-areas: "hours-up   .         minutes-up"
                             "hours      separator minutes"
                             "hours-down .         minutes-down";
        grid-gap: 10px 0px;
        align-items: center;
      }

      div.time-picker-hours-up { grid-area: hours-up; }
      div.time-picker-hours { grid-area: hours; }
      div.time-picker-hours-down { grid-area: hours-down; }
      div.time-picker-separator { grid-area: separator; }
      div.time-picker-minutes-up { grid-area: minutes-up; }
      div.time-picker-minutes { grid-area: minutes; }
      div.time-picker-minutes-down { grid-area: minutes-down; }

      div.time-picker-hours-up, div.time-picker-hours-down, div.time-picker-minutes-up, div.time-picker-minutes-down {
        --mdc-icon-size: 42px;
      }

      div.time-picker-hours, div.time-picker-minutes {
        font-size: 42px;
        text-align: center;
      }

      div.time-picker-separator {
        font-size: 36px;
      }

      div#day-list-custom.closed {
        display: none;
      }
      
      div#day-list-custom {
        overflow: hidden;
        max-height: 100px; /* approximate max height */
        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      }

      mwc-button {
        margin: 2px 0px;
      }
      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }

      div.option-item {
        padding: 2px 5px;
      }
      
      .padded-right {
        margin-right: 11px;
      }
      `;
  }
}

customElements.define('scheduler-card', SchedulerCard);

window.customCards.push({ type: 'scheduler-card', name: 'Scheduler', description: 'Card to help with scheduling.' });
