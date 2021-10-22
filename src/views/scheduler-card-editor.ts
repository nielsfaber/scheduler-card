import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent, computeDomain } from 'custom-card-helpers';
import { CardConfig, EntityElement } from '../types';
import { PrettyPrintIcon, getLocale, sortAlphabetically, AsArray } from '../helpers';
import { localize } from '../localize/localize';
import { DefaultTimeStep, DefaultCardConfig } from '../const';
import { commonStyle } from '../styles';
import { domainIcons } from '../standard-configuration/standardIcon';
import { parseEntity } from '../data/entities/parse_entity';
import { fetchSchedules, fetchTags } from '../data/websockets';
import { standardStates } from '../standard-configuration/standardStates';
import { computeEntities } from '../data/entities/compute_entities';
import { computeActions } from '../data/actions/compute_actions';

import { loadHaForm } from '../load-ha-form';

@customElement('scheduler-card-editor')
export class SchedulerCardEditor extends LitElement implements LovelaceCardEditor {

  @property()
  public hass?: HomeAssistant;

  @property()
  private _config?: CardConfig;

  @property()
  selectedDomain = '';

  @property()
  titleOption = 'standard';

  @property()
  scheduleEntities: string[] = [];

  @property()
  tagOptions?: string[];

  public setConfig(config: CardConfig): void {
    this._config = config;
    this.titleOption = this.getTitleOption();
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
      <div class="card-config">
        <div class="header">Title of the card</div>
        <button-group
          .items=${[{ value: 'standard' }, { value: 'hidden' }, { value: 'custom' }]}
          value=${this.getTitleOption()}
          @change=${this.updateTitleOption}
        >
        </button-group>
        ${this.titleOption == 'custom'
        ? html`
              <paper-input
                label="Custom title"
                .value=${this.getTitle()}
                .configValue=${'name'}
                @value-changed=${this.updateTitle}
              ></paper-input>
            `
        : ''}

        <div class="header">Show all schedules</div>
        <div class="text-field">
          This sets the 'discover existing' parameter.<br />
          Previously created schedules will be automatically added to the card. 
        </div>
        <button-group
          .items=${[{ value: 'on' }, { value: 'off' }]}
          value=${this.getDiscoveryOption()}
          @change=${this.updateDiscoveryOption}
        >
        </button-group>

        <div class="header">Time step</div>
        <div class="text-field">Resolution (in minutes) for creating schedules</div>
        <variable-slider
          min="1"
          max="30"
          step="1"
          value=${this.getTimeStepOption()}
          unit=" min"
          ?optional=${false}
          ?disabled=${false}
          @value-changed=${this.updateTimeStepOption}
        >
        </variable-slider>

        ${this.tagOptions !== undefined ? html`
        <div class="header">Tags</div>
        <div class="text-field">Use tags to sort schedules between multiple cards</div>
        <scheduler-selector
          .items=${this.getTagOptions()}
          .value=${this.getTagValue()}
          @value-changed=${this.updateTags}
          label=${this.hass.localize('ui.panel.config.tag.add_tag')}
        >
        </scheduler-selector>` : ''}

        <div class="header">Included entities</div>
        <div class="text-field">Select the entities that you want to control using the scheduler. You can click on a group to open it.<br> Note that some entities (such as sensors) can only be used for conditions, not for actions.</div>
        ${this.getDomainSwitches()}
      </div>
    `;
  }

  private getTitleOption() {
    if (!this._config || !this.hass) return 'standard';
    if (this._config.title === undefined) return 'standard';
    if (typeof this._config.title == 'string') return 'custom';
    if (this._config.title == false) return 'hidden';
    else return 'standard';
  }

  private getTitle() {
    if (!this.hass) return '';
    if (!this._config || !this.hass) return localize('ui.panel.common.title', getLocale(this.hass));
    if (this._config.title === undefined) return localize('ui.panel.common.title', getLocale(this.hass));
    if (typeof this._config.title == 'string') return this._config.title;
    if (this._config.title == false) return '';
    else return localize('ui.panel.common.title', getLocale(this.hass));
  }

  private updateTitleOption(e: Event) {
    const type = (e.target as HTMLInputElement).value;
    if (!this._config || !this.hass) return;
    this.titleOption = type;

    this._config = {
      ...this._config,
      title:
        type == 'standard'
          ? true
          : type == 'hidden'
            ? false
            : this._config.title
    };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private updateTitle(ev: Event) {
    if (!this._config || !this.hass) return;
    const value = String((ev.target as HTMLInputElement).value);
    this._config = { ...this._config, title: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDiscoveryOption() {
    if (!this._config || !this.hass) return;
    const discover_existing = this._config.hasOwnProperty('discover_existing') ? this._config.discover_existing : true;
    return discover_existing ? 'on' : 'off';
  }

  private updateDiscoveryOption(ev: Event) {
    const value = (ev.target as HTMLInputElement).value == 'on';
    if (!this._config || !this.hass) return;
    this._config = { ...this._config, discover_existing: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getTimeStepOption() {
    if (!this._config || !this.hass) return;
    const time_step = this._config.hasOwnProperty('time_step') && !isNaN(this._config.time_step) ? this._config.time_step : DefaultTimeStep;
    return Number(time_step);
  }

  private updateTimeStepOption(ev: CustomEvent) {
    if (!this._config || !this.hass) return;
    const value = Number(ev.detail.value);
    this._config = { ...this._config, time_step: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getTagValue() {
    return AsArray(this._config!.tags);
  }

  private updateTags(ev: Event) {
    if (!this._config || !this.hass) return;
    let value = (ev.target as HTMLInputElement).value as unknown as string[];
    value = value.map(e => e.trim());
    value.sort(sortAlphabetically);
    this._config = { ...this._config, tags: value };
    fireEvent(this, 'config-changed', { config: this._config });
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

  getDomainSwitches() {
    if (!this._config || !this.hass) return;

    const entities = computeEntities(this.hass, { ...DefaultCardConfig, include: ['*'] }, { filterActions: true, filterStates: true})
      .filter(e => computeDomain(e) !== "switch" || !this.scheduleEntities.includes(e))
      .map(e => parseEntity(e, this.hass!, { include: ['*'] }))
      .filter(e => standardStates(e.id, this.hass!) || computeActions(e.id, this.hass!, DefaultCardConfig));

    const domainList = entities.map(e => computeDomain(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);
    domainList.sort((a, b) => (a.trim().toLowerCase() < b.trim().toLowerCase() ? -1 : 1));

    const includedDomains = this._config.include ? [...this._config.include] : [];

    return domainList.map(domain => {
      const count = entities.filter(e => computeDomain(e.id) == domain).length;
      if (!count) return ``;
      return html`
        <div
          class="row"
          @click=${() => { this.toggleShowDomain(domain); }}
        >
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
          </div>
          <ha-switch
            @click=${(ev: Event) => { ev.stopPropagation() }}
            @change=${(ev: Event) => this.toggleSelectDomain(domain, (ev.target as HTMLInputElement).checked)}
            ?checked=${includedDomains.includes(domain)}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain == domain
          ? html`
              <div class="divider"></div>
              ${this.getEntitySwitches(entities.filter(e => computeDomain(e.id) == domain))}
              <div class="divider"></div>
            `
          : ''}
      `;
    });
  }

  getEntitySwitches(entities: EntityElement[]) {
    if (!this._config || !this.hass) return;
    const includedEntities = this._config.include ? [...this._config.include] : [];
    return entities
      .map(entity => {
        const enabled = includedEntities.includes(entity.id) || includedEntities.includes(computeDomain(entity.id));
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
              ?checked=${enabled}
              ?disabled=${includedEntities.includes(computeDomain(entity.id))}
            ></ha-switch>
          </div>
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

  toggleSelectDomain(domain: string, enabled: boolean) {
    if (!this._config || !this.hass) return;
    let includedEntities = this._config.include ? [...this._config.include] : [];
    if (!includedEntities.includes(domain) && enabled) {
      includedEntities = includedEntities.filter(e => computeDomain(e) != domain);
      includedEntities.push(domain);
    }
    else if (includedEntities.includes(domain) && !enabled) includedEntities = includedEntities.filter(e => e != domain);
    else return;
    includedEntities.sort();
    this._config = Object.assign({ ...this._config }, { include: includedEntities });
    fireEvent(this, 'config-changed', { config: this._config });
  }

  toggleSelectEntity(entity_id: string) {
    if (!this._config || !this.hass) return;
    let includedEntities = this._config.include ? [...this._config.include] : [];
    if (!includedEntities.includes(entity_id)) includedEntities.push(entity_id);
    else includedEntities = includedEntities.filter(e => e != entity_id);
    includedEntities.sort();
    this._config = Object.assign({ ...this._config }, { include: includedEntities });
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
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
        color: var(--paper-item-icon-color);
      }
      div.row state-badge {
        flex: 0 0 40px;
      }
      div.row ha-switch {
        padding: 13px 5px;
      }
    `;
  }
}