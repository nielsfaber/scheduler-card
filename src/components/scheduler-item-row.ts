import { CSSResultGroup, LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { CardConfig, Schedule } from "../types";
import { computeActionIcon } from "../data/format/compute_action_icon";
import { HomeAssistant } from "../lib/types";
import { computeScheduleDisplay } from "../data/format/compute_schedule_display";
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { computeEntityIcon } from "../data/format/compute_entity_icon";
import { computeDomain } from "../lib/entity";

import './scheduler-relative-time';

@customElement("scheduler-item-row")
export class SchedulerItemRow extends LitElement {

  @property() hass!: HomeAssistant;
  @property() schedule_id!: string;
  @property() schedule!: Schedule;
  @property() config!: CardConfig;

  render() {
    try {
      const stateObj = this.hass.states[this.schedule.entity_id!];
      if (!stateObj) return html``;
      const disabled = stateObj.state == 'off';
      const nextAction = this.schedule.entries[0].slots[this.schedule.next_entries[0] || 0].actions[0];

      let icon = computeActionIcon(nextAction, this.config.customize);
      if (this.config.display_options.icon == 'entity') {
        let entityId = [nextAction.target?.entity_id || []].flat().shift();
        if (['script', 'notify'].includes(computeDomain(nextAction.service))) entityId = nextAction.service;
        if (entityId) icon = computeEntityIcon(entityId, this.config.customize, this.hass);
      }

      return html`
      <ha-icon
        icon="${icon}"
        @click=${this._handleIconClick}
        class="${disabled ? 'disabled' : ''}"
      ></ha-icon>

      <div
        class="info ${disabled ? 'disabled' : ''}"
        @click=${this._handleItemClick}
      >
        ${this.renderDisplayItem(this.config.display_options.primary_info)}
        <div class="secondary">
        ${this.renderDisplayItem(this.config.display_options.secondary_info)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${stateObj}
        ></ha-entity-toggle>
      </div>

    `;
    } catch (e) {
      return html`
        <hui-warning .hass=${this.hass} @click=${this._handleItemClick}>
          <span style="white-space: normal">
            Failed to display schedule ${this.schedule.entity_id}.
            Reason: ${e}
          </span>
        </hui-warning>
      `;
    }
  }

  private renderDisplayItem(displayItem: string | string[]) {
    const replacePreservedTags = (input: string) => {
      const parts = input.split('<relative-time></relative-time>');
      if (parts.length > 1) {
        const ts = this.schedule.timestamps![this.schedule.next_entries[0] || 0];
        return html`
          ${parts[0] ? unsafeHTML(parts[0]) : ''}
          <scheduler-relative-time
            .hass=${this.hass}
            .datetime=${new Date(ts)}
          >
          </scheduler-relative-time>
          ${parts[1] ? unsafeHTML(parts[1]) : ''}
        `;
      }
      const res = input.match(/^(<tag>[^<]*<\/tag>)+$/);
      if (res !== null) {
        let tags = input.split(/<tag>([^<]*)<\/tag>/).filter(e => e);
        return html`
          <div class="tags">
            ${tags?.map(e => html`<span class="tag">${e}</span>`)}
          </div>`;
      }
      return unsafeHTML(input);
    };

    const entries = computeScheduleDisplay(this.schedule, displayItem, this.hass, this.config.customize)
      .filter(e => e.length);

    return entries.map((entry, index) => {
      const content = replacePreservedTags(entry);
      const isSlotInfo = entry.includes('class="slot-info"');
      const needsBreak = !isSlotInfo && index < entries.length - 1;

      return html`${content}${needsBreak ? html`<br/>` : nothing}`;
    });
  }

  private _handleItemClick(_ev: Event) {
    const myEvent = new CustomEvent('editClick', { detail: { schedule_id: this.schedule_id } });
    this.dispatchEvent(myEvent);
  }

  private _handleIconClick(_ev: Event) {
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
      .secondary {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      span.slot-info {
        display: block;
        margin: 0;
        line-height: 1.1;
      }
      span.slot-info--active {
        color: var(--primary-text-color);
        font-weight: 600;
        font-size: 1.16em;
      }
      span.slot-info--inactive {
        color: var(--disabled-text-color);
      }
      span.slot-info--disabled {
        color: var(--disabled-text-color);
        font-weight: normal;
      }
      .info.disabled span.slot-info,
      .info.disabled span.slot-info--active {
        color: var(--disabled-text-color);
        font-weight: normal;
        font-size: inherit;
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
      ha-icon.disabled {
        color: var(--disabled-text-color);
      }
      div.disabled {
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