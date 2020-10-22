import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant, computeEntity } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { CardConfig, ActionElement, EntityElement, EVariableType, LevelVariableConfig, LevelVariable, ListVariable, Entry, ListVariableConfig } from '../types';
import { PrettyPrintIcon, PrettyPrintName, capitalize } from '../helpers';
import { EDayType, daysToArray, ETimeEvent, sortDaylist } from '../date-time';
import { DayTypeOptions, DayOptions, CreateTimeScheme, DefaultTimeStep, FieldTemperature, DefaultActionIcon } from '../const';


import './time-picker';
import './timeslot-editor';
import './variable-slider';
import { commonStyle } from '../styles';
import { formatAction } from '../formatAction';

@customElement('scheduler-timepicker-card')
export class SchedulerTimepickerCard extends LitElement {

  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() entries: Entry[] = [];
  @property() actions?: ActionElement[];
  @property() entity?: EntityElement;
  @property() activeEntry: number | null = null;
  @property({ type: Boolean }) timeslots = false;
  @property({ type: Boolean }) editItem = false;

  firstUpdated() {
    if (!this.actions || !this.hass) return;
    if (!this.timeslots) this.activeEntry = 0;
    else {
      let actions = this.actions
        .map(e => e.name ? e : Object.assign(e, { name: formatAction(e, this.hass!) }));
      actions.sort((a, b) => a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1);
      this.actions = actions;
    }
  }

