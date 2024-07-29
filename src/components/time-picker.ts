import { mdiClockOutline, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from "@mdi/js";
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { computeTimeOffset } from "../data/time/compute_time_offset";
import { parseTimeString } from "../data/time/parse_time_string";
import { Time, TimeMode } from "../types";
import { addTimeOffset } from "../data/time/add_time_offset";
import { HomeAssistant } from "../lib/types";
import { AmPmFormat, convertTo12Hour, convertTo24Hour, useAmPm } from "../lib/use_am_pm";
import { fireEvent } from "../lib/fire_event";

@customElement("scheduler-time-picker")
export class SchedulerTimePicker extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;

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

  @property({ type: String }) label = "";

  @property({ type: Boolean }) useAmPm = false;

  protected render(): TemplateResult {
    return html`
      <div class="time-input-wrap">


        <span class="label">${this.label}</span>
        ${this._renderTimeModeOptions()}
          <div class="input">
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
          min=${this.mode == TimeMode.Fixed ? 0 : -4}
          .disabled=${this.disabled}
          suffix=":"
          class="hasSuffix"
          .validityTransform=${(value: any, _nativeValidity: any) => {
        const valid = value.match(/[\+|\-]?[0-9]+/) !== null;
        return {
          valid: valid,
          customError: !valid
        }
      }}
        >
        </ha-textfield>
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
          suffix=""
          class=""
        >
        </ha-textfield>
        ${!this.useAmPm || this.mode != TimeMode.Fixed
        ? ""
        : html`
          <ha-select
            .required=${this.required}
            .value=${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"}
            .disabled=${this.disabled}
            name="amPm"
            naturalMenuWidth
            fixedMenuPosition
            @selected=${this._amPmChanged}
            @closed=${(ev: Event) => { ev.stopPropagation() }}
          >
            <mwc-list-item value="AM">AM</mwc-list-item>
            <mwc-list-item value="PM">PM</mwc-list-item>
          </ha-select>
        `}
        </div>
      </div>
    `;
  }

  convertTimeMode(convertedMode: TimeMode) {
    let absTime: Time = { mode: TimeMode.Fixed, hours: this.hours, minutes: this.minutes };

    if ([TimeMode.Sunrise, TimeMode.Sunset].includes(this.mode)) {
      const referenceTime = this.mode == TimeMode.Sunrise
        ? this.hass.states['sun.sun'].attributes['next_rising']
        : this.hass.states['sun.sun'].attributes['next_setting'];

      let time = parseTimeString(referenceTime);
      time = addTimeOffset(time, { hours: this.hours, minutes: this.minutes });

      absTime = { ...absTime, hours: time.hours, minutes: time.minutes };
    }

    if ([TimeMode.Sunrise, TimeMode.Sunset].includes(convertedMode)) {
      const referenceTime = convertedMode == TimeMode.Sunrise
        ? this.hass.states['sun.sun'].attributes['next_rising']
        : this.hass.states['sun.sun'].attributes['next_setting'];

      const offset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, referenceTime);
      return <Time>{ mode: convertedMode, hours: offset.hours, minutes: offset.minutes };
    }
    else return absTime;
  }

  private _renderTimeModeOptions() {
    if (!this.hass.states['sun.sun']) return html``;
    let modeOptions = [
      TimeMode.Fixed,
      TimeMode.Sunrise,
      TimeMode.Sunset,
    ];

    const modeOptionLabels = {
      [TimeMode.Fixed]: 'Time',
      [TimeMode.Sunrise]: 'Sunrise',
      [TimeMode.Sunset]: 'Sunset'
    };
    //this.hass.localize('ui.panel.config.automation.editor.triggers.type.sun.sunrise')}

    const modeOptionIcons = {
      [TimeMode.Fixed]: 'mdi:clock-outline',
      [TimeMode.Sunrise]: 'mdi:weather-sunset-up',
      [TimeMode.Sunset]: 'mdi:weather-sunset-down'
    };

    const buttonIcons = {
      [TimeMode.Fixed]: mdiClockOutline,
      [TimeMode.Sunrise]: mdiWeatherSunsetUp,
      [TimeMode.Sunset]: mdiWeatherSunsetDown
    };

    const isDisabled = (mode: TimeMode) => {
      if (mode == TimeMode.Fixed) return false;
      const offsetTime = this.convertTimeMode(mode);
      return (Math.abs(offsetTime.hours * 60) + Math.abs(offsetTime.minutes)) > 240;
    };

    return html`
      <ha-button-menu
        @action=${(ev: CustomEvent) => this._handleMenuAction(ev, modeOptions)}
        @closed=${(ev: Event) => { ev.stopPropagation() }}
        fixed
        ?disabled=${this.disabled}
      >
        <ha-icon-button
          slot="trigger"
          .path=${buttonIcons[this.mode]}
          ?disabled=${this.disabled}
        >
        </ha-icon-button>
        ${modeOptions.map(e => html`
        <mwc-list-item graphic="icon" ?noninteractive=${this.mode == e} ?disabled=${isDisabled(e)}>
          ${modeOptionLabels[e]}
          <ha-icon
            slot="graphic"
            icon="${modeOptionIcons[e]}"
          ></ha-icon>
        </mwc-list-item>
        
        `)}
      </ha-button-menu>
    `;

  }

  private _hoursChanged(ev: InputEvent) {
    let value = Number((ev.target as HTMLInputElement).value);
    if (this.useAmPm) {
      const amPm = convertTo12Hour(this.hours).am_pm;
      value = convertTo24Hour(value, amPm);
    }
    this.hours = value;
    this._valueChanged();
  }

  private _minutesChanged(ev: InputEvent) {
    const value = Number((ev.target as HTMLInputElement).value);
    this.minutes = value;
    this._valueChanged();
  }

  private _amPmChanged(ev: InputEvent) {
    const value = (ev.target as HTMLInputElement).value;
    const hours12 = convertTo12Hour(this.hours).hours;
    this.hours = convertTo24Hour(hours12, value == 'AM' ? AmPmFormat.AM : AmPmFormat.PM);
    this._valueChanged();
  }

  private _valueChanged() {
    const value: Time = {
      mode: this.mode,
      hours: this.hours,
      minutes: this.minutes,
    };
    fireEvent(this, "value-changed", {
      value,
    });
  }

  private _onFocus(ev: FocusEvent) {
    (ev.currentTarget as HTMLInputElement).select();
  }

  private formatHours() {
    const isNegative = this.hours < 0 || this.minutes < 0;
    let hours = this.useAmPm && this.mode == TimeMode.Fixed ? convertTo12Hour(this.hours).hours : this.hours;
    if (isNegative) return '-' + Math.abs(hours).toFixed();
    else if (this.mode != TimeMode.Fixed) return '+' + Math.abs(hours).toFixed();
    else return hours.toFixed();
  }

  private formatMinutes() {
    return Math.abs(this.minutes).toString().padStart(2, "0");
  }

  private _handleMenuAction(ev: CustomEvent, options: TimeMode[]) {
    const index = ev.detail.index;
    options = options.filter(e => e != this.mode);
    const newMode = options[index];

    const newTime = this.convertTimeMode(newMode);
    this.hours = newTime.hours;
    this.minutes = newTime.minutes;
    this.mode = newMode;

    ev.preventDefault();
    const el = ev.target as HTMLElement;
    setTimeout(() => {
      (el.firstElementChild as HTMLElement).blur();
    }, 50);

    const value: Time = {
      mode: this.mode,
      hours: this.hours,
      minutes: this.minutes,
    };
    fireEvent(this, "value-changed", {
      value,
    });
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 4px;
      align-items: center;
    }
    .time-input-wrap {
      display: flex;
      border-radius: var(--mdc-shape-small, 4px) var(--mdc-shape-small, 4px) 0 0;
      overflow: hidden;
      position: relative;
      direction: ltr;
    }
    div.column {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
    :host([useAmPm]) div.column {
      flex-direction: column;
    }
    div.input {
      display: flex;
    }
    ha-textfield {
      width: 40px;
      text-align: center;
      --mdc-shape-small: 0;
      --text-field-appearance: none;
      --text-field-padding: 0 4px;
      --text-field-suffix-padding-left: 2px;
      --text-field-suffix-padding-right: 0;
      --text-field-text-align: center;
    }
    ha-textfield.hasSuffix {
      --text-field-padding: 0 0 0 4px;
    }
    ha-textfield:first-child {
      --text-field-border-top-left-radius: var(--mdc-shape-medium);
    }
    ha-textfield:last-child {
      --text-field-border-top-right-radius: var(--mdc-shape-medium);
    }
    ha-select {
      --mdc-shape-small: 0;
      width: 85px;
    }
    .label {
      display: flex;
      justify-content: center;
      align-self: center;
    }
    ha-button-menu {
      display: flex;
      align-items: flex-end;
      margin-right: 4px;
      padding-bottom: 4px;
    }
    ha-button-menu ha-icon-button {
      color: var(--secondary-text-color);
    }
    mwc-list-item[disabled] ha-icon {
      color: var(--disabled-text-color);
    }
    mwc-list-item[noninteractive] {
      background-color: rgba(var(--rgb-primary-color), 0.12);
      color: var(--sidebar-selected-text-color);
    }
    mwc-list-item[noninteractive] ha-icon {
      color: var(--sidebar-selected-text-color);
    }
  `;
}