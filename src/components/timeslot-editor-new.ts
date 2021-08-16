import { LitElement, html, customElement, property, eventOptions, CSSResult, css, PropertyValues } from 'lit-element';
import { Timeslot, Action, EVariableType, LevelVariable, ListVariable } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { stringToTime, timeToString, roundTime } from '../data/date-time/time';
import { compareActions } from '../data/actions/compare_actions';
import { levelVariableDisplay } from '../data/variables/level_variable';
import { unique, PrettyPrintName } from '../helpers';
import { localize } from '../localize/localize';
import { stringToDate } from '../data/date-time/string_to_date';
import { formatTime } from '../data/date-time/format_time';

const SEC_PER_DAY = 86400;
const SEC_PER_HOUR = 3600;

function Duration(el: Timeslot) {
  const start = stringToTime(el.start);
  let stop = stringToTime(el.stop!);
  if (stop < start) stop += SEC_PER_DAY;
  return stop - start;
}


@customElement('timeslot-editor-new')
export class TimeslotEditorNew extends LitElement {

  @property()
  hass?: HomeAssistant;

  @property({ type: Array })
  slots: Timeslot[] = [];

  @property({ type: Array })
  actions: Action[] = [];

  @property({ type: Number })
  stepSize = 10;

  isDragging: boolean = false;

  currentTime: number = 0;

  @property()
  rangeMin: number = 0; //lower bound of zoomed timeframe

  @property()
  rangeMax: number = SEC_PER_DAY; //upper bound of zoomed timeframe

  @property()
  activeSlot: number | null = null;

  @property()
  activeMarker: number | null = null;

  previousSlot: number | null = null;
  timer: number = 0;
  timeout: number = 0;

  zoomFactor: number = 1;

  render() {
    if (!this.hass) return html``;

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;

    return html`
    <div style="float: right">
    <ha-icon-button
      icon="hass:magnify-minus-outline"
      @click=${this._zoomOut}
      ?disabled=${this.zoomFactor == 1}
    ></ha-icon-button>
    <ha-icon-button
      icon="hass:magnify-plus-outline"
      @click=${this._zoomIn}
      ?disabled=${this.zoomFactor == 4}
    ></ha-icon-button>
    </div>
    <div class="outer">
    <div
      class="wrapper ${this.isDragging ? "" : "selectable"}"
      style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px"
    >
      ${this.renderSlots()}
    </div>
  </div>
  <div class="outer">
    <div
      class="time-wrapper"
      style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px"
    >
      ${this.renderTimes()}
    </div>
  </div>
  <mwc-button @click=${this._addSlot} ?disabled=${this.activeSlot === null || this.slots.length >= 24}>
    <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
    ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
  </mwc-button>
  <mwc-button @click=${this._removeSlot} ?disabled=${this.activeSlot === null || this.slots.length <= 2}>
    <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
    ${this.hass.localize('ui.common.delete')}
  </mwc-button>
    `;
  }

  renderSlots() {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
    let start = left;

    return this.slots
      .map((e, i) => {
        const w = ((stringToTime(e.stop!) || SEC_PER_DAY) - stringToTime(e.start)) / SEC_PER_DAY;
        const actionText = this.computeActionDisplay(e) || "";
        const textWidth = (actionText || '').length * 5 + 10;

        const leftMargin =
          start < 0 && start + w * width > 0
            ? -start + 5
            : 15;

        const rightMargin =
          start + w * width > fullWidth && start < fullWidth
            ? w * width - (fullWidth - start) + 5
            : 15;

        const availableWidth = w * width - leftMargin - rightMargin;

        start += w * width;

        return html`
        <div
          class="slot${this.activeSlot == i ? ' active' : ''} ${w * width < 2 ? "noborder" : ""}"
          style="width: ${Math.floor(w * 10000) / 100}%"
          @click=${this._selectSlot}
          slot="${i}"
        >
          ${i > 0 && (this.activeSlot === i || this.activeSlot === i - 1)
            ? html`
              <div class="handle">
                <div class="button-holder">
                <ha-icon-button
                  icon="hass:unfold-more-vertical"
                  @mousedown=${this._handleTouchStart}
                  @touchstart=${this._handleTouchStart}
                  @focus=${this._selectMarker}
                  @blur=${(ev: Event) => this._selectMarker(ev, false)}
                >
                </ha-icon-button></div>
              </div>
              `
            : ''}


          ${i > 0
            ? this.renderTooltip(i)
            : ''}

          <span style="margin-left: ${leftMargin.toFixed(2)}px; margin-right: ${rightMargin.toFixed(2)}px">
            ${actionText && (availableWidth > textWidth / 3 || availableWidth > 50) && availableWidth > 30 ? actionText : ''}
          </span>
        </div>
      `;
      });
  }

