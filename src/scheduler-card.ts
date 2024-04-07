import { LitElement, html, PropertyValues, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { computeCardSize, fireEvent, HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { CardConfig, ScheduleConfig, Action, Schedule, SchedulerEventData } from './types';
import { CARD_VERSION, DefaultCardConfig, WebsocketEvent } from './const';
import {
  AsArray,
  calculateTimeline,
  capitalize,
  flatten,
  getLocale,
  isDefined,
  PrettyPrintIcon,
  sortAlphabetically,
  unique,
} from './helpers';
import { ValidateConfig } from './config-validation';
import { parseEntity } from './data/entities/parse_entity';
import { deleteSchedule, fetchScheduleItem, fetchSchedules, handleError } from './data/websockets';
import { computeActions } from './data/actions/compute_actions';
import { compareActions } from './data/actions/compare_actions';
import { importAction } from './data/actions/import_action';
import { entityFilter } from './data/entities/entity_filter';
import {
  computeScheduleHeader,
  computeScheduleInfo,
  computeScheduleIcon,
} from './data/item_display/compute_schedule_display';
import { STATE_NOT_RUNNING, UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from './components/subscribe-mixin';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { localize } from './localize/localize';
import { commonStyle } from './styles';
import { DialogParams } from './components/generic-dialog';
import { isEmbeddedInPopup, showDialog } from './data/custom_dialog';

import './editor/scheduler-editor';
import './scheduler-card-editor';
import './components/my-relative-time';
import './components/generic-dialog';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'scheduler-card',
  name: 'Scheduler Card',
  description: 'Card to manage schedule entities made with scheduler-component.',
});

console.info(
  `%c  SCHEDULER-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

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
    if (!displayInfo[a.schedule_id!]) return displayInfo[b.schedule_id!] ? 1 : -1;
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

  let included = true;

  //filter items by tags
  const filters = AsArray(config.tags);
  if (filters.length) {
    included = false;
    if ((schedule.tags || []).some(e => filters.includes(e))) included = true;
    else if (filters.includes('none') && !schedule.tags?.length) included = true;
    else if (filters.includes('enabled') && schedule.enabled) included = true;
    else if (filters.includes('disabled') && !schedule.enabled) included = true;
  }

  //filter items by exclude_tags
  const excludeFilters = AsArray(config.exclude_tags);
  if (excludeFilters.length && included) {
    if ((schedule.tags || []).some(e => excludeFilters.includes(e))) included = false;
    else if (excludeFilters.includes('none') && !schedule.tags?.length) included = false;
    else if (excludeFilters.includes('enabled') && schedule.enabled) included = false;
    else if (excludeFilters.includes('disabled') && !schedule.enabled) included = false;
  }
  return included;
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

@customElement('scheduler-card')
export class SchedulerCard extends SubscribeMixin(LitElement) {
  @property()
  _config?: CardConfig;

  @property()
  showDiscovered = false;

  @property()
  schedules?: Schedule[];

  @property()
  translationsLoaded = false;

  scheduleDisplayInfo: Record<string, ScheduleDisplayInfo> = {};

  connectionError = false;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement('scheduler-card-editor');
  }

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this.loadSchedules();
    return [
      this.hass!.connection.subscribeMessage((ev: SchedulerEventData) => this.updateScheduleItem(ev), {
        type: WebsocketEvent,
      }),
    ];
  }

  firstUpdated() {
    const hass = this.hass!;
    if (hass.localize('ui.panel.config.automation.editor.actions.type.device_id.action'))
      this.translationsLoaded = true;
    else {
      const el = document.querySelector('home-assistant') as HTMLElement & { _loadFragmentTranslations: any };
      el._loadFragmentTranslations(hass.language, 'config').then(() => {
        this.hass!.localize;
      });
    }
  }

  provideHass(el: any) {
    el.hass = this.hass;
  }

  private async updateScheduleItem(ev: SchedulerEventData): Promise<void> {
    //only update single schedule
    if (ev.event == 'scheduler_item_removed') {
      this.schedules = this.schedules?.filter(e => e.schedule_id != ev.schedule_id);
      return;
    }
    fetchScheduleItem(this.hass!, ev.schedule_id).then(schedule => {
      const oldSchedule = this.schedules?.find(e => e.schedule_id == ev.schedule_id);
      let schedules = [...(this.schedules || [])];
      try {
        this.scheduleDisplayInfo = {
          ...this.scheduleDisplayInfo,
          [schedule.schedule_id!]: getScheduleDisplayInfo(schedule, this._config!, this.hass!),
        };
      } catch (_e) { }

      if (!schedule || !isIncludedOrExcluded(schedule, this._config!)) {
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
        const schedules = res.filter(e => isIncludedOrExcluded(e, this._config!));
        let scheduleInfo: Record<string, ScheduleDisplayInfo> = {};
        Object.keys(schedules).forEach(e => {
          try {
            scheduleInfo = {
              ...scheduleInfo,
              [schedules[e].schedule_id]: getScheduleDisplayInfo(schedules[e], this._config!, this.hass!),
            };
          } catch (_e) { }
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
    const oldConfig = changedProps.get('_config') as CardConfig | undefined;
    if (oldHass && changedProps.size == 1 && !this.translationsLoaded) {
      if (!oldHass.localize('ui.panel.config.automation.editor.actions.type.device_id.action')) {
        this.translationsLoaded = true;
      }
    }
    if (oldConfig && this._config) {
      const changedKeys = Object.keys(oldConfig).filter(e => oldConfig[e] !== this._config![e]);
      if (changedKeys.some(e => ['tags', 'discover_existing', 'sort_by', 'display_options'].includes(e)))
        (async () => await this.loadSchedules())();
    }
    if (oldHass && changedProps.size == 1 && this.schedules)
      return this.schedules!.some(
        e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass!.states[e.entity_id])
      );
    return true;
  }

  setConfig(userConfig: Partial<CardConfig>) {
    ValidateConfig(userConfig);
    const config: CardConfig = {
      ...DefaultCardConfig,
      ...userConfig,
    };
    this._config = config;
  }

  public async getCardSize() {
    return new Promise(res => {
      let retries = 0;
      const wait = setInterval(() => {
        retries++;
        if (!this._config || (!this.schedules && !this.connectionError && retries < 50)) return;
        let cardSize = this._config!.title || this._config!.show_header_toggle ? 3 : 1;
        if (this._config.show_add_button) cardSize += 1;
        const rowSize = ((AsArray(this._config.display_options.secondary_info || []).length || 2) + 1) / 2;
        if (this.schedules)
          cardSize += this.showDiscovered
            ? this.schedules.length * rowSize
            : this.schedules.filter(e => isIncluded(e, this._config!)).length * rowSize;
        clearInterval(wait);
        res(Math.round(cardSize));
      }, 50);
    });
  }

  render() {
    if (!this.hass || !this._config || !this.schedules) return html``;
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title
        ? typeof this._config.title == 'string'
          ? this._config.title
          : localize('ui.panel.common.title', getLocale(this.hass))
        : ''}
          </div>
          ${this.schedules.length && this._config.show_header_toggle
        ? html`
                <ha-switch ?checked=${this.computeHeaderToggleState()} @change=${this.toggleDisableAll}> </ha-switch>
              `
        : ''}
        </div>
        <div class="card-content">
          ${this.renderRows()}
        </div>
        ${this._config.show_add_button !== false
        ? html`
              <div class="card-actions">
                ${!this.connectionError
            ? html`
                      <mwc-button @click=${this._addItemClick}
                        >${this.hass.localize('ui.common.add')}
                      </mwc-button>
                    `
            : html`
                      <mwc-button @click=${this._retryConnection}
                        >${this.hass.localize('ui.common.refresh')}
                      </mwc-button>
                    `}
              </div>
            `
        : ''}
      </ha-card>
    `;
  }

  renderRows() {
    if (!this._config || !this.hass || !this.schedules) return html``;
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

    const includedSchedules: Schedule[] = this.schedules.filter(e => isIncluded(e, this._config!));
    const excludedEntities: Schedule[] = this.schedules.filter(e => !isIncluded(e, this._config!));

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
      <div class="schedule-row ${['on', 'triggered'].includes(state) ? '' : 'disabled'}">
        <ha-icon
          icon="${PrettyPrintIcon(displayInfo.icon)}"
          @click=${(ev: Event) =>
        fireEvent(ev.target as HTMLElement, 'hass-more-info', {
          entityId: schedule.entity_id,
        })}
        ></ha-icon>
        <div class="info" @click=${() => this._editItemClick(schedule.schedule_id!)}>
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
    const sortingOptions = AsArray(this._config?.sort_by);
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
      this.showDiscovered ? isIncludedOrExcluded(e, this._config!) : isIncluded(e, this._config!)
    );
    items.forEach(el => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  computeHeaderToggleState() {
    if (!this.schedules) return false;
    const items = this.schedules.filter(e =>
      this.showDiscovered ? isIncludedOrExcluded(e, this._config!) : isIncluded(e, this._config!)
    );
    return items.some(el => ['on', 'triggered'].includes(this.hass!.states[el.entity_id]?.state || ''));
  }

  private _addItemClick() {
    showDialog(this, {
      dialogTag: 'scheduler-editor-dialog',
      dialogImport: () => import('./editor/scheduler-editor'),
      dialogParams: {
        config: this._config,
        editItem: null,
        entities: [],
        actions: [],
        schedule: undefined,
      },
    });
  }

  async _editItemClick(editItem: string) {
    if (!this.hass || !this._config) return;

    const data = await fetchScheduleItem(this.hass, editItem);
    if (!data) return;
    const entityIds = unique(flatten(data.timeslots.map(e => e.actions.map(e => e.entity_id || e.service))));
    const entities = entityIds.map(e => parseEntity(e, this.hass!, this._config!));
    let actions = computeActions(entityIds, this.hass, this._config);
    const usedActions = unique(flatten(data.timeslots.map(e => e.actions)));
    const extraActions = usedActions.filter(e => !actions.some(a => compareActions(a, e, true)));
    if (extraActions.length) {
      //actions that are not in the card
      unique(extraActions).forEach(e => actions.push(importAction(e, this.hass!)));
    }

    let schedule: ScheduleConfig = {
      weekdays: data.weekdays,
      timeslots: data.timeslots,
      repeat_type: data.repeat_type,
      name: data.name,
      tags: data.tags || [],
      start_date: data.start_date,
      end_date: data.end_date,
    };

    if (!entities.length || !schedule.timeslots.length) {
      const result = await new Promise(resolve => {
        const params: DialogParams = {
          title: 'Defective entity',
          description:
            'This schedule is defective and cannot be edited with the card. Consider to delete the item and recreate it. If the problem persists, please report the issue on GitHub.',
          primaryButtonLabel: this.hass!.localize('ui.common.delete'),
          primaryButtonCritical: true,
          secondaryButtonLabel: this.hass!.localize('ui.dialogs.generic.cancel'),
          cancel: () => {
            resolve(false);
          },
          confirm: () => {
            resolve(true);
          },
        };
        showDialog(this, {
          dialogTag: 'generic-dialog',
          dialogImport: () => import('./components/generic-dialog'),
          dialogParams: params,
        });
      });
      if (result) {
        deleteSchedule(this.hass, data.schedule_id!).catch(e => handleError(e, this, this.hass!));
      }
      return;
    }

    if (schedule.timeslots.every(e => e.stop)) {
      schedule = { ...schedule!, timeslots: calculateTimeline(schedule!.timeslots, this.hass!) };
      if (!actions.length)
        return handleError(
          { error: '', body: { message: `Could not compute actions for the schedule #${editItem}.` } },
          this,
          this.hass
        );
    } else {
      actions = actions
        .filter(e => usedActions.find(a => compareActions(e, a, true)))
        .reduce((_acc: Action[], e) => [e], []);
      if (!actions.length)
        return handleError(
          { error: '', body: { message: `Could not compute actions for schedule #${editItem}.` } },
          this,
          this.hass
        );
    }

    showDialog(this, {
      dialogTag: 'scheduler-editor-dialog',
      dialogImport: () => import('./editor/scheduler-editor'),
      dialogParams: {
        config: this._config,
        editItem: data.schedule_id!,
        actions: actions,
        entities: entities,
        schedule: schedule,
        cardEmbeddedInPopup: isEmbeddedInPopup(this),
      },
    });
  }

  _retryConnection() {
    setTimeout(async () => {
      await this.loadSchedules();
    }, 100);
    this.connectionError = false;
    this.requestUpdate();
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
