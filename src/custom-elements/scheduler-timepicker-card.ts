import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant, computeEntity, fireEvent } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import {
  CardConfig,
  ActionElement,
  EntityElement,
  EVariableType,
  LevelVariableConfig,
  LevelVariable,
  ListVariable,
  Entry,
  ListVariableConfig,
  EDayType,
  ETimeEvent,
} from '../types';
import { PrettyPrintIcon, PrettyPrintName, capitalize } from '../helpers';
import { DefaultTimeStep, DefaultActionIcon } from '../const';

import './time-picker';
import './timeslot-editor';
import './variable-slider';
import './dialog-confirm-delete';
import { commonStyle } from '../styles';
import { computeActionDisplay } from '../data/compute_action_display';
import { startOfWeek } from '../data/date-time/start_of_week';
import { weekdayArray, formatWeekday } from '../data/date-time/format_weekday';

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

    const actions = this.actions.map(e => Object.assign(e, { name: computeActionDisplay(e) }));
    actions.sort((a, b) => (a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1));
    this.actions = actions;
  }

  render() {
    if (!this.hass || !this.config || !this.entries || !this.entity || !this.actions) return html``;

    let weekdays = Array.from(Array(7).keys());
    const firstWeekday = startOfWeek(this.hass.language);
    const shiftCount = weekdays.length - weekdayArray.findIndex(e => e.substr(0, 3) == firstWeekday);
    weekdays = [...weekdays.slice(-shiftCount), ...weekdays.slice(0, -shiftCount)];
    const DayOptions = weekdays.map(e =>
      Object({ id: ((e + 6) % 7) + 1, name: formatWeekday(e, this.hass!.language, true) })
    );

    const DayTypeOptions = [
      { id: EDayType.Daily, name: localize('ui.components.date.day_types_short.daily', this.hass.language) },
      { id: EDayType.Workday, name: localize('ui.components.date.day_types_short.workdays', this.hass.language) },
      { id: EDayType.Weekend, name: localize('ui.components.date.day_types_short.weekend', this.hass.language) },
      { id: EDayType.Custom, name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label') },
    ];

    if (!this.timeslots) {
      return html`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${this.config.title !== undefined
          ? typeof this.config.title == 'string'
            ? this.config.title
            : ''
          : localize('ui.panel.common.title', this.hass.language)}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
            <div class="summary">
              <div class="summary-entity">
                <ha-icon icon="${PrettyPrintIcon(this.entity.icon)}"> </ha-icon>
                ${capitalize(
            PrettyPrintName(
              this.entity.name ||
              this.hass!.states[this.entity.id].attributes.friendly_name ||
              computeEntity(this.entity.id)
            )
          )}
              </div>
              <div class="summary-arrow">
                <ha-icon icon="hass:arrow-right"> </ha-icon>
              </div>
              <div class="summary-action">
                <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}"> </ha-icon>
                ${capitalize(this.actions[0].name || computeEntity(this.actions[0].service))}
              </div>
            </div>

            ${this.getVariableEditor()}

            <div class="header">${localize('ui.components.date.days', this.hass.language)}</div>
            <button-group .items=${DayTypeOptions} value=${this.entries[0].days.type} @change=${this.selectDays}>
            </button-group>
            ${this.entries[0].days.type == EDayType.Custom
          ? html`
                  <div>
                    <button-group
                      .items=${DayOptions}
                      .value=${this.entries[0].days.custom_days}
                      min="1"
                      @change=${this.selectDays}
                    >
                    </button-group>
                  </div>
                `
          : ''}

            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <time-picker
              .hass=${this.hass}
              .value=${this.entries[0].time.value}
              .event=${this.entries[0].time.event}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @change=${this.updateTime}
            >
            </time-picker>
          </div>
          <div class="card-actions">
            <mwc-button @click="${this.saveClick}">${this.hass.localize('ui.common.save')}</mwc-button>
            ${this.hass.user.is_admin && this.editItem
          ? html`
                  <mwc-button class="warning" @click=${this.deleteClick}
                    >${this.hass.localize('ui.common.delete')}</mwc-button
                  >
                `
          : ''}
            <mwc-button @click="${this.optionsClick}" style="float: right"
              >${this.hass.localize('ui.dialogs.helper_settings.input_select.options')}</mwc-button
            >
          </div>
        </ha-card>
      `;
    } else {
      return html`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${this.config.title !== undefined
          ? typeof this.config.title == 'string'
            ? this.config.title
            : ''
          : localize('ui.panel.common.title', this.hass.language)}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
            <div class="summary">
              <div class="summary-entity">
                <ha-icon icon="${PrettyPrintIcon(this.entity.icon)}"> </ha-icon>
                ${capitalize(
            PrettyPrintName(
              this.entity.name ||
              this.hass!.states[this.entity.id].attributes.friendly_name ||
              computeEntity(this.entity.id)
            )
          )}
              </div>
              <div class="summary-arrow">
                <ha-icon icon="hass:arrow-right"> </ha-icon>
              </div>
              <div class="summary-action">
                <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
                ${capitalize(localize('ui.panel.entity_picker.make_scheme', this.hass.language))}
              </div>
            </div>

            <div class="header">${localize('ui.components.date.days', this.hass.language)}</div>
            <button-group .items=${DayTypeOptions} value=${this.entries[0].days.type} @change=${this.selectDays}>
            </button-group>
            ${this.entries[0].days.type == EDayType.Custom
          ? html`
                  <div>
                    <button-group
                      .items=${DayOptions}
                      .value=${this.entries[0].days.custom_days}
                      min="1"
                      @change=${this.selectDays}
                    >
                    </button-group>
                  </div>
                `
          : ''}

            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <timeslot-editor
              .hass=${this.hass}
              .actions=${this.actions}
              .entries=${this.entries}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor>

            <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
            <button-group
              .items=${this.activeEntry !== null ? this.actions : []}
              value=${this.activeEntry !== null ? this.entries[this.activeEntry].action : ''}
              optional="true"
              @change=${this.selectAction}
            >
              ${localize('ui.panel.time_picker.no_timeslot_selected', this.hass.language)}
            </button-group>

            ${this.getVariableEditor()}
          </div>
          <div class="card-actions">
            <mwc-button @click=${this.saveClick} ?disabled=${!this.entries.some(e => e.action)}
              >${this.hass.localize('ui.common.save')}</mwc-button
            >
            ${this.hass.user.is_admin && this.editItem
          ? html`
                  <mwc-button class="warning" @click=${this.deleteClick}
                    >${this.hass.localize('ui.common.delete')}</mwc-button
                  >
                `
          : ''}
            <mwc-button @click=${this.optionsClick} style="float: right"
              >${this.hass.localize('ui.dialogs.helper_settings.input_select.options')}</mwc-button
            >
          </div>
        </ha-card>
      `;
    }
  }

  updateActiveEntry(data: Partial<Entry>) {
    if (this.activeEntry === null) return;
    const entries = [...this.entries];
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
    const value = (ev.target as HTMLInputElement).value;
    this.updateActiveEntry({ action: value, variable: undefined });
  }

  getVariableEditor() {
    if (!this.hass || !this.actions || this.activeEntry === null || !this.entries[this.activeEntry].action)
      return html``;
    const actionConfig = this.actions.find(e => e.id == this.entries[this.activeEntry!].action)!;
    if (!actionConfig.variable) return html``;
    if (actionConfig.variable.type == EVariableType.Level) {
      const config = actionConfig.variable as LevelVariableConfig;

      if (!this.entries[this.activeEntry].variable)
        this.updateActiveEntry({
          variable: { type: EVariableType.Level, value: config.min, enabled: !config.optional },
        });
      const val = this.entries[this.activeEntry].variable as LevelVariable;
      return html`
        <div class="header">
          ${config.name || PrettyPrintName(config.field)}
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
    } else if (actionConfig.variable.type == EVariableType.List) {
      const config = actionConfig.variable as ListVariableConfig;
      if (!this.entries[this.activeEntry].variable)
        this.updateActiveEntry({ variable: { type: EVariableType.List, value: config.options[0].value } });

      const val = this.entries[this.activeEntry].variable as ListVariable;
      const options = config.options.map(e => Object.assign({ ...e }, { id: e.value }));
      if (config.options.length <= 1) return html``;
      return html`
        <div class="header">
          ${config.name || PrettyPrintName(config.field)}
        </div>
        <button-group .items=${options} value=${val.value} @change=${this.updateListValue}>
          ${this.hass.localize('ui.dialogs.helper_settings.input_select.no_options')}
        </button-group>
      `;
    } else return html``;
  }

  updateLevelValue(ev: Event) {
    if (this.activeEntry === null) return;
    const el = ev.target as HTMLInputElement;
    this.updateActiveEntry({
      variable: {
        type: EVariableType.Level,
        value: Number(el.value),
        enabled: String(el.disabled) == 'false',
      },
    });
  }

  updateListValue(ev: Event) {
    if (this.activeEntry === null) return;
    const value = (ev.target as HTMLInputElement).value;
    this.updateActiveEntry({
      variable: { type: EVariableType.List, value: value },
    });
  }

  selectDays(ev: Event) {
    const daysCfg = { ...this.entries[0].days };
    const input = (ev.target as HTMLInputElement).value;
    if (Object.values(EDayType).includes(input as EDayType)) {
      if (input == EDayType.Custom && !daysCfg.custom_days) Object.assign(daysCfg, { custom_days: [] });
      Object.assign(daysCfg, { type: input });
    } else {
      Object.assign(daysCfg, { custom_days: [...input] });
    }
    this.entries = this.entries.map(e => Object.assign(e, { days: daysCfg }));
  }

  cancelClick() {
    const myEvent = new CustomEvent('cancelClick');
    this.dispatchEvent(myEvent);
  }

  saveClick() {
    const myEvent = new CustomEvent('saveClick', { detail: this.entries });
    this.dispatchEvent(myEvent);
  }

  optionsClick() {
    const myEvent = new CustomEvent('optionsClick', { detail: this.entries });
    this.dispatchEvent(myEvent);
  }


  async deleteClick(ev) {
    const element = ev.target as HTMLElement;
    const result = await new Promise((resolve) => {

      fireEvent(element, 'show-dialog', {
        dialogTag: 'dialog-confirm-delete',
        dialogImport: () => import('./dialog-confirm-delete'),
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
    if (result) {
      const myEvent = new CustomEvent('deleteClick');
      this.dispatchEvent(myEvent);
    }
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
