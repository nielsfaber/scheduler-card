import { LitElement, html, customElement, property, TemplateResult, CSSResult, css } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { ICardConfig } from '../types';
import { default as standardConfig } from '../standard-configuration.json';
import { PrettyPrintIcon, getDomainFromEntityId, removeDomainFromEntityId } from '../helpers';
import { IsSchedulerEntity } from '../entity';
import { localize } from '../localize/localize';
import { DefaultUserConfig } from '../const';

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

    let titleCustom = this.titleOption == 'custom' ?
      html`
        <div>
          <paper-input
            label="Custom title"
            .value=${this.getTitle()}
            .configValue=${'name'}
            @value-changed=${this.updateTitle}
          ></paper-input>
        </div>
      `  : '';

    return html`
      <div class="card-section first">
        <div><b>Title of the card</b></div>
        <div>
          <button-group
            .items=${['standard', 'hidden', 'custom']}
            value=${this.getTitleOption()}
            @change=${this.updateTitleOption}
          >
          </button-group>
        </div>
        ${titleCustom}
      </div>
      <div class="card-section">
        <div><b>Show all schedules</b></div>
        <div class="text-field">This sets the 'discover existing' parameter.<br> Disable if you want to use multiple scheduler-cards.</div>
        <div>
          <button-group
            .items=${[{ id: 'true', name: 'on' }, { id: 'false', name: 'off' }]}
            value=${this.getDiscoveryOption()}
            @change=${this.updateDiscoveryOption}
          >
          </button-group>
        </div>
      </div>
      <div class="card-section">
        <div><b>Time display</b></div>
        <div>
          <button-group
            .items=${[{ id: 'false', name: '24 hours' }, { id: 'true', name: 'AM/PM' }]}
            value=${this.getAmPmOption()}
            @change=${this.updateAmPmOption}
          >
          </button-group>
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

  private getTitle() {
    if (!this._config || !this.hass) return localize('scheduler');
    if (this._config.title === undefined) return localize('scheduler');
    if (typeof this._config.title == "string") return this._config.title;
    if (this._config.title == false) return '';
    else return localize('scheduler');
  }

  private updateTitleOption(e: Event) {
    let type = (e.target as HTMLInputElement).value;
    console.log(type);
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
            <div class="list-item-summary">
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
            <div class="list-item-summary">
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
    return css`

      div.card-section {
        padding: 10px 10px;
      }

      div.card-section.first {
        padding-top: 0px;
      }
      
      div.card-section.last {
        padding-bottom: 10px;
      }

      div.text-field {
        color: var(--disabled-text-color);
      }


      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        grid-template-rows: min-content min-content;
        grid-template-areas: "icon name switch"
                             "icon summary switch";
        grid-gap: 2px 20px;
        background: none;
        cursor: pointer;
        padding: 10px 20px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        background: var(--list-item-background-color);
        opacity: 0.1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
       }

      div.list-item:hover:before {
          background: var(--primary-color);
          border-radius: 4px;
      }

      div.list-item-icon {
        grid-area: icon;
        color: var(--state-icon-color);
      }

      div.list-item-icon ha-icon {
        width: 24px;
        height: 24px;
      }

      div.list-item-name {
        grid-area: name;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-summary {
        grid-area: summary;
        color: var(--secondary-text-color);
      }

      div.list-item-switch {
        grid-area: switch;
      }

      div.list-item-switch ha-switch {
        margin-top: 3px;
      }
    `;
  }
}