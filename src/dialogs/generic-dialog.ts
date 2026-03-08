import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { HomeAssistant } from '../lib/types';
import { hassLocalize } from '../localize/hassLocalize';

export type GenericDialogParams = {
  title: string;
  description: string | TemplateResult;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  cancel: () => void;
  confirm: () => void;
};

@customElement('scheduler-generic-dialog')
export class GenericDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: GenericDialogParams;

  public async showDialog(params: GenericDialogParams): Promise<void> {
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
        @closed=${this.closeDialog}
        width="small"
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiClose}
          ></ha-icon-button>
          <div slot="title">
            ${this._params.title}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        <ha-dialog-footer slot="footer">
          ${this._params.secondaryButtonLabel
        ? html`
            <ha-button
              appearance="plain"
              slot="secondaryAction"
              @click=${this.cancelClick}
              data-dialog="close"
            >
              ${this._params.secondaryButtonLabel}
            </ha-button>
              `
        : ''}
          <ha-button
            appearance="accent"
            slot="primaryAction"
            @click=${this.confirmClick}
            data-dialog="close"
          >
            ${this._params.primaryButtonLabel}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  confirmClick() {
    this._params!.confirm();
  }

  cancelClick() {
    this._params!.cancel();
  }
}