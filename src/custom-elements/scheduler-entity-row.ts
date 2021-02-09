import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { CardConfig, ETimeEvent, EDayType, Schedule, Timeslot, WeekdayType } from '../types';
import { PrettyPrintName, capitalize, PrettyPrintIcon, unique } from '../helpers';
import { HomeAssistant, computeDomain } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import './my-relative-time';
import { parseAction } from '../data/parse_action';
import { parseEntity } from '../data/parse_entity';
import { computeActionDisplay } from '../data/compute_action_display';
import { formatWeekday } from '../data/date-time/format_weekday';
import { formatTime, formatTime24 } from '../data/date-time/format_time';
import { weekdayType } from '../data/date-time/weekday_type';
import { weekdayToList } from '../data/date-time/weekday_to_list';
import { stringToTime, parseRelativeTime } from '../data/date-time/time';
import { stringToDate } from '../data/date-time/string_to_date';
import { standardIcon } from '../standard-configuration/standardIcon';
import { STATE_NOT_RUNNING } from 'home-assistant-js-websocket';

@customElement('scheduler-entity-row')
export class ScheduleEntityRow extends LitElement {
  @property() config!: CardConfig;
  @property() _schedule!: Schedule;

  set schedule(schedule: Schedule) {
    this._schedule = schedule;
  }

