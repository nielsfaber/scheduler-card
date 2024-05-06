import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { NumberSelector, SelectOption, Selector, SelectSelector } from "../lib/selector";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";

@customElement("combo-selector")
export class ComboSelector extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: Selector;

  @property() public value?: string | number;
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    if ((this.config as SelectSelector).select) {
      const config = (this.config as SelectSelector).select!;
      return html`
        <ha-combo-box
          .hass=${this.hass}
          label=""
          .renderer=${this.rowRenderer}
          .filteredItems=${config?.options}
          @value-changed=${this._valueChanged}
          .value=${this.value || ""}
          ?disabled=${this.disabled}
        >
        </ha-combo-box>
      `;
    }
    else if ((this.config as NumberSelector).number) {
      const config = (this.config as NumberSelector).number!;
      return html`
        <ha-slider
          labeled
          .min=${config.min}
          .max=${config.max}
          .step=${config.step}
          .value=${this.value || config.min}
          @change=${this._valueChanged}
          ?disabled=${this.disabled}
        ></ha-slider>
      `
    }
    return html``;
  }

  static styles = css`

  `;

  rowRenderer = (item: SelectOption | string) =>
    html`
      <mwc-list-item graphic="icon">
        <span>${typeof item == 'object' ? item.label : item}</span>
      </mwc-list-item>
    `;

  private _valueChanged(ev: Event | CustomEvent) {
    if ((ev as CustomEvent).detail) {
      this.value = (ev as CustomEvent).detail.value;
    } else {
      this.value = (ev.target as HTMLInputElement).value;
    }
    ev.stopPropagation();
    fireEvent(this, "value-changed", { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "combo-selector": ComboSelector;
  }
}