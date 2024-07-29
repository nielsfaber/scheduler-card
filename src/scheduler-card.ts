import { css, html, LitElement, PropertyValues } from "lit";
import { loadHaForm } from './lib/load_ha_form';
import { customElement, property, state } from "lit/decorators";
import { SchedulerDialogParams } from "./dialogs/dialog-scheduler-editor";
import { fetchItems } from "./data/store/fetch_items";
import { SubscribeMixin } from "./components/subscribe-mixin";
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { CardConfig, Schedule, SchedulerEventData } from "./types";
import { parseTimeBar } from "./data/time/parse_time_bar";
import { HomeAssistant } from "./lib/types";
import { CARD_VERSION, DefaultCardConfig, defaultScheduleConfig } from "./const";
import { validateConfig } from "./data/validate_config";
import { localize } from "./localize/localize";
import { isIncludedSchedule } from "./data/schedule/is_included_schedule";
import { sortSchedules } from "./data/schedule/sort_schedules";
import { fetchScheduleItem } from "./data/store/fetch_item";
import { fireEvent } from "./lib/fire_event";

import './scheduler-card-editor';
import "./dialogs/dialog-scheduler-editor";
import "./components/item-row";

@customElement('scheduler-card')
export class SchedulerCard extends SubscribeMixin(LitElement) {

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() _config: CardConfig = DefaultCardConfig;

  @state() public schedules?: Record<string, Schedule & { entity_id: string }>;

  @state() showDiscovered: boolean = false;

  translationsLoaded = false;

  setConfig(userConfig: Partial<CardConfig>) {
    userConfig = validateConfig(userConfig);
    this._config = {
      ...DefaultCardConfig,
      ...userConfig,
    };
  }

  firstUpdated() {
    (async () => await loadHaForm())();
    const el = document.querySelector('home-assistant') as HTMLElement & { _loadFragmentTranslations: any };
    el._loadFragmentTranslations(this.hass.language, 'config');
  }

  protected willUpdate(): void {
    (this.hass as any).loadBackendTranslation("services");
  }

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this.loadSchedules();
    return [
      this.hass!.connection.subscribeMessage((ev: SchedulerEventData) => this.handleScheduleItemUpdated(ev), {
        type: 'scheduler_updated',
      }),
    ];
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    const oldConfig = changedProps.get('_config') as CardConfig | undefined;

    if (oldConfig && this._config) {
      const changedKeys = Object.keys(oldConfig).filter(e => oldConfig[e] !== this._config![e]);
      if (changedKeys.some(e => ['tags', 'discover_existing', 'sort_by', 'display_options'].includes(e)))
        (async () => await this.loadSchedules())();
    }

    if (!this.translationsLoaded
      && this.hass.localize(`component.input_boolean.services.turn_on.name`).length
      && this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').length
    ) {
      this.translationsLoaded = true;
      return true;
    }

    //only reload card if a schedule entity has changed
    if (oldHass && changedProps.size == 1 && this.schedules) {
      return Object.values(this.schedules).some(
        e => JSON.stringify(oldHass.states[e.entity_id!]) !== JSON.stringify(this.hass!.states[e.entity_id!])
      );
    }

