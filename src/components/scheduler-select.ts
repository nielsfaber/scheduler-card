import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import { mdiClose, mdiMenuUp, mdiMenuDown } from '@mdi/js';

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

  @property({ attribute: 'allow-custom-value', type: Boolean })
  public allowCustomValue?: boolean = false;

  @property({ type: Boolean })
  invalid = false;

  @query('vaadin-combo-box-light', true)
  private _comboBox!: HTMLElement;

  private _overlayMutationObserver?: MutationObserver;

  public disconnectedCallback() {
    super.disconnectedCallback();
    if (this._overlayMutationObserver) {
      this._overlayMutationObserver.disconnect();
      this._overlayMutationObserver = undefined;
    }
  }

  public open() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.open();
    });
  }

  public focus() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.inputElement?.focus();
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
        <ha-textfield
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
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} .path=${mdiClose}>
                      </ha-icon-button>
                    `
                  : ''}
              `
            : ''}
        </ha-textfield>
        <ha-svg-icon
          class="toggle-button ${this.items.length ? '' : 'disabled'}"
          .path=${this._opened && this.items.length ? mdiMenuUp : mdiMenuDown}
          @click=${this._toggleOpen}
        ></ha-svg-icon>
      </vaadin-combo-box-light>
    `;
  }

  private rowRenderer(root: HTMLElement, _owner, entry: { item: Option }) {
    if (!root.firstElementChild)
      root.innerHTML = `
        <mwc-list-item>
          <span class="name"><span>
        </mwc-list-item>
      `;
    root.querySelector('.name')!.textContent = entry.item.name;
  }

  private _clearValue(ev: Event) {
    ev.stopPropagation();
    this._setValue('');
  }

  private get _value() {
    return isDefined(this.value) ? this.value : '';
  }

  private _toggleOpen(ev: Event) {
    if (!this.items.length) {
      ev.stopPropagation();
      return;
    }
    if (this._opened) {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.inputElement?.blur();
      ev.stopPropagation();
    } else {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.inputElement?.focus();
    }
  }

  private _openedChanged(ev: CustomEvent) {
    this._opened = ev.detail.value;

    if (this._opened && 'MutationObserver' in window && !this._overlayMutationObserver) {
      const overlay = document.querySelector<HTMLElement>('vaadin-combo-box-overlay');

      if (!overlay) return;

      this._overlayMutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'inert' &&
            // @ts-expect-error
            overlay.inert === true
          ) {
            // @ts-expect-error
            overlay.inert = false;
            this._overlayMutationObserver?.disconnect();
            this._overlayMutationObserver = undefined;
          } else if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(node => {
              if (node.nodeName === 'VAADIN-COMBO-BOX-OVERLAY') {
                this._overlayMutationObserver?.disconnect();
                this._overlayMutationObserver = undefined;
              }
            });
          }
        });
      });

      this._overlayMutationObserver.observe(overlay, {
        attributes: true,
      });
      this._overlayMutationObserver.observe(document.body, {
        childList: true,
      });
    }
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
        display: block;
        width: 100%;
      }
      vaadin-combo-box-light {
        position: relative;
      }
      ha-textfield {
        width: 100%;
      }
      ha-textfield > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      ha-svg-icon {
        color: var(--input-dropdown-icon-color);
        position: absolute;
        cursor: pointer;
      }
      ha-svg-icon.disabled {
        cursor: default;
        color: var(--disabled-text-color);
      }
      .toggle-button {
        right: 12px;
        top: -10px;
      }
      :host([opened]) .toggle-button {
        color: var(--primary-color);
      }
    `;
  }
}
