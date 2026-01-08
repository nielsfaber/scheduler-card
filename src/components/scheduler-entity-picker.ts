import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { computeDomain, friendlyName } from "../lib/entity";
import { matchPattern } from "../lib/patterns";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { PickerComboBoxItem } from "./scheduler-picker";
import { mdiChevronDown, mdiChevronUp, mdiShape } from "@mdi/js";
import { fetchItems } from "../data/store/fetch_items";
import { CustomConfig } from "../types";
import { DEFAULT_INCLUDED_DOMAINS } from "../const";
import { HassEntity } from "home-assistant-js-websocket";

import './scheduler-chip-set';

@customElement("scheduler-entity-picker")
export class SchedulerEntityPicker extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() domain?: string;
  @property() config?: { include?: string[], exclude?: string[], customize?: CustomConfig };

  @property({ type: Array })
  value?: string[] = [];

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Boolean })
  disabled = false;

  filterFunc?: (stateObj: HassEntity) => boolean;

  @state() scheduleEntities: string[] = [];

  protected async firstUpdated() {
    this.scheduleEntities = Object.entries(await fetchItems(this.hass!)).map(
      ([, val]) => val.entity_id
    );
    this._autoSelectIfSingleEntity();
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    // Relevant for type change in conditions
    if (changedProps.has("domain")) {
      this._autoSelectIfSingleEntity();
    }
  }

  private _autoSelectIfSingleEntity() {
    if (this.value && this.value.length > 0) return;

    const items = this._filteredItems();
    if (items.length === 1) {
      this.value = [items[0].id];
      fireEvent(this, "value-changed", { value: this.value });
    }
  }

  protected render(): TemplateResult {
    return html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ entity: { include_entities: this._filteredItems().map(e => e.id), multiple: this.multiple } }}
        @value-changed=${this._valueChanged}
        ?disabled=${this.disabled}
        .value=${this.value}
      >
      </ha-selector>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    this.value = ev.detail.value;
    fireEvent(this, "value-changed", { value: this.value });
    ev.stopPropagation();
  }

  private _removeClick(ev: CustomEvent) {
    const value = ev.detail;
    this.value = (this.value || []).filter(e => e !== value);
    fireEvent(this, 'value-changed', { value: this.value });
  }

  private _parseEntityItem(entityId: string) {
    const customConfig = Object.entries(this.config?.customize || {}).filter(([k, _v]) => matchPattern(k, entityId)).map(([_k, v]) => v);
    const customEntityName = customConfig.find(e => 'name' in e)?.name;
    const customEntityIcon = customConfig.find(e => 'icon' in e)?.icon;

    return <PickerComboBoxItem>{
      id: entityId,
      primary: customEntityName || friendlyName(entityId, this.hass.states[entityId]?.attributes),
      secondary: entityId,
      icon: customEntityIcon
    };
  }

  private _filteredItems = () => {
    let entityIds = Object.keys(this.hass.states);
    if (this.domain) {
      entityIds = entityIds.filter(e => computeDomain(e) == this.domain);
    }

    if (this.config) {
      entityIds = entityIds.filter(entityId => {
        return ((this.config!.include || DEFAULT_INCLUDED_DOMAINS).some(e => matchPattern(e, entityId)) ||
          Object.keys(this.config!.customize || {}).some(e => matchPattern(e, entityId))) &&
          !(this.config!.exclude || []).some(e => matchPattern(e, entityId))
      });
    }
    entityIds = entityIds.filter(e => !this.scheduleEntities.includes(e));

    if (this.filterFunc) entityIds = entityIds.filter(e => this.filterFunc!(this.hass.states[e]));

    // if (this.initialValue && !entityIds.includes(this.initialValue) && !this.valueMultiple.includes(this.initialValue)) {
    //   entityIds = [...entityIds, this.initialValue];
    // }
    let entities = entityIds.map(e => this._parseEntityItem(e));
    return entities;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    :host > * {
      display: block;
      width: 100%;
    }
    div.wrapper {
      display: flex;
    }
    scheduler-chip-set {
      display: flex;
    }
    div.column-right {
      display: flex;
    }
    div.column-right ha-icon-button {
      display: flex;
      align-self: flex-end;
    }
  `;
}
