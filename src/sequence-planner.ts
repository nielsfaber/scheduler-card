import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { localize } from './localize/localize';

@customElement('sequence-planner')
export class SequencePlanner extends LitElement {

  segments = [
    { duration: 12 },
    { duration: 12 },
  ];

  stops = [
    { time: 12 }
  ];

  updated() {
  }

  firstUpdated() {
  }

  render() {
    return html`
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSegments()}
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
    </div>
    `;
  }


  protected getSegments(): TemplateResult[] {
    let output: TemplateResult[] = [];
    this.segments.forEach((el, i) => {
      output.push(html`
        <div class="slider-segment" @click="${this._handleSegmentClick}" style="width: ${el.duration / 24 * 100}%">
          off
        </div>
      `);
      if (i < this.stops.length) {
        let time = this.stops[i].time;
        let timeHours = Math.floor(time);
        let timeMinutes = Math.round((time - timeHours) * 60);
        output.push(html`
        <div class="slider-thumb">
          <ha-icon icon="hass:unfold-more-vertical"  @mousedown="${this._handleTouchStart}" @touchstart="${this._handleTouchStart}"></ha-icon>
          <div class="slider-thumb-tooltip" value="time" @update="${this._updateMarker}">
            ${String(timeHours).padStart(2, '0')}:${String(timeMinutes).padStart(2, '0')}
          </div>
        </div>`);
      }
    });
    return output;
  }

