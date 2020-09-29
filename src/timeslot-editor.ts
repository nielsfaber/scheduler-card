import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { localize } from './localize/localize';

import { IEntry, IActionElement, EVariableType, ILevelVariable, ILevelVariableConfig, IListVariable, IListVariableConfig } from './types'
import { formatTime, parseTimestamp, roundTime, MinutesPerDay } from './date-time';
import { PrettyPrintActionVariable, pick } from './helpers';

function Duration(el: IEntry) {
  return el.endTime!.value - el.time.value;
}

@customElement('timeslot-editor')
export class TimeslotEditor extends LitElement {

  @property({ type: Array })
  entries: IEntry[] = []
  shadowRoot: any;

  @property({ type: Array })
  actions: IActionElement[] = [];

  @property({ type: Number })
  stepSize: number = 15;

  @property({ type: Number })
  _activeEntry: number | null = null;

  @property({ type: String })
  temperatureUnit: string = "";

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
        ${this._activeEntry !== null && this.entries.length < 10 ? html`
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
        ${this._activeEntry !== null && this.entries.length > 3 ? html`
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
    this.entries.forEach((el, i) => {
      output.push(html`
        <div class="slider-slot${this._activeEntry == i ? ' active' : ''}" @click="${this._handleSegmentClick}" index="${i}" style="width: ${Duration(el) / MinutesPerDay * 100}%">
          ${this.getEntryAction(el)}
        </div>
      `);
      if (i < this.entries.length - 1) {
        let ts = this.entries[i].endTime!.value;
        output.push(html`
        <div class="slider-thumb">
          <ha-icon icon="hass:unfold-more-vertical"  @mousedown="${this._handleTouchStart}" @touchstart="${this._handleTouchStart}"></ha-icon>
          <div class="slider-thumb-tooltip" value="time" @update="${this._updateMarker}">
            ${formatTime(ts).time}
          </div>
        </div>`);
      }
    });
    return output;
  }

  getEntryAction(entry: IEntry) {
    if (!entry.action) return '';
    let action = this.actions.find(e => { return e.id == entry.action })!;
    if (entry.variable && entry.variable.type == EVariableType.Level) {
      let variable = entry.variable as ILevelVariable;
      let cfg = action.variable as ILevelVariableConfig;
      if (variable.enabled) return PrettyPrintActionVariable(variable, cfg, { temperature_unit: this.temperatureUnit })
    }
    else if (entry.variable && entry.variable.type == EVariableType.List) {
      let variable = entry.variable as IListVariable;
      let cfg = action.variable as IListVariableConfig;
      return PrettyPrintActionVariable(variable, cfg, { temperature_unit: this.temperatureUnit })
    }
    if (entry.action == 'turn_on') return 'on';
    else if (entry.action == 'turn_off') return 'off';
    return `${entry.action}`;
  }

  private _handleSegmentClick(e: Event) {
    let el = e.target as HTMLElement;
    let entry_id = Number(el.getAttribute("index"));
    this._activeEntry = (this._activeEntry == entry_id) ? null : entry_id;

    let myEvent = new CustomEvent("update", { detail: { entry: this._activeEntry } });
    this.dispatchEvent(myEvent);
  }

  private _handleTouchStart(e: MouseEvent | TouchEvent) {
    let thumbHandle: HTMLElement | null;
    thumbHandle = e.target as HTMLElement;
    if (!thumbHandle) return;

    let thumbElement = thumbHandle.parentNode as HTMLElement;

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
    var mouseMoveHandler = (e: MouseEvent | TouchEvent) => {
      let startDragX;
      if (e instanceof TouchEvent) startDragX = e.changedTouches[0].pageX;
      else startDragX = e.pageX;

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
      window.removeEventListener('touchend', mouseUpHandler);
      mouseMoveHandler = () => { };

      let newStop = parseTimestamp(toolTip.innerText);
      let totalDuration = Duration(this.entries[slotIndex]) + Duration(this.entries[slotIndex + 1]);
      let startTime = this.entries[slotIndex].time.value;

      let entries = [... this.entries];
      Object.assign(entries[slotIndex], <IEntry>{ endTime: { value: newStop } })
      Object.assign(entries[slotIndex + 1], <IEntry>{ time: { value: newStop }, endTime: { value: startTime + totalDuration } });

      let myEvent = new CustomEvent("update", { detail: { entries: entries } });
      this.dispatchEvent(myEvent);
    }

    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', mouseUpHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', mouseMoveHandler);
  }

  private _updateMarker(e: CustomEvent) {
    let detail = e.detail;
    let time = Number(detail.time);
    if (time == MinutesPerDay) time -= 1;
    let target = e.target as HTMLElement;
    target.innerText = formatTime(time).time;
  }

  private _addSlot() {
    let activeSlot = this.entries[this._activeEntry!];
    let startTime = activeSlot.time.value;
    let endTime = activeSlot.endTime!.value;
    let newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);

    let newEntry = Object.assign(<IEntry>{
      time: { value: newStop },
      endTime: { value: endTime },
      action: ''
    }, pick(activeSlot, ['entity', 'days']));
    let entries = [... this.entries];
    Object.assign(entries[this._activeEntry!], <IEntry>{ endTime: { value: newStop } });
    entries.splice(this._activeEntry! + 1, 0, newEntry);
    let myEvent = new CustomEvent("update", { detail: { entries: entries } });
    this.dispatchEvent(myEvent);
  }

  private _removeSlot() {
    let cutIndex = (this._activeEntry == this.entries.length - 1) ? this._activeEntry - 1 : this._activeEntry;
    let mergedEntry = { ... this.entries[cutIndex!] };
    Object.assign(mergedEntry, { endTime: this.entries[cutIndex! + 1].endTime });

    let entries = [... this.entries];
    entries.splice(cutIndex!, 2, mergedEntry);
    if (this._activeEntry == this.entries.length) this._activeEntry--;
    let myEvent = new CustomEvent("update", { detail: { entries: entries } });
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
