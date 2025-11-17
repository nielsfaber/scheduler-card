import { LitElement, html, css, CSSResultGroup } from "lit";
import { property, customElement, state, eventOptions } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { CardConfig, ScheduleEntry, Time, TimeMode } from "../types";
import { mdiUnfoldMoreVertical } from "@mdi/js";
import { roundTime } from "../data/time/round_time";
import { timeToString } from "../data/time/time_to_string";
import { computeActionIcon } from "../data/format/compute_action_icon";
import { formatActionDisplay } from "../data/format/format_action_display";
import { parseTimeString } from "../data/time/parse_time_string";
import { computeTimestamp } from "../data/time/compute_timestamp";
import { HomeAssistant } from "../lib/types";
import { computeTimeOffset } from "../data/time/compute_time_offset";
import { useAmPm } from "../lib/use_am_pm";
import { addTimeOffset } from "../data/time/add_time_offset";

const SEC_PER_DAY = 24 * 3600;

@customElement("scheduler-timeslot-editor")
export class SchedulerTimeslotEditor extends LitElement {
  public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule?: ScheduleEntry;

  @state() selectedSlot: number | null = null;

  timeout = 0;

  @property({ type: Boolean })
  large = false;

  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(_event: any) {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.requestUpdate();
    }, 50);
  }

  firstUpdated() {
    //window.addEventListener('resize', this.handleResize);
  }

  render() {
    return html`
      <div class="bar">${this.renderTimeslots()}</div>
      <div class="time-bar">${this.renderTimebar()}</div>
    `;
  }

  renderTimebar() {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue("width"));
    const allowedStepSizes = [1, 2, 3, 4, 6, 8, 12];

    const amPm = useAmPm(this.hass.locale);

    const segmentWidth = amPm ? 130 : 100;
    let stepSize = Math.ceil(24 / (fullWidth / segmentWidth));
    while (!allowedStepSizes.includes(stepSize)) stepSize++;

    const nums = [0, ...Array.from(Array(24 / stepSize - 1).keys()).map((e) => (e + 1) * stepSize), 24];

    return nums.map((e, i) => {
      let w = (stepSize / 24) * 100;
      w = Math.floor(w * 100) / 100;

      const time: Time = { mode: TimeMode.Fixed, hours: e, minutes: 0 };
      //if (e == 24) time = { ...time, hours: 23, minutes: 59 };

      if (i == 0)
        return html`
          <span class="left" style=${styleMap({ width: `${w / 2}%` })}
            >${timeToString(time, { seconds: false, am_pm: amPm })}</span
          >
        `;
      else if (i == nums.length - 1)
        return html`
          <span class="right" style=${styleMap({ width: `${w / 2}%` })}
            >${timeToString(time, { seconds: false, am_pm: amPm })}</span
          >
        `;
      else
        return html`
          <span style=${styleMap({ width: `${w}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
        `;
    });
  }

  renderTimeslots() {
    //TODO: handle overlapping of tiemslots due to sun offset
    const slots = this.schedule!.slots;
    const slotWidths = this.computeSlotWidths();

    return slots.map((slot, i) => {
      const ts_start = computeTimestamp(slot.start, this.hass);
      let ts_stop = computeTimestamp(slot.stop || slot.start, this.hass);
      if (!ts_stop && ts_start) ts_stop = SEC_PER_DAY;

      const width = ((ts_stop - ts_start) / SEC_PER_DAY) * 100;
      const actionText = slot.actions.length
        ? formatActionDisplay(slot.actions[0], this.hass, this.config.customize, true, true)
        : "";

      const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue("width"));
      const textWidth = actionText.length * 5 + 10;
      const leftMargin = i > 0 ? 15 : 0;
      const rightMargin = i < slots.length - 1 ? 15 : 0;
      const slotWidth = (width * fullWidth) / 100 - leftMargin - rightMargin;
      const nextSlot = slots[i + 1];

      return html`
        <div
          class="slot ${this.selectedSlot == i ? "selected" : ""} ${slot.actions.length ? "" : "empty"} ${slot.stop ===
          undefined
            ? "short"
            : ""}"
          style="${styleMap({ width: `${slotWidths[i]}px` })}"
          @click=${this._toggleSelectTimeslot}
          idx="${i}"
        >
          ${slot.stop || 1 == 1
            ? ""
            : html` <div class="marker" @click=${this._toggleSelectTimeslot} idx="${i}"></div>`}
          ${slot.actions.length
            ? actionText && (slotWidth > textWidth / 3 || slotWidth > 50) && slotWidth > 30
              ? html`<span style="margin-left: ${leftMargin}px; margin-right: ${rightMargin}px">${actionText}</span>`
              : slotWidth > 16
                ? html`<ha-icon icon="${computeActionIcon(slot.actions[0], this.config.customize)}"></ha-icon>`
                : ""
            : ""}
        </div>
        ${i < slots.length - 1 && slot.stop
          ? html`
              <div
                idx="${i}"
                class="handle ${this.selectedSlot == i + 1 || this.selectedSlot == i ? "" : "hidden"} ${nextSlot &&
                !nextSlot.stop
                  ? "center"
                  : ""}"
              >
                <span>
                  <ha-icon-button
                    .path=${mdiUnfoldMoreVertical}
                    @mousedown=${this._handleDragStart}
                    @touchstart=${this._handleDragStart}
                  >
                  </ha-icon-button>
                </span>
              </div>
            `
          : ""}
      `;
    });
  }

  computeSlotWidths() {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue("width"));

    const slots = this.schedule!.slots;

    let availableWidth = fullWidth - (slots.length - 1) * 3;

    const widthPct = slots.map((e) => {
      const ts_start = computeTimestamp(e.start, this.hass);
      let ts_stop = computeTimestamp(e.stop || e.start, this.hass);
      if (!ts_stop && ts_start) ts_stop = SEC_PER_DAY;
      return (ts_stop - ts_start) / SEC_PER_DAY;
    });

    const minWidth = 5;
    const minPct = Math.round((minWidth / availableWidth) * 100) / 100;

    availableWidth = availableWidth - widthPct.filter((e) => e < minPct).length * minWidth;

    let remainingWidth = availableWidth;
    const slotWidths = widthPct.map((e) => {
      let width = e < minPct ? minWidth : Math.round(e * availableWidth);
      if (width > remainingWidth) width = remainingWidth;
      remainingWidth -= width;
      return width;
    });

    return slotWidths;
  }

  _toggleSelectTimeslot(ev: Event) {
    let slot = ev.target as HTMLElement;
    if (slot.tagName.toLowerCase() != "div") slot = slot.parentElement as HTMLElement;
    const num = Number(slot.getAttribute("idx"));
    this.selectedSlot = this.selectedSlot !== num ? num : null;
    const myEvent = new CustomEvent("update", { detail: { selectedSlot: this.selectedSlot } });
    this.dispatchEvent(myEvent);
    ev.stopPropagation();
  }

  @eventOptions({ passive: true })
  _handleDragStart(ev: MouseEvent | TouchEvent) {
    let el = ev.target as HTMLElement;
    while (el.tagName !== "DIV") el = el.parentElement as HTMLElement;

    const trackElement = el.parentElement as HTMLElement;
    const trackBounds = trackElement.getBoundingClientRect();

    const slotIdx = Number(el.getAttribute("idx"));
    let ts_min =
      slotIdx > 0
        ? computeTimestamp(
            this.schedule!.slots[slotIdx - 1].stop || this.schedule!.slots[slotIdx - 1].start,
            this.hass
          ) +
          15 * 60
        : 15 * 60;

    let ts_max =
      (computeTimestamp(this.schedule!.slots[slotIdx + 1].stop || this.schedule!.slots[slotIdx + 1].start, this.hass) ||
        SEC_PER_DAY) -
      15 * 60;
    if (this.schedule!.slots[slotIdx + 1].stop === undefined) {
      ts_max =
        (computeTimestamp(
          this.schedule!.slots[slotIdx + 2].stop || this.schedule!.slots[slotIdx + 2].start,
          this.hass
        ) || SEC_PER_DAY) -
        15 * 60;
    }

    const timeInputMode = parseTimeString(this.schedule!.slots[slotIdx + 1].start).mode;

    if ([TimeMode.Sunrise, TimeMode.Sunset].includes(timeInputMode)) {
      const time = parseTimeString(this.schedule!.slots[slotIdx + 1].start);
      const maxOffsetTime = computeTimestamp({ ...time, hours: 4, minutes: 0 }, this.hass);
      const minOffsetTime = computeTimestamp({ ...time, hours: -4, minutes: 0 }, this.hass);
      if (minOffsetTime > ts_min) ts_min = minOffsetTime;
      if (maxOffsetTime < ts_max) ts_max = maxOffsetTime;
    }

    let mouseMoveHandler = (ev: MouseEvent | TouchEvent) => {
      let mouseX;

      if (typeof TouchEvent !== "undefined") {
        if (ev instanceof TouchEvent) mouseX = ev.changedTouches[0].pageX;
        else mouseX = ev.pageX;
      } else mouseX = (ev as MouseEvent).pageX;

      mouseX -= trackBounds.left;
      if (mouseX > trackBounds.width) mouseX = trackBounds.width;
      if (mouseX < 0) mouseX = 0;

      let ts = Math.round((mouseX / trackBounds.width) * SEC_PER_DAY);
      if (ts < ts_min) ts = ts_min;
      else if (ts > ts_max) ts = ts_max;

      const hours = Math.floor(ts / 3600);
      const minutes = Math.round((ts - hours * 3600) / 60);

      let time: Time = { mode: TimeMode.Fixed, hours: hours, minutes: minutes };

      if ([TimeMode.Sunrise, TimeMode.Sunset].includes(timeInputMode)) {
        const referenceTime =
          timeInputMode == TimeMode.Sunrise
            ? this.hass.states["sun.sun"].attributes["next_rising"]
            : this.hass.states["sun.sun"].attributes["next_setting"];

        const offset = computeTimeOffset(time, referenceTime);
        time = { mode: timeInputMode, hours: offset.hours, minutes: offset.minutes };
      }
      time = roundTime(time, 15);

      const timeStr = timeToString(time);

      let slots = [...this.schedule!.slots];
      slots = Object.assign(slots, {
        [slotIdx]: { ...slots[slotIdx], stop: timeStr },
        [slotIdx + 1]: { ...slots[slotIdx + 1], start: timeToString(time) },
      });
      if (slots[slotIdx + 1].stop === undefined) {
        const timeStrNext = timeToString(addTimeOffset(time, { minutes: 1 }));
        slots = Object.assign(slots, {
          [slotIdx + 2]: { ...slots[slotIdx + 2], start: timeStrNext },
        });
      }
      this.schedule = { ...this.schedule!, slots: slots };
      const myEvent = new CustomEvent("update", { detail: { slots: slots } });
      this.dispatchEvent(myEvent);
    };

    const mouseUpHandler = () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("touchmove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("touchend", mouseUpHandler);
      window.removeEventListener("blur", mouseUpHandler);
      mouseMoveHandler = () => {
        /**/
      };
    };

    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("touchend", mouseUpHandler);
    window.addEventListener("blur", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("touchmove", mouseMoveHandler);
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        max-width: 100%;
        overflow: hidden;
      }
      .bar {
        width: 100%;
        height: 60px;
        display: flex;
      }
      .time-bar {
        width: 100%;
        height: 18px;
        display: flex;
      }
      .time-bar span {
        display: flex;
        justify-content: center;
        white-space: nowrap;
      }
      .time-bar span.left {
        justify-content: left;
      }
      .time-bar span.right {
        justify-content: right;
      }

      .slot {
        display: flex;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        background: rgba(var(--rgb-primary-color), 0.7);
        color: var(--text-primary-color);
        font-weight: 500;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        white-space: normal;
        margin-right: 3px;
      }
      .slot:hover {
        background: rgba(var(--rgb-primary-color), 0.85);
      }
      .slot.selected {
        border: 3px solid rgba(var(--rgb-primary-color), 0.85);
      }
      .slot.selected:hover {
        border: 3px solid rgba(var(--rgb-primary-color), 1);
      }
      .slot:first-child {
        border-radius: 10px 0px 0px 10px;
      }
      .slot:last-child {
        border-radius: 0px 10px 10px 0px;
        margin-right: 0px;
      }
      .slot.empty {
        background: rgba(var(--rgb-secondary-text-color), 0.5);
      }
      .slot.empty:hover {
        background: rgba(var(--rgb-secondary-text-color), 0.65);
      }
      .slot.empty.selected {
        border: 3px solid rgba(var(--rgb-secondary-text-color), 0.65);
      }
      .slot.empty.selected:hover {
        border: 3px solid rgba(var(--rgb-secondary-text-color), 1);
      }
      .slot .marker {
        width: 24px;
        height: 24px;
        background: rgba(var(--rgb-primary-color), 0.85);
        margin-top: -80px;
        position: absolute;
        transform: rotate(45deg);
        border-radius: 12px 12px 0px 12px;
      }
      .slot .marker:hover {
        background: rgba(var(--rgb-primary-color), 1);
      }
      .slot.empty .marker {
        background: rgba(var(--rgb-secondary-text-color), 0.85);
      }
      .slot.empty .marker:hover {
        background: rgba(var(--rgb-secondary-text-color), 1);
      }
      .handle {
        display: flex;
        width: 36px;
        height: 100%;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-left: -18px;
        margin-right: -18px;
        visibility: visible;
      }
      .handle.hidden {
        visibility: hidden;
      }
      .handle span {
        background: var(--card-background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        z-index: 5;
      }
      .handle ha-icon-button {
        --mdc-icon-button-size: 36px;
        margin-top: -6px;
        margin-left: -6px;
      }
      .handle.center span {
        margin-right: -2px;
      }
    `;
  }
}
