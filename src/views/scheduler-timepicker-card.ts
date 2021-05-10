import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant, computeEntity, fireEvent } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import {
  CardConfig,
  EntityElement,
  EVariableType,
  EDayType,
  ScheduleConfig,
  Timeslot,
  WeekdayType,
  Action,
  LevelVariable,
  ServiceCall,
} from '../types';
import { PrettyPrintIcon, PrettyPrintName, capitalize, sortAlphabetically, omit, isEqual } from '../helpers';
import { DefaultTimeStep, DefaultActionIcon } from '../const';

import '../components/time-picker';
import '../components/timeslot-editor';
import '../components/timeslot-editor-new';
import '../components/variable-picker';
import '../components/dialog-delete-confirm';
import { commonStyle } from '../styles';
import { computeActionDisplay } from '../data/actions/compute_action_display';
import { startOfWeek } from '../data/date-time/start_of_week';
import { weekdayArray, formatWeekday } from '../data/date-time/format_weekday';
import { weekdayType } from '../data/date-time/weekday_type';
import { compareActions } from '../data/actions/compare_actions';
import { importAction } from '../data/actions/import_action';

@customElement('scheduler-timepicker-card')
export class SchedulerTimepickerCard extends LitElement {
  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() schedule!: ScheduleConfig;
  @property() actions?: Action[];
  @property() entities?: EntityElement[];
  @property() activeEntry: number | null = null;
  @property({ type: Boolean }) timeslots = false;
  @property({ type: Boolean }) editItem = false;

  firstUpdated() {
    if (!this.actions || !this.hass) return;
    if (!this.timeslots) this.activeEntry = 0;

    const actions = this.actions.map(e => Object.assign(e, { name: computeActionDisplay(e) }));
    actions.sort(sortAlphabetically);

    this.actions = actions;
  }

