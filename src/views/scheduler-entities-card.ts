import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import { CardConfig, Schedule, SchedulerEventData } from '../types';
import { commonStyle } from '../styles';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from '../components/subscribe-mixin';

import '../components/scheduler-entity-row';
import { capitalize, getLocale, AsArray } from '../helpers';
import { fetchSchedules, fetchScheduleItem } from '../data/websockets';
import { entityFilter } from '../data/entities/entity_filter';
import { WebsocketEvent } from '../const';

const computeScheduleTimestamp = (schedule: Schedule) =>
  new Date(schedule.timestamps[schedule.next_entries[0]]).valueOf()

const sortSchedules = (schedules: Schedule[], hass: HomeAssistant) => {
  let output = [...schedules];
  output.sort((a, b) => {

    const stateA = hass.states[a.entity_id]?.state;
    const stateB = hass.states[b.entity_id]?.state;

    if (['on', 'triggered', 'off'].includes(stateA) && !['on', 'triggered', 'off'].includes(stateB)) return -1;
    else if (!['on', 'triggered', 'off'].includes(stateA) && ['on', 'triggered', 'off'].includes(stateB)) return 1;

    const remainingA = computeScheduleTimestamp(a);
    const remainingB = computeScheduleTimestamp(b);
    const now = new Date().valueOf();

    const reverse = remainingA < now && remainingB < now;

    if (remainingA !== null && remainingB !== null) {
      if (remainingA < now && remainingB >= now) return 1;
      else if (remainingA >= now && remainingB < now) return -1;
      else if (remainingA > remainingB) return reverse ? -1 : 1;
      else if (remainingA < remainingB) return reverse ? 1 : -1;
      else return a.entity_id < b.entity_id ? 1 : -1;
    } else if (remainingB !== null) return 1;
    else if (remainingA !== null) return -1;
    else return a.entity_id < b.entity_id ? 1 : -1;
  });
  return output;
}

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends SubscribeMixin(LitElement) {

  @property()
  config?: CardConfig;

  @property()
  showDiscovered = false;

  @property()
  schedules?: Schedule[];

  connectionError = false;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this.loadSchedules();
    return [
      this.hass!.connection.subscribeMessage(
        (ev: SchedulerEventData) => this.updateScheduleItem(ev),
        { type: WebsocketEvent }
      )
    ];
  }

  private async updateScheduleItem(ev: SchedulerEventData): Promise<void> {
    //only update single schedule
    fetchScheduleItem(this.hass!, ev.schedule_id)
      .then(schedule => {
        const oldSchedule = this.schedules?.find(e => e.schedule_id == ev.schedule_id);
        let schedules = [...this.schedules || []];

        if (!schedule || !this.filterIncludedSchedule(schedule)) {
          //schedule is not in the list, remove if it was in the list
          if (oldSchedule) {
            schedules = schedules.filter(e => e.schedule_id != ev.schedule_id);
          }
        }
        else if (!oldSchedule) {
          //add a new schedule and sort the list
          schedules = sortSchedules([...schedules, schedule], this.hass!);
        }
        else if (
          oldSchedule.enabled == schedule.enabled &&
          computeScheduleTimestamp(oldSchedule) == computeScheduleTimestamp(schedule)
        ) {
          //only overwrite the existing schedule
          schedules = schedules.map(e => e.schedule_id == schedule.schedule_id ? schedule : e);
        }
        else {
          //overwrite the existing schedule and sort
          schedules = sortSchedules(schedules.map(e => e.schedule_id == schedule.schedule_id ? schedule : e), this.hass!);
        }
        this.schedules = [...schedules];
      });
  }

  private async loadSchedules(): Promise<void> {
    //load all schedules

    fetchSchedules(this.hass!)
      .then(res => {
        let schedules = res;

        schedules = schedules.filter(e => this.filterIncludedSchedule(e));
        this.schedules = sortSchedules(schedules, this.hass!);
      })
      .catch(_e => {
        this.schedules = [];
        this.connectionError = true;
      });
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    const oldConfig = changedProps.get('config') as CardConfig | undefined;
    if (oldHass && changedProps.size == 1 && this.schedules)
      return this.schedules!.some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass!.states[e.entity_id]));
    else if (oldConfig && this.config && (oldConfig.discover_existing !== this.config.discover_existing || oldConfig.tags !== this.config.tags))
      (async () => await this.loadSchedules())();
    return true;
  }

  render() {
    if (!this.hass || !this.config || !this.schedules) return html``;
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title
        ? typeof this.config.title == 'string'
          ? this.config.title
          : localize('ui.panel.common.title', getLocale(this.hass))
        : ''}
          </div>
          ${this.schedules.length && this.config.show_header_toggle
        ? html`
                <ha-switch
                  ?checked=${this.schedules.some(el => ["on", "triggered"].includes(this.hass!.states[el.entity_id]?.state || ''))}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `
        : ''}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this.config.show_add_button !== false
        ? html`
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
            ?disabled=${this.connectionError}
          >${this.hass.localize('ui.components.area-picker.add_dialog.add')}
          </mwc-button>
        </div>` : ''}
      </ha-card>
    `;
  }
  getRows() {
    if (!this.config || !this.hass || !this.schedules) return html``;
    if (this.connectionError) {
      return html`
        <div>
          <hui-warning>
           ${localize('ui.panel.overview.backend_error', getLocale(this.hass))}
          </hui-warning>
        </div>
      `;
    }
    else if (!Object.keys(this.schedules).length) {
      return html`
        <div>
          ${localize('ui.panel.overview.no_entries', getLocale(this.hass))}
        </div>
      `;
    }
    let includedSchedules: Schedule[] = [];
    let excludedEntities: Schedule[] = [];

    this.schedules
      .forEach(schedule => {
        const included = schedule.timeslots
          .every(timeslot => timeslot.actions
            .every(action => entityFilter(action.entity_id || action.service, this.config!)))
        if (!included) excludedEntities.push(schedule);
        else if (!this.filterByTags(schedule)) excludedEntities.push(schedule);
        else includedSchedules.push(schedule);
      });

    return html`
      ${includedSchedules.map(schedule => {
      const state = this.hass!.states[schedule.entity_id]?.state || '';
      return html`
          <scheduler-entity-row
            ?disabled=${!["on", "triggered"].includes(state)}
            .hass=${this.hass}
            .schedule=${schedule}
            .config=${this.config}
            @click=${() => this.editItemClick(schedule.schedule_id!)}
          >
          </scheduler-entity-row>
        `;
    })}
      ${Object.keys(excludedEntities).length
        ? !this.showDiscovered
          ? html`
              <div>
                <button
                  class="show-more"
                  @click=${() => {
              this.showDiscovered = true;
            }}
                >
                  + ${localize('ui.panel.overview.excluded_items', getLocale(this.hass), '{number}', excludedEntities.length)}
                </button>
              </div>
            `
          : html`
              ${excludedEntities.map(schedule => {
            const state = this.hass!.states[schedule.entity_id]?.state || '';
            return html`
                  <scheduler-entity-row
                    ?disabled=${!["on", "triggered"].includes(state)}
                    .hass=${this.hass}
                    .schedule=${schedule}
                    .config=${this.config}
                    @click=${() => this.editItemClick(schedule.schedule_id!)}
                  >
                  </scheduler-entity-row>
                `;
          })}
              <div>
                <button
                  class="show-more"
                  @click=${() => {
              this.showDiscovered = false;
            }}
                >
                  ${capitalize(localize('ui.panel.overview.hide_excluded', getLocale(this.hass)))}
                </button>
              </div>
            `
        : ''}
    `;
  }

  toggleDisableAll(ev: Event) {
    if (!this.hass || !this.schedules) return;
    const checked = (ev.target as HTMLInputElement).checked;
    this.schedules.forEach(el => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  editItemClick(entity_id: string) {
    const myEvent = new CustomEvent('editClick', { detail: entity_id });
    this.dispatchEvent(myEvent);
  }

  newItemClick() {
    const myEvent = new CustomEvent('newClick');
    this.dispatchEvent(myEvent);
  }

  filterIncludedSchedule(schedule: Schedule) {
    if (this.config!.discover_existing) {
      return true;
    }
    else if (!schedule) {
      return false;
    }
    else if (!schedule.timeslots.every(slot =>
      slot.actions.every(action =>
        entityFilter(action.entity_id || action.service, this.config!)
      )
    )) {
      return false;
    }
    else return this.filterByTags(schedule);
  }

  filterByTags(schedule: Schedule) {
    const filters = AsArray(this.config!.tags);
    if (filters.length) {
      if ((schedule.tags || []).some(e => filters.includes(e))) return true;
      else if (filters.includes('none') && !schedule.tags?.length) return true;
      return false;
    }
    return true;
  }

  static styles = css`
    ${commonStyle}
    scheduler-entity-row {
      cursor: pointer;
      margin: 20px 0px;
    }
    hui-warning {
      padding: 10px 0px;
    }

    button.show-more {
      color: var(--primary-color);
      text-align: left;
      cursor: pointer;
      background: none;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
      font: inherit;
    }
    button.show-more:focus {
      outline: none;
      text-decoration: underline;
    }
  `;
}
