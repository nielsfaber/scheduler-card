import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { localize } from './localize/localize';

import { ITimeSlot, IActionElement, EVariableType, ILevelVariable, ILevelVariableConfig, IListVariable, IListVariableConfig } from './types'
import { formatTime, parseTimestamp, roundTime, MinutesPerDay } from './date-time';
import { PrettyPrintActionVariable } from './helpers';

function Duration(el: ITimeSlot) {
  return el.endTime - el.startTime;
}

@customElement('timeslot-editor')
export class TimeslotEditor extends LitElement {

  @property({ type: Array })
  slots: ITimeSlot[] = []
  shadowRoot: any;

  @property({ type: Array })
  actions: IActionElement[] = [];

  @property({ type: Number })
  stepSize: number = 15;

  @property({ type: Number })
  _activeSlot: number | null = null;

  @property({ type: Number })
  _activeThumb: number | null = null;

  @property({ type: String })
  temperatureUnit: string = "";

  updated() {
  }

  firstUpdated() {
  }

  render() {
    return html`
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          <div class="slider-legend-item empty"></div>
          <div class="slider-legend-item">03:00</div>
          <div class="slider-legend-item">06:00</div>
          <div class="slider-legend-item">09:00</div>
          <div class="slider-legend-item">12:00</div>
          <div class="slider-legend-item">15:00</div>
          <div class="slider-legend-item">18:00</div>
          <div class="slider-legend-item">21:00</div>
          <div class="slider-legend-item empty"></div>
        </div>
      </div>
      <div>
        ${this._activeSlot !== null && this.slots.length < 10 ? html`
        <mwc-button @click="${this._addSlot}">
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          Add
        </mwc-button>
        ` : html`
        <mwc-button disabled>
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          Add
        </mwc-button>
        `}
        ${this._activeSlot !== null && this.slots.length > 3 ? html`
        <mwc-button @click="${this._removeSlot}">
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          Remove
        </mwc-button>
        ` : html`
        <mwc-button disabled>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          Remove
        </mwc-button>
        `}
      </div>
    `;
  }

  protected getSlots(): TemplateResult[] {
    let output: TemplateResult[] = [];
    this.slots.forEach((el, i) => {
      output.push(html`
        <div class="slider-slot${this._activeSlot == i ? ' active' : ''}" @click="${this._handleSegmentClick}" index="${i}" style="width: ${Duration(el) / MinutesPerDay * 100}%">
          ${this.getSlotAction(el)}
        </div>
      `);
      if (i < this.slots.length - 1) {
        output.push(html`
        <div class="slider-thumb${this._activeThumb == i ? ' active' : ''}" index="${i}">
          <ha-icon icon="hass:unfold-more-vertical"  @mousedown="${this._handleTouchStart}" @touchstart="${this._handleTouchStart}"></ha-icon>
          <div class="slider-thumb-tooltip" value="time" @update="${this._updateMarker}">
            ${formatTime(this.slots[i].endTime).time}
          </div>
        </div>`);
      }
    });
    return output;
  }

  getSlotAction(slot: ITimeSlot) {
    if (!slot.action) return '';
    let action = this.actions.find(e => { return e.id == slot.action })!;
    if (slot.variable && slot.variable.type == EVariableType.Level) {
      let variable = slot.variable as ILevelVariable;
      let cfg = action.variable as ILevelVariableConfig;
      if (variable.enabled) return PrettyPrintActionVariable(variable, cfg, { temperature_unit: this.temperatureUnit })
    }
    else if (slot.variable && slot.variable.type == EVariableType.List) {
      let variable = slot.variable as IListVariable;
      let cfg = action.variable as IListVariableConfig;
      return PrettyPrintActionVariable(variable, cfg, { temperature_unit: this.temperatureUnit })
    }
    if (slot.action == 'turn_on') return 'on';
    else if (slot.action == 'turn_off') return 'off';
    return `${slot.action}`;
  }

  private _handleSegmentClick(e: Event) {
    let el = e.target as HTMLElement;
    let slot_id = Number(el.getAttribute("index"));
    this._activeSlot = (this._activeSlot == slot_id) ? null : slot_id;

    let myEvent = new CustomEvent("update", { detail: { slot: this._activeSlot } });
    this.dispatchEvent(myEvent);
  }

