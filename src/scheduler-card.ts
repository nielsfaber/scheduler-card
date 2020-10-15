import { LitElement, html, customElement, property, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { Config } from './config';
import {
  Entry,
  ScheduleEntry,
  UserConfig,
  LevelVariableConfig,
  ListVariableConfig,
  HassEntity,
  Dictionary,
  EVariableType,
  LevelVariable,
  ListVariable,
  CardConfig,
  OptionPanelCfg,
} from './types';
import { PrettyPrintName, PrettyPrintIcon, IsEqual, pick, filterObject, calculateTimeline, extend } from './helpers';
import { styles } from './styles';
import { ValidateConfig } from './config-validation';
import {
  CARD_VERSION,
  DefaultUserConfig,
  DefaultEntry,
  FieldTemperature,
  CreateTimeScheme,
  DefaultTimelineEntries,
  DayTypeOptions,
  DayOptions,
  EViews,
} from './const';
import { localize, getLanguage, ServiceParamTranslations } from './localize/localize';
import { parseTimestamp, EDayType, Days, ETimeEvent, daysToArray } from './date-time';
import { ImportFromHass, ExportToHass } from './interface';
import { IsSchedulerEntity } from './entity';

import './custom-elements/scheduler-entities-card';
import './custom-elements/time-picker';
import './custom-elements/variable-slider';
import './custom-elements/timeslot-editor';
import './custom-elements/editor';
import './custom-elements/button-group';
import './custom-elements/options-panel';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-card',
  name: 'Scheduler Card',
  description: 'Card to manage schedule entities made with scheduler-component.',
});

