import { LitElement, html, customElement, css, property, internalProperty, PropertyValues } from 'lit-element';
import { ImportedEntry, Dictionary, EntityElement, HassAction, ActionElement, CardConfig, ScheduleEntity } from '../types';
import { parseTimestamp, weekday, MinutesPerHour, daysToArray, ETimeEvent, relativeTime } from '../date-time';
import { PrettyPrintName, capitalize, PrettyPrintIcon } from '../helpers';
import { HomeAssistant, computeEntity, } from 'custom-card-helpers';
import { importEntry } from '../interface';
import { DefaultEntityIcon, DeadEntityIcon, DeadEntityName, DefaultActionIcon } from '../const';
import { formatAction } from '../formatAction';
import { importAction, findActionIndex, actionConfig, findAction } from '../action';
import { localize } from '../localize/localize';
import { HassEntity } from 'home-assistant-js-websocket';
import { entityConfig } from '../entity';

@customElement('scheduler-entity-row')
export class ScheduleEntityRow extends LitElement {

  @property() hass?: HomeAssistant;
  @property() schedule_entity?: string;
  @property() config?: CardConfig

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1 && this.schedule_entity) {
      return oldHass.states[this.schedule_entity] !== this.hass!.states[this.schedule_entity];
    }
    return true;
  }

  render() {
    if (!this.config || !this.hass || !this.schedule_entity) return html``;

    const stateObj = this.hass.states[this.schedule_entity] as ScheduleEntity;
    if (!stateObj) {
      return html`
        <hui-warning>
          Entity not found '${this.schedule_entity}'
        </hui-warning>
      `;
    }

    const entries: ImportedEntry[] = stateObj.attributes.entries.map(importEntry);
    const nextEntry = this.computeNextEntry(entries);
    const action: HassAction = importAction(nextEntry.actions.map(e => stateObj.attributes.actions[e])[0]);

    let entityName = DeadEntityName;
    let icon = DeadEntityIcon;
    let entityCfg = entityConfig(action.entity, this.hass, this.config);

    if (entityCfg) { //entity exists in HASS
      let actionCfg = findAction(entityCfg, action);
      icon = actionCfg.icon || entityCfg.icon || DefaultActionIcon;
      entityName = entityCfg.name;
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
        ?checked=${stateObj.state == 'waiting' || stateObj.state == 'triggered'}
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
    if (!this.hass || !this.schedule_entity) return;
    ev.stopPropagation();
    let checked = !(ev.target as HTMLInputElement).checked;
    this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this.schedule_entity });
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
