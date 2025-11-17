import { mdiClockOutline, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from "@mdi/js";
import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { computeTimeOffset } from "../data/time/compute_time_offset";
import { parseTimeString } from "../data/time/parse_time_string";
import { Time, TimeMode } from "../types";
import { addTimeOffset } from "../data/time/add_time_offset";
import { HomeAssistant } from "../lib/types";
import { AmPmFormat, convertTo12Hour, convertTo24Hour, useAmPm } from "../lib/use_am_pm";
import { fireEvent } from "../lib/fire_event";
import { hassLocalize } from "../localize/hassLocalize";

const MAX_OFFFSET_HOURS = 4;

const limitOffset = <T extends Time | { hours: number; minutes: number }>(time: T): T => {
  const offsetTime = time.hours * 60 + time.minutes;
  if (offsetTime > MAX_OFFFSET_HOURS * 60) time = { ...time, hours: MAX_OFFFSET_HOURS, minutes: 0 };
  else if (offsetTime < -MAX_OFFFSET_HOURS * 60) time = { ...time, hours: -MAX_OFFFSET_HOURS, minutes: 0 };
  return time;
};

@customElement("scheduler-time-picker")
export class SchedulerTimePicker extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  set time(value: string) {
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

  @property({ type: Boolean }) large = false;

  @property({ attribute: false }) stepSize = 10;

  protected render(): TemplateResult {
    const _validateHourInput = (value: any, _nativeValidity: any) => {
      const valid = value.match(/^[1|2]?[0-9]$/) !== null;

      return {
        valid: valid,
        customError: !valid,
      };
    };

    const _validateMinuteInput = (value: any, _nativeValidity: any) => {
      const valid = value.match(/^[0-5]?[0-9]$/) !== null;

      return {
        valid: valid,
        customError: !valid,
      };
    };

    return html`
      <div class="time-input-wrap">
        <div class="input">
          ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
          ${this.large ? nothing : this._renderTimeMode()}
          <div class="hours">
            ${this.large
              ? html`
                  <ha-button
                    appearance="plain"
                    @click=${() => this._addTimeOffset({ hours: 1 })}
                    ?disabled=${this.mode != TimeMode.Fixed && this.hours == MAX_OFFFSET_HOURS}
                  >
                    <ha-icon icon="mdi:chevron-up"></ha-icon>
                  </ha-button>
                `
              : nothing}
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
              max=${this.mode == TimeMode.Fixed ? (this.useAmPm ? 12 : 23) : MAX_OFFFSET_HOURS}
              min=${this.mode != TimeMode.Fixed && !this.large ? -MAX_OFFFSET_HOURS : 0}
              .disabled=${this.disabled}
              suffix="${this.large ? "" : ":"}"
              class="${this.large ? "" : "hasSuffix"}"
              .validityTransform=${_validateHourInput}
            >
            </ha-textfield>
            ${this.large
              ? html`
                  <ha-button
                    appearance="plain"
                    @click=${() => this._addTimeOffset({ hours: -1 })}
                    ?disabled=${this.mode != TimeMode.Fixed && this.hours == -MAX_OFFFSET_HOURS}
                  >
                    <ha-icon icon="mdi:chevron-down"></ha-icon>
                  </ha-button>
                `
              : nothing}
          </div>
          ${this.large ? html`<div class="separator">:</div>` : nothing}
          <div class="minutes">
            ${this.large
              ? html`
                  <ha-button
                    appearance="plain"
                    @click=${() => this._addTimeOffset({ minutes: this.stepSize })}
                    ?disabled=${this.mode != TimeMode.Fixed && this.hours == MAX_OFFFSET_HOURS}
                  >
                    <ha-icon icon="mdi:chevron-up"></ha-icon>
                  </ha-button>
                `
              : nothing}
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
              .validityTransform=${_validateMinuteInput}
              suffix=""
              class=""
            >
            </ha-textfield>
            ${this.large
              ? html`
                  <ha-button
                    appearance="plain"
                    @click=${() => this._addTimeOffset({ minutes: -this.stepSize })}
                    ?disabled=${this.mode != TimeMode.Fixed && this.hours == -MAX_OFFFSET_HOURS}
                  >
                    <ha-icon icon="mdi:chevron-down"></ha-icon>
                  </ha-button>
                `
              : nothing}
          </div>
          ${this._renderSuffix()} ${this.large ? this._renderTimeMode() : nothing}
        </div>
      </div>
    `;
  }

  _renderTimeMode() {
    if (!this.hass.states["sun.sun"]) return nothing;

    if (this.large) {
      const _toggleTimeMode = () => {
        let newTime = this._convertTimeMode();
        if (newTime.mode != TimeMode.Fixed) newTime = limitOffset(newTime);
        this.mode = newTime.mode;
        this.hours = newTime.hours;
        this.minutes = newTime.minutes;
        this._valueChanged();
      };

      return html`
        <div class="mode">
          ${this.hass.states["sun.sun"]
            ? html`
                <ha-button
                  appearance="${this.mode == TimeMode.Fixed ? "plain" : "filled"}"
                  variant="${this.mode == TimeMode.Fixed ? "neutral" : "brand"}"
                  @click=${_toggleTimeMode}
                >
                  <ha-icon icon="mdi:theme-light-dark"></ha-icon>
                </ha-button>
              `
            : nothing}
        </div>
      `;
    } else {
      const modeOptions = [TimeMode.Fixed, TimeMode.Sunrise, TimeMode.Sunset];

      const modeOptionLabels = {
        [TimeMode.Fixed]: hassLocalize("ui.components.selectors.selector.types.time", this.hass),
        [TimeMode.Sunrise]: hassLocalize("ui.panel.config.automation.editor.triggers.type.sun.sunrise", this.hass),
        [TimeMode.Sunset]: hassLocalize("ui.panel.config.automation.editor.triggers.type.sun.sunset", this.hass),
      };

      const modeOptionIcons = {
        [TimeMode.Fixed]: "mdi:clock-outline",
        [TimeMode.Sunrise]: "mdi:weather-sunset-up",
        [TimeMode.Sunset]: "mdi:weather-sunset-down",
      };

      const buttonIcons = {
        [TimeMode.Fixed]: mdiClockOutline,
        [TimeMode.Sunrise]: mdiWeatherSunsetUp,
        [TimeMode.Sunset]: mdiWeatherSunsetDown,
      };

      const isDisabled = (mode: TimeMode) => {
        if (mode == TimeMode.Fixed) return false;
        const offsetTime = this._convertTimeMode(mode);
        return Math.abs(offsetTime.hours * 60 + offsetTime.minutes) > MAX_OFFFSET_HOURS * 60;
      };

      const _handleMenuAction = (ev: CustomEvent, options: TimeMode[]) => {
        const index = ev.detail.index;
        options = options.filter((e) => e != this.mode);
        const newMode = options[index];

        const newTime = this._convertTimeMode(newMode);
        this.hours = newTime.hours;
        this.minutes = newTime.minutes;
        this.mode = newMode;

        ev.preventDefault();
        const el = ev.target as HTMLElement;
        setTimeout(() => {
          (el.firstElementChild as HTMLElement).blur();
        }, 50);
        this._valueChanged();
      };

      return html`
        <ha-button-menu
          @action=${(ev: CustomEvent) => _handleMenuAction(ev, modeOptions)}
          @closed=${(ev: Event) => {
            ev.stopPropagation();
          }}
          fixed
          ?disabled=${this.disabled}
        >
          <ha-icon-button slot="trigger" .path=${buttonIcons[this.mode]} ?disabled=${this.disabled}> </ha-icon-button>
          ${modeOptions.map(
            (e) => html`
              <mwc-list-item graphic="icon" ?noninteractive=${this.mode == e} ?disabled=${isDisabled(e)}>
                ${modeOptionLabels[e]}
                <ha-icon slot="graphic" icon="${modeOptionIcons[e]}"></ha-icon>
              </mwc-list-item>
            `
          )}
        </ha-button-menu>
      `;
    }
  }

  _renderSuffix() {
    if (this.large) {
      const _toggleAmPmClick = () => {
        const value = convertTo12Hour(this.hours).am_pm;
        const hours12 = convertTo12Hour(this.hours).hours;
        this.hours = convertTo24Hour(hours12, value == "AM" ? AmPmFormat.PM : AmPmFormat.AM);

        this._valueChanged();
      };

      const _toggleBeforeAfterClick = () => {
        if (this.hours != 0) this.hours = -this.hours;
        else this.minutes = -this.minutes;
        this._valueChanged();
      };

      const _toggleSunriseSunsetClick = () => {
        this.mode = this.mode == TimeMode.Sunrise ? TimeMode.Sunset : TimeMode.Sunrise;
        this._valueChanged();
      };

      return html`
        <div class="suffix">
          ${this.useAmPm && this.mode == TimeMode.Fixed
            ? html`
                <ha-button appearance="plain" @click=${_toggleAmPmClick}>
                  <span class="large"> ${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"} </span>
                </ha-button>
              `
            : nothing}
          ${this.mode != TimeMode.Fixed
            ? html`
                <ha-button appearance="plain" size="large" @click=${_toggleBeforeAfterClick}>
                  <span class="large">
                    ${this.hours < 0 || this.minutes < 0
                      ? this.hass
                          .localize("ui.panel.config.automation.editor.conditions.type.sun.before")
                          .trim()
                          .toLowerCase()
                      : this.hass
                          .localize("ui.panel.config.automation.editor.conditions.type.sun.after")
                          .trim()
                          .toLowerCase()}
                  </span>
                </ha-button>
                <ha-button appearance="plain" @click=${_toggleSunriseSunsetClick}>
                  <ha-icon
                    icon="${this.mode == TimeMode.Sunrise ? "mdi:weather-sunny" : "mdi:weather-night"}"
                  ></ha-icon>
                </ha-button>
              `
            : nothing}
        </div>
      `;
    } else {
      if (!this.useAmPm || this.mode != TimeMode.Fixed) return nothing;
      return html`
        <ha-select
          .required=${this.required}
          .value=${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"}
          .disabled=${this.disabled}
          name="amPm"
          naturalMenuWidth
          fixedMenuPosition
          @selected=${this._amPmChanged}
          @closed=${(ev: Event) => {
            ev.stopPropagation();
          }}
        >
          <mwc-list-item value="AM">AM</mwc-list-item>
          <mwc-list-item value="PM">PM</mwc-list-item>
        </ha-select>
      `;
    }
  }

  private _convertTimeMode(newMode?: TimeMode) {
    const tsSunrise = this.hass.states["sun.sun"].attributes["next_rising"];
    const tsSunset = this.hass.states["sun.sun"].attributes["next_setting"];

    if ((newMode && newMode != TimeMode.Fixed) || this.mode == TimeMode.Fixed) {
      const sunriseOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunrise);
      const sunsetOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunset);

      const offsetMinsSunrise = sunriseOffset.hours * 60 + sunriseOffset.minutes;
      const offsetMinsSunset = sunsetOffset.hours * 60 + sunsetOffset.minutes;

      const mode = newMode
        ? newMode
        : Math.abs(offsetMinsSunrise) <= Math.abs(offsetMinsSunset)
          ? TimeMode.Sunrise
          : TimeMode.Sunset;
      const offsetTime = mode == TimeMode.Sunrise ? sunriseOffset : sunsetOffset;

      return {
        mode: mode,
        hours: offsetTime.hours,
        minutes: offsetTime.minutes,
      };
    } else {
      let fixedTime = this.mode == TimeMode.Sunrise ? parseTimeString(tsSunrise) : parseTimeString(tsSunset);
      fixedTime = addTimeOffset(fixedTime, { hours: this.hours, minutes: this.minutes });

      return {
        mode: TimeMode.Fixed,
        hours: fixedTime.hours,
        minutes: fixedTime.minutes,
      };
    }
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
    const oldValue = convertTo12Hour(this.hours).am_pm;
    if (oldValue == value) return;
    const hours12 = convertTo12Hour(this.hours).hours;
    this.hours = convertTo24Hour(hours12, value == "AM" ? AmPmFormat.AM : AmPmFormat.PM);
    this._valueChanged();
  }

  private _addTimeOffset(offset: { hours?: number; minutes?: number }) {
    let time: Time = { mode: this.mode, hours: this.hours, minutes: this.minutes };

    time = addTimeOffset(time, offset);
    if (this.mode != TimeMode.Fixed) time = limitOffset(time);

    this.hours = time.hours;
    this.minutes = time.minutes;
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
    const hours = this.useAmPm && this.mode == TimeMode.Fixed ? convertTo12Hour(this.hours).hours : this.hours;
    if (isNegative && !this.large) return "-" + Math.abs(hours).toFixed();
    else if (this.mode != TimeMode.Fixed && !this.large) return "+" + Math.abs(hours).toFixed();
    else if (this.large) return Math.abs(hours);
    else return hours.toFixed();
  }

  private formatMinutes() {
    return Math.abs(this.minutes).toString().padStart(2, "0");
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
    :host([large]) .time-input-wrap {
      width: 100%;
    }
    div.input {
      display: flex;
    }
    :host([large]) div.input {
      width: 100%;
    }
    div.hours,
    div.minutes {
      display: flex;
      flex-direction: column;
      width: min-content;
    }
    div.hours ha-icon,
    div.minutes ha-icon {
      --mdc-icon-size: 42px;
    }
    div.separator {
      display: flex;
      align-items: center;
      font-size: 36px;
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
    :host([large]) ha-textfield {
      width: auto;
      --mdc-typography-subtitle1-font-size: 42px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
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
    :host([large]) div.suffix ha-icon,
    :host([large]) div.mode ha-icon {
      --mdc-icon-size: 32px;
    }
    ha-select {
      --mdc-shape-small: 0;
      width: 85px;
    }
    .label {
      display: flex;
      justify-content: center;
      align-self: center;
      white-space: nowrap;
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
    ha-button {
      --ha-button-border-radius: 8px;
    }
    ha-button span.large {
      font-size: 16px;
      text-transform: uppercase;
    }
  `;
}
