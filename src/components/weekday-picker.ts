import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { HomeAssistant } from "../lib/types";

enum WeekdayOptions {
  Daily = 'daily',
  Workday = 'workday',
  Weekend = 'weekend',
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
  Sunday = 'sun',
}

@customElement("my-weekday-picker")
export class WeekdayPicker extends LitElement {

  @property() hass!: HomeAssistant;
  @property() public value: string[] = [];

  protected render(): TemplateResult {
    return html`
      <div class="container">
       ${this._renderItems()}
      </div>
    `;
  }



  private _renderItems = () => {
    return Object.keys(WeekdayOptions).map(key => {
      return html`
        <span
          idx="${key}"
          @click=${this._toggleSelectItem}
          class="${this.value.includes(key) ? "selected" : ""}"
        >
          ${WeekdayOptions[key]}
        </span>`
    })
  }

  private _toggleSelectItem(ev: Event) {
    const key = (ev.target as HTMLElement).getAttribute("idx") as WeekdayOptions;
    if (this.value.includes(key)) {
      this.value = this.value.filter(e => e != key);
    }
    else {
      this.value = [...this.value, key];
    }
  }


  static styles = css`
    .container {
      display: flex;
      row-gap: 4px;
      column-gap: 4px;
      flex-wrap: wrap;
    }
    span {
      display: flex;
      background: rgba(var(--rgb-primary-color), 0.54);
      color: var(--text-primary-color);
      border-radius: 8px;
      padding: 2px 8px;
      cursor: pointer;
    }
    span:hover {
      background: rgba(var(--rgb-primary-color), 0.75);
    }
    span.selected {
      background: var(--primary-color);
    }
  `;

}

declare global {
  interface HTMLElementTagNameMap {
    "my-weekday-picker": WeekdayPicker;
  }
}