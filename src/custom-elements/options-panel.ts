import { LitElement, html, customElement, css, property } from 'lit-element';
import { localize } from '../localize/localize';
import { Config } from '../config';
import { ICondition, EConditionMatchType, EConditionType, IConditionConfig, IOptionConfig, IOptionPanelCfg } from '../types';

import './condition-entity-row';

@customElement('options-panel')
export class OptionsPanel extends LitElement {

  @property()
  Config?: Config;

  @property()
  group: string = "";

  @property()
  entity: string = "";

  @property()
  conditions?: IConditionConfig;

  @property()
  options?: IOptionConfig;

  @property()
  friendlyName?: string;

  @property()
  selectedItem: number | null = null;

  @property()
  editItem: number | null = null;

  @property()
  addCondition: boolean = false;

  render() {
    if (!this.Config) return html``;

    return html`
        <div class="card-section first">
          <div class="header">Conditions</div>
          <div style="float: right; margin-top: -1em">
            ${this.getConditionTypeSwitch()}
          </div>
          <div class="option-list" style="clear: both">
            ${this.renderConditions()}
          </div>
        </div>
        <div class="card-section">
          ${this.getAddButton()}
          ${this.getRemoveButton()}
        </div>
        ${this.renderAddCondition()}
        ${this.renderOptions()}
      `;
  }

  getConditionTypeSwitch() {
    return html`
      Any
      <ha-switch style="margin: 0px 10px" @change=${this.conditionTypeSwitchClick} ?disabled=${!this.conditions || this.conditions.items.length < 2} ?checked=${this.conditions?.type == EConditionType.All}></ha-switch>
      All`;
  }

  renderAddCondition() {
    if (!this.Config || !this.addCondition) return html``;
    return html`
        <div class="card-section">
          <div class="header">${localize('fields.group')}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetGroups(true)}
              value=${this.group}
              @change=${this.selectGroup}
            >
              ${localize('instructions.no_groups_defined')}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          <div class="header">${localize('fields.entity')}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetEntitiesForGroup(this.group, true)}
              value=${this.entity}
              @change=${this.selectEntity}
            >
              ${!this.group ? localize('instructions.no_group_selected') : localize('instructions.no_entities_for_group')}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          ${this.getConfirmButton()}
        </div>
    `;
  }

  renderOptions() {
    if (!this.Config || this.addCondition) return html``;
    return html`
        <div class="card-section">
          <div class="header">Friendly name</div>
          <div class="option-list">
            <paper-input no-label-float
              .value=${this.friendlyName || ''}
              .configValue=${''}
              @value-changed=${this.updateName}
            ></paper-input>
          </div>
        </div>
        <div class="card-section">
          <div class="header">Other</div>
          <div class="option-item checkbox-container">
            <div class="checkbox">
              <ha-switch @change="${this.updateRunOnce}" ?checked=${this.options && 'run_once' in this.options && this.options['run_once']}></ha-switch>
            </div>
            <div class="label">
              Disable automatically after triggering
            </div>
          </div>
        </div>
    `;
  }

  getAddButton() {
    return html`
      <mwc-button @click="${this.addConditionClick}" class="${this.addCondition ? 'active' : ''}">
        <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
        Add
      </mwc-button>
    `;
  }

  getRemoveButton() {
    if (this.selectedItem !== null) {
      return html`
          <mwc-button @click="${this.removeConditionClick}">
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            Remove
          </mwc-button>
      `;
    } else {
      return html`
          <mwc-button disabled>
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            Remove
          </mwc-button>
      `;
    }
  }

  getConfirmButton() {
    if (this.entity) {
      return html`
        <mwc-button @click="${this.confirmConditionClick}">
          <ha-icon icon="hass:check-circle-outline" class="padded-right"></ha-icon>
          Confirm
        </mwc-button>
    `;
    } else {
      return html`
        <mwc-button disabled>
          <ha-icon icon="hass:check-circle-outline" class="padded-right"></ha-icon>
          Confirm
        </mwc-button>
    `;
    }
  }

