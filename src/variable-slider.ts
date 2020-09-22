import { LitElement, html, customElement, css, property } from 'lit-element';
import './ha-paper-slider';
//import './ha-checkbox';


function Bool(val: string) {
  if (val == "true") return true;
  else if (val == "false") return false;
  else if (val.length) return true;
  else return false;
}

@customElement('variable-slider')
export class VariableSlider extends LitElement {

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  show_percentage = "false";

  @property({ type: String })
  unit = '';

  @property({ type: String })
  optional = "false";

  @property({ type: String })
  disabled = "false";

  scaleGain = 1;
  scaleOffset = 0;

  updated() {
  }

  firstUpdated() {
    if (Bool(this.show_percentage)) {
      this.unit = '%';
      this.scaleOffset = this.min;
      this.scaleGain = (this.max - this.min) / 100;
      this.min = 0;
      this.max = 100;
    }
    if (Bool(this.disabled) && !Bool(this.optional)) this.disabled = "false";
    if (isNaN(this.value)) this.value = this.min;

    this.requestUpdate();
  }


  render() {
    return html`
      <div class="container">
        <div class="checkbox">
        ${this.getCheckbox()}
        </div>
        <div class="slider">
        ${this.getSlider()}
        </div>
        <div class="value${Bool(this.disabled) ? ' disabled' : ''}">
        ${this.getScaledValue()}${this.unit}
        </div>
    `;
  }

  getScaledValue() {
    let value = this.value;
    let scaledValue = Math.round((value - this.scaleOffset) / this.scaleGain);
    if (scaledValue < this.min) scaledValue = this.min;
    else if (scaledValue > this.max) scaledValue = this.max;
    return Math.round((scaledValue * this.step) / this.step);
  }

  getSlider() {
    if (!Bool(this.disabled)) {
      return html`
        <ha-paper-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.getScaledValue()}
        @change=${this.updateValue}
        ></ha-paper-slider>`;
    } else {
      return html`
        <ha-paper-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.getScaledValue()}
        disabled
        ></ha-paper-slider>`;
    }
  }

  getCheckbox() {
    if (!Bool(this.optional)) return html``;
    if (Bool(this.disabled)) return html`<input type="checkbox" @change="${this.toggleChecked}" style="width: 16px; height: 16px" />`;
    else return html`<input type="checkbox" @change="${this.toggleChecked}" checked="checked" style="width: 16px; height: 16px" />`;
  }

  toggleChecked(e: Event) {
    let checked = (e.target as HTMLInputElement).checked;
    this.disabled = checked ? "false" : "true";
  }

  updateValue(e: Event) {
    let value = Number((e.target as HTMLInputElement).value);
    let unscaledValue = value * this.scaleGain + this.scaleOffset;
    unscaledValue = Math.round(unscaledValue * this.step) / this.step;
    this.value = unscaledValue;
  }

  static styles = css`

      :host {
        width: 100%;
      }

      div.container {
        display: grid;
        grid-template-columns: min-content 1fr max-content;
        grid-template-rows: min-content;
        grid-template-areas: "checkbox slider value";
      }

      div.checkbox {
        grid-area: checkbox;
        display: flex;
        align-items: center;
      }

      div.slider {
        grid-area: slider;
        display: flex;
        align-items: center;
      }

      div.value {
        grid-area: value;
        min-width: 40px;
        display: flex;
        align-items: center;
      }

      ha-paper-slider {
        width: 100%;
        --paper-slider-pin-start-color: var(--primary-color);
      }
      
       .disabled {
        color: var(--disabled-text-color);
      }
  `;
}
