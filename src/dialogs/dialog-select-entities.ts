import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiChevronLeft, mdiClose } from '@mdi/js';
import { computeActionDomains } from '../data/actions/compute_action_domains';
import { sortByName } from '../lib/sort';
import { styleMap } from 'lit/directives/style-map';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { computeConditionDomains } from '../data/compute_condition_domains';
import { computeDomain, friendlyName } from '../lib/entity';
import { computeEntityIcon } from '../data/format/compute_entity_icon';
import { domainIcon } from '../data/actions/domain_icon';

export type DialogSelectEntitiesParams = {
  cancel: () => void;
  confirm: (res: { domains: string[], entities: string[] }) => void;
  domains: string[];
  entities: string[];
};

interface listItem {
  key: string,
  name: string,
  description: string,
  icon: string;
}

const computeDomains = (hass: HomeAssistant) => {
  let domains = computeActionDomains(hass, { include: ['*'] });
  let conditionDomains = computeConditionDomains(hass, { include: ['*'] });
  conditionDomains = conditionDomains.filter(e => !domains.map(f => f.key).includes(e.key));
  return [...domains, ...conditionDomains];
};

const computeEntitiesForDomain = (domain: string, hass: HomeAssistant) => {

  if (['script', 'notify'].includes(domain)) {
    const entities = Object.keys(hass.services[domain]);

    let entityList: listItem[] = entities.map(e => Object({
      key: `${domain}.${e}`,
      name: hass.states[`${domain}.${e}`] ? friendlyName(`${domain}.${e}`, hass.states[`${domain}.${e}`]?.attributes) : hass.services[domain][e].name,
      description: "",
      icon: hass.states[`${domain}.${e}`] ? computeEntityIcon(`${domain}.${e}`, hass) : domainIcon(domain)
    }));

    return entityList;
  }
  else {
    const entities = Object.keys(hass.states).filter(e => computeDomain(e) == domain);

    let entityList: listItem[] = entities.map(e => Object({
      key: e,
      name: friendlyName(e, hass.states[e]?.attributes),
      description: "",
      icon: computeEntityIcon(e, hass)
    }));

    return entityList;
  }

}

