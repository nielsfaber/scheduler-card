import { LitElement, html, customElement, property, css } from 'lit-element';
import { localize } from '../localize/localize';
//import { Config } from '../config';
import { EConditionType, CardConfig, Entry, EntityElement, Condition, EConditionMatchType, ScheduleConfig, ListVariableOption, Dictionary, ERepeatType } from '../types';

import { HomeAssistant, computeDomain } from 'custom-card-helpers';
import { entityGroups } from '../data/entity_group';
import { commonStyle } from '../styles';
import { parseEntity } from '../data/parse_entity';
import { entityFilter } from '../data/filter_entity';
import { DefaultEntityIcon } from '../const';
import { PrettyPrintIcon, PrettyPrintName, pick } from '../helpers';
import { standardStates } from '../standard-configuration/standardStates';

import './button-group';

@customElement('scheduler-options-card')
export class SchedulerOptionsCard extends LitElement {
  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() schedule?: ScheduleConfig;

  @property() selectedGroup?: string;
  @property() selectedEntity?: string;
  @property() conditionMatchType?: EConditionMatchType;
  @property() conditionValue?: string | number;
  @property() editItem?: number;

  @property() addCondition = false;

  matchTypes: Dictionary<ListVariableOption> = {};

  firstUpdated() {
    this.matchTypes = {
      [EConditionMatchType.Above]:
      {
        value: EConditionMatchType.Above,
        name: this.hass!.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.above'),
        icon: "hass:greater-than"
      },
      [EConditionMatchType.Below]:
      {
        value: EConditionMatchType.Below,
        name: this.hass!.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.below'),
        icon: "hass:less-than"
      },
      [EConditionMatchType.Equal]:
      {
        value: EConditionMatchType.Equal,
        name: localize('ui.panel.conditions.equal_to', this.hass!.language),
        icon: "hass:equal"
      },
      [EConditionMatchType.Unequal]:
      {
        value: EConditionMatchType.Unequal,
        name: localize('ui.panel.conditions.unequal_to', this.hass!.language),
        icon: "hass:not-equal-variant"
      }
    };
  }

