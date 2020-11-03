import { LitElement, html, customElement, property, CSSResult, css, internalProperty } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';

@customElement('dialog-confirm-delete')
export class DialogConfirmDelete extends LitElement {
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

      <ha-dialog
        open
        .heading=${true}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
          >
          </ha-icon-button>
          <span slot="title">
        ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_title")}
          </span>
        </ha-header-bar>
      </div>
      <div>
        ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_text")}
      </div>

        <mwc-button
          slot="primaryAction"
          @click=${this.cancelClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left"
          @click=${this.confirmClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.ok")}
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
}
