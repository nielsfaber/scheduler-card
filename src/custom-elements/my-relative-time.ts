import { customElement, LitElement, property, html } from 'lit-element';
import { HomeAssistant, formatTime } from 'custom-card-helpers';
import { capitalize } from '../helpers';
import { formatWeekday } from '../data/date-time/format_weekday';
import { localize } from '../localize/localize';

const secondsPerMinute = 60;
const secondsPerHour = 3600;
const hoursPerDay = 24;

const tests = [60, 60, 24, 7];
const langKey = ['second', 'minute', 'hour', 'day'];

@customElement('my-relative-time')
export class MyRelativeTime extends LitElement {
  @property() hass?: HomeAssistant;
  @property() datetime?: Date;

  updateInterval = 60;
  timer = 0;

  startRefreshTimer(updateInterval: number) {
    clearInterval(this.updateInterval);
    this.timer = window.setInterval(() => {
      this.requestUpdate();
    }, this.updateInterval * 1000);
    this.updateInterval = updateInterval;
  }

  protected updated() {
    this.startRefreshTimer(this.updateInterval); //restart
  }

  relativeTime(dateObj: Date): string {
    if (!this.hass) return '';
    const now = new Date();
    let delta = (now.getTime() - dateObj.getTime()) / 1000;
    const tense = delta >= 0 ? 'past' : 'future';
    delta = Math.abs(delta);
    let roundedDelta = Math.round(delta);

    if (roundedDelta === 0) {
      return this.hass.localize('ui.components.relative_time.just_now');
    }

    if (tense == 'future') {
      if (delta / secondsPerHour >= 6) {
        const startOfToday = now.setHours(0, 0, 0, 0);
        const daysFromNow = Math.floor(
          (dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000)
        );
        let day = '';
        if (daysFromNow == 1 && dateObj.getHours() == 0 && dateObj.getMinutes() == 0)
          day = localize('ui.components.date.tomorrow', this.hass.language);
        else if (daysFromNow > 0) day = formatWeekday(dateObj, this.hass.language);
        let time = formatTime(dateObj, this.hass.language);
        if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0)
          time = localize('ui.components.time.noon', this.hass.language);
        else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0)
          time = localize('ui.components.time.midnight', this.hass.language);
        return day + ' ' + localize('ui.components.time.absolute', this.hass.language, '{time}', time);
      } else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
        const mins = Math.round(delta / secondsPerMinute - 60);
        const ts1 = this.hass.localize('ui.components.relative_time.duration.hour', 'count', 1);
        const ts2 = this.hass.localize('ui.components.relative_time.duration.minute', 'count', mins);
        const join = this.hass.localize('ui.common.and');
        return this.hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
      } else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
        const seconds = Math.round(delta - 60);
        const ts1 = this.hass.localize('ui.components.relative_time.duration.minute', 'count', 1);
        const ts2 = this.hass.localize('ui.components.relative_time.duration.second', 'count', seconds);
        const join = this.hass.localize('ui.common.and');
        return this.hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
      }
    }

    let unit = 'week';

    for (let i = 0; i < tests.length; i++) {
      if (roundedDelta < tests[i]) {
        unit = langKey[i];
        break;
      }

      delta /= tests[i];
      roundedDelta = Math.round(delta);
    }

    const output = this.hass.localize(`ui.components.relative_time.duration.${unit}`, 'count', roundedDelta);
    return this.hass.localize(`ui.components.relative_time.${tense}`, 'time', output);
  }

  render() {
    if (!this.hass || !this.datetime) return html``;

    const now = new Date();
    const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
    let updateInterval = 60;
    if (Math.abs(secondsRemaining) <= 10) updateInterval = 1;
    else if (Math.abs(secondsRemaining) <= 60) updateInterval = 5;
    else if (Math.abs(secondsRemaining) <= 120) updateInterval = 10;
    if (this.updateInterval != updateInterval) this.startRefreshTimer(updateInterval);

    return html`
      ${capitalize(this.relativeTime(this.datetime))}
    `;
  }
}
