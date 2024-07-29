import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { CardConfig, Schedule } from "../types";
import { computeActionIcon } from "../data/format/compute_action_icon";
import { HomeAssistant } from "../lib/types";
import { computeScheduleDisplay } from "../data/format/compute_schedule_display";

import './scheduler-relative-time';

@customElement("schedule-item-row")
export class ScheduleItemRow extends LitElement {

  @property() hass!: HomeAssistant;
  @property() schedule_id!: string;
  @property() schedule!: Schedule;
  @property() config!: CardConfig;

  render() {
    const stateObj = this.hass.states[this.schedule.entity_id!];
    if (!stateObj) return html``;
    const disabled = stateObj.state == 'off';
    const nextAction = this.schedule.entries[0].slots[this.schedule.next_entries[0] || 0].actions[0];

    return html`
      <ha-icon
        icon="${computeActionIcon(nextAction, this.config.customize)}"
      >
      </ha-icon>

      <div
        class="info ${disabled ? 'disabled' : ''}"
        @click=${this._handleItemClick}
      >
        ${computeScheduleDisplay(this.schedule, this.config.display_options.primary_info, this.hass, this.config.customize)}
        <div class="secondary">
        ${computeScheduleDisplay(this.schedule, this.config.display_options.secondary_info, this.hass, this.config.customize)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${stateObj}
        ></ha-entity-toggle>
      </div>

    `;
  }

  private _handleItemClick(_ev: Event) {
    const myEvent = new CustomEvent('editClick', { detail: { schedule_id: this.schedule_id } });
    this.dispatchEvent(myEvent);
  }


  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .info {
        margin-left: 16px;
        margin-right: 8px;
        margin-inline-start: 16px;
        margin-inline-end: 8px;
        flex: 1 1 30%;
        transition: color 0.2s ease-in-out;
        cursor: pointer;
      }
      .info,
      .info > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .flex ::slotted(*) {
        margin-left: 8px;
        margin-inline-start: 8px;
        margin-inline-end: initial;
        min-width: 0;
      }
      .flex ::slotted([slot="secondary"]) {
        margin-left: 0;
        margin-inline-start: 0;
        margin-inline-end: initial;
      }
      .secondary,
      ha-relative-time {
        color: var(--secondary-text-color);
        transition: color 0.2s ease-in-out;
      }
      state-badge {
        flex: 0 0 40px;
      }
      .state {
        text-align: var(--float-end);
      }
      .value {
        direction: ltr;
      }
      ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        transition: color 0.2s ease-in-out;
        cursor: pointer;
        align-items: center;
        justify-content: center;
      }
      .disabled {
        --primary-text-color: var(--disabled-text-color);
        --secondary-text-color: var(--disabled-text-color);
        --state-icon-color: var(--disabled-text-color);
        color: var(--disabled-text-color);
      }
      div.tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }
      span.tag {
        height: 28px;
        border-radius: 14px;
        background: rgba(var(--rgb-primary-color), 0.40);
        color: var(--primary-text-color);
        line-height: 1.25rem;
        font-size: 0.875rem;
        padding: 0px 12px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
    `;
  }
}