import { LitElement, html, customElement, css, property, internalProperty, PropertyValues } from 'lit-element';
import { ImportedEntry, Dictionary, EntityConfig } from '../types';
import { parseTimestamp, weekday, MinutesPerHour, daysToArray, ETimeEvent, relativeTime } from '../date-time';
import { PrettyPrintName, capitalize, PrettyPrintIcon } from '../helpers';
import { HomeAssistant, computeEntity } from 'custom-card-helpers';
import { importEntry } from '../interface';
import { computeAction } from '../computeAction';
import { DefaultEntityIcon } from '../const';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-entity-row',
  name: 'scheduler-entity-row',
  description: 'Show a schedule entity in entities card.',
});

type schedulerRowConfig = {
  entity: string;
  icon?: string;
  name?: string;
  config?: Dictionary<EntityConfig>;
}

@customElement('scheduler-entity-row')
export class ScheduleEntityRow extends LitElement {

  @property() hass?: HomeAssistant;
  @internalProperty() private _config?: schedulerRowConfig;

  setConfig(config: schedulerRowConfig) {
    this._config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass && this._config) {
      const entity = this._config.entity;
      return oldHass.states[entity] !== this.hass!.states[entity];
    }
    return true;
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
    let entityName = this._config.name ? this._config.name : entity ? entity.attributes.friendly_name || computeEntity(entity.entity_id) : '(unknown entity)';

    let service = action.service;
    let icon = this._config.icon ? this._config.icon : DefaultEntityIcon;

    if (this._config.config && action.entity in this._config.config) {
      entityName = this._config.config[action.entity].name || entityName;
      icon = PrettyPrintIcon(this._config.config[action.entity].icon) || icon;
    }

    return html`
      <state-badge
        .hass=${this.hass}
        .stateObj=${stateObj}
        .overrideIcon=${icon}
      >
      </state-badge>
      <div class="info">
        ${capitalize(PrettyPrintName(entityName))} - ${capitalize(computeAction(this.hass, action))}
        <div class="secondary">
          ${capitalize(relativeTime(this.computeTimestamp(nextEntry)))}<br>
          ${entries.length > 1 ? `${entries.length - 1} more actions` : ''}
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
    if (!this.hass || !this._config) return;
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
