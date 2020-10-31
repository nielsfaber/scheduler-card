import { LitElement, html, customElement, property, TemplateResult, CSSResult, css } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent, computeDomain, computeEntity } from 'custom-card-helpers';
import { CardConfig, EntityElement } from '../types';
import { PrettyPrintIcon } from '../helpers';
import { localize } from '../localize/localize';
import { DefaultTimeStep } from '../const';
import { commonStyle } from '../styles';
import { domainIcons } from '../standard-configuration/standardIcon';
import { parseEntity } from '../data/parse_entity';
import { computeEntityActions } from '../data/compute_entity_actions';
import { IsSchedulerEntity } from '../data/filter_entity';

@customElement('scheduler-card-editor')
export class SchedulerCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config?: CardConfig;
  @property() selectedDomain = '';
  @property() titleOption = 'standard';

  public setConfig(config: CardConfig): void {
    this._config = config;
    this.titleOption = this.getTitleOption();
  }
  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="header">Title of the card</div>
        <button-group
          .items=${['standard', 'hidden', 'custom']}
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
          Disable if you want to use multiple scheduler-cards.
        </div>
        <button-group
          .items=${[
            { id: 'true', name: 'on' },
            { id: 'false', name: 'off' },
          ]}
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
          @change=${this.updateTimeStepOption}
        >
        </variable-slider>

        <div class="header">Included entities</div>
        <div class="text-field">Click on a group to open it.</div>
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
    if (!this._config || !this.hass) return localize('ui.panel.common.title', this.hass.language);
    if (this._config.title === undefined) return localize('ui.panel.common.title', this.hass.language);
    if (typeof this._config.title == 'string') return this._config.title;
    if (this._config.title == false) return '';
    else return localize('ui.panel.common.title', this.hass.language);
  }

  private updateTitleOption(e: Event) {
    const type = (e.target as HTMLInputElement).value;
    if (!this._config || !this.hass) return;
    this.titleOption = type;
    const config = { ...this._config };
    if (type == 'standard') {
      if ('title' in this._config) {
        delete config.title;
      }
    } else if (type == 'hidden') {
      Object.assign(config, { title: false });
    }
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private updateTitle(e: Event) {
    if (!this._config || !this.hass) return;
    const config = { ...this._config };
    const value = String((e.target as HTMLInputElement).value);
    Object.assign(config, { title: value });
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDiscoveryOption() {
    if (!this._config || !this.hass) return;
    const discover_existing = this._config.hasOwnProperty('discover_existing') ? this._config.discover_existing : true;
    return discover_existing;
  }

  private updateDiscoveryOption(e: Event) {
    const value = (e.target as HTMLInputElement).value == 'true';
    if (!this._config || !this.hass) return;
    const config = { ...this._config };
    if (!value) Object.assign(config, { discover_existing: value });
    else if (config.hasOwnProperty('discover_existing')) delete config['discover_existing'];
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getTimeStepOption() {
    if (!this._config || !this.hass) return;
    const time_step = this._config.hasOwnProperty('time_step') ? this._config.time_step : DefaultTimeStep;
    return Number(time_step);
  }

  private updateTimeStepOption(e: Event) {
    if (!this._config || !this.hass) return;
    const config = { ...this._config };
    const value = Number((e.target as HTMLInputElement).value);
    if (value == DefaultTimeStep && config.hasOwnProperty('time_step')) delete config['time_step'];
    else Object.assign(config, { time_step: value });
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDomainSwitches() {
    if (!this._config || !this.hass) return;
    const includedDomains = this._config.include ? [...this._config.include] : [];
    const entityList = Object.keys(this.hass.states)
      .filter(e => !IsSchedulerEntity(e))
      .map(e => parseEntity(e, this.hass!, { include: ['*'] }))
      .filter(e => computeEntityActions(e.id, this.hass!, {}).length) as EntityElement[];

    const domainList = entityList.map(e => computeDomain(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);

    return domainList.map(domain => {
      const enabled = includedDomains.includes(domain);
      const count = entityList.filter(e => computeDomain(e.id) == domain).length;
      if (!count) return ``;
      return html`
        <div
          class="row"
          @click=${() => {
            this.toggleSelectDomain(domain);
          }}
        >
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
          </div>
          <ha-icon-button icon="${this.selectedDomain == domain ? 'mdi:chevron-down' : 'mdi:chevron-right'}">
          </ha-icon-button>
        </div>
        ${this.selectedDomain == domain
          ? html`
              <div class="divider"></div>
              ${this.getEntitySwitches(domain)}
              <div class="divider"></div>
            `
          : ''}
      `;
    });
  }

  getEntitySwitches(domain: string) {
    if (!this._config || !this.hass) return;
    const includedEntities = this._config.include ? [...this._config.include] : [];
    return Object.entries(this.hass.states)
      .filter(([e]) => computeDomain(e) == domain && !IsSchedulerEntity(e))
      .map(([entity_id, cfg]) => {
        const name = cfg.attributes.friendly_name || computeEntity(entity_id);
        const enabled = includedEntities.includes(entity_id);
        return html`
          <div class="row" @click=${() => this.toggleSelectEntity(entity_id)}>
            <state-badge .hass=${this.hass} .stateObj=${this.hass!.states[entity_id]}> </state-badge>
            <div class="info">
              ${name}
              <div class="secondary">
                ${entity_id}
              </div>
            </div>
            <ha-switch ?checked=${enabled}> </ha-switch>
          </div>
        `;
      });
  }

  toggleSelectDomain(domain: string) {
    if (!this._config || !this.hass) return;
    if (this.selectedDomain != domain) {
      this.selectedDomain = domain;
    } else {
      this.selectedDomain = '';
    }
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

  static get styles(): CSSResult {
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