  renderTooltip(i: number) {

    const entry = i != this.previousSlot && (i - 1) != this.previousSlot;
    const leftSide = this.activeSlot == i;
    const rightSide = this.activeSlot == (i - 1);

    return html`
      <div
        class="tooltip"
        @click=${this._selectMarker}
      >
        ${formatTime(stringToDate(this.slots[i].start), this.hass!.language)}
      </div>
    `;
  }

  renderTimes() {
    this._updateTooltips();
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    let prevWidth = fullWidth;
    return this.slots.map(e => {
      let w = (((stringToTime(e.stop!) || SEC_PER_DAY) - stringToTime(e.start)) / SEC_PER_DAY) * 100;
      let show = prevWidth > 40;
      prevWidth = (w / 100) * width;
      return html`
        <div style="width: ${Math.floor(w * 100) / 100}%">
          ${show ? `${formatTime(stringToDate(e.start), this.hass!.language)}` : ''}
        </div>
      `;
    });
  }

  computeActionDisplay(entry: Timeslot) {
    if (!this.hass) return;
    if (!entry.actions) return '';

    return unique(entry.actions.map(action => {
      const actionConfig = this.actions.find(e => compareActions(e, action));
      if (!actionConfig) return '???';

      if (actionConfig.variables && Object.keys(actionConfig.variables).some(field => action.service_data && field in action.service_data)) {
        return Object.entries(actionConfig.variables)
          .filter(([field,]) => action.service_data && field in action.service_data)
          .map(([field, variable]) => {
            const value = action.service_data![field];
            if (variable.type == EVariableType.Level) {
              variable = variable as LevelVariable;
              return levelVariableDisplay(Number(value), variable);
            } else if (variable.type == EVariableType.List) {
              variable = variable as ListVariable;
              const listItem = variable.options.find(e => e.value == value);
              return PrettyPrintName(listItem && listItem.name ? listItem.name : String(value));
            }
            else return "";
          }).join(", ");
      }
      return PrettyPrintName(actionConfig.name || localize(`services.${action.service}`, this.hass!.language) || action.service);
    })).join(', ');
  }

  @eventOptions({ passive: true })
  private _handleTouchStart(ev: MouseEvent | TouchEvent) {

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
    const Toffset = -left / width * SEC_PER_DAY;

    let el = ev.target as HTMLElement;
    while (!el.classList.contains("slot")) el = el.parentElement as HTMLElement;

    const rightSlot = el;
    const leftSlot = rightSlot.previousElementSibling as HTMLElement;

    const i = Number(leftSlot.getAttribute("slot"));

    const Tmin = stringToTime(this.slots[i].start) + 60;
    const Tmax = (stringToTime(this.slots[i + 1].stop!) || SEC_PER_DAY) - 60;

    this.isDragging = true;

    const trackElement = (rightSlot.parentElement as HTMLElement).parentElement as HTMLElement;
    const trackCoords = trackElement.getBoundingClientRect();

    let mouseMoveHandler = (ev: MouseEvent | TouchEvent) => {
      let startDragX;

      if (typeof TouchEvent !== 'undefined') {
        if (ev instanceof TouchEvent) startDragX = ev.changedTouches[0].pageX;
        else startDragX = ev.pageX;
      } else startDragX = (ev as MouseEvent).pageX;

      let x = startDragX - trackCoords.left;
      if (x > (fullWidth - 10)) x = fullWidth - 10;
      if (x < 10) x = 10;
      let time = Math.round(x / width * SEC_PER_DAY + Toffset);

      if (time < Tmin) time = Tmin;
      if (time > Tmax) time = Tmax;

      this.currentTime = time;
      let timeString = timeToString(time);

      if (timeString == this.slots[i].stop) return;

      this.slots = Object.assign(this.slots, {
        [i]: {
          ...this.slots[i],
          stop: timeString
        },
        [i + 1]: {
          ...this.slots[i + 1],
          start: timeString
        }
      });
      this.requestUpdate();
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchend', mouseUpHandler);
      mouseMoveHandler = () => {
        /**/
      }
      setTimeout(() => {
        this.isDragging = false;
      }, 100);
      const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
      this.dispatchEvent(myEvent);
    };

    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', mouseUpHandler);
    window.addEventListener('blur', mouseUpHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', mouseMoveHandler);
  }

  _selectSlot(ev: Event) {
    if (this.isDragging) return;
    let el = (ev.target as HTMLElement);
    if (el.tagName.toLowerCase() == "span") el = el.parentElement as HTMLElement;
    if (el.classList.contains("handle")) el = el.parentElement as HTMLElement;
    const slot = Number(el.getAttribute("slot"));
    if (this.activeSlot == slot) {
      this.activeSlot = null;
      // this.rangeMin = 0;
      // this.rangeMax = SEC_PER_DAY;
      this.previousSlot = null;
    }
    else {
      this.previousSlot = this.activeSlot;
      this.activeSlot = slot;
      //this._calculateZoom();
    }
    this._updateZoom();
    const myEvent = new CustomEvent('update', { detail: { entry: this.activeSlot } });
    this.dispatchEvent(myEvent);
  }

  _calculateZoom() {
    const slot = Number(this.activeSlot);
    let min = stringToTime(this.slots[slot].start);
    let max = (stringToTime(this.slots[slot].stop!) || SEC_PER_DAY);

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));