  private _handleTouchStart(e: MouseEvent | TouchEvent) {
    let thumbHandle: HTMLElement | null;
    thumbHandle = e.target as HTMLElement;
    if (!thumbHandle) return;

    let thumbElement = thumbHandle.parentNode as HTMLElement;
    let thumb_id = Number(thumbElement.getAttribute("index"));
    this._activeThumb = thumb_id;

    let trackElement = thumbElement.parentElement as HTMLElement;
    let trackCoords = trackElement.getBoundingClientRect();
    let firstSlot: HTMLElement = thumbElement.previousElementSibling as HTMLElement;
    let secondSlot: HTMLElement = thumbElement.nextElementSibling as HTMLElement;

    let toolTip = thumbElement.querySelector(".slider-thumb-tooltip") as HTMLElement;
    const availableWidth = firstSlot.offsetWidth + secondSlot.offsetWidth;
    const trackWidth = trackCoords.width;

    let slots = Array.from(trackElement.querySelectorAll(".slider-slot")) as HTMLElement[];
    let slotWidths = slots.map(e => e.offsetWidth);

    let xStart = 0;
    let slotIndex = -1;
    slots.forEach((e, i) => {
      if (e == firstSlot) {
        slotIndex = i;
      } else if (slotIndex == -1) {
        xStart = xStart + slotWidths[i];
      }
    });
    let mouseMoveHandler = (e: MouseEvent | TouchEvent) => {
      let startDragX;
      if (e instanceof TouchEvent) {
        startDragX = e.changedTouches[0].pageX;
      }
      else {
        startDragX = e.pageX;
      }

      let x = startDragX - trackCoords.left;

      if (x < 0) x = 0;
      else if (x > trackCoords.width) x = trackCoords.width;
      if (x > (availableWidth + xStart)) x = availableWidth + xStart;
      if (x < xStart) x = xStart;

      firstSlot.style.width = `${Math.round(x - xStart)}px`;
      secondSlot.style.width = `${Math.round(availableWidth - (x - xStart))}px`;

      let time = x / trackWidth * MinutesPerDay;
      time = time >= MinutesPerDay ? time = MinutesPerDay : roundTime(time, this.stepSize);

      toolTip.dispatchEvent(new CustomEvent('update', { detail: { time: time } }));
    }

    var mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.addEventListener('touchend', mouseUpHandler);

      let newStop = parseTimestamp(toolTip.innerText);
      let totalDuration = Duration(this.slots[slotIndex]) + Duration(this.slots[slotIndex + 1]);
      let startTime = this.slots[slotIndex].startTime;

      let slots = [... this.slots];
      Object.assign(slots[slotIndex], { endTime: newStop })
      Object.assign(slots[slotIndex + 1], { startTime: newStop, endTime: startTime + totalDuration });

      let myEvent = new CustomEvent("update", { detail: { slots: slots } });
      this.dispatchEvent(myEvent);

      mouseMoveHandler = () => { };
      this._activeThumb = null;
    }

    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', mouseUpHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', mouseMoveHandler);
  }

  private _updateMarker(e: CustomEvent) {
    let detail = e.detail;
    let time = 0;

    if (detail.hasOwnProperty('time')) {
      time = Number(detail.time);
    }
    else if (detail.hasOwnProperty('index')) {
      let index = detail.index;
      time = this.slots[index].endTime;
    }
    let target = e.target as HTMLElement;

    if (time == MinutesPerDay) time -= 1;
    target.innerText = formatTime(time).time;
  }

  private _addSlot() {
    let activeSlot = this.slots[this._activeSlot!];
    let startTime = activeSlot.startTime;
    let endTime = activeSlot.endTime;
    let newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);

    let slots = [... this.slots];
    Object.assign(slots[this._activeSlot!], { endTime: newStop });
    slots.splice(this._activeSlot! + 1, 0, {
      startTime: newStop,
      endTime: endTime
    });

    let myEvent = new CustomEvent("update", { detail: { slots: slots } });
    this.dispatchEvent(myEvent);
  }

  private _removeSlot() {
    let cutIndex = (this._activeSlot == this.slots.length - 1) ? this._activeSlot - 1 : this._activeSlot;
    let mergedSlot = { ... this.slots[cutIndex!] };
    Object.assign(mergedSlot, { endTime: this.slots[cutIndex! + 1].endTime });

    let slots = [... this.slots];
    slots.splice(cutIndex!, 2, mergedSlot);
    let myEvent = new CustomEvent("update", { detail: { slots: slots } });
    this.dispatchEvent(myEvent);
  }

  static styles = css`

      div.slider-track {
        height: 45px;
        width: 100%;
        display: flex;
      }
      
      div.slider-slot {
        height: calc(100%);
        width: 50%;
        display: flex;
        background: var(--primary-color);
        opacity: 0.85;
        z-index: 1;
        cursor: pointer;
        color: var(--text-primary-color);
        justify-content: center;
        align-items: center;
      }
      div.slider-slot.active {
        opacity: 0.85;
        background: var(--accent-color);
      }
      div.slider-slot:hover, div.slider-slot.active:hover {
        opacity: 1;
      }
      
      div.slider-track div.slider-slot:first-of-type {
        border-radius: 4px 0px 0px 4px;
      }
      div.slider-track div.slider-slot:last-of-type {
        border-radius: 0px 4px 4px 0px;
      }
      div.slider-thumb {
        height: 100%;
        width: 2px;
        background: var(--card-background-color);
        display: flex;
        cursor: pointer;
        z-index: 5;
        margin: 0px -1px;
      }
      div.slider-thumb ha-icon {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        width: 26px;
        height: 26px;
        --mdc-icon-size: 26px;
        border-radius: 100%;
        margin-left: -12px;
        margin-top: 10px;
      }

      div.slider-legend {
        display: flex;
        width: 100%;
      }
      div.slider-legend-item {
        width: calc(100% / 8);
        font-size: 0.8em;
        display: flex;
        justify-content: center;
      }
      div.slider-legend-item.empty {
        width: calc(100% / 16);
        display: flex;
      }
      div.slider-thumb-tooltip {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border-radius: 5px;
        font-size: 0.8em;
        position: absolute;
        height: 20px;
        width: 50px;
        margin-top: -21px;
        margin-left: -25px;
        text-align: center;
        line-height: 20px;
      }

      .padded-right {
        margin-right: 11px;
      }
      
      mwc-button {
        margin: 2px 0px;
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }
  `;
}
