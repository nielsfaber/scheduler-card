import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { computeTimeOffset } from "../data/time/compute_time_offset";
import { parseTimeString } from "../data/time/parse_time_string";
import { Time, TimeMode } from "../types";
import { addTimeOffset } from "../data/time/add_time_offset";
import { HomeAssistant } from "../lib/types";
import { AmPmFormat, convertTo12Hour, convertTo24Hour } from "../lib/use_am_pm";
import { fireEvent } from "../lib/fire_event";


const limitOffset = <T extends Time | { hours: number, minutes: number }>(time: T): T => {
  let offsetTime = time.hours * 60 + time.minutes;
  if (offsetTime > 4 * 60) time = { ...time, hours: 4, minutes: 0 };
  else if (offsetTime < -4 * 60) time = { ...time, hours: -4, minutes: 0 };
  return time;
};

@customElement("scheduler-legacy-time-picker")
export class SchedulerLegacyTimePicker extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) stepSize = 10;

  set time(value: string) {
    this.hours = Number(value.split(":")[0]);
    this.minutes = Number(value.split(":")[1]);
    const time = parseTimeString(value);
    this.mode = time.mode;
    this.hours = time.hours;
    this.minutes = time.minutes;
  }

  @state() hours: number = 0;
  @state() minutes: number = 0;
  @state() mode: TimeMode = TimeMode.Fixed;

  @property({ type: Boolean }) autoValidate = true;
  @property({ type: Boolean }) public required = true;

  @property({ type: Boolean }) disabled = false;

  @property({ type: Boolean }) useAmPm = false;

  protected render(): TemplateResult {
    return html`
      <div class="time-input-wrap">
        <div class="hours">
          <ha-button appearance="plain" @click=${() => this._addTimeOffset({ hours: 1 })}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </ha-button>
          <ha-textfield
            id="hour"
            inputmode="numeric"
            .value=${this.formatHours()}
            label=""
            name="hours"
            @change=${this._hoursChanged}
            @focusin=${this._onFocus}
            no-spinner
            .required=${this.required}
            .autoValidate=${this.autoValidate}
            maxlength="2"
            max=${this.mode == TimeMode.Fixed ? this.useAmPm ? 12 : 23 : 4}
            min="0"
            .disabled=${this.disabled}
            .validityTransform=${this._validateHourInput}
          >
          </ha-textfield>
          <ha-button appearance="plain" @click=${() => this._addTimeOffset({ hours: -1 })}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </ha-button>
        </div>
        <div class="separator">
          :
        </div>
        <div class="minutes">
          <ha-button appearance="plain" @click=${() => this._addTimeOffset({ minutes: this.stepSize })}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </ha-button>
          <ha-textfield
            id="min"
            type="number"
            inputmode="numeric"
            .value=${this.formatMinutes()}
            label=""
            @change=${this._minutesChanged}
            @focusin=${this._onFocus}
            name="minutes"
            no-spinner
            .required=${this.required}
            .autoValidate=${this.autoValidate}
            maxlength="2"
            max="59"
            min="0"
            .disabled=${this.disabled}
            .validityTransform=${this._validateMinuteInput}
            suffix=""
            class=""
          >
          </ha-textfield>
          <ha-button appearance="plain" @click=${() => this._addTimeOffset({ minutes: -this.stepSize })}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </ha-button>
        </div>
        <div class="suffix">
          ${this.mode != TimeMode.Fixed
        ? html`
            <ha-button appearance="plain" size="large" @click=${this._toggleBeforeAfterClick}>
              <span class="large">
              ${this.hours < 0 || this.minutes < 0
            ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.before').trim().toLowerCase()
            : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.after').trim().toLowerCase()
          }
              </span>
            </ha-button>
            <ha-button appearance="plain" @click=${this._toggleSunriseSunsetClick}>
              <ha-icon icon="${this.mode == TimeMode.Sunrise ? 'mdi:weather-sunny' : 'mdi:weather-night'}"></ha-icon>
            </ha-button>
          `
        :
        this.useAmPm
          ? html`
            <ha-button appearance="plain" @click=${this._toggleAmPmClick}>
              ${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"}
            </ha-button>
          `
          : nothing}
        </div>
        <div class="mode">
          ${this.hass.states['sun.sun']
        ? html`
          <ha-button
            appearance="${this.mode == TimeMode.Fixed ? 'plain' : 'filled'}"
            variant="${this.mode == TimeMode.Fixed ? 'neutral' : 'brand'}"
            @click=${this._toggleTimeModeClick}
          >
            <ha-icon icon="mdi:theme-light-dark"></ha-icon>
          </ha-button>
          `
        : nothing}
        </div>
      </div>
    `;
  }

  private _validateHourInput(value: any, _nativeValidity: any) {
    let valid = value.match(/^[1|2]?[0-9]$/) !== null;

    return {
      valid: valid,
      customError: !valid
    }
  }

  private _validateMinuteInput(value: any, _nativeValidity: any) {
    let valid = value.match(/^[0-5]?[0-9]$/) !== null;

    return {
      valid: valid,
      customError: !valid
    }
  }

  private _hoursChanged(ev: InputEvent) {
    let value = Number((ev.target as HTMLInputElement).value);
    if (this.useAmPm) {
      const amPm = convertTo12Hour(this.hours).am_pm;
      value = convertTo24Hour(value, amPm);
    }
    if (this.mode != TimeMode.Fixed) {
      const negativeOffset = this.hours < 0 || this.minutes < 0;
      if (negativeOffset) {
        if (value > 0) value = -value;
        else if (this.minutes > 0) this.minutes = -this.minutes;
      }
      this.hours = value;
    }
    else {
      this.hours = value;
    }
    this._valueChanged();
  }

  private _minutesChanged(ev: InputEvent) {
    const value = Number((ev.target as HTMLInputElement).value);
    this.minutes = value;
    this._valueChanged();
  }

  private _toggleAmPmClick() {
    let value = convertTo12Hour(this.hours).am_pm;
    const hours12 = convertTo12Hour(this.hours).hours;
    this.hours = convertTo24Hour(hours12, value == 'AM' ? AmPmFormat.PM : AmPmFormat.AM);

    this._valueChanged();
  }

  private _valueChanged() {
    const value: Time = {
      mode: this.mode,
      hours: this.hours,
      minutes: this.minutes,
    };
    console.log(value);
    fireEvent(this, "value-changed", {
      value,
    });
  }

  private _onFocus(ev: FocusEvent) {
    (ev.currentTarget as HTMLInputElement).select();
  }

  private formatHours() {
    let hours = this.useAmPm && this.mode == TimeMode.Fixed ? convertTo12Hour(this.hours).hours : this.hours;
    return Math.abs(hours);
  }

  private formatMinutes() {
    return Math.abs(this.minutes).toString().padStart(2, "0");
  }

  private _addTimeOffset(offset: { hours?: number, minutes?: number }) {
    let time: Time = { mode: this.mode, hours: this.hours, minutes: this.minutes };

    time = addTimeOffset(time, offset);;
    if (this.mode != TimeMode.Fixed) time = limitOffset(time);

    this.hours = time.hours;
    this.minutes = time.minutes;
    this._valueChanged();
  }

  private _toggleTimeModeClick() {
    const tsSunrise = this.hass.states['sun.sun'].attributes['next_rising'];
    const tsSunset = this.hass.states['sun.sun'].attributes['next_setting'];

    if (this.mode == TimeMode.Fixed) {
      const sunriseOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunrise);
      const sunsetOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunset);

      const offsetMinsSunrise = sunriseOffset.hours * 60 + sunriseOffset.minutes;
      const offsetMinsSunset = sunsetOffset.hours * 60 + sunsetOffset.minutes;

      this.mode = Math.abs(offsetMinsSunrise) <= Math.abs(offsetMinsSunset) ? TimeMode.Sunrise : TimeMode.Sunset;
      let offsetTime = Math.abs(offsetMinsSunrise) <= Math.abs(offsetMinsSunset) ? sunriseOffset : sunsetOffset;

      offsetTime = limitOffset(offsetTime);

      this.hours = offsetTime.hours;
      this.minutes = offsetTime.minutes;
    }
    else {
      let fixedTime = this.mode == TimeMode.Sunrise ? parseTimeString(tsSunrise) : parseTimeString(tsSunset);
      fixedTime = addTimeOffset(fixedTime, { hours: this.hours, minutes: this.minutes });
      this.mode = TimeMode.Fixed;
      this.hours = fixedTime.hours;
      this.minutes = fixedTime.minutes;
    }
    this._valueChanged();
  }

  private _toggleSunriseSunsetClick() {
    this.mode = this.mode == TimeMode.Sunrise ? TimeMode.Sunset : TimeMode.Sunrise;
    this._valueChanged();
  }

  private _toggleBeforeAfterClick() {
    if (this.hours != 0) {
      this.hours = -this.hours;
    }
    else {
      this.minutes = -this.minutes;
    }
    this._valueChanged();
  }

  static styles = css`
    :host {
      display: flex;
    }
    .time-input-wrap {
      display: flex;
      direction: ltr;
      width: 100%;
    }
    div.hours, div.minutes {
      display: flex;
      flex-direction: column;
      width: min-content;
    }
    div.hours > *, div.minutes > * {
      display: flex;
    }
    div.separator {
      display: flex;
      align-items: center;
      font-size: 36px;
    }
    ha-textfield {
      text-align: center;
      --text-field-text-align: center;
      --text-field-padding: 0 4px;
      --mdc-typography-subtitle1-font-size: 42px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
    }
    div.hours ha-icon, div.minutes ha-icon {
      --mdc-icon-size: 42px;
    }
    div.suffix {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      align-items: center;
    }
    div.mode {
      display: flex;
      align-items: center;
    }
    div.suffix ha-icon, div.mode ha-icon {
      --mdc-icon-size: 32px;
    }
    ha-button {
      --ha-button-border-radius: 8px;
    }
    ha-button span.large {
      font-size: 24px;
    }
  `;
}