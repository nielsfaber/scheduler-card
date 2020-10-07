import { LitElement, html, customElement, css, property, eventOptions, queryAsync } from 'lit-element';
import { IScheduleEntry, IUserConfig } from './types';
import { Config } from './config';
import { formatTime, parseTimestamp, weekdayToString, weekday, IDays, EDayType, ITime, MinutesPerHour, daysToArray } from './date-time';
import { PrettyPrintIcon, PrettyPrintName, PrettyPrintAction, capitalize, PrettyPrintTime } from './helpers';
import { localize } from './localize/localize';
import { actionHandler } from './action-handler-directive';
import { Ripple } from '@material/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

@customElement('schedule-entity-row')
export class ScheduleEntityRow extends LitElement {

  @property({ type: Object })
  schedule!: IScheduleEntry;

  @property({ attribute: false }) public config?: Config;
  @property({ attribute: false }) public userConfig?: IUserConfig;

  render() {
    if (!this.config || !this.userConfig) return html``;
    let nextEntries = this.calculateNext(this.schedule.entries);
    let nextEntry = this.schedule.entries[nextEntries[0].entry];
    let entity = this.config.FindEntity(nextEntry.entity)!;
    let action = this.config.FindAction(nextEntry.entity, nextEntry.action)!;

    return html`
      <div
        class="list-item${this.schedule.enabled ? '' : ' disabled'}"
        .actionHandler=${actionHandler({ hasDoubleClick: false, hasHold: true })}
      >
        <div class="list-item-icon">
          <ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>
        </div>
        <div class="list-item-name">
          ${PrettyPrintName(entity.name)} - ${PrettyPrintAction(nextEntry, action, { temperature_unit: this.userConfig.temperature_unit })}
        </div>
        <div class="list-item-summary">
          ${capitalize(PrettyPrintTime(nextEntry.time, { amPm: this.userConfig.am_pm, sunrise: this.userConfig.sunrise, sunset: this.userConfig.sunset, endTime: nextEntry.endTime }))}, ${this.showDays(nextEntry.days)}${this.schedule.entries.length == 1 ? '' : `, ${this.schedule.entries.length == 2 ? localize('misc.one_additional_task') : localize('misc.x_additional_tasks','{count}', String(this.schedule.entries.length - 1))}`}
        </div>
        <div class="list-item-counter">
          ${capitalize(this.showRelativeTime())}
        </div>
      </div>
    `;
  }
  private calculateNext(entries: { time: ITime, days: IDays }[]) {

    function nextEntry(entries: { time: ITime, days: IDays }[], startTime) {
      let times = [...entries].map((entry, key) => {
        let hours = Math.floor(entry.time.value / MinutesPerHour);
        let minutes = entry.time.value - hours * MinutesPerHour;

        let ts = new Date();
        ts.setHours(hours);
        ts.setMinutes(minutes);
        ts.setSeconds(0);

        let days = daysToArray(entry.days);

        while (ts.valueOf() <= startTime.valueOf() || !days.includes(weekday(ts))) {
          ts.setDate(ts.getDate() + 1);
        }
        return { entry: key, ts: ts };
      });
      times.sort((a, b) => a.ts.valueOf() > b.ts.valueOf() ? 1 : -1);
      return times.shift();
    }
    let output: { entry: number, ts: Date }[] = [];
    let startTime = new Date();
    for (var i = 0; i < 2; i++) {
      let val = nextEntry(entries, startTime);
      output.push(val!);
      startTime = val!.ts;
    }
    return output;
  }

