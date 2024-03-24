import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, eventOptions } from 'lit/decorators';
import { mdiUnfoldMoreVertical } from '@mdi/js';
import { HomeAssistant } from 'custom-card-helpers';

import { Timeslot, Action, EVariableType, LevelVariable, ListVariable } from '../types';
import { stringToTime, timeToString, roundTime, parseRelativeTime } from '../data/date-time/time';
import { compareActions } from '../data/actions/compare_actions';
import { levelVariableDisplay } from '../data/variables/level_variable';
import { unique, PrettyPrintName, getLocale } from '../helpers';
import { localize } from '../localize/localize';
import { stringToDate } from '../data/date-time/string_to_date';
import { formatAmPm, formatTime, TimeFormat } from '../data/date-time/format_time';
import { absToRelTime } from '../data/date-time/relative_time';

const SEC_PER_DAY = 86400;
const SEC_PER_HOUR = 3600;

@customElement('timeslot-editor')
export class TimeslotEditor extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property({ type: Array })
  slots: Timeslot[] = [];

  @property({ type: Array })
  actions: Action[] = [];

  @property({ type: Number })
  stepSize = 10;

  isDragging = false;

  currentTime = 0;

  @property()
  rangeMin = 0; //lower bound of zoomed timeframe

  @property()
  rangeMax: number = SEC_PER_DAY; //upper bound of zoomed timeframe

  @property()
  activeSlot: number | null = null;

  @property()
  activeMarker: number | null = null;

  previousSlot: number | null = null;
  timer = 0;
  timeout = 0;

  zoomFactor = 1;

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
    window.addEventListener('resize', this.handleResize);
  }

  public disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.timer);
    clearTimeout(this.timeout);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  render() {
    if (!this.hass) return html``;

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;

    return html`
      <div class="outer">
        <div
          class="wrapper ${this.isDragging ? '' : 'selectable'}"
          style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px"
        >
          ${this.renderSlots()}
        </div>
      </div>
      <div class="outer">
        <div class="time-wrapper" style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px">
          ${this.renderTimes()}
        </div>
      </div>
      <mwc-button @click=${this._addSlot} ?disabled=${this.activeSlot === null || this.slots.length >= 24}>
        <ha-icon icon="mdi:plus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
      </mwc-button>
      <mwc-button @click=${this._removeSlot} ?disabled=${this.activeSlot === null || this.slots.length <= 2}>
        <ha-icon icon="mdi:minus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize('ui.common.delete')}
      </mwc-button>
    `;
  }

  renderSlots() {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
    let start = left;

    return this.slots.map((e, i) => {
      const w = ((stringToTime(e.stop!, this.hass!) || SEC_PER_DAY) - stringToTime(e.start, this.hass!)) / SEC_PER_DAY;
      const actionText = this.computeActionDisplay(e) || '';
      const textWidth = (actionText || '').length * 5 + 10;

      const leftMargin = start < 0 && start + w * width > 0 ? -start + 5 : 15;
      const rightMargin = start + w * width > fullWidth && start < fullWidth ? w * width - (fullWidth - start) + 5 : 15;
      const availableWidth = w * width - leftMargin - rightMargin;
      start += w * width;

      const content = (() => {
        if (actionText && (availableWidth > textWidth / 3 || availableWidth > 50) && availableWidth > 30) {
          return html`
            <span style="margin-left: ${leftMargin.toFixed(2)}px; margin-right: ${rightMargin.toFixed(2)}px">
              ${actionText}
            </span>
          `;
        }

        const icons = this.computeActionIcons(e);
        if (!!icons) {
          return html`
            <span style="margin-left: auto; margin-right: auto">
              ${icons.map(
                icon =>
                  html`
                    <ha-icon icon="${icon}"></ha-icon>
                  `
              )}
            </span>
          `;
        }

        return '';
      })();

      return html`
        <div
          class="slot${this.activeSlot == i && this.activeMarker === null ? ' active' : ''} ${w * width < 2
            ? 'noborder'
            : ''}"
          style="width: ${Math.floor(w * 10000) / 100}%"
          @click=${this._selectSlot}
          slot="${i}"
        >
          ${i > 0 && (this.activeSlot === i || this.activeSlot === i - 1)
            ? html`
                <div class="handle">
                  <div class="button-holder">
                    <ha-icon-button
                      .path=${mdiUnfoldMoreVertical}
                      @mousedown=${this._handleTouchStart}
                      @touchstart=${this._handleTouchStart}
                    >
                    </ha-icon-button>
                  </div>
                </div>
              `
            : ''}
          ${i > 0 ? this.renderTooltip(i) : ''} ${content}
        </div>
      `;
    });
  }

  renderTooltip(i: number) {
    const res = parseRelativeTime(this.slots[i].start);

    return html`
      <div class="tooltip-container center">
        <div class="tooltip ${this.activeMarker == i ? 'active' : ''}" @click=${this._selectMarker}>
          ${res
            ? html`
                <ha-icon icon="mdi:${res.event == 'sunrise' ? 'weather-sunny' : 'weather-night'}"></ha-icon>
                ${res.sign} ${formatTime(stringToDate(res.offset), getLocale(this.hass!), TimeFormat.twenty_four)}
              `
            : formatTime(stringToDate(this.slots[i].start), getLocale(this.hass!))}
        </div>
      </div>
    `;
  }

  renderTimes() {
    this._updateTooltips();

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));

    const allowedStepSizes = [1, 2, 3, 4, 6, 8, 12];

    const segmentWidth = formatAmPm(getLocale(this.hass!)) ? 55 : 40;
    let stepSize = Math.ceil(24 / (fullWidth / segmentWidth));
    while (!allowedStepSizes.includes(stepSize)) stepSize++;

    const nums = [0, ...Array.from(Array(24 / stepSize - 1).keys()).map(e => (e + 1) * stepSize), 24];

    return nums.map(e => {
      const isSpacer = e == 0 || e == 24;
      const w = isSpacer ? (stepSize / 48) * 100 : (stepSize / 24) * 100;
      return html`
        <div style="width: ${Math.floor(w * 100) / 100}%" class="${isSpacer ? '' : 'time'}">
          ${!isSpacer ? formatTime(stringToDate(timeToString(e * SEC_PER_HOUR)), getLocale(this.hass!)) : ''}
        </div>
      `;
    });
  }

  computeActionDisplay(entry: Timeslot) {
    if (!this.hass) return;
    if (!entry.actions) return '';

    return unique(
      entry.actions.map(action => {
        const actionConfig = this.actions.find(e => compareActions(e, action, true));
        if (!actionConfig) return '???';

        if (
          actionConfig.variables &&
          Object.keys(actionConfig.variables).some(field => action.service_data && field in action.service_data)
        ) {
          return Object.entries(actionConfig.variables)
            .filter(([field]) => action.service_data && field in action.service_data)
            .map(([field, variable]) => {
              const value = action.service_data![field];
              if (variable.type == EVariableType.Level) {
                variable = variable as LevelVariable;
                return levelVariableDisplay(Number(value), variable);
              } else if (variable.type == EVariableType.List) {
                variable = variable as ListVariable;
                const listItem = variable.options.find(e => e.value == value);
                return PrettyPrintName(listItem && listItem.name ? listItem.name : String(value));
              } else return '';
            })
            .join(', ');
        }
        return PrettyPrintName(
          actionConfig.name || localize(`services.${action.service}`, getLocale(this.hass!)) || action.service
        );
      })
    ).join(', ');
  }

  computeActionIcons(entry: Timeslot) {
    if (!this.hass) return;
    if (!entry.actions) return;

    return unique(
      entry.actions
        .map(action => {
          const actionConfig = this.actions.find(e => compareActions(e, action, true));
          if (!actionConfig) return [];

          if (
            actionConfig.variables &&
            Object.keys(actionConfig.variables).some(field => action.service_data && field in action.service_data)
          ) {
            return Object.entries(actionConfig.variables)
              .filter(([field]) => action.service_data && field in action.service_data)
              .map(([field, variable]) => {
                const value = action.service_data![field];
                if (variable.type == EVariableType.List) {
                  variable = variable as ListVariable;
                  const listItem = variable.options.find(e => e.value == value);
                  return listItem?.icon;
                } else return undefined;
              });
          }
          return [actionConfig.icon];
        })
        .reduce((prev, icons) => [...prev, ...icons], [])
        .filter(icon => !!icon)
    );
  }

  @eventOptions({ passive: true })
  private _handleTouchStart(ev: MouseEvent | TouchEvent) {
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
    const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
    const Toffset = (-left / width) * SEC_PER_DAY;

    const marker = ev.target as HTMLElement;
    let el = marker;
    while (!el.classList.contains('slot')) el = el.parentElement as HTMLElement;

    const rightSlot = el;
    const leftSlot = rightSlot.previousElementSibling as HTMLElement;

    const i = Number(leftSlot.getAttribute('slot'));

    const Tmin = i > 0 ? stringToTime(this.slots[i].start, this.hass!) + 60 * this.stepSize : 0;

    const Tmax =
      i < this.slots.length - 2
        ? (stringToTime(this.slots[i + 1].stop!, this.hass!) || SEC_PER_DAY) - 60 * this.stepSize
        : SEC_PER_DAY;

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
      if (x > fullWidth - 10) x = fullWidth - 10;
      if (x < 10) x = 10;
      let time = Math.round((x / width) * SEC_PER_DAY + Toffset);

      if (time < Tmin) time = Tmin;
      if (time > Tmax) time = Tmax;

      this.currentTime = time;

      const relTime = parseRelativeTime(this.slots[i].stop!);
      let timeString;
      if (relTime)
        timeString = absToRelTime(timeToString(time), relTime.event, this.hass!, {
          stepSize: this.stepSize,
        });
      else {
        time = Math.round(time) >= SEC_PER_DAY ? SEC_PER_DAY : roundTime(time, this.stepSize);
        timeString = timeToString(time);
      }

      if (timeString == this.slots[i].stop) return;

      this.slots = Object.assign(this.slots, {
        [i]: {
          ...this.slots[i],
          stop: timeString,
        },
        [i + 1]: {
          ...this.slots[i + 1],
          start: timeString,
        },
      });
      this.requestUpdate();
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchend', mouseUpHandler);
      window.removeEventListener('blur', mouseUpHandler);
      mouseMoveHandler = () => {
        /**/
      };
      setTimeout(() => {
        this.isDragging = false;
      }, 100);
      marker.blur();
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
    let el = ev.target as HTMLElement;
    if (el.tagName.toLowerCase() == 'ha-icon') el = el.parentElement as HTMLElement;
    if (el.tagName.toLowerCase() == 'span') el = el.parentElement as HTMLElement;
    if (el.classList.contains('handle')) el = el.parentElement as HTMLElement;
    const slot = Number(el.getAttribute('slot'));
    if (this.activeSlot == slot && this.activeMarker === null) {
      this.activeSlot = null;
      //this.rangeMin = 0;
      //this.rangeMax = SEC_PER_DAY;
      this.previousSlot = null;
    } else {
      this.previousSlot = this.activeSlot;
      this.activeSlot = slot;
      //this._calculateZoom();
    }
    this.activeMarker = null;
    this._updateZoom();
    const myEvent = new CustomEvent('update', { detail: { entry: this.activeSlot } });
    this.dispatchEvent(myEvent);
  }

  _calculateZoom() {
    const slot = Number(this.activeSlot);
    let min = stringToTime(this.slots[slot].start, this.hass!);
    let max = stringToTime(this.slots[slot].stop!, this.hass!) || SEC_PER_DAY;

    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));

    min -= (max - min) / 3;
    max += (max - min) / 3;

    if (((max - min) / SEC_PER_DAY) * fullWidth >= 100) {
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
    const startTime = stringToTime(activeSlot.start, this.hass!);
    let endTime = stringToTime(activeSlot.stop!, this.hass!);
    if (endTime < startTime) endTime += SEC_PER_DAY;
    const newStop = roundTime(startTime + (endTime - startTime) / 2, this.stepSize);

    this.slots = [
      ...this.slots.slice(0, this.activeSlot),
      { ...this.slots[this.activeSlot], stop: timeToString(newStop) },
      {
        ...this.slots[this.activeSlot],
        start: timeToString(newStop),
        stop: timeToString(endTime),
        actions: [],
      },
      ...this.slots.slice(this.activeSlot + 1),
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
      ...this.slots.slice(cutIndex + 2),
    ];

    if (this.activeSlot == this.slots.length) this.activeSlot--;
    this._updateZoom();
    const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
    this.dispatchEvent(myEvent);
  }

  private _updateTooltips() {
    const windowLeft = this.offsetLeft;
    const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    const tooltips = (this.shadowRoot?.querySelectorAll('.tooltip') as unknown) as HTMLElement[];

    const getBounds = (el: HTMLElement) => {
      const width = el.offsetWidth;
      const left = el.parentElement!.offsetLeft + el.offsetLeft - windowLeft;

      if (el.parentElement!.classList.contains('left')) return [left + width / 2, left + (3 * width) / 2];
      else if (el.parentElement!.classList.contains('right')) return [left - width / 2, left + width / 2];
      return [left, left + width];
    };

    tooltips?.forEach((tooltip, i) => {
      const container = tooltip.parentElement!;
      const visible = container.classList.contains('visible');
      const slot = Number(container.parentElement!.getAttribute('slot'));

      if (slot != this.activeSlot && slot - 1 != this.activeSlot) {
        if (visible) container.classList.remove('visible');
      } else {
        const left = tooltip.parentElement!.offsetLeft;
        if (left < 0 || left > fullWidth + 2 * windowLeft) {
          if (visible) container.classList.remove('visible');
        } else {
          if (!visible) container.classList.add('visible');
          const width = container.offsetWidth;
          const isCenter = container.classList.contains('center');
          let marginLeft = getBounds(tooltip)[0],
            marginRight = fullWidth - getBounds(tooltip)[1];

          if (i > 0 && slot - 1 == this.activeSlot) marginLeft -= getBounds(tooltips[i - 1])[1];
          else if (i + 1 < tooltips.length && slot == this.activeSlot) {
            const w = getBounds(tooltips[i + 1])[0];
            marginRight -= w < 0 ? 0 : fullWidth - w;
          }

          //console.log(`tooltip ${i} marginLeft ${marginLeft} marginRight ${marginRight}`);

          if (marginLeft < marginRight) {
            if (marginLeft < 0) {
              if (isCenter && marginRight > width / 2) {
                container.classList.add('right');
                container.classList.remove('center');
                container.classList.remove('left');
              }
            } else {
              container.classList.add('center');
              container.classList.remove('right');
              container.classList.remove('left');
            }
          } else {
            if (marginRight < 0) {
              if (isCenter && marginLeft > width / 2) {
                container.classList.add('left');
                container.classList.remove('center');
                container.classList.remove('right');
              }
            } else {
              container.classList.add('center');
              container.classList.remove('left');
              container.classList.remove('right');
            }
          }
        }
      }
    });
  }

  private _updateZoom() {
    // let center = SEC_PER_DAY / 2;
    // if (this.activeSlot !== null) {
    //   const activeSlot = this.slots[this.activeSlot];
    //   let min = stringToTime(activeSlot.start, this.hass!);
    //   let max = stringToTime(activeSlot.stop!, this.hass!) || SEC_PER_DAY;
    //   center = Math.round((max + min) / 2);
    // }

    // let timeSpan = SEC_PER_DAY;
    // if (this.zoomFactor == 2) timeSpan = SEC_PER_DAY / 2;
    // else if (this.zoomFactor == 3) timeSpan = SEC_PER_DAY / 4;
    // else if (this.zoomFactor == 4) timeSpan = SEC_PER_DAY / 8;

    // let min = center - Math.round(timeSpan / 2);
    // let max = center + Math.round(timeSpan / 2);

    // if (min < 0) {
    //   max += -min;
    //   min = 0;
    //   if (max > SEC_PER_DAY) max = SEC_PER_DAY;
    // } else if (max > SEC_PER_DAY) {
    //   min -= max - SEC_PER_DAY;
    //   max = SEC_PER_DAY;
    //   if (min < 0) min = 0;
    // }

    // this.rangeMin = min;
    // this.rangeMax = max;
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

  // private _zoomIn() {
  //   this.zoomFactor++;
  //   this._updateZoom();
  // }

  // private _zoomOut() {
  //   this.zoomFactor--;
  //   this._updateZoom();
  // }

  private _selectMarker(ev: Event, enable = true) {
    ev.stopImmediatePropagation();
    let el = ev.target as HTMLElement;
    while (!el.classList.contains('slot')) el = el.parentElement as HTMLElement;
    const slot = Number(el.getAttribute('slot'));
    if (enable && this.activeMarker === slot) this.activeMarker = null;
    else this.activeMarker = enable ? slot : null;
    const myEvent = new CustomEvent('update', {
      detail: { entry: this.activeSlot, marker: this.activeMarker },
    });
    this.dispatchEvent(myEvent);
    this._updateTooltips();
  }

  static get styles(): CSSResultGroup {
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
      div.wrapper,
      div.time-wrapper {
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
        display: flex;
        position: relative;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        align-content: center;
        align-items: center;
        justify-content: center;
      }
      div.time-wrapper div.time:before {
        content: ' ';
        background: var(--disabled-text-color);
        position: absolute;
        left: 0px;
        top: 0px;
        width: 1px;
        height: 5px;
        margin-left: 50%;
        margin-top: 0px;
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
      div.tooltip-container {
        position: absolute;
        margin-top: -28px;
        margin-left: -40px;
        width: 80px;
        height: 26px;
        display: flex;
        text-align: center;
        display: none;
      }
      div.tooltip-container.visible {
        display: block;
      }
      div.tooltip-container.left {
        margin-left: -80px;
        text-align: right;
      }
      div.tooltip-container.right {
        margin-left: 0px;
        text-align: left;
      }
      div.tooltip {
        display: inline-flex;
        margin: 0px auto;
        border-radius: 5px;
        color: var(--text-primary-color);
        font-size: 1em;
        padding: 0px 5px;
        text-align: center;
        line-height: 26px;
        z-index: 1;
        transition: all 0.1s ease-in;
        transform-origin: center bottom;
        --tooltip-color: var(--primary-color);
        background: var(--tooltip-color);
      }
      div.tooltip.active {
        --tooltip-color: rgba(var(--rgb-accent-color), 0.7);
      }
      div.tooltip-container.left div.tooltip {
        transform-origin: right bottom;
      }
      div.tooltip-container.right div.tooltip {
        transform-origin: left bottom;
      }
      div.tooltip-container.center div.tooltip:before {
        content: ' ';
        width: 0px;
        height: 0px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid var(--tooltip-color);
        position: absolute;
        margin-top: 25px;
        margin-left: calc(50% - 6px);
        top: 0px;
        left: 0px;
      }
      div.tooltip-container.left div.tooltip:before {
        content: ' ';
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 8px solid var(--tooltip-color);
        opacity: 1;
        position: absolute;
        margin-top: 15px;
        margin-left: calc(100% - 8px);
        left: 0px;
        top: 0px;
        width: 0px;
        height: 0px;
      }
      div.tooltip-container.right div.tooltip:before {
        content: ' ';
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 8px solid var(--tooltip-color);
        opacity: 1;
        position: absolute;
        margin-top: 15px;
        margin-left: 0px;
        left: 0px;
        top: 0px;
        width: 0px;
        height: 0px;
      }
      div.tooltip ha-icon {
        --mdc-icon-size: 20px;
      }
      mwc-button ha-icon {
        margin-right: 11px;
      }
    `;
  }
}
