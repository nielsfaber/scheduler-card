import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import {
  BooleanSelector,
  NumberSelector,
  SelectOption,
  Selector,
  SelectSelector,
  StringSelector,
} from "../lib/selector";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { PickerComboBoxItem, PickerValueRenderer } from "./scheduler-picker";
import { hassLocalize } from "../localize/hassLocalize";
import { roundFloat } from "../lib/round_float";
import { isDefined } from "../lib/is_defined";

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
        this.value = values.filter((e) => e != value);
        fireEvent(this, "value-changed", { value: this.value });
      };

      const renderChips = () => {
        const items = values.map((value) =>
          Object({
            name: value,
            value: value,
          })
        );

        return html` <scheduler-chip-set .hass=${this.hass} .items=${items} removable @value-changed=${removeClick}>
        </scheduler-chip-set>`;
      };

      const computeItemLabel = (value: string) => {
        const translationKey = (this.config as SelectSelector).select?.translation_key;
        let label = "";
        if (translationKey) label = hassLocalize(translationKey.replace("${value}", value), this.hass, false);
        if (!label) label = value;
        return label;
      };
      const filteredItems = (): PickerComboBoxItem[] => {
        const comboBoxOption = (option: string | SelectOption): PickerComboBoxItem => {
          if (typeof option === "object") {
            return {
              id: option.value,
              primary: computeItemLabel(option.label),
              icon: option.icon,
            };
          } else {
            return {
              id: option,
              primary: computeItemLabel(option),
            };
          }
        };
        let options = [...config?.options].map(comboBoxOption);

        const selectedValue = [this.value || []].flat().map(String);
        options = [...options, ...selectedValue.filter((e) => !options.find((f) => f.id == e)).map(comboBoxOption)];

        if (Array.isArray(this.value))
          options = options.filter((e) => (typeof e === "object" ? !values.includes(e.id) : !values.includes(e)));
        return options;
      };

      const valueRenderer: PickerValueRenderer = (value: string) => {
        let label = value;
        let icon = "";
        const match = config.options.find((e) => (typeof e === "object" ? e.value === value : e === value));
        if (match && typeof match === "object") {
          label = computeItemLabel(match.label);
          icon = match.icon || icon;
        } else label = computeItemLabel(value);

        if (icon) {
          return html`
            <ha-icon slot="start" .icon=${icon} style="margin: 0 4px"> </ha-icon>
            <span slot="headline">${label}</span>
          `;
        } else {
          return html` <span slot="headline">${label}</span> `;
        }
      };

      const rowRenderer = (item: PickerComboBoxItem) => {
        if (item.icon) {
          return html`
            <ha-combo-box-item type="button" compact>
              <ha-icon slot="start" .icon=${item.icon}> </ha-icon>
              <span slot="headline">${item.primary}</span>
            </ha-combo-box-item>
          `;
        } else {
          return html`
            <ha-combo-box-item type="button" compact>
              <span slot="headline">${item.primary}</span>
            </ha-combo-box-item>
          `;
        }
      };

      return html`
        <div class="select-wrapper">
          ${config.multiple ? html` <div class="chips">${renderChips()}</div> ` : ""}
          <scheduler-picker
            .hass=${this.hass}
            ?allow-custom-value=${config.custom_value}
            .getItems=${filteredItems}
            .rowRenderer=${rowRenderer}
            .valueRenderer=${valueRenderer}
            @value-changed=${this._valueChanged}
            .value=${!Array.isArray(this.value) ? this.value || "" : ""}
            ?disabled=${this.disabled}
          >
          </scheduler-picker>
        </div>
      `;
    } else if ((this.config as NumberSelector).number) {
      const config = (this.config as NumberSelector).number!;
      const boxMode = config.mode == "box" || !isDefined(config.min) || !isDefined(config.max);

      let value = this.value;
      if (!boxMode && typeof value !== "number") value = config.min;
      if (typeof config.scale_factor == "number") value = Number(value) / config.scale_factor;
      if (typeof config?.step === "number") value = Math.round(Number(value) / config.step) * config.step;
      if (isDefined(value)) value = roundFloat(Number(value));

      const sliderValueChanged = (ev: Event) => {
        let value = Number((ev.target as HTMLInputElement).value);

        if (typeof config.scale_factor == "number") value = value * config.scale_factor;

        if (typeof config?.step === "number") value = Math.round(value / config.step) * config.step;
        value = roundFloat(value);

        this._valueChanged(new CustomEvent("value-changed", { detail: { value: value } }));
        ev.stopPropagation();
      };

      const boxValueChanged = (ev: InputEvent) => {
        ev.stopPropagation();
        const input = (ev.target as HTMLInputElement).value;
        const value = input === "" || isNaN(Number(input)) ? undefined : Number(input);
        this._valueChanged(new CustomEvent("value-changed", { detail: { value: value } }));
      };

      const validateBoxInput = (value: any, _nativeValidity: any) => {
        let valid =
          config.step && Number(config.step) % 1 == 0
            ? value.match(/^-?\d+$/) !== null
            : value.match(/^[+-]?\d+([.,]\d+)?$/) !== null;
        if (valid && isDefined(config.min)) valid = Number(value) >= config.min;
        if (valid && isDefined(config.max)) valid = Number(value) <= config.max;

        return {
          valid: valid,
          customError: !valid,
        };
      };

      return html`
        <div class="slider-wrapper">
          ${boxMode
            ? html`
                <ha-textfield
                  .inputMode=${config.step && Number(config.step) % 1 == 0 ? "numeric" : "decimal"}
                  .min=${config.min}
                  .max=${config.max}
                  .value=${value || ""}
                  .step=${config.step ?? 1}
                  .disabled=${this.disabled}
                  .required=${true}
                  .suffix=${config.unit}
                  type="number"
                  autoValidate
                  .validityTransform=${validateBoxInput}
                  @input=${boxValueChanged}
                >
                </ha-textfield>
              `
            : html`
                <ha-slider
                  .min=${config.min}
                  .max=${config.max}
                  .step=${config.step || 1}
                  .value=${value}
                  @change=${sliderValueChanged}
                  ?disabled=${this.disabled}
                ></ha-slider>
                <span class="value">${value} ${config.unit || ""}</span>
              `}
        </div>
      `;
    } else if ((this.config as StringSelector).text) {
      const config = (this.config as StringSelector).text!;
      return html`
        <div class="textfield-wrapper">
          <ha-textfield
            .value=${this.value || ""}
            @input=${this._valueChanged}
            .placeholder=""
            ?disabled=${this.disabled}
          ></ha-textfield>
        </div>
      `;
    } else if ((this.config as BooleanSelector).boolean) {
      const selector = <SelectSelector>{
        select: {
          options: [
            {
              value: "true",
              label: "True",
              icon: "mdi:check",
            },
            {
              value: "false",
              label: "False",
              icon: "mdi:close",
            },
          ],
        },
      };

      const valueChanged = (ev: CustomEvent) => {
        const value = isDefined(ev.detail.value) ? ev.detail.value === "true" : undefined;
        ev.stopPropagation();
        this._valueChanged(new CustomEvent("value-changed", { detail: { value: value } }));
      };

      return html`
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${selector}
          .value=${typeof this.value == "boolean" ? (this.value ? "true" : "false") : undefined}
          @value-changed=${valueChanged}
          ?disabled=${this.disabled}
        >
        </scheduler-combo-selector>
      `;
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
      align-items: center;
      gap: 4px;
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
    div.slider-wrapper ha-textfield {
      --ha-textfield-input-width: 40px;
    }
    div.select-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    div.textfield-wrapper {
      display: flex;
      width: 100%;
    }
    div.textfield-wrapper ha-textfield {
      display: flex;
      width: 100%;
    }
  `;

  private _valueChanged(ev: Event | CustomEvent) {
    ev.stopPropagation();

    if (Array.isArray(this.value)) {
      const value = (ev as CustomEvent).detail.value;
      if (!value) return;
      this.value = [...this.value, value];
      (ev.target as any).value = "";
    } else if ((ev as CustomEvent).detail) {
      let value = (ev as CustomEvent).detail.value;
      if (value === undefined) value = null;
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
