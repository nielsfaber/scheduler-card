import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { CardConfig, Condition, Schedule, ScheduleEntry, TConditionLogicType, TConditionMatchType, Timeslot } from '../types';
import { DialogSelectConditionParams } from '../dialogs/dialog-select-condition';
import { mdiCog, mdiDotsVertical, mdiPencil } from '@mdi/js';
import { computeStatesForEntity } from '../data/compute_states_for_entity';
import { computeEntityIcon } from '../data/format/compute_entity_icon';
import { computeEntityDisplay } from '../data/format/compute_entity_display';
import { computeDomain } from '../lib/entity';
import { validateSelectorValue } from '../data/selectors/validate_selector_value';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { fireEvent } from '../lib/fire_event';
import { capitalizeFirstLetter } from '../lib/capitalize_first_letter';
import { asArray } from '../lib/as_array';
import { hassLocalize } from '../localize/hassLocalize';
import { formatSelectorDisplay } from '../data/selectors/format_selector_display';
import { isDefined } from '../lib/is_defined';

import './scheduler-collapsible-section';
import '../dialogs/dialog-select-condition';
import './scheduler-settings-row';
import './scheduler-combo-selector';
import "./scheduler-entity-picker";

/**
 * Self-contained editor for a schedule's conditions (extracted from the
 * options panel so it can be hosted on the editor's main page).
 * Follows the same contract as the panels: takes `schedule` and emits
 * `change` with { schedule } whenever the schedule was modified.
 */
