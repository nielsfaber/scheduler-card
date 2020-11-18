import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { localize } from '../localize/localize';
import { Entry, ActionElement, EVariableType, LevelVariable, LevelVariableConfig, ListVariableConfig } from '../types';
import { formatTime, parseTimestamp, roundTime, MinutesPerDay } from '../date-time';
import { pick, PrettyPrintName } from '../helpers';
import { HomeAssistant } from 'custom-card-helpers';
import { computeLevelVariableDisplay } from '../actionVariables';
import { formatAmPm } from '../data/date-time/format_time';

function Duration(el: Entry) {
  return el.endTime!.value - el.time.value;
}

@customElement('timeslot-editor')
export class TimeslotEditor extends LitElement {
  @property() hass?: HomeAssistant;
  @property({ type: Array })
  entries: Entry[] = [];
  shadowRoot: any;

  @property({ type: Array }) actions: ActionElement[] = [];
  @property({ type: Number }) stepSize = 10;
  @property({ type: Number }) _activeEntry: number | null = null;
  @property({ type: Number }) _activeThumb: number | null = null;
  @property({ type: Boolean }) formatAmPm = false;

  _currentTime: number | null = null;
  _activeEntryMem: number | null = null;

  firstUpdated() {
    this.formatAmPm = formatAmPm(this.hass!.language);
  }

  render() {
    if (!this.hass) return html``;
    return html`
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          ${this.formatAmPm
        ? html`
                <div class="slider-legend-item wide empty"></div>
                <div class="slider-legend-item wide">04:00 AM</div>
                <div class="slider-legend-item wide">08:00 AM</div>
                <div class="slider-legend-item wide">12:00 PM</div>
                <div class="slider-legend-item wide">04:00 PM</div>
                <div class="slider-legend-item wide">08:00 PM</div>
                <div class="slider-legend-item wide empty"></div>
              `
        : html`
                <div class="slider-legend-item empty"></div>
                <div class="slider-legend-item">03:00</div>
                <div class="slider-legend-item">06:00</div>
                <div class="slider-legend-item">09:00</div>
                <div class="slider-legend-item">12:00</div>
                <div class="slider-legend-item">15:00</div>
                <div class="slider-legend-item">18:00</div>
                <div class="slider-legend-item">21:00</div>
                <div class="slider-legend-item empty"></div>
              `}
        </div>
      </div>
      <div>
        <mwc-button @click=${this._addSlot} ?disabled=${this._activeEntry === null || this.entries.length >= 24}>
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
        </mwc-button>
        <mwc-button @click=${this._removeSlot} ?disabled=${this._activeEntry === null || this.entries.length <= 3}>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize('ui.common.delete')}
        </mwc-button>
      </div>
    `;
  }

  protected getSlots(): TemplateResult[] {
    const output: TemplateResult[] = [];
    this.entries.forEach((el, i) => {
      output.push(html`
        <div
          class="slider-slot${this._activeEntry == i ? ' active' : ''}${el.action ? ' filled' : ''}"
          @click=${(ev: Event) => { this._handleSegmentClick(ev, i) }}
          style="width: ${(Duration(el) / MinutesPerDay) * 100}%"
        >
          <span class="content">${this.getEntryAction(el)}</div>
        </div>
      `);
      if (i < this.entries.length - 1) {
        const ts = this.entries[i].endTime!.value;
        output.push(html`
          <div
            class="slider-thumb${this._activeThumb == i ? ' active' : ''} ${this._activeEntry == i || this._activeEntry == (i + 1) ? '' : 'hidden'}"
            
          >
            <div
              class="slider-thumb-ripple"
                @mousedown="${(ev: MouseEvent | TouchEvent) => { this._handleTouchStart(ev, i) }}"
                @touchstart="${(ev: MouseEvent | TouchEvent) => { this._handleTouchStart(ev, i) }}"
            >
              <ha-icon
                icon="hass:unfold-more-vertical"
              >
              </ha-icon>
            </div>
            <div
              class="slider-thumb-tooltip ${this.formatAmPm ? 'wide' : ''} ${this._activeEntryMem == i && this._activeEntryMem != 0 ? 'right' : this._activeEntryMem == (i + 1) && (this._activeEntryMem + 1) != this.entries.length ? 'left' : 'center'}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${formatTime(ts, { amPm: this.formatAmPm }).time}
            </div>
          </div>
        `);
      }
    });
    return output;
  }

  updated() {
    this.shadowRoot.querySelectorAll('.slider-thumb-tooltip').forEach((el, i) => {
      const ts = this.entries[i].endTime!.value;
      el.innerText = formatTime(ts, { amPm: this.formatAmPm }).time;
    });
  }

