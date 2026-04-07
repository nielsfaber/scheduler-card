import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiChevronDown, mdiClose } from '@mdi/js';
import { computeActionDomains } from '../data/actions/compute_action_domains';
import { sortByName } from '../lib/sort';
import { styleMap } from 'lit/directives/style-map';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { computeConditionDomains } from '../data/compute_condition_domains';
import { computeDomain, friendlyName } from '../lib/entity';
import { computeEntityIcon } from '../data/format/compute_entity_icon';
import { hassLocalize } from '../localize/hassLocalize';
import { CardConfig, CustomConfig } from '../types';
import { fetchItems } from '../data/store/fetch_items';
import { computeEntityDisplay } from '../data/format/compute_entity_display';

export type DialogSelectEntitiesParams = {
  cancel: () => void;
  confirm: (res: { domains: string[]; entities: string[] }) => void;
  domains: string[];
  entities: string[];
  cardConfig: CardConfig;
};

interface listItem {
  key: string;
  name: string;
  description: string;
  icon: string;
}

type domainsListItem = listItem & { entities: listItem[] };
interface domainsList extends Array<domainsListItem> {}

const computeDomains = (hass: HomeAssistant) => {
  let domains = computeActionDomains(hass, { include: ['*'] });
  let conditionDomains = computeConditionDomains(hass, { include: ['*'] });
  conditionDomains = conditionDomains.filter((e) => !domains.map((f) => f.key).includes(e.key));
  domains = [...domains, ...conditionDomains];
  domains.sort((a, b) => sortByName(a.name, b.name));
  return domains;
};

const computeEntitiesForDomain = (domain: string, customize: CustomConfig | undefined, hass: HomeAssistant) => {
  if (['script', 'notify'].includes(domain)) {
    let entities = Object.keys(hass.services[domain]);
    if (domain == 'script')
      entities = entities.filter((e) => !['turn_on', 'turn_off', 'reload', 'toggle', 'test'].includes(e));

    const entityList = entities.map(
      (e): listItem => ({
        key: `${domain}.${e}`,
        name: computeEntityDisplay(`${domain}.${e}`, hass, customize),
        description: '',
        icon: computeEntityIcon(`${domain}.${e}`, customize, hass),
      })
    );

    entityList.sort((a, b) => sortByName(a.name, b.name));
    return entityList;
  } else {
    const entities = Object.keys(hass.states).filter((e) => computeDomain(e) == domain);

    const entityList = entities.map(
      (e): listItem => ({
        key: e,
        name: friendlyName(e, hass.states[e]?.attributes),
        description: '',
        icon: computeEntityIcon(e, customize, hass),
      })
    );

    entityList.sort((a, b) => sortByName(a.name, b.name));
    return entityList;
  }
};

const filteredResult = (obj: listItem, tokens: string[]) => {
  return (
    tokens.every((token) => obj.name.toLowerCase().includes(token)) ||
    tokens.every((token) => obj.key.toLowerCase().includes(token))
  );
};

