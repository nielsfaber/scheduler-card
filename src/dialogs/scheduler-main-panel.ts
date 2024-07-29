import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiDelete, mdiMinus, mdiPencil, mdiPlus } from "@mdi/js";
import { CSSResultGroup, LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators";
import { Action, CardConfig, Schedule, ScheduleEntry, TWeekday, Time, TimeMode, Timeslot } from "../types";
import { actionConfig } from "../data/actions/action_config";
import { formatWeekdayDisplay } from "../data/days";
import { defaultSelectorValue } from "../data/selectors/default_selector_value";
import { isSupportedSelector } from "../data/selectors/is_supported_selector";
import { selectorConfig } from "../data/selectors/selector_config";
import { NumberSelector, Selector } from "../lib/selector";
import { DialogSelectActionParams } from "./dialog-select-action";
import { DialogSelectWeekdayParams } from "./dialog-select-weekdays";

import { computeDomain, computeEntity, friendlyName } from "../lib/entity";
import { timeToString } from "../data/time/time_to_string";
import { parseTimeString } from "../data/time/parse_time_string";
import { addTimeOffset } from "../data/time/add_time_offset";
import { HomeAssistant } from "../lib/types";
import { localize } from "../localize/localize";
import { insertTimeslot } from "../data/schedule/insert_timeslot";
import { removeTimeslot } from "../data/schedule/remove_timeslot";
import { computeTimestamp } from "../data/time/compute_timestamp";
import { formatFieldDisplay } from "../data/format/format_field_display";
import { formatActionDisplay } from "../data/format/format_action_display";
import { computeActionIcon } from "../data/format/compute_action_icon";
import { fireEvent } from "../lib/fire_event";
import { useAmPm } from "../lib/use_am_pm";

import "../components/timeslot-editor";
import "../components/time-picker";
import "../components/entity-picker";
import '../dialogs/dialog-select-weekdays';
import '../dialogs/dialog-select-action';
import '../components/collapsible-section';
import '../components/settings-row';
import '../components/combo-selector';
import { capitalizeFirstLetter } from "../lib/capitalize_first_letter";

@customElement('scheduler-main-panel')
export class SchedulerMainPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule!: Schedule;
  @state() selectedEntry: number | null = 0;
  @state() selectedSlot: number | null = null;

  @property({ type: Boolean })
  large = false;

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
    ${this.schedule.entries.map((entry, num) => html`

      <div class="editor-header">
      <div class="weekdays">
        <span>
          ${localize('ui.panel.editor.repeated_days', this.hass)}:
          ${formatWeekdayDisplay(entry.weekdays, 'short', this.hass)}
        </span>
        <ha-icon-button .path=${mdiPencil} @click=${(ev: Event) => this._showWeekdayDialog(ev, num)}></ha-icon-button>
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
    `)}

    ${this.renderSlot()}
    `;
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
        <ha-icon-button .path=${mdiChevronLeft} @click=${() => { this.selectedSlot = this.selectedSlot! - 1 }} ?disabled=${this.selectedSlot === null || this.selectedSlot < 1}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiChevronRight} @click=${() => { this.selectedSlot = this.selectedSlot! + 1 }} ?disabled=${this.selectedSlot === null || this.selectedSlot > (this.schedule.entries[this.selectedEntry].slots.length - 2)}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiPlus} @click=${this._addTimeslot} ?disabled=${delta < 1800}>
        </ha-icon-button>
        <ha-icon-button .path=${mdiMinus} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length <= 2}>
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
    let endTime = slot.stop;
    if (!endTime && (this.selectedSlot < this.schedule.entries[this.selectedEntry].slots.length - 1))
      endTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot + 1].start;
    if (!endTime) endTime = slot.start;

    return html`

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

          <div style="display: flex; flex-direction: row">
          <mwc-checkbox
            ?checked=${slot.stop !== undefined}
            @change=${this._toggleStopTime}
          >
          </mwc-checkbox>

          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.stop_time', this.hass)}:"
            ?disabled=${slot.stop === undefined || this.selectedSlot == (this.schedule.entries[this.selectedEntry!].slots.length - 1)}
            .time=${endTime}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
          >
          </scheduler-time-picker>
          </div>
        </div>
      </div>

      ${localize('ui.panel.editor.action', this.hass)}:
      ${this._renderActionConfig()}
    `;
  }

  _renderActionConfig() {
    const slot: Timeslot = { ...this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!] };
    const action = slot.actions.length ? slot.actions[0] : undefined;
    if (!action) return html`
      <div>
        <mwc-button
          @click=${this._showActionDialog}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.editor.add_action', this.hass)}
        </mwc-button>
      </div>
    `;

    const domain = computeDomain(action.service);
    const config = actionConfig(action, this.config.customize);
    if (config === undefined) return html``;

    //if (!config || !config.fields) return html``;
    const fields = Object.keys(config.fields || {}).filter(e => isSupportedSelector(action, e, this.hass!, this.config.customize));

    let heading = '';

    let entityIds = [action.target?.entity_id || []].flat();

    if (entityIds.length) {
      heading += entityIds.map(e => friendlyName(e, this.hass.states[e]?.attributes)).join(", ");
      heading += ': ';
    }
    heading += formatActionDisplay(action, this.hass, this.config.customize);

    return html`
      <collapsible-section
        ?expanded=${true}
        ?disabled=${true}
      >
        <span slot="header">
          <ha-icon slot="icon" icon="${computeActionIcon(action, this.config.customize)}"></ha-icon>
          ${capitalizeFirstLetter(heading)}
        </span>
        <ha-icon-button slot="contextMenu" .path=${mdiDelete} @click=${this._removeAction}></ha-icon-button>
        <div slot="content">

          ${config.target ? html`
          <settings-row>
            <span slot="heading">${this.hass.localize("ui.components.entity.entity-picker.entity")}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${domain}
              @value-changed=${this._selectEntity}
              .value=${Array.isArray(action.target?.entity_id) ? undefined : action.target?.entity_id}
              .valueMultiple=${Array.isArray(action.target?.entity_id) ? action.target?.entity_id : []}
              ?allowMultiple=${true}
            >
            </scheduler-entity-picker>
          </settings-row>
          `
        : ''}

          ${fields.map(field => {
          const selector = selectorConfig(action.service, action.target?.entity_id, field, this.hass!, this.config.customize);
          if (selector === null) return '';
          let optional: boolean | undefined = config.fields![field].optional || ((selector as NumberSelector).number || {}).optional;
          const checked = optional ? Object.keys(action.service_data).includes(field) : true;
          return html`
            <settings-row ?showPrefix=${optional}>
              ${optional ? html`
                <ha-checkbox
                  slot="prefix"
                  ?checked=${checked}
                  @change=${(ev: Event) => this._toggleOptionalField(ev, field, selector)}
                >
                </ha-checkbox>
              ` : ''}
              <span slot="heading">
                ${formatFieldDisplay(action, field, this.hass, this.config.customize)}
              </span>
              <combo-selector
                .hass=${this.hass}
                .config=${selector}
                ?disabled=${!checked}
                .value=${Object.keys(action.service_data).includes(field) ? action.service_data[field] : undefined}
                @value-changed=${(ev: CustomEvent) => this._selectField(field, ev)}
              >
              </combo-selector>
            </settings-row>
          `
        })
      }
        </div>
      </collapsible-section>
    `;
  }

  _selectField(field: string, ev: CustomEvent) {
    const value = ev.detail.value;

    const slot: Timeslot = { ...this.schedule.entries[this.selectedEntry!].slots[this.selectedSlot!] };
    let action: Action = value !== undefined
      ? {
        ...slot.actions[0], service_data: {
          ...slot.actions[0].service_data,
          [field]: value
        }
      }
      : {
        ...slot.actions[0], service_data:
          Object.fromEntries(
            Object.entries(slot.actions[0].service_data).filter(([key]) => key != field)
          )
      }
    this._updateSlot({ actions: [action] });
  }

  _toggleOptionalField(ev: Event, field: string, selector: Selector) {
    const checked = (ev.target as HTMLInputElement).checked;
    const value = checked ? defaultSelectorValue(selector) : undefined;
    this._selectField(field, new CustomEvent('value-changed', { detail: { value: value } }));
  }

  _selectEntity(ev: CustomEvent) {
    const entity = ev.detail.value as string | string[] | undefined;
    if (!entity) return;

    this.schedule.entries[this.selectedEntry!].slots.forEach((slot, idx) => {
      if (!slot.actions.length) return;
      let action: Action = {
        ...slot.actions[0], target: {
          entity_id: entity
        }
      };
      this._updateSlot({ actions: [action] }, idx);
    });
  }

  _handleUpdate(ev: CustomEvent, entry: number) {
    this.selectedEntry = entry;
    if (ev.detail.hasOwnProperty('selectedSlot')) {
      this.selectedSlot = ev.detail.selectedSlot;
    }
    else if (ev.detail.hasOwnProperty('slots')) {
      this._updateEntry({ slots: ev.detail.slots });

    }
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


  async _showActionDialog(ev: Event) {
    let filteredDomains: string[] = [];

    this.schedule.entries.forEach(entry => {
      entry.slots.forEach(slot => {
        slot.actions.forEach(action => {
          let domains = [computeDomain(action.service), ...[action.target?.entity_id || []].flat()].map(computeDomain);
          domains = domains.filter(e => !filteredDomains.includes(e));
          if (domains.length) filteredDomains = [...filteredDomains, ...domains];
        });
      });
    });
    filteredDomains = [...new Set(filteredDomains)];

    await new Promise<Action | null>(resolve => {
      const params: DialogSelectActionParams = {
        cancel: () => resolve(null),
        confirm: (out: Action) => resolve(out),
        domainFilter: filteredDomains.length ? filteredDomains : undefined,
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
        const target = this.schedule.entries[this.selectedEntry!].slots.find(e => e.actions.length ? e.actions[0].target?.entity_id : undefined);
        let action = { ...res };
        if (target && action.target) action = { ...action, target: target.actions[0].target };
        this._updateSlot({ actions: [action] });
      });
  }

  _removeAction() {
    this._updateSlot({ actions: [] });
  }

  _stopTimeChanged(ev: CustomEvent) {
    const value = ev.detail.value as Time;
    const time = timeToString(value);
    const slotIdx = Number(this.selectedSlot);
    let slots = [... this.schedule.entries[this.selectedEntry!].slots];
    slots = Object.assign(slots, {
      [slotIdx]: { ...slots[slotIdx], stop: time }
    });
    if (slotIdx < (slots.length - 1)) {
      slots = Object.assign(slots, {
        [slotIdx + 1]: { ...slots[slotIdx + 1], start: time }
      });
    }
    this._updateEntry({ slots: slots });
  }

  _startTimeChanged(ev: CustomEvent) {
    const value = ev.detail.value as Time;
    const time = timeToString(value);
    const slotIdx = Number(this.selectedSlot);
    let slots = [... this.schedule.entries[this.selectedEntry!].slots];

    slots = Object.assign(slots, {
      [slotIdx]: { ...slots[slotIdx], start: time }
    });
    if (slotIdx > 0) {
      slots = Object.assign(slots, {
        [slotIdx - 1]: { ...slots[slotIdx - 1], stop: time }
      });
    }
    this._updateEntry({ slots: slots });
  }

  _toggleStopTime(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    const slotIdx = Number(this.selectedSlot);
    let slots = [... this.schedule.entries[this.selectedEntry!].slots];
    if (checked) {
      let nextSlot = slotIdx + 1;
      let stopTime = slots[slotIdx].start;
      if (!slots[slotIdx + 1].actions.length) {
        stopTime = slots[slotIdx + 1].stop!;
        nextSlot = slotIdx + 2;
      }
      slots = [
        ...slots.slice(0, slotIdx),
        { ...slots[slotIdx], stop: stopTime },
        ...slots.slice(nextSlot)
      ];
    } else {
      const stopTime = addTimeOffset(parseTimeString(slots[slotIdx].start), { minutes: 1 });

      slots = [
        ...slots.slice(0, slotIdx),
        { ...slots[slotIdx], stop: undefined },
        {
          start: timeToString(stopTime),
          stop: slots[slotIdx].stop,
          actions: [],
          conditions: slots[slotIdx].conditions
        },
        ...slots.slice(slotIdx + 1)
      ];
    }
    this._updateEntry({ slots: slots });
  }

  _addTimeslot() {
    if (this.selectedEntry === null || this.selectedSlot === null) return;
    this.schedule = insertTimeslot(this.schedule, this.selectedEntry, this.selectedSlot, this.hass);
  }

  _removeTimeslot() {
    if (this.selectedEntry === null || this.selectedSlot === null) return;
    this.schedule = removeTimeslot(this.schedule, this.selectedEntry, this.selectedSlot);
    if (this.selectedSlot == this.schedule.entries[this.selectedEntry].slots.length) this.selectedSlot--;
  }

  static get styles(): CSSResultGroup {
    return css`
  :host {
    position: relative;
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
  }
  .weekdays {
    display: flex;
    flex: 1;
    align-items: center;
  }
  div.actions {
    display: flex;
    align-items: end;
  }
  @media all and (max-width: 450px) {
    div.editor-header {
      flex-direction: column;
    }
    div.actions {
      align-self: flex-end;
    }
  }
  div.slot-placeholder {
    padding: 20px 0px 0px 0px;
  }
    `;
  }
}