@customElement('dialog-select-entities')
export class DialogSelectEntities extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectEntitiesParams;

  @state() private _search = "";
  @state() private _filter = "";
  timer: number = 0;

  @state() private _width?: number;
  @state() private _height?: number;

  @state() selectedDomain?: string;

  public async showDialog(params: DialogSelectEntitiesParams): Promise<void> {
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.confirm({ domains: this._params.domains, entities: this._params.entities });
    this._params = undefined;
    this._clearSearch();
    this._height = undefined;
    this._width = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog
        open
        .heading=${true}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            ${this.selectedDomain

        ? html`
            <ha-icon-button
              slot="navigationIcon"
              .label=${this.hass.localize('ui.common.back')}
              .path=${mdiChevronLeft}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `
        : html`
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
              .path=${mdiClose}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${localize('ui.dialog.entity_picker.title', this.hass)}
              ${this.selectedDomain
        ? html`
                - 
                ${computeDomains(this.hass).find(e => e.key == this.selectedDomain)!.name}
              ` : ''}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${this.hass.localize("ui.common.search")}
            aria-label=${this.hass.localize("ui.common.search")}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search &&
      html`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${styleMap({
        width: this._width ? `${this._width}px` : "auto",
        height: this._height ? `${Math.min(468, this._height)}px` : "auto",
      })}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `;
  }

  protected _opened(): void {
    // Store the width and height so that when we search, box doesn't jump
    const boundingRect =
      this.shadowRoot!.querySelector("mwc-list")?.getBoundingClientRect();
    this._width = boundingRect?.width;
    this._height = boundingRect?.height;
  }

  private _handleSearchChange(ev: CustomEvent): void {
    const newFilter = (ev.currentTarget as any).value;
    this._search = newFilter;
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this._filter = this._search;
    }, 100);
  }

  _renderOptions() {
    if (!this.selectedDomain) {
      let domains = computeDomains(this.hass);
      domains.sort((a, b) => sortByName(a.name, b.name));

      if (this._filter) {
        domains = domains.filter(e => {
          const tokens = this._filter.toLowerCase().trim().split(" ");
          return (
            tokens.every(token => e.name.toLowerCase().includes(token)) ||
            tokens.every(token => e.key.toLowerCase().includes(token))
          )
        })
      }

      return (Object.keys(domains)).map((key) => {
        const domain = domains[key].key;
        const entities = computeEntitiesForDomain(domain, this.hass);
        const domainIncluded = this._params?.domains.includes(domain);
        return html`
      <mwc-list-item
        graphic="icon"
        hasMeta
        @click=${() => this._handleDomainClick(domain)}
        twoline
      >
        <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>

        <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
        <span>${domains[key].name}</span>
        <span slot="secondary">${domainIncluded ? entities.length : 0}/${entities.length} entities selected</span>
        <mwc-button 
          @click=${(ev: Event) => this._toggleIncludeDomain(ev, domain)}
        >
          ${this._params?.domains.includes(domain)
            ? 'deselect all'
            : 'select all'
          }
        </mwc-button>
      </mwc-list-item>
  `});

    } else {
      const domain = this.selectedDomain;

      let entities = computeEntitiesForDomain(domain, this.hass);
      entities.sort((a, b) => sortByName(a.name, b.name));

      if (this._filter) {
        entities = entities.filter(e => {
          const tokens = this._filter.toLowerCase().trim().split(" ");
          return (
            tokens.every(token => e.name.toLowerCase().includes(token)) ||
            tokens.every(token => e.key.toLowerCase().includes(token))
          )
        })
      }

      return (Object.keys(entities)).map((key) => {
        const entity = entities[key].key;
        const entityIncluded = this._params?.entities.includes(entity);
        return html`
        <mwc-list-item
          graphic="icon"
          hasMeta
          twoline
          @click=${() => this.toggleIncludeEntity(entity)}
        >
          <ha-icon slot="graphic" icon="${entities[key].icon}"></ha-icon>
          <ha-switch
            slot="meta"
            ?checked=${entityIncluded}
          ></ha-switch>
          <span>${entities[key].name}</span>
          <span slot="secondary">${entities[key].key}</span>
        </mwc-list-item>
    `});
    }
  }

  toggleIncludeDomain(ev: Event, domain: string) {
    ev.stopImmediatePropagation();

    if (this._params?.domains.includes(domain)) {
      this._params = { ...this._params, domains: this._params.domains.filter(e => e != domain) }
    }
    else {
      this._params = { ...this._params!, domains: [...this._params!.domains, domain] };
    }
  }


  toggleIncludeEntity(entity: string) {
    if (this._params?.entities.includes(entity)) {
      this._params = { ...this._params, entities: this._params.entities.filter(e => e != entity) }
    }
    else {
      this._params = { ...this._params!, entities: [...this._params!.entities, entity] };
    }
  }

  _toggleIncludeDomain(ev: Event, domain: string) {
    ev.stopImmediatePropagation();

    if (this._params?.domains.includes(domain)) {
      this._params = { ...this._params, domains: this._params.domains.filter(e => e != domain) }
    }
    else {
      this._params = { ...this._params!, domains: [...this._params!.domains, domain] };
    }
  }

  _handleDomainClick(domain: string) {
    this.selectedDomain = domain;
    this._clearSearch();
  }

  _clearDomain() {
    this.selectedDomain = undefined;
    this._clearSearch();
  }

  _clearSearch() {
    this._search = "";
    this._filter = "";
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 550px) {
        ha-dialog {
          --mdc-dialog-min-width: 500px;
        }
      }
      ha-textfield {
        display: block;
        margin: 0 16px;
      }
      mwc-list {
        padding-right: 10px;
      }
      mwc-list-item {
        --mdc-ripple-color: #ffffff;
      }
      mwc-list-item mwc-button {
        display: none;
      }
      @media all and (min-width: 550px) {
        mwc-list-item mwc-button {
          position: absolute;
          display: block;
          right: 60px;
          top: 18px;
        }
      }
    `;
  }
}