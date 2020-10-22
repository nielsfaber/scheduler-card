import { LitElement, html, customElement, css, property } from 'lit-element';
import { Condition, EConditionMatchType, CardConfig, EntityElement } from '../types';
import { PrettyPrintIcon, PrettyPrintName } from '../helpers';
import { HomeAssistant, computeEntity } from 'custom-card-helpers';
import { entityConfig } from '../entity';
import { DefaultEntityIcon } from '../const';

@customElement('condition-entity-row')
export class ConditionEntityRow extends LitElement {

  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() item?: Condition;
  @property() selected: boolean = false;
  @property() entity?: EntityElement;

  timer: any;

  @property()
  editMode: boolean = false;

  firstUpdated() {
    if (!this.hass || !this.config || !this.item) return;
    this.entity = entityConfig(this.item.entity, this.hass, this.config)!;
  }

  render() {
    if (!this.item || !this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.item.entity];

    if (!this.entity || !stateObj) {
      return html`
        <hui-warning>
          Entity not found '${this.item.entity}'
        </hui-warning>
      `;
    }

    return html`
      <div class="list-item">
        <mwc-button @click="${this.entityButtonClick}" class="${this.selected ? 'active' : ''}">
          <ha-icon icon="${PrettyPrintIcon(this.entity.icon || DefaultEntityIcon)}"></ha-icon>
          ${PrettyPrintName(this.entity.name || stateObj.attributes.friendly_name || computeEntity(stateObj.entity_id))}
        </mwc-button>
          ${this.getMatchTypeButton()}
          ${this.getStateButton()}
        </div>
      </div>
    `;
  }

  entityButtonClick() {
    this.selected = !this.selected;
    this.fireEvent();
  }

  getMatchTypeButton() {
    if (!this.item) return html``;
    let value;
    let matchType = this.item.match_type;
    if (matchType == EConditionMatchType.Equal) value = "is";
    else if (matchType == EConditionMatchType.Unequal) value = "is not";
    else if (matchType == EConditionMatchType.Below) value = "below";
    else if (matchType == EConditionMatchType.Above) value = "above";

    return html`
      <mwc-button @click="${this.matchTypeButtonClick}">
        ${value}
      </mwc-button>
    `;
  }

  matchTypeButtonClick() {
    this.selected = false;
    this.editMode = false;
    if (!this.item) return;
    let matchType = this.item.match_type;
    let value;
    if (typeof this.item.state == "string") {
      if (matchType == EConditionMatchType.Equal) value = EConditionMatchType.Unequal;
      else if (matchType == EConditionMatchType.Unequal) value = EConditionMatchType.Equal;
    }
    else {
      if (matchType == EConditionMatchType.Equal) value = EConditionMatchType.Unequal;
      else if (matchType == EConditionMatchType.Unequal) value = EConditionMatchType.Below;
      else if (matchType == EConditionMatchType.Below) value = EConditionMatchType.Above;
      else if (matchType == EConditionMatchType.Above) value = EConditionMatchType.Equal;
    }
    this.item = Object.assign({ ...this.item }, <Condition>{ match_type: value });

    this.fireEvent();
  }


  getStateButton() {
    if (!this.item) return html``;
    if (typeof this.item.state == "string") {
      return html`
        <mwc-button @click="${this.stateButtonClick}">
          ${PrettyPrintName(this.item.state)}
        </mwc-button>
      `;
    } else if (!this.editMode) {
      return html`
        <mwc-button class="button" @click="${this.toggleEditMode}">
          ${this.getState()}
        </mwc-button>
      `;
    } else {
      return html`
        <div class="button-container">
          <div class="button-left">
            <mwc-button class="arrow-button"
              @mousedown="${() => this.stateDecrement()}"
              @touchstart="${() => this.stateDecrement()}"
              @mouseup="${this.stateUpdateStop}"
              @mouseout="${this.stateUpdateStop}"
              @touchend="${this.stateUpdateStop}"
              @touchcancel="${this.stateUpdateStop}"
              @blur="${this.stateUpdateStop}"
            >
              <ha-icon icon="hass:chevron-left"></ha-icon>
            </mwc-button>
          </div>
          <div class="value">
            <mwc-button class="button" @click="${this.toggleEditMode}">
              ${this.getState()}
            </mwc-button>
          </div>
          <div class="button-right">
            <mwc-button class="arrow-button"
              @mousedown="${() => this.stateIncrement()}"
              @touchstart="${() => this.stateIncrement()}"
              @mouseup="${this.stateUpdateStop}"
              @mouseout="${this.stateUpdateStop}"
              @touchend="${this.stateUpdateStop}"
              @touchcancel="${this.stateUpdateStop}"
              @blur="${this.stateUpdateStop}"
            >
              <ha-icon icon="hass:chevron-right"></ha-icon>
            </mwc-button>
          </div>
        </div>
      `;
    }
  }