console.info(
  `%c   SCHEDULER-CARD   \n%c   Version: ${CARD_VERSION.padEnd(8, ' ')}\n%c   Language: ${getLanguage().padEnd(
    7,
    ' '
  )}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
  'color: white; font-weight: bold; background: dimgray'
);

@customElement('scheduler-card')
export class SchedulerCard extends LitElement {
  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement('scheduler-card-editor');
  }

  static get styles(): CSSResult {
    return styles;
  }

  _config: UserConfig = DefaultUserConfig;

  Config: Config = new Config();

  shadowRoot: any;

  _entities: Dictionary<HassEntity> = {};

  @property({ type: Array })
  schedules: ScheduleEntry[] = [];

  //@property({ type: Object })
  private _hass?: HomeAssistant;

  @property()
  _view: EViews = EViews.Overview;

  newItem = false;

  editItem: string | null = null;

  _entries: Entry[] = [];
  _activeEntry: number | null = null;

  @property({ type: Object })
  _entry: Entry = { ...DefaultEntry };

  @property({ type: String })
  _selectedGroup = '';

  @property({ type: Boolean })
  _addCondition = false;

  _friendlyName: string | undefined = undefined;

  set hass(hass: HomeAssistant) {
    if (!this._hass) this.init(hass);

    this.updateScheduleList(hass);
    this._hass = hass;
  }

  private init(hass): void {
    if (hass.states['sun.sun'] !== undefined) {
      this._config = Object.assign(
        { ...this._config },
        {
          sunrise: parseTimestamp(hass.states['sun.sun'].attributes.next_rising),
          sunset: parseTimestamp(hass.states['sun.sun'].attributes.next_setting),
        }
      );
    }
    if (hass.config.unit_system && hass.config.unit_system.temperature) {
      this._config = Object.assign({ ...this._config }, {
        temperature_unit: hass.config.unit_system.temperature,
      } as UserConfig);
    }
    if (!hass.user.is_admin) this._config = Object.assign({ ...this._config }, { is_admin: false });

    this.Config.LoadEntities(hass.states);

    // this.newItem = true;
    // this._view = EViews.Options;
    // this._entries = [...DefaultTimelineEntries].map(e => Object.assign(e, { entity: 'climate.mqtt_hvac' }));
  }

  protected updateScheduleList(hass) {
    const entities = filterObject(hass.states, (_, e) => IsSchedulerEntity(e)) as Dictionary<HassEntity>;
    if (IsEqual(entities, this._entities)) return;
    this._entities = entities;

    this.schedules = (Object.values(entities)
      .map(e => ImportFromHass(e, this.Config))
      .filter(e => e) as ScheduleEntry[]).filter(e => e);
  }

  setConfig(config: CardConfig) {
    ValidateConfig(config);
    const userCfgKeys = ['discover_existing', 'standard_configuration', 'include', 'exclude', 'groups', 'customize'];
    this._config = Object.assign({ ...this._config }, pick(config, Object.keys(this._config)));
    this.Config.setUserConfig(pick(config, userCfgKeys));
  }

  public getCardSize() {
    if (!this._hass || !this.schedules.length) return 6;
    return 6 + this.schedules.length * 2;
  }

  protected render() {
    if (this._view == EViews.Overview) return this.renderOverview();
    else if (this._view == EViews.NewSchedule) return this.renderNewItemView();
    else if (this._view == EViews.TimePicker) return this.renderTimePickerView();
    else if (this._view == EViews.TimeScheme) return this.renderTimeSchemeView();
    else if (this._view == EViews.Options) return this.renderOptionsView();
    else return html``; //shouldnt happen!
  }

  renderOverview() {
    return html`
      <scheduler-entities-card
        .hass=${this._hass}
        @editClick=${this._editItemClick}
        @newClick=${this._addItemClick}
      >
      </scheduler-entities-card>
    `;
  }

  renderNewItemView() {
    const timeSchemeButton =
      !this._entry || !this._entry.entity || !this.Config.GetActionsForEntity(this._entry.entity).length
        ? ''
        : html`
            <div class="card-section first">
              <div class="header">or</div>
              <div class="option-list">
                <mwc-button
                  class="${this._entry.action == CreateTimeScheme ? ' active' : ''}"
                  @click="${() => {
            this.selectAction(CreateTimeScheme);
          }}"
                >
                  <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
                  ${PrettyPrintName(CreateTimeScheme)}
                </mwc-button>
              </div>
            </div>
          `;

    return html`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
          <div class="header">${localize('fields.group')}</div>
          <div class="option-list">
            <button-group .items=${this.Config.GetGroups()} value=${this._selectedGroup} @change=${this.selectGroup}>
              ${localize('instructions.no_groups_defined')}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          <div class="header">${localize('fields.entity')}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetEntitiesForGroup(this._selectedGroup)}
              value=${this._entry.entity}
              @change=${this.selectEntity}
            >
              ${!this._selectedGroup
        ? localize('instructions.no_group_selected')
        : localize('instructions.no_entities_for_group')}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          <div class="header">${localize('fields.action')}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetActionsForEntity(this._entry.entity)}
              value=${this._entry.action}
              @change=${this.selectAction}
            >
              ${!this._entry || !this._entry.entity
        ? localize('instructions.no_entity_selected')
        : localize('instructions.no_actions_for_entity')}
            </button-group>
          </div>
        </div>
        ${timeSchemeButton}
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
          ${this._entry.action
        ? html`
                <mwc-button outlined @click="${this._confirmItemClick}">${localize('actions.next')}</mwc-button>
              `
        : html`
                <mwc-button outlined disabled>${localize('actions.next')}</mwc-button>
              `}
        </div>
      </ha-card>
    `;
  }

  renderTimePickerView() {
    const entity = this.Config.FindEntity(this._entry.entity);
    const action = this.Config.FindAction(this._entry.entity, this._entry.action);
    if (!entity || !action) return html``;

    return html`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
          <div class="header">${localize('fields.action')}</div>
          <div class="summary">
            <div class="summary-entity">
              <div class="summary-icon">
                ${
      entity.icon
        ? html`
                        <ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>
                      `
        : ''
      }
              </div>
              <div class="summary-text">
                ${PrettyPrintName(entity.name)}
              </div>
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right"></ha-icon>
            </div>
            <div class="summary-action">
              <div class="summary-icon">
                ${
      action.icon
        ? html`
                        <ha-icon icon="${PrettyPrintIcon(action.icon)}"></ha-icon>
                      `
        : ''
      }
              </div>
              <div class="summary-text">
                ${PrettyPrintName(action.name)}
              </div>
            </div>
          </div>
        </div>
        ${
      action.variable && action.variable.type == EVariableType.Level
        ? this.renderLevelPanel(action.variable as LevelVariableConfig)
        : ''
      }
        ${
      action.variable && action.variable.type == EVariableType.List
        ? this.renderListPanel(action.variable as ListVariableConfig)
        : ''
      }
        ${this.renderDayPicker()}
          
        <div class="card-section">
          <div class="header">${localize('fields.time')}</div>
          <time-picker value=${this._entry.time!.value} event=${this._entry.time!.event} stepSize="${
      this._config.time_step
      }" formatAmPm="${this._config.am_pm}" sunrise="${this._config.sunrise}" sunset="${this._config.sunset}" @change="${
      this.updateTime
      }"></timepicker>
        </div>
        ${
      this.newItem || !this._config.is_admin
        ? ''
        : html`
                <div class="card-section">
                  <mwc-button outlined @click="${this._deleteItemClick}" class="warning"
                    >${localize('actions.delete')}</mwc-button
                  >
                </div>
              `
      }
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
          <mwc-button outlined @click="${this._saveItemClick}">${localize('actions.save')}</mwc-button>
          <mwc-button outlined @click="${this._gotoOptionsClick}" style="float: right">${localize(
        'fields.options'
      )} <ha-icon icon="hass:chevron-right"></ha-icon></mwc-button>
          <div style="clear: both"></div>
        </div>
      </ha-card>
      `;
  }

  renderTimeSchemeView() {
    const entity = this.Config.FindEntity(this._entries[0].entity);
    if (!entity) return html``;

    const actions = this.Config.GetActionsForEntity(entity.id);
    const action = this._activeEntry !== null ? this.Config.FindAction(this._entry.entity, this._entry.action) : null;
    return html`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
          <div class="header">${localize('fields.action')}</div>
          <div class="summary">
            <div class="summary-entity">
              <div class="summary-icon">
                ${entity.icon
        ? html`
                      <ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>
                    `
        : ''}
              </div>
              <div class="summary-text">
                ${PrettyPrintName(entity.name)}
              </div>
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right"></ha-icon>
            </div>
            <div class="summary-action">
              <div class="summary-icon">
                <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"></ha-icon>
              </div>
              <div class="summary-text">
                ${PrettyPrintName(CreateTimeScheme)}
              </div>
            </div>
          </div>
          <div style="margin-top: 10px">
            <i
              >This feature is still in development. Use it at your own risk. Please leave your feedback in the
              <a href="https://community.home-assistant.io/t/scheduler-card-custom-component/217458">HA forum</a>.</i
            >
          </div>
        </div>
        ${this.renderDayPicker()}

        <div class="card-section" style="margin-top: 15px">
          <div class="header">${localize('fields.time')}</div>
          <timeslot-editor
            actions=${JSON.stringify(actions)}
            @update=${this.handlePlannerUpdate}
            temperatureunit=${this._config.temperature_unit}
            entries=${JSON.stringify(this._entries)}
          >
          </timeslot-editor>
        </div>
        <div class="card-section">
          <div class="header">${localize('fields.action')}</div>
          <div class="option-item">
            <button-group
              .items=${this.Config.GetActionsForEntity(this._entry.entity)}
              value=${this._entry.action}
              optional="true"
              @change=${this.selectAction}
            >
              Select a timeslot first
            </button-group>
          </div>
        </div>
        ${action && this._entry.variable && this._entry.variable.type == EVariableType.Level
        ? this.renderLevelPanel(action.variable as LevelVariableConfig, true)
        : ''}
        ${action && this._entry.variable && this._entry.variable.type == EVariableType.List
        ? this.renderListPanel(action.variable as ListVariableConfig, true)
        : ''}
        ${this.newItem || !this._config.is_admin
        ? ''
        : html`
              <div class="card-section">
                <mwc-button outlined @click="${this._deleteItemClick}" class="warning"
                  >${localize('actions.delete')}</mwc-button
                >
              </div>
            `}
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
          ${this.newItem || !this._config.is_admin
        ? ''
        : html`
                <mwc-button outlined @click="${this._deleteItemClick}">${localize('actions.delete')}</mwc-button>
              `}
          <mwc-button outlined @click="${this._gotoOptionsClick}" style="float: right"
            >${localize('fields.options')} <ha-icon icon="hass:chevron-right"></ha-icon
          ></mwc-button>
          <div style="clear: both"></div>
        </div>
      </ha-card>
    `;
  }

  renderOptionsView() {
    return html`
      <ha-card>
        ${this.renderTitle()}
        <options-panel
          .Config=${this.Config}
          .conditions=${this._entry.conditions}
          .options=${this._entry.options}
          .friendlyName=${this._friendlyName}
          @change=${this.optionsUpdated}
        >
        </options-panel>
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${localize('actions.cancel')}</mwc-button>
          ${this._entries.find(e => e.action)
        ? html`
                <mwc-button outlined @click="${this._saveItemClick}">${localize('actions.save')}</mwc-button>
              `
        : html`
                <mwc-button outlined disabled>${localize('actions.save')}</mwc-button>
              `}
          <mwc-button outlined @click="${this._optionsBackClick}" style="float: right"
            ><ha-icon icon="hass:chevron-left"></ha-icon> back</mwc-button
          >
          <div style="clear: both"></div>
        </div>
      </ha-card>
    `;
  }

  private renderTitle() {
    if (!this._config.title) return html``;
    let title = (typeof this._config.title == 'string') ? this._config.title : localize('scheduler');
    return html`
      <div class="card-header">
        <div class="name">
          ${title}
        </div>
      </div>
    `;
  }


  renderDayPicker() {
    const customDayPicker =
      this._entry.days.type == EDayType.Custom
        ? html`
            <div class="day-list" id="day-list-custom">
              <button-group
                .items=${DayOptions}
                .value=${this._entry.days.custom_days}
                min="1"
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `
        : '';

    return html`
      <div class="card-section">
        <div class="header">${localize('fields.days')}</div>
        <div class="day-list">
          <button-group .items=${DayTypeOptions} value=${this._entry.days.type} @change=${this.selectDays}>
          </button-group>
        </div>
        ${customDayPicker}
      </div>
    `;
  }

  renderLevelPanel(cfg: LevelVariableConfig, updateCard = false): TemplateResult {
    if (!cfg.unit.length && cfg.field == FieldTemperature)
      cfg = Object.assign({ ...cfg }, { unit: this._config.temperature_unit });
    const variable = this._entry.variable as LevelVariable;
    return html`
      <div class="card-section">
        <div class="header">
          ${cfg.name in ServiceParamTranslations
        ? localize(ServiceParamTranslations[cfg.name])
        : PrettyPrintName(cfg.name)}
        </div>
        <div class="option-item">
          <variable-slider
            min=${cfg.min}
            max=${cfg.max}
            step=${cfg.step}
            value=${variable.value}
            unit=${cfg.unit}
            optional=${cfg.optional}
            disabled=${!variable.enabled}
            @change="${e => {
        this.updateLevel(e, updateCard);
      }}"
          >
          </variable-slider>
        </div>
      </div>
    `;
  }

  renderListPanel(cfg: ListVariableConfig, updateCard = false): TemplateResult {
    return html`
      <div class="card-section">
        <div class="header">
          ${cfg.name in ServiceParamTranslations
        ? localize(ServiceParamTranslations[cfg.name])
        : PrettyPrintName(cfg.name)}
        </div>
        <div class="option-item">
          <button-group
            .items=${cfg.options.map(e => Object.assign(e, { name: e.value }))}
            value=${this._entry.variable?.value}
            @change=${e => this.selectListItem(e, updateCard)}
          >
            ${localize('instructions.no_entries_defined')}
          </button-group>
        </div>
      </div>
    `;
  }

  selectGroup(e: Event | string): void {
    const group = typeof e == 'string' ? e : (e.target as HTMLInputElement).value;
    this._selectedGroup = group;
    if (this.Config.GetEntitiesForGroup(group).length == 1)
      this.selectEntity(this.Config.GetEntitiesForGroup(group)[0].id);
    else this._entry = { ...DefaultEntry };
  }

  selectEntity(e: Event | string): void {
    const entity = typeof e == 'string' ? e : (e.target as HTMLInputElement).value;
    this._entry = Object.assign({ ...this._entry }, { entity: entity, action: '' } as Entry);
    if (this.Config.GetActionsForEntity(entity).length == 1)
      this.selectAction(this.Config.GetActionsForEntity(entity)[0].id);
  }

  selectAction(e: Event | string): void {
    const action = typeof e == 'string' ? e : (e.target as HTMLInputElement).value;
    const actionCfg = this.Config.FindAction(this._entry.entity, action);
    const entry = { ...this._entry };
    if (!actionCfg && action == CreateTimeScheme) {
      this._entry = Object.assign({ ...this._entry }, { action: CreateTimeScheme } as Entry);
      return;
    }

    if (action === null) Object.assign(entry, { action: '' } as Entry);
    else Object.assign(entry, { action: action } as Entry);
    if (actionCfg && actionCfg.variable) {
      if (actionCfg.variable.type == EVariableType.Level) {
        Object.assign(entry, {
          variable: {
            type: EVariableType.Level,
            value: (actionCfg.variable as LevelVariableConfig).min,
            enabled: !(actionCfg.variable as LevelVariableConfig).optional,
          },
        } as Entry);
      } else if (actionCfg.variable.type == EVariableType.List) {
        Object.assign(entry, {
          variable: { type: EVariableType.List, value: (actionCfg.variable as ListVariableConfig).options[0].value },
        } as Entry);
      }
    } else if (entry.variable) delete entry.variable;
    this._entry = entry;
    this._entries[this._activeEntry!] = this._entry;
  }

  updateTime(e: CustomEvent) {
    const el = e.target as HTMLInputElement;
    const value = Number(el.value);
    const event = e.detail.event == 'sunrise' ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
    Object.assign(this._entry, { time: e.detail.event ? { event: event, value: value } : { value: value } } as Entry);
  }

  selectDays(e: Event) {
    const input = (e.target as HTMLInputElement).value;
    const daysCfg: Days = { ...this._entry.days! };
    if (Object.values(EDayType).includes(input as EDayType)) {
      const dayType = input;
      Object.assign(daysCfg, { type: dayType });
      if (dayType == EDayType.Custom && !daysCfg.custom_days) {
        Object.assign(daysCfg, { custom_days: daysToArray(this._entry.days!) });
      }
    } else Object.assign(daysCfg, { custom_days: [...input] });
    this._entry = Object.assign({ ...this._entry }, { days: daysCfg } as Entry);
    if (this._view == EViews.TimeScheme) this._entries = this._entries.map(e => Object.assign(e, { days: daysCfg }));
  }

  handlePlannerUpdate(e: CustomEvent) {
    if (e.detail.hasOwnProperty('entries')) {
      const entries: Entry[] = e.detail.entries;
      if (entries.length < this._entries.length && this._activeEntry == this._entries.length - 1)
        this._activeEntry = this._entries.length - 2;
      this._entries = [...entries];
      if (this._activeEntry !== null) this._entry = this._entries[this._activeEntry];
      this._entry = { ...this._entry };
    } else if (e.detail.hasOwnProperty('entry')) {
      if (this._activeEntry !== null) this._entries[this._activeEntry] = this._entry;
      if (e.detail.entry !== null) {
        const activeEntry = Number(e.detail.entry);

        this._activeEntry = activeEntry;
        this._entry = this._entries[activeEntry];
      } else {
        this._activeEntry = null;
        this._entry = { ...this._entry };
      }
    }
  }

  updateLevel(e: Event, updateCard: boolean) {
    const el = e.target as HTMLInputElement;

    const variable: LevelVariable = {
      type: EVariableType.Level,
      value: Number(el.value),
      enabled: String(el.disabled) == 'false',
    };
    Object.assign(this._entry, { variable: variable });
    if (updateCard) this.requestUpdate();
  }

  selectListItem(e: Event, updateCard: boolean) {
    const value = (e.target as HTMLInputElement).value;
    const variable: ListVariable = { type: EVariableType.List, value: value };
    Object.assign(this._entry, { variable: variable });
    if (updateCard) this.requestUpdate();
  }

  optionsUpdated(e: CustomEvent) {
    const data: OptionPanelCfg = e.detail;
    if (data.conditions) {
      if (data.conditions.items.length) {
        this._entry = Object.assign({ ...this._entry }, { conditions: data.conditions } as Entry);
        this._entries = this._entries.map(e => Object.assign(e, { conditions: data.conditions } as Entry));
      } else {
        this._entry = extend(this._entry, { conditions: null }, { compact: true }) as Entry;
        this._entries = this._entries.map(e =>
          Object.assign(e, extend(e, { conditions: null }, { compact: true }) as Entry)
        );
      }
    }
    if (data.options) {
      if (Object.keys(data.options).length) {
        this._entry = Object.assign({ ...this._entry }, { options: data.options } as Entry);
        this._entries = this._entries.map(e => Object.assign(e, { options: data.options } as Entry));
      } else {
        this._entry = extend(this._entry, { options: null }, { compact: true }) as Entry;
        this._entries = this._entries.map(e =>
          Object.assign(e, extend(e, { options: null }, { compact: true }) as Entry)
        );
      }
    }
    if (data.friendly_name !== undefined) {
      this._friendlyName = data.friendly_name;
    }
  }

  private _addItemClick(): void {
    this.newItem = true;
    this._entry = { ...DefaultEntry };
    const groups = this.Config.GetGroups();
    if (groups.length == 1) {
      this.selectGroup(groups[0].id);
      if (this._entry.action) this._confirmItemClick();
    }
    this._friendlyName = undefined;
    this._view = EViews.NewSchedule;
  }

  private _cancelEditClick(): void {
    this.newItem = false;
    this.editItem = null;
    this._view = EViews.Overview;
  }

  private _confirmItemClick(): void {
    const actionCfg = this.Config.FindAction(this._entry.entity, this._entry.action);
    if (actionCfg) {
      this._entries = [this._entry];
      this._activeEntry = 0;
      this._view = EViews.TimePicker;
    } else if (this._entry.action == CreateTimeScheme) {
      this._entries = [...DefaultTimelineEntries].map(e => Object.assign(e, { entity: this._entry.entity }));
      this._entry = { ...DefaultEntry };
      this._activeEntry = null;
      this._view = EViews.TimeScheme;
    }
  }

  _saveItemClick(): void {
    const entries = this._entries;
    if (this._activeEntry !== null) entries[this._activeEntry] = this._entry;

    const data = ExportToHass(entries, this.Config, this._friendlyName);

    if (this.newItem) {
      this._hass!.callService('scheduler', 'add', data);
    } else if (this.editItem) {
      this._hass!.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.editItem }));
    }

    this.newItem = false;
    this.editItem = null;
    this._view = EViews.Overview;
  }

  _deleteItemClick(): void {
    const entity_id = this.editItem;
    this._hass!.callService('scheduler', 'remove', { entity_id: entity_id });
    this.newItem = false;
    this.editItem = null;
    this._view = EViews.Overview;
  }

  _editItemClick(ev: CustomEvent): void {
    let entity_id = ev.detail;
    const item = this.schedules.find(e => e.id == entity_id);
    if (!item) return;

    let entries = [...item.entries];

    if (item.entries.every(e => e.endTime)) {
      entries = calculateTimeline(entries);
      this._entry = Object.assign({ ...DefaultEntry }, pick(entries[0], ['entity', 'days']));
      this._activeEntry = null;
      this._view = EViews.TimeScheme;
    } else {
      this._entry = entries[0];
      this._activeEntry = 0;
      this._view = EViews.TimePicker;
    }
    this._entries = entries;
    this.editItem = entity_id;
    this._friendlyName = item.name;
  }
  _gotoOptionsClick(): void {
    this._view = EViews.Options;
  }

  _optionsBackClick(): void {
    if (this._entries.every(e => e.endTime)) this._view = EViews.TimeScheme;
    else this._view = EViews.TimePicker;
  }

  _toggleDisableAll(ev): void {
    let checked = (ev.target as HTMLInputElement).checked;
    this.schedules.forEach(schedule => {
      this._hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: schedule.id });
    });
  }
}
