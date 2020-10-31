import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ImportedEntry, CardConfig, ScheduleEntity, ETimeEvent, EDayType, Days } from '../types';
import { parseTimestamp, MinutesPerHour, formatTime } from '../date-time';
import { PrettyPrintName, capitalize, PrettyPrintIcon } from '../helpers';
import { HomeAssistant } from 'custom-card-helpers';
import { importEntry } from '../data/import_entry';
import { WorkdaySensor } from '../const';
import { localize } from '../localize/localize';

import './my-relative-time';
import { parseAction } from '../data/parse_action';
import { parseEntity } from '../data/parse_entity';
import { importAction } from '../data/import_action';
import { computeActionDisplay } from '../data/compute_action_display';
import { weekday } from '../data/date-time/day_object';
import { weekdayArray, formatWeekday } from '../data/date-time/format_weekday';
import { formatAmPm } from '../data/date-time/format_time';

@customElement('scheduler-entity-row')
export class ScheduleEntityRow extends LitElement {
  @property() hass?: HomeAssistant;
  @property() schedule_entity?: string;
  @property() config?: CardConfig;

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1 && this.schedule_entity) {
      return oldHass.states[this.schedule_entity] !== this.hass!.states[this.schedule_entity];
    }
    return true;
  }

  render() {
    if (!this.config || !this.hass || !this.schedule_entity) return html``;
    const stateObj = this.hass.states[this.schedule_entity] as ScheduleEntity;
    if (!stateObj) {
      return html`
        <hui-warning>
          ${this.hass.localize('state_badge.default.entity_not_found')}: '${this.schedule_entity}'
        </hui-warning>
      `;
    }

    const entries: ImportedEntry[] = stateObj.attributes.entries.map(importEntry);
    const nextEntry = this.computeNextEntry(entries);

    const action = importAction(nextEntry.actions.map(e => stateObj.attributes.actions[e])[0]);
    const actionConfig = parseAction(action, this.hass, this.config);
    const entityConfig = parseEntity(action.entity, this.hass, this.config);

    const entityName = entityConfig.name;
    const icon =
      this.config.display_options && this.config.display_options.icon && this.config.display_options.icon == 'entity'
        ? entityConfig.icon
        : actionConfig.icon;

    const computeDisplayItem = (displayItem: string): string => {
      switch (displayItem) {
        case 'name':
          return stateObj.attributes.friendly_name?.match(/^schedule\ #[0-9a-f]{6}$/i)
            ? ''
            : capitalize(stateObj.attributes.friendly_name!);
        case 'relative-time':
          return `<my-relative-time></my-relative-time>`;
        case 'additional-tasks':
          return entries.length > 1
            ? '+' +
                localize(
                  'ui.panel.overview.additional_tasks',
                  this.hass!.language,
                  '{number}',
                  String(entries.length - 1)
                )
            : '';
        case 'time':
          return capitalize(this.computeTime(nextEntry));
        case 'days':
          return capitalize(this.computeDays(nextEntry.days));
        case 'entity':
          return entityName.length ? capitalize(PrettyPrintName(entityName)) : '';
        case 'action':
          return capitalize(computeActionDisplay(actionConfig));
        default:
          const regex = /\{([^\}]+)\}/;
          let res;
          while ((res = regex.exec(displayItem))) {
            displayItem = displayItem.replace(res[0], String(computeDisplayItem(String(res[1]))));
          }
          return displayItem;
      }
    };

    const renderDisplayItems = (displayItem: string | string[]) => {
      const replaceRelativeTime = (input: string) => {
        const parts = input.split('<my-relative-time></my-relative-time>');
        if (parts.length == 1) return unsafeHTML(input);
        return html`
          ${parts[0] ? unsafeHTML(parts[0]) : ''}
          <my-relative-time .hass=${this.hass} .datetime=${this.computeTimestamp(nextEntry)}> </my-relative-time>
          ${parts[1] ? unsafeHTML(parts[1]) : ''}
        `;
      };

      return typeof displayItem == 'string'
        ? replaceRelativeTime(computeDisplayItem(displayItem))
        : displayItem.map(e => {
            const string = computeDisplayItem(e);
            return string
              ? html`
                  ${replaceRelativeTime(string)}<br />
                `
              : '';
          });
    };

    return html`
      <state-badge .hass=${this.hass} .stateObj=${stateObj} .overrideIcon=${PrettyPrintIcon(icon)}> </state-badge>
      <div class="info">
        ${!this.config.display_options || !this.config.display_options.primary_info
          ? renderDisplayItems('{entity}: {action}')
          : renderDisplayItems(this.config.display_options.primary_info)}
        <div class="secondary">
          ${!this.config.display_options || !this.config.display_options.secondary_info
            ? renderDisplayItems(['relative-time', 'additional-tasks'])
            : renderDisplayItems(this.config.display_options.secondary_info)}
        </div>
      </div>
      <ha-switch ?checked=${stateObj.state == 'waiting' || stateObj.state == 'triggered'} @click=${this.toggleDisabled}>
      </ha-switch>
    `;
  }

  computeTimestamp(entry: ImportedEntry) {
    const now = new Date();
    const ts = new Date();
    ts.setSeconds(0);

    let value = entry.time.value;

    if (entry.time.event) {
      const sunEntity = this.hass!.states['sun.sun'];
      if (!sunEntity) return new Date(0);
      const ts_ref =
        entry.time.event == ETimeEvent.Sunrise
          ? parseTimestamp(sunEntity.attributes.next_rising)
          : parseTimestamp(sunEntity.attributes.next_setting);
      value = ts_ref + entry.time.value;
    }

    const hours = Math.floor(value / MinutesPerHour);
    const minutes = value - hours * MinutesPerHour;
    ts.setHours(hours);
    ts.setMinutes(minutes);

    const workdayEntity = this.hass!.states[WorkdaySensor];

    function blockByWorkdayEntity(ts: Date) {
      if (!workdayEntity) return false;
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const days_diff = Math.floor((ts.valueOf() - startOfDay.valueOf()) / (24 * 3600 * 1000));
      if (days_diff != 0) return false;
      if (entry.days.type == EDayType.Workday) return workdayEntity.state != 'on';
      else if (entry.days.type == EDayType.Weekend) return workdayEntity.state == 'on';
      return false;
    }

    function daysToArray(dayConfig: Days): number[] {
      switch (dayConfig.type) {
        case EDayType.Daily:
          return [1, 2, 3, 4, 5, 6, 7];
        case EDayType.Workday:
          if (workdayEntity)
            return workdayEntity.attributes.workdays
              .map(e => weekdayArray.findIndex(day => day.substr(0, 3) == e))
              .map(e => ((e + 6) % 7) + 1);
          return [1, 2, 3, 4, 5];
        case EDayType.Weekend:
          if (workdayEntity) {
            const workdays = workdayEntity.attributes.workdays.map(e =>
              weekdayArray.findIndex(day => day.substr(0, 3) == e)
            ) as number[];
            return weekdayArray
              .map((_, i) => (workdays.includes(i) ? null : i))
              .filter(e => e !== null)
              .map(e => ((e! + 6) % 7) + 1);
          }
          return [6, 7];
        case EDayType.Custom:
          return dayConfig.custom_days as number[];
        default:
          return [];
      }
    }
    const days = daysToArray(entry.days);

    while (ts.valueOf() <= now.valueOf() || !days.includes(weekday(ts)) || blockByWorkdayEntity(ts)) {
      ts.setDate(ts.getDate() + 1);
    }
    return ts;
  }

  computeNextEntry(entries: ImportedEntry[]) {
    const timestamps = entries.map(e => this.computeTimestamp(e));

    let minimum = -1;
    let indexMinimum = -1;
    timestamps.forEach((time, index) => {
      if (minimum === -1 || time.valueOf() < minimum) {
        minimum = time.valueOf();
        indexMinimum = index;
      }
    });
    return entries[indexMinimum];
  }

  computeDays(days: Days) {
    function findSequence(list: number[]): number[] {
      const len: number[] = [];
      for (let i = 0; i < list.length - 1; i++) {
        let j = i + 1;
        while (list[j] - list[j - 1] == 1) j++;
        len.push(j - i);
      }
      return len;
    }

    if (!this.hass) return '';
    switch (days.type) {
      case EDayType.Daily:
        return localize('ui.components.date.day_types_long.daily', this.hass.language);
      case EDayType.Workday:
        return localize('ui.components.date.day_types_long.workdays', this.hass.language);
      case EDayType.Weekend:
        return localize('ui.components.date.day_types_long.weekend', this.hass.language);
      case EDayType.Custom:
        const list = days.custom_days || [];
        list.sort();
        const seq = findSequence(list);
        const len = Math.max(...seq);
        if (list.length == 6) {
          const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !list.includes(e));
          return localize(
            'ui.components.date.repeated_days_except',
            this.hass.language,
            '{excludedDays}',
            formatWeekday(missing.pop()!, this.hass!.language)
          );
        }
        const dayNames = list.map(e => formatWeekday(e, this.hass!.language));
        if (list.length >= 3 && len >= 3) {
          const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
          dayNames.splice(
            start,
            len,
            localize(
              'ui.components.date.days_range',
              this.hass.language,
              ['{startDay}', '{endDay}'],
              [dayNames[start], dayNames[start + len - 1]]
            )
          );
        }
        const daysString =
          dayNames.length > 1
            ? `${dayNames.slice(0, -1).join(', ')} ${this.hass.localize('ui.common.and')} ${dayNames.pop()}`
            : `${dayNames.pop()}`;
        return localize('ui.components.date.repeated_days', this.hass!.language, '{days}', daysString);
      default:
        return '';
    }
  }

  computeTime(entry: ImportedEntry) {
    if (!this.hass) return '';
    if (!entry.endTime) {
      const time = entry.time;
      if (!time.event)
        return localize(
          'ui.components.time.absolute',
          this.hass.language,
          '{time}',
          formatTime(time.value, { amPm: formatAmPm(this.hass.language) }).time
        );
      else {
        const eventString =
          time.event == ETimeEvent.Sunrise
            ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').toLowerCase()
            : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset').toLowerCase();
        if (Math.abs(time.value) < 5) return localize('ui.time.at_sun_event', '{sunEvent}', eventString);

        const signString =
          time.value < 0
            ? this.hass
                .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
                .slice(0, -1)
                .toLowerCase()
            : this.hass
                .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
                .slice(0, -1)
                .toLowerCase();
        const timeStr = formatTime(time.value, { absolute: true }).time;

        return `${timeStr} ${signString} ${eventString}`;
      }
    } else {
      const start = formatTime(entry.time.value, { amPm: formatAmPm(this.hass!.language) }).time;
      const end = formatTime(entry.endTime.value, { amPm: formatAmPm(this.hass!.language) }).time;
      return localize('ui.components.time.interval', this.hass!.language, ['{startTime}', '{endTime}'], [start, end]);
    }
  }

  toggleDisabled(ev: Event) {
    if (!this.hass || !this.schedule_entity) return;
    ev.stopPropagation();
    const checked = !(ev.target as HTMLInputElement).checked;
    this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this.schedule_entity });
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    .info,
    .info > * {
      color: var(--primary-text-color);
      transition: color 0.2s ease-in-out;
    }
    .secondary {
      display: block;
      color: var(--secondary-text-color);
      transition: color 0.2s ease-in-out;
    }
    state-badge {
      flex: 0 0 40px;
    }
    ha-switch {
      padding: 13px 5px;
    }
  `;
}
