import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiChevronLeft, mdiClose } from '@mdi/js';
import { computeActionDomains } from '../data/actions/compute_action_domains';
import { actionItem, computeActionsForDomain } from '../data/actions/compute_actions_for_domain';
import { sortByName } from '../lib/sort';
import { styleMap } from 'lit/directives/style-map';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { Action, CardConfig } from '../types';

export type DialogSelectActionParams = {
  cancel: () => void;
  confirm: (res: Action) => void;
  domainFilter?: string[];
  cardConfig: CardConfig
};

@customElement('dialog-select-action')
export class DialogSelectWeekdays extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectActionParams;

  @state() private _search = "";
  @state() private _filter = "";
  timer: number = 0;

  @state() private _width?: number;
  @state() private _height?: number;

  @state() lockDomain = false;

  public async showDialog(params: DialogSelectActionParams): Promise<void> {
    this._params = params;
    if (params.domainFilter) this.lockDomain = true;
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.cancel();
    this._params = undefined;
    this._clearSearch();
    this._height = undefined;
    this._width = undefined;
  }

  async willUpdate() {
    (this.hass as any).loadBackendTranslation("title");
    (this.hass as any).loadBackendTranslation("services");
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
            ${this._params.domainFilter !== undefined && !this.lockDomain
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
              ${localize('ui.dialog.action_picker.title', this.hass)}
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
    if (!this._params?.domainFilter) {
      let domains = computeActionDomains(this.hass, this._params!.cardConfig);
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

      let fillers: number[] = [];
      for (var i = domains.length; i < 7; i++) {
        fillers.push(0);
      }

      return html`
      ${(Object.keys(domains)).map((key) => html`
        <mwc-list-item
          graphic="icon"
          hasMeta
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
          <span>${domains[key].name}</span>
        </mwc-list-item>`)
        }
        ${fillers.map(_e => html`
        <mwc-list-item
          graphic="icon"
          hasMeta
          noninteractive
        >
        </mwc-list-item>
        `)}
      `;
    }
    else {
      let result = this._params.domainFilter.map(e => computeActionsForDomain(this.hass, e, this._params!.cardConfig.customize)).flat();
      return (Object.keys(result)).map((key) => html`
        <mwc-list-item
          graphic="icon"
          @click=${() => this._handleActionClick(result[key])}
          twoline
        >
          <ha-icon slot="graphic" icon="${result[key].icon}"></ha-icon>
          <span>${result[key].name}</span>
          <span slot="secondary">${result[key].description}</span>
        </mwc-list-item>
    `);
    }
  }

  _handleDomainClick(key: string) {
    this._params = { ...this._params!, domainFilter: [key] };
    this._clearSearch();
  }

  _clearDomain() {
    this._params = { ...this._params!, domainFilter: undefined };
    this._clearSearch();
  }

  _handleActionClick(item: actionItem) {
    this._params!.confirm(item.action);
    this._params = undefined;
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
    `;
  }
}