  private _handleTouchStart(e: MouseEvent | TouchEvent) {
    let thumbElement: HTMLElement | null;
    thumbElement = e.target as HTMLElement;
    if (!thumbElement) return;
    let parentElement = thumbElement.parentNode as HTMLElement;
    let trackElement: HTMLElement | null = parentElement.parentElement;
    if (!trackElement) return;
    let trackCoords = trackElement.getBoundingClientRect();
    let leftNeighbour: HTMLElement = parentElement.previousElementSibling as HTMLElement;
    let rightNeighbour: HTMLElement = parentElement.nextElementSibling as HTMLElement;

    let toolTip = parentElement.getElementsByClassName("slider-thumb-tooltip")[0] as HTMLElement;
    const availableWidth = leftNeighbour.offsetWidth + rightNeighbour.offsetWidth;
    const trackWidth = trackCoords.width;

    let segments = Array.from(trackElement.getElementsByClassName("slider-segment")) as HTMLElement[];
    let segmentWidths = segments.map(e => e.offsetWidth);

    let xStart = 0;
    let segmentIndex = -1;
    segments.forEach((e, i) => {
      if (e == leftNeighbour) {
        segmentIndex = i;
      } else if (segmentIndex == -1) {
        xStart = xStart + segmentWidths[i];
      }
    });
    let mouseMoveHandler = function (e: MouseEvent | TouchEvent) {
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

      rightNeighbour.style.width = `${Math.round(availableWidth - (x - xStart))}px`;
      leftNeighbour.style.width = `${Math.round(x - xStart)}px`;

      let pct = x / trackWidth;
      let time = Math.round(pct * (24 * 4)) / 4;

      toolTip.setAttribute("time", String(time));

      toolTip.dispatchEvent(new CustomEvent('update', { detail: { time: time } }));

    }

    var mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.addEventListener('touchend', mouseUpHandler);

      let new_stop = Number(toolTip.getAttribute("time"));

      let time = 0;
      let total_duration = this.segments[segmentIndex].duration + this.segments[segmentIndex + 1].duration;

      let start_time = (segmentIndex > 0) ? this.stops[segmentIndex - 1].time : 0;

      let stops = [... this.stops];
      stops[segmentIndex] = { time: new_stop };
      this.stops = stops;

      let segments = [... this.segments]
      segments[segmentIndex] = { duration: (new_stop - start_time) };
      segments[segmentIndex + 1] = { duration: (total_duration - (new_stop - start_time)) };
      this.segments = segments;
      mouseMoveHandler = () => { };

    }

    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', mouseUpHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', mouseMoveHandler);
  }


  private _handleSegmentClick(e) {
    let segment = e.target as HTMLElement;
    let trackElement: HTMLElement | null = segment.parentElement;
    if (!trackElement) return;
    let segments = Array.from(trackElement.getElementsByClassName("slider-segment")) as HTMLElement[];
    let is_selected = segment.classList.contains("active");
    segments.forEach(el => el.classList.remove("active"));
    if (is_selected) return;
    segment.classList.add("active");
  }


  private _updateMarker(e: CustomEvent) {
    let detail = e.detail;
    let time = 0;
    if (detail.hasOwnProperty('index')) {
      let index = detail.index;
      if (index >= this.stops.length) return;
      time = this.stops[index].time;
    } else if (detail.hasOwnProperty('time')) {
      time = detail.time;
    } else return;
    let target = e.target as HTMLElement;

    let hours = Math.floor(time);
    let minutes = Math.round((time - hours) * 60);
    target.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  private _sliderAdd() {
    let segments = Array.from(this.querySelectorAll(".slider-segment")) as HTMLElement[];
    let active_segment = -1;
    segments.forEach((el, i) => {
      if (el.classList.contains("active")) active_segment = i;
    });
    if (segments.length >= 10 || active_segment == -1) return;
    let old_duration = this.segments[active_segment].duration;

    let start_time = 0;
    this.stops.forEach((el, i) => {
      if (i < active_segment) start_time = el.time;
    });

    let new_time = start_time + old_duration / 2;
    new_time = Math.round(new_time * 4) / 4;

    let stops = [...this.stops];
    stops.splice(active_segment, 0, { time: new_time });
    this.stops = stops;

    let allsegments = [...this.segments];
    allsegments.splice(active_segment, 1, {
      duration: new_time - start_time
    }, {
      duration: old_duration - (new_time - start_time)
    });
    this.segments = allsegments;
    this.updateComplete.then(() => {
      this.querySelectorAll(".slider-thumb-tooltip").forEach((el, i) => {
        el.dispatchEvent(new CustomEvent('update', { detail: { index: i } }));
      });
    });

    this.requestUpdate();
  }

  private _sliderRemove() {
    let segments = Array.from(this.querySelectorAll(".slider-segment")) as HTMLElement[];
    let active_segment = -1;
    segments.forEach((el, i) => {
      if (el.classList.contains("active")) active_segment = i;
    });
    if (segments.length == 2 || active_segment == -1) return;
    let cutIndex = active_segment;
    if (cutIndex == (segments.length - 1)) cutIndex--;

    let new_duration = this.segments[cutIndex].duration + this.segments[cutIndex + 1].duration;

    let stops = [...this.stops];

    stops.splice(cutIndex, 1);
    this.stops = stops;

    let allsegments = [...this.segments];

    allsegments.splice(cutIndex, 2, {
      duration: new_duration
    });

    this.segments = allsegments;
    this.updateComplete.then(() => {
      this.querySelectorAll(".slider-thumb-tooltip").forEach((el, i) => {
        el.dispatchEvent(new CustomEvent('update', { detail: { index: i } }));
      });
    });
    this.requestUpdate();
  }


  static styles = css`

      div.slider-track {
        height: 45px;
        width: 100%;
        //background: var(--light-primary-color);
        //border-radius: 15px;
        display: flex;
      }
      
      div.slider-segment {
        height: calc(100%);
        width: 50%;
        display: flex;
        background: var(--primary-color);
        opacity: 0.85;
        z-index: 1;
        //margin: 3px;
        cursor: pointer;
        color: var(--text-primary-color);
        justify-content: center;
        align-items: center;
      }
      div.slider-segment.active {
        opacity: 0.85;
        background: var(--accent-color);
      }
      div.slider-segment:hover, div.slider-segment.active:hover {
        opacity: 1;
      }
      
      div.slider-track div.slider-segment:first-of-type {
        //border-radius: 12px 0px 0px 12px;
      }
      div.slider-track div.slider-segment:last-of-type {
        //border-radius: 0px 12px 12px 0px;
      }
      div.slider-thumb {
        height: 100%;
        width: 2px;
        background: var(--text-primary-color);
        display: flex;
        cursor: pointer;
        z-index: 5;
        margin: 0px -1px;
      }
      div.slider-thumb ha-icon {
        background: white;
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
        font-size: 8px;
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
        font-size: 10px;
        position: absolute;
        height: 16px;
        width: 40px;
        margin-top: -17px;
        margin-left: -20px;
        text-align: center;
        line-height: 16px;
      }
  `;
}