  render() {
    if (!this.hass || !this.config || !this.entries || !this.entity || !this.actions) return html``;

    if (!this.timeslots) {
      return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
          </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${localize('fields.action')}</div>
          <div class="summary">
            <div class="summary-entity">
              <ha-icon icon="${PrettyPrintIcon(this.entity.icon)}">
              </ha-icon>
              ${capitalize(PrettyPrintName(this.entity.name || this.hass!.states[this.entity.id].attributes.friendly_name || computeEntity(this.entity.id)))}
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right">
              </ha-icon>
            </div>
            <div class="summary-action">
              <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}">
              </ha-icon>
              ${capitalize(formatAction(this.actions[0], this.hass))}
            </div>
          </div>

          ${this.getVariableEditor()}

          <div class="header">${localize('fields.days')}</div>
          <button-group .items=${DayTypeOptions} value=${this.entries[0].days.type} @change=${this.selectDays}>
          </button-group>
          ${this.entries[0].days.type == EDayType.Custom ? html`
            <div>
              <button-group .items=${sortDaylist(DayOptions, this.config.first_weekday)} .value=${this.entries[0].days.custom_days} min="1" @change=${this.selectDays}>
              </button-group>
            </div>
          ` : ''}

          <div class="header">${localize('fields.time')}</div>
          <time-picker
            .hass=${this.hass}
            .value=${this.entries[0].time.value}
            .event=${this.entries[0].time.event}
            stepSize=${this.config.time_step || DefaultTimeStep}
            ?formatAmPm=${this.config.am_pm}
            @change=${this.updateTime}
          >
          </time-picker>
        </div>
        <div class="card-actions">
          <mwc-button @click="${this.saveClick}">${localize('actions.save')}</mwc-button>
          ${this.hass.user.is_admin && this.editItem ? html`<mwc-button class="warning" @click=${this.deleteClick}>${localize('actions.delete')}</mwc-button>` : ''}
          <mwc-button @click="${this.optionsClick}" style="float: right">options</mwc-button>
        </div>
      </ha-card>`;
    }
    else {
      return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
          </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${localize('fields.action')}</div>
          <div class="summary">
            <div class="summary-entity">
              <ha-icon icon="${PrettyPrintIcon(this.entity.icon)}">
              </ha-icon>
              ${capitalize(PrettyPrintName(this.entity.name || this.hass!.states[this.entity.id].attributes.friendly_name || computeEntity(this.entity.id)))}
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right">
              </ha-icon>
            </div>
            <div class="summary-action">
              <ha-icon icon="${PrettyPrintIcon('chart-timeline')}">
              </ha-icon>
              ${capitalize(PrettyPrintName(CreateTimeScheme))}
            </div>
          </div>

          <div class="header">${localize('fields.days')}</div>
          <button-group .items=${DayTypeOptions} value=${this.entries[0].days.type} @change=${this.selectDays}>
          </button-group>
          ${this.entries[0].days.type == EDayType.Custom ? html`
            <div>
              <button-group .items=${sortDaylist(DayOptions, this.config.first_weekday)} .value=${this.entries[0].days.custom_days} min="1" @change=${this.selectDays}>
              </button-group>
            </div>
          ` : ''}

          <div class="header">${localize('fields.time')}</div>
          <timeslot-editor
            .hass=${this.hass}
            .actions=${this.actions}
            .entries=${this.entries}
            @update=${this.handlePlannerUpdate}
          >
          </timeslot-editor>
          
          <div class="header">${localize('fields.action')}</div>
          <button-group
            .items=${this.activeEntry !== null ? this.actions.map(e => e.icon ? e : Object.assign(e, { icon: DefaultActionIcon })) : []}
            value=${this.activeEntry !== null ? this.entries[this.activeEntry].action : ''}
            optional="true"
            @change=${this.selectAction}
          >
            Select a timeslot first
          </button-group>

          ${this.getVariableEditor()}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.saveClick} ?disabled=${!this.entries.some(e => e.action)}>${localize('actions.save')}</mwc-button>
          ${this.hass.user.is_admin && this.editItem ? html`<mwc-button class="warning" @click=${this.deleteClick}>${localize('actions.delete')}</mwc-button>` : ''}
          <mwc-button @click=${this.optionsClick} style="float: right">options</mwc-button>
        </div>
      </ha-card>`;
    }
  }

  updateActiveEntry(data: Partial<Entry>) {
    if (this.activeEntry === null) return;
    let entries = [...this.entries];
    Object.assign(entries[this.activeEntry], data);
    this.entries = entries;
  }

  updateTime(ev: CustomEvent) {
    const el = ev.target as HTMLInputElement;
    const value = Number(el.value);
    const event = ev.detail.event as ETimeEvent;
    this.updateActiveEntry({ time: ev.detail.event ? { event: event, value: value } : { value: value } });
  }

  handlePlannerUpdate(ev: CustomEvent) {
    if (ev.detail.hasOwnProperty('entries')) {
      const entries: Entry[] = ev.detail.entries;
      if (entries.length < this.entries.length && this.activeEntry == this.entries.length - 1)
        this.activeEntry = this.entries.length - 2;
      this.entries = [...entries];
      // if (this.activeEntry !== null) this._entry = this.entries[this.activeEntry];
      // this._entry = { ...this._entry };
    } else if (ev.detail.hasOwnProperty('entry')) {
      if (ev.detail.entry !== null) {
        this.activeEntry = Number(ev.detail.entry);
      } else {
        this.activeEntry = null;
      }
    }
  }

  selectAction(ev: Event) {
    if (!this.actions || !this.entries || this.activeEntry === null) return;
    let value = (ev.target as HTMLInputElement).value;
    this.updateActiveEntry({ action: value, variable: undefined });
  }

  getVariableEditor() {
    if (!this.hass || !this.actions || this.activeEntry === null || !this.entries[this.activeEntry].action) return html``;
    let actionConfig = this.actions.find(e => e.id == this.entries[this.activeEntry!].action)!;
    if (!actionConfig.variable) return html``;
    if (actionConfig.variable.type == EVariableType.Level) {
      let config = actionConfig.variable as LevelVariableConfig;

      if (!this.entries[this.activeEntry].variable)
        this.updateActiveEntry({ variable: { type: EVariableType.Level, value: config.min, enabled: !config.optional } });
      let val = this.entries[this.activeEntry].variable as LevelVariable;
      return html`
          <div class="header">
            ${config.name || localize(`service_parameters.${config.field}`) || PrettyPrintName(config.field)}
          </div>
          <variable-slider
            min=${config.min}
            max=${config.max}
            step=${config.step}
            value=${val.value}
            unit=${config.unit}
            ?optional=${config.optional}
            ?disabled=${!val.enabled}
            @change=${this.updateLevelValue}
          >
          </variable-slider>
      `;
    }
    else if (actionConfig.variable.type == EVariableType.List) {
      let config = actionConfig.variable as ListVariableConfig;
      if (!this.entries[this.activeEntry].variable)
        this.updateActiveEntry({ variable: { type: EVariableType.List, value: config.options[0].value } });

      let val = this.entries[this.activeEntry].variable as ListVariable;

      return html`
        <div class="header">
          ${config.name || localize(`service_parameters.${config.field}`) || PrettyPrintName(config.field)}
        </div>
        <button-group
          .items=${config.options.map(e => Object.assign(e, { name: e.value }))}
          value=${val.value}
          @change=${this.updateListValue}
        >
          ${localize('instructions.no_entries_defined')}
        </button-group>
    `;
    }
    else return html``;
  }

  updateLevelValue(ev: Event) {
    if (this.activeEntry === null) return;
    const el = ev.target as HTMLInputElement;
    this.updateActiveEntry({
      variable: {
        type: EVariableType.Level,
        value: Number(el.value),
        enabled: String(el.disabled) == 'false',
      }
    });
  }

  updateListValue(ev: Event) {
    if (this.activeEntry === null) return;
    const value = (ev.target as HTMLInputElement).value;
    this.updateActiveEntry({
      variable: { type: EVariableType.List, value: value }
    });
  }

  selectDays(ev: Event) {
    let daysCfg = { ...this.entries[0].days };
    const input = (ev.target as HTMLInputElement).value;
    if (Object.values(EDayType).includes(input as EDayType)) {
      if (input == EDayType.Custom && !daysCfg.custom_days)
        Object.assign(daysCfg, { custom_days: daysToArray(daysCfg) });
      Object.assign(daysCfg, { type: input });
    } else {
      Object.assign(daysCfg, { custom_days: [...input] });
    }
    this.entries = this.entries.map(e => Object.assign(e, { days: daysCfg }));
  }

  cancelClick() {
    let myEvent = new CustomEvent("cancelClick");
    this.dispatchEvent(myEvent);
  }

  saveClick() {
    let myEvent = new CustomEvent("saveClick", { detail: this.entries });
    this.dispatchEvent(myEvent);
  }

  optionsClick() {
    let myEvent = new CustomEvent("optionsClick", { detail: this.entries });
    this.dispatchEvent(myEvent);
  }

  deleteClick() {
    let myEvent = new CustomEvent("deleteClick");
    this.dispatchEvent(myEvent);
  }


  static styles = css`
    ${commonStyle}
    div.summary {
      display: grid;
      grid-template-columns: 1fr max-content 1fr;
      grid-template-areas: 'entity arrow action';
      grid-auto-flow: column;
      grid-gap: 5px;
    }

    div.summary-entity {
      grid-area: entity;
    }
    div.summary-action {
      grid-area: action;
    }
    div.summary-arrow {
      grid-area: arrow;
      color: var(--secondary-text-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div.summary-entity,
    div.summary-action {
      color: var(--dark-primary-color);
      padding: 10px;
      font-size: 14px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-template-areas: 'icon text';
      grid-auto-flow: column;
      grid-gap: 10px;
    }

    div.summary-entity:before,
    div.summary-action:before {
      content: ' ';
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

    
  `;
}