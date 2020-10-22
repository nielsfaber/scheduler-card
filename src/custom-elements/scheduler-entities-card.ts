import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import { CardConfig, Dictionary, EntityElement, ScheduleEntity } from '../types';
import { commonStyle } from '../styles';
import { HassEntity } from 'home-assistant-js-websocket';

import './scheduler-entity-row';
import { IsSchedulerEntity, entityFilter, entityConfig } from '../entity';
import { importAction } from '../action';


@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends LitElement {

  @property() _hass?: HomeAssistant;
  @property() config?: CardConfig;

  schedules: HassEntity[] = [];
  scheduleEntities: string[] = [];

  loadSchedules() {
    if (!this._hass || !this.config) return;

    let schedules = Object.entries(this._hass.states)
      .filter(([k]) => IsSchedulerEntity(k))
      .map(([, v]) => v);

    if (this.config.discover_existing !== undefined && !this.config.discover_existing) {
      schedules = schedules.filter(el =>
        (el.attributes.actions.map(e => e.entity) as string[]).every(e => this._hass!.states[e] && entityFilter(e, this._hass!, this.config!))
      );
    }

    schedules.sort((a, b) => {
      const remainingA = a.attributes.next_trigger ? new Date(a.attributes.next_trigger).valueOf() : null;
      const remainingB = b.attributes.next_trigger ? new Date(b.attributes.next_trigger).valueOf() : null;

      if (remainingA !== null && remainingB !== null) {
        if (remainingA > remainingB) return 1;
        else if (remainingA < remainingB) return -1;
        else return a.entity_id < b.entity_id ? 1 : -1;
      } else if (remainingB !== null) return 1;
      else if (remainingA !== null) return -1;
      else return a.entity_id < b.entity_id ? 1 : -1;
    });

    this.schedules = schedules;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1) {
      const scheduleEntities = Object.keys(oldHass.states).filter(el => IsSchedulerEntity(el));
      if (scheduleEntities.length !== this.scheduleEntities.length) {
        this.loadSchedules();
        return true;
      }
      if (scheduleEntities.some((e, i) => e !== this.scheduleEntities[i])) return true;
      if (scheduleEntities.some(e => oldHass.states[e] !== this._hass!.states[e])) return true;
      return false;
    }
    this.loadSchedules();
    return true;
  }

  set hass(hass: HomeAssistant) {
    this.scheduleEntities = Object.keys(hass.states).filter(el => IsSchedulerEntity(el));
    this._hass = hass;
  }


  render() {
    if (!this._hass || !this.config || !this.schedules) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          ${this.schedules.length && this.config.show_header_toggle ? html`
          <ha-switch
            ?checked=${this.schedules.some(el => el.state == "waiting" || el.state == "triggered")}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>`: ''}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this._hass.user.is_admin ?
        html`
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
          >new item
          </mwc-button>
        </div>
      </ha-card>
      ` : ''}
      `;
  }

  getRows() {
    if (!this.config || !this._hass || !this.schedules) return html``;

    if (!this.schedules.length) return html`${localize('instructions.no_entries_defined')}`;
    return this.schedules.map(e => e.entity_id).map(entity_id => {
      const entity = this._hass!.states[entity_id] as ScheduleEntity;
      let discovered = !(entity.attributes.actions!.map(importAction).every(e => entityFilter(e.entity, this._hass!, this.config!)));

      if (discovered) {
        return html`
          <hui-warning>
            <scheduler-entity-row
              class="${entity.state == 'waiting' || entity.state == 'triggered' ? '' : 'disabled'}"
              .hass=${this._hass}
              .schedule_entity=${entity.entity_id}
              .config=${this.config}
              @click=${() => this.editItemClick(entity_id)}
            >
            </scheduler-entity-row>
            <div style="margin: 5px 5px 0px 5px">
              This schedule was discovered from HA, but is not included in your card. Make sure to include it, or set 'discover_existing: false' to hide it.
            </div>
          </hui-warning>
          `;
      }
      else {
        return html`
            <scheduler-entity-row
              class="${entity.state == 'waiting' || entity.state == 'triggered' ? '' : 'disabled'}"
              .hass=${this._hass}
              .schedule_entity=${entity.entity_id}
              .config=${this.config}
              @click=${() => this.editItemClick(entity_id)}
            >
            </scheduler-entity-row>
          `;
      }
    });
  }

  toggleDisableAll(ev: Event) {
    if (!this._hass || !this.schedules) return;
    let checked = (ev.target as HTMLInputElement).checked;
    this.schedules.forEach(el => {
      this._hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  editItemClick(entity_id: string) {
    let myEvent = new CustomEvent("editClick", { detail: entity_id });
    this.dispatchEvent(myEvent);
  }

  newItemClick() {
    let myEvent = new CustomEvent("newClick");
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    ${commonStyle}
    .card-content > * {
      margin: 20px 0px;
    }
    scheduler-entity-row {
      cursor: pointer;
    }
    scheduler-entity-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --paper-item-icon-color: var(--disabled-text-color);
    }
      hui-warning {
        padding: 10px 0px;
      }
  `;
}