import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';

export type DialogParams = {
  title: string;
  description: string | TemplateResult;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  primaryButtonCritical?: boolean;
  cancel: () => void;
  confirm: () => void;
};

@customElement('generic-dialog')
export class GenericDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogParams;

  public async showDialog(params: DialogParams): Promise<void> {
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
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
            .path=${mdiClose}
          ></ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        ${this._params.secondaryButtonLabel
          ? html`
              <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                ${this._params.secondaryButtonLabel}
              </mwc-button>
            `
          : ''}
        <mwc-button
          slot="secondaryAction"
          style="${this._params.primaryButtonCritical ? '--mdc-theme-primary: var(--error-color)' : ''}"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this._params.primaryButtonLabel}
        </mwc-button>
      </ha-dialog>
    `;
  }

  confirmClick() {
    this._params!.confirm();
  }

  cancelClick() {
    this._params!.cancel();
  }

  static get styles(): CSSResultGroup {
    return css`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
