import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { NumberSelector, SelectOption, Selector, SelectSelector, StringSelector } from "../lib/selector";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { PickerComboBoxItem, PickerValueRenderer } from "./scheduler-picker";
import { hassLocalize } from "../localize/hassLocalize";


@customElement("scheduler-combo-selector")
export class SchedulerComboSelector extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: Selector;

  @property() public value?: string | number | string[];
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    if ((this.config as SelectSelector).select) {
      const config = (this.config as SelectSelector).select!;
      const values = [...[this.value || []]].flat().map(String);

      const removeClick = (ev: CustomEvent) => {
        const value = ev.detail;
        this.value = values.filter(e => e != value);
        fireEvent(this, "value-changed", { value: this.value });
      }

      const renderChips = () => {
        let items = values.map(value => Object({
          name: value,
          value: value
        }));

        return html`
        <scheduler-chip-set
          .hass=${this.hass}
          .items=${items}
          removable
          @value-changed=${removeClick}
        >
        </scheduler-chip-set>`;
      }

      const computeItemLabel = (value: string) => {
        let translationKey = (this.config as SelectSelector).select?.translation_key;
        let label = '';
        if (translationKey) label = hassLocalize(translationKey.replace('${value}', value), this.hass, false);
        if (!label) label = value;
        return label;
      }
      const filteredItems = (): PickerComboBoxItem[] => {

        const comboBoxOption = (option: string | SelectOption): PickerComboBoxItem => {
          if (typeof option === 'object') {
            return {
              id: option.value,
              primary: computeItemLabel(option.label),
              icon: option.icon
            }
          }
          else {
            return {
              id: option,
              primary: computeItemLabel(option)
            }
          }
        }
        let options = [...config?.options].map(comboBoxOption);

        let selectedValue = [this.value || []].flat().map(String);
        options = [...options, ...selectedValue.filter(e => !options.find(f => f.id == e)).map(comboBoxOption)];

        if (Array.isArray(this.value)) options = options.filter(e => typeof e === 'object' ? !values.includes(e.id) : !values.includes(e));
        return options;
      }

      const valueRenderer: PickerValueRenderer = (value: string) => {
        let label = value;
        let icon = '';
        let match = config.options.find(e => typeof e === 'object' ? e.value === value : e === value);
        if (match && typeof match === 'object') {
          label = computeItemLabel(match.label);
          icon = match.icon || icon;
        }
        else label = computeItemLabel(value);

        if (icon) {
          return html`
            <ha-icon
              slot="start"
              .icon=${icon}
              style="margin: 0 4px"
            >
            </ha-icon>
            <span slot="headline">${label}</span>
          `;
        }
        else {
          return html`
            <span slot="headline">${label}</span>
          `;
        }
      };

      const rowRenderer = (item: PickerComboBoxItem) => {
        if (item.icon) {
          return html`
            <ha-combo-box-item type="button" compact>
              <ha-icon
                slot="start"
                .icon=${item.icon}
              >
              </ha-icon>
              <span slot="headline">${item.primary}</span>
            </ha-combo-box-item>
          `;
        }
        else {
          return html`
            <ha-combo-box-item type="button" compact>
              <span slot="headline">${item.primary}</span>
            </ha-combo-box-item>
          `;
        }
      }

      return html`
          <div class="select-wrapper">
        ${config.multiple ? html`
          <div class="chips">
          ${renderChips()}
          </div>
        ` : ''}
        <scheduler-picker
          .hass=${this.hass}
          ?allow-custom-value=${config.custom_value}
          .getItems=${filteredItems}
          .rowRenderer=${rowRenderer}
          .valueRenderer=${valueRenderer}
          @value-changed=${this._valueChanged}
          .value=${!Array.isArray(this.value) ? this.value || "" : ""}
        >
        </scheduler-picker>
        </div>
      `;
    }
    else if ((this.config as NumberSelector).number) {
      const config = (this.config as NumberSelector).number!;
      let min = config.min || 0;
      let max = config.max || 255;
      let value = typeof this.value == 'number' ? this.value : min;

      if (typeof config.scale_factor == 'number') value = parseFloat((value / config.scale_factor).toPrecision(12));
      if (typeof config?.step === 'number') value = Math.round(value / config.step) * config.step;

      const valueChanged = (ev: Event) => {
        let value = Number((ev.target as HTMLInputElement).value);

        if (typeof config.scale_factor == 'number')
          value = value * config.scale_factor;

        if (typeof config?.step === 'number') value = Math.round(value / config.step) * config.step;
        value = parseFloat(value.toFixed(2));

        this._valueChanged(new CustomEvent('value-changed', { detail: { value: value } }));
      }

      return html`
        <div class="slider-wrapper">
        <ha-slider
          labeled
          .min=${min}
          .max=${max}
          .step=${config.step || 1}
          .value=${value}
          @change=${valueChanged}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${value}${config.unit_of_measurement || ''}</span>
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
      :host {
        display: flex;
        width: 100%;
      }
      div.slider-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
      }
      div.slider-wrapper > * {
        display: flex;
      }
      div.slider-wrapper ha-slider {
        flex: 1;
      }
      div.slider-wrapper span {
        justify-content: center;
        align-self: center;
        min-width: 45px;
        text-align: end;
      }
      div.select-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
  `;

  private _valueChanged(ev: Event | CustomEvent) {
    ev.stopPropagation();

    if (Array.isArray(this.value)) {
      let value = (ev as CustomEvent).detail.value;
      if (!value) return;
      this.value = [...this.value, value];
      (ev.target as any).value = "";
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
    "scheduler-combo-selector": SchedulerComboSelector;
  }
}