import { LitElement, html, customElement, property } from 'lit-element';
import { localize } from '../localize/localize';
//import { Config } from '../config';
import { EConditionType, CardConfig, Entry, EntityElement, Condition, EConditionMatchType } from '../types';

import './condition-entity-row';
import { HomeAssistant } from 'custom-card-helpers';
import { entityGroups } from '../group';
import { entityConfig, entityFilter } from '../entity';
import { commonStyle } from '../styles';

@customElement('scheduler-options-card')
export class SchedulerOptionsCard extends LitElement {

  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() entries: Entry[] = [];
  @property() friendlyName?: string;

  @property() selectedGroup?: string;
  @property() selectedEntity?: string;

  @property()
  editItem: number | null = null;

  @property()
  selectedItem: number | null = null;

  @property()
  addCondition: boolean = false;

  render() {
    if (!this.hass || !this.config) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
          </ha-icon-button>
        </div>
        <div class="card-content">

        ${!this.addCondition ? html`
          <div class="header">Conditions</div>
          <div style="float: right; margin-top: -1em">
            Any
              <ha-switch
                style="margin: 0px 10px"
                @change=${this.conditionTypeSwitchClick}
                ?disabled=${!this.entries[0].conditions || this.entries[0].conditions.items.length < 2}
                ?checked=${this.entries[0].conditions?.type == EConditionType.All}
              ></ha-switch>
            All
            
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
          <mwc-button @click=${this.addConditionClick}>
            <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
            Add
          </mwc-button>
          <mwc-button @click="${this.removeConditionClick}" ?disabled=${this.selectedItem === null}>
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            Remove
          </mwc-button>
          </div>

          <div class="header">Friendly name</div>
          <paper-input no-label-float
            .value=${this.friendlyName || ''}
            .configValue=${''}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">Other</div>
          <div class="checkbox-container">
            <div class="checkbox">
              <ha-switch @change="${this.updateRunOnce}" ?checked=${this.entries[0].options && 'run_once' in this.entries[0].options && this.entries[0].options['run_once']}></ha-switch>
            </div>
            <div class="slider">
              Disable automatically after triggering
            </div>
          </div>
          
        ` : html`
          ${this.renderAddCondition()}
        `}
        </div>
        <div class="card-actions">
          ${!this.addCondition ? html`
            <mwc-button @click=${this.saveClick}>${localize('actions.save')}</mwc-button>
            <mwc-button @click=${this.backClick} style="float: right">back</mwc-button>
          ` : html`
            <mwc-button @click=${this.confirmConditionClick}>Confirm</mwc-button>
          `}
        </div>
      </ha-card>
      `;
  }

  renderAddCondition() {
    if (!this.addCondition || !this.hass || !this.config) return html``;

    let hassEntities = Object.keys(this.hass.states)
      .filter(e => entityFilter(e, this.hass!, this.config!, { states: true }));
    let groups = entityGroups(hassEntities, this.config!);
    groups.sort((a, b) => a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1);

    let entities: EntityElement[] = [];
    if (this.selectedGroup) {
      entities = groups.find(e => e.id == this.selectedGroup)!.entities
        .map(e => entityConfig(e, this.hass!, this.config!))
        .filter(e => e) as EntityElement[];
      entities.sort((a, b) => a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1);
    }

    return html`
      <div class="header">${localize('fields.group')}</div>
      <button-group
        .items=${groups}
        value=${this.selectedGroup}
        @change=${this.selectGroup}
      >
        ${localize('instructions.no_groups_defined')}
      </button-group>
      
      <div class="header">${localize('fields.entity')}</div>
      <button-group
        .items=${entities}
        value=${this.selectedEntity}
        @change=${this.selectEntity}
      >
        ${!this.selectedGroup ? localize('instructions.no_group_selected') : localize('instructions.no_entities_for_group')}
      </button-group>
    `;
  }

  selectGroup(ev: Event) {
    this.selectedItem = null;
    this.editItem = null;
    this.selectedGroup = (ev.target as HTMLInputElement).value;
    this.selectedEntity = undefined;
  }

  selectEntity(e: Event) {
    this.selectedItem = null;
    this.editItem = null;
    this.selectedEntity = (e.target as HTMLInputElement).value;
  }

  renderConditions() {
    let conditions = this.entries[0].conditions?.items || [];
    if (!conditions.length) return html`<div class="text-field">No conditions yet</div>`;
    return conditions.map((item, num) => {
      return html`
        <condition-entity-row
          .item=${item}
          .hass=${this.hass}
          .config=${this.config}
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
      let items = [...this.entries[0].conditions!.items!];
      items[num] = { ...e.detail.item };
      this.entries = this.entries.map(e => Object.assign(e, {
        conditions: Object.assign(e.conditions, {
          items: items
        })
      }));
    }
  }

  addConditionClick() {
    this.addCondition = !this.addCondition;
    this.editItem = null;
    this.selectedItem = null;
  }

  confirmConditionClick() {
    if (!this.selectedEntity || !this.config || !this.hass) return;

    const states = entityConfig(this.selectedEntity, this.hass, this.config)!.states!;
    const step = Array.isArray(states) ? 1 : states.step || 1;
    let default_state = Array.isArray(states) ? states[0] : Number((Math.round((states.min + states.max) / 2 / step) * step).toPrecision(5));
    let condition: Condition = {
      entity: this.selectedEntity,
      match_type: EConditionMatchType.Equal,
      state: default_state
    }
    let conditions = this.entries[0].conditions?.items.length ? [...this.entries[0].conditions.items] : [];
    let type = (!this.entries[0].conditions?.type) ? EConditionType.Any : this.entries[0].conditions.type;
    conditions.push(condition);
    this.entries = this.entries.map(e => Object.assign(e, {
      conditions: { items: conditions, type: type }
    }));
    this.selectedEntity = undefined;
    this.selectedGroup = undefined;
    this.selectedItem = null;
    this.addCondition = false;
  }

  removeConditionClick() {
    if (this.selectedItem === null) return;
    let items = [...this.entries[0].conditions!.items];
    items.splice(this.selectedItem, 1);
    this.entries = this.entries.map(e => Object.assign(e, {
      conditions: Object.assign(e.conditions, {
        items: items
      })
    }));
    this.selectedItem = null;
  }

  conditionTypeSwitchClick(e: Event) {
    let checked = (e.target as HTMLInputElement).checked;
    let type = checked ? EConditionType.All : EConditionType.Any;
    this.entries = this.entries.map(e => Object.assign(e, {
      conditions: Object.assign(e.conditions, {
        type: type
      })
    }));
  }

  updateName(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    if (value == this.friendlyName) return;
    this.friendlyName = value;
  }

  updateRunOnce(e: Event) {
    let checked = (e.target as HTMLInputElement).checked;
    let options = { ...this.entries[0].options };
    if (checked) Object.assign(options, { run_once: true });
    else if ('run_once' in options) delete options['run_once'];

    this.entries = this.entries.map(e => Object.assign(e, {
      options: options
    }));
  }

  cancelClick() {
    if (this.addCondition) {
      this.addCondition = !this.addCondition;
      this.editItem = null;
      this.selectedItem = null;
    }
    else {
      let myEvent = new CustomEvent("cancelClick");
      this.dispatchEvent(myEvent);
    }
  }

  saveClick() {
    let myEvent = new CustomEvent("saveClick", {
      detail: {
        entries: this.entries,
        friendlyName: this.friendlyName,
      }
    });
    this.dispatchEvent(myEvent);
  }

  backClick() {
    let myEvent = new CustomEvent("backClick", {
      detail: {
        entries: this.entries,
        friendlyName: this.friendlyName,
      }
    });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
