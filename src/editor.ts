import { LitElement, html, customElement, property, TemplateResult, CSSResult, css } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { ICardConfig } from './types';
import { default as standardConfig } from './standard-configuration.json';
import { styles } from './styles';
import { PrettyPrintIcon, getDomainFromEntityId, removeDomainFromEntityId } from './helpers';
import { IsSchedulerEntity } from './entity';
import { localize } from './localize/localize';
import { DefaultUserConfig } from './const';

@customElement('scheduler-card-editor')
export class SchedulerCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config?: ICardConfig;
  @property() selectedDomain = '';
  @property() titleOption = 'standard';

  public setConfig(config: ICardConfig): void {
    this._config = config;
    this.titleOption = this.getTitleOption();
  }
  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }
    return html`
      <div class="card-section first">
        <div><b>Title of the card</b></div>
        <div>
          <mwc-button class="${this.getTitleOption() == 'standard' ? ' active' : ''}" @click="${() => { this.updateTitleOption('standard') }}">
            Standard
          </mwc-button>
          <mwc-button class="${this.getTitleOption() == 'hidden' ? ' active' : ''}" @click="${() => { this.updateTitleOption('hidden') }}">
            Hidden
          </mwc-button>
          <mwc-button class="${this.getTitleOption() == 'custom' ? ' active' : ''}" @click="${() => { this.updateTitleOption('custom') }}">
            Custom
          </mwc-button>
        </div>
        ${this.titleOption == 'custom' ? this.getTitleCustom() : ''}
      </div>
      <div class="card-section">
        <div><b>Show all schedules</b></div>
        <div class="text-field">This sets the 'discover existing' parameter.<br> Disable if you want to use multiple scheduler-cards.</div>
        <div>
          <mwc-button class="${this.getDiscoveryOption() ? ' active' : ''}" @click="${() => { this.updateDiscoveryOption(true) }}">
            On
          </mwc-button>
          <mwc-button class="${this.getDiscoveryOption() ? '' : ' active'}" @click="${() => { this.updateDiscoveryOption(false) }}">
            Off
          </mwc-button>
        </div>
      </div>
      <div class="card-section">
        <div><b>Time display</b></div>
        <div>
          <mwc-button class="${this.getAmPmOption() ? '' : ' active'}" @click="${() => { this.updateAmPmOption(false) }}">
            24 hours
          </mwc-button>
          <mwc-button class="${this.getAmPmOption() ? ' active' : ''}" @click="${() => { this.updateAmPmOption(true) }}">
            AM/PM
          </mwc-button>
        </div>
      </div>
      <div class="card-section">
        <div><b>Time step</b></div>
        <div class="text-field">Resolution (in minutes) for creating schedules</div>
        <div>
          <variable-slider
            min=1
            max=30
            step=1
            value=${this.getTimeStepOption()}      
            unit=" min"
            optional=false
            disabled=false
            @change=${this.updateTimeStepOption}
          >
          </variable-slider>
        </div>
      </div>
      <div class="card-section">
        <div><b>Included entities</b></div>
        <div class="text-field">Click on a group to open it.</div>
      </div>
      ${this.getDomainSwitches()}
    `;
  }

  private getTitleOption() {
    if (!this._config || !this.hass) return 'standard';
    if (this._config.title === undefined) return 'standard';
    if (typeof this._config.title == "string") return 'custom';
    if (this._config.title == false) return 'hidden';
    else return 'standard';
  }

  getTitleCustom() {
    return html`
        <div>
          <paper-input
            label="Custom title"
            .value=${this.getTitle()}
            .configValue=${'name'}
            @value-changed=${this.updateTitle}
          ></paper-input>
        </div>
    `;
  }

  private getTitle() {
    if (!this._config || !this.hass) return localize('scheduler');
    if (this._config.title === undefined) return localize('scheduler');
    if (typeof this._config.title == "string") return this._config.title;
    if (this._config.title == false) return '';
    else return localize('scheduler');
  }

  private updateTitleOption(type: string) {
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

  private updateDiscoveryOption(value: boolean) {
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

  private updateAmPmOption(value: boolean) {
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    if (value) Object.assign(config, { am_pm: value });
    else if (config.hasOwnProperty('am_pm')) delete config['am_pm'];
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }


  getTimeStepOption() {
    if (!this._config || !this.hass) return;
    let time_step = this._config.hasOwnProperty('time_step') ? this._config.time_step : DefaultUserConfig.time_step;
    return Number(time_step);
  }

  private updateTimeStepOption(e: Event) {
    if (!this._config || !this.hass) return;
    let config = { ...this._config };
    let value = Number((e.target as HTMLInputElement).value);
    if (value == DefaultUserConfig.time_step && config.hasOwnProperty('time_step')) delete config['time_step'];
    else Object.assign(config, { time_step: value });
    this._config = config;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  getDomainSwitches() {
    if (!this._config || !this.hass) return;
    let includedDomains = this._config.include ? [...this._config.include] : [];
    return Object.entries(standardConfig).filter(([, v]) => v.hasOwnProperty('actions')).map(([domain, cfg]) => {
      let enabled = includedDomains.includes(domain);
      let count = Object.keys(this.hass!.states).filter(e => getDomainFromEntityId(e) == domain && !IsSchedulerEntity(e)).length;
      if (!count) return ``;
      return html`
          <div class="list-item" @click="${() => { this.toggleSelectDomain(domain) }}">
            <div class="list-item-icon">
              ${cfg.icon ? html`<ha-icon icon="${PrettyPrintIcon(cfg.icon)}"></ha-icon>` : ''}
            </div>
            <div class="list-item-name">
              ${domain}
            </div>
            <div class="list-item-action">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
            <div class="list-item-switch">
              ${this.selectedDomain == domain ? html`<ha-icon-button icon="mdi:chevron-down"></ha-icon-button>` : html`<ha-icon-button icon="mdi:chevron-right"></ha-icon-button>`}
            </div>
          </div>
          ${this.selectedDomain == domain ? this.getEntitySwitches(domain) : ''}
      `;
    });
  }

  getEntitySwitches(domain: string) {
    if (!this._config || !this.hass) return;
    let includedEntities = this._config.include ? [...this._config.include] : [];
    return Object.entries(this.hass.states).filter(([e,]) => getDomainFromEntityId(e) == domain && !IsSchedulerEntity(e)).map(([entity_id, cfg]) => {
      let name = cfg.attributes.friendly_name || removeDomainFromEntityId(entity_id);
      //let icon = cfg.attributes.icon || standardConfig[domain].icon || null;
      let enabled = includedEntities.includes(entity_id);
      return html`
          <div class="list-item" @click="${() => this.toggleSelectEntity(entity_id)}">
            <div class="list-item-icon">
              
            </div>
            <div class="list-item-name">
              ${name}
            </div>
            <div class="list-item-action">
              ${entity_id}
            </div>
            <div class="list-item-switch">
              ${enabled ? html`<ha-switch checked="checked"></ha-switch>` : html`<ha-switch></ha-switch>`}
            </div>
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
    return styles;
  }
}