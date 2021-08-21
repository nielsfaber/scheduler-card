import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import { isEqual, isDefined } from '../helpers';
import { loadHaForm } from '../load-ha-form';

export type Option = {
  name: string;
  description?: string;
  value: string;
  icon?: string;
};


@customElement('scheduler-select')
export class SchedulerSelect extends LitElement {

  @property()
  public label = '';

  @property()
  public value?: string;

  @property()
  items: Option[] = [];

  @property()
  clearable = false;

  @property()
  icons = false;

  @property({ type: Boolean })
  disabled = false;

  @state()
  private _opened?: boolean;

  @property({ attribute: "allow-custom-value", type: Boolean })
  public allowCustomValue?: boolean = false;

  @property({ type: Boolean })
  invalid = false;

  @query('vaadin-combo-box-light', true)
  private _comboBox!: HTMLElement;

  public open() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.open();
    });
  }

  public focus() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('paper-input') as HTMLInputElement).focus();
    });
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.get('items')) {
      if (!isEqual(this.items, changedProps.get('items') as Option[])) this.firstUpdated();
      else if (changedProps.size == 1) return false;
    }
    return true;
  }

  protected firstUpdated() {
    (async () => await loadHaForm())();
    (this._comboBox as any).items = this.items;
  }

  protected render(): TemplateResult {
    return html`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
        .allowCustomValue=${this.allowCustomValue}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged} 
        @value-changed=${this._valueChanged}
      >
        <paper-input
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
        >
          ${isDefined(this._value) && this.items.find(e => e.value == this._value)
        ? html`
                ${this.icons
            ? html`
                      <ha-icon slot="prefix" icon="${this.items.find(e => e.value == this._value)!.icon}"> </ha-icon>
                    `
            : ''}
                ${this.clearable
            ? html`
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} icon="hass:close">
                      </ha-icon-button>
                    `
            : ''}
              `
        : ''}
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            icon="${this._opened ? 'hass:menu-up' : 'hass:menu-down'}"
          >
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `;
  }

  rowRenderer = (root: HTMLElement, _owner, entry: { item: Option }) => {
    if (!root.firstElementChild && this.icons) {
      root.innerHTML = `
        <style>
          paper-icon-item {
              margin: -10px;
              padding: 0;
          }
          ha-icon {
              display: flex;
              flex: 0 0 40px;
              color: var(--state-icon-color);
          }
        </style>
        <paper-icon-item>
          <ha-icon icon="" slot="item-icon"></ha-icon>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-icon-item>
        `;
        root.querySelector('.name')!.textContent = entry.item.name;
        root.querySelector('[secondary]')!.textContent = entry.item.description || "";
        (root.querySelector('ha-icon')! as any).icon = entry.item.icon;
    } else if (!root.firstElementChild) {
      root.innerHTML = `
        <style>
          paper-item {
              margin: -10px;
              padding: 0;
          }
        </style>
        <paper-item>
          <paper-item-body>
            ${entry.item.name}
          </paper-item-body>
        </paper-item>
        `;
    }
  };

  private _clearValue(ev: Event) {
    ev.stopPropagation();
    this._setValue('');
  }

  private get _value() {
    return isDefined(this.value) ? this.value : '';
  }

  private _openedChanged(ev: CustomEvent) {
    this._opened = ev.detail.value;
  }

  private _valueChanged(ev: CustomEvent) {
    const newValue = ev.detail.value;
    if (newValue !== this._value) {
      this._setValue(newValue);
    }
  }

  private _setValue(value: string) {
    this.value = value;

    setTimeout(() => {
      fireEvent(this, 'value-changed', { value });
    }, 0);
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        line-height: 1em;
      }
      paper-input > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      [hidden] {
        display: none;
      }
      paper-input > ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        width: 40px;
        height: 26px;
        align-items: center;
      }
    `;
  }
}