  stateButtonClick() {
    if (!this.item || !this.entity) return;
    this.selected = false;
    let state = this.item.state;
    const states = this.entity.states;
    if (!states || !Array.isArray(states)) return;
    let i = 0;
    for (i = 0; i < states.length; i++) {
      if (states[i] == state) break;
    }
    let value = i < (states.length - 1) ? states[i + 1] : states[0];
    this.item = Object.assign({ ...this.item }, { state: value });
    this.fireEvent();
  }

  stateDecrement(time: number | null = null) {
    if (!this.item || !this.entity) return;
    clearTimeout(this.timer);
    let state = Number(this.item.state);
    const cfg = this.entity.states;
    if (!cfg || Array.isArray(cfg)) return;
    let step = cfg.step || 1;
    state = state - step;
    if (state < cfg.min) state = cfg.min;
    state = Number((Math.round(state / step) * step).toPrecision(5));
    this.item = Object.assign({ ...this.item }, { state: state });
    let timeout = time !== null ? Number(time * 0.9) : 300;
    if (timeout < 50) timeout = 50;
    this.timer = setTimeout(() => {
      this.stateDecrement(timeout);
    }, timeout);
  }

  stateIncrement(time: number | null = null) {
    if (!this.item || !this.entity) return;
    clearTimeout(this.timer);
    let state = Number(this.item.state);
    const cfg = this.entity.states;
    if (!cfg || Array.isArray(cfg)) return;
    let step = cfg.step || 1;
    state = state + step;
    if (state > cfg.max) state = cfg.max;
    state = Number((Math.round(state / step) * step).toPrecision(5));
    this.item = Object.assign({ ...this.item }, { state: state });

    let timeout = time !== null ? Number(time * 0.9) : 300;
    if (timeout < 50) timeout = 50;
    this.timer = setTimeout(() => {
      this.stateIncrement(timeout);
    }, timeout);
  }

  stateUpdateStop() {
    clearTimeout(this.timer);
    this.fireEvent();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  getState() {
    if (!this.item || !this.entity) return;
    let state = this.item.state;
    let cfg = this.entity.states!;
    if (!Array.isArray(cfg) && cfg.unit) return `${state}${cfg.unit}`;
    return state;
  }

  fireEvent() {
    let data = {
      item: this.item,
      selected: this.selected
    };
    let myEvent = new CustomEvent("change", { detail: data });
    this.dispatchEvent(myEvent);
  }

  static styles = css`
      div.list-item {
        background: none;
        cursor: pointer;
        padding: 2px 10px;
        margin: 5px 0px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-radius: 4px;
        background: none;
        opacity: 0.1;
      }

      mwc-button ha-icon {
        margin-right: 11px;
      }

      mwc-button {
        margin: 2px 0px;
        --mdc-button-disabled-ink-color: var(--primary-color);
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }

      div.button-container {
        display: grid;
        grid-template-columns: min-content min-content min-content;
        grid-template-areas: "button-left value button-right";      
      }

      div.button-container .button-left {grid-area: button-left}
      div.button-container .value {grid-area:value}
      div.button-container .button-right {grid-area: button-right}

      mwc-button.arrow-button {
        padding: 0px;
        margin: 0px;
        --mdc-button-horizontal-padding: 0px;
      }

      .mdc-button {
        min-width: 20px !important;
      }
  `;
}
