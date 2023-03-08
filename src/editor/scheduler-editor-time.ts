import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, computeEntity } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import {
  CardConfig,
  EntityElement,
  EDayType,
  ScheduleConfig,
  Timeslot,
  WeekdayType,
  Action,
  ServiceCall,
  ETimeEvent,
} from '../types';
import { PrettyPrintIcon, PrettyPrintName, capitalize, sortAlphabetically, omit, isEqual, getLocale } from '../helpers';
import { DefaultTimeStep, DefaultActionIcon } from '../const';
import { commonStyle } from '../styles';
import { computeActionDisplay } from '../data/actions/compute_action_display';
import { startOfWeek } from '../data/date-time/start_of_week';
import { weekdayArray, formatWeekday } from '../data/date-time/format_weekday';
import { weekdayType } from '../data/date-time/weekday_type';
import { compareActions } from '../data/actions/compare_actions';
import { assignAction } from '../data/actions/assign_action';
import { parseRelativeTime, stringToTime } from '../data/date-time/time';
import { absToRelTime, relToAbsTime } from '../data/date-time/relative_time';

import '../components/time-picker';
import '../components/timeslot-editor';
import '../components/variable-picker';

@customElement('scheduler-editor-time')
export class SchedulerEditorTime extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  config?: CardConfig;

  @property()
  schedule!: ScheduleConfig;

  @property()
  actions?: Action[];

  @property()
  entities?: EntityElement[];

  @property()
  activeEntry: number | null = null;

  @property()
  activeMarker: number | null = null;

  @property({ type: Boolean })
  timeslots = false;

  @property({ type: Boolean })
  editItem = false;

  @property({ type: Boolean })
  large = false;

  firstUpdated() {
    if (!this.actions || !this.hass) return;
    if (!this.timeslots) this.activeEntry = 0;

    const actions = this.actions.map(e => {
      const action = {
        ...e,
        service_data: omit(e.service_data || {}, ...Object.keys(e.variables || {})),
      };
      return Object.assign(e, {
        name: computeActionDisplay(action),
      });
    });
    actions.sort(sortAlphabetically);
    this.actions = actions;
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get('schedule')) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            schedule: this.schedule,
          },
        })
      );
    }
    return true;
  }

  render() {
    if (!this.hass || !this.config || !this.entities || !this.actions) return html``;
    return html`
      <div class="content">
        <div class="header">
          ${this.hass.localize('ui.panel.config.automation.editor.actions.type.device_id.action')}
        </div>
        ${this.renderSummary()}
        ${!this.timeslots
          ? html`
              ${this.getVariableEditor()} ${this.renderDays()}
              <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
              <time-picker
                .hass=${this.hass}
                .value=${this.schedule.timeslots[0].start}
                stepSize=${this.config.time_step || DefaultTimeStep}
                @change=${(ev: Event) => this.updateActiveEntry({ start: (ev.target as HTMLInputElement).value })}
              >
              </time-picker>
            `
          : html`
              ${this.renderDays()}
              <div class="header">${localize('ui.panel.time_picker.time_scheme', getLocale(this.hass))}</div>

              <timeslot-editor
                .hass=${this.hass}
                .actions=${this.actions}
                .slots=${this.schedule.timeslots}
                stepSize=${this.config.time_step || DefaultTimeStep}
                .large=${this.large}
                @update=${this.handlePlannerUpdate}
              >
              </timeslot-editor>

              ${this.renderMarkerOptions()} ${this.renderActions()} ${this.getVariableEditor()}
            `}
      </div>

      <div class="buttons ${!this.editItem ? 'centered' : ''}">
        ${this.editItem
          ? html`
              <mwc-button
                class="warning"
                @click=${() => this.dispatchEvent(new CustomEvent('deleteClick', { detail: this.schedule }))}
              >
                ${this.hass.localize('ui.common.delete')}
              </mwc-button>
            `
          : ''}
        <mwc-button
          @click=${() => this.dispatchEvent(new CustomEvent('saveClick', { detail: this.schedule }))}
          ?disabled=${!this.schedule.timeslots.filter(e => e.actions.length).length}
        >
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
      </div>
    `;
  }

  renderSummary() {
    if (!this.entities || !this.actions) return html``;
    return html`
      <div class="summary">
        <div class="summary-entity">
          ${this.entities.map(
            entity => html`
              <div>
                <ha-icon icon="${PrettyPrintIcon(entity.icon)}"> </ha-icon>
                ${capitalize(
                  PrettyPrintName(
                    entity.name || this.hass!.states[entity.id].attributes.friendly_name || computeEntity(entity.id)
                  )
                )}
              </div>
            `
          )}
        </div>
        <div class="summary-arrow">
          <ha-icon icon="mdi:arrow-right"> </ha-icon>
        </div>
        <div class="summary-action">
          ${this.timeslots
            ? html`
                <div>
                  <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
                  ${capitalize(localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass!)))}
                </div>
              `
            : html`
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
      Object({ value: weekdayArray[e].substr(0, 3), name: formatWeekday(e, getLocale(this.hass!), true) })
    );

    const DayTypeOptions = [
      { value: EDayType.Daily, name: localize('ui.components.date.day_types_short.daily', getLocale(this.hass)) },
      { value: EDayType.Workday, name: localize('ui.components.date.day_types_short.workdays', getLocale(this.hass)) },
      { value: EDayType.Weekend, name: localize('ui.components.date.day_types_short.weekend', getLocale(this.hass)) },
      {
        value: EDayType.Custom,
        name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label'),
      },
    ];

    return html`
      <div class="header">${localize('ui.components.date.days', getLocale(this.hass))}</div>
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
    if (!this.hass || this.activeMarker !== null) return;

    const selectedAction =
      this.activeEntry !== null && this.schedule.timeslots[this.activeEntry!].actions.length
        ? this.schedule.timeslots[this.activeEntry!].actions[0]
        : null;

    return html`
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.type.device_id.action')}</div>
      <button-group
        .items=${this.activeEntry !== null ? this.actions : []}
        .value=${selectedAction !== null
          ? this.actions?.findIndex(e => compareActions(e, selectedAction!, true))
          : null}
        optional="true"
        @change=${this.selectAction}
      >
        ${localize('ui.panel.time_picker.no_timeslot_selected', getLocale(this.hass))}
      </button-group>
    `;
  }

  renderMarkerOptions() {
    if (!this.hass || !this.config || this.activeMarker === null) return;

    const value = this.schedule.timeslots[this.activeMarker].start;
    const res = parseRelativeTime(value);

    const deltaSunrise = stringToTime(value, this.hass) - stringToTime('sunrise+00:00', this.hass),
      deltaSunset = stringToTime(value, this.hass) - stringToTime('sunset+00:00', this.hass);

    const markerOptions = [
      {
        value: 'time',
        name: this.hass.localize('ui.panel.config.automation.editor.triggers.type.time.at'),
        icon: 'mdi:clock-outline',
      },
      {
        value: ETimeEvent.Sunrise,
        name: this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise'),
        icon: 'mdi:weather-sunny',
        disabled: Math.abs(deltaSunrise) > 3600 * 6,
      },
      {
        value: ETimeEvent.Sunset,
        name: this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset'),
        icon: 'mdi:weather-night',
        disabled: Math.abs(deltaSunset) > 3600 * 6,
      },
    ];

    return html`
      <div class="header">${localize('ui.panel.time_picker.time_input_mode', getLocale(this.hass))}</div>
      <button-group .items=${markerOptions} .value=${res ? res.event : 'time'} @change=${this.updateMarkerSetting}>
      </button-group>
    `;
  }

  updateMarkerSetting(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    const ts = this.schedule.timeslots[this.activeMarker!].start;

    const res =
      value == 'time'
        ? relToAbsTime(ts, this.hass!, { stepSize: this.config!.time_step })
        : absToRelTime(ts, value as ETimeEvent, this.hass!, { stepSize: this.config!.time_step });

    let timeslots = [...this.schedule.timeslots];
    timeslots = Object.assign(timeslots, {
      [this.activeMarker! - 1]: { ...this.schedule.timeslots[this.activeMarker! - 1], stop: res },
      [this.activeMarker!]: { ...this.schedule.timeslots[this.activeMarker!], start: res },
    });
    this.schedule = { ...this.schedule, timeslots: [...timeslots] };
  }

  updateActiveEntry(data: Partial<Timeslot>) {
    if (this.activeEntry === null) return;
    this.schedule = {
      ...this.schedule,
      timeslots: Object.assign([...this.schedule.timeslots], {
        [this.activeEntry]: { ...this.schedule.timeslots[this.activeEntry], ...data },
      }),
    };
  }

  updateActiveEntryAction(data: Partial<ServiceCall> | null, num: number) {
    if (this.activeEntry === null) return;
    if (data && 'service' in data) {
      this.updateActiveEntry({
        actions: Object.assign([...this.schedule.timeslots[this.activeEntry].actions], {
          [num]: { ...this.schedule.timeslots[this.activeEntry].actions[num], ...data },
        }),
      });
    } else if (data) {
      //update service_data
      Object.entries(data).forEach(([key, val]) => {
        let actionConfig = [...this.schedule.timeslots[this.activeEntry!].actions];
        let serviceData =
          typeof val == 'object' && key in this.schedule.timeslots[this.activeEntry!].actions[num]
            ? { ...actionConfig[num][key], ...val }
            : val;
        const invalidParams = Object.keys(serviceData).filter(e => serviceData[e] === null);
        if (invalidParams.length) serviceData = omit(serviceData, ...invalidParams);

        actionConfig = Object.assign(actionConfig, {
          [num]: { ...actionConfig[num], [key]: serviceData },
        });
        this.updateActiveEntry({ actions: actionConfig });
      });
    } else {
      this.updateActiveEntry({
        actions: [...this.schedule.timeslots[this.activeEntry].actions].filter((_, i) => i != num),
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
        timeslots: [...entries],
      };
    } else if (ev.detail.hasOwnProperty('entry')) {
      this.activeMarker = null;
      this.activeEntry = ev.detail.entry !== null ? Number(ev.detail.entry) : null;
    }
    if (ev.detail.hasOwnProperty('marker')) {
      this.activeEntry = null;
      this.activeMarker = ev.detail.marker !== null ? Number(ev.detail.marker) : null;
    }
  }

  selectAction(ev: CustomEvent) {
    if (!this.actions || this.activeEntry === null) return;
    const action: Action | null = ev.detail;
    if (action) {
      this.entities!.map(e => e.id).forEach((entity_id, num) => {
        this.updateActiveEntryAction(assignAction(entity_id, action), num);
      });
    } else {
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
      if (!this.actions!.find(e => compareActions(e, action, true) && Object.keys(e.variables || {}).length)) return;
      if (!actions.some(e => isEqual(e, action))) actions.push(action);
    });

    return actions.map(action => {
      return Object.entries(this.actions!.find(e => compareActions(e, action, true))!.variables!).map(
        ([field, variable]) => {
          return html`
            <div class="header">
              ${variable.name || PrettyPrintName(field)}
            </div>
            <scheduler-variable-picker
              .variable=${variable}
              .value=${action.service_data ? action.service_data[field] : null}
              @value-changed=${(ev: CustomEvent) =>
                this.entities!.forEach((_, num) => {
                  this.updateActiveEntryAction(
                    {
                      service_data: { [field]: ev.detail.value },
                    },
                    num
                  );
                })}
            >
              ${this.hass!.localize('ui.dialogs.helper_settings.input_select.no_options')}
            </scheduler-variable-picker>
          `;
        }
      );
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
    } else {
      weekdays = (value as unknown) as WeekdayType;
    }
    this.schedule = {
      ...this.schedule,
      weekdays: weekdays,
    };
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
