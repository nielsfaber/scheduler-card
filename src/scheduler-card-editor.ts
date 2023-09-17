import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent, computeDomain, LovelaceCardConfig } from 'custom-card-helpers';
import { CardConfig, EntityElement } from './types';
import { getLocale, sortAlphabetically, AsArray, PrettyPrintIcon, pick } from './helpers';
import { localize } from './localize/localize';
import { DefaultCardConfig, DefaultTimeStep } from './const';
import { commonStyle } from './styles';
import { fetchSchedules, fetchTags } from './data/websockets';

import { loadHaForm } from './load-ha-form';
import { computeActions } from './data/actions/compute_actions';
import { computeEntities } from './data/entities/compute_entities';
import { parseEntity } from './data/entities/parse_entity';
import { domainIcons } from './standard-configuration/standardIcon';
import { standardStates } from './standard-configuration/standardStates';
import { entityFilter } from './data/entities/entity_filter';

@customElement('scheduler-card-editor')
export class SchedulerCardEditor extends LitElement implements LovelaceCardEditor {
  @property()
  public hass?: HomeAssistant;

  @property()
  private _config?: CardConfig;

  @property()
  scheduleEntities: string[] = [];

  @property()
  tagOptions?: string[];

  @state()
  private _cardTab = false;

  @property()
  selectedDomain = '';

  public setConfig(config: LovelaceCardConfig | CardConfig): void {
    this._config = config as CardConfig;
  }

