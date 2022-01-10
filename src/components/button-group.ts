import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { PrettyPrintIcon, PrettyPrintName } from '../helpers';
import { commonStyle } from '../styles';

export type ButtonItem = {
  name?: string;
  icon?: string;
  value?: string;
  id?: string;
  disabled?: boolean;
};

function name(item: ButtonItem) {
  return item.name?.trim() || item.value || item.id || '';
}

function value(item: ButtonItem, index: number) {
  return item.id || item.value || index;
}

@customElement('button-group')
export class ButtonGroup extends LitElement {
  @property({ type: Array }) items: ButtonItem[] = [];
  @property() value: string | null | number | (string | number)[] = null;
  @property({ type: Number }) min?: number;
  @property({ type: Boolean }) optional?: boolean;
  @property({ type: Boolean }) multiple?: boolean;

  render() {
    if (!this.items.length) {
      return html`
        <div class="text-field">
          <slot></slot>
        </div>
      `;
    }
    return this.items.map((val, key) => this.renderButton(val, key));
  }

  renderButton(item: ButtonItem, index: number) {
    const selection = Array.isArray(this.value) ? this.value : [this.value];
    const id = value(item, index);

    return html`
      <mwc-button
        class="${selection.includes(id) ? 'active' : ''}"
        ?disabled=${item.disabled}
        @click=${() => this.selectItem(id)}
      >
        ${item.icon
          ? html`
              <ha-icon icon="${PrettyPrintIcon(item.icon)}" class="padded-right"></ha-icon>
            `
          : ''}
        ${PrettyPrintName(name(item))}
      </mwc-button>
    `;
  }

  selectItem(val: string | number) {
    if (!Array.isArray(this.value)) {
      if (val == this.value) {
        if (this.optional) this.value = null;
        else return;
      } else this.value = val;
    } else if (!this.multiple) {
      this.value = this.value.includes(val) ? [] : Array(val);
    } else {
      let value = Array.isArray(this.value) ? [...this.value] : [];
      if (value.includes(val)) {
        if (this.min !== undefined && value.length <= this.min) return;
        value = value.filter(e => e != val);
      } else value.push(val);
      this.value = value;
    }

    const selection = Array.isArray(this.value)
      ? this.value.map(e => this.items.find((v, k) => value(v, k) == e))
      : this.value !== null
      ? this.items.find((v, k) => value(v, k) == this.value)
      : null;
    const myEvent = new CustomEvent('change', { detail: selection });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
