import wrap from "@vue/web-component-wrapper";
import Vue from "vue";
import DateRangePicker from "vue2-daterange-picker";
import { customElement, property } from "lit/decorators";
// @ts-ignore
import dateRangePickerStyles from "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import { LitElement, TemplateResult, CSSResultGroup, css, html } from "lit";
import { HomeAssistant } from "custom-card-helpers";
import { getLocale } from "../helpers";
import { fireEvent } from 'custom-card-helpers';
import { formatDate } from "../data/date-time/format_date";
import { stringToDate } from "../data/date-time/string_to_date";


export type Constructor<T = any> = new (...args: any[]) => T;

export interface DateRange {
  startDate: Date,
  endDate: Date
}

const Component = Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: [String, Date],
      default() {
        return new Date();
      },
    },
    endDate: {
      type: [String, Date],
      default() {
        return new Date();
      },
    },
  },
  render(createElement) {
    // @ts-ignore
    return createElement(DateRangePicker, {
      props: {
        "time-picker": false,
        "auto-apply": false,
        opens: "right",
        "show-dropdowns": false,
        // @ts-ignore
        disabled: this.disabled,
        // @ts-ignore
        ranges: this.ranges ? {} : false,
      },
      model: {
        value: {
          // @ts-ignore
          startDate: this.startDate,
          // @ts-ignore
          endDate: this.endDate,
        },
        callback: (value) => {
          // @ts-ignore
          fireEvent(this.$el as HTMLElement, "change", value);
        },
        expression: "dateRange",
      },
      scopedSlots: {
        input() {
          return createElement("slot", {
            domProps: { name: "input" },
          });
        },
        header() {
          return createElement("slot", {
            domProps: { name: "header" },
          });
        },
        footer() {
          return createElement("slot", {
            domProps: { name: "footer" },
          });
        },
      },
    });
  },
});

// @ts-ignore
const WrappedElement: Constructor<HTMLElement> = wrap(Vue, Component);

@customElement('vue-date-picker')
class VueDatePicker extends WrappedElement {
  constructor() {
    super();
    const style = document.createElement("style");
    style.innerHTML = `
          ${dateRangePickerStyles}
          .calendars {
            display: flex;
          }
          .daterangepicker {
            left: 0px !important;
            top: auto;
            background-color: var(--card-background-color);
            border: none;
            border-radius: var(--ha-card-border-radius, 4px);
            box-shadow: var(
              --ha-card-box-shadow,
              0px 2px 1px -1px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 1px 3px 0px rgba(0, 0, 0, 0.12)
            );
            color: var(--primary-text-color);
            min-width: initial !important;
          }
          .daterangepicker:after {
            border-bottom: 6px solid var(--card-background-color);
          }
          .daterangepicker .calendar-table {
            background-color: var(--card-background-color);
            border: none;
          }
          .daterangepicker .calendar-table td,
          .daterangepicker .calendar-table th {
            background-color: transparent;
            color: var(--secondary-text-color);
            border-radius: 0;
            outline: none;
            width: 32px;
            height: 32px;
          }
          .daterangepicker td.off,
          .daterangepicker td.off.end-date,
          .daterangepicker td.off.in-range,
          .daterangepicker td.off.start-date {
            background-color: var(--secondary-background-color);
            color: var(--disabled-text-color);
          }
          .daterangepicker td.in-range {
            background-color: var(--light-primary-color);
            color: var(--text-light-primary-color, var(--primary-text-color));
          }
          .daterangepicker td.active,
          .daterangepicker td.active:hover {
            background-color: var(--primary-color);
            color: var(--text-primary-color);
          }
          .daterangepicker td.start-date.end-date {
            border-radius: 50%;
          }
          .daterangepicker td.start-date {
            border-radius: 50% 0 0 50%;
          }
          .daterangepicker td.end-date {
            border-radius: 0 50% 50% 0;
          }
          .reportrange-text {
            background: none !important;
            padding: 0 !important;
            border: none !important;
          }
          .daterangepicker .calendar-table .next span,
          .daterangepicker .calendar-table .prev span {
            border: solid var(--primary-text-color);
            border-width: 0 2px 2px 0;
          }
          .daterangepicker .ranges li {
            outline: none;
          }
          .daterangepicker .ranges li:hover {
            background-color: var(--secondary-background-color);
          }
          .daterangepicker .ranges li.active {
            background-color: var(--primary-color);
            color: var(--text-primary-color);
          }
          .daterangepicker select.ampmselect,
          .daterangepicker select.hourselect,
          .daterangepicker select.minuteselect,
          .daterangepicker select.secondselect {
            background: transparent;
            border: 1px solid var(--divider-color);
            color: var(--primary-color);
          }
          .daterangepicker .drp-buttons .btn {
            border: 1px solid var(--primary-color);
            background-color: transparent;
            color: var(--primary-color);
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
          }
          .calendars-container {
            flex-direction: column;
            align-items: center;
          }
          .drp-calendar.col.right .calendar-table {
            display: none;
          }
          .daterangepicker.show-ranges .drp-calendar.left {
            border-left: 0px;
          }
          .daterangepicker .drp-calendar.left {
            padding: 8px;
          }
          .daterangepicker.show-calendar .ranges {
            margin-top: 0;
            padding-top: 8px;
            border-right: 1px solid var(--divider-color);
          }
          @media only screen and (max-width: 800px) {
            .calendars {
              flex-direction: column;
            }
          }
          .calendar-table {
            padding: 0 !important;
          }
        `;
    const shadowRoot = this.shadowRoot!;
    shadowRoot.appendChild(style);
    // Stop click events from reaching the document, otherwise it will close the picker immediately.
    shadowRoot.addEventListener("click", (ev) => ev.stopPropagation());
  }
}




