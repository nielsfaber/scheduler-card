import { LitElement, html, customElement, css, property } from 'lit-element';

import { loadHaForm } from '../load-ha-form';
import { UnitPercent } from '../const';
import { commonStyle } from '../styles';

@customElement('variable-slider')
export class VariableSlider extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) value = 0;
  @property({ type: String }) unit = '';
  @property({ type: Boolean }) optional = false;
  @property({ type: Boolean }) disabled = false;

  scaleGain = 1;
  scaleOffset = 0;

  firstUpdated() {
    (async () => await loadHaForm())();

    if (this.unit == UnitPercent) {
      this.scaleOffset = this.min;
      this.scaleGain = (this.max - this.min) / 100;
      this.min = 0;
      this.max = 100;
    }
    if (this.disabled && !this.optional) this.disabled = false;
    if (isNaN(this.value)) this.value = this.min;

    this.requestUpdate();
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
          ${this.getScaledValue()}${this.unit}
        </div>
      </div>
    `;
  }

  getScaledValue() {
    const value = this.value;
    let scaledValue = (value - this.scaleOffset) / this.scaleGain;
    scaledValue = Math.round(scaledValue / this.step) * this.step;
    scaledValue = parseFloat(scaledValue.toPrecision(12));
    if (scaledValue < this.min) scaledValue = this.min;
    else if (scaledValue > this.max) scaledValue = this.max;
    return scaledValue;
  }

  getSlider() {
    if (!this.disabled) {
      return html`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
          @change=${this.updateValue}
        ></ha-slider>
      `;
    } else {
      return html`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
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
    const myEvent = new CustomEvent('change');
    this.dispatchEvent(myEvent);
  }

  updateValue(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    let unscaledValue = value * this.scaleGain + this.scaleOffset;
    unscaledValue = Math.round(unscaledValue / this.step) * this.step;
    unscaledValue = parseFloat(unscaledValue.toPrecision(12));
    this.value = unscaledValue;
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
