import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { computeDomain, friendlyName } from "../lib/entity";
import { matchPattern } from "../lib/patterns";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { PickerComboBoxItem, PickerValueRenderer } from "./scheduler-picker";
import { mdiShape } from "@mdi/js";

import './scheduler-chip-set';
import './scheduler-picker';

@customElement("scheduler-entity-picker")
export class SchedulerEntityPicker extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() domain?: string;
  @property() config?: { include: string[], exclude: string[], customize: Record<string, any> };

  @property({ type: Array })
  value?: string[] = [];

  @property({ type: Boolean })
  multiple = false;

  private _valueRenderer: PickerValueRenderer = (value) => {
    const entityId = value || "";

    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-svg-icon
          slot="start"
          .path=${mdiShape}
          style="margin: 0 4px"
        ></ha-svg-icon>
        <span slot="headline">${entityId}</span>
      `;
    }

    const entityName = friendlyName(entityId, stateObj.attributes);

    const primary = entityName || entityId;
    const secondary = entityId;

    return html`
      <state-badge
        .hass=${this.hass}
        .stateObj=${stateObj}
        slot="start"
        color="var(--icon-primary-color)"
      ></state-badge>
      <span slot="headline">${primary}</span>
      <span slot="supporting-text">${secondary}</span>
    `;
  };

  protected render(): TemplateResult {
    return html`
      ${this.renderChips()}

      <scheduler-picker
        .hass=${this.hass}
        allow-custom-value
        .notFoundLabel=${this.hass.localize("ui.components.service-picker.no_match")}
        .getItems=${this._filteredItems}
        .rowRenderer=${this.rowRenderer}
        .valueRenderer=${this._valueRenderer}
        @value-changed=${this._valueChanged}
      >
      </scheduler-picker>
    `;
  }

  private renderChips() {
    if (!this.multiple) return nothing;

    let items = (this.value || []).map(entityId => Object({
      name: friendlyName(entityId, this.hass.states[entityId]?.attributes),
      value: entityId,
      useStateIcon: true
    }));

    return html`
      <scheduler-chip-set
        .hass=${this.hass}
        .items=${items}
        removable
        @value-changed=${this._removeClick}
      >
      </scheduler-chip-set>`;
  }

  rowRenderer = (item: PickerComboBoxItem) => {
    const entityId = item.id || "";
    const stateObj = this.hass.states[entityId];

    return html`
      <ha-combo-box-item type="button" compact>
        ${stateObj
        ? html`
          <state-badge
            .hass=${this.hass}
            .stateObj=${stateObj}
            slot="start"
            color="var(--icon-primary-color)"
          ></state-badge>
        `: html`
          <ha-svg-icon
            slot="start"
            .path=${mdiShape}
          ></ha-svg-icon>
        `}
        <span slot="headline">${item.primary}</span>
        ${item.secondary
        ? html`<span slot="supporting-text">${item.secondary}</span>`
        : nothing}
      </ha-combo-box-item>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    let value = ev.detail.value;
    const target = ev.currentTarget;
    if (!value) return;
    this.value = [...(this.value || []), value];
    if (this.multiple) {
      (target as any).value = "";
    }
    fireEvent(this, "value-changed", { value: this.value });
    ev.stopPropagation();
  }

  private _removeClick(ev: CustomEvent) {
    const value = ev.detail;
    this.value = (this.value || []).filter(e => e !== value);
    fireEvent(this, 'value-changed', { value: this.value });
  }

  private _filteredItems = () => {
    let entityIds = Object.keys(this.hass.states);
    if (this.domain) {
      entityIds = entityIds.filter(e => computeDomain(e) == this.domain);
    }
    if (this.multiple) {
      entityIds = entityIds.filter(e => !this.value?.includes(e));
    }

    if (this.config) {
      entityIds = entityIds.filter(entityId => {
        return ((this.config!.include || []).some(e => matchPattern(e, entityId)) ||
          Object.keys(this.config!.customize || {}).some(e => matchPattern(e, entityId))) &&
          !(this.config!.exclude || []).some(e => matchPattern(e, entityId))
      });
    }

    // if (this.initialValue && !entityIds.includes(this.initialValue) && !this.valueMultiple.includes(this.initialValue)) {
    //   entityIds = [...entityIds, this.initialValue];
    // }

    let entities: PickerComboBoxItem[] = entityIds.map(e => Object({ id: e, primary: friendlyName(e, this.hass.states[e]?.attributes), secondary: e, state: this.hass.states[e] }));
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
  `;
}