  private showRelativeTime() {
    let next_trigger = this.schedule.next_trigger;
    if (!next_trigger) return `-`;

    let ts = new Date(next_trigger);
    let now = new Date();
    let secondsRemaining = Math.round((ts.valueOf() - now.valueOf()) / 1000);

    if (secondsRemaining < 5) {
      return localize('time.now');
    }

    if (secondsRemaining < 60) {
      return localize('time.relative','{time}', localize('time.seconds', '{seconds}', String(secondsRemaining)));
    }

    if (secondsRemaining < 3300) { //max 55 mins
      let sec = secondsRemaining % 60;
      let mins = Math.round(secondsRemaining / 60);

      if (sec < 5 || sec > 55) {
        if(mins == 1) return localize('time.relative','{time}', localize('time.minute'));
        else return localize('time.relative','{time}', localize('time.minutes', '{minutes}', String(mins)));
      }

      if (Math.floor(secondsRemaining / 60) == 1) {
        let value = Math.round(secondsRemaining - 60);
        return localize('time.relative','{time}', `${localize('time.minute')} ${localize('words.and')} ${localize('time.seconds', '{seconds}', String(value))}`);
      }

      return localize('time.relative','{time}', localize('time.minutes', '{minutes}', String(mins)));
    }

    if (Math.floor(secondsRemaining / 3600) == 1) {
      let value = Math.round(secondsRemaining / 60 - 60);
      return localize('time.relative','{time}', `${localize('time.hour')} ${localize('words.and')} ${localize('time.minutes', '{minutes}', String(value))}`);

    }

    let hoursRemaining = Math.round(secondsRemaining / 3600);

    if (hoursRemaining <= 6) {
      if(hoursRemaining == 1) return localize('time.relative','{time}', localize('time.hour'));
      else return localize('time.relative','{time}', localize('time.hours', '{hours}', String(hoursRemaining)));
    }

    let start_of_day = new Date();
    start_of_day.setHours(0, 0, 0, 0);
    let days_diff = Math.floor((ts.valueOf() - start_of_day.valueOf()) / (24 * 3600 * 1000));

    let time = `${formatTime(parseTimestamp(next_trigger), { amPm: this.userConfig!.am_pm }).time}`;

    if (days_diff == 0) {
      return localize('time.absolute', '{time}', time);
    }

    if (days_diff == 1) {
      if (ts.getHours() == 0 && ts.getMinutes() == 0) return localize('time.absolute', '{time}', localize('time.midnight'));
      if (ts.getHours() == 12 && ts.getMinutes() == 0) return localize('time.absolute', '{time}', localize('time.noon'));
      return `${localize('days.tomorrow')} ${localize('time.absolute', '{time}', time)}`;
    }

    return `${weekdayToString(weekday(ts))} ${localize('time.absolute', '{time}', time)}`;
  }


  showDays(days: IDays) {
    function findSequence(days: number[]): number[] {
      let len: number[] = [];
      for (var i = 0; i < days.length - 1; i++) {
        var j = i + 1;
        while ((days[j] - days[j - 1]) == 1) j++;
        len.push(j - i);
      }
      return len;
    }

    if (days.type == EDayType.Daily) return localize('days.daily');
    else if (days.type == EDayType.Workday) return localize('days.working_days');
    else if (days.type == EDayType.Weekend) return localize('days.weekend');
    else {
      let dayList = days.custom_days || [];
      dayList.sort();
      let output: string[] = dayList.map(weekdayToString);
      let seq = findSequence(dayList);
      let len = Math.max(...seq);
      if (dayList.length == 6) {
        let missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !dayList.includes(e));
        return localize('days.daily_except_days','{days}', weekdayToString(missing.pop()!));
      }
      else if (dayList.length >= 3 && len >= 3) {
        let seq = findSequence(dayList);
        let start = seq.reduce((obj, e, i) => e == len ? i : obj, 0);
        output.splice(start, len, localize('days.interval',['{startDay}','{endDay}'],[output[start], output[start + len - 1]]));
      }
      return (output.length > 1) ? `${output.slice(0, -1).join(', ')} ${localize('words.and')} ${output.pop()}` : `${output.pop()}`;
    }
  }

  static styles = css`
      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr 30%;
        grid-template-rows: min-content min-content;
        grid-template-areas: " icon name counter"
                             " icon summary counter";
        grid-gap: 4px 20px;
        background: none;
        cursor: pointer;
        padding: 15px 10px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        background: var(--list-item-background-color);
        opacity: 0.1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      div.list-item:hover:before {
          background: var(--primary-color);
          border-radius: 4px;
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

      div.list-item-summary {
        grid-area: summary;
        color: var(--secondary-text-color);
        display: flex;
        flex: 1;
      }

      div.list-item-name {
        grid-area: name;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-counter {
        grid-area: counter;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        text-align: right;
        font-weight: 500;
      }

      div.disabled div.list-item-icon, div.disabled div.list-item-name, div.disabled div.list-item-summary, div.disabled div.list-item-counter {
        color: var(--disabled-text-color);
      }


  `;
}