  render() {
    if (!this.hass || !this.config || !this.schedule) return html``;

    const repeatTypes = [
      {
        name: this.hass.localize('ui.panel.config.automation.editor.actions.type.repeat.label'),
        id: ERepeatType.Repeat,
        icon: 'refresh',
      },
      {
        name: this.hass.localize('ui.dialogs.more_info_control.vacuum.stop'),
        id: ERepeatType.Pause,
        icon: 'stop',
      },
      {
        name: this.hass.localize('ui.common.delete'),
        id: ERepeatType.Single,
        icon: 'trash-can-outline',
      },
    ];

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
        ? typeof this.config.title == 'string'
          ? this.config.title
          : ''
        : localize('ui.panel.common.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${!this.addCondition
        ? html`

          <div class="header">
            ${this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.conditions')}
          ${
          !this.schedule.timeslots[0].conditions || this.schedule.timeslots[0].conditions.length < 2
            ? ''
            : html`
            <div class="switch">
            ${localize('ui.panel.conditions.any', this.hass.language)}
            <ha-switch
              style="margin: 0px 10px"
              @change=${this.conditionTypeSwitchClick}
              ?checked=${this.schedule.timeslots[0].condition_type == EConditionType.All}
            ></ha-switch>
            ${localize('ui.panel.conditions.all', this.hass.language)}         
            </div>`
          }
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
            <mwc-button @click=${this.addConditionClick}>
              <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
              ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
            </mwc-button>
          </div>

          <div class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}</div>
          <paper-input no-label-float
            .value=${this.schedule.name || ''}
            .configValue=${''}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">${localize('ui.panel.options.repeat_type', this.hass.language)}</div>
          <button-group
            .items=${repeatTypes}
            value="${this.schedule.repeat_type}"
            @change=${this.updateRepeatType}>
          </button-group>
          
        `
        : this.renderAddCondition()}
        </div>
        <div class="card-actions">
          ${!this.addCondition
        ? html`
                <mwc-button @click=${this.saveClick}>${this.hass.localize('ui.common.save')}</mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize('ui.common.back')}</mwc-button
                >
              `
        : html`
                <mwc-button @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity || !this.conditionMatchType || !this.conditionValue}
                  >${this.hass.localize('ui.common.save')}</mwc-button
                >
                ${this.editItem !== undefined
            ? html`
                <mwc-button class="warning" @click=${this.deleteConditionClick}
                    >${this.hass.localize('ui.common.delete')}</mwc-button>`
            : ''}              
                <mwc-button @click=${this.cancelConditionClick} style="float: right"
                  >${this.hass.localize('ui.common.cancel')}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `;
  }

  renderAddCondition() {
    if (!this.addCondition || !this.hass || !this.config) return html``;

    if (!this.selectedEntity) {

      const hassEntities = Object.keys(this.hass.states)
        .filter(e => entityFilter(e, this.config!))
        .filter(e => standardStates(e, this.hass!)?.length || computeDomain(e) == "sensor");

      const groups = entityGroups(hassEntities, this.config, this.hass);
      groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));

      let entities: EntityElement[] = [];
      if (this.selectedGroup) {
        entities = groups
          .find(e => e.id == this.selectedGroup)!
          .entities.map(e => parseEntity(e, this.hass!, this.config!));

        entities.sort((a, b) => (a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1));
      }

      return html`
      <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>
      
      <button-group .items=${groups} value=${this.selectedGroup} @change=${this.selectGroup}>
        ${localize('ui.panel.entity_picker.no_groups_defined', this.hass.language)}
      </button-group>

      <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
      <button-group .items=${entities} value=${this.selectedEntity} @change=${this.selectEntity}>
        ${!this.selectedGroup
          ? localize('ui.panel.entity_picker.no_group_selected', this.hass.language)
          : localize('ui.panel.entity_picker.no_entities_for_group', this.hass.language)}
      </button-group>
    `;
    }
    else {
      const entity = parseEntity(this.selectedEntity, this.hass!, this.config!);
      const stateObj = this.hass!.states[this.selectedEntity];
      const states = standardStates(this.selectedEntity, this.hass);
      const matchTypes = computeDomain(this.selectedEntity) == "sensor" && !isNaN(Number(stateObj.state))
        ? Object.entries(pick(this.matchTypes, [EConditionMatchType.Above, EConditionMatchType.Below])).map(([k, v]) => Object.assign(v, { id: k }))
        : Object.entries(pick(this.matchTypes, [EConditionMatchType.Equal, EConditionMatchType.Unequal])).map(([k, v]) => Object.assign(v, { id: k }));
      return html`
      <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
      <div style="display: flex; flex-direction: row; align-items: center">
        <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)"
        >
          <ha-icon icon="${PrettyPrintIcon(entity.icon || DefaultEntityIcon)}"></ha-icon>
          ${PrettyPrintName(entity.name)}
        </mwc-button>
        <ha-icon-button
          icon="hass:pencil"
          style="margin-left: 10px"
          @click=${() => { this.selectedEntity = undefined }}
        >
        </ha-icon-button>
      </div>

      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.device.condition')}</div>
      <button-group
        .items=${matchTypes} 
        value=${this.conditionMatchType}
        @change=${(ev: Event) => this.conditionMatchType = (ev.target as HTMLInputElement).value as EConditionMatchType}
      >
      </button-group>
      
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}</div>
        ${states
          ?
          html`
      <button-group
        .items=${states.map(e => Object.assign(e, { id: e.value }))}
        value=${this.conditionValue}
        @change=${(ev: Event) => { this.conditionValue = (ev.target as HTMLInputElement).value }}
        >
      </button-group>
        `
          :
          html`
            <paper-input
              label="${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}${stateObj.attributes.unit_of_measurement ? ` (${stateObj.attributes.unit_of_measurement})` : ''}"
              value=${this.conditionValue ? this.conditionValue : ""}
              @value-changed=${(ev: Event) => { const value = (ev.target as HTMLInputElement).value; this.conditionValue = isNaN(Number(value)) ? value : Number(value) }}
            >
            </paper-input>
        `
        }
      `;
    }
  }

  selectGroup(ev: Event) {
    this.selectedGroup = (ev.target as HTMLInputElement).value;
    this.selectedEntity = undefined;
  }

  selectEntity(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.selectedEntity = value;
    this.conditionMatchType = undefined;
    this.conditionValue = undefined;
  }

  renderConditions() {
    if (!this.hass || !this.schedule || !Object.keys(this.matchTypes).length) return html``;
    const conditions = this.schedule.timeslots[0].conditions || [];
    if (!conditions.length)
      return html`
        <div class="text-field">${localize('ui.panel.conditions.no_conditions_defined', this.hass.language)}</div>
      `;
    return conditions.map((item, num) => {
      const entity = parseEntity(item.entity_id, this.hass!, this.config!);
      const states = standardStates(item.entity_id, this.hass!);
      const stateObj = this.hass!.states[item.entity_id];
      const state = states?.find(e => e.value == item.value);
      return html`
        <div class="summary">
            <ha-icon icon="${entity.icon || DefaultEntityIcon}"></ha-icon>
            <span>
              ${PrettyPrintName(entity.name)}
              ${this.matchTypes[item.match_type].name!.toLowerCase()}
              ${state ? state.name.toLowerCase() : stateObj.attributes.unit_of_measurement ? `${item.value}${stateObj.attributes.unit_of_measurement}` : item.value}
            </span>
          <ha-icon-button
            icon="hass:pencil"
            @click=${() => { this.editConditionClick(num) }}}
          >
          </ha-icon-button>
        </div>
      `;
    });
  }

  addConditionClick() {
    this.addCondition = true;
    this.selectedEntity = undefined;
    this.selectedGroup = undefined;
  } b

  confirmConditionClick() {
    if (!this.selectedEntity || !this.config || !this.hass || !this.schedule || !this.conditionMatchType || !this.conditionValue) return;

    const condition: Condition = {
      entity_id: this.selectedEntity,
      match_type: this.conditionMatchType,
      value: this.conditionValue,
      attribute: "state"
    };
    const conditions = this.schedule.timeslots[0].conditions?.length ? [...this.schedule.timeslots[0].conditions] : [];
    const type = this.schedule.timeslots[0].condition_type ? this.schedule.timeslots[0].condition_type : EConditionType.Any;

    if (this.editItem === undefined) conditions.push(condition);
    else conditions.splice(this.editItem, 1, condition);

    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          conditions: conditions,
          condition_type: type
        })
      )
    }
    this.addCondition = false;
    this.editItem = undefined;
  }

  cancelConditionClick() {
    this.addCondition = false;
    this.editItem = undefined;
  }

  editConditionClick(index: number) {
    if (!this.schedule || !this.schedule.timeslots[0].conditions || !this.hass || !this.config) return;
    const item = this.schedule.timeslots[0].conditions[index];
    if (!item) return;
    this.editItem = index;

    const hassEntities = Object.keys(this.hass.states)
      .filter(e => entityFilter(e, this.config!))
      .filter(e => standardStates(e, this.hass!)?.length || computeDomain(e) == "sensor");
    const groups = entityGroups(hassEntities, this.config, this.hass);
    this.selectedGroup = groups.find(e => e.entities.includes(item.entity_id))?.id;
    this.selectedEntity = item.entity_id;

    this.conditionMatchType = item.match_type;
    this.conditionValue = item.value;
    this.addCondition = true;
  }

  deleteConditionClick() {
    if (!this.config || !this.hass || !this.schedule || this.editItem === undefined) return;
    const conditions = this.schedule.timeslots[0].conditions?.length ? [...this.schedule.timeslots[0].conditions] : [];
    conditions.splice(this.editItem, 1);

    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          conditions: conditions
        })
      )
    }
    this.addCondition = false;
    this.editItem = undefined;
  }

  conditionTypeSwitchClick(e: Event) {
    if (!this.schedule) return;
    const checked = (e.target as HTMLInputElement).checked;
    const type = checked ? EConditionType.All : EConditionType.Any;
    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          type: type,
        })
      )
    }
  }

  updateName(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.schedule = {
      ...this.schedule!,
      name: value
    };
  }

  updateRepeatType(e: Event) {
    const value = (e.target as HTMLInputElement).value as ERepeatType;
    this.schedule = {
      ...this.schedule!,
      repeat_type: value
    }
  }

  cancelClick() {
    if (this.addCondition) {
      this.addCondition = !this.addCondition;
    } else {
      const myEvent = new CustomEvent('cancelClick');
      this.dispatchEvent(myEvent);
    }
  }

  saveClick() {
    const myEvent = new CustomEvent('saveClick', {
      detail: this.schedule
    });
    this.dispatchEvent(myEvent);
  }

  backClick() {
    const myEvent = new CustomEvent('backClick', {
      detail: this.schedule
    });
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    ${commonStyle}
    div.summary {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 0px;
      background: rgba(var(--rgb-primary-text-color), 0.08);
      border-radius: 8px;
      margin: 2px 0px;
      font-weight: 400;
    }
    div.summary ha-icon {
      flex: 0 0 48px;
      justify-content: center;
      display: flex;
      color: var(--state-icon-color);
    }
    div.summary span {
      flex: 1 0 60px;
      display: flex;
    }
    div.summary ha-icon-button {
      margin: -8px 0px;
    }
  `
}
