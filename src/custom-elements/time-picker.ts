import { LitElement, html, customElement, css, property } from 'lit-element';
import { formatTime, wrapTime, MinutesPerHour, roundTime, ETimeEvent, parseTimestamp } from '../date-time';
import { localize } from '../localize/localize';
import { HomeAssistant } from 'custom-card-helpers';
import { DefaultTimeStep } from '../const';

@customElement('time-picker')
export class TimePicker extends LitElement {

  _val = 0;
  @property({ type: Number })
  set value(val) {
    let oldVal = this.value;
    this._val = val;
    this.requestUpdate('value', oldVal);
  }

  get value() { return roundTime(this._val, this.stepSize); }

  @property() hass?: HomeAssistant;

  @property({ type: String })
  event?: ETimeEvent;

  @property({ type: Boolean })
  formatAmPm?: boolean = false;

  @property({ type: Number })
  stepSize = DefaultTimeStep;

  maxOffset: number = 2;


  updated() {
    let myEvent = new CustomEvent("change", { detail: { event: this.event } });
    this.dispatchEvent(myEvent);
  }

  firstUpdated() {
    let options = this.event ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour } : { stepSize: this.stepSize };
    this.value = wrapTime(this.value, options);
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
    let options = this.event ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour } : { stepSize: this.stepSize };
    this.value = wrapTime(this._val + MinutesPerHour, options);
  }

  private hoursDown() {
    let options = this.event ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour } : { stepSize: this.stepSize };
    this.value = wrapTime(this._val - MinutesPerHour, options);
  }

  private minutesUp() {
    let options = this.event ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour } : { stepSize: this.stepSize };
    this.value = wrapTime(this._val + this.stepSize, options);
  }

  private minutesDown() {
    let options = this.event ? { stepSize: this.stepSize, signed: true, max: this.maxOffset * MinutesPerHour } : { stepSize: this.stepSize };
    this.value = wrapTime(this._val - this.stepSize, options);
  }

  private getSunModeToggle() {
    if (!this.hass) return html``;
    if (!this.hass.states['sun.sun']) return html``;

    // let diff_sunrise = Math.abs(wrapTime(this._val - this.sunrise, { stepSize: this.stepSize, signed: true }));
    // let diff_sunset = Math.abs(wrapTime(this._val - this.sunset, { stepSize: this.stepSize, signed: true }));
    //let enabled = (this.event || diff_sunrise <= this.maxOffset * MinutesPerHour || diff_sunset <= this.maxOffset * MinutesPerHour);
    //if (enabled)
    return html`
          <mwc-button @click="${this.toggleMode}" class="${this.event ? 'active' : ''}">
            <ha-icon icon="hass:theme-light-dark"></ha-icon>
          </mwc-button>
      `;
    // else
    //   return html`
    //       <mwc-button disabled="disabled">
    //         <ha-icon icon="hass:theme-light-dark"></ha-icon>
    //       </mwc-button>
    //   `;
  }

  private getAmPm() {
    return formatTime(this._val, { amPm: this.formatAmPm }).amPm;
  }

  private getBeforeAfter() {
    return (this.value < 0) ? localize('words.before') : localize('words.after');
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
    }
    else if (this.formatAmPm) {
      return html`
      <div class="suffix">
        <mwc-button @click="${this.toggleAmPm}">
          ${this.getAmPm()}
        </mwc-button>
      </div>
    `;
    }
    else return html``;
  }


  private toggleAmPm() {
    if (this._val < 12 * MinutesPerHour) this.value = wrapTime(this._val + 12 * MinutesPerHour);
    else this.value = wrapTime(this._val - 12 * MinutesPerHour);
  }

  private toggleBeforeAfter() {
    this.value = -this._val;
  }

  private toggleSunriseSunset() {
    this.event = (this.event == ETimeEvent.Sunrise) ? ETimeEvent.Sunset : ETimeEvent.Sunrise;
    this.value = this._val; //force update the view
  }


  private toggleMode() {
    if (!this.hass) return;
    let sunEntity = this.hass.states['sun.sun'];
    let ts_sunrise = parseTimestamp(sunEntity.attributes.next_rising);
    let ts_sunset = parseTimestamp(sunEntity.attributes.next_setting);

    let ts = this.value;
    if (!this.event) {
      let ts_ref;
      if (Math.abs(ts - ts_sunrise) < Math.abs(ts - ts_sunset)) {
        ts_ref = ts_sunrise;
        this.event = ETimeEvent.Sunrise;
      }
      else {
        ts_ref = ts_sunset;
        this.event = ETimeEvent.Sunset;
      }
      this.value = ts - ts_ref;
      if (this.value > this.maxOffset * MinutesPerHour) this.value = this.maxOffset * MinutesPerHour;
      else if (this.value < -this.maxOffset * MinutesPerHour) this.value = -this.maxOffset * MinutesPerHour;
    }
    else {
      let ts_ref = (this.event == ETimeEvent.Sunrise) ? ts_sunrise : ts_sunset;
      this.event = undefined;
      this.value = ts + ts_ref;
    }
  }

  static styles = css`
      div.time-picker {
        display: grid;
        grid-template-columns: min-content min-content min-content 1fr min-content;
        grid-template-rows: min-content min-content min-content;
        grid-template-areas: "hours-up   .         minutes-up   suffix options"
                             "hours      separator minutes      suffix options"
                             "hours-down .         minutes-down suffix options";
        grid-gap: 10px 0px;
        align-items: center;
      }

      div.hours-up { grid-area: hours-up; }
      div.hours { grid-area: hours; }
      div.hours-down { grid-area: hours-down; }
      div.separator { grid-area: separator; }
      div.minutes-up { grid-area: minutes-up; }
      div.minutes { grid-area: minutes; }
      div.minutes-down { grid-area: minutes-down; }
      div.suffix { grid-area: suffix; flex-grow: 1; }
      div.options { grid-area: options; }

      div.hours-up, div.hours-down, div.minutes-up, div.minutes-down {
        --mdc-icon-size: 42px;
      }

      div.hours, div.minutes {
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