@customElement("scheduler-date-picker")
export class SchedulerDatePicker extends LitElement {

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property()
  set startDate(value: string) {
    this._startDate = stringToDate(value);
  }
  get startDate() {
    return formatDate(this._startDate, getLocale(this.hass), true);
  }

  @property()
  _startDate: Date = new Date();

  @property()
  set endDate(value: string) {
    this._endDate = stringToDate(value);
  }
  get endDate() {
    return formatDate(this._endDate, getLocale(this.hass), true);
  }

  @property()
  _endDate: Date = new Date();

  @property({ type: Boolean })
  public disabled = false;

  protected render(): TemplateResult {
    return html`
      <vue-date-picker
        ?disabled=${this.disabled}
        start-date=${this.startDate}
        end-date=${this.endDate}
        @change=${this._handleUpdate}
      >
        <div slot="input" class="date-range-inputs">
          <paper-input
            .value=${formatDate(this._startDate, getLocale(this.hass))}
            .label=${this.hass.localize("ui.components.date-range-picker.start_date")}
            .disabled=${this.disabled}
            @click=${this._handleInputClick}
            readonly
          ></paper-input>
          <paper-input
            .value=${formatDate(this._endDate, getLocale(this.hass))}
            label=${this.hass.localize("ui.components.date-range-picker.end_date")}
            .disabled=${this.disabled}
            @click=${this._handleInputClick}
            readonly
          ></paper-input>
        </div>
        <div slot="footer" class="date-range-footer">
          <mwc-button @click=${this._cancelDateRange}>
            ${this.hass.localize("ui.common.cancel")}
          </mwc-button>
          <mwc-button @click=${this._applyDateRange}>
            ${this.hass.localize("ui.components.date-range-picker.select")}
          </mwc-button>
        </div>
      </vue-date-picker>
    `;
  }

  private _cancelDateRange() {
    this._dateRangePicker.clickCancel();
  }

  private _applyDateRange() {
    this._dateRangePicker.clickedApply();
  }

  private get _dateRangePicker() {
    const dateRangePicker = this.shadowRoot!.querySelector("vue-date-picker") as any;
    return dateRangePicker.vueComponent.$children[0];
  }

  private _handleInputClick() {
    // close the date picker, so it will open again on the click event
    if (this._dateRangePicker.open) {
      this._dateRangePicker.open = false;
    }
  }

  private _handleUpdate(ev: CustomEvent) {
    const value = ev.detail as DateRange;
    this._startDate = value.startDate;
    this._endDate = value.endDate;

    fireEvent(this, 'value-changed', {
      value: {
        startDate: this.startDate,
        endDate: this.endDate,
      }
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-svg-icon {
        margin-right: 8px;
      }
      .date-range-inputs {
        display: flex;
        align-items: center;
      }
      .date-range-ranges {
        border-right: 1px solid var(--divider-color);
      }
      .date-range-footer {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }
      paper-input {
        display: inline-block;
        max-width: 250px;
      }
      paper-input:last-child {
        margin-left: 8px;
      }
      @media only screen and (max-width: 800px) {
        .date-range-ranges {
          border-right: none;
          border-bottom: 1px solid var(--divider-color);
        }
      }
      @media only screen and (max-width: 500px) {
        paper-input {
          min-width: inherit;
        }
        ha-svg-icon {
          display: none;
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "scheduler-date-picker": SchedulerDatePicker;
  }
}