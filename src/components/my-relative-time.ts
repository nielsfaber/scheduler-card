import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { capitalize, getLocale } from '../helpers';
import { formatWeekday } from '../data/date-time/format_weekday';
import { localize } from '../localize/localize';
import { formatTime } from '../data/date-time/format_time';
import { formatDate } from '../data/date-time/format_date';
import { selectUnit } from '@formatjs/intl-utils';

const secondsPerMinute = 60;
const secondsPerHour = 3600;
const hoursPerDay = 24;

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
    const roundedDelta = Math.round(delta);

    if (tense == 'future' && roundedDelta > 0) {
      if (delta / secondsPerHour >= 6) {
        const startOfToday = now.setHours(0, 0, 0, 0);
        const daysFromNow = Math.floor(
          (dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000)
        );
        let day = '';
        if (daysFromNow > 14) {
          //October 12
          day = formatDate(dateObj, getLocale(this._hass));
        } else if (daysFromNow > 7) {
          //Next Friday
          day = localize(
            'ui.components.date.next_week_day',
            getLocale(this._hass),
            '{weekday}',
            formatWeekday(dateObj, getLocale(this._hass))
          );
        } else if (daysFromNow == 1) {
          //Tomorrow
          day = localize('ui.components.date.tomorrow', getLocale(this._hass));
        } else if (daysFromNow > 0) {
          //Friday
          day = formatWeekday(dateObj, getLocale(this._hass));
        }

        let time = localize(
          'ui.components.time.absolute',
          getLocale(this._hass),
          '{time}',
          formatTime(dateObj, getLocale(this._hass))
        );

        if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0) {
          time = localize('ui.components.time.at_noon', getLocale(this._hass));
        } else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0) {
          time = localize('ui.components.time.at_midnight', getLocale(this._hass));
        }
        return String(day + ' ' + time).trim();
      } else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
        // in 1 hour and 52 minutes
        const mins = Math.round(delta / secondsPerMinute - 60);
        const join = this._hass.localize('ui.common.and');

        // @ts-expect-error
        const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(
          1,
          'hour'
        );
        const text2 = Intl.NumberFormat(getLocale(this._hass).language, {
          style: 'unit',
          // @ts-expect-error
          unit: 'minute',
          unitDisplay: 'long',
        }).format(mins);

        return `${text1} ${join} ${text2}`;
      } else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
        // in 1 minute and 52 seconds
        const seconds = Math.round(delta - 60);
        const join = this._hass.localize('ui.common.and');

        // @ts-expect-error
        const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(
          1,
          'minute'
        );
        const text2 = Intl.NumberFormat(getLocale(this._hass).language, {
          style: 'unit',
          // @ts-expect-error
          unit: 'second',
          unitDisplay: 'long',
        }).format(seconds);

        return `${text1} ${join} ${text2}`;
      }
    }

    // in 5 minutes/hours/seconds (or now)
    const diff = selectUnit(dateObj);
    // @ts-expect-error
    return new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(
      diff.value,
      diff.unit
    );
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
