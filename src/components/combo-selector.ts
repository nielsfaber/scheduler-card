import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { NumberSelector, SelectOption, Selector, SelectSelector, StringSelector } from "../lib/selector";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";


@customElement("combo-selector")
export class ComboSelector extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: Selector;

  @property() public value?: string | number | string[];
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    if ((this.config as SelectSelector).select) {
      const config = (this.config as SelectSelector).select!
      const values = [...[this.value || []]].flat().map(String);

      const removeItem = (value: string) => {
        this.value = values.filter(e => e != value);
        fireEvent(this, "value-changed", { value: this.value });
      }

      const renderChips = () => {
        return values.map(e =>
          html`
            <div class="chip">
              <span class="label">${e}</span>
              <ha-icon icon="mdi:close" @click=${() => removeItem(e)}></ha-icon>
            </div>
          `)
      }

      const filteredItems = (): SelectOption[] => {
        let options: (string | SelectOption)[] = [...config?.options];
        if (Array.isArray(this.value)) options = options.filter(e => typeof e === 'object' ? !values.includes(e.value) : !values.includes(e));

        const computeItemLabel = (value: string) => {
          const translationKey = (this.config as SelectSelector).select?.translation_key;
          let label = '';
          if (translationKey) label = this.hass.localize(translationKey.replace('${value}', value));
          if (!label) label = value;
          return label;
        }

        return options.map(e => typeof e === 'object' ? e : Object({
          value: e,
          label: computeItemLabel(e)
        }));
      }

      return html`
        ${config.multiple ? html`
          <div class="chips">
          ${renderChips()}
          </div>
        `
          : ''}
        <ha-combo-box
          .hass=${this.hass}
          label=""
          item-value-path="value"
          item-label-path="label"
          .renderer=${this.rowRenderer}
          .filteredItems=${filteredItems()}
          @value-changed=${this._valueChanged}
          .value=${!Array.isArray(this.value) ? this.value || "" : ""}
          ?disabled=${this.disabled}
          ?allow-custom-value=${config.custom_value}
        >
        </ha-combo-box>
      `;
    }
    else if ((this.config as NumberSelector).number) {
      const config = (this.config as NumberSelector).number!;
      return html`
        <div class="slider-wrapper">
        <ha-slider
          labeled
          .min=${config.min}
          .max=${config.max}
          .step=${config.step}
          .value=${this.value || config.min}
          @change=${this._valueChanged}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${this.value || config.min}${config.unit_of_measurement || ''}</span>
        </div>
      `
    }
    else if ((this.config as StringSelector).text) {
      const config = (this.config as StringSelector).text!;
      return html`
          <ha-textfield
            .value=${this.value || ""}
            @value-changed=${this._valueChanged}
            .placeholder=""
            ?disabled=${this.disabled}
          ></ha-textfield>      
      `
    }
    return html``;
  }

  static styles = css`
      div.slider-wrapper {
        display: flex;
        flex-direction: row;
      }
      div.slider-wrapper > * {
        display: flex;
      }
      div.slider-wrapper span {
        justify-content: center;
        align-self: center;
        min-width: 45px;
        text-align: end;
      }
      div.chip {
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgba(var(--rgb-primary-color), 0.54);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 4px;
      }
      div.chip .label {
          margin: 0px 4px;
      }
      div.chip ha-icon {
          cursor: pointer;
          background: var(--secondary-text-color);
          border-radius: 50%;
          --mdc-icon-size: 14px;
          color: var(--card-background-color);
          width: 16px;
          height: 16px;
          padding: 1px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          margin-right: -6px !important;
      }
  `;

  rowRenderer = (item: SelectOption) => {
    //TODO: handle icons
    return html`
      <mwc-list-item>
        <span>${item.label}</span>
      </mwc-list-item>
    `;
  }

  private _valueChanged(ev: Event | CustomEvent) {
    ev.stopPropagation();

    if (Array.isArray(this.value)) {
      let value = (ev as CustomEvent).detail.value;
      if (!value) return;
      this.value = [...this.value, value];
      (ev.target as any).setInputValue("");
    }
    else if ((ev as CustomEvent).detail) {
      let value = (ev as CustomEvent).detail.value;
      if (value === undefined) return;
      this.value = value;
    } else {
      this.value = (ev.target as HTMLInputElement).value;
    }
    fireEvent(this, "value-changed", { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "combo-selector": ComboSelector;
  }
}