  render() {
    if (!this.hass || !this.config || !this.entities || !this.actions) return html``;
    return html`
        <ha-card>
          <div class="card-header">
            <div class="name">
            ${this.config.title
        ? typeof this.config.title == 'string'
          ? this.config.title
          : localize('ui.panel.common.title', this.hass.language)
        : ''}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
            ${this.renderSummary()}

       ${!this.timeslots
        ?
        html`
            ${this.getVariableEditor()}
            ${this.renderDays()}
            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <time-picker
              .hass=${this.hass}
              .value=${this.schedule.timeslots[0].start}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @change=${(ev: Event) => this.updateActiveEntry({ start: (ev.target as HTMLInputElement).value })}
            >
            </time-picker>
            `
        :
        html`
            ${this.renderDays()}
            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <timeslot-editor
              .hass=${this.hass}
              .actions=${this.actions}
              .entries=${this.schedule.timeslots}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor>
            <timeslot-editor-new
              .hass=${this.hass}
              .actions=${this.actions}
              .slots=${this.schedule.timeslots}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor-new>
            ${this.renderActions()}
            ${this.getVariableEditor()}
            `
      }
          </div>
          <div class="card-actions">
            <mwc-button @click="${this.saveClick}">${this.hass.localize('ui.common.save')}</mwc-button>
            ${this.editItem
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
  }

  renderSummary() {
    if (!this.entities || !this.actions) return html``;
    return html`
<div class="summary">
  <div
    class="summary-entity"
    @click=${this.editActionClick}
  >
  ${this.entities.map(entity => html`
    <div>
      <ha-icon icon="${PrettyPrintIcon(entity.icon)}"> </ha-icon>
      ${capitalize(
      PrettyPrintName(
        entity.name ||
        this.hass!.states[entity.id].attributes.friendly_name ||
        computeEntity(entity.id)
      )
    )}
    </div>
`)}
  </div>
  <div class="summary-arrow">
    <ha-icon icon="hass:arrow-right"> </ha-icon>
  </div>
  <div
    class="summary-action"
    @click=${this.editActionClick}
  >
  ${this.timeslots
        ?
        html`
    <div>
      <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
      ${capitalize(localize('ui.panel.entity_picker.make_scheme', this.hass!.language))}
    </div>
  ` : html`
    <div>
      <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}"> </ha-icon>
      ${capitalize(this.actions[0].name || computeEntity(this.actions[0].service))}
    </div>
    `}
  </div>
  </div>
    `;
  }

  renderDays() {
    if (!this.hass) return html``;

    let weekdays = Array.from(Array(7).keys());
    const firstWeekday = startOfWeek(this.hass.language);
    const shiftCount = weekdays.length - weekdayArray.findIndex(e => e.substr(0, 3) == firstWeekday);
    weekdays = [...weekdays.slice(-shiftCount), ...weekdays.slice(0, -shiftCount)];
    const DayOptions = weekdays.map(e =>
      Object({ value: weekdayArray[e].substr(0, 3), name: formatWeekday(e, this.hass!.language, true) })
    );

    const DayTypeOptions = [
      { value: EDayType.Daily, name: localize('ui.components.date.day_types_short.daily', this.hass.language) },
      { value: EDayType.Workday, name: localize('ui.components.date.day_types_short.workdays', this.hass.language) },
      { value: EDayType.Weekend, name: localize('ui.components.date.day_types_short.weekend', this.hass.language) },
      { value: EDayType.Custom, name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label') },
    ];

    return html`
      <div class="header">${localize('ui.components.date.days', this.hass.language)}</div>
      <button-group .items=${DayTypeOptions} value=${weekdayType(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${weekdayType(this.schedule.weekdays) == EDayType.Custom
        ? html`
            <div>
              <button-group
                .items=${DayOptions}
                .value=${this.schedule.weekdays}
                min="1"
                multiple
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `
        : ''}
    `;
  }

  renderActions() {
    if (!this.hass) return;

    const selectedAction = this.activeEntry !== null
      ? this.schedule.timeslots[this.activeEntry!].actions.map(e => importAction(e, this.hass!)).shift() || null
      : null;

    return html`
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
      <button-group
        .items=${this.activeEntry !== null ? this.actions : []}
        .value=${selectedAction !== null ? this.actions?.findIndex(e => compareActions(e, selectedAction!)) : null}
        optional="true"
        @change=${this.selectAction}
      >
        ${localize('ui.panel.time_picker.no_timeslot_selected', this.hass.language)}
      </button-group>
    `;
  }

  updateActiveEntry(data: Partial<Timeslot>) {
    if (this.activeEntry === null) return;
    this.schedule = {
      ...this.schedule,
      timeslots: Object.assign(
        [...this.schedule.timeslots],
        { [this.activeEntry]: { ...this.schedule.timeslots[this.activeEntry], ...data } }
      )
    };
  }

  updateActiveEntryAction(data: Partial<ServiceCall> | null, num: number) {
    if (this.activeEntry === null) return;
    if (data && 'service' in data) {
      this.updateActiveEntry({
        actions: Object.assign(
          [...this.schedule.timeslots[this.activeEntry].actions],
          { [num]: { ...this.schedule.timeslots[this.activeEntry].actions[num], ...data } })
      });
    }
    else if (data) {
      Object.entries(data).forEach(([key, val]) => {
        if (typeof val == "object" && key in this.schedule.timeslots[this.activeEntry!].actions[num]) {
          this.updateActiveEntry({
            actions: Object.assign(
              [...this.schedule.timeslots[this.activeEntry!].actions],
              {
                [num]: {
                  ...this.schedule.timeslots[this.activeEntry!].actions[num], [key]: {
                    ...this.schedule.timeslots[this.activeEntry!].actions[num][key],
                    ...val
                  }
                }
              })
          });
        }
        else {
          this.updateActiveEntry({
            actions: Object.assign(
              [...this.schedule.timeslots[this.activeEntry!].actions],
              { [num]: { ...this.schedule.timeslots[this.activeEntry!].actions[num], [key]: val } })
          });
        }
      });
    }
    else {
      this.updateActiveEntry({
        actions: [...this.schedule.timeslots[this.activeEntry].actions]
          .filter((_, i) => i != num)
      });
    }
  }

  handlePlannerUpdate(ev: CustomEvent) {
    if (ev.detail.hasOwnProperty('entries')) {
      const entries: Timeslot[] = ev.detail.entries;
      if (entries.length < this.schedule.timeslots.length && this.activeEntry == this.schedule.timeslots.length - 1)
        this.activeEntry = this.schedule.timeslots.length - 2;
      this.schedule = {
        ...this.schedule,
        timeslots: [...entries]
      }
    } else if (ev.detail.hasOwnProperty('entry')) {
      if (ev.detail.entry !== null) {
        this.activeEntry = Number(ev.detail.entry);
      } else {
        this.activeEntry = null;
      }
    }
  }

  selectAction(ev: CustomEvent) {
    if (!this.actions || this.activeEntry === null) return;
    const action: Action | null = ev.detail;
    if (action) {
      this.entities!.map(e => e.id).forEach((entity_id, num) => {
        let service_data = action.service_data || {};
        Object.entries(action.variables || {}).forEach(([field, config]) => {
          if (config.type == EVariableType.Level) {
            config = config as LevelVariable;
            if (!(field in service_data) && !config.optional)
              service_data = { ...service_data, [field]: config.min };
          }
        });
        this.updateActiveEntryAction({
          entity_id: entity_id,
          service: action.service,
          service_data: service_data
        }, num);
      });
    }
    else {
      this.entities!.forEach((_, num) => {
        this.updateActiveEntryAction(null, num);
      });
    }
  }

  getVariableEditor() {
    if (this.activeEntry === null || !this.actions) return html``;

    const actions: ServiceCall[] = [];
    this.schedule.timeslots[this.activeEntry].actions.forEach(action => {
      action = omit(action, 'entity_id');
      if (!this.actions!.find(e => compareActions(e, action) && Object.keys(e.variables || {}).length)) return;
      if (!actions.some(e => isEqual(e, action))) actions.push(action);
    });

    return actions.map(action => {
      return Object.entries(this.actions!.find(e => compareActions(e, action))!.variables!).map(([field, variable]) => {
        return html`
          <div class="header">
            ${variable.name || PrettyPrintName(field)}
          </div>
          <scheduler-variable-picker
            .variable=${variable}
            .value=${action.service_data ? action.service_data[field] : null}
            @change=${(ev: CustomEvent) => this.entities!.forEach((_, num) => {
          this.updateActiveEntryAction({
            service_data: { [field]: (ev.target as HTMLInputElement).value }
          }, num);
        })}
          >
            ${this.hass!.localize('ui.dialogs.helper_settings.input_select.no_options')}
          </scheduler-variable-picker>
        `;
      })
    });
  }

  selectDays(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    let weekdays = this.schedule.weekdays;
    if (Object.values(EDayType).includes(value as EDayType)) {
      switch (value as EDayType) {
        case EDayType.Daily:
          weekdays = ['daily'];
          break;
        case EDayType.Workday:
          weekdays = ['workday'];
          break;
        case EDayType.Weekend:
          weekdays = ['weekend'];
          break;
        case EDayType.Custom:
          weekdays = [];
          break;
      }
    }
    else {
      weekdays = value as unknown as WeekdayType;
    }
    this.schedule = {
      ...this.schedule,
      weekdays: weekdays
    };
  }

  cancelClick() {
    const myEvent = new CustomEvent('cancelClick');
    this.dispatchEvent(myEvent);
  }

  saveClick() {
    const myEvent = new CustomEvent('saveClick', { detail: this.schedule });
    this.dispatchEvent(myEvent);
  }

  optionsClick() {
    const myEvent = new CustomEvent('optionsClick', { detail: this.schedule });
    this.dispatchEvent(myEvent);
  }

  editActionClick() {
    const myEvent = new CustomEvent('editActionClick', { detail: this.schedule });
    this.dispatchEvent(myEvent);
  }

  async deleteClick(ev) {
    const element = ev.target as HTMLElement;
    const result = await new Promise((resolve) => {

      fireEvent(element, 'show-dialog', {
        dialogTag: 'dialog-delete-confirm',
        dialogImport: () => import('../components/dialog-delete-confirm'),
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
      padding: 5px;
      font-size: 14px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      background: rgba(var(--rgb-primary-color), 0.15);
      border-radius: 4px;
      align-items: center;
    }
    div.summary-entity div,
    div.summary-action div {
      display: flex;
      flex-grow: 1;
      margin: 5px;
      width: 100%;
      align-items: center;
    }
    div.summary-entity ha-icon,
    div.summary-action ha-icon {
      display: flex;
      flex: 0 0 30px;
    }
  `;
}