    min -= (max - min) / 3;
    max += (max - min) / 3;

    if ((max - min) / SEC_PER_DAY * fullWidth >= 100) {
      min = 0;
      max = SEC_PER_DAY;
    } else {
      if (min < 0) max -= min;
      if (max > SEC_PER_DAY) min -= max - SEC_PER_DAY;
    }
    this.rangeMin = min > 0 ? min : 0;
    this.rangeMax = max < SEC_PER_DAY ? max : SEC_PER_DAY;

    clearInterval(this.timer);
    clearTimeout(this.timeout);

    this.timer = window.setInterval(() => {
      this._updateTooltips();
    }, 50);

    this.timeout = window.setTimeout(() => {
      clearInterval(this.timer);
      this._updateTooltips();
    }, 230);
  }

  private _addSlot() {
    if (this.activeSlot === null) return;
    const activeSlot = this.slots[this.activeSlot];
    const startTime = stringToTime(activeSlot.start);
    const endTime = stringToTime(activeSlot.stop!);
    const newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);

    this.slots = [
      ...this.slots.slice(0, this.activeSlot),
      { ...this.slots[this.activeSlot], stop: timeToString(newStop) },
      {
        start: timeToString(newStop),
        stop: timeToString(endTime),
        actions: []
      },
      ...this.slots.slice(this.activeSlot + 1)
    ];
    this._updateZoom();
    const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
    this.dispatchEvent(myEvent);
  }

  private _removeSlot() {
    if (this.activeSlot === null) return;
    const cutIndex = this.activeSlot == this.slots.length - 1 ? this.activeSlot - 1 : this.activeSlot;

    this.slots = [
      ...this.slots.slice(0, cutIndex),
      {
        ...this.slots[cutIndex! + 1],
        start: this.slots[cutIndex!].start,
        stop: this.slots[cutIndex! + 1].stop!,
      },
      ...this.slots.slice(cutIndex + 2)
    ];

    if (this.activeSlot == this.slots.length) this.activeSlot--;
    this._updateZoom();
    const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
    this.dispatchEvent(myEvent);
  }

  private _updateTooltips() {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    let tooltips = this.shadowRoot?.querySelectorAll(".tooltip") as unknown as HTMLElement[];

    const getBounds = (el: HTMLElement) => {
      const width = el.offsetWidth;
      const left = el.offsetLeft - 15;
      if (el.classList.contains("left")) return [left + width / 2, left + width * 3 / 2];
      else if (el.classList.contains("right")) return [left - width / 2, left + width / 2];
      else return [left, left + width];
    };

    tooltips?.forEach((tooltip, i) => {
      const visible = tooltip.classList.contains("visible");
      const slot = Number(tooltip.parentElement!.getAttribute("slot"));
      if (slot != this.activeSlot && (slot - 1) != this.activeSlot) {
        if (visible) tooltip.classList.remove("visible");
      }
      else {
        const left = tooltip.parentElement!.offsetLeft;
        if (left < 0 || left > (fullWidth + 15)) {
          if (visible) tooltip.classList.remove("visible");
        }
        else {
          if (!visible) tooltip.classList.add("visible");
          const width = tooltip.offsetWidth;
          const center = tooltip.classList.contains("center");
          let marginLeft = 0, marginRight = 0;
          const paddingL = 15;

          if (slot == this.activeSlot && (i + 1) < tooltips.length) { //left marker of active slot
            const nextTooltip = tooltips[i + 1];
            marginLeft = getBounds(tooltip)[0];
            marginRight = nextTooltip.offsetWidth
              ? getBounds(nextTooltip)[0] - getBounds(tooltip)[1]
              : fullWidth - getBounds(tooltip)[1];
          } else if (slot == this.activeSlot) {
            marginLeft = getBounds(tooltip)[0];
            marginRight = fullWidth - getBounds(tooltip)[1];
          } else if ((slot - 1) == this.activeSlot && i > 0) { //right marker of active slot
            const prevTooltip = tooltips[i - 1];
            marginLeft = getBounds(tooltip)[0] - getBounds(prevTooltip)[1]
            marginRight = fullWidth - getBounds(tooltip)[1];
          } else if ((slot - 1) == this.activeSlot) {
            marginLeft = getBounds(tooltip)[0];
            marginRight = fullWidth - getBounds(tooltip)[1];
          }
          //console.log(`slot ${slot} left ${marginLeft} right ${marginRight}`);

          if (marginLeft < marginRight) {
            if (marginLeft < 0) {
              if (center && marginRight > width / 2) {
                tooltip.classList.add("right");
                tooltip.classList.remove("center");
                tooltip.classList.remove("left");
                //console.log(`slot ${slot} right`);
              }
            }
            else {
              tooltip.classList.add("center");
              tooltip.classList.remove("right");
              tooltip.classList.remove("left");
              //console.log(`slot ${slot} center`);
            }
          }
          else {
            if (marginRight < 0) {
              if (center && marginLeft > width / 2) {
                tooltip.classList.add("left");
                tooltip.classList.remove("center");
                tooltip.classList.remove("right");
                //console.log(`slot ${slot} left`);
              }
            }
            else {
              tooltip.classList.add("center");
              tooltip.classList.remove("left");
              tooltip.classList.remove("right");
              //console.log(`slot ${slot} center`);
            }
          }
        }
      }
    });
  }

  private _updateZoom() {
    let center = SEC_PER_DAY / 2;
    if (this.activeSlot !== null) {
      const activeSlot = this.slots[this.activeSlot];
      let min = stringToTime(activeSlot.start);
      let max = (stringToTime(activeSlot.stop!) || SEC_PER_DAY);
      center = Math.round((max + min) / 2);
    }

    let timeSpan = SEC_PER_DAY;
    if (this.zoomFactor == 2) timeSpan = SEC_PER_DAY / 2;
    else if (this.zoomFactor == 3) timeSpan = SEC_PER_DAY / 4;
    else if (this.zoomFactor == 4) timeSpan = SEC_PER_DAY / 8;

    let min = center - Math.round(timeSpan / 2);
    let max = center + Math.round(timeSpan / 2);

    if (min < 0) {
      max += -min;
      min = 0;
      if (max > SEC_PER_DAY) max = SEC_PER_DAY;
    }
    else if (max > SEC_PER_DAY) {
      min -= (max - SEC_PER_DAY);
      max = SEC_PER_DAY;
      if (min < 0) min = 0;
    }

    this.rangeMin = min;
    this.rangeMax = max;
    clearInterval(this.timer);
    clearTimeout(this.timeout);

    this.timer = window.setInterval(() => {
      this._updateTooltips();
    }, 50);

    this.timeout = window.setTimeout(() => {
      clearInterval(this.timer);
      this._updateTooltips();
    }, 230);
  }

  private _zoomIn() {
    this.zoomFactor++;
    this._updateZoom();
  }

  private _zoomOut() {
    this.zoomFactor--;
    this._updateZoom();

  }

  private _selectMarker(ev: Event, enable = true) {
    let el = ev.target as HTMLElement;
    while (!el.classList.contains("slot")) el = el.parentElement as HTMLElement;
    const slot = Number(el.getAttribute("slot"));
    if (enable && this.activeMarker === slot) return;
    this.activeMarker = enable ? slot : null;
  }


  static get styles(): CSSResult {
    return css`
        :host {
            display: block;
            max-width: 100%;
            overflow: hidden;
        }
        div.outer {
            width: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
            border-radius: 5px;
        }
        div.wrapper, div.time-wrapper {
            white-space: nowrap;
            transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67), margin 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        .slot {
            float: left;
            background: rgba(var(--rgb-primary-color), 0.7);
            height: 60px;
            cursor: pointer;
            box-sizing: border-box;
            transition: background 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        .wrapper.selectable .slot:hover {
            background: rgba(var(--rgb-primary-color), 0.85);
        }
        .slot:not(:first-child) {
            border-left: 1px solid var(--card-background-color);
        }
        .slot:not(:last-child) {
            border-right: 1px solid var(--card-background-color);
        }
        .slot.active {
            background: rgba(var(--rgb-accent-color), 0.7);
        }
        .slot.noborder {
          border: none;
        }
        .wrapper.selectable .slot.active:hover {
            background: rgba(var(--rgb-accent-color), 0.85);
        }
        div.time-wrapper div {
            float: left;
            height: 15px;
            font-size: 12px;
        }
        div.time-wrapper div:not(:first-child) {
            margin-left: -2px;
            margin-right: 2px;
        }
        .slot span {
            font-size: 14px;
            color: var(--text-primary-color);
            height: 100%;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            transition: margin 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            word-break: break-all;
            white-space: normal;
            overflow: hidden;
            line-height: 1em;
        }
        div.handle {
          display: flex;
          height: 100%;
          width: 36px;
          margin-left: -19px;
          margin-bottom: -60px;
          align-content: center;
          align-items: center;
          justify-content: center;
        }
        div.button-holder {
          background: var(--card-background-color);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          visibility: hidden;
          animation: 0.2s fadeIn;
          animation-fill-mode: forwards;
        }
        ha-icon-button {
            --mdc-icon-button-size: 36px;
            margin-top: -6px;
            margin-left: -6px;
        }
        @keyframes fadeIn {
          99% {
            visibility: hidden;
          }
          100% {
            visibility: visible;
          }
        }
        div.tooltip {
          background: var(--primary-color);
          border-radius: 5px;
          color: var(--text-primary-color);
          font-size: 1em;
          position: absolute;
          height: 26px;
          width: 50px;
          margin-top: -28px;
          margin-left: -25px;
          text-align: center;
          line-height: 26px;
          display: none;
          z-index: 1;
          transition: all 0.1s ease-in;
          transform-origin: center bottom;
        }
        div.tooltip.active {
          background: var(--accent-color);
        }
        div.tooltip.visible {
          display: block;
        }
        div.tooltip.center:before {
          content: ' ';
          width: 0px;
          height: 0px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 10px solid var(--primary-color);
          position: absolute;
          margin-top: 25px;
          margin-left: 19px;
          top: 0px;
          left: 0px;
          z-index: -1;
        }
        div.tooltip.left {
          margin-left: -49px;
          transform-origin: right bottom;
        }
        div.tooltip.right {
          margin-left: 1px;
          transform-origin: left bottom;
        }
        div.tooltip.hidden {
          display: none;
        }
        div.tooltip.left:before {
          content: ' ';
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent; 
          border-right: 8px solid var(--primary-color);
          opacity: 1;
          position: absolute;
          margin-top: 15px;
          margin-left: 42px;
          left: 0px;
          top: 0px;
          width: 0px;
          height: 0px;
          z-index: -1;
        }
        div.tooltip.right:before {
          content: ' ';
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent; 
          border-left: 8px solid var(--primary-color); 
          opacity: 1;
          position: absolute;
          margin-top: 15px;
          margin-left: 0px;
          left: 0px;
          top: 0px;
          width: 0px;
          height: 0px;
          z-index: -1;
        }
      `;
  }
}
