import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiChevronDown, mdiChevronLeft, mdiClose } from '@mdi/js';
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

interface domainsList extends Array<listItem & { entities: listItem[] }> { }

const computeDomains = (hass: HomeAssistant) => {
  let domains = computeActionDomains(hass, { include: ['*'] });
  let conditionDomains = computeConditionDomains(hass, { include: ['*'] });
  conditionDomains = conditionDomains.filter(e => !domains.map(f => f.key).includes(e.key));
  domains = [...domains, ...conditionDomains];
  domains.sort((a, b) => sortByName(a.name, b.name));
  return domains;
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

    entityList.sort((a, b) => sortByName(a.name, b.name));
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

    entityList.sort((a, b) => sortByName(a.name, b.name));
    return entityList;
  }
}

const filteredResult = (obj: listItem, tokens: string[]) => {
  return (
    tokens.every(token => obj.name.toLowerCase().includes(token)) ||
    tokens.every(token => obj.key.toLowerCase().includes(token))
  );
};

@customElement('dialog-select-entities')
export class DialogSelectEntities extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectEntitiesParams;

  @state() private _search = "";
  @state() private _filter = "";
  timer: number = 0;

  @state() private _width?: number;
  @state() private _height?: number;

  @state() expandedGroups: string[] = [];

  @state() options?: domainsList;

  public async showDialog(params: DialogSelectEntitiesParams): Promise<void> {
    this._params = params;
    this.loadOptions();
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.confirm({ domains: this._params.domains, entities: this._params.entities });
    this._params = undefined;
    this._clearSearch();
    this._height = undefined;
    this._width = undefined;
  }

  loadOptions() {
    let domains = computeDomains(this.hass);
    this.options = domains.map(item => Object({
      ...item,
      entities: computeEntitiesForDomain(item.key, this.hass)
    }));
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.has('_params') || changedProps.has('expandedGroups') || changedProps.has('_filter')) return true;
    return false;
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
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
              .path=${mdiClose}
            ></ha-icon-button>
            <span slot="title">
              ${localize('ui.dialog.entity_picker.title', this.hass)}
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

  _clearSearch() {
    this._search = "";
    this._filter = "";
  }

  _toggleSelectEntity(ev: Event) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'MWC-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const checkbox = listItem.querySelector("ha-checkbox") as HTMLInputElement;
    const key = listItem.getAttribute("key") as string;
    if (this._params!.entities.includes(key)) {
      this._params = {
        ...this._params!,
        entities: this._params!.entities.filter(e => e != key)
      };
    }
    else {
      this._params = {
        ...this._params!,
        entities: [...this._params!.entities, key]
      };
    }
  }

  _toggleSelectDomain(ev: Event) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'MWC-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const key = listItem.getAttribute("key") as string;
    const entitiesInDomain = this.options?.find(e => e.key == key)!.entities.map(e => e.key);
    if (this._params!.domains.includes(key)) {
      this._params = {
        ...this._params!,
        domains: this._params!.domains.filter(e => e != key),
        entities: this._params!.entities.filter(e => !entitiesInDomain?.includes(e))
      };
    }
    else {
      this._params = {
        ...this._params!,
        domains: [...this._params!.domains, key]
      };
    }
    ev.stopPropagation();
  }

  closeGroupByKey(key: string) {
    const menu = this.shadowRoot!.querySelector("mwc-list") as HTMLElement;
    menu.childNodes.forEach(e => {
      if (e.nodeType != Node.ELEMENT_NODE) return;
      if ((e as HTMLElement).tagName != 'MWC-LIST-ITEM') return;
      if ((e as HTMLElement).getAttribute("key") == key) {
        const listItem = e as HTMLElement;
        const container = listItem.nextElementSibling as HTMLElement;
        const button = listItem.querySelector("ha-icon-button") as HTMLElement;
        container.style.height = '0px';
        listItem.removeAttribute('expanded');
        button.classList.remove('expanded');
      }
    });
  }

  async _toggleExpandGroup(ev: Event) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'MWC-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const button = listItem.querySelector("ha-icon-button") as HTMLElement;
    const key = listItem.getAttribute("key") as string;
    if (!this.expandedGroups.includes(key)) {
      this.expandedGroups.forEach(e => this.closeGroupByKey(e));
      this.expandedGroups = [key];
      await this.requestUpdate();
    }
    const container = listItem.nextElementSibling as HTMLElement;
    const scrollHeight = container.scrollHeight;


    if (listItem.hasAttribute('expanded')) {
      listItem.removeAttribute('expanded');
      button.classList.remove('expanded');
      container.style.height = '0px';
      setTimeout(() => {
        this.expandedGroups = this.expandedGroups.filter(e => e != key);
      }, 300);
    }
    else {
      listItem.setAttribute('expanded', 'true');
      button.classList.add('expanded');
      container.style.height = `${scrollHeight}px`;
    }
  }

  _renderOptions() {
    if (!this.options) return;
    let filteredOptions = [...this.options]

    const filterApplied = this._filter && this._filter.trim().length;

    if (filterApplied) {
      const tokens = this._filter.toLowerCase().trim().split(" ");
      filteredOptions = filteredOptions.map(item => {
        let res = filteredResult(item, tokens);
        if (res) return item;
        item = { ...item, entities: (item.entities || []).filter(subitem => filteredResult(subitem, tokens)) };
        if (!item.entities.length) return;
        return item;
      })
        .filter(e => e !== undefined)
    }

    if (!filteredOptions.length) {
      return html`
        <mwc-list-item disabled>
          ${this.hass.localize('ui.components.entity.entity-picker.no_match')}
        </mwc-list-item>
      `;
    }

    return (Object.keys(filteredOptions)).map((key) => {
      const domain = filteredOptions[key].key;
      const entities = computeEntitiesForDomain(domain, this.hass);
      const domainIncluded = this._params?.domains.includes(domain);

      return html`
        <mwc-list-item
          graphic="icon"
          twoline
          hasMeta
          @click=${this._toggleExpandGroup}
          key="${domain}"
        >
          <ha-icon slot="graphic" icon="${filteredOptions[key].icon}"></ha-icon>
          <div slot="meta" class="meta">
            <ha-button @click=${this._toggleSelectDomain}>
              ${this._params?.domains.includes(domain) || filteredOptions[key].entities.every(e => this._params?.entities.includes(e.key))
          ? 'deselect all'
          : 'select all'
        }
            </ha-button>
            <ha-icon-button .path="${mdiChevronDown}" @click=${(ev: Event) => { (ev.target as HTMLElement).blur() }} class="chevron"></ha-icon-button>
          </div>
          <span>${filteredOptions[key].name}</span>
          <span slot="secondary">${domainIncluded ? entities.length : filteredOptions[key].entities.filter(e => this._params?.entities.includes(e.key)).length}/${entities.length} entities selected</span>
        </mwc-list-item>
        ${this.expandedGroups.includes(domain) || filterApplied ? html`
        <div class="group ${filterApplied ? 'open' : ''}">
          <li role="divider"></li>
        ${filteredOptions[key].entities.map(e => html`
          <mwc-list-item
            graphic="icon"
            twoline
            hasMeta
            @click=${this._toggleSelectEntity}
            class="nested"
            key="${e.key}"
          >
            <ha-state-icon .stateObj=${this.hass.states[e.key]} .hass=${this.hass} slot="graphic"></ha-state-icon>
            <ha-checkbox
              slot="meta"
              ?checked=${this._params?.entities.includes(e.key) || this._params?.domains.includes(domain)}
            ></ha-checkbox>

            <span>${e.name}</span>
            <span slot="secondary">${e.key}</span>
          </mwc-list-item>
        `)}
          <li role="divider"></li>
        </div>
      ` : ''}
      `;
    });
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
      mwc-list-item {
        --mdc-ripple-hover-opacity: 0.04;
        --mdc-ripple-focus-opacity: 0.04;
        --mdc-ripple-press-opacity: 0.12;
        --mdc-list-item-meta-size: 180px;
      }
      mwc-list-item.nested {
        --mdc-list-item-meta-size: 48px;
        --mdc-list-side-padding: 32px;
      }
      mwc-list-item.nested ha-icon {
        display: flex;
        justify-content: flex-end;
      }
      mwc-list-item ha-checkbox, mwc-list-item ha-icon-button, mwc-list-item ha-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div.group {
        height: 0px;
        overflow: hidden;
        transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
      }
      div.group.open {
        height: auto;
      }
      mwc-list-item .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      mwc-list-item .chevron.expanded {
        transform: rotate(180deg);
      }
      div.group li {
        width: 100%;
        height: 1px;
        display: block;
        background: var(--divider-color);
        margin: 0px 10px;
      }
      div.meta {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `;
  }
}