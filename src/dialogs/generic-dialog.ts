import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import { mdiClose } from "@mdi/js";
import { HomeAssistant } from "../lib/types";
import { hassLocalize } from "../localize/hassLocalize";

export type GenericDialogParams = {
  title: string;
  description: string | TemplateResult;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  cancel: () => void;
  confirm: () => void;
};

@customElement("scheduler-generic-dialog")
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
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${hassLocalize("ui.dialogs.more_info_control.dismiss", this.hass)}
            .path=${mdiClose}
          ></ha-icon-button>
          <span slot="title"> ${this._params.title} </span>
        </ha-dialog-header>
        <div class="wrapper">${this._params.description}</div>

        ${this._params.secondaryButtonLabel
          ? html`
              <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                ${this._params.secondaryButtonLabel}
              </ha-button>
            `
          : ""}
        <ha-button appearance="accent" slot="primaryAction" @click=${this.confirmClick} dialogAction="close">
          ${this._params.primaryButtonLabel}
        </ha-button>
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
      ha-dialog {
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: 600px;
        --mdc-dialog-max-width: min(600px, 95vw);
      }
      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 100vw;
          --mdc-dialog-max-width: 100vw;
          --mdc-dialog-min-height: 100vh;
          --mdc-dialog-min-height: 100svh;
          --mdc-dialog-max-height: 100vh;
          --mdc-dialog-max-height: 100svh;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: var(--ha-border-radius-square);
        }
      }
    `;
  }
}
