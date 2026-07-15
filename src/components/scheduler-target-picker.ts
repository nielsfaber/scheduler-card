import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { CardConfig, Target, TargetFilter } from "../types";
import { localize } from "../localize/localize";
import { loadHaForm } from "../lib/load_ha_form";
import {
  buildTargetFilter,
  isEmptyTarget,
  normalizeTarget,
  resolveTarget,
  resolveTargetLocal,
  targetIsDynamic,
} from "../data/actions/target";
import { entityIncludedByConfig } from "../data/actions/entity_included_by_config";

/**
 * Target picker for the schedule editor, mirroring the UX of the "target"
 * field in HA's automation/script editor (chips for selected items, add
 * buttons with Entities / Devices / Areas / Floors / Labels pickers).
 *
 * Rendering strategy, in order of preference:
 *  1. HA's native `ha-target-picker`, if registered — supports our
 *     entityFilter/deviceFilter functions for supported_features filtering.
 *  2. HA's `ha-selector` with a `target` selector config — ha-selector
 *     lazy-imports the target selector (and with it ha-target-picker)
 *     through HA's own chunk graph, so this always works when ha-selector
 *     is registered. Once that import registers ha-target-picker, the
 *     component upgrades itself to path 1.
 *  3. A warning, if neither element can be loaded.
 *
 * Emits `value-changed` with a normalized Target object:
 * { entity_id?: string[], device_id?: string[], area_id?: string[],
 *   floor_id?: string[], label_id?: string[] }
 *
 * Shows a live "targets N entities" summary resolved by the backend's
 * resolve_target() (with client-side fallback), so the preview matches
 * exactly what will run.
 */
@customElement("scheduler-target-picker")
export class SchedulerTargetPicker extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @property({ type: Object })
  value?: Target;

  /** card configuration; its include/exclude/customize settings restrict
   * which entities and devices the picker offers, and which entities
   * dynamic targets may resolve to */
  @property({ attribute: false }) cardConfig?: CardConfig;

  /** restrict entity/device pickers to this domain (from the selected action) */
  @property() domain?: string;

  /** supported_features bitmask required of targetable entities */
  @property({ type: Number }) supportedFeatures?: number;

  /** additional entity restriction (used with the native picker) */
  filterFunc?: (stateObj: HassEntity) => boolean;

  @property({ type: Boolean })
  disabled = false;

  @state() private _resolvedCount: number | null = null;

  @state() private _mode: 'loading' | 'native' | 'selector' | 'unavailable' = 'loading';

  private _resolveJob = 0;

  protected async firstUpdated() {
    // ensure ha-selector (and ideally ha-target-picker) are registered;
    // normally already done at card startup, this is a safety net
    try {
      await loadHaForm();
    } catch (e) { /* fall through to availability checks */ }

    this._computeMode();

    if (this._mode == 'selector') {
      // rendering ha-selector with a target selector makes HA import
      // ha-selector-target -> ha-target-picker; upgrade once registered
      customElements.whenDefined('ha-target-picker').then(() => {
        this._computeMode();
      });
    }

    this._updateResolvedCount();
  }

  private _computeMode() {
    if (customElements.get('ha-target-picker')) this._mode = 'native';
    else if (customElements.get('ha-selector')) this._mode = 'selector';
    else this._mode = 'unavailable';
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has("value") || changedProps.has("domain")) {
      this._updateResolvedCount();
    }
  }

  private async _updateResolvedCount() {
    const target = normalizeTarget(this.value);
    if (!target || !targetIsDynamic(target)) {
      // static targets need no resolution preview
      this._resolvedCount = null;
      return;
    }
    const job = ++this._resolveJob;
    const filter = this._targetFilter;
    let entities: string[];
    try {
      entities = await resolveTarget(this.hass, target, this.domain, filter);
    } catch (e) {
      // backend without resolve_target support: approximate client-side
      entities = resolveTargetLocal(this.hass, target, this.domain, filter);
    }
    if (job != this._resolveJob) return; // stale response
    this._resolvedCount = entities.length;
  }

  render() {
    if (!this.hass || this._mode == 'loading') return html``;
    if (this._mode == 'unavailable') {
      return html`
        <ha-alert alert-type="warning">
          ${localize('ui.components.target.picker_unavailable', this.hass)}
        </ha-alert>
      `;
    }

    return html`
      <div class="picker">
        ${this._mode == 'native'
        ? html`
          <ha-target-picker
            .hass=${this.hass}
            .value=${normalizeTarget(this.value) || {}}
            .includeDomains=${this.domain ? [this.domain] : undefined}
            .entityFilter=${this._entityFilter}
            .deviceFilter=${this._deviceFilter}
            ?disabled=${this.disabled}
            @value-changed=${this._valueChanged}
          ></ha-target-picker>`
        : html`
          <ha-selector
            .hass=${this.hass}
            .selector=${this._targetSelector}
            .value=${normalizeTarget(this.value) || {}}
            ?disabled=${this.disabled}
            @value-changed=${this._valueChanged}
          ></ha-selector>`}
        ${this._resolvedCount !== null
        ? html`
          <div class="summary">
            <ha-icon icon="${this._resolvedCount ? 'mdi:information-outline' : 'mdi:alert-outline'}"></ha-icon>
            ${localize(
          this._resolvedCount == 1
            ? 'ui.components.target.resolved_entities_single'
            : 'ui.components.target.resolved_entities',
          this.hass, '{number}', String(this._resolvedCount))}
          </div>`
        : ''}
      </div>
    `;
  }

  private get _targetFilter(): TargetFilter | undefined {
    return buildTargetFilter(this.cardConfig);
  }

  private get _targetSelector() {
    // declarative filter config for the ha-selector fallback path
    if (!this.domain) return { target: {} };
    let entityFilter: Record<string, any> = { domain: [this.domain] };
    if (this.supportedFeatures) entityFilter = { ...entityFilter, supported_features: [this.supportedFeatures] };
    return { target: { entity: [entityFilter] } };
  }

  private _entityFilter = (stateObj: HassEntity): boolean => {
    if (this.domain && stateObj.entity_id.split('.').shift() != this.domain) return false;
    if (this.cardConfig && !entityIncludedByConfig(stateObj.entity_id, this.cardConfig)) return false;
    if (this.filterFunc && !this.filterFunc(stateObj)) return false;
    return true;
  };

  private _deviceFilter = (device: { id: string }): boolean => {
    // only offer devices that expose at least one entity matching the filter
    const entities = (this.hass as any).entities || {};
    return Object.values(entities).some((entry: any) =>
      entry.device_id == device.id
      && !entry.disabled_by && !entry.hidden_by && !entry.entity_category
      && (!this.domain || entry.entity_id.split('.').shift() == this.domain)
      && (!this.cardConfig || entityIncludedByConfig(entry.entity_id, this.cardConfig))
      && (!this.filterFunc || !this.hass.states[entry.entity_id] || this.filterFunc(this.hass.states[entry.entity_id]))
    );
  };

  private _valueChanged(ev: CustomEvent) {
    ev.stopPropagation();
    const target = normalizeTarget(ev.detail.value as Target);
    this.value = target || {};
    fireEvent(this, 'value-changed', { value: isEmptyTarget(target) ? undefined : target });
  }

  static styles = css`
    :host {
      display: block;
    }
    .summary {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .summary ha-icon {
      --mdc-icon-size: 18px;
    }
  `;
}
