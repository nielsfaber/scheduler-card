import { css, html, LitElement, nothing, PropertyValues, TemplateResult, type CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { sortByName } from "../lib/sort";
import { mdiClose, mdiMenuDown } from "@mdi/js";
import { localize } from "../localize/localize";

type ComboBox = HTMLElement & { renderer: Function; requestContentUpdate: Function };
type ComboBoxItemModel<T> = { item: T };
type ComboBoxLitRenderer<T> = (item: T, model: ComboBoxItemModel<T>, comboBox: ComboBox) => TemplateResult;

export interface PickerComboBoxItem {
  id: string;
  primary: string;
  secondary?: string;
  icon?: string;
}

const NO_MATCHING_ITEMS_FOUND_ID = "___no_matching_items_found___";

export type PickerValueRenderer = (value: string) => TemplateResult<1>;

@customElement("scheduler-picker")
export class SchedulerPicker extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public autofocus = false;

  @property({ type: Boolean }) public disabled = false;

  @property({ type: Boolean, attribute: "allow-custom-value" })
  public allowCustomValue;

  @property() public label?: string;

  @property() public value?: string;

  @property() public helper?: string;

  @property() public placeholder?;

  @property({ type: String, attribute: "search-label" })
  public searchLabel?: string;

  @property({ attribute: "hide-clear-icon", type: Boolean })
  public hideClearIcon = false;

  @property({ attribute: false, type: Array })
  public getItems?: () => PickerComboBoxItem[];

  @property({ attribute: false, type: Array })
  public getAdditionalItems?: (searchString?: string) => PickerComboBoxItem[];

  @property({ attribute: false })
  public rowRenderer?: ComboBoxLitRenderer<PickerComboBoxItem>;

  @property({ attribute: false })
  public valueRenderer?: PickerValueRenderer;

  @property({ attribute: "not-found-label", type: String })
  public notFoundLabel?: string;

  @query(".textInput") private _field?: HTMLInputElement;

  @query("ha-combo-box") private _comboBox?: HTMLInputElement;

  @state() private _opened = false;
  private _isOpening = false;

  private _items: PickerComboBoxItem[] = [];

  private _getItems = (): PickerComboBoxItem[] => {
    const items = this.getItems ? this.getItems() : [];

    const sortedItems = items.sort((a, b) => sortByName(a.primary, b.primary));

    if (!sortedItems.length) {
      sortedItems.push({
        id: NO_MATCHING_ITEMS_FOUND_ID,
        primary: localize("ui.dialog.entity_picker.no_results", this.hass),
        icon: "mdi:cancel",
      });
    }
    return sortedItems;
  };

  protected shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.has("value") || changedProps.has("label") || changedProps.has("disabled")) {
      return true;
    }

    return !(!changedProps.has("_opened") && this._opened);
  }

  public willUpdate(changedProps: PropertyValues) {
    if (changedProps.has("_opened") && this._opened) {
      this._items = this._getItems();
    }
  }

  protected render() {
    const showClearIcon = !!this.value && !this.disabled && !this.hideClearIcon;

    return html`
      ${this.label ? html`<label ?disabled=${this.disabled}>${this.label}</label>` : nothing}
      <div class="container">
        ${!this._opened
          ? html`
              <ha-combo-box-item .disabled=${this.disabled} type="button" compact class="textInput" @click=${this.open}>
                ${this.value
                  ? this.valueRenderer
                    ? this.valueRenderer(this.value)
                    : html`<span slot="headline">${this.value}</span>`
                  : html`
                      <span slot="headline" class="placeholder">
                        ${this.placeholder || localize("ui.dialog.entity_picker.choose", this.hass)}
                      </span>
                    `}
                ${showClearIcon
                  ? html`
                      <ha-icon-button class="clear" slot="end" @click=${this._clear} .path=${mdiClose}></ha-icon-button>
                    `
                  : nothing}
                <ha-svg-icon class="arrow" slot="end" .path=${mdiMenuDown}></ha-svg-icon>
              </ha-combo-box-item>
            `
          : html`
              <ha-combo-box
                item-id-path="id"
                item-value-path="id"
                item-label-path="a11y_label"
                clear-initial-value
                .hass=${this.hass}
                .value=${this._value}
                .label=${this.label}
                .helper=${this.helper}
                .allowCustomValue=${this.allowCustomValue}
                .filteredItems=${this._items}
                .renderer=${this.rowRenderer}
                .disabled=${this.disabled}
                .hideClearIcon=${this.hideClearIcon}
                @opened-changed=${this._openedChanged}
                @value-changed=${this._valueChanged}
                @filter-changed=${this._filterChanged}
              >
              </ha-combo-box>
            `}
      </div>
      ${this._renderHelper()}
    `;
  }

  private get _value() {
    return this.value || "";
  }

  private _renderHelper() {
    return this.helper
      ? html`<ha-input-helper-text .disabled=${this.disabled}>${this.helper}</ha-input-helper-text>`
      : nothing;
  }

  private _valueChanged(ev: CustomEvent) {
    ev.stopPropagation();
    // Clear the input field to prevent showing the old value next time
    (this._comboBox as any).setTextFieldValue("");
    const newValue = ev.detail.value?.trim();

    if (newValue === NO_MATCHING_ITEMS_FOUND_ID) {
      return;
    } else if (!this._items.find((e) => e.id == newValue) && !this.allowCustomValue) {
      return;
    }

    if (newValue !== this._value) {
      this._setValue(newValue);
    }
  }

  private _filterChanged(ev: CustomEvent): void {
    if (!this._opened) return;

    let filteredItems = this._items as PickerComboBoxItem[];

    const target = ev.target as HTMLInputElement;
    const searchTerms: string[] = ev.detail.value
      .trim()
      .split(" ")
      .map(String)
      .filter((e) => e.length)
      .map((e) => e.trim());

    if (searchTerms.length) {
      filteredItems = filteredItems.filter((item) => {
        return searchTerms.every((term) => item.primary.includes(term) || item.secondary?.includes(term));
      });
    }

    (target as any).filteredItems = filteredItems;
  }

  private _clear(e) {
    e.stopPropagation();
    this._setValue(undefined);
  }

  private _setValue(value: string | undefined) {
    this.value = value;
    fireEvent(this, "value-changed", { value });
  }

  public async focus() {
    await this.updateComplete;
    await this._comboBox?.focus();
  }

  public async open() {
    this._opened = true;
    this._isOpening = true;
    await this.updateComplete;
    this._comboBox?.focus();
    (this._comboBox as any).open();
    (this._comboBox as any).value = "";
  }

  private async _openedChanged(ev: CustomEvent) {
    const opened = ev.detail.value;
    ev.stopPropagation();
    if (this._isOpening) {
      this._isOpening = false;
    } else if (this._opened && !opened) {
      this._opened = false;
      await this.updateComplete;
      this._field?.focus();
    }
  }

  static get styles(): CSSResultGroup {
    return [
      css`
        .container {
          position: relative;
          display: block;
        }
        label[disabled] {
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.6));
        }
        label {
          display: block;
          margin: 0 0 8px;
        }
        ha-input-helper-text {
          display: block;
          margin: 8px 0 0;
        }

        ha-combo-box-item.textInput[disabled] {
          background-color: var(--mdc-text-field-disabled-fill-color, whitesmoke);
        }
        ha-combo-box-item.textInput {
          background-color: var(--mdc-text-field-fill-color, whitesmoke);
          border-radius: 4px;
          border-end-end-radius: 0;
          border-end-start-radius: 0;
          --md-list-item-one-line-container-height: 56px;
          --md-list-item-two-line-container-height: 56px;
          --md-list-item-top-space: 0px;
          --md-list-item-bottom-space: 0px;
          --md-list-item-leading-space: 8px;
          --md-list-item-trailing-space: 8px;
          --ha-md-list-item-gap: 8px;
          /* Remove the default focus ring */
          --md-focus-ring-width: 0px;
          --md-focus-ring-duration: 0s;
        }

        /* Add Similar focus style as the text field */
        ha-combo-box-item.textInput[disabled]:after {
          background-color: var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.42));
        }
        ha-combo-box-item.textInput:after {
          display: block;
          content: "";
          position: absolute;
          pointer-events: none;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          width: 100%;
          background-color: var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
          transform:
            height 180ms ease-in-out,
            background-color 180ms ease-in-out;
        }

        ha-combo-box-item.textInput:focus:after {
          height: 2px;
          background-color: var(--mdc-theme-primary);
        }
        .clear {
          margin: 0 -8px;
          --mdc-icon-button-size: 32px;
          --mdc-icon-size: 20px;
        }
        .arrow {
          --mdc-icon-size: 20px;
          width: 32px;
        }
        .placeholder {
          color: var(--secondary-text-color);
          padding: 0 8px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "scheduler-picker": SchedulerPicker;
  }
}
