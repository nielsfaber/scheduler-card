import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';
import { localize } from '../localize/localize';
import { getLocale } from '../helpers';

@customElement('dialog-enable-item')
export class DialogEnableItem extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.cancel();
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}> </ha-icon-button>
            <span slot="title">
              ${localize('ui.dialog.enable_schedule.title', getLocale(this.hass))}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${localize('ui.dialog.enable_schedule.description', getLocale(this.hass))}
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize('ui.common.no')}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
          ${this.hass.localize('ui.common.yes')}
        </mwc-button>
      </ha-dialog>
    `;
  }

  confirmClick() {
    this._params.confirm();
  }

  cancelClick() {
    this._params.cancel();
  }

  static get styles(): CSSResultGroup {
    return css`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