  renderConditions() {
    if (!this.Config) return html``;
    let conditions = this.conditions?.items || [];
    conditions = conditions.filter(e => this.Config?.FindEntity(e.entity)?.states);
    if (!conditions.length) return html`<div class="text-field">No conditions yet</div>`;

    return conditions.map((item, num) => {
      return html`
        <condition-entity-row
          .item=${item}
          .Config=${this.Config}
          .selected=${this.selectedItem === num}
          .editMode=${this.editItem === num}
          @change="${(e) => this.updateCondition(e, num)}"
        >
        </condition-entity-row>
      `;
    });
  }

  updateCondition(e: CustomEvent, num: number) {
    let selected = e.detail.selected;
    if (selected) {
      this.selectedItem = num;
      this.editItem = null;
    }
    else {
      if (this.selectedItem == num) this.selectedItem = null;
      if (this.editItem != num) this.editItem = num;
      let conditions = [...this.conditions!.items!];
      conditions[num] = { ...e.detail.item };
      Object.assign(this.conditions, <IConditionConfig>{ items: conditions });
      this.fireEvent();
    }
  }

  selectGroup(e: Event) {
    this.selectedItem = null;
    this.editItem = null;
    let value = (e.target as HTMLInputElement).value;
    this.group = value;
    this.entity = "";
  }

  selectEntity(e: Event) {
    this.selectedItem = null;
    this.editItem = null;
    let value = (e.target as HTMLInputElement).value;
    this.entity = value;
  }

  addConditionClick() {
    this.addCondition = !this.addCondition;
    this.editItem = null;
    this.selectedItem = null;
  }

  confirmConditionClick() {
    if (!this.entity || !this.Config) return;
    let states = this.Config.FindEntity(this.entity)!.states!;
    let default_state = Array.isArray(states) ? states[0] : Math.round((states.min + states.max) / 2 / states.step) * states.step;

    let condition: ICondition = {
      entity: this.entity,
      match_type: EConditionMatchType.Equal,
      state: default_state
    }
    let conditions = this.conditions?.items.length ? [...this.conditions.items] : [];
    let type = (!this.conditions?.type) ? EConditionType.Any : this.conditions.type;
    conditions.push(condition);
    this.conditions = <IConditionConfig>{ items: conditions, type: type };
    this.group = "";
    this.entity = "";
    this.selectedItem = null;
    this.addCondition = false;
    this.fireEvent();
  }

  removeConditionClick() {
    if (this.selectedItem === null) return;
    let conditions = [...this.conditions!.items];
    conditions.splice(this.selectedItem, 1);
    Object.assign(this.conditions, <IConditionConfig>{ items: conditions });
    this.selectedItem = null;
    this.fireEvent();
  }

  conditionTypeSwitchClick(e: Event) {
    let checked = (e.target as HTMLInputElement).checked;
    let type = checked ? EConditionType.All : EConditionType.Any;
    Object.assign(this.conditions, <IConditionConfig>{ type: type });
    this.fireEvent();
  }

  updateName(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    if (value == this.friendlyName) return;
    this.friendlyName = value;
    this.fireEvent();
  }

  updateRunOnce(e: Event) {
    let checked = (e.target as HTMLInputElement).checked;
    let options = { ...this.options };
    if (checked) Object.assign(options, { run_once: true });
    else if ('run_once' in options) delete options['run_once'];
    this.options = options;
    this.fireEvent();
  }

  fireEvent() {
    let data: IOptionPanelCfg = {
      conditions: this.conditions,
      options: this.options,
      friendly_name: this.friendlyName
    };
    let myEvent = new CustomEvent("change", { detail: data });
    this.dispatchEvent(myEvent);
  }

  static styles = css`

      .header {
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        margin: 0px 0px 0px 0px;
      }

      div.card-section {
        padding: 10px 10px;
      }

      div.card-section.first {
        padding-top: 0px;
      }
      
      div.card-section.last {
        padding-bottom: 10px;
      }

      div.text-field {
        color: var(--disabled-text-color);
      }
      
      div.option-item {
        padding: 2px 5px;
        display: flex;
        align-items: center;
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }

      
      div.checkbox-container {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: min-content;
        grid-template-areas: "checkbox label";
        grid-gap: 0px 20px;
        margin: 5px;
      }

      div.checkbox-container .checkbox {
        grid-area: checkbox;
        display: flex;
        align-items: center;
      }

      div.checkbox-container .label {
        grid-area: label;
        display: flex;
        align-items: center;
      }

  `;
}
