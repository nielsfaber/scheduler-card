import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { DefaultTimeStep } from '../const';
import { ETimeEvent } from '../types';
import { stringToTime, timeToString, roundTime, parseRelativeTime } from '../data/date-time/time';
import { stringToDate } from '../data/date-time/string_to_date';
import { formatTime } from '../data/date-time/format_time';
import { getLocale, isDefined } from '../helpers';

@customElement('time-picker')
export class TimePicker extends LitElement {
  value;

  @property() hass?: HomeAssistant;
  @property({ type: Number }) stepSize = DefaultTimeStep;

  @property() relativeMode = false;
  @property() event = ETimeEvent.Sunrise;

  @property() _time?;

  maxOffset = 2;

  get time() {
    if (this._time >= 0) return this._time;
    return Math.abs(this._time);
  }
  set time(value: number) {
    const newTime = roundTime(value, this.stepSize, {
      wrapAround: !this.relativeMode,
      maxHours: this.relativeMode ? this.maxOffset : undefined,
    });
    const timeUpdated = newTime != this._time && isDefined(this._time);
    this._time = newTime;
    if (timeUpdated) this.updateValue();
  }

  firstUpdated() {
    const res = parseRelativeTime(this.value);
    if (!res) this.time = stringToTime(this.value, this.hass!);
    else {
      this.relativeMode = true;
      this.event = res.event == ETimeEvent.Sunrise ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
      this.time = res.sign == '+' ? stringToTime(res.offset, this.hass!) : -stringToTime(res.offset, this.hass!);
    }
  }

  updateValue() {
    if (this.relativeMode) {
      const sign = this._time >= 0 ? '+' : '-';
      const offset = timeToString(this.time);
      this.value = `${this.event}${sign}${offset}`;
    } else {
      this.value = timeToString(this.time);
    }
    const myEvent = new CustomEvent('change');
    this.dispatchEvent(myEvent);
  }

  render() {
    const timeString = this.relativeMode
      ? timeToString(this.time)
      : formatTime(stringToDate(timeToString(this.time)), getLocale(this.hass!));

    const timeParts = timeString.split(/:|\ /);

    return html`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${() => (this.time = this._time + 3600)}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${timeParts[0].padStart(2, '0')}</div>
        <div class="hours-down">
          <mwc-button @click=${() => (this.time = this._time - 3600)}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${() => (this.time = this._time + this.stepSize * 60)}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${timeParts[1]}</div>
        <div class="minutes-down">
          <mwc-button @click=${() => (this.time = this._time - this.stepSize * 60)}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode
          ? html`
              <div class="suffix">
                <mwc-button @click=${this.toggleBeforeAfter}>
                  ${this.getBeforeAfter()}
                </mwc-button>
                <mwc-button @click=${this.toggleSunriseSunset}>
                  <ha-icon
                    icon="hass:${this.event == ETimeEvent.Sunrise ? 'weather-sunny' : 'weather-night'}"
                  ></ha-icon>
                </mwc-button>
              </div>
            `
          : timeParts.length > 2
          ? html`
              <div class="suffix">
                <mwc-button @click=${this.toggleAmPm}>
                  ${timeParts[2]}
                </mwc-button>
              </div>
            `
          : ''}
        <div class="options">
          ${this.getSunModeToggle()}
        </div>
      </div>
    `;
  }

  private getSunModeToggle() {
    if (!this.hass) return html``;
    if (!this.hass.states['sun.sun']) return html``;

    return html`
      <mwc-button @click="${this.toggleMode}" class="${this.relativeMode ? 'active' : ''}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `;
  }

  private getBeforeAfter() {
    if (!this.hass) return '';
    return this._time < 0
      ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.before').trim()
      : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.after').trim();
  }

  private toggleAmPm() {
    this.time = this._time + 12 * 3600;
  }

  private toggleBeforeAfter() {
    this.time = -this._time;
    this.updateValue();
  }

  private toggleSunriseSunset() {
    this.event = this.event == ETimeEvent.Sunrise ? ETimeEvent.Sunset : ETimeEvent.Sunrise;
    this.updateValue();
  }

  private toggleMode() {
    if (!this.hass) return;
    this.relativeMode = !this.relativeMode;

    const sunEntity = this.hass!.states['sun.sun'];
    const ts_sunrise = stringToTime(sunEntity.attributes.next_rising, this.hass!);
    const ts_sunset = stringToTime(sunEntity.attributes.next_setting, this.hass!);

    if (this.relativeMode) {
      this.event =
        Math.abs(this._time - ts_sunrise) < Math.abs(this._time - ts_sunset) ? ETimeEvent.Sunrise : ETimeEvent.Sunset;

      let offset = this.event == ETimeEvent.Sunrise ? this._time - ts_sunrise : this._time - ts_sunset;

      if (offset > 7200) offset = 7200;
      else if (offset < -7200) offset = -7200;
      this.time = offset;
    } else {
      this.time = this.event == ETimeEvent.Sunrise ? this._time + ts_sunrise : this._time + ts_sunset;
    }
  }

  static styles = css`
    div.time-picker {
      display: grid;
      grid-template-columns: min-content min-content min-content 1fr min-content;
      grid-template-rows: min-content min-content min-content;
      grid-template-areas:
        'hours-up   .         minutes-up   suffix options'
        'hours      separator minutes      suffix options'
        'hours-down .         minutes-down suffix options';
      grid-gap: 10px 0px;
      align-items: center;
    }

    div.hours-up {
      grid-area: hours-up;
    }
    div.hours {
      grid-area: hours;
    }
    div.hours-down {
      grid-area: hours-down;
    }
    div.separator {
      grid-area: separator;
    }
    div.minutes-up {
      grid-area: minutes-up;
    }
    div.minutes {
      grid-area: minutes;
    }
    div.minutes-down {
      grid-area: minutes-down;
    }
    div.suffix {
      grid-area: suffix;
      flex-grow: 1;
    }
    div.options {
      grid-area: options;
    }

    div.hours-up,
    div.hours-down,
    div.minutes-up,
    div.minutes-down {
      --mdc-icon-size: 42px;
    }

    div.hours,
    div.minutes {
      font-size: 42px;
      text-align: center;
    }

    div.separator {
      font-size: 36px;
    }

    div.suffix mwc-button {
      --mdc-typography-button-font-size: 16px;
      --mdc-icon-size: 32px;
    }

    mwc-button.active {
      background: var(--primary-color);
      --mdc-theme-primary: var(--text-primary-color);
      border-radius: 4px;
    }
  `;
}
