import { LitElement, html, customElement, property, TemplateResult, CSSResult, css } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent, computeDomain, computeEntity } from 'custom-card-helpers';
import { CardConfig } from '../types';
import { default as standardConfig } from '../standard-configuration.json';
import { PrettyPrintIcon } from '../helpers';
import { localize } from '../localize/localize';
import { IsSchedulerEntity } from '../entity';
import { DefaultTimeStep } from '../const';
import { commonStyle } from '../styles';

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
        ${this.titleOption == 'custom' ? html`
        <paper-input
          label="Custom title"
          .value=${this.getTitle()}
          .configValue=${'name'}
          @value-changed=${this.updateTitle}
        ></paper-input>
      `  : ''}
        
        <div class="header">Show all schedules</div>
        <div class="text-field">This sets the 'discover existing' parameter.<br> Disable if you want to use multiple scheduler-cards.</div>
        <button-group
          .items=${[{ id: 'true', name: 'on' }, { id: 'false', name: 'off' }]}
          value=${this.getDiscoveryOption()}
          @change=${this.updateDiscoveryOption}
        >
        </button-group>
        
        <div class="header">Time display</div>
        <button-group
          .items=${[{ id: 'false', name: '24 hours' }, { id: 'true', name: 'AM/PM' }]}
          value=${this.getAmPmOption()}
          @change=${this.updateAmPmOption}
        >
        </button-group>
        
        <div class="header">Time step</div>
        <div class="text-field">Resolution (in minutes) for creating schedules</div>
        <variable-slider
          min=1
          max=30
          step=1
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
    if (typeof this._config.title == "string") return 'custom';
    if (this._config.title == false) return 'hidden';
    else return 'standard';
  }

  private getTitle() {
    if (!this._config || !this.hass) return localize('scheduler');
    if (this._config.title === undefined) return localize('scheduler');
    if (typeof this._config.title == "string") return this._config.title;
    if (this._config.title == false) return '';
    else return localize('scheduler');
  }

  private updateTitleOption(e: Event) {
    let type = (e.target as HTMLInputElement).value;
    if (!this._config || !this.hass) return;
    this.titleOption = type;
    let config = { ...this._config };
    if (type == 'standard') {
      if ('title' in this._config) {
        delete config.title;
      }
    }
    else if (type == 'hidden') {
      Object.assign(config, { title: false });
    }
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private updateTitle(e: Event) {
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    let value = String((e.target as HTMLInputElement).value);
    Object.assign(config, { title: value });
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDiscoveryOption() {
    if (!this._config || !this.hass) return;
    let discover_existing = this._config.hasOwnProperty('discover_existing') ? this._config.discover_existing : true;
    return discover_existing;
  }

  private updateDiscoveryOption(e: Event) {
    let value = (e.target as HTMLInputElement).value == 'true';
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    if (!value) Object.assign(config, { discover_existing: value });
    else if (config.hasOwnProperty('discover_existing')) delete config['discover_existing'];
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getAmPmOption() {
    if (!this._config || !this.hass) return;
    let am_pm = this._config.hasOwnProperty('am_pm') ? this._config.am_pm : false;
    return am_pm;
  }

  private updateAmPmOption(e: Event) {
    let value = (e.target as HTMLInputElement).value == 'true';
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    if (value) Object.assign(config, { am_pm: value });
    else if (config.hasOwnProperty('am_pm')) delete config['am_pm'];
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }


  getTimeStepOption() {
    if (!this._config || !this.hass) return;
    let time_step = this._config.hasOwnProperty('time_step') ? this._config.time_step : DefaultTimeStep;
    return Number(time_step);
  }

  private updateTimeStepOption(e: Event) {
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    let value = Number((e.target as HTMLInputElement).value);
    if (value == DefaultTimeStep && config.hasOwnProperty('time_step')) delete config['time_step'];
    else Object.assign(config, { time_step: value });
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDomainSwitches() {
    if (!this._config || !this.hass) return;
    let includedDomains = this._config.include ? [...this._config.include] : [];
    return Object.entries(standardConfig).filter(([, v]) => v.hasOwnProperty('actions')).map(([domain, cfg]) => {
      let enabled = includedDomains.includes(domain);
      let count = Object.keys(this.hass!.states).filter(e => computeDomain(e) == domain && !IsSchedulerEntity(e)).length;
      if (!count) return ``;
      return html`
        <div class="row" @click=${() => { this.toggleSelectDomain(domain) }}>
          <ha-icon icon="${PrettyPrintIcon(cfg.icon)}">
          </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
          </div>
          <ha-icon-button icon="${this.selectedDomain == domain ? 'mdi:chevron-down' : 'mdi:chevron-right'}">
          </ha-icon-button>
        </div>
        ${this.selectedDomain == domain ? html`
          <div class="divider"></div>
          ${this.getEntitySwitches(domain)}
          <div class="divider"></div>          
        ` : ''}
      `;
    });
  }

  getEntitySwitches(domain: string) {
    if (!this._config || !this.hass) return;
    let includedEntities = this._config.include ? [...this._config.include] : [];
    return Object.entries(this.hass.states).filter(([e,]) => computeDomain(e) == domain && !IsSchedulerEntity(e)).map(([entity_id, cfg]) => {
      let name = cfg.attributes.friendly_name || computeEntity(entity_id);
      let enabled = includedEntities.includes(entity_id);
      return html`

        <div class="row" @click=${() => this.toggleSelectEntity(entity_id)}>
          <state-badge
            .hass=${this.hass}
            .stateObj=${this.hass!.states[entity_id]}
          >
          </state-badge>
          <div class="info">
            ${name}
            <div class="secondary">
              ${entity_id}
            </div>
          </div>
          <ha-switch 
            ?checked=${enabled}
          >
          </ha-switch>
        </div>
      `;
    })
  }

  toggleSelectDomain(domain: string) {
    if (!this._config || !this.hass) return;
    if (this.selectedDomain != domain) {
      this.selectedDomain = domain;
    }
    else {
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