  @property() private _hass!: HomeAssistant;
  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }
  get hass() {
    return this._hass;
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.size > 1) return true;

    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass && this._schedule)
      return (
        JSON.stringify(oldHass.states[this._schedule.entity_id]) !==
        JSON.stringify(this._hass.states[this._schedule.entity_id])
      );

    const oldSchedule = changedProps.get('_schedule') as Schedule | undefined;
    if (oldSchedule) return JSON.stringify(oldSchedule) !== JSON.stringify(this._schedule);
    else return true;
  }

  render() {
    if (!this._schedule.next_entries.length) {
      return this._hass.config.state !== STATE_NOT_RUNNING
        ? html`
            <hui-warning>
              Defective schedule entity: ${this._schedule.entity_id}
            </hui-warning>
          `
        : html`
            <hui-warning>
              ${this._hass.localize('ui.panel.lovelace.warning.starting')}
            </hui-warning>
          `;
    }
    const nextEntry = this._schedule.timeslots[this._schedule.next_entries[0]];
    const entities = unique(nextEntry.actions.map(e => e.entity_id)).map(e => parseEntity(e, this._hass, this.config));
    const entityIcon =
      unique(entities.map(e => e.icon)).length == 1 ? entities[0].icon : standardIcon(entities[0].id, this._hass);

    const entityDomains = unique(entities.map(e => computeDomain(e.id)));

    const entityName =
      entities.length == 1
        ? entities[0].name
        : entityDomains.length == 1
        ? `${entities.length}x ${localize(`domains.${entityDomains[0]}`, this._hass.language) || entityDomains[0]}`
        : `${entities.length}x entities`;

    const actionConfig = parseAction(nextEntry.actions[0], this._hass, this.config, true);

    const icon =
      this.config.display_options && this.config.display_options.icon && this.config.display_options.icon == 'entity'
        ? entityIcon
        : actionConfig.icon;

    const computeDisplayItem = (displayItem: string): string => {
      switch (displayItem) {
        case 'name':
          return this._schedule.name || '';
        case 'relative-time':
          return `<my-relative-time></my-relative-time>`;
        case 'additional-tasks':
          return this._schedule.timeslots.length > 1
            ? '+' +
                localize(
                  'ui.panel.overview.additional_tasks',
                  this._hass!.language,
                  '{number}',
                  String(this._schedule.timeslots.length - 1)
                )
            : '';
        case 'time':
          return capitalize(this.computeTime(this._schedule.timeslots[this._schedule.next_entries[0]]));
        case 'days':
          return capitalize(this.computeDays(this._schedule.weekdays));
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
          <my-relative-time
            .hass=${this._hass}
            .datetime=${new Date(this._schedule.timestamps[this._schedule.next_entries[0]])}
          >
          </my-relative-time>
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
      <ha-icon icon="${PrettyPrintIcon(icon)}"></ha-icon>
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
      <ha-switch
        ?checked=${['on', 'triggered'].includes(this.hass.states[this._schedule.entity_id]?.state || '')}
        @click=${this.toggleDisabled}
      >
      </ha-switch>
    `;
  }

  computeDays(weekdays: WeekdayType) {
    function findSequence(list: number[]): number[] {
      const len: number[] = [];
      for (let i = 0; i < list.length - 1; i++) {
        let j = i + 1;
        while (list[j] - list[j - 1] == 1) j++;
        len.push(j - i);
      }
      return len;
    }

    if (!this._hass) return '';
    switch (weekdayType(weekdays)) {
      case EDayType.Daily:
        return localize('ui.components.date.day_types_long.daily', this._hass.language);
      case EDayType.Workday:
        return localize('ui.components.date.day_types_long.workdays', this._hass.language);
      case EDayType.Weekend:
        return localize('ui.components.date.day_types_long.weekend', this._hass.language);
      case EDayType.Custom:
        const list = weekdayToList(weekdays);
        const seq = findSequence(list);
        const len = Math.max(...seq);
        if (list.length == 6) {
          const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !list.includes(e));
          return localize(
            'ui.components.date.repeated_days_except',
            this._hass.language,
            '{excludedDays}',
            formatWeekday(missing.pop()!, this._hass!.language)
          );
        }
        const dayNames = list.map(e => formatWeekday(e, this._hass!.language));
        if (list.length >= 3 && len >= 3) {
          const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
          dayNames.splice(
            start,
            len,
            localize(
              'ui.components.date.days_range',
              this._hass.language,
              ['{startDay}', '{endDay}'],
              [dayNames[start], dayNames[start + len - 1]]
            )
          );
        }
        const daysString =
          dayNames.length > 1
            ? `${dayNames.slice(0, -1).join(', ')} ${this._hass.localize('ui.common.and')} ${dayNames.pop()}`
            : `${dayNames.pop()}`;
        return localize('ui.components.date.repeated_days', this._hass!.language, '{days}', daysString);
      default:
        return '';
    }
  }

  computeTime(entry: Timeslot) {
    if (!entry.stop) {
      const timeString = entry.start;
      const res = parseRelativeTime(timeString);

      if (res) {
        const eventString =
          res.event == ETimeEvent.Sunrise
            ? this._hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').toLowerCase()
            : this._hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset').toLowerCase();
        if (Math.abs(stringToTime(res.offset)) < 5 * 60)
          return localize('ui.time.at_sun_event', '{sunEvent}', eventString);

        const signString =
          res.sign == '-'
            ? this._hass
                .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
                .slice(0, -1)
                .toLowerCase()
            : this._hass
                .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
                .slice(0, -1)
                .toLowerCase();
        const timeStr = formatTime24(stringToDate(res.offset));

        return `${timeStr} ${signString} ${eventString}`;
      } else {
        const time = stringToDate(timeString);
        return localize(
          'ui.components.time.absolute',
          this._hass.language,
          '{time}',
          formatTime(time, this._hass.language)
        );
      }
    } else {
      const start = formatTime(stringToDate(entry.start), this._hass.language);
      const end = formatTime(stringToDate(entry.stop), this._hass.language);
      return localize('ui.components.time.interval', this._hass!.language, ['{startTime}', '{endTime}'], [start, end]);
    }
  }

  toggleDisabled(ev: Event) {
    if (!this._hass || !this._schedule) return;
    ev.stopPropagation();
    const checked = !(ev.target as HTMLInputElement).checked;
    this._hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this._schedule.entity_id });
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
    ha-icon {
      flex: 0 0 40px;
      color: var(--state-icon-color);
    }
    ha-switch {
      padding: 13px 5px;
    }
    hui-warning {
      flex: 1 0 40px;
    }
  `;
}
