import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiPencil } from '@mdi/js';

import { localize } from '../localize/localize';
import {
  EConditionType,
  CardConfig,
  EntityElement,
  Condition,
  EConditionMatchType,
  ScheduleConfig,
  ListVariableOption,
  Dictionary,
  ERepeatType,
  EVariableType,
  ListVariable,
  LevelVariable,
  Group,
} from '../types';

import { HomeAssistant } from 'custom-card-helpers';
import { entityGroups } from '../data/entity_group';
import { commonStyle } from '../styles';
import { parseEntity } from '../data/entities/parse_entity';
import { DefaultEntityIcon } from '../const';
import {
  PrettyPrintIcon,
  PrettyPrintName,
  isEqual,
  getLocale,
  sortAlphabetically,
  AsArray,
  isDefined,
} from '../helpers';

import { computeEntities } from '../data/entities/compute_entities';
import { listVariableDisplay } from '../data/variables/list_variable';
import { levelVariableDisplay } from '../data/variables/level_variable';
import { computeStates } from '../data/compute_states';
import { fetchTags } from '../data/websockets';
import { loadHaForm } from '../load-ha-form';
import { stringToDate } from '../data/date-time/string_to_date';
import { formatDate } from '../data/date-time/format_date';

import '../components/button-group';
import '../components/variable-picker';
import '../components/scheduler-selector';

const getMatchTypes = (hass: HomeAssistant, filter?: EConditionMatchType[]) => {
  let output: Dictionary<ListVariableOption> = {};

  if (!filter?.length || filter.includes(EConditionMatchType.Above))
    output = {
      ...output,
      [EConditionMatchType.Above]: {
        value: EConditionMatchType.Above,
        name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.above'),
        icon: 'mdi:greater-than',
      },
    };

  if (!filter?.length || filter.includes(EConditionMatchType.Below))
    output = {
      ...output,
      [EConditionMatchType.Below]: {
        value: EConditionMatchType.Below,
        name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.below'),
        icon: 'mdi:less-than',
      },
    };

  if (!filter?.length || filter.includes(EConditionMatchType.Equal))
    output = {
      ...output,
      [EConditionMatchType.Equal]: {
        value: EConditionMatchType.Equal,
        name: localize('ui.panel.conditions.equal_to', getLocale(hass)),
        icon: 'mdi:equal',
      },
    };

  if (!filter?.length || filter.includes(EConditionMatchType.Unequal))
    output = {
      ...output,
      [EConditionMatchType.Unequal]: {
        value: EConditionMatchType.Unequal,
        name: localize('ui.panel.conditions.unequal_to', getLocale(hass)),
        icon: 'mdi:not-equal-variant',
      },
    };

  return output;
};

