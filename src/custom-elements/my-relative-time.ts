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
  @property() _hass?: HomeAssistant;
  @property() datetime?: Date;

  updateInterval = 60;
  timer = 0;

  startRefreshTimer(updateInterval: number) {
    clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.requestUpdate();
    }, updateInterval * 1000);
    this.updateInterval = updateInterval;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.startRefreshTimer(this.updateInterval); //restart
  }

  relativeTime(dateObj: Date): string {
    if (!this._hass) return '';
    const now = new Date();
    let delta = (now.getTime() - dateObj.getTime()) / 1000;
    const tense = delta >= 0 ? 'past' : 'future';
    delta = Math.abs(delta);
    let roundedDelta = Math.round(delta);

    if (roundedDelta === 0) {
      return this._hass.localize('ui.components.relative_time.just_now');
    }

    if (tense == 'future') {
      if (delta / secondsPerHour >= 6) {
        const startOfToday = now.setHours(0, 0, 0, 0);
        const daysFromNow = Math.floor(
          (dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000)
        );
        let day = '';
        if (daysFromNow == 1) day = localize('ui.components.date.tomorrow', this._hass.language);
        else if (daysFromNow > 0) day = formatWeekday(dateObj, this._hass.language);
        let time = localize(
          'ui.components.time.absolute',
          this._hass.language,
          '{time}',
          formatTime(dateObj, this._hass.language)
        );
        if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0)
          time = localize('ui.components.time.at_noon', this._hass.language);
        else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0)
          time = localize('ui.components.time.at_midnight', this._hass.language);
        return String(day + ' ' + time).trim();
      } else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
        const mins = Math.round(delta / secondsPerMinute - 60);
        const ts2 = this._hass.localize('ui.components.relative_time.duration.minute', 'count', mins);
        const join = this._hass.localize('ui.common.and');

        //workaround for missing translation in some languages
        if (this._hass.localize('ui.components.relative_time.future')) {
          const ts1 = this._hass.localize('ui.components.relative_time.duration.hour', 'count', 1);
          return this._hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
        } else {
          const ts1 = this._hass.localize('ui.components.relative_time.future_duration.hour', 'count', 1);
          return `${ts1} ${join} ${ts2}`;
        }
      } else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
        const seconds = Math.round(delta - 60);
        const ts2 = this._hass.localize('ui.components.relative_time.duration.second', 'count', seconds);
        const join = this._hass.localize('ui.common.and');
        if (this._hass.localize('ui.components.relative_time.future')) {
          const ts1 = this._hass.localize('ui.components.relative_time.duration.minute', 'count', 1);
          return this._hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
        } else {
          const ts1 = this._hass.localize('ui.components.relative_time.future_duration.minute', 'count', 1);
          return `${ts1} ${join} ${ts2}`;
        }
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
    if (this._hass.localize(`ui.components.relative_time.${tense}`)) {
      const ts = this._hass.localize(`ui.components.relative_time.duration.${unit}`, 'count', roundedDelta);
      return this._hass.localize(`ui.components.relative_time.${tense}`, 'time', ts);
    } else {
      return this._hass.localize(`ui.components.relative_time.${tense}_duration.${unit}`, 'count', roundedDelta);
    }
  }

  render() {
    if (!this._hass || !this.datetime) return html``;

    const now = new Date();
    const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
    let updateInterval = 60;
    if (Math.abs(secondsRemaining) <= 150) updateInterval = Math.max(Math.ceil(Math.abs(secondsRemaining)) / 10, 2);
    if (this.updateInterval != updateInterval) this.startRefreshTimer(updateInterval);

    return html`
      ${capitalize(this.relativeTime(this.datetime))}
    `;
  }
}
