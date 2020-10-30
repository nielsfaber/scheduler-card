import { LitElement, html, customElement, property } from 'lit-element';
import { PrettyPrintIcon, PrettyPrintName } from '../helpers';
import { commonStyle } from '../styles';

type ButtonItem = {
  id?: string | number;
  name: string;
  icon?: string;
};

@customElement('button-group')
export class VariableSlider extends LitElement {
  @property({ type: Array })
  items: (ButtonItem | string | number)[] = [];

  @property()
  value?: string | number | null | (string | number)[];

  @property({ type: Number })
  min?: number;

  @property({ type: Boolean })
  optional?: boolean;

  render() {
    if (!this.items.length) {
      return html`
        <div class="text-field">
          <slot></slot>
        </div>
      `;
    }

    return this.items.map(e => this.createButton(e));
  }

  createButton(item: ButtonItem | string | number) {
    const selection = Array.isArray(this.value) ? this.value : [this.value];
    if (typeof item != 'object') item = { name: String(item) };
    const value = item.id !== undefined ? item.id : item.name;

    return html`
      <mwc-button class="${selection.includes(value) ? 'active' : ''}" @click="${() => this.selectItem(value)}">
        ${item.icon
          ? html`
              <ha-icon icon="${PrettyPrintIcon(item.icon)}" class="padded-right"></ha-icon>
            `
          : ''}
        ${PrettyPrintName(item.name)}
      </mwc-button>
    `;
  }

  selectItem(val: string | number) {
    if (!Array.isArray(this.value)) {
      if (val == this.value) {
        if (this.optional) this.value = null;
        else return;
      } else this.value = val;
    } else {
      let value: (string | number)[] = Array.isArray(this.value) ? this.value : [];
      if (value.includes(val)) {
        if (this.min !== undefined && value.length <= this.min) return;
        value = value.filter(e => e != val);
      } else value.push(val);
      this.value = value;
    }
    const myEvent = new CustomEvent('change');
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
