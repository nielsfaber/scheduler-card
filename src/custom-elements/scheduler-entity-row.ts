import { LitElement, html, customElement, css, property, internalProperty, PropertyValues } from 'lit-element';
import { ImportedEntry, Dictionary, EntityElement, HassAction, ActionElement } from '../types';
import { parseTimestamp, weekday, MinutesPerHour, daysToArray, ETimeEvent, relativeTime } from '../date-time';
import { PrettyPrintName, capitalize, PrettyPrintIcon } from '../helpers';
import { HomeAssistant, computeEntity, } from 'custom-card-helpers';
import { importEntry } from '../interface';
import { DefaultEntityIcon, DeadEntityIcon, DeadEntityName } from '../const';
import { formatAction } from '../formatAction';
import { importAction, findActionIndex, actionConfig } from '../action';
import { localize } from '../localize/localize';

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
  config?: Dictionary<EntityElement>;
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
    if (oldHass && this._config && changedProps.size == 1) {
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

    let action: HassAction | ActionElement = importAction(nextEntry.actions.map(e => stateObj.attributes.actions[e])[0]);
    let entity = this.hass.states[action.entity];
    let entityName = this._config.name ? this._config.name : entity ? entity.attributes.friendly_name || computeEntity(entity.entity_id) : DeadEntityName;

    let icon = this._config.icon ? this._config.icon : entity ? DefaultEntityIcon : DeadEntityIcon;
    if (this._config.config && action.entity in this._config.config && this._config.config[action.entity]) {
      entityName = this._config.config[action.entity].name || entityName;
      icon = this._config.config[action.entity].icon || icon;
      const matches = findActionIndex(this._config.config[action.entity], action);
      if (matches.length) {
        const match = this._config.config[action.entity].actions[matches[0]];
        if (match.icon) icon = match.icon;
        action = actionConfig({ ...match, service_data: { ...match.service_data || {}, ...action.service_data || {} } });
      }
    }

    let friendlyName = stateObj.attributes.friendly_name?.match(/^schedule\ #[0-9a-f]{6}$/i) ? '' : stateObj.attributes.friendly_name;

    return html`
      <state-badge
        .hass=${this.hass}
        .stateObj=${stateObj}
        .overrideIcon=${PrettyPrintIcon(icon)}
      >
      </state-badge>
      <div class="info">
        ${capitalize(PrettyPrintName(entityName))}: ${capitalize(formatAction(action, this.hass))}
        <div class="secondary">
          ${capitalize(relativeTime(this.computeTimestamp(nextEntry)))}<br>
          ${entries.length > 1 ? entries.length == 2 ? localize('misc.one_additional_task') : localize("misc.x_additional_tasks", "{count}", String(entries.length - 1)) : ''}
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

    let hours = Math.floor(value / MinutesPerHour);
    let minutes = value - hours * MinutesPerHour;
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

    let minimum = -1;
    let indexMinimum = -1;
    timestamps.forEach((time, index) => {
      if (minimum === -1 || time.valueOf() < minimum) {
        minimum = time.valueOf();
        indexMinimum = index;
      }
    });
    return entries[indexMinimum];
  }

  toggleDisabled(ev: Event) {
    if (!this.hass || !this._config) return;
    ev.stopPropagation();
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
        color: var(--primary-text-color);
        transition: color 0.2s ease-in-out;
      }
      .secondary {
        display: block;
        color: var(--secondary-text-color);
        transition: color 0.2s ease-in-out;
      }
      state-badge {
        flex: 0 0 40px;
      }
      ha-switch {
        padding: 13px 5px;
      }
  `;
}