@customElement('scheduler-editor-options')
export class SchedulerEditorOptions extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  config?: CardConfig;

  @property()
  schedule?: ScheduleConfig;

  @property()
  selectedGroup?: Group;

  @property()
  selectedEntity?: EntityElement;

  @property()
  conditionMatchType?: EConditionMatchType;

  @property()
  conditionValue?: string | number;

  @property()
  editConditionItem?: number;

  @property({ type: Boolean })
  editItem = false;

  @property()
  addCondition = false;

  @property()
  tags: string[] = [];

  @state()
  startDate = '';

  @state()
  endDate = '';

  async firstUpdated() {
    if (this.config?.tags) {
      (async () => await loadHaForm())();
      const tagEntries = await fetchTags(this.hass!);
      const existingTags = tagEntries.map(e => e.name);
      const configTags = AsArray(this.config.tags);
      this.tags = [
        ...existingTags,
        ...configTags.filter(e => !existingTags.includes(e) && !['none', 'disabled', 'enabled'].includes(e)),
      ];
    }

    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime');
    this.startDate = this.schedule?.start_date || formatDate(new Date(), getLocale(this.hass!), true);
    this.endDate = this.schedule?.end_date || formatDate(new Date(), getLocale(this.hass!), true);
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get('schedule')) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            schedule: this.schedule,
          },
        })
      );
    }
    return true;
  }

  render() {
    if (!this.hass || !this.config || !this.schedule) return html``;

    let repeatTypes = [
      {
        name: this.hass.localize('ui.panel.config.automation.editor.actions.type.repeat.label'),
        value: ERepeatType.Repeat,
        icon: 'refresh',
      },
      {
        name: this.hass.localize('ui.dialogs.more_info_control.vacuum.stop'),
        value: ERepeatType.Pause,
        icon: 'stop',
      },
      {
        name: this.hass.localize('ui.common.delete'),
        value: ERepeatType.Single,
        icon: 'trash-can-outline',
      },
    ];

    if (isDefined(this.schedule.start_date)) {
      repeatTypes = repeatTypes.filter(e => e.value != ERepeatType.Repeat);
    }

    return html`
        <div class="content">
          ${
            !this.addCondition
              ? html`
                  <div class="header">
                    ${this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.conditions')}
                    ${!this.schedule.timeslots[0].conditions || this.schedule.timeslots[0].conditions.length < 2
                      ? ''
                      : html`
                          <div class="switch">
                            ${localize('ui.panel.conditions.any', getLocale(this.hass))}
                            <ha-switch
                              style="margin: 0px 10px"
                              @change=${this.conditionTypeSwitchClick}
                              ?checked=${this.schedule.timeslots[0].condition_type == EConditionType.All}
                            ></ha-switch>
                            ${localize('ui.panel.conditions.all', getLocale(this.hass))}
                          </div>
                        `}
                  </div>
                  ${this.renderConditions()}

                  <div class="condition-options">
                    <div style="flex: 1">
                      <mwc-button @click=${this.addConditionClick}>
                        <ha-icon icon="mdi:plus-circle-outline" class="padded-right"></ha-icon>
                        ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
                      </mwc-button>
                    </div>
                    <div class="track-conditions">
                      ${this.schedule.timeslots[0].stop &&
                      this.schedule.timeslots[0].conditions &&
                      this.schedule.timeslots[0].conditions.length > 0
                        ? html`
                            <ha-checkbox
                              id="track_conditions"
                              ?checked=${this.schedule.timeslots[0].track_conditions}
                              @change=${this.trackConditionsClick}
                            ></ha-checkbox>
                            <span
                              @click=${() =>
                                (this.shadowRoot!.querySelector('#track_conditions')! as HTMLElement).click()}
                            >
                              ${localize('ui.panel.conditions.track_conditions', getLocale(this.hass))}
                            </span>
                          `
                        : ''}
                    </div>
                  </div>

                  <div class="header">${localize('ui.panel.options.period', getLocale(this.hass))}</div>
                  <div class="checkbox-container">
                    <div class="checkbox">
                      <ha-checkbox
                        ?checked=${isDefined(this.schedule.start_date)}
                        @change=${this.toggleEnableDateRange}
                      >
                      </ha-checkbox>
                    </div>
                    <div class="slider date-range">
                      <div>
                        <span>
                          ${PrettyPrintName(
                            localize('ui.components.date.days_range', getLocale(this.hass))
                              .split('{')
                              .shift()
                              ?.trim() || ''
                          )}
                        </span>
                        <ha-date-input
                          .locale=${this.hass.locale}
                          value=${this.startDate}
                          .label=${this.hass.localize('ui.components.date-range-picker.start_date')}
                          @value-changed=${this._setStartDate}
                          ?disabled=${!isDefined(this.schedule.start_date)}
                        >
                        </ha-date-input>
                      </div>

                      <div>
                        <span>
                          ${PrettyPrintName(
                            localize('ui.components.date.days_range', getLocale(this.hass))
                              .split('}')[1]
                              .split('{')
                              .shift()
                              ?.trim() || ''
                          )}
                        </span>
                        <ha-date-input
                          .locale=${this.hass.locale}
                          value=${this.endDate}
                          .label=${this.hass.localize('ui.components.date-range-picker.end_date')}
                          @value-changed=${this._setEndDate}
                          ?disabled=${!isDefined(this.schedule.start_date)}
                        >
                        </ha-date-input>
                      </div>
                    </div>
                  </div>

                  <div class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}</div>
                  <ha-textfield
                    value=${this.schedule.name || ''}
                    placeholder=${this.schedule.name
                      ? ''
                      : this.hass.localize('ui.components.area-picker.add_dialog.name')}
                    @input=${this.updateName}
                  ></ha-textfield>

                  ${this.config.tags
                    ? html`
                        <div class="header">${this.hass.localize('ui.panel.config.tag.caption')}</div>
                        <scheduler-selector
                          .items=${this.getTagOptions()}
                          .value=${this.schedule.tags || []}
                          @value-changed=${this.updateTags}
                          label=${this.hass.localize('ui.panel.config.tag.add_tag')}
                        >
                        </scheduler-selector>
                      `
                    : ''}

                  <div class="header">${localize('ui.panel.options.repeat_type', getLocale(this.hass))}</div>
                  <button-group
                    .items=${repeatTypes}
                    value="${this.schedule.repeat_type}"
                    @change=${this.updateRepeatType}
                  >
                  </button-group>
                `
              : this.renderAddCondition()
          }
        </div>
        <div class="buttons ${!this.addCondition && !this.editItem ? 'centered' : ''}">
          ${
            !this.addCondition
              ? html`
                  ${this.editItem
                    ? html`
                        <mwc-button
                          class="warning"
                          @click=${() => this.dispatchEvent(new CustomEvent('deleteClick', { detail: this.schedule }))}
                        >
                          ${this.hass.localize('ui.common.delete')}
                        </mwc-button>
                      `
                    : ''}
                  <mwc-button
                    @click=${() => this.dispatchEvent(new CustomEvent('saveClick', { detail: this.schedule }))}
                    ?disabled=${!this.schedule.timeslots.filter(e => e.actions.length).length}
                  >
                    ${this.hass.localize('ui.common.save')}
                  </mwc-button>
                `
              : html`
                  <mwc-button
                    @click=${this.confirmConditionClick}
                    ?disabled=${!this.selectedEntity ||
                      !this.conditionMatchType ||
                      !isDefined(this.conditionValue) ||
                      (typeof this.conditionValue == 'string' && !this.conditionValue.trim().length)}
                    >${this.hass.localize('ui.common.save')}</mwc-button
                  >
                  ${this.editConditionItem !== undefined
                    ? html`
                        <mwc-button class="warning" @click=${this.deleteConditionClick}
                          >${this.hass.localize('ui.common.delete')}</mwc-button
                        >
                      `
                    : ''}
                  <mwc-button @click=${this.cancelConditionClick} style="float: right"
                    >${this.hass.localize('ui.common.cancel')}</mwc-button
                  >
                `
          }
        </div>
      </ha-card>
    `;
  }

  renderAddCondition() {
    if (!this.addCondition || !this.hass || !this.config) return html``;

    if (!this.selectedEntity) {
      const hassEntities = computeEntities(this.hass, this.config, { filterActions: false, filterStates: true });

      const groups = entityGroups(hassEntities, this.config, this.hass);
      groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));

      let entities: EntityElement[] = [];
      if (this.selectedGroup) {
        entities = groups
          .find(e => isEqual(e, this.selectedGroup!))!
          .entities.map(e => parseEntity(e, this.hass!, this.config!));

        entities.sort((a, b) => (a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1));
      }
      return html`
        <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>

        <button-group
          .items=${groups}
          .value=${groups.findIndex(e => isEqual(e, this.selectedGroup))}
          @change=${this.selectGroup}
        >
          ${localize('ui.panel.entity_picker.no_groups_defined', getLocale(this.hass))}
        </button-group>

        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <button-group
          .items=${entities}
          .value=${entities.findIndex(e => isEqual(e, this.selectedEntity))}
          @change=${this.selectEntity}
        >
          ${!this.selectedGroup
            ? localize('ui.panel.entity_picker.no_group_selected', getLocale(this.hass))
            : localize('ui.panel.entity_picker.no_entities_for_group', getLocale(this.hass))}
        </button-group>
      `;
    } else {
      const entity = this.selectedEntity;
      const states = computeStates(entity.id, this.hass, this.config);

      let availableMatchTypes: EConditionMatchType[];
      if (states?.type == EVariableType.Level)
        availableMatchTypes = [EConditionMatchType.Above, EConditionMatchType.Below];
      else if (states?.type == EVariableType.List)
        availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal];
      else {
        const currentState = entity.id in this.hass.states ? this.hass.states[entity.id].state : null;
        if (!currentState || ['unavailable', 'unknown'].includes(currentState))
          availableMatchTypes = [
            EConditionMatchType.Equal,
            EConditionMatchType.Unequal,
            EConditionMatchType.Above,
            EConditionMatchType.Below,
          ];
        else if (!isNaN(Number(currentState)))
          availableMatchTypes = [EConditionMatchType.Above, EConditionMatchType.Below];
        else availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal];
      }

      const matchTypes = getMatchTypes(this.hass, availableMatchTypes);

      return html`
        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <div style="display: flex; flex-direction: row; align-items: center">
          <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)">
            <ha-icon icon="${PrettyPrintIcon(entity.icon || DefaultEntityIcon)}"></ha-icon>
            ${PrettyPrintName(entity.name)}
          </mwc-button>
          <ha-icon-button
            .path=${mdiPencil}
            style="margin-left: 10px"
            @click=${() => {
              this.selectedEntity = undefined;
            }}
          >
          </ha-icon-button>
        </div>

        <div class="header">
          ${this.hass.localize('ui.panel.config.automation.editor.conditions.type.device.condition')}
        </div>
        <button-group
          .items=${Object.values(matchTypes)}
          value=${this.conditionMatchType}
          @change=${(ev: Event) =>
            (this.conditionMatchType = (ev.target as HTMLInputElement).value as EConditionMatchType)}
        >
        </button-group>

        <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}</div>
        <scheduler-variable-picker
          .variable=${states}
          .value=${this.conditionValue}
          @value-changed=${(ev: CustomEvent) => (this.conditionValue = ev.detail.value)}
        >
        </scheduler-variable-picker>
      `;
    }
  }

  selectGroup(ev: CustomEvent) {
    this.selectedGroup = ev.detail as Group;
    this.selectedEntity = undefined;
  }

  selectEntity(ev: CustomEvent) {
    this.selectedEntity = ev.detail as EntityElement;
    this.conditionMatchType = undefined;
    this.conditionValue = undefined;
  }

  renderConditions() {
    if (!this.hass || !this.schedule) return html``;
    const conditions = this.schedule.timeslots[0].conditions || [];
    if (!conditions.length)
      return html`
        <div class="text-field">${localize('ui.panel.conditions.no_conditions_defined', getLocale(this.hass))}</div>
      `;
    return conditions.map((item, num) => {
      const entity = parseEntity(item.entity_id, this.hass!, this.config!);
      const states = computeStates(item.entity_id, this.hass!, this.config!);
      return html`
        <div class="summary">
          <ha-icon icon="${entity.icon || DefaultEntityIcon}"></ha-icon>
          <span>
            ${PrettyPrintName(entity.name)} ${getMatchTypes(this.hass!)[item.match_type].name!.toLowerCase()}
            ${states
              ? states.type == EVariableType.List
                ? listVariableDisplay(item.value, states as ListVariable)
                : states.type == EVariableType.Level
                ? levelVariableDisplay(item.value, states as LevelVariable)
                : item.value
              : ''}
          </span>
          <ha-icon-button
            .path=${mdiPencil}
            @click=${() => {
              this.editConditionClick(num);
            }}
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
  }

  confirmConditionClick() {
    if (
      !this.selectedEntity ||
      !this.config ||
      !this.hass ||
      !this.schedule ||
      !this.conditionMatchType ||
      !isDefined(this.conditionValue)
    )
      return;

    const condition: Condition = {
      entity_id: this.selectedEntity.id,
      match_type: this.conditionMatchType,
      value: this.conditionValue,
      attribute: 'state',
    };
    const conditions = this.schedule.timeslots[0].conditions?.length ? [...this.schedule.timeslots[0].conditions] : [];
    const type = this.schedule.timeslots[0].condition_type
      ? this.schedule.timeslots[0].condition_type
      : EConditionType.Any;

    if (this.editConditionItem === undefined) conditions.push(condition);
    else conditions.splice(this.editConditionItem, 1, condition);

    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          conditions: conditions,
          condition_type: type,
        })
      ),
    };
    this.addCondition = false;
    this.editConditionItem = undefined;
  }

  cancelConditionClick() {
    this.addCondition = false;
    this.editConditionItem = undefined;
  }

  editConditionClick(index: number) {
    if (!this.schedule || !this.schedule.timeslots[0].conditions || !this.hass || !this.config) return;
    const item = this.schedule.timeslots[0].conditions[index];
    if (!item) return;
    this.editConditionItem = index;

    const hassEntities = computeEntities(this.hass, this.config, { filterActions: false, filterStates: true });
    const groups = entityGroups(hassEntities, this.config, this.hass);
    this.selectedGroup = groups.find(e => e.entities.includes(item.entity_id));
    this.selectedEntity = parseEntity(item.entity_id, this.hass, this.config);

    this.conditionMatchType = item.match_type;
    this.conditionValue = item.value;
    this.addCondition = true;
  }

  deleteConditionClick() {
    if (!this.config || !this.hass || !this.schedule || this.editConditionItem === undefined) return;
    const conditions = this.schedule.timeslots[0].conditions?.length ? [...this.schedule.timeslots[0].conditions] : [];
    conditions.splice(this.editConditionItem, 1);

    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          conditions: conditions,
        })
      ),
    };
    this.addCondition = false;
    this.editConditionItem = undefined;
  }

  conditionTypeSwitchClick(e: Event) {
    if (!this.schedule) return;
    const checked = (e.target as HTMLInputElement).checked;
    const type = checked ? EConditionType.All : EConditionType.Any;
    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e =>
        Object.assign(e, {
          condition_type: type,
        })
      ),
    };
  }

  trackConditionsClick(e: Event) {
    if (!this.schedule) return;
    const checked = (e.target as HTMLInputElement).checked;
    this.schedule = {
      ...this.schedule,
      timeslots: this.schedule.timeslots.map(e => Object({ ...e, track_conditions: checked })),
    };
  }

  private _setStartDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(value);
    const endDate = stringToDate(this.endDate);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule!, end_date: value };
      this.endDate = value;
    }

    this.schedule = { ...this.schedule!, start_date: value };
    this.startDate = value;
  }

  private _setEndDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(this.startDate);
    const endDate = stringToDate(value);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule!, start_date: value };
      this.startDate = value;
    }

    this.schedule = { ...this.schedule!, end_date: value };
    this.endDate = value;
  }

  toggleEnableDateRange(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    const datePickers = this.shadowRoot!.querySelectorAll('ha-date-input') as any;
    this.schedule = {
      ...this.schedule!,
      start_date: checked ? this.startDate : undefined,
      end_date: checked ? this.endDate : undefined,
      repeat_type: checked
        ? this.schedule!.repeat_type == ERepeatType.Repeat
          ? ERepeatType.Pause
          : this.schedule!.repeat_type
        : this.schedule!.repeat_type == ERepeatType.Pause
        ? ERepeatType.Repeat
        : this.schedule!.repeat_type,
    };
  }

  updateName(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.schedule = {
      ...this.schedule!,
      name: value,
    };
  }

  updateRepeatType(e: Event) {
    const value = (e.target as HTMLInputElement).value as ERepeatType;
    this.schedule = {
      ...this.schedule!,
      repeat_type: value,
    };
  }

  getTagOptions() {
    let output = [...this.tags];
    if (this.schedule?.tags.length) output = [...output, ...this.schedule.tags.filter(e => !output.includes(e))];
    output.sort(sortAlphabetically);
    return output.map(e => Object({ name: e, value: e }));
  }

  updateTags(ev: Event) {
    let value = ((ev.target as HTMLInputElement).value as unknown) as string[];
    value = value.map(e => e.trim());
    value = value.filter(e => !['none', 'disabled', 'enabled'].includes(e));
    value.sort(sortAlphabetically);

    this.schedule = {
      ...this.schedule!,
      tags: value,
    };
  }

  saveClick() {
    const myEvent = new CustomEvent('saveClick', { detail: this.schedule });
    this.dispatchEvent(myEvent);
  }

  deleteClick() {
    const myEvent = new CustomEvent('deleteClick', { detail: this.schedule });
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    ${commonStyle}
    div.summary {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 0px;
      background: rgba(var(--rgb-primary-color), 0.15);
      color: var(--dark-primary-color);
      border-radius: 8px;
      margin: 2px 0px;
      font-size: 14px;
      font-weight: 500;
    }
    div.summary ha-icon {
      flex: 0 0 48px;
      justify-content: center;
      display: flex;
    }
    div.summary span {
      flex: 1 0 60px;
      display: flex;
    }
    div.summary ha-icon-button {
      margin: -8px 0px;
    }
    div.date-range {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    div.date-range div {
      display: flex;
      flex-shrink: 0;
      flex-grow: 1;
      flex-basis: 160px;
      align-items: center;
    }
    div.date-range div span {
      display: inline-flex;
      padding: 0px 10px;
    }
    div.date-range div:first-child span {
      padding-left: 0px;
    }
    div.condition-options {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
    }
    div.track-conditions {
      display: flex;
      flex-direction: row;
      text-align: right;
      align-items: center;
      max-width: 50%;
    }
    div.track-conditions span {
      text-align: left;
    }
    ha-textfield {
      width: 100%;
    }
  `;
}
