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
  set value(value: number) {
    value = isNaN(value) ? this.min : this._roundedValue(value / this.scaleFactor);
    this._displayedValue = value;
  }

  @property({ type: Number })
  scaleFactor = 1;

  @property({ type: String })
  unit = '';

  @property({ type: Boolean })
  optional = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Number })
  _displayedValue = 0;

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
          ${this._displayedValue}${this.unit}
        </div>
      </div>
    `;
  }

  getSlider() {
    if (!this.disabled) {
      return html`
        <ha-slider
          labeled
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          @change=${this._updateValue}
        ></ha-slider>
      `;
    } else {
      return html`
        <ha-slider
          labeled
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          disabled
        ></ha-slider>
      `;
    }
  }

  getCheckbox() {
    if (!this.optional) return html``;
    return html`
      <ha-checkbox @change=${this.toggleChecked} ?checked=${!this.disabled}></ha-checkbox>
    `;
  }

  toggleChecked(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.disabled = !checked;
    const value = this.disabled ? null : this._scaledValue(this._displayedValue);
    fireEvent(this, 'value-changed', { value: value });
  }

  private _updateValue(e: Event) {
    let value = Number((e.target as HTMLInputElement).value);
    this._displayedValue = value;
    value = this._scaledValue(this._displayedValue);
    fireEvent(this, 'value-changed', { value: value });
  }

  private _roundedValue(value: number) {
    value = Math.round(value / this.step) * this.step;
    value = parseFloat(value.toPrecision(12));
    if (value > this.max) value = this.max;
    else if (value < this.min) value = this.min;
    return value;
  }

  private _scaledValue(value: number) {
    value = this._roundedValue(value);
    value = value * this.scaleFactor;
    value = parseFloat(value.toFixed(2));
    return value;
  }

  static styles = css`
    ${commonStyle} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
    }
  `;
}