    return true;
  }

  render() {
    let items = { ...this.schedules };
    let includedItems = Object.keys(this.schedules || {}).filter(e => isIncludedSchedule((items)[e], this._config));

    const headerToggleState = Object.entries(items)
      .filter(([key]) => this.showDiscovered ? true : includedItems.includes(key))
      .some(([, el]) => ['on', 'triggered'].includes(this.hass!.states[el.entity_id]?.state || ''));

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title
        ? typeof this._config.title == 'string'
          ? this._config.title
          : localize('ui.panel.common.title', this.hass)
        : ''}
          </div>

          ${Object.keys(this.schedules || {}).length && this._config.show_header_toggle
        ? html`
          <ha-switch
            ?checked=${headerToggleState}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
          `
        : ''}
        </div>

        <div class="card-content" id="states">
          ${includedItems.map(scheduleId => html`
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${scheduleId}
                  .schedule=${this.schedules![scheduleId]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `
        )
      }

      ${Object.keys(items).length > includedItems.length
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
                  ${localize('ui.panel.overview.excluded_items', this.hass, '{number}', Object.keys(items).length - includedItems.length)}
                </button>
              </div>
            `
          : html`

          ${Object.keys(items).filter(e => !includedItems.includes(e)).map(scheduleId => html`
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${scheduleId}
                  .schedule=${this.schedules![scheduleId]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `
          )
            }

              <div>
                <button
                  class="show-more"
                  @click=${() => {
              this.showDiscovered = false;
            }}
                >
                  ${localize('ui.panel.overview.hide_excluded', this.hass)}
                </button>
              </div>
            `
        : ''}
        </div>

        <div class="card-actions">
          <mwc-button @click=${this._addClick}
            >${this.hass.localize('ui.common.add')}
          </mwc-button>

          <span class="beta">
            ${CARD_VERSION}
          </span>
        </div>
      </ha-card>
    `;
  }

  private async loadSchedules(): Promise<void> {
    fetchItems(this.hass!)
      .then(res => {
        this.schedules = sortSchedules(res, this._config, this.hass);
        Object.values(res).every(e => isIncludedSchedule(e, this._config));

      })
      .catch(_e => {
        this.schedules = {};
      })
  }


  private async handleScheduleItemUpdated(ev: SchedulerEventData): Promise<void> {
    //only update single schedule
    if (ev.event == 'scheduler_item_removed') {
      this.schedules = Object.fromEntries(Object.entries(this.schedules || {}).filter(([k,]) => k !== ev.schedule_id));
      return;
    }
    fetchScheduleItem(this.hass!, ev.schedule_id).then(schedule => {
      const oldSchedule = this.schedules![ev.schedule_id];
      let schedules = { ...this.schedules };

      if (!schedule || (!this._config.discover_existing && !isIncludedSchedule(schedule, this._config!))) {
        //schedule is not in the list, remove if it was in the list
        if (oldSchedule) {
          schedules = Object.fromEntries(Object.entries(schedules).filter(([k,]) => k != ev.schedule_id));
        }
      } else if (!oldSchedule) {
        //add a new schedule and sort the list
        schedules = sortSchedules({ ...schedules, [ev.schedule_id]: schedule }, this._config, this.hass);
      } else if (oldSchedule.timestamps[oldSchedule.next_entries[0] || 0] == schedule.timestamps[schedule.next_entries[0] || 0]) {
        //only overwrite the existing schedule
        schedules = { ...schedules, [ev.schedule_id]: schedule };
      } else {
        //overwrite the existing schedule and sort
        schedules = sortSchedules({ ...schedules, [ev.schedule_id]: schedule }, this._config, this.hass);
      }
      this.schedules = { ...schedules };
    });
  }

  private _handleEditClick(ev: CustomEvent) {
    if (!this.schedules) return;
    const scheduleId = ev.detail.schedule_id;

    const params: SchedulerDialogParams = {
      schedule: parseTimeBar(this.schedules[scheduleId], this.hass),
      cardConfig: this._config,
      editItem: scheduleId
    };

    fireEvent(ev.target as HTMLElement, 'show-dialog', {
      dialogTag: 'dialog-scheduler-editor',
      dialogImport: () => import('./dialogs/dialog-scheduler-editor'),
      dialogParams: params,
    });
  }

  private _addClick(_ev: Event) {
    const defaultTags = [this._config.tags || []].flat().filter(e => !['none', 'disabled', 'enabled'].includes(e));
    const params: SchedulerDialogParams = {
      schedule: { ...defaultScheduleConfig, tags: defaultTags.length == 1 ? defaultTags : [] },
      cardConfig: this._config
    };

    fireEvent(this, 'show-dialog', {
      dialogTag: 'dialog-scheduler-editor',
      dialogImport: () => import('./dialogs/dialog-scheduler-editor'),
      dialogParams: params,
    });
  }

  toggleDisableAll(ev: Event) {
    if (!this.hass || !this.schedules) return;
    const checked = (ev.target as HTMLInputElement).checked;

    const items = Object.values(this.schedules).filter(el => this.showDiscovered || isIncludedSchedule(el, this._config));
    items.forEach(el => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  // card configuration
  public static getConfigElement() {
    return document.createElement('scheduler-card-editor');
  }

  static styles = css`
    .card-header {
      display: flex;
      justify-content: space-between;
    }
    .card-header .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
    }
    .card-header ha-switch {
      display: flex;
      align-self: center;
      margin: 0px 6px;
      line-height: 24px;
    }

    #states > * {
      margin: 8px 0;
    }
    #states > *:first-child {
      margin-top: 0;
    }
    #states > *:last-child {
      margin-bottom: 0;
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
    .card-actions, .card-actions > * { 
      display: flex;
    }
    .beta {
      flex: 1 0 auto;
      align-self: center;
      justify-content: flex-end;
      font-style: italic;
      color: var(--error-color);
    }
  `;
}

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