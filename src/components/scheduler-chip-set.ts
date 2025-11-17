import { LitElement, html, TemplateResult, CSSResultGroup, css } from "lit";
import { property, customElement } from "lit/decorators";
import { HomeAssistant } from "../lib/types";

import "./scheduler-chip";

interface ChipItem {
  name: string;
  value?: string;
  icon?: string;
  badge?: any;
  useStateIcon?: boolean;
}

@customElement("scheduler-chip-set")
export class SchedulerChipSet extends LitElement {
  @property({ attribute: false })
  hass!: HomeAssistant;

  @property({ attribute: false })
  items?: ChipItem[];

  @property({ attribute: false })
  value: string[] = [];

  @property({ type: Boolean })
  selectable?: boolean;

  @property({ type: Boolean })
  toggleable?: boolean;

  @property({ type: Boolean })
  removable?: boolean;

  @property({ type: Boolean })
  disabled?: boolean;

  protected render(): TemplateResult {
    if (!this.items) return html``;

    return html` ${Object.values(this.items).map((e) => this.renderChipitem(e))} `;
  }

  private renderChipitem(item: ChipItem): TemplateResult {
    const isInvalidEntity = item.useStateIcon && !Object.keys(this.hass.states).includes(item.value || "");
    return html`
      <scheduler-chip
        .hass=${this.hass}
        .value=${item.value || item.name}
        .icon=${item.icon}
        ?useStateIcon=${item.useStateIcon}
        ?active=${this.value.includes(item.value || item.name)}
        .badge=${item.badge !== undefined ? String(item.badge) : undefined}
        ?selectable=${this.selectable}
        ?toggleable=${this.toggleable}
        ?removable=${this.removable}
        @click=${this._handleClick}
        @icon-clicked=${this._handleClick}
        ?disabled=${this.disabled}
        style="${isInvalidEntity ? "text-decoration: line-through" : ""}"
      >
        ${item.name}
      </scheduler-chip>
    `;
  }

  private _handleClick(ev: CustomEvent) {
    if (this.disabled) return;
    if (this.toggleable) {
      const value = ev.detail.value;
      const active = ev.detail.active;
      if (this.value.includes(value) && !active) this.value = this.value.filter((e) => e != value);
      else if (!this.value.includes(value) && value) this.value = [...this.value, value];
      const myEvent = new CustomEvent("value-changed", { detail: this.value });
      this.dispatchEvent(myEvent);
    } else {
      const myEvent = new CustomEvent("value-changed", { detail: ev.detail.value });
      this.dispatchEvent(myEvent);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin: 0px -4px;
        flex-wrap: wrap;
      }
      scheduler-chip {
        display: inline-flex;
        margin-bottom: 4px;
      }
    `;
  }
}