@customElement('dialog-select-entities')
export class DialogSelectEntities extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectEntitiesParams;

  @state() private _search = '';
  @state() private _filter = '';
  timer: number = 0;

  @state() private _width?: number;
  @state() private _height?: number;

  @state() expandedGroups: string[] = [];

  @state() options?: domainsList;

  @state() scheduleEntities: string[] = [];

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
    if (!this._params) return;
    const domains = computeDomains(this.hass);
    this.options = domains
      .map(
        (item): domainsListItem => ({
          ...item,
          entities: computeEntitiesForDomain(item.key, this._params!.cardConfig.customize, this.hass),
        })
      )
      .filter((e) => e.entities.length);
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (
      changedProps.has('_params') ||
      changedProps.has('expandedGroups') ||
      changedProps.has('_filter') ||
      changedProps.has('scheduleEntities')
    )
      return true;
    return false;
  }

  async firstUpdated() {
    this.scheduleEntities = Object.entries(await fetchItems(this.hass!)).map(([, val]) => val.entity_id);
  }

  async willUpdate() {
    if (!this._width || !this._height) {
      const boundingRect = this.shadowRoot!.querySelector('ha-list')?.getBoundingClientRect();
      this._width = boundingRect?.width;
      this._height = boundingRect?.height;
    }
  }

  render() {
    if (!this._params) return html``;

    return html`
      <ha-dialog open @closed=${this.closeDialog} @wa-after-show=${this._opened}>
        <div slot="header">
          <ha-dialog-header>
            <ha-icon-button
              slot="navigationIcon"
              data-dialog="close"
              .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
              .path=${mdiClose}
            ></ha-icon-button>
            <div slot="title">${localize('ui.dialog.entity_picker.title', this.hass)}</div>
          </ha-dialog-header>

          <ha-input
            dialogInitialFocus
            .placeholder=${hassLocalize('ui.common.search', this.hass)}
            aria-label=${hassLocalize('ui.common.search', this.hass)}
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
                  .label=${hassLocalize('ui.common.clear', this.hass)}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-input>
        </div>

        <ha-list
          style=${styleMap({
            minWidth: `${this._width}px`,
            height: this._height ? `${Math.min(468, this._height)}px` : 'auto',
          })}
        >
          ${this._renderOptions()}
        </ha-list>
      </ha-dialog>
    `;
  }

  protected _opened(): void {
    // Store the width and height so that when we search, box doesn't jump
    const boundingRect = this.shadowRoot!.querySelector('ha-list')?.getBoundingClientRect();
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
    this._search = '';
    this._filter = '';
  }

  _toggleSelectEntity(ev: Event) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'HA-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const checkbox = listItem.querySelector('ha-checkbox') as HTMLInputElement;
    const key = listItem.getAttribute('key') as string;
    if (this._params!.entities.includes(key)) {
      this._params = {
        ...this._params!,
        entities: this._params!.entities.filter((e) => e != key),
      };
    } else {
      this._params = {
        ...this._params!,
        entities: [...this._params!.entities, key],
      };
    }
  }

  _toggleSelectDomain(ev: Event, isSelected: boolean) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'HA-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const key = listItem.getAttribute('key') as string;
    const entitiesInDomain = this.options?.find((e) => e.key == key)!.entities.map((e) => e.key);
    if (isSelected) {
      this._params = {
        ...this._params!,
        domains: this._params!.domains.filter((e) => e != key),
        entities: this._params!.entities.filter((e) => !entitiesInDomain?.includes(e)),
      };
    } else {
      this._params = {
        ...this._params!,
        domains: [...this._params!.domains, key],
      };
    }
    ev.stopPropagation();
  }

  closeGroupByKey(key: string) {
    const menu = this.shadowRoot!.querySelector('ha-list') as HTMLElement;
    menu.childNodes.forEach((e) => {
      if (e.nodeType != Node.ELEMENT_NODE) return;
      if ((e as HTMLElement).tagName != 'HA-LIST-ITEM') return;
      if ((e as HTMLElement).getAttribute('key') == key) {
        const listItem = e as HTMLElement;
        const container = listItem.nextElementSibling as HTMLElement;
        const button = listItem.querySelector('ha-icon-button') as HTMLElement;
        container.style.height = '0px';
        listItem.removeAttribute('expanded');
        button.classList.remove('expanded');
      }
    });
  }

  async _toggleExpandGroup(ev: Event) {
    let listItem = ev.target as HTMLElement;
    while (listItem.tagName != 'HA-LIST-ITEM') listItem = listItem.parentElement as HTMLElement;
    const button = listItem.querySelector('ha-icon-button') as HTMLElement;
    const key = listItem.getAttribute('key') as string;
    if (!this.expandedGroups.includes(key)) {
      this.expandedGroups.forEach((e) => this.closeGroupByKey(e));
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
        this.expandedGroups = this.expandedGroups.filter((e) => e != key);
      }, 300);
    } else {
      listItem.setAttribute('expanded', 'true');
      button.classList.add('expanded');
      container.style.height = `${scrollHeight}px`;
    }
  }

  _renderOptions() {
    if (!this.options) return;
    let filteredOptions = [...this.options];

    const filterApplied = this._filter && this._filter.trim().length;

    if (filterApplied) {
      const tokens = this._filter.toLowerCase().trim().split(' ');
      filteredOptions = filteredOptions
        .map((item) => {
          const res = filteredResult(item, tokens);
          if (res) return item;
          item = { ...item, entities: (item.entities || []).filter((subitem) => filteredResult(subitem, tokens)) };
          if (!item.entities.length) return;
          return item;
        })
        .filter((e) => e !== undefined);
    }

    if (!filteredOptions.length) {
      return html`
        <ha-list-item disabled>
          ${hassLocalize('ui.components.entity.entity-picker.no_match', this.hass)}
        </ha-list-item>
      `;
    }

    return Object.keys(filteredOptions).map((key) => {
      const domain = filteredOptions[key].key;
      const domainIncluded = this._params?.domains.includes(domain);
      let entities = [...filteredOptions[key].entities];
      if (domain == 'switch') entities = entities.filter((e) => !this.scheduleEntities.includes(e.key));

      const numIncludedEntities = domainIncluded
        ? entities.length
        : entities.filter((e: listItem) => this._params?.entities.includes(e.key)).length;

      const isSelectedDomain =
        this._params?.domains.includes(domain) ||
        filteredOptions[key].entities.every((e) => this._params?.entities.includes(e.key));

      return html`
        <ha-list-item graphic="icon" twoline hasMeta @click=${this._toggleExpandGroup} key="${domain}">
          <ha-icon slot="graphic" icon="${filteredOptions[key].icon}"></ha-icon>
          <div slot="meta" class="meta">
            <ha-button
              appearance="plain"
              @click=${(ev: Event) => this._toggleSelectDomain(ev, isSelectedDomain)}
              size="small"
            >
              ${isSelectedDomain
                ? hassLocalize('ui.components.media-browser.file_management.deselect_all', this.hass)
                : hassLocalize('ui.components.subpage-data-table.select_all', this.hass)}
            </ha-button>
            <ha-icon-button
              .path="${mdiChevronDown}"
              @click=${(ev: Event) => {
                (ev.target as HTMLElement).blur();
              }}
              class="chevron"
            ></ha-icon-button>
          </div>
          <span>${filteredOptions[key].name}</span>
          <span slot="secondary"
            >${localize(
              'ui.panel.card_editor.fields.entities.included_number',
              this.hass,
              ['{number}', '{total}'],
              [numIncludedEntities, entities.length]
            )}</span
          >
        </ha-list-item>
        ${this.expandedGroups.includes(domain) || filterApplied
          ? html`
              <div class="group ${filterApplied ? 'open' : ''}">
                <li role="divider"></li>
                ${entities.map(
                  (e) => html`
                    <ha-list-item
                      graphic="icon"
                      twoline
                      hasMeta
                      @click=${this._toggleSelectEntity}
                      class="nested"
                      key="${e.key}"
                    >
                      ${Object.keys(this.hass.states).includes(e.key)
                        ? html`<ha-state-icon
                            .stateObj=${this.hass.states[e.key]}
                            .hass=${this.hass}
                            slot="graphic"
                          ></ha-state-icon>`
                        : html`<ha-icon slot="graphic" icon="${e.icon}"></ha-icon>`}
                      <ha-checkbox
                        slot="meta"
                        ?checked=${this._params?.entities.includes(e.key) || this._params?.domains.includes(domain)}
                      ></ha-checkbox>

                      <span>${e.name}</span>
                      <span slot="secondary">${e.key}</span>
                    </ha-list-item>
                  `
                )}
                <li role="divider"></li>
              </div>
            `
          : ''}
      `;
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-dialog {
        --dialog-content-padding: 0;
        --ha-dialog-width-md: 480px;
      }
      ha-input {
        display: block;
        margin: 0 16px;
      }
      ha-list {
        min-height: 300px;
      }
      ha-list-item {
        --mdc-ripple-hover-opacity: 0.04;
        --mdc-ripple-focus-opacity: 0.04;
        --mdc-ripple-press-opacity: 0.12;
        --mdc-list-item-meta-size: 180px;
      }
      ha-list-item.nested {
        --mdc-list-item-meta-size: 48px;
        --mdc-list-side-padding: 32px;
      }
      ha-list-item.nested ha-icon {
        display: flex;
        justify-content: flex-end;
      }
      ha-list-item ha-checkbox,
      ha-list-item ha-icon-button,
      ha-list-item ha-button {
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
      ha-list-item .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      ha-list-item .chevron.expanded {
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
