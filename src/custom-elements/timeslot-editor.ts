import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { localize, ServiceNameTranslations } from '../localize/localize';

import { IEntry, IActionElement, EVariableType, ILevelVariable, ILevelVariableConfig, IListVariable, IListVariableConfig } from '../types'
import { formatTime, parseTimestamp, roundTime, MinutesPerDay } from '../date-time';
import { PrettyPrintActionVariable, pick, PrettyPrintName } from '../helpers';

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
  stepSize: number = 10;

  @property({ type: Number })
  _activeEntry: number | null = null;

  @property({ type: String })
  temperatureUnit: string = "";

  @property({ type: Number })
  _activeThumb: number | null = null;

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
        <div class="slider-slot${this._activeEntry == i ? ' active' : ''}${el.action ? ' filled' : ''}" @click="${this._handleSegmentClick}" index="${i}" style="width: ${Duration(el) / MinutesPerDay * 100}%">
          ${this.getEntryAction(el)}
        </div>
      `);
      if (i < this.entries.length - 1) {
        let ts = this.entries[i].endTime!.value;
        output.push(html`
        <div class="slider-thumb${this._activeThumb == i ? ' active' : ''}" index=${i}>
          <ha-icon icon="hass:unfold-more-vertical"  @mousedown="${this._handleTouchStart}" @touchstart="${this._handleTouchStart}"></ha-icon>
          <div class="slider-thumb-tooltip" value="time" @update="${this._updateMarker}">
            ${formatTime(ts).time}
          </div>
        </div>`);
      }
    });
    return output;
  }


  updated() {
    this.shadowRoot.querySelectorAll(".slider-thumb-tooltip").forEach((el, i) => {
      let ts = this.entries[i].endTime!.value;
      el.innerText = formatTime(ts).time;
    });
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
    if (action.service == 'turn_on') return PrettyPrintName('on');
    else if (action.service == 'turn_off') return PrettyPrintName('off');
    else if (action.name in ServiceNameTranslations) return localize(ServiceNameTranslations[action.name]);
    return PrettyPrintName(action.name);
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

    let thumbElement = thumbHandle!.parentNode as HTMLElement;

    let trackElement = thumbElement.parentElement as HTMLElement;
    let trackCoords = trackElement.getBoundingClientRect();
    let firstSlot: HTMLElement = thumbElement.previousElementSibling as HTMLElement;
    let secondSlot: HTMLElement = thumbElement.nextElementSibling as HTMLElement;

    let toolTip = thumbElement.querySelector(".slider-thumb-tooltip") as HTMLElement;
    this._activeThumb = Number(thumbElement.getAttribute("index"));

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

      if (typeof TouchEvent !== 'undefined') {
        if (e instanceof TouchEvent) startDragX = e.changedTouches[0].pageX;
        else startDragX = e.pageX;
      } else startDragX = (e as MouseEvent).pageX;

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

      this._activeThumb = null;

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
        height: 50px;
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
        background: none;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }

      div.slider-slot:before  {
        content: " ";
        background: var(--primary-color);
        opacity: 0.3;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
       }

      div.slider-slot:hover:before  {
        opacity: 0.6;
       }


      div.slider-slot.filled:before  {
        opacity: 0.8;
       }

      div.slider-slot.filled:hover:before  {
        opacity: 1;
       }

      div.slider-slot.active:before {
        opacity: 0.85;
        background: var(--accent-color);
      }
      // div.slider-slot:hover, div.slider-slot.active:hover {
      //   opacity: 1;
      // }
      
      div.slider-track div.slider-slot:first-of-type:before {
        border-radius: 4px 0px 0px 4px;
      }
      div.slider-track div.slider-slot:last-of-type:before {
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
      div.slider-thumb.active {
        z-index: 100;
      }
      div.slider-thumb ha-icon {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        width: 28px;
        height: 28px;
        --mdc-icon-size: 28px;
        border-radius: 100%;
        margin-left: -13px;
        margin-top: 12px;
      }

      div.slider-legend {
        display: flex;
        width: 100%;
      }
      div.slider-legend-item {
        width: calc(100% / 8);
        font-size: 0.9em;
        line-height: 25px;
        display: flex;
        justify-content: center;
        position: relative;
      }

      div.slider-legend-item:before {
        content: " ";
        background: var(--disabled-text-color);
        position: absolute;
        left: 0px;
        top: 0px;
        width: 1px;
        height: 8px;
        margin-left: 50%;
        margin-top: -4px;
      }
      div.slider-legend-item.empty {
        width: calc(100% / 16);
        display: flex;
      }
      div.slider-legend-item.empty:before {
        display: none;
      }
      div.slider-thumb-tooltip {
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
        z-index: 1;
      }

      div.slider-thumb-tooltip:before {
        content: " ";
        background: var(--primary-color);
        transform: rotate(-45deg);
        transform-origin: center;
        opacity: 1;
        position: absolute;
        margin-top: 20px;
        margin-left: 21px;
        left: 0px;
        top: 0px;
        width: 10px;
        height: 10px;
        z-index: -1;
      
      }

      div.slider-thumb.active div.slider-thumb-tooltip {
        background: var(--accent-color);
        z-index: 10;
      }
      div.slider-thumb.active div.slider-thumb-tooltip:before {
        background: var(--accent-color);
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
