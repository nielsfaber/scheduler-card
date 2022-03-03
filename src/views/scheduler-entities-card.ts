import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { HomeAssistant } from 'custom-card-helpers';
import { STATE_NOT_RUNNING, UnsubscribeFunc } from 'home-assistant-js-websocket';

import { localize } from '../localize/localize';
import { CardConfig, Schedule, SchedulerEventData } from '../types';
import { commonStyle } from '../styles';
import { SubscribeMixin } from '../components/subscribe-mixin';
import { capitalize, getLocale, AsArray, PrettyPrintIcon, sortAlphabetically, isDefined } from '../helpers';
import { fetchSchedules, fetchScheduleItem } from '../data/websockets';
import { entityFilter } from '../data/entities/entity_filter';
import { WebsocketEvent } from '../const';
import {
  computeScheduleHeader,
  computeScheduleIcon,
  computeScheduleInfo,
} from '../data/item_display/compute_schedule_display';

import '../components/my-relative-time';

interface ScheduleDisplayInfo {
  primaryInfo: string[];
  secondaryInfo: string[];
  icon: string;
}

const computeScheduleTimestamp = (schedule: Schedule) =>
  new Date(schedule.timestamps[schedule.next_entries[0]]).valueOf();

const sortByRelativeTime = (schedules: Schedule[]) => {
  const output = [...schedules];
  output.sort((a, b) => {
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
};

const sortByTitle = (schedules: Schedule[], displayInfo: Record<string, ScheduleDisplayInfo>) => {
  const output = [...schedules];
  output.sort((a, b) => {
    const titleA = displayInfo[a.schedule_id!].primaryInfo.join('');
    const titleB = displayInfo[b.schedule_id!].primaryInfo.join('');
    return sortAlphabetically(titleA, titleB);
  });
  return output;
};

const sortByState = (schedules: Schedule[], hass: HomeAssistant, expiredSchedulesLast: boolean) => {
  const output = [...schedules];

  output.sort((a, b) => {
    const stateA = hass.states[a.entity_id]?.state;
    const stateB = hass.states[b.entity_id]?.state;

    const scheduleA_active = ['on', 'triggered'].includes(stateA);
    const scheduleB_active = ['on', 'triggered'].includes(stateB);

    if (scheduleA_active && !scheduleB_active) return -1;
    else if (!scheduleA_active && scheduleB_active) return 1;

    if (expiredSchedulesLast) {
      if (stateA != 'off' && stateB == 'off') return 1;
      else if (stateA == 'off' && stateB != 'off') return -1;
    }

    return 0;
  });
  return output;
};

//check whether entities and tags of schedule are included in configuration
const isIncluded = (schedule: Schedule, config: CardConfig) => {
  if (
    !schedule.timeslots.every(timeslot =>
      timeslot.actions.every(action => entityFilter(action.entity_id || action.service, config))
    )
  )
    return false;

  const filters = AsArray(config.tags);
  if (filters.length) {
    if ((schedule.tags || []).some(e => filters.includes(e))) return true;
    else if (filters.includes('none') && !schedule.tags?.length) return true;
    return false;
  }
  return true;
};

//check whether entities and tags of schedule are included in configuration OR they should be discovered
const isIncludedOrExcluded = (schedule: Schedule, config: CardConfig) => {
  if (config.discover_existing) return true;
  else if (!schedule) return false;
  else return isIncluded(schedule, config);
};

const getScheduleDisplayInfo = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  const info: ScheduleDisplayInfo = {
    primaryInfo: computeScheduleHeader(schedule, config, hass),
    secondaryInfo: computeScheduleInfo(schedule, config, hass),
    icon: computeScheduleIcon(schedule, config, hass),
  };
  return info;
};

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends SubscribeMixin(LitElement) {
  @property()
  config?: CardConfig;

  @property()
  showDiscovered = false;

  @property()
  schedules?: Schedule[];

  scheduleDisplayInfo: Record<string, ScheduleDisplayInfo> = {};

  connectionError = false;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this.loadSchedules();
    return [
      this.hass!.connection.subscribeMessage((ev: SchedulerEventData) => this.updateScheduleItem(ev), {
        type: WebsocketEvent,
      }),
    ];
  }

  private async updateScheduleItem(ev: SchedulerEventData): Promise<void> {
    //only update single schedule
    fetchScheduleItem(this.hass!, ev.schedule_id).then(schedule => {
      const oldSchedule = this.schedules?.find(e => e.schedule_id == ev.schedule_id);
      let schedules = [...(this.schedules || [])];
      this.scheduleDisplayInfo = {
        ...this.scheduleDisplayInfo,
        [schedule.schedule_id!]: getScheduleDisplayInfo(schedule, this.config!, this.hass!),
      };

      if (!schedule || !isIncludedOrExcluded(schedule, this.config!)) {
        //schedule is not in the list, remove if it was in the list
        if (oldSchedule) {
          schedules = schedules.filter(e => e.schedule_id != ev.schedule_id);
        }
      } else if (!oldSchedule) {
        //add a new schedule and sort the list
        schedules = this.sortSchedules([...schedules, schedule]);
      } else if (computeScheduleTimestamp(oldSchedule) == computeScheduleTimestamp(schedule)) {
        //only overwrite the existing schedule
        schedules = schedules.map(e => (e.schedule_id == schedule.schedule_id ? schedule : e));
      } else {
        //overwrite the existing schedule and sort
        schedules = this.sortSchedules(schedules.map(e => (e.schedule_id == schedule.schedule_id ? schedule : e)));
      }
      this.schedules = [...schedules];
    });
  }

  private async loadSchedules(): Promise<void> {
    //load all schedules
    fetchSchedules(this.hass!)
      .then(res => {
        const schedules = res.filter(e => isIncludedOrExcluded(e, this.config!));
        let scheduleInfo: Record<string, ScheduleDisplayInfo> = {};
        Object.keys(schedules).forEach(e => {
          scheduleInfo = {
            ...scheduleInfo,
            [schedules[e].schedule_id]: getScheduleDisplayInfo(schedules[e], this.config!, this.hass!),
          };
        });
        this.scheduleDisplayInfo = scheduleInfo;
        this.schedules = this.sortSchedules(schedules);
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
      return this.schedules!.some(
        e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass!.states[e.entity_id])
      );
    else if (
      oldConfig &&
      this.config &&
      (oldConfig.discover_existing !== this.config.discover_existing || oldConfig.tags !== this.config.tags)
    )
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
                <ha-switch ?checked=${this.computeHeaderToggleState()} @change=${this.toggleDisableAll}> </ha-switch>
              `
            : ''}
        </div>
        <div class="card-content">
          ${this.renderRows()}
        </div>
        ${this.config.show_add_button !== false
          ? html`
              <div class="card-actions">
                <mwc-button @click=${this.newItemClick} ?disabled=${this.connectionError}
                  >${this.hass.localize('ui.components.area-picker.add_dialog.add')}
                </mwc-button>
              </div>
            `
          : ''}
      </ha-card>
    `;
  }

  renderRows() {
    if (!this.config || !this.hass || !this.schedules) return html``;
    if (this.connectionError) {
      return html`
        <div>
          <hui-warning>
            ${localize('ui.panel.overview.backend_error', getLocale(this.hass))}
          </hui-warning>
        </div>
      `;
    } else if (!Object.keys(this.schedules).length) {
      return html`
        <div>
          ${localize('ui.panel.overview.no_entries', getLocale(this.hass))}
        </div>
      `;
    }

    const includedSchedules: Schedule[] = this.schedules.filter(e => isIncluded(e, this.config!));
    const excludedEntities: Schedule[] = this.schedules.filter(e => !isIncluded(e, this.config!));

    return html`
      ${includedSchedules.map(schedule => this.renderScheduleRow(schedule))}
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
                  +
                  ${localize(
                    'ui.panel.overview.excluded_items',
                    getLocale(this.hass),
                    '{number}',
                    excludedEntities.length
                  )}
                </button>
              </div>
            `
          : html`
              ${excludedEntities.map(schedule => this.renderScheduleRow(schedule))}
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

  renderScheduleRow(schedule: Schedule) {
    if (!this.hass) return html``;
    if (
      !schedule ||
      !schedule.next_entries.length ||
      !Object.keys(this.scheduleDisplayInfo).includes(schedule.schedule_id!)
    ) {
      return this.hass.config.state !== STATE_NOT_RUNNING
        ? html`
            <hui-warning>
              Defective schedule entity: ${schedule.entity_id}
            </hui-warning>
          `
        : html`
            <hui-warning>
              ${this.hass.localize('ui.panel.lovelace.warning.starting')}
            </hui-warning>
          `;
    }

    const displayInfo = this.scheduleDisplayInfo[schedule.schedule_id!];
    const state = this.hass!.states[schedule.entity_id]?.state || '';

    return html`
      <div
        class="schedule-row ${['on', 'triggered'].includes(state) ? '' : 'disabled'}"
        @click=${() => this.editItemClick(schedule.schedule_id!)}
      >
        <ha-icon icon="${PrettyPrintIcon(displayInfo.icon)}"></ha-icon>
        <div class="info">
          ${this.renderDisplayItems(schedule, displayInfo.primaryInfo)}
          <div class="secondary">
            ${this.renderDisplayItems(schedule, displayInfo.secondaryInfo)}
          </div>
        </div>
        <ha-switch
          ?checked=${['on', 'triggered'].includes(this.hass.states[schedule.entity_id]?.state || '')}
          ?disabled=${this.hass.states[schedule.entity_id]?.state == 'completed'}
          @click=${(ev: Event) => this.toggleDisabled(ev, schedule.entity_id)}
        >
        </ha-switch>
      </div>
    `;
  }

  renderDisplayItems(schedule: Schedule, displayItem: string[]) {
    const replaceReservedTags = (input: string) => {
      const parts = input.split('<my-relative-time></my-relative-time>');
      if (parts.length > 1)
        return html`
          ${parts[0] ? unsafeHTML(parts[0]) : ''}
          <my-relative-time .hass=${this.hass} .datetime=${new Date(schedule.timestamps[schedule.next_entries[0]])}>
          </my-relative-time>
          ${parts[1] ? unsafeHTML(parts[1]) : ''}
        `;

      const parts2 = input.split(/(<tag>[^<]*<\/tag>)/g);
      if (parts2.length > 1)
        return parts2
          .filter(e => e.length)
          .map(e => {
            const res = e.match(/<tag>([^<]*)<\/tag>/g);
            return res ? unsafeHTML(`<span class="filter-tag">${res[0]}</span>`) : e;
          });
      return unsafeHTML(input);
    };

    return displayItem.filter(isDefined).map(
      e =>
        html`
          ${replaceReservedTags(e)}<br />
        `
    );
  }

  sortSchedules(schedules: Schedule[]) {
    const sortingOptions = AsArray(this.config?.sort_by);
    if (sortingOptions.includes('relative-time')) schedules = sortByRelativeTime(schedules);
    if (sortingOptions.includes('title')) schedules = sortByTitle(schedules, this.scheduleDisplayInfo);
    if (sortingOptions.includes('state')) {
      const expiredSchedulesLast = sortingOptions.includes('relative-time');
      schedules = sortByState(schedules, this.hass!, expiredSchedulesLast);
    }
    return schedules;
  }

  toggleDisabled(ev: Event, entity_id: string) {
    if (!this.hass || !entity_id) return;
    ev.stopPropagation();
    const checked = !(ev.target as HTMLInputElement).checked;
    this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: entity_id });
  }

  toggleDisableAll(ev: Event) {
    if (!this.hass || !this.schedules) return;
    const checked = (ev.target as HTMLInputElement).checked;
    const items = this.schedules.filter(e =>
      this.showDiscovered ? isIncludedOrExcluded(e, this.config!) : isIncluded(e, this.config!)
    );
    items.forEach(el => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  computeHeaderToggleState() {
    if (!this.schedules) return false;
    const items = this.schedules.filter(e =>
      this.showDiscovered ? isIncludedOrExcluded(e, this.config!) : isIncluded(e, this.config!)
    );
    return items.some(el => ['on', 'triggered'].includes(this.hass!.states[el.entity_id]?.state || ''));
  }

  editItemClick(entity_id: string) {
    const myEvent = new CustomEvent('editClick', { detail: entity_id });
    this.dispatchEvent(myEvent);
  }

  newItemClick() {
    const myEvent = new CustomEvent('newClick');
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    ${commonStyle}
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

    div.schedule-row {
      display: flex;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      margin: 20px 0px;
    }
    div.schedule-row .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    div.schedule-row .info,
    div.schedule-row .info > * {
      color: var(--primary-text-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row .secondary {
      display: block;
      color: var(--secondary-text-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row ha-icon {
      flex: 0 0 40px;
      color: var(--state-icon-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row ha-switch {
      padding: 13px 5px;
    }
    div.schedule-row hui-warning {
      flex: 1 0 40px;
    }
    div.schedule-row span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.54);
      color: var(--primary-text-color);
      height: 24px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      padding: 0px 10px;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      margin: 4px 2px 0px 2px;
      transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
    }
    div.schedule-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --state-icon-color: var(--disabled-text-color);
    }
    div.schedule-row span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.3);
    }
  `;
}
