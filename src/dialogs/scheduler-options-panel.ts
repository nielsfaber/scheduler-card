import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { CardConfig, Condition, Schedule, ScheduleEntry, TConditionLogicType, TConditionMatchType, TRepeatType, Timeslot } from '../types';
import { DialogSelectConditionParams } from './dialog-select-condition';
import { mdiCog, mdiDotsVertical, mdiPencil } from '@mdi/js';
import { computeStatesForEntity } from '../data/compute_states_for_entity';
import { computeEntityIcon } from '../data/format/compute_entity_icon';
import { computeEntityDisplay } from '../data/format/compute_entity_display';
import { formatIsoDate } from '../data/time/format_date';
import { stringToDate } from '../data/time/string_to_date';
import { computeDomain } from '../lib/entity';
import { validateSelectorValue } from '../data/selectors/validate_selector_value';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { fireEvent } from '../lib/fire_event';

import '../components/collapsible-section';
import './dialog-select-condition';
import '../components/settings-row';
import '../components/combo-selector';
import { fetchTags } from '../data/store/fetch_tags';
import { SelectSelector } from '../lib/selector';
import { capitalizeFirstLetter } from '../lib/capitalize_first_letter';

@customElement('scheduler-options-panel')
export class SchedulerOptionsPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule!: Schedule;
  @state() conditionIdx?: number;
  @state() selectedDomain?: string;
  @state() selectedEntity?: string;
  @state() selectedMatchType?: TConditionMatchType;
  @state() conditionValue?: string | number;
  @state() conditionValid: boolean = true;


  @state()
  startDate = '';

  @state()
  endDate = '';

  @property()
  tags: string[] = [];

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime');

    this.startDate = this.schedule?.start_date || formatIsoDate(new Date());
    this.endDate = this.schedule?.end_date || formatIsoDate(new Date());

    const tagEntries = await fetchTags(this.hass!);
    const storedTags = tagEntries.map(e => e.name);
    const configTags = [...this.config.tags].flat();
    this.tags = [
      ...storedTags,
      ...configTags.filter(e => !storedTags.includes(e) && !['none', 'disabled', 'enabled'].includes(e)),
    ];
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
    const tagSelector = <SelectSelector>{
      select: {
        options: this.tags,
        multiple: true,
        custom_value: true
      }
    };

    return html`
      <div class="header first">
        <span>${localize('ui.panel.options.conditions.header', this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length
        ? html`
        <ha-button-menu
          @action=${this._conditionConfigOptionsClick}
          @closed=${(ev: Event) => { ev.stopPropagation() }}
          @click=${(ev: Event) => { ev.preventDefault(); ev.stopImmediatePropagation() }}
          fixed
          menuCorner="END"
          corner="BOTTOM_END"
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiCog}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}>
            ${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.Or
            ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
            : ''
          }
            ${localize('ui.panel.options.conditions.options.logic_or', this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}>
            ${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.And
            ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
            : ''
          }
            ${localize('ui.panel.options.conditions.options.logic_and', this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon">

            ${this.schedule.entries[0].slots[0].conditions.track_changes
            ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
            : ''
          }
            ${localize('ui.panel.options.conditions.options.track_changes', this.hass)}
          </mwc-list-item>
        </ha-button-menu>
        `
        : ''}
        </div>
        <collapsible-group
          ?disabled=${!this.conditionValid}
          @openclose-changed=${this._updateActiveCondition}
          .openedItem=${this.conditionIdx}
        >
        ${this.renderConditions()}
        </collapsible-group>

      <div>
        <mwc-button
          @click=${this._conditionAddClick}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.options.conditions.add_condition', this.hass)}
        </mwc-button>
      </div>


      <span class="header">${localize('ui.panel.options.period.header', this.hass)}:</span>
      <div class="period">
        <ha-checkbox
          ?checked=${this.schedule.start_date !== undefined}
          @change=${this.toggleEnableDateRange}
        >
        </ha-checkbox>
        <span>${localize('ui.panel.options.period.start_date', this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${this.hass.localize('ui.components.date-range-picker.start_date')}
          @value-changed=${this._setStartDate}
          ?disabled=${this.schedule.start_date === undefined}
        >
        </ha-date-input>
        <span>${localize('ui.panel.options.period.end_date', this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${this.hass.localize('ui.components.date-range-picker.end_date')}
          @value-changed=${this._setEndDate}
          ?disabled=${this.schedule.end_date === undefined}
        >
        </ha-date-input>
      </div>

      <span class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}:</span>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name || ''}
          placeholder=${this.schedule.name
        ? ''
        : this.hass.localize('ui.components.area-picker.add_dialog.name')}
          @input=${this.updateName}
        ></ha-textfield>
      </div>

      <span class="header">${localize('ui.panel.options.tags', this.hass)}:</span>
      <div>
        <combo-selector
          .hass=${this.hass}
          .config=${tagSelector}
          .value=${this.schedule.tags || []}
          @value-changed=${this.tagsUpdated}
        >
        </combo-selector>
      </div>

      <span class="header">${localize('ui.panel.options.repeat_type', this.hass)}:</span>
      <mwc-button @click=${this.setRepeatType} value="${TRepeatType.Repeat}" ?active=${this.schedule.repeat_type == TRepeatType.Repeat}>
        <ha-icon icon="mdi:refresh"></ha-icon>
        ${this.hass.localize('ui.components.calendar.event.repeat.label')}
      </mwc-button>
      <mwc-button @click=${this.setRepeatType} value="${TRepeatType.Pause}" ?active=${this.schedule.repeat_type == TRepeatType.Pause}>
        <ha-icon icon="mdi:stop"></ha-icon>
        ${this.hass.localize('ui.dialogs.more_info_control.vacuum.stop')}
      </mwc-button>
      <mwc-button @click=${this.setRepeatType}  value="${TRepeatType.Single}" ?active=${this.schedule.repeat_type == TRepeatType.Single}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this.hass.localize('ui.common.delete')}
      </mwc-button>
    `;
  }

  renderConditions() {
    let conditions: Partial<Condition>[] = this.schedule.entries[0].slots[0].conditions.items;
    if (this.conditionIdx == conditions.length) conditions = [...conditions, {}];

    return conditions.map((condition, i) => {

      const domain = this.selectedDomain || computeDomain(condition.entity_id || "");
      const selector = computeStatesForEntity(this.selectedEntity || domain!, this.hass);

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
      <collapsible-section>
        <span slot="header">
          ${condition.entity_id && condition.value !== undefined ? html`
          <ha-icon slot="icon" icon="${computeEntityIcon(condition.entity_id, this.hass)}"></ha-icon>
          ${capitalizeFirstLetter(localize(matchTypeValue[condition.match_type!], this.hass, ['{entity}', '{value}'], [computeEntityDisplay(condition.entity_id, this.hass) || '', condition.value || '']))}
          ` : 'new condition'}
        </span>
        <ha-button-menu
          slot="contextMenu" 
          @action=${(ev: CustomEvent) => this._conditionItemOptionsClick(ev, i)}
          @closed=${(ev: Event) => { ev.stopPropagation() }}
          @click=${(ev: Event) => { ev.preventDefault(); ev.stopImmediatePropagation() }}
          fixed
          ?disabled=${!this.conditionValid && this.conditionIdx !== i}
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiDotsVertical}
            ?disabled=${!this.conditionValid && this.conditionIdx !== i}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${this.hass.localize('ui.panel.lovelace.editor.card.conditional.change_type')}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${this.hass.localize('ui.common.delete')}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

        <settings-row>
          <span slot="heading">
            ${this.hass.localize('ui.components.selectors.selector.types.entity')}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${domain}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx == i ? this.selectedEntity : condition.entity_id}
          >
          </scheduler-entity-picker>
        </settings-row>

        <settings-row>
          <span slot="heading">
            ${capitalizeFirstLetter(localize(matchTypeValue[this.conditionIdx == i ? this.selectedMatchType! : condition.match_type!], this.hass, ['{entity}', '{value}'], ['', '']))}
            <ha-button-menu
              @action=${(ev: CustomEvent) => this._selectMatchType(ev, matchTypes)}
              @closed=${(ev: Event) => { ev.stopPropagation() }}
              fixed
            >
              <ha-icon-button slot="trigger" .path=${mdiPencil}>
              </ha-icon-button>
              ${matchTypes.map(e => html`
                <mwc-list-item graphic="icon" ?noninteractive=${this.conditionIdx == i ? this.selectedMatchType == e : condition.match_type == e}>
                  ${capitalizeFirstLetter(localize(matchTypeValue[e], this.hass, ['{entity}', '{value}'], ['', '']))}
                  <ha-icon slot="graphic" icon="${matchTypeIcons[e]}"></ha-icon>
                </mwc-list-item>
              `)}
            </ha-button-menu>
          </span>
          <combo-selector
            .hass=${this.hass}
            .config=${selector}
            .value=${this.conditionIdx == i ? this.conditionValue : condition.value}
            @value-changed=${this._conditionValueChanged}
          >
          </combo-selector>
        </settings-row>
        </div>
      </collapsible-section>
    `}
    );
  }

  _updateActiveCondition(ev: CustomEvent) {
    const idx = ev.detail.item;
    if (idx < 0) {
      this.conditionIdx = undefined;
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
    const option = ev.detail.index;
    switch (option) {
      case 0:
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
      case 1:
        const conditions: Condition[] = this.schedule.entries[0].slots[0].conditions.items.filter((_e, i) => i !== idx);
        const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: { ...e.conditions, items: conditions } });
        const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
        this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
        if (idx === this.conditionIdx) this.conditionIdx = undefined;
        else if (this.conditionIdx !== undefined && idx < this.conditionIdx) this.conditionIdx = this.conditionIdx - 1;
        break;
    }
  }

  _selectMatchType(ev: CustomEvent, options: TConditionMatchType[]) {
    const index = ev.detail.index;
    options = options.filter(e => e != this.selectedMatchType);
    this.selectedMatchType = options[index];

    ev.preventDefault();
    const el = ev.target as HTMLElement;
    setTimeout(() => {
      (el.firstElementChild as HTMLElement).blur();
    }, 50);
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
        dialogImport: () => import('./dialog-select-condition'),
        dialogParams: params,
      });
    })
  }


  _selectEntity(ev: CustomEvent) {
    const entity = ev.detail.value as string | undefined;
    this.selectedEntity = entity;
    this._validateCondition();
  }

  _validateCondition() {
    this.conditionValid = false;
    if (!this.selectedEntity || !this.conditionValue || !this.selectedMatchType || this.conditionIdx === undefined) return;
    const selector = computeStatesForEntity(this.selectedEntity, this.hass);
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
    const index = ev.detail.index;
    switch (index) {
      case 0:
        if (conditionConfig.type == TConditionLogicType.Or) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.Or };
        break;
      case 1:
        if (conditionConfig.type == TConditionLogicType.And) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.And };
        break;
      case 2:
        const newValue = !this.schedule.entries[0].slots[0].conditions.track_changes;
        conditionConfig = { ...conditionConfig, track_changes: newValue };
        break;
    }
    const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: conditionConfig });
    const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
    this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
  }


  private _setStartDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(value);
    const endDate = stringToDate(this.endDate);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule, end_date: value };
      this.endDate = value;
    }

    this.schedule = { ...this.schedule, start_date: value };
    this.startDate = value;
  }

  private _setEndDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(this.startDate);
    const endDate = stringToDate(value);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule, start_date: value };
      this.startDate = value;
    }

    this.schedule = { ...this.schedule, end_date: value };
    this.endDate = value;
  }

  toggleEnableDateRange(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.schedule = {
      ...this.schedule!,
      start_date: checked ? this.startDate : undefined,
      end_date: checked ? this.endDate : undefined,
      repeat_type: checked
        ? this.schedule!.repeat_type == TRepeatType.Repeat
          ? TRepeatType.Pause
          : this.schedule!.repeat_type
        : this.schedule!.repeat_type == TRepeatType.Pause
          ? TRepeatType.Repeat
          : this.schedule!.repeat_type,
    };
  }

  updateName(ev: InputEvent) {
    const value = (ev.target as HTMLInputElement).value;
    this.schedule = { ...this.schedule, name: value.trim() };
  }

  tagsUpdated(ev: CustomEvent) {
    let value = ev.detail.value as string[];
    value = value.map(e => e.trim());
    value = value.filter(e => !['none', 'disabled', 'enabled'].includes(e));
    this.schedule = { ...this.schedule, tags: value };
  }

  setRepeatType(ev: Event) {
    const value = (ev.target as HTMLElement).getAttribute("value") as TRepeatType;
    this.schedule = { ...this.schedule, repeat_type: value };
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-icon-button {
        align-self: center;
      }
      mwc-list-item.warning, mwc-list-item.warning ha-icon {
        color: var(--error-color);
      }
      mwc-list-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      mwc-list-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      mwc-list-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      div.period {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
      ha-textfield {
        width: 100%;
      }
      mwc-button ha-icon {
        margin-right: 11px;
      }
      mwc-button[active] {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
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
      .header ha-button-menu {
        margin-bottom: -10px;
      }
    `;
  }
}