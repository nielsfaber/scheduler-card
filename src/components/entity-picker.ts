import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain, friendlyName } from "../lib/entity";
import { sortByName } from "../lib/sort";
import { matchPattern } from "../lib/patterns";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { mdiUnfoldLessHorizontal, mdiUnfoldMoreHorizontal } from "@mdi/js";

interface TRowItem {
  entity_id: string;
  friendly_name: string;
  icon: string;
}

type HassEntityWithCachedName = HassEntity & { friendly_name: string };

@customElement("scheduler-entity-picker")
export class SchedulerEntityPicker extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() domain?: string;
  @property() config?: { include: string[], exclude: string[], customize: Record<string, any> };

  @state() private _filter?: string;
  @property() public value?: string;
  @property() public valueMultiple: string[] = [];

  @property() public multiple: boolean = false;
  @property() public allowMultiple: boolean = false;

  @property() initialValue = "";

  firstUpdated() {
    if (this.value) this.initialValue = this.value;
    if (this.valueMultiple.length > 1) this.multiple = true;
  }

  protected render(): TemplateResult {
    return html`
      ${this.renderChips()}
      <div class="wrapper">
      ${(this.multiple && this.valueMultiple.length > 1) || (!this.multiple && !this.value) || !this.allowMultiple
        ? ''
        : html` 
      <ha-icon-button
        .path=${this.multiple ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal}
        @click=${this._toggleMultiple}
      >
      </ha-icon-button>`
      }
      <ha-combo-box
        .hass=${this.hass}
        label=${this.hass.localize("ui.components.entity.entity-picker.entity")}
        item-value-path="entity_id"
        item-label-path="friendly_name"
        .renderer=${this.rowRenderer}
        .filteredItems=${this._filteredItems()}
        @filter-changed=${this._filterChanged}
        @value-changed=${this._valueChanged}
        .value=${this.value || ""}
      >
      </ha-combo-box>
      </div>
    `;
  }

  renderChips(): TemplateResult {
    if (!this.multiple) return html``;

    const renderChip = (entityId: string) => {
      const stateObj = this.hass.states[entityId];
      return html`
        <div class="chip">
          ${stateObj
          ? html`<ha-state-icon .stateObj=${stateObj} .hass=${this.hass} class="icon"></ha-state-icon>`
          : html`<ha-icon icon="mdi:help-circle-outline" class="icon"></ha-icon>`
        }
          <span class="label">${friendlyName(entityId, this.hass.states[entityId]?.attributes)}</span>
          <ha-icon icon="mdi:close" @click=${() => this._removeValue(entityId)} class="marker"></ha-icon>
        </div>
      `;
    }

    return html`
      <div class="chips">
        ${this.valueMultiple.map(renderChip)}
      </div>
    `;
  }

  rowRenderer = (item: HassEntityWithCachedName) =>
    html`
      <mwc-list-item graphic="avatar" twoline>
        ${item.state
        ? html`<state-badge slot="graphic" .stateObj=${item} .hass=${this.hass} color="var(--icon-primary-color)"></state-badge>`
        : html`<ha-icon slot="graphic" icon="mdi:help-circle-outline"></ha-icon>`
      }
        <span>${item.friendly_name}</span>
        <span slot="secondary">${item.entity_id}</span>
      </mwc-list-item>
    `;

  private _filterChanged(ev: CustomEvent): void {
    this._filter = ev.detail.value.toLowerCase();
  }

  private _valueChanged(ev: CustomEvent) {
    let value = ev.detail.value;
    if (this.multiple) {
      if (!value) return;
      this.valueMultiple = [...this.valueMultiple, value];
      (ev.target as any).setInputValue(undefined);
      fireEvent(this, "value-changed", { value: this.valueMultiple });
    }
    else {
      this.value = value;
      fireEvent(this, "value-changed", { value: this.value });
    }
    ev.stopPropagation();
  }


  private _filteredItems = () => {
    let entityIds = Object.keys(this.hass.states);
    if (this.domain) {
      entityIds = entityIds.filter(e => computeDomain(e) == this.domain);
    }
    if (this.valueMultiple.length) {
      entityIds = entityIds.filter(e => !this.valueMultiple.includes(e));
    }

    if (this.config) {
      entityIds = entityIds.filter(entityId => {
        return ((this.config!.include || []).some(e => matchPattern(e, entityId)) ||
          Object.keys(this.config!.customize || {}).some(e => matchPattern(e, entityId))) &&
          !(this.config!.exclude || []).some(e => matchPattern(e, entityId))
      });
    }

    if (this.initialValue && !entityIds.includes(this.initialValue) && !this.valueMultiple.includes(this.initialValue)) {
      entityIds = [...entityIds, this.initialValue];
    }

    let entities: HassEntityWithCachedName[] = entityIds.map(e => Object({ ...this.hass.states[e], entity_id: e, friendly_name: friendlyName(e, this.hass.states[e]?.attributes) }));
    entities.sort((a, b) => sortByName(a.friendly_name, b.friendly_name));
    return entities;
  }

  private _removeValue = (value: string) => {
    this.valueMultiple = this.valueMultiple.filter(e => e != value);
    fireEvent(this, "value-changed", { value: this.valueMultiple });
  }

  private _toggleMultiple() {
    if (!this.multiple) {
      this.multiple = true;
      this.valueMultiple = [this.value!];
      this.value = undefined;
    }
    else {
      this.multiple = false;
      this.value = this.valueMultiple.shift();
      this.valueMultiple = [];
    }

  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    div.chips {
      flex: 1 0 auto;
    }
    div.chip {
      height: 32px;
      border-radius: 16px;
      border: 2px solid rgba(var(--rgb-primary-color), 0.54);
      line-height: 1.25rem;
      font-size: 0.875rem;
      font-weight: 400;
      padding: 0px 12px;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      margin: 4px;
    }
    div.chip .icon {
        vertical-align: middle;
        outline: none;
        display: flex;
        align-items: center;
        border-radius: 50%;
        padding: 6px;
        color: rgba(0, 0, 0, 0.54);
        background: rgb(168, 232, 251);
        --mdc-icon-size: 20px;
        margin-left: -14px !important;
    }
    div.chip .label {
        margin: 0px 4px;
    }
    div.chip .marker {
        cursor: pointer;
        background: var(--secondary-text-color);
        border-radius: 50%;
        --mdc-icon-size: 14px;
        color: var(--card-background-color);
        width: 16px;
        height: 16px;
        padding: 1px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        margin-right: -6px !important;
    }
    div.wrapper {
      display: flex;
      flex: 1 0 auto;
      align-items: center;
    }
  `;
}