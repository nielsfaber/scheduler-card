import { LitElement, html, customElement, css, property } from 'lit-element';
import { formatTime, wrapTime, MinutesPerHour, roundTime, parseTimestamp } from '../date-time';
import { HomeAssistant } from 'custom-card-helpers';
import { DefaultTimeStep } from '../const';
import { ETimeEvent } from '../types';
import { formatAmPm } from '../data/date-time/format_time';

@customElement('time-picker')
export class TimePicker extends LitElement {
  _val = 0;
  @property({ type: Number })
  set value(val) {
    const oldVal = this.value;
    this._val = val;
    this.requestUpdate('value', oldVal);
  }

  get value() {
    return roundTime(this._val, this.stepSize);
  }

  @property() hass?: HomeAssistant;
  @property({ type: String }) event?: ETimeEvent;
  @property({ type: Boolean }) formatAmPm?: boolean = false;
  @property({ type: Number }) stepSize = DefaultTimeStep;

  maxOffset = 2;

  updated() {
    const myEvent = new CustomEvent('change', { detail: { event: this.event } });
    this.dispatchEvent(myEvent);
  }

  firstUpdated() {
    const options = this.event
      ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour }
      : { stepSize: this.stepSize };
    this.value = wrapTime(this.value, options);

    this.formatAmPm = formatAmPm(this.hass!.language);
  }

  render() {
    return html`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click="${this.hoursUp}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${this.getHours()}</div>
        <div class="hours-down">
          <mwc-button @click="${this.hoursDown}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click="${this.minutesUp}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${this.getMinutes()}</div>
        <div class="minutes-down">
          <mwc-button @click="${this.minutesDown}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.getSuffix()}
        <div class="options">
          ${this.getSunModeToggle()}
        </div>
      </div>
    `;
  }

  private getHours() {
    return formatTime(this.value, { amPm: this.formatAmPm }).hours;
  }

  private getMinutes() {
    return formatTime(this.value, { amPm: this.formatAmPm }).minutes;
  }

  private hoursUp() {
    const options = this.event
      ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour }
      : { stepSize: this.stepSize };
    this.value = wrapTime(this._val + MinutesPerHour, options);
  }

  private hoursDown() {
    const options = this.event
      ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour }
      : { stepSize: this.stepSize };
    this.value = wrapTime(this._val - MinutesPerHour, options);
  }

  private minutesUp() {
    const options = this.event
      ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour }
      : { stepSize: this.stepSize };
    this.value = wrapTime(this._val + this.stepSize, options);
  }

  private minutesDown() {
    const options = this.event
      ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour }
      : { stepSize: this.stepSize };
    this.value = wrapTime(this._val - this.stepSize, options);
  }

  private getSunModeToggle() {
    if (!this.hass) return html``;
    if (!this.hass.states['sun.sun']) return html``;

    return html`
      <mwc-button @click="${this.toggleMode}" class="${this.event ? 'active' : ''}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `;
  }

  private getAmPm() {
    return formatTime(this._val, { amPm: this.formatAmPm }).amPm;
  }

  private getBeforeAfter() {
    if (!this.hass) return '';
    return this.value < 0
      ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.before').slice(0, -1)
      : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.after').slice(0, -1);
  }

  private getSuffix() {
    if (this.event) {
      return html`
        <div class="suffix">
          <mwc-button @click="${this.toggleBeforeAfter}">
            ${this.getBeforeAfter()}
          </mwc-button>
          <mwc-button @click="${this.toggleSunriseSunset}">
            <ha-icon icon="hass:${this.event == ETimeEvent.Sunrise ? 'weather-sunny' : 'weather-night'}"></ha-icon>
          </mwc-button>
        </div>
      `;
    } else if (this.formatAmPm) {
      return html`
        <div class="suffix">
          <mwc-button @click="${this.toggleAmPm}">
            ${this.getAmPm()}
          </mwc-button>
        </div>
      `;
    } else return html``;
  }

  private toggleAmPm() {
    if (this._val < 12 * MinutesPerHour) this.value = wrapTime(this._val + 12 * MinutesPerHour);
    else this.value = wrapTime(this._val - 12 * MinutesPerHour);
  }

  private toggleBeforeAfter() {
    this.value = -this._val;
  }

  private toggleSunriseSunset() {
    this.event = this.event == ETimeEvent.Sunrise ? ETimeEvent.Sunset : ETimeEvent.Sunrise;
    this.value = this._val; //force update the view
  }

  private toggleMode() {
    if (!this.hass) return;
    const sunEntity = this.hass.states['sun.sun'];
    const ts_sunrise = parseTimestamp(sunEntity.attributes.next_rising);
    const ts_sunset = parseTimestamp(sunEntity.attributes.next_setting);

    const ts = this.value;
    if (!this.event) {
      let ts_ref;
      if (Math.abs(ts - ts_sunrise) < Math.abs(ts - ts_sunset)) {
        ts_ref = ts_sunrise;
        this.event = ETimeEvent.Sunrise;
      } else {
        ts_ref = ts_sunset;
        this.event = ETimeEvent.Sunset;
      }
      this.value = ts - ts_ref;
      if (this.value > this.maxOffset * MinutesPerHour) this.value = this.maxOffset * MinutesPerHour;
      else if (this.value < -this.maxOffset * MinutesPerHour) this.value = -this.maxOffset * MinutesPerHour;
    } else {
      const ts_ref = this.event == ETimeEvent.Sunrise ? ts_sunrise : ts_sunset;
      this.event = undefined;
      this.value = ts + ts_ref;
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