  getEntryAction(entry: Entry) {
    if (!this.hass) return;
    if (!entry.action) return '';
    const action = this.actions.find(e => {
      return e.id == entry.action;
    })!;

    if (entry.variable && entry.variable.type == EVariableType.Level && action.variable) {
      if ((entry.variable as LevelVariable).enabled)
        return computeLevelVariableDisplay(Number(entry.variable.value), action.variable as LevelVariableConfig);
    } else if (entry.variable && entry.variable.type == EVariableType.List) {
      const config = action.variable as ListVariableConfig;
      const listItem = config.options.find(e => e.value == entry.variable!.value);
      return PrettyPrintName(listItem && listItem.name ? listItem.name : String(entry.variable.value));
    }
    const service = action.service;
    return PrettyPrintName(action.name || localize(`services.${service}`, this.hass.language) || service);
  }

  private _handleSegmentClick(e: Event, entry_id: number) {
    const el = e.target as HTMLElement;
    this._activeEntry = this._activeEntry == entry_id ? null : entry_id;
    this._activeEntryMem = entry_id;
    const myEvent = new CustomEvent('update', { detail: { entry: this._activeEntry } });
    this.dispatchEvent(myEvent);
  }

  private _handleTouchStart(e: MouseEvent | TouchEvent, thumb_index: number) {
    let thumbHandle = e.target as HTMLElement;
    if (!thumbHandle) return;
    if (thumbHandle.nodeName == 'HA-ICON') thumbHandle = thumbHandle.parentElement as HTMLElement;

    const thumbElement = thumbHandle!.parentNode as HTMLElement;

    const trackElement = thumbElement.parentElement as HTMLElement;
    const trackCoords = trackElement.getBoundingClientRect();
    const firstSlot: HTMLElement = thumbElement.previousElementSibling as HTMLElement;
    const secondSlot: HTMLElement = thumbElement.nextElementSibling as HTMLElement;

    const toolTip = thumbElement.querySelector('.slider-thumb-tooltip') as HTMLElement;
    this._activeThumb = thumb_index;

    const availableWidth = firstSlot.offsetWidth + secondSlot.offsetWidth;
    const trackWidth = trackCoords.width;

    const slots = Array.from(trackElement.querySelectorAll('.slider-slot')) as HTMLElement[];
    const slotWidths = slots.map(e => e.offsetWidth);

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

      if (typeof TouchEvent !== 'undefined') {
        if (e instanceof TouchEvent) startDragX = e.changedTouches[0].pageX;
        else startDragX = e.pageX;
      } else startDragX = (e as MouseEvent).pageX;

      let x = startDragX - trackCoords.left;
      if (x < 0) x = 0;
      else if (x > trackCoords.width) x = trackCoords.width;
      if (x > availableWidth + xStart) x = availableWidth + xStart;
      if (x < xStart) x = xStart;

      firstSlot.style.width = `${Math.round(x - xStart)}px`;
      secondSlot.style.width = `${Math.round(availableWidth - (x - xStart))}px`;

      let time = (x / trackWidth) * MinutesPerDay;
      time = Math.round(time) >= MinutesPerDay ? MinutesPerDay : roundTime(time, this.stepSize, false);
      if (time == MinutesPerDay) time -= 1;

      this._currentTime = time;
      toolTip.dispatchEvent(new CustomEvent('update'));
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchend', mouseUpHandler);
      mouseMoveHandler = () => {
        /**/
      };

      if (this._currentTime !== null) {
        const newStop = this._currentTime;
        const totalDuration = Duration(this.entries[slotIndex]) + Duration(this.entries[slotIndex + 1]);
        const startTime = this.entries[slotIndex].time.value;

        const entries = [...this.entries];
        Object.assign(entries[slotIndex], { endTime: { value: newStop } } as Entry);
        Object.assign(entries[slotIndex + 1], {
          time: { value: newStop },
          endTime: { value: startTime + totalDuration },
        } as Entry);

        const myEvent = new CustomEvent('update', { detail: { entries: entries } });
        this.dispatchEvent(myEvent);
      }
      this._currentTime = null;
      this._activeThumb = null;
    };

    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', mouseUpHandler);
    window.addEventListener('blur', mouseUpHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', mouseMoveHandler);
  }

  private _updateMarker(e: CustomEvent) {
    const detail = e.detail;
    const time = Number(this._currentTime);
    const target = e.target as HTMLElement;
    target.innerText = formatTime(time, { amPm: this.formatAmPm }).time;
  }

  private _addSlot() {
    const activeSlot = this.entries[this._activeEntry!];
    const startTime = activeSlot.time.value;
    const endTime = activeSlot.endTime!.value;
    const newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);

