import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { TWeekday } from '../types';
import { HomeAssistant } from '../lib/types';

export type DialogSelectWeekdayParams = {
  weekdays: TWeekday[];
  cancel: () => void;
  confirm: (res: TWeekday[]) => void;
};

@customElement('dialog-select-weekdays')
export class DialogSelectWeekdays extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectWeekdayParams;

  public async showDialog(params: DialogSelectWeekdayParams): Promise<void> {
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
            Select days for schedule
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list>
          ${this._renderWeekdayOptions()}
          </mwc-list>
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                Cancel
              </mwc-button>
        <mwc-button
          slot="secondaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          OK
        </mwc-button>
      </ha-dialog>
    `;
  }

  _renderWeekdayOptions() {
    return (Object.keys(TWeekday) as TWeekday[]).map((key) => html`
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${key}"
        >
          ${this._params?.weekdays.includes(key)
        ? html`<ha-icon slot="graphic" icon="mdi:check"></ha-icon>`
        : ''
      }
          ${TWeekday[key]}
        </mwc-list-item>
    `);
  }

  _toggleSelectOption(ev: Event) {
    const option = (ev.target as HTMLElement).getAttribute("option") as TWeekday;
    let weekdays = [...this._params!.weekdays];
    if (weekdays.includes(option)) {
      weekdays = weekdays.filter(e => e != option || weekdays.length == 1);
    }
    else {
      if ([TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(option)) {
        weekdays = [option];
      }
      else {
        weekdays = weekdays.filter(e => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
        weekdays = [...weekdays, option];
      }
    }
    this._params = Object.assign(this._params!, { weekdays: weekdays });
    this.requestUpdate();
  }

  confirmClick() {
    this._params!.confirm(this._params!.weekdays);
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