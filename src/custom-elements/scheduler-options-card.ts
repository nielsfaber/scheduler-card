import { LitElement, html, customElement, property } from 'lit-element';
import { localize } from '../localize/localize';
//import { Config } from '../config';
import { EConditionType, CardConfig, Entry, EntityElement, Condition, EConditionMatchType } from '../types';

import './condition-entity-row';
import { HomeAssistant } from 'custom-card-helpers';
import { entityGroups } from '../data/entity_group';
import { commonStyle } from '../styles';
import { parseEntity } from '../data/parse_entity';
import { entityFilter } from '../data/filter_entity';
import { computeEntityStates } from '../data/compute_entity_states';

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
  addCondition = false;

  render() {
    if (!this.hass || !this.config) return html``;

    const repeatTypes = [
      {
        name: this.hass.localize('ui.panel.config.automation.editor.actions.type.repeat.label'),
        id: 'repeat',
        icon: 'refresh',
      },
      {
        name: this.hass.localize('ui.dialogs.more_info_control.vacuum.stop'),
        id: 'run_once',
        icon: 'stop',
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
          <div class="header">${this.hass.localize(
          'ui.panel.config.automation.editor.actions.type.choose.conditions'
        )}</div>
          ${
          !this.entries[0].conditions || this.entries[0].conditions.items.length < 2
            ? ''
            : html`
                  <div style="float: right; margin-top: -1em">
                    ${localize('ui.panel.conditions.any', this.hass.language)}
                    <ha-switch
                      style="margin: 0px 10px"
                      @change=${this.conditionTypeSwitchClick}
                      ?checked=${this.entries[0].conditions?.type == EConditionType.All}
                    ></ha-switch>
                    ${localize('ui.panel.conditions.all', this.hass.language)}
                  </div>
                `
          }
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
          <mwc-button @click=${this.addConditionClick}>
            <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
            ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
          </mwc-button>
          <mwc-button @click="${this.removeConditionClick}" ?disabled=${this.selectedItem === null}>
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            ${this.hass.localize('ui.common.delete')}
          </mwc-button>
          </div>

          <div class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}</div>
          <paper-input no-label-float
            .value=${this.friendlyName || ''}
            .configValue=${''}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">${localize('ui.panel.options.repeat_type', this.hass.language)}</div>
          <button-group
            .items=${repeatTypes}
            value="${
          this.entries[0].options && 'run_once' in this.entries[0].options && this.entries[0].options['run_once']
            ? 'run_once'
            : 'repeat'
          }"
            @change=${this.updateRepeatType}>
          </button-group>
          
        `
        : html`
                ${this.renderAddCondition()}
              `}
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
                <mwc-button @click=${this.confirmConditionClick} ?disabled=${!this.selectedEntity}
                  >${this.hass.localize('ui.common.continue')}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `;
  }

  renderAddCondition() {
    if (!this.addCondition || !this.hass || !this.config) return html``;

    const hassEntities = Object.keys(this.hass.states)
      .filter(e => entityFilter(e, this.config!))
      .filter(e => computeEntityStates(e, this.hass!, this.config!));

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
    if (!this.hass) return html``;
    const conditions = this.entries[0].conditions?.items || [];
    if (!conditions.length)
      return html`
        <div class="text-field">${localize('ui.panel.conditions.no_conditions_defined', this.hass.language)}</div>
      `;
    return conditions.map((item, num) => {
      return html`
        <condition-entity-row
          .item=${item}
          .hass=${this.hass}
          .config=${this.config}
          .selected=${this.selectedItem === num}
          .editMode=${this.editItem === num}
          @change="${e => this.updateCondition(e, num)}"
        >
        </condition-entity-row>
      `;
    });
  }

  updateCondition(e: CustomEvent, num: number) {
    const selected = e.detail.selected;
    if (selected) {
      this.selectedItem = num;
      this.editItem = null;
    } else {
      if (this.selectedItem == num) this.selectedItem = null;
      if (this.editItem != num) this.editItem = num;
      const items = [...this.entries[0].conditions!.items!];
      items[num] = { ...e.detail.item };
      this.entries = this.entries.map(e =>
        Object.assign(e, {
          conditions: Object.assign(e.conditions, {
            items: items,
          }),
        })
      );
    }
  }

  addConditionClick() {
    this.addCondition = !this.addCondition;
    this.editItem = null;
    this.selectedItem = null;
  }

  confirmConditionClick() {
    if (!this.selectedEntity || !this.config || !this.hass) return;

    const states = computeEntityStates(this.selectedEntity, this.hass, this.config)!;
    const step = Array.isArray(states) ? 1 : states.step || 1;
    const default_state = Array.isArray(states)
      ? states[0]
      : Number((Math.round((states.min + states.max) / 2 / step) * step).toPrecision(5));
    const condition: Condition = {
      entity: this.selectedEntity,
      match_type: EConditionMatchType.Equal,
      state: default_state,
    };
    const conditions = this.entries[0].conditions?.items.length ? [...this.entries[0].conditions.items] : [];
    const type = !this.entries[0].conditions?.type ? EConditionType.Any : this.entries[0].conditions.type;
    conditions.push(condition);
    this.entries = this.entries.map(e =>
      Object.assign(e, {
        conditions: { items: conditions, type: type },
      })
    );
    this.selectedEntity = undefined;
    this.selectedGroup = undefined;
    this.selectedItem = null;
    this.addCondition = false;
  }

  removeConditionClick() {
    if (this.selectedItem === null) return;
    const items = [...this.entries[0].conditions!.items];
    items.splice(this.selectedItem, 1);
    this.entries = this.entries.map(e =>
      Object.assign(e, {
        conditions: Object.assign(e.conditions, {
          items: items,
        }),
      })
    );
    this.selectedItem = null;
  }

  conditionTypeSwitchClick(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    const type = checked ? EConditionType.All : EConditionType.Any;
    this.entries = this.entries.map(e =>
      Object.assign(e, {
        conditions: Object.assign(e.conditions, {
          type: type,
        }),
      })
    );
  }

  updateName(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value == this.friendlyName) return;
    this.friendlyName = value;
  }

  updateRepeatType(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const options = { ...this.entries[0].options };
    if (value == 'run_once') Object.assign(options, { run_once: true });
    else if ('run_once' in options) delete options['run_once'];

    this.entries = this.entries.map(e =>
      Object.assign(e, {
        options: options,
      })
    );
  }

  cancelClick() {
    if (this.addCondition) {
      this.addCondition = !this.addCondition;
      this.editItem = null;
      this.selectedItem = null;
    } else {
      const myEvent = new CustomEvent('cancelClick');
      this.dispatchEvent(myEvent);
    }
  }

  saveClick() {
    const myEvent = new CustomEvent('saveClick', {
      detail: {
        entries: this.entries,
        friendlyName: this.friendlyName,
      },
    });
    this.dispatchEvent(myEvent);
  }

  backClick() {
    const myEvent = new CustomEvent('backClick', {
      detail: {
        entries: this.entries,
        friendlyName: this.friendlyName,
      },
    });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