    const newEntry = Object.assign(
      {
        time: { value: newStop },
        endTime: { value: endTime },
        action: '',
      } as Entry,
      pick(activeSlot, ['entity', 'days'])
    );
    const entries = [...this.entries];
    Object.assign(entries[this._activeEntry!], { endTime: { value: newStop } } as Entry);
    entries.splice(this._activeEntry! + 1, 0, newEntry);
    const myEvent = new CustomEvent('update', { detail: { entries: entries } });
    this.dispatchEvent(myEvent);
  }

  private _removeSlot() {
    const cutIndex = this._activeEntry == this.entries.length - 1 ? this._activeEntry - 1 : this._activeEntry;
    const mergedEntry = { ...this.entries[cutIndex! + 1] };
    Object.assign(mergedEntry, { time: this.entries[cutIndex!].time, endTime: this.entries[cutIndex! + 1].endTime });

    const entries = [...this.entries];
    entries.splice(cutIndex!, 2, mergedEntry);
    if (this._activeEntry == this.entries.length) this._activeEntry--;
    const myEvent = new CustomEvent('update', { detail: { entries: entries } });
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
    div.slider-slot:before {
      content: ' ';
      background: var(--primary-color);
      opacity: 0.3;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    div.slider-slot:hover:before {
      opacity: 0.6;
    }
    div.slider-slot.filled:before {
      opacity: 0.8;
    }
    div.slider-slot.filled:hover:before {
      opacity: 1;
    }
    div.slider-slot.active:before {
      opacity: 0.85;
      background: var(--accent-color);
    }
    div.slider-track div.slider-slot:first-of-type:before {
      border-radius: 4px 0px 0px 4px;
    }
    div.slider-track div.slider-slot:last-of-type:before {
      border-radius: 0px 4px 4px 0px;
    }
    div.slider-slot .content {
      display: inline-block;
      margin: 0px 12px;
      word-break: break-all;
      overflow: hidden;
      line-height: 1em;
      max-height: 3em;
      text-overflow: ellipsis;
    }
    div.slider-track div.slider-slot:first-of-type .content {
      margin-left: 2px;
    }
    div.slider-track div.slider-slot:last-of-type .content {
      margin-right: 2px;
    }
    div.slider-thumb {
      height: 100%;
      width: 2px;
      background: var(--card-background-color);
      display: flex;
      cursor: pointer;
      z-index: 5;
      margin: 0px -1px;
      position: relative;
    }
    div.slider-thumb.active {
      z-index: 100;
    }
    div.slider-thumb-ripple {
      background: none;
      width: 36px;
      height: 36px;
      display: flex;
      flex: 1 0 36px;
      position: relative;
      border-radius: 50%;
      margin-left: -18px;
      margin-top: 7px;
    }
    div.slider-thumb-ripple:hover {
      background: rgba(var(--rgb-primary-text-color), 0.10);
    }
    div.slider-thumb .slider-thumb-ripple:before {
      content: ' ';
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgba(var(--rgb-primary-text-color), 0.20);
      z-index: -1;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      transform: scale(0);
    }
    div.slider-thumb.active .slider-thumb-ripple:before {
      transform: scale(1);
    }
    div.slider-thumb ha-icon {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      width: 24px;
      height: 24px;
      margin-top: 6px;
      margin-left: 6px;
      --mdc-icon-size: 24px;
      border-radius: 50%;
    }
    div.slider-thumb.hidden .slider-thumb-ripple {
      display: none;
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
    div.slider-legend-item.wide {
      width: calc(100% / 6);
    }
    div.slider-legend-item:before {
      content: ' ';
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
    div.slider-legend-item.empty.wide {
      width: calc(100% / 12);
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
      transition: all 0.1s ease-in-out;
      transform-origin: center bottom;
    }
    div.slider-thumb-tooltip.wide {
      width: 70px;
      margin-left: -35px;
    }
    div.slider-thumb-tooltip.center:before {
      content: ' ';
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
    div.slider-thumb-tooltip.wide:before {
      margin-left: 31px;
    }
    div.slider-thumb.active div.slider-thumb-tooltip {
      z-index: 10;
    }
    div.slider-thumb-tooltip.left {
      margin-left: -49px;
      transform-origin: right bottom;
    }
    div.slider-thumb-tooltip.wide.left {
      margin-left: -69px;
    }
    div.slider-thumb-tooltip.left:before {
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
    div.slider-thumb-tooltip.wide.left:before {
      margin-left: 62px;
    }
    div.slider-thumb-tooltip.right {
      margin-left: 1px;
      transform-origin: left bottom;
    }
    div.slider-thumb-tooltip.right:before {
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
    div.slider-thumb.hidden div.slider-thumb-tooltip  {
      transform: scale(0);
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
