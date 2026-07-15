import { mdiCalendarEdit, mdiChevronLeft, mdiChevronRight, mdiDotsVertical, mdiPencil, mdiShapeRectanglePlus, mdiTrashCanOutline } from "@mdi/js";
import { CSSResultGroup, LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators";
import { Action, CardConfig, EditorMode, Schedule, ScheduleEntry, TWeekday, Target, Time, Timeslot } from "../types";
import { actionConfig } from "../data/actions/action_config";
import { formatWeekdayDisplay } from "../data/days";
import { defaultSelectorValue } from "../data/selectors/default_selector_value";
import { isSupportedSelector } from "../data/selectors/is_supported_selector";
import { selectorConfig } from "../data/selectors/selector_config";
import { NumberSelector, Selector } from "../lib/selector";
import { DialogSelectActionParams } from "./dialog-select-action";
import { DialogSelectWeekdayParams } from "./dialog-select-weekdays";

import { computeDomain } from "../lib/entity";
import { computeTimestamp } from "../data/time/compute_timestamp";
import { HomeAssistant } from "../lib/types";
import { localize } from "../localize/localize";
import { insertTimeslot } from "../data/schedule/insert_timeslot";
import { removeTimeslot } from "../data/schedule/remove_timeslot";
import { formatFieldDisplay } from "../data/format/format_field_display";
import { formatActionDisplay } from "../data/format/format_action_display";
import { computeActionIcon } from "../data/format/compute_action_icon";
import { fireEvent } from "../lib/fire_event";
import { useAmPm } from "../lib/use_am_pm";
import { capitalizeFirstLetter } from "../lib/capitalize_first_letter";
import { hassLocalize } from "../localize/hassLocalize";
import { isDefined } from "../lib/is_defined";
import { moveTimeslot } from "../data/schedule/move_timeslot";
import { computeEntityDisplay } from "../data/format/compute_entity_display";
import { actionTargetEntities, buildTargetFilter, describeTarget, isEmptyTarget, normalizeTarget, targetEntities, targetIsDynamic } from "../data/actions/target";
import { DEFAULT_TIME_STEP } from "../const";
import { HassEntity } from "home-assistant-js-websocket";

import "../components/scheduler-timeslot-editor";
import "../components/scheduler-time-picker";
import "../components/scheduler-target-picker";
import '../dialogs/dialog-select-weekdays';
import '../dialogs/dialog-select-action';
import '../components/scheduler-collapsible-section';
import '../components/scheduler-settings-row';
import '../components/scheduler-conditions-editor';
import '../components/scheduler-combo-selector';

@customElement('scheduler-main-panel')
export class SchedulerMainPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;
  @property({ attribute: false }) public viewMode!: EditorMode;
  @property({ attribute: false }) public selectedSlot: number | null = null;
  @property({ type: Boolean }) large = false;

  @state() schedule!: Schedule;
  @state() expandedAction: number = 0;
  @state() selectedEntry: number | null = 0;

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get('schedule')) {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { schedule: this.schedule } })
      );
    }
    return true;
  }

  render() {
    return html`
    <div class="name-row">
      <span>${hassLocalize('ui.common.name', this.hass)}:</span>
      <ha-input
        .value=${this.schedule.name || ''}
        placeholder=${this.schedule.name
      ? ''
      : hassLocalize('ui.common.name', this.hass)}
        @input=${this._updateName}
        @change=${(ev: Event) => ev.stopPropagation()}
      ></ha-input>
    </div>

    ${this.schedule.entries.map((entry, num) => html`
      
      <div class="editor-header">
        <div class="weekdays">
          <span>
            ${localize('ui.panel.editor.repeated_days', this.hass)}:
            ${formatWeekdayDisplay(entry.weekdays, 'short', this.hass)}
          </span>
          <ha-icon-button .path=${mdiCalendarEdit} @click=${(ev: Event) => this._showWeekdayDialog(ev, num)}></ha-icon-button>
        </div>
        <div class="weekdays-actions">
        <ha-button appearance="plain" size="small" @click=${this.toggleViewMode}>
          ${this.viewMode == EditorMode.Scheme
        ? localize('ui.panel.editor.toggle_single_mode', this.hass)
        : localize('ui.panel.editor.toggle_scheme_mode', this.hass)
      }
          <ha-icon slot="end" icon="mdi:swap-horizontal"></ha-icon>
        </ha-button>
        </div>
      </div>

      ${this.viewMode == EditorMode.Scheme ? html`
      <div class="editor-header">
        <div class="weekdays">
          ${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}:
        </div>
        ${this.renderActionButtons()}
      </div>
      <scheduler-timeslot-editor
        .hass=${this.hass}
        .config=${this.config}
        .schedule=${entry}
        .selectedSlot=${this.selectedSlot}
        @update=${(ev: CustomEvent) => this._handleUpdate(ev, num)}
        .large=${this.large}
      >
      </scheduler-timeslot-editor>
      ` :
        html`
          ${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}:
          <scheduler-time-picker
            .hass=${this.hass}
            .time=${this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!].start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
            .stepSize=${this.config.time_step || DEFAULT_TIME_STEP}
            large
          >
          </scheduler-time-picker>
      `}
    `)}

    ${this.renderSlot()}

    <scheduler-conditions-editor
      .hass=${this.hass}
      .config=${this.config}
      .schedule=${this.schedule}
      @change=${this._conditionsChanged}
    >
    </scheduler-conditions-editor>
    `;
  }

  toggleViewMode() {
    const newViewMode: EditorMode = this.viewMode == EditorMode.Scheme ? EditorMode.Single : EditorMode.Scheme;
    this.dispatchEvent(
      new CustomEvent('setViewMode', { detail: newViewMode })
    );
  }

  renderActionButtons() {
    if (this.selectedSlot === null || this.selectedEntry === null) return html``;

    const startTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start;
    const stopTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].stop || startTime;

    const tsA = computeTimestamp(startTime, this.hass);
    const tsB = computeTimestamp(stopTime, this.hass) || 24 * 3600;

    const delta = tsB - tsA;

    return html`
      <div class="actions">
        <ha-icon-button .path=${mdiChevronLeft} @click=${(ev: Event) => { this._updateSelectedSlot(this.selectedSlot! - 1); (ev.target as HTMLElement).blur() }} ?disabled=${this.selectedSlot === null || this.selectedSlot < 1}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiChevronRight} @click=${(ev: Event) => { this._updateSelectedSlot(this.selectedSlot! + 1); (ev.target as HTMLElement).blur() }} ?disabled=${this.selectedSlot === null || this.selectedSlot > (this.schedule.entries[this.selectedEntry].slots.length - 2)}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiShapeRectanglePlus} @click=${this._addTimeslot} ?disabled=${delta < 1800}>
        </ha-icon-button>
        <ha-icon-button .path=${mdiTrashCanOutline} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length <= 2}>
        </ha-icon-button> 
      </div>
    `;
  }

  renderSlot() {
    if (this.selectedEntry === null || this.selectedSlot === null) {
      return html`
        <div class="slot-placeholder"> 
          ${localize('ui.panel.editor.select_timeslot', this.hass)}
        </div>
      `;
    }
    const slot = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];
    const isLastSlot = this.selectedSlot === this.schedule.entries[this.selectedEntry!].slots.length - 1;
    let endTime = slot.stop;
    if (!endTime && (this.selectedSlot < this.schedule.entries[this.selectedEntry].slots.length - 1))
      endTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot + 1].start;
    if (!endTime) endTime = slot.start;

    return html`
      ${this.viewMode == EditorMode.Scheme ? html`
      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.start_time', this.hass)}:"
            ?disabled=${this.selectedSlot == 0}
            .time=${slot.start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
          >
          </scheduler-time-picker>
        </div>
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.stop_time', this.hass)}:"
            ?disabled=${isLastSlot}
            .time=${endTime}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
          >
          </scheduler-time-picker>
        </div>
      </div>`
        : ''}

      ${localize('ui.panel.editor.action', this.hass)}:
      ${slot.actions.length > 1 ? html`
        <scheduler-collapsible-group
          .openedItem=${this.expandedAction}
          @openclose-changed=${(ev: CustomEvent) => { this.expandedAction = ev.detail.item }}
        >
          ${slot.actions.map((action, idx) => this._renderActionConfig(action, idx, true))}
        </scheduler-collapsible-group>`
        : slot.actions.map((action, idx) => this._renderActionConfig(action, idx, false))}
      <div>
        <ha-button appearance="plain"
          @click=${(ev: Event) => this._showActionDialog(ev)}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.editor.add_action', this.hass)}
        </ha-button>
      </div>
    `;
  }

  _renderActionConfig(action: Action, idx: number, collapsible: boolean) {
    const config = actionConfig(action, this.config.customize);
    const domain = config.target?.domain || computeDomain(action.service);

    const hasFixedEntity = isDefined(config?.target?.entity_id) || this.schedule.entries[this.selectedEntry!].slots.some(e => idx < e.actions.length && isDefined(actionConfig(e.actions[idx], this.config.customize)?.target?.entity_id));

    if (config === undefined) return html``;

    //if (!config || !config.fields) return html``;
    const fields = Object.keys(config.fields || {}).filter(e => isSupportedSelector(action, e, this.hass!, this.config.customize));

    let heading = '';

    let targetDisplay = '';
    if (targetIsDynamic(action.target)) targetDisplay = describeTarget(this.hass, action.target);
    else {
      let entityIds = targetEntities(action.target);
      if (!entityIds.length && ['notify', 'script'].includes(domain)) entityIds = [action.service];
      targetDisplay = entityIds.map(e => computeEntityDisplay(e, this.hass, this.config.customize)).join(", ");
    }
    if (targetDisplay.length) heading += targetDisplay + ': ';
    heading += formatActionDisplay(action, this.hass, this.config.customize, false, true);

    return html`
      <scheduler-collapsible-section
        idx="${idx}"
        ?expanded=${!collapsible}
        ?disabled=${!collapsible}
      >
        <div slot="header" class="header">
          <ha-icon slot="icon" icon="${computeActionIcon(action, this.config.customize)}"></ha-icon>
          <span>${capitalizeFirstLetter(heading)}</span>
        </div>

        <ha-dropdown
          slot="contextMenu" 
          @wa-select=${(ev: CustomEvent) => this._actionItemOptionsClick(ev, idx)}
          @wa-after-hide=${(ev: Event) => { ((ev.target as HTMLElement).firstElementChild as HTMLElement).blur() }}
          placement="bottom-end"
        >
          <ha-icon-button slot="trigger" .path=${mdiDotsVertical}>
          </ha-icon-button>
          <ha-dropdown-item value="change_type">
            <ha-icon icon="mdi:pencil"></ha-icon>
            ${hassLocalize('ui.panel.lovelace.editor.card.conditional.change_type', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item variant="danger" value="delete">
            <ha-icon icon="mdi:delete"></ha-icon>
            ${hassLocalize('ui.common.delete', this.hass)}
          </ha-dropdown-item>
        </ha-dropdown>

        <div slot="content">

          ${config.target ? html`
          <scheduler-settings-row>
            <span slot="heading">${localize('ui.panel.editor.target', this.hass)}</span>
            <scheduler-target-picker
              .hass=${this.hass}
              .cardConfig=${this.config}
              .domain=${domain}
              .supportedFeatures=${config.supported_features}
              .filterFunc=${(stateObj: HassEntity) => config.supported_features ? ((stateObj.attributes.supported_features || 0) & config.supported_features) > 0 : true}
              @value-changed=${(ev: CustomEvent) => this._selectTarget(idx, ev)}
              .value=${action.target || {}}
              ?disabled=${hasFixedEntity}
            >
            </scheduler-target-picker>
          </scheduler-settings-row>
          `
        : ''}

          ${fields.map(field => {
          const selector = selectorConfig(action.service, actionTargetEntities(this.hass, action), field, this.hass!, this.config.customize);
          if (selector === null) return '';
          let optional: boolean | undefined = config.fields![field].optional || ((selector as NumberSelector).number || {}).optional;
          const checked = optional ? Object.keys(action.service_data).includes(field) : true;
          return html`
            <scheduler-settings-row ?showPrefix=${optional}>
              ${optional ? html`
                <ha-checkbox
                  slot="prefix"
                  ?checked=${checked}
                  @change=${(ev: Event) => this._toggleOptionalField(ev, idx, field, selector)}
                >
                </ha-checkbox>
              ` : ''}
              <span slot="heading">
                ${formatFieldDisplay(action, field, this.hass, this.config.customize)}
              </span>
              <scheduler-combo-selector
                .hass=${this.hass}
                .config=${selector}
                ?disabled=${!checked}
                .value=${Object.keys(action.service_data).includes(field) ? action.service_data[field] : undefined}
                @value-changed=${(ev: CustomEvent) => this._selectField(idx, field, ev)}
              >
              </scheduler-combo-selector>
            </scheduler-settings-row>
          `
        })
      }
        </div>
      </scheduler-collapsible-section>
    `;
  }

  /** replace the action at idx within the selected slot's action list */
  _updateAction(idx: number, action: Action, slotIdx = this.selectedSlot!) {
    const actions = [...this.schedule.entries[this.selectedEntry!].slots[slotIdx].actions];
    actions[idx] = action;
    this._updateSlot({ actions: actions }, slotIdx);
  }

  _selectField(idx: number, field: string, ev: CustomEvent) {
    const value = ev.detail.value;

    const slot: Timeslot = { ...this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!] };
    let action: Action = value !== undefined
      ? {
        ...slot.actions[idx], service_data: {
          ...slot.actions[idx].service_data,
          [field]: value
        }
      }
      : {
        ...slot.actions[idx], service_data:
          Object.fromEntries(
            Object.entries(slot.actions[idx].service_data).filter(([key]) => key != field)
          )
      }
    this._updateAction(idx, action);
  }

  _toggleOptionalField(ev: Event, idx: number, field: string, selector: Selector) {
    const checked = (ev.target as HTMLInputElement).checked;
    const value = checked ? defaultSelectorValue(selector) : undefined;
    if (checked) {
      this._selectField(idx, field, new CustomEvent('value-changed', { detail: { value: isDefined(value) ? value : null } }));
    }
    else {
      this._selectField(idx, field, new CustomEvent('value-changed', { detail: { value: undefined } }));
    }
  }

  _selectTarget(idx: number, ev: CustomEvent) {
    ev.stopPropagation();
    const target = normalizeTarget(ev.detail.value as Target | undefined);
    // stamp the card's include/exclude restrictions into the action, so
    // dynamic targets only ever resolve to entities this card may control
    const filter = targetIsDynamic(target) ? buildTargetFilter(this.config) : undefined;

    // the target at this action position is shared across all slots of the
    // schedule (scheme-mode slots carry the same action set at each position)
    this.schedule.entries[this.selectedEntry!].slots.forEach((slot, slotIdx) => {
      if (idx >= slot.actions.length) return;
      let action: Action = {
        ...slot.actions[idx],
        target: target || {},
        target_filter: filter
      };
      this._updateAction(idx, action, slotIdx);
    });
  }

  _handleUpdate(ev: CustomEvent, entry: number) {
    this.selectedEntry = entry;
    if (ev.detail.hasOwnProperty('selectedSlot')) {
      this._updateSelectedSlot(ev.detail.selectedSlot);
      this.selectedSlot = ev.detail.selectedSlot;
    }
    else if (ev.detail.hasOwnProperty('slots')) {
      this._updateEntry({ slots: ev.detail.slots });
    }
  }

  _updateName(ev: InputEvent) {
    // native input events must not reach the dialog's @change listener,
    // which expects CustomEvents carrying a detail object
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    // store the raw value so the re-rendered binding always equals what is
    // in the input (trimming here made the field eat spaces while typing);
    // trimming happens at save time in exportSchedule
    this.schedule = { ...this.schedule, name: value ?? '' };
  }

  _conditionsChanged(ev: CustomEvent) {
    ev.stopPropagation();
    // adopting the child's schedule triggers shouldUpdate, which re-dispatches
    // the change upward to the editor dialog (same pattern as slot updates)
    this.schedule = ev.detail.schedule;
  }

    _updateSelectedSlot(slot: number | null) {
    this.expandedAction = 0;
    this.dispatchEvent(
      new CustomEvent('change', { detail: { selectedSlot: slot } })
    );
  }

  _updateEntry(update: Partial<ScheduleEntry>) {
    let entry: ScheduleEntry = { ...this.schedule.entries[this.selectedEntry!] };
    entry = { ...entry, ...update };
    this.schedule = {
      ...this.schedule,
      entries: Object.assign(
        this.schedule.entries,
        {
          [this.selectedEntry!]: entry
        }
      )
    }
  }

  _updateSlot(update: Partial<Timeslot>, slotIdx = this.selectedSlot!) {
    let slot: Timeslot = { ...this.schedule.entries[this.selectedEntry!].slots[slotIdx] };
    slot = { ...slot, ...update };
    this._updateEntry({
      slots: Object.assign(
        this.schedule.entries[this.selectedEntry!].slots,
        {
          [slotIdx]: slot
        }
      )
    });
  }

  async _showWeekdayDialog(ev: Event, entry: number) {
    this.selectedEntry = entry;
    await new Promise<TWeekday[] | null>(resolve => {
      const params: DialogSelectWeekdayParams = {
        weekdays: [...this.schedule.entries[entry].weekdays],
        cancel: () => resolve(null),
        confirm: (out) => resolve(out)
      };

      fireEvent(ev.target as HTMLElement, 'show-dialog', {
        dialogTag: 'dialog-select-weekdays',
        dialogImport: () => import('./dialog-select-weekdays'),
        dialogParams: params,
      });
    })
      .then((res: TWeekday[] | null) => {
        if (!res) return;
        this._updateEntry({ weekdays: res });
      });
  }

  async _showActionDialog(ev: Event, replaceIdx?: number) {
    let filteredDomains: string[] | undefined = undefined;
    let filteredEntities: string[] | undefined = undefined;

    // when changing an existing action's type, restrict the choices to
    // ones compatible with that action's current target; when adding a
    // NEW action, all domains are allowed (that is the point of having
    // multiple actions in one schedule)
    if (replaceIdx !== undefined) {
      const current = this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!].actions[replaceIdx];
      if (current) {
        const entities = targetEntities(current.target);
        filteredEntities = entities.length ? entities : undefined;
        filteredDomains = [...new Set([computeDomain(current.service), ...entities.map(computeDomain)])];
      }
    }

    await new Promise<Action | null>(resolve => {
      const params: DialogSelectActionParams = {
        cancel: () => resolve(null),
        confirm: (out: Action) => resolve(out),
        domainFilter: filteredDomains,
        entityFilter: filteredEntities,
        cardConfig: this.config
      };

      fireEvent(ev.target as HTMLElement, 'show-dialog', {
        dialogTag: 'dialog-select-action',
        dialogImport: () => import('./dialog-select-action'),
        dialogParams: params,
      });
    })
      .then((res: Action | null) => {
        if (!res) return;
        const slot: Timeslot = { ...this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!] };
        let action = { ...res };

        if (action.target) {
          // adopt an already-configured target where it makes sense:
          // dynamic targets (areas/floors/labels) apply across domains
          // since resolution is domain-filtered at runtime; explicit
          // entity targets only transfer within the same domain
          const newDomain = computeDomain(action.service);
          const donor = this.schedule.entries[this.selectedEntry!].slots
            .map(e => e.actions).flat()
            .find(a => !isEmptyTarget(a.target)
              // any explicit entities in the donor target must belong to the
              // new action's domain (pure area/floor/label targets always
              // qualify: their resolution is domain-filtered at runtime)
              && targetEntities(a.target).every(e => computeDomain(e) == newDomain));
          if (donor) action = { ...action, target: donor.target, target_filter: donor.target_filter };
        }

        if (replaceIdx !== undefined && replaceIdx < slot.actions.length) {
          this._updateAction(replaceIdx, action);
        }
        else {
          this._updateSlot({ actions: [...slot.actions, action] });
          this.expandedAction = slot.actions.length;
        }
      });
  }


  _actionItemOptionsClick(ev: CustomEvent, idx: number) {
    const option: 'delete' | 'change_type' = ev.detail.item.value;
    switch (option) {
      case 'change_type':
        this._showActionDialog(ev, idx);
        break;
      case 'delete':
        const actions = this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!].actions
          .filter((_e, i) => i !== idx);
        this._updateSlot({ actions: actions });
        if (this.expandedAction >= actions.length) this.expandedAction = Math.max(0, actions.length - 1);
        break;
    }
  }

  _stopTimeChanged(ev: CustomEvent) {
    let value = ev.detail.value as Time;
    let [slots, slotIdxOut] = moveTimeslot([...this.schedule.entries[this.selectedEntry!].slots], Number(this.selectedSlot), { stop: value }, this.hass);
    this._updateEntry({ slots: slots });
    if (slotIdxOut != this.selectedSlot) this._updateSelectedSlot(slotIdxOut);
  }

  _startTimeChanged(ev: CustomEvent) {
    let value = ev.detail.value as Time;
    let [slots, slotIdxOut] = moveTimeslot([...this.schedule.entries[this.selectedEntry!].slots], Number(this.selectedSlot), { start: value }, this.hass);
    this._updateEntry({ slots: slots });
    if (slotIdxOut != this.selectedSlot) this._updateSelectedSlot(slotIdxOut);
  }

  _addTimeslot(ev: Event) {
    if (this.selectedEntry === null || this.selectedSlot === null) return;
    this.schedule = insertTimeslot(this.schedule, this.selectedEntry, this.selectedSlot, this.hass);
    (ev.target as HTMLElement).blur();
  }

  _removeTimeslot(ev: Event) {
    if (this.selectedEntry === null || this.selectedSlot === null) return;
    this.schedule = removeTimeslot(this.schedule, this.selectedEntry, this.selectedSlot);
    if (this.selectedSlot >= this.schedule.entries[this.selectedEntry].slots.length) this.selectedSlot = this.schedule.entries[this.selectedEntry].slots.length - 1;
    (ev.target as HTMLElement).blur();
  }

  static get styles(): CSSResultGroup {
    return css`
  :host {
    position: relative;
  }
  div.name-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  div.name-row > span {
    white-space: nowrap;
  }
  div.name-row ha-input {
    flex: 1;
  }
  scheduler-conditions-editor {
    margin-top: 16px;
  }
  .two-column {
    display: flex;
    flex-direction: row;
    margin: 16px 0px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .two-column .column {
    display: flex;
    flex-direction: column;
    flex: 0 0 215px;
  }
  div.editor-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .weekdays {
    display: flex;
    flex: 1;
    align-items: center;
    white-space: nowrap;
  }
  .weekdays-actions {
    display: flex;
    align-items: center;
  }
  div.actions {
    display: flex;
    align-items: end;
    margin: -4px 0px 0px 0px;
  }
  @media all and (max-width: 150px) {
    div.editor-header {
      flex-direction: column;
      margin-top: 0px;
    }
    div.actions {
      align-self: flex-end;
    }
  }
  div.slot-placeholder {
    padding: 20px 0px 0px 0px;
  }
  scheduler-collapsible-section .header ha-icon {
    margin-right: 6px;
  }
  scheduler-collapsible-section .header span {
    flex: 1;
  }
  ha-list-item.warning, ha-list-item.warning ha-icon {
    color: var(--error-color);
  }
    `;
  }
}