@customElement('scheduler-conditions-editor')
export class SchedulerConditionsEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule!: Schedule;
  @state() conditionIdx: number = -1;
  @state() selectedDomain?: string;
  @state() selectedEntity?: string;
  @state() selectedMatchType?: TConditionMatchType;
  @state() conditionValue?: string | number;
  @state() conditionValid: boolean = true;

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime');
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get('schedule')) {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { schedule: this.schedule } })
      );
    }
    return true;
  }

  render() {
    return html`
      <div class="header first">
        <span>${localize('ui.panel.options.conditions.header', this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length
        ? html`
        <div class="condition-config">
          <span class="condition-mode">
            ${localize(
          this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.And
            ? 'ui.panel.options.conditions.options.logic_and_short'
            : 'ui.panel.options.conditions.options.logic_or_short',
          this.hass)}${this.schedule.entries[0].slots[0].conditions.track_changes
            ? html`, ${localize('ui.panel.options.conditions.options.track_changes_short', this.hass)}`
            : ''}
          </span>
          <ha-dropdown
            @wa-select=${this._conditionConfigOptionsClick}
            @wa-after-hide=${(ev: Event) => { ((ev.target as HTMLElement).firstElementChild as HTMLElement).blur() }}
            placement="bottom-end"
          >
          <ha-icon-button
            slot="trigger"
            .path=${mdiCog}
          >
          </ha-icon-button>
          <ha-dropdown-item
            ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
            value="or"
          >
            <ha-icon
              icon="mdi:check"
              style="${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.Or ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.logic_or', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item
            ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
            value="and"
          >
            <ha-icon
              icon="mdi:check"
              style="${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.And ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.logic_and', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item value="track_changes">
            <ha-icon 
              icon="mdi:check" 
              style="${this.schedule.entries[0].slots[0].conditions.track_changes ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.track_changes', this.hass)}
          </ha-dropdown-item>
          </ha-dropdown>
        </div>
        `
        : ''}
        </div>
        <scheduler-collapsible-group
          ?disabled=${!this.conditionValid}
          @openclose-changed=${this._updateActiveCondition}
          .openedItem=${this.conditionIdx}
        >
        ${this.renderConditions()}
        </scheduler-collapsible-group>

      <div>
        <ha-button appearance="plain"
          @click=${this._conditionAddClick}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.options.conditions.add_condition', this.hass)}
        </ha-button>
      </div>
    `;
  }

  renderConditions() {
    let conditions: Partial<Condition>[] = this.schedule.entries[0].slots[0].conditions.items;
    if (this.conditionIdx == conditions.length) conditions = [...conditions, {}];

    return conditions.map((condition, i) => {
      const entityId = this.conditionIdx == i ? this.selectedEntity || condition.entity_id || "" : condition.entity_id || "";
      const domain = this.conditionIdx == i ? this.selectedDomain || computeDomain(entityId) : computeDomain(entityId);
      const selector = computeStatesForEntity(entityId || domain, this.hass, this.config.customize);

      const matchTypes =
        selector && selector.hasOwnProperty('number')
          ? [TConditionMatchType.Above, TConditionMatchType.Below]
          : [TConditionMatchType.Equal, TConditionMatchType.Unequal];

      const matchTypeIcons = {
        [TConditionMatchType.Equal]: 'mdi:equal',
        [TConditionMatchType.Unequal]: 'mdi:not-equal-variant',
        [TConditionMatchType.Above]: 'mdi:greater-than',
        [TConditionMatchType.Below]: 'mdi:less-than',
      };

      const matchTypeValue = {
        [TConditionMatchType.Equal]: 'ui.panel.options.conditions.types.equal_to',
        [TConditionMatchType.Unequal]: 'ui.panel.options.conditions.types.unequal_to',
        [TConditionMatchType.Above]: 'ui.panel.options.conditions.types.above',
        [TConditionMatchType.Below]: 'ui.panel.options.conditions.types.below',
      };

      if (this.conditionIdx === i && !this.selectedMatchType) this.selectedMatchType = matchTypes[0];

      return html`
      <scheduler-collapsible-section idx="${i}">
        <div slot="header">
          ${condition.entity_id && condition.value !== undefined ? html`
          <ha-icon slot="icon" icon="${computeEntityIcon(condition.entity_id, this.config.customize, this.hass)}"></ha-icon>
          ${capitalizeFirstLetter(localize(matchTypeValue[condition.match_type!], this.hass, ['{entity}', '{value}'], [computeEntityDisplay(condition.entity_id, this.hass, this.config.customize) || '', formatSelectorDisplay(condition.value, selector, this.hass) ?? '']))}
          ` : localize('ui.panel.options.conditions.add_condition', this.hass)}
        </div>
        <ha-dropdown
          slot="contextMenu"
          @wa-select=${(ev: CustomEvent) => this._conditionItemOptionsClick(ev, i)}
          ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
          placement="bottom-end"
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiDotsVertical}
            ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
          >
          </ha-icon-button>
          <ha-dropdown-item value="change_type">
            <ha-icon icon="mdi:pencil"></ha-icon>
            ${hassLocalize('ui.panel.lovelace.editor.card.conditional.change_type', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item variant="danger" value="delete">
            <ha-icon icon="mdi:delete"></ha-icon>
            ${hassLocalize('ui.common.delete', this.hass)}
          </ha-dropdown-item>
        </ha-dropdown>

        <div slot="content">

        <scheduler-settings-row>
          <span slot="heading">
            ${hassLocalize('ui.components.selectors.selector.types.entity', this.hass)}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${domain}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx == i ? asArray(this.selectedEntity) : asArray(condition.entity_id)}
            ?multiple=${false}
          >
          </scheduler-entity-picker>
        </scheduler-settings-row>

        <scheduler-settings-row>
          <span slot="heading">
            ${capitalizeFirstLetter(localize(matchTypeValue[this.conditionIdx == i ? this.selectedMatchType! : condition.match_type!], this.hass, ['{entity}', '{value}'], ['', '']))}
            <ha-dropdown
              @wa-select=${this._selectMatchType}
              @wa-after-hide=${(ev: Event) => { ((ev.target as HTMLElement).firstElementChild as HTMLElement).blur() }}
            >
              <ha-icon-button slot="trigger" .path=${mdiPencil}>
              </ha-icon-button>
              ${matchTypes.map(e => html`
                <ha-dropdown-item 
                  ?noninteractive=${this.conditionIdx == i ? this.selectedMatchType == e : condition.match_type == e}
                  value="${e}"
                >
                  <ha-icon icon="${matchTypeIcons[e]}"></ha-icon>
                  ${capitalizeFirstLetter(localize(matchTypeValue[e], this.hass, ['{entity}', '{value}'], ['', '']))}
                </ha-dropdown-item>
              `)}
            </ha-dropdown>
          </span>
          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${selector}
            .value=${this.conditionIdx == i ? this.conditionValue : condition.value}
            @value-changed=${this._conditionValueChanged}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>
        </div>
      </scheduler-collapsible-section>
    `}
    );
  }

  _updateActiveCondition(ev: CustomEvent) {
    const idx = ev.detail.item;
    if (idx < 0) {
      this.conditionIdx = -1;
      return;
    }
    if (idx === this.conditionIdx) return;
    this.conditionIdx = idx;
    const condition = this.schedule.entries[0].slots[0].conditions.items[idx];
    this.selectedEntity = condition ? condition.entity_id : undefined;
    this.selectedMatchType = condition ? condition.match_type : undefined;
    this.conditionValue = condition ? condition.value : undefined;
  }

  _conditionItemOptionsClick(ev: CustomEvent, idx: number) {
    const option: 'change_type' | 'delete' = ev.detail.item.value;
    switch (option) {
      case "change_type":
        this._showConditionDialog(ev)
          .then(res => {
            if (!res) return;
            this.conditionIdx = idx;
            this.selectedDomain = res;
            this.selectedEntity = undefined;
            this.selectedMatchType = undefined;
            this.conditionValue = undefined;
            this.conditionValid = false;
          });
        break;
      case "delete":
        const conditions: Condition[] = this.schedule.entries[0].slots[0].conditions.items.filter((_e, i) => i !== idx);
        const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: { ...e.conditions, items: conditions } });
        const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
        this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
        if (idx === this.conditionIdx) this.conditionIdx = -1;
        else if (this.conditionIdx !== undefined && idx < this.conditionIdx) this.conditionIdx = this.conditionIdx - 1;
        this.conditionValid = true;
        break;
    }
  }

  _selectMatchType(ev: CustomEvent) {
    const value: TConditionMatchType = ev.detail.item.value;
    this.selectedMatchType = value;
    this._validateCondition();
  }

  _conditionValueChanged(ev: CustomEvent) {
    this.conditionValue = ev.detail.value;
    this._validateCondition();
  }

  async _showConditionDialog(ev: Event) {
    return new Promise<string | null>(resolve => {
      const params: DialogSelectConditionParams = {
        cancel: () => resolve(null),
        confirm: (out: string) => resolve(out),
        domain: undefined,
        cardConfig: this.config
      };

      fireEvent(ev.target as HTMLElement, 'show-dialog', {
        dialogTag: 'dialog-select-condition',
        dialogImport: () => import('../dialogs/dialog-select-condition'),
        dialogParams: params,
      });
    })
  }


  _selectEntity(ev: CustomEvent) {
    const entity = ev.detail.value as string[] | undefined;
    this.selectedEntity = entity ? entity.pop() : undefined;
    if (this.selectedEntity) {
      const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
      const matchTypes =
        selector && selector.hasOwnProperty('number')
          ? [TConditionMatchType.Above, TConditionMatchType.Below]
          : [TConditionMatchType.Equal, TConditionMatchType.Unequal];
      if (!this.selectedMatchType || !matchTypes.includes(this.selectedMatchType)) this.selectedMatchType = matchTypes[0];
    }
    this._validateCondition();
  }

  _validateCondition() {
    this.conditionValid = false;
    if (!this.selectedEntity || !isDefined(this.conditionValue) || !this.selectedMatchType || this.conditionIdx === undefined) return;
    const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
    if (!validateSelectorValue(this.conditionValue, selector)) return;
    this.conditionValid = true;
    const condition: Condition = {
      entity_id: this.selectedEntity,
      match_type: this.selectedMatchType,
      value: this.conditionValue,
      attribute: 'state'
    };
    const conditions: Condition[] = Object.assign(
      this.schedule.entries[0].slots[0].conditions.items,
      { [this.conditionIdx]: condition }
    );

    const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: { ...e.conditions, items: conditions } });
    const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
    this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
  }

  _conditionAddClick(ev: Event) {
    this._showConditionDialog(ev)
      .then(res => {
        if (!res) return;
        this.conditionIdx = this.schedule.entries[0].slots[0].conditions.items.length;
        this.selectedDomain = res;
        this.selectedEntity = undefined;
        this.selectedMatchType = undefined;
        this.conditionValue = undefined;
        this.conditionValid = false;
      });
  }


  _conditionConfigOptionsClick(ev: CustomEvent) {
    let conditionConfig = { ...this.schedule.entries[0].slots[0].conditions };
    const option: 'and' | 'or' | 'track_changes' = ev.detail.item.value;
    switch (option) {
      case 'or':
        if (conditionConfig.type == TConditionLogicType.Or) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.Or };
        break;
      case 'and':
        if (conditionConfig.type == TConditionLogicType.And) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.And };
        break;
      case 'track_changes':
        const newValue = !this.schedule.entries[0].slots[0].conditions.track_changes;
        conditionConfig = { ...conditionConfig, track_changes: newValue };
        break;
    }
    const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: conditionConfig });
    const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
    this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      ha-icon-button {
        align-self: center;
      }
      ha-dropdown-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      ha-dropdown-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      ha-dropdown-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      .header {
        display: flex;
        margin-top: 5px;
        width: 100%;
        align-items: center;
      }
      .header.first {
        margin-top: 0px;
        padding-bottom: 4px;
        align-items: flex-end;
        justify-content: space-between;
      }
      .header > * {
        display: flex;
      }
      .header ha-dropdown {
        margin-bottom: -10px;
      }
      .condition-config {
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .condition-mode {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        white-space: nowrap;
      }
    `;
  }
}
