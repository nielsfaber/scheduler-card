import { LitElement, html, customElement, css, property, internalProperty } from 'lit-element';
import { ImportedEntry } from '../types';
import { parseTimestamp, weekday, MinutesPerHour, daysToArray, ETimeEvent, relativeTime } from '../date-time';
import { PrettyPrintName, capitalize } from '../helpers';
import { HomeAssistant, computeEntity, fixedIcons, computeDomain, DEFAULT_DOMAIN_ICON } from 'custom-card-helpers';
import { importEntry } from '../interface';
import { computeAction } from '../computeAction';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-entity-row',
  name: 'scheduler-entity-row',
  description: 'Show a schedule entity in entities card.',
});

@customElement('scheduler-entity-row')
export class ScheduleEntityRow extends LitElement {

  @property() hass?: HomeAssistant;
  @internalProperty() private _config?: any;

  setConfig(config: any) {
    this._config = config;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <hui-warning>
          Entity not found '${this._config.entity}'
        </hui-warning>
      `;
    }
    let entries: ImportedEntry[] = stateObj.attributes.entries.map(importEntry);
    let nextEntry = this.computeNextEntry(entries);

    let action = nextEntry.actions.map(e => stateObj.attributes.actions[e])[0];
    let entity = this.hass.states[action.entity];
    let entityName = entity ? entity.attributes.friendly_name || computeEntity(entity.entity_id) : '<unknown entity>';

    let service = action.service;
    let icon = entity ? fixedIcons[computeDomain(entity.entity_id)] : DEFAULT_DOMAIN_ICON;

    return html`
      <state-badge
        .hass=${this.hass}
        .stateObj=${stateObj}
        .overrideIcon=${icon}
      >
      </state-badge>
      <div class="info">
        ${capitalize(PrettyPrintName(entityName))} - ${computeAction(this.hass, action)}
        <div class="secondary">
          ${capitalize(relativeTime(this.computeTimestamp(nextEntry)))}
        </div>
      </div>
      <ha-switch
        ?checked=${stateObj.state == "waiting"}
        @click=${this.toggleDisabled}
      >
      </ha-switch>
    `;
  }

  computeTimestamp(entry: ImportedEntry) {
    let now = new Date();
    let ts = new Date();
    ts.setSeconds(0);

    let value = entry.time.value;

    if (entry.time.event) {
      let sunEntity = this.hass!.states['sun.sun'];
      if (!sunEntity) return new Date(0);
      let ts_ref = entry.time.event == ETimeEvent.Sunrise ? parseTimestamp(sunEntity.attributes.next_rising) : parseTimestamp(sunEntity.attributes.next_setting);
      value = ts_ref + entry.time.value;
    }

    let hours = Math.floor(entry.time.value / MinutesPerHour);
    let minutes = entry.time.value - hours * MinutesPerHour;
    ts.setHours(hours);
    ts.setMinutes(minutes);

    let days = daysToArray(entry.days);
    //TBD adjust days for weekday integration!
    while (ts.valueOf() <= now.valueOf() || !days.includes(weekday(ts))) {
      ts.setDate(ts.getDate() + 1);
    }
    return ts;
  }

  computeNextEntry(entries: ImportedEntry[]) {
    let timestamps = entries.map(e => this.computeTimestamp(e));
    let num = timestamps.reduce((im, e, i, arr) => e.valueOf() > arr[im].valueOf() ? i : im, 0);
    return entries[num];
  }

  toggleDisabled(ev: Event) {
    if (!this.hass) return;
    ev.stopPropagation();
    ev.preventDefault();
    (ev.target as HTMLElement).blur();
    let checked = !(ev.target as HTMLInputElement).checked;
    this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this._config.entity });
  }

  static styles = css`

      :host {
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .info {
        margin-left: 16px;
        flex: 1 0 60px;
      }
      .info,
      .info > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .secondary {
        display: block;
        color: var(--secondary-text-color);
      }      
      state-badge {
        flex: 0 0 40px;
      }
      ha-switch {
        padding: 13px 5px;
      }
  `;
}
