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

  @property() _time!: number;

  maxOffset = 6;

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

  getTimeParts() {
    const timeString = this.relativeMode
      ? timeToString(this.time)
      : formatTime(stringToDate(timeToString(this.time)), getLocale(this.hass!));

    const timeParts: string[] = timeString.split(/:|\ /);
    timeParts[0] = String(Number(timeParts[0]));
    return timeParts;
  }

  render() {
    const timeParts = this.getTimeParts();

    return html`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${() => (this.time = this._time + 3600)}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">
          <ha-textfield
            type="number"
            inputmode="numeric"
            .value=${timeParts[0]}
            no-spinner
            outlined
            @input=${(ev: Event) => this._hoursChanged(ev, timeParts.length > 2)}
            @focus=${this._onFocus}
            @blur=${(ev: Event) => this._handleHoursInput(ev, timeParts)}
          >
          </ha-textfield>
        </div>
        <div class="hours-down">
          <mwc-button @click=${() => (this.time = this._time - 3600)}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${() => (this.time = this._time + this.stepSize * 60)}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">
          <ha-textfield
            type="number"
            inputmode="numeric"
            .value=${timeParts[1]}
            no-spinner
            outlined
            @input=${this._minutesChanged}
            @focus=${this._onFocus}
            @blur=${(ev: Event) => this._handleMinutesInput(ev, timeParts)}
          >
          </ha-textfield>
        </div>
        <div class="minutes-down">
          <mwc-button @click=${() => (this.time = this._time - this.stepSize * 60)}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode
          ? html`
              <div class="suffix">
                <mwc-button @click=${this.toggleBeforeAfter}>
                  ${this.getBeforeAfter()}
                </mwc-button>
                <mwc-button @click=${this.toggleSunriseSunset}>
                  <ha-icon icon="mdi:${this.event == ETimeEvent.Sunrise ? 'weather-sunny' : 'weather-night'}"></ha-icon>
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
        <ha-icon icon="mdi:theme-light-dark"></ha-icon>
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

      if (offset > this.maxOffset * 3600) offset = this.maxOffset * 3600;
      else if (offset < -this.maxOffset * 3600) offset = -this.maxOffset * 3600;
      this.time = offset;
    } else {
      this.time = this.event == ETimeEvent.Sunrise ? this._time + ts_sunrise : this._time + ts_sunset;
    }
  }

  private _hoursChanged(ev: Event, amPmMode = false) {
    const el = ev.target as HTMLInputElement;
    const inputValue = el.value;
    let newValue = Number(inputValue);

    const minHours = this.relativeMode ? 0 : amPmMode ? 1 : 0;
    const maxHours = this.relativeMode ? this.maxOffset : amPmMode ? 12 : 23;

    let isValid = true;
    if (inputValue.length > 2) {
      isValid = false;
      newValue = Number(inputValue.substring(0, 2));
    }
    if (newValue < 0) {
      isValid = false;
      newValue = -newValue;
    }
    if (newValue < minHours) {
      isValid = false;
      newValue = minHours;
    }
    if (newValue > maxHours) {
      isValid = false;
      newValue = maxHours;
    }

    if (!isValid) {
      //override the entered value in case of invalid input
      el.value = String(newValue);
      el.blur();
    }
  }

  private _minutesChanged(ev: Event) {
    const el = ev.target as HTMLInputElement;
    const inputValue = el.value;
    let newValue = Number(inputValue);
    let isValid = true;

    if (inputValue.length > 2) {
      isValid = false;
      newValue = Number(inputValue.substring(0, 2));
    }
    if (newValue < 0) {
      isValid = false;
      newValue = -newValue;
    }
    if (newValue > 59) {
      isValid = false;
      newValue = 59;
    }
    if (newValue % this.stepSize != 0) {
      newValue = Math.round(newValue / this.stepSize) * this.stepSize;
    }

    if (!isValid) {
      //override the entered value in case of invalid input
      el.value = String(newValue).padStart(2, '0');
      el.blur();
    }
  }

  private _onFocus(ev: Event) {
    const el = ev.target as HTMLInputElement;
    el.value = '';
  }

  private _handleHoursInput(ev: Event, timeParts: string[]) {
    const el = ev.target as HTMLInputElement;
    let value = Number(el.value);

    if (!el.value.length) {
      el.value = timeParts[0];
      return;
    }
    if (timeParts.length > 2 && value == 12) value = 0;
    if (timeParts.length > 2 && timeParts[2] == 'PM') value += 12;
    const minutes = Number(timeParts[1]);
    this.time = this._time >= 0 ? value * 3600 + minutes * 60 : -(value * 3600 + minutes * 60);
    el.value = this.getTimeParts()[0];
  }

  private _handleMinutesInput(ev: Event, timeParts: string[]) {
    const el = ev.target as HTMLInputElement;
    let value = Number(el.value);

    if (!el.value.length) {
      el.value = timeParts[1];
      return;
    }
    if (value % this.stepSize != 0) {
      value = Math.round(value / this.stepSize) * this.stepSize;
    }
    let hours = Number(timeParts[0]);
    if (timeParts.length > 2 && hours == 12) hours = 0;
    if (timeParts.length > 2 && timeParts[2] == 'PM') hours += 12;
    this.time = this._time >= 0 ? hours * 3600 + value * 60 : -(hours * 3600 + value * 60);
    el.value = this.getTimeParts()[1];
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
      grid-gap: 4px 0px;
      align-items: center;
      direction: ltr;
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

    ha-textfield {
      text-align: center;
      --text-field-text-align: center;
      --text-field-padding: 0 4px;
      --mdc-typography-subtitle1-font-size: 42px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
    }
  `;
}
