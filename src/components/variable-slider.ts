import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { loadHaForm } from '../load-ha-form';
import { commonStyle } from '../styles';
import { fireEvent } from 'custom-card-helpers';

@customElement('variable-slider')
export class VariableSlider extends LitElement {
  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 255;

  @property({ type: Number })
  step = 1;

  //raw value
  @property({ type: Number })
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    if (isNaN(value)) value = this.min;
    value = value / this.scaleFactor;
    value = Math.round(value / this.step) * this.step;
    value = parseFloat(value.toPrecision(12));
    if (value > this.max) value = this.max;
    else if (value < this.min) value = this.min;
    this._value = value;
  }

  @property({ type: Number })
  scaleFactor = 1;

  @property({ type: String })
  unit = '';

  @property({ type: Boolean })
  optional = false;

  @property({ type: Boolean })
  disabled = false;

  //displayed value
  @property({ type: Number })
  _value: number = 0;

  firstUpdated() {
    (async () => await loadHaForm())();

    if (this.disabled && !this.optional) {
      this.disabled = false;
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="checkbox-container">
        <div class="checkbox">
          ${this.getCheckbox()}
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}">
          ${this._value}${this.unit}
        </div>
      </div>
    `;
  }

  getSlider() {
    if (!this.disabled) {
      return html`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._value}
          @change=${this._updateValue}
        ></ha-slider>
      `;
    } else {
      return html`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._value}
          disabled
        ></ha-slider>
      `;
    }
  }

  getCheckbox() {
    if (!this.optional) return html``;
    return html`
      <ha-checkbox @change="${this.toggleChecked}" ?checked=${!this.disabled}> </ha-checkbox>
    `;
  }

  toggleChecked(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.disabled = !checked;
    let value = this.disabled
      ? null
      : Math.round(this._value * this.scaleFactor);
    fireEvent(this, 'value-changed', { value: value });
  }

  private _updateValue(e: Event) {
    let value = Number((e.target as HTMLInputElement).value);
    // rely on the code in set value(), above, rather than duplicating it here
    this.value = value;
    fireEvent(this, 'value-changed', { value: this.value });
  }

  static styles = css`
    ${commonStyle} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `;
}