  async firstUpdated() {
    await loadHaForm();
    this.scheduleEntities = (await fetchSchedules(this.hass!)).map(e => e.entity_id);
    const tagOptions = (await fetchTags(this.hass!)).map(e => e.name);
    tagOptions.sort(sortAlphabetically);
    this.tagOptions = tagOptions;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <paper-tabs .selected=${this._cardTab ? 1 : 0} @iron-activate=${this._selectTab}>
        <paper-tab>${localize('ui.panel.card_editor.tabs.entities', getLocale(this.hass))}</paper-tab>
        <paper-tab>${localize('ui.panel.card_editor.tabs.other', getLocale(this.hass))}</paper-tab>
      </paper-tabs>

      <div class="card-config">
        ${!this._cardTab
          ? html`
              <div class="header">
                ${localize('ui.panel.card_editor.fields.entities.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.entities.description', getLocale(this.hass))}
              </div>
              ${this.getDomainSwitches()}
            `
          : html`
              <div class="header">${localize('ui.panel.card_editor.fields.title.heading', getLocale(this.hass))}</div>
              <button-group
                .items=${[
                  {
                    name: localize('ui.panel.card_editor.fields.title.options.standard', getLocale(this.hass)),
                    value: 'standard',
                  },
                  {
                    name: localize('ui.panel.card_editor.fields.title.options.hidden', getLocale(this.hass)),
                    value: 'hidden',
                  },
                  {
                    name: localize('ui.panel.card_editor.fields.title.options.custom', getLocale(this.hass)),
                    value: 'custom',
                  },
                ]}
                value=${this.getTitleOption()}
                @change=${(ev: Event) => this._setTitleFormatOption((ev.target as HTMLInputElement).value)}
              >
              </button-group>
              ${typeof this._config.title == 'string'
                ? html`
                    <ha-textfield
                      label=${localize('ui.panel.card_editor.fields.title.custom_title', getLocale(this.hass))}
                      .value=${this._config.title}
                      @input=${(ev: Event) => {
                        this._updateConfig({ title: String((ev.target as HTMLInputElement).value) });
                      }}
                    ></ha-textfield>
                  `
                : ''}

              <div class="header">
                ${localize('ui.panel.card_editor.fields.discover_existing.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.discover_existing.description', getLocale(this.hass))}
              </div>
              <ha-switch
                ?checked=${this._config.discover_existing !== false}
                @change=${(ev: Event) => {
                  this._updateConfig({ discover_existing: (ev.target as HTMLInputElement).checked });
                }}
              >
              </ha-switch>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.time_step.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.time_step.description', getLocale(this.hass))}
              </div>
              <variable-slider
                min="1"
                max="30"
                step="1"
                value=${this._config.time_step || DefaultTimeStep}
                unit=" min"
                ?optional=${false}
                ?disabled=${false}
                @value-changed=${(ev: CustomEvent) => {
                  this._updateConfig({ time_step: Number(ev.detail.value) });
                }}
              >
              </variable-slider>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.sort_by.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.sort_by.description', getLocale(this.hass))}
              </div>

              <div>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.relative_time', getLocale(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('relative-time')}
                    value="relative-time"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.title', getLocale(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('title')}
                    value="title"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
              </div>

              <div>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.state', getLocale(this.hass))}
                >
                  <ha-checkbox
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('state')}
                    value="state"
                    @change=${this._setSortBy}
                  ></ha-checkbox>
                </ha-formfield>
              </div>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.display_format_primary.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.display_format_primary.description', getLocale(this.hass))}
              </div>

              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_primary.options.default',
                  getLocale(this.hass)
                )}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${(this._config.display_options || DefaultCardConfig.display_options).primary_info ==
                    'default'}
                  value="default"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>
              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_primary.options.entity_action',
                  getLocale(this.hass)
                )}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${(this._config.display_options || DefaultCardConfig.display_options).primary_info ==
                    '{entity}: {action}'}
                  value="{entity}: {action}"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.display_format_secondary.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.display_format_secondary.description', getLocale(this.hass))}
              </div>

              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_secondary.options.relative_time',
                  getLocale(this.hass)
                )}
              >
                <ha-checkbox
                  ?checked=${AsArray(
                    (this._config.display_options || DefaultCardConfig.display_options).secondary_info
                  ).includes('relative-time')}
                  value="relative-time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_secondary.options.time',
                  getLocale(this.hass)
                )}
              >
                <ha-checkbox
                  ?checked=${AsArray(
                    (this._config.display_options || DefaultCardConfig.display_options).secondary_info
                  ).includes('time')}
                  value="time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_secondary.options.days',
                  getLocale(this.hass)
                )}
              >
                <ha-checkbox
                  ?checked=${AsArray(
                    (this._config.display_options || DefaultCardConfig.display_options).secondary_info
                  ).includes('days')}
                  value="days"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize(
                  'ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks',
                  getLocale(this.hass)
                )}
              >
                <ha-checkbox
                  ?checked=${AsArray(
                    (this._config.display_options || DefaultCardConfig.display_options).secondary_info
                  ).includes('additional-tasks')}
                  value="additional-tasks"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.show_header_toggle.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.show_header_toggle.description', getLocale(this.hass))}
              </div>
              <ha-switch
                ?checked=${this._config.show_header_toggle}
                @change=${(ev: Event) => {
                  this._updateConfig({ show_header_toggle: (ev.target as HTMLInputElement).checked });
                }}
              >
              </ha-switch>

              ${this.tagOptions !== undefined
                ? html`
                    <div class="header">
                      ${localize('ui.panel.card_editor.fields.tags.heading', getLocale(this.hass))}
                    </div>
                    <div class="text-field">
                      ${localize('ui.panel.card_editor.fields.tags.description', getLocale(this.hass))}
                    </div>
                    <scheduler-selector
                      .items=${this.getTagOptions()}
                      .value=${AsArray(this._config!.tags)}
                      @value-changed=${this.updateTags}
                      label=${this.hass.localize('ui.panel.config.tag.add_tag')}
                    >
                    </scheduler-selector>
                  `
                : ''}
            `}
      </div>
    `;
  }

  private _selectTab(ev: CustomEvent): void {
    this._cardTab = ev.detail.selected === 1;
  }

  private _updateConfig(changes: Partial<CardConfig>) {
    if (!this._config) return;
    this._config = { ...this._config, ...changes };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _setTitleFormatOption(option: string) {
    if (!this.hass) return;
    if (option == 'standard') this._updateConfig({ title: true });
    else if (option == 'hidden') this._updateConfig({ title: false });
    else
      this._updateConfig({
        title:
          typeof this._config?.title === 'string'
            ? this._config.title
            : localize('ui.panel.common.title', getLocale(this.hass)),
      });
  }

  private getTitleOption() {
    if (!this.hass || !this._config) return '';
    if (typeof this._config.title == 'string') return 'custom';
    return this._config.title ? 'standard' : 'hidden';
  }

  private updateTags(ev: Event) {
    if (!this._config || !this.hass) return;
    let value = ((ev.target as HTMLInputElement).value as unknown) as string[];
    value = value.map(e => e.trim());
    value.sort(sortAlphabetically);
    this._updateConfig({ tags: value });
  }

  getTagOptions() {
    if (!this._config || !this.hass) return [];
    let options = this.tagOptions || [];
    if (this._config.tags) {
      const configTags = AsArray(this._config.tags);
      options = [...options, ...configTags.filter(e => !options.includes(e))];
    }
    return options.map(e => Object({ name: e, value: e }));
  }

  private _setSortBy(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    const value = (ev.target as HTMLInputElement).value;
    let config = AsArray(this._config?.sort_by || DefaultCardConfig.sort_by);
    if (value != 'state' && checked) config = config.filter(e => e == 'state');
    if (!config.includes(value) && checked) config = [...config, value];
    if (config.includes(value) && !checked) config = config.filter(e => e != value);
    this._updateConfig({ sort_by: config });
  }

  private _setDisplayOptionsPrimary(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    const displayOptions = {
      ...(this._config?.display_options || DefaultCardConfig.display_options),
      primary_info: value,
    };
    this._updateConfig({ display_options: displayOptions });
  }

  private _setDisplayOptionsSecondary(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    const checked = (ev.target as HTMLInputElement).checked;
    let displayOptions = {
      ...(this._config?.display_options || DefaultCardConfig.display_options),
    };
    let secondaryInfo = AsArray(displayOptions.secondary_info || []);
    secondaryInfo = checked ? Array.from(new Set([...secondaryInfo, value])) : secondaryInfo.filter(e => e !== value);
    secondaryInfo.sort((a, b) => {
      const ranking = {
        'relative-time': 1,
        time: secondaryInfo.includes('relative-time') ? 3 : 2,
        days: secondaryInfo.includes('relative-time') ? 2 : 3,
        'additional-tasks': 4,
      };
      const rankA = Object.keys(ranking).includes(a) ? ranking[a] : 5;
      const rankB = Object.keys(ranking).includes(b) ? ranking[b] : 5;
      if (rankA > rankB) return 1;
      if (rankA < rankB) return -1;
      return 0;
    });
    displayOptions = { ...displayOptions, secondary_info: [...secondaryInfo] };
    this._updateConfig({ display_options: displayOptions });
  }

  getDomainSwitches() {
    if (!this._config || !this.hass) return;

    const entities = computeEntities(
      this.hass,
      { ...DefaultCardConfig, include: ['*'] },
      { filterActions: true, filterStates: true }
    )
      .filter(e => computeDomain(e) !== 'switch' || !this.scheduleEntities.includes(e))
      .map(e => parseEntity(e, this.hass!, { include: ['*'] }))
      .filter(e => standardStates(e.id, this.hass!) || computeActions(e.id, this.hass!, DefaultCardConfig));

    const domainList = entities.map(e => computeDomain(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);
    domainList.sort((a, b) => (a.trim().toLowerCase() < b.trim().toLowerCase() ? -1 : 1));

    return domainList.map(domain => {
      const count = entities.filter(e => computeDomain(e.id) == domain).length;
      const domainEntities = entities.filter(e => computeDomain(e.id) == domain);
      const includedCount = domainEntities.filter(e => entityFilter(e.id, this._config!)).length;

      if (!count) return ``;
      return html`
        <div class="row" @click=${() => this.toggleShowDomain(domain)}>
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${localize(
                'ui.panel.card_editor.fields.entities.included_number',
                getLocale(this.hass!),
                ['{number}', '{total}'],
                [includedCount, count]
              )}
            </div>
          </div>
          <ha-switch
            @click=${(ev: Event) => ev.stopPropagation()}
            @change=${(ev: Event) => this.toggleSelectEntity(domain, (ev.target as HTMLInputElement).checked)}
            ?checked=${entityFilter(domain, this._config!)}
            ?disabled=${entityFilter(domain, { groups: this._config?.groups })}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain == domain
          ? html`
              <div class="divider"></div>
              ${domainEntities.map(entity => {
                return html`
                  <div class="row" @click=${() => this.toggleSelectEntity(entity.id)}>
                    <ha-icon icon="${entity.icon}"></ha-icon>
                    <div class="info">
                      ${entity.name}
                      <div class="secondary">
                        ${entity.id}
                      </div>
                    </div>
                    <ha-switch
                      ?checked=${entityFilter(entity.id, this._config!)}
                      ?disabled=${entityFilter(entity.id, { groups: this._config?.groups }) ||
                        entityFilter(domain, { groups: this._config?.groups })}
                    ></ha-switch>
                  </div>
                `;
              })}
              <div class="divider"></div>
            `
          : ''}
      `;
    });
  }

  toggleShowDomain(domain: string) {
    if (!this._config || !this.hass) return;
    if (this.selectedDomain != domain) {
      this.selectedDomain = domain;
    } else {
      this.selectedDomain = '';
    }
  }

  toggleSelectEntity(entity_id: string, newValue?: boolean) {
    if (!this._config || !this.hass) return;
    const isIncluded = entityFilter(entity_id, this._config);
    if (newValue === undefined) newValue = !isIncluded;
    const entityDomain = computeDomain(entity_id);

    let include = [...(this._config.include || [])];
    let exclude = [...(this._config.exclude || [])];

    if (!isIncluded && newValue) {
      if (exclude.includes(entity_id)) exclude = exclude.filter(e => e != entity_id);
      if (!include.includes(entity_id)) include = [...include, entity_id];
    } else if (isIncluded && !newValue) {
      if (
        (entityDomain && include.includes(entityDomain)) ||
        entityFilter(entity_id, { customize: this._config.customize }) ||
        (entityDomain && entityFilter(entityDomain, { customize: this._config.customize }))
      )
        exclude = [...exclude, entity_id];
      if (include.includes(entity_id)) include = include.filter(e => e != entity_id);
    } else return;

    include.sort(sortAlphabetically);
    exclude.sort(sortAlphabetically);
    this._updateConfig({ include: include, exclude: exclude });
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}

      paper-tabs {
        --paper-tabs-selection-bar-color: var(--primary-color);
        --paper-tab-ink: var(--primary-color);
        text-transform: uppercase;
        font-size: 0.875rem;
      }
      paper-tab.iron-selected {
        color: var(--primary-color);
      }
      div.row {
        display: flex;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        margin: 10px 0px;
      }
      div.divider {
        height: 1px;
        background: var(--divider-color);
      }
      .info {
        margin-left: 16px;
        flex: 1 0 60px;
      }
      .info,
      .info > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .secondary {
        display: block;
        color: var(--secondary-text-color);
      }
      div.row ha-icon {
        padding: 8px;
        color: var(--state-icon-color);
      }
      div.row state-badge {
        flex: 0 0 40px;
      }
      div.row ha-switch {
        padding: 13px 5px;
      }
      ha-textfield {
        width: 100%;
      }
    `;
  }
}
