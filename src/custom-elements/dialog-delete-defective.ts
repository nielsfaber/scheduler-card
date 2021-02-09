import { LitElement, html, customElement, property, CSSResult, css, internalProperty } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { commonStyle } from '../styles';

@customElement('dialog-delete-defective')
export class DialogDeleteDefective extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _params?: any;

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
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              Defective entity
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          This schedule is defective and cannot be edited with the card. Consider to delete the item and recreate it. If
          the problem persists, please report the issue on GitHub.
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.cancel')}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left; --mdc-theme-primary: var(--error-color)"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this.hass.localize('ui.common.delete')}
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

  static get styles(): CSSResult {
    return css`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
