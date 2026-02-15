import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose, mdiDotsVertical } from '@mdi/js';
import { sortByName } from '../lib/sort';
import { computeConditionDomains } from '../data/compute_condition_domains';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { styleMap } from 'lit/directives/style-map';
import { CardConfig } from '../types';
import { hassLocalize } from '../localize/hassLocalize';
import { isDefined } from '../lib/is_defined';

export type DialogSelectConditionParams = {
  cancel: () => void;
  confirm: (res: string) => void;
  domain?: string;
  cardConfig: CardConfig
};

@customElement('dialog-select-condition')
export class DialogSelectCondition extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectConditionParams;

  @state() private _search = "";
  @state() private _filter = "";
  timer: number = 0;

  @state() private _width?: number;
  @state() private _height?: number;
  @state() showAll = false;

  public async showDialog(params: DialogSelectConditionParams): Promise<void> {
    this._params = params;
    this.showAll = false;
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
              .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
              .path=${mdiClose}
            ></ha-icon-button>
            <span slot="title">
              ${localize('ui.panel.options.conditions.add_condition', this.hass)}
            </span>
            ${!isDefined(this._params.domain) ? html`
            <ha-dropdown
              placement="bottom-end"
              slot="actionItems"
              @wa-after-hide=${(ev: Event) => { ((ev.target as HTMLElement).firstElementChild as HTMLElement).blur() }}
            >
              <ha-icon-button slot="trigger" .label=${this.hass.localize('ui.common.menu')} .path=${mdiDotsVertical}>
              </ha-icon-button>
              <ha-dropdown-item @click=${this._toggleShowAll}>
                <ha-icon
                  icon="mdi:check"
                  style="${this.showAll ? '' : 'visibility: hidden'}"
                ></ha-icon>
                ${localize('ui.dialog.action_picker.show_all', this.hass)}
              </ha-dropdown-item>
            </ha-dropdown>`
        : ''}
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${hassLocalize("ui.common.search", this.hass)}
            aria-label=${hassLocalize("ui.common.search", this.hass)}
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
                  .label=${hassLocalize("ui.common.clear", this.hass)}
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

  _renderOptions() {
    //if (!this._params?.domain) {

    let cardConfig = { ...this._params?.cardConfig };
    if (this.showAll) cardConfig = { ...cardConfig, include: undefined, exclude: undefined };
    let domains = computeConditionDomains(this.hass, cardConfig);

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

    return (Object.keys(domains)).map((key) => html`
        <mwc-list-item
          graphic="icon"
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <span>${domains[key].name}</span>
        </mwc-list-item>
    `);
  }

  _handleDomainClick(key: string) {
    this._params = { ...this._params!, domain: key };

    this._params!.confirm(key);
    this._params = undefined;
    this._clearSearch();
  }


  _toggleShowAll() {
    if (this.showAll) {
      this.showAll = false;
    } else {
      this.showAll = true;
    }
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