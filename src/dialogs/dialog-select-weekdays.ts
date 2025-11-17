import { LitElement, html, css, CSSResultGroup } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import { mdiChevronLeft, mdiClose } from "@mdi/js";
import { TWeekday } from "../types";
import { HomeAssistant } from "../lib/types";
import { localize } from "../localize/localize";
import { computeDayDisplay } from "../data/format/compute_days_display";
import { computeStartOfWeek } from "../data/days";
import { capitalizeFirstLetter } from "../lib/capitalize_first_letter";
import { hassLocalize } from "../localize/hassLocalize";

export type DialogSelectWeekdayParams = {
  weekdays: TWeekday[];
  cancel: () => void;
  confirm: (res: TWeekday[]) => void;
};

const WeekdayTypeCustom = "Custom";

@customElement("dialog-select-weekdays")
export class DialogSelectWeekdays extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: DialogSelectWeekdayParams;

  @state() weekdayTypeCustomSelected: boolean = false;

  selectedWeekdays: TWeekday[] = [];

  public async showDialog(params: DialogSelectWeekdayParams): Promise<void> {
    this._params = params;
    await this.updateComplete;

    this.selectedWeekdays = this._params.weekdays.filter(
      (e) => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e)
    );
    this.weekdayTypeCustomSelected = this.selectedWeekdays.length > 0;
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
          ${this.weekdayTypeCustomSelected
            ? html`
                <ha-icon-button
                  slot="navigationIcon"
                  .label=${hassLocalize("ui.dialogs.more_info_control.dismiss", this.hass)}
                  .path=${mdiChevronLeft}
                  @click=${this.backClick}
                ></ha-icon-button>
              `
            : html`
                <ha-icon-button
                  slot="navigationIcon"
                  dialogAction="cancel"
                  .label=${hassLocalize("ui.dialogs.more_info_control.dismiss", this.hass)}
                  .path=${mdiClose}
                ></ha-icon-button>
              `};
          <span slot="title"> ${localize("ui.dialog.weekday_picker.title", this.hass)} </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list> ${this._renderWeekdayOptions()} </mwc-list>
        </div>

        <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${hassLocalize("ui.common.cancel", this.hass)}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
          ?disabled=${!this._params.weekdays.length}
        >
          ${hassLocalize("ui.common.ok", this.hass)}
        </ha-button>
      </ha-dialog>
    `;
  }

  _renderWeekdayOptions() {
    let listOptions: string[] = [];
    if (!this.weekdayTypeCustomSelected) {
      listOptions = [TWeekday.Daily, TWeekday.Workday, TWeekday.Weekend, WeekdayTypeCustom];
    } else {
      listOptions = [
        TWeekday.Sunday,
        TWeekday.Monday,
        TWeekday.Tuesday,
        TWeekday.Wednesday,
        TWeekday.Thursday,
        TWeekday.Friday,
        TWeekday.Saturday,
      ];

      const startOfWeek = computeStartOfWeek(this.hass);
      const rotateArray = (arr: any[], k: number) => arr.concat(arr).slice(k, k + arr.length);
      listOptions = rotateArray(listOptions, startOfWeek);
    }

    const isSelectedOption = (item: string) => {
      if (item == WeekdayTypeCustom)
        return this._params?.weekdays.every((e) => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
      return this._params?.weekdays.includes(item as TWeekday);
    };

    return listOptions.map((key) => {
      return html`
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${key}"
          ?hasMeta=${key == WeekdayTypeCustom}
        >
          ${isSelectedOption(key) ? html`<ha-icon slot="graphic" icon="mdi:check"></ha-icon>` : ""}
          ${key == WeekdayTypeCustom
            ? html`
                ${capitalizeFirstLetter(localize("ui.dialog.weekday_picker.choose", this.hass))}
                ${isSelectedOption(key) ? html`<span class="badge">${this.selectedWeekdays.length}</span>` : ""}
              `
            : capitalizeFirstLetter(computeDayDisplay(key as TWeekday, "long", this.hass))}
          ${key == WeekdayTypeCustom ? html`<ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>` : ""}
        </mwc-list-item>
      `;
    });
  }

  _toggleSelectOption(ev: Event) {
    const option = (ev.target as HTMLElement).getAttribute("option") as TWeekday | typeof WeekdayTypeCustom;
    let weekdays = [...this._params!.weekdays];
    if (option == WeekdayTypeCustom) {
      weekdays = this.selectedWeekdays;
      this.weekdayTypeCustomSelected = true;
    } else if ([TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(option)) {
      weekdays = [option];
      this.weekdayTypeCustomSelected = false;
    } else if (weekdays.includes(option)) {
      weekdays = weekdays.filter((e) => e != option);
    } else {
      weekdays = [...weekdays, option];
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

  backClick() {
    this.weekdayTypeCustomSelected = false;
    this.selectedWeekdays = this._params!.weekdays.filter(
      (e) => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e)
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 350px) {
        ha-dialog {
          --mdc-dialog-min-width: 300px;
        }
      }
      div.wrapper {
        color: var(--primary-text-color);
        padding: 0px 12px;
      }
      mwc-list {
        --mdc-list-vertical-padding: 0px;
      }

      mwc-list-item[disabled] {
        color: var(--disabled-text-color);
      }

      mwc-list-item.nested {
        --mdc-list-side-padding: 36px;
      }
      .badge {
        height: 24px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-color), 0.3);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 0px 16px;
      }
    `;
  }
}
