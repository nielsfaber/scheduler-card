import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import { CardConfig, Schedule } from '../types';
import { commonStyle } from '../styles';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from './subscribe-mixin';

import './scheduler-entity-row';
import { entityFilter } from '../data/filter_entity';
import { capitalize } from '../helpers';
import { fetchSchedules } from '../data/websockets';

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends SubscribeMixin(LitElement) {

  @property() config?: CardConfig;
  @property() showDiscovered = false;
  @property() schedules?: Schedule[];

  @property() private _hass!: HomeAssistant;
  set hass(hass: HomeAssistant) { this._hass = hass; }
  get hass() { return this._hass; }

  connectionError = false;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this.loadSchedules();
    return this.hass.user.is_admin ? [
      this._hass!.connection.subscribeEvents(
        () => this.loadSchedules(),
        "scheduler_updated"
      )
    ] : [];
  }

  private async loadSchedules(): Promise<void> {
    fetchSchedules(this._hass)
      .then(res => {
        let schedules = res;

        if (this.config!.discover_existing !== undefined && !this.config!.discover_existing) {
          schedules = schedules.filter(item =>
            item.timeslots.every(slot =>
              slot.actions.every(action =>
                entityFilter(action.entity_id, this.config!)
              )
            )
          );
        }

        schedules.sort((a, b) => {
          const remainingA = new Date(a.timestamps[a.next_entries[0]]).valueOf();
          const remainingB = new Date(b.timestamps[b.next_entries[0]]).valueOf();

          if (remainingA !== null && remainingB !== null) {
            if (remainingA > remainingB) return 1;
            else if (remainingA < remainingB) return -1;
            else return a.entity_id < b.entity_id ? 1 : -1;
          } else if (remainingB !== null) return 1;
          else if (remainingA !== null) return -1;
          else return a.entity_id < b.entity_id ? 1 : -1;
        });

        this.schedules = schedules;
      })
      .catch(_e => {
        this.schedules = [];
        this.connectionError = true;
      });
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1 && this.schedules)
      return this.schedules!.some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this._hass.states[e.entity_id]));
    else return true;
  }

  render() {
    if (!this._hass || !this.config || !this.schedules) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
        ? typeof this.config.title == 'string'
          ? this.config.title
          : ''
        : localize('ui.panel.common.title', this._hass.language)}
          </div>
          ${this.schedules.length && this.config.show_header_toggle
        ? html`
                <ha-switch
                  ?checked=${this.schedules.some(el => ["on", "triggered"].includes(this.hass.states[el.entity_id]?.state || ''))}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `
        : ''}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this._hass.user.is_admin
        ? html`
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
            ?disabled=${this.connectionError}
          >${this._hass.localize('ui.components.area-picker.add_dialog.add')}
          </mwc-button>
        </div>` : ''}
      </ha-card>
    `;
  }
  getRows() {
    if (!this.config || !this._hass || !this.schedules) return html``;
    if (this.connectionError) {
      return html`
        <div>
          <hui-warning>
           ${localize('ui.panel.overview.backend_error', this._hass.language)}
          </hui-warning>
        </div>
      `;
    }
    else if (!Object.keys(this.schedules).length) {
      return html`
        <div>
          ${localize('ui.panel.overview.no_entries', this._hass.language)}
        </div>
      `;
    }
    let includedSchedules: Schedule[] = [];
    let excludedEntities: Schedule[] = [];

    this.schedules
      .forEach(schedule => {
        const included = schedule.timeslots
          .every(timeslot => timeslot.actions
            .every(action => entityFilter(action.entity_id!, this.config!)))
        if (included) includedSchedules.push(schedule)
        else excludedEntities.push(schedule)
      });

    return html`
      ${includedSchedules.map(schedule => {
      const state = this.hass.states[schedule.entity_id]?.state || '';
      return html`
          <scheduler-entity-row
            class="${["on", "triggered"].includes(state) ? '' : 'disabled'} ${this._hass.user.is_admin ? '' : 'readonly'}"
            .hass=${this._hass}
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
                  +
                  ${localize(
              'ui.panel.overview.excluded_items',
              this._hass.language,
              '{number}',
              excludedEntities.length
            )}
                </button>
              </div>
            `
          : html`
              ${excludedEntities.map(schedule => {
            const state = this.hass.states[schedule.entity_id]?.state || '';
            return html`
                  <scheduler-entity-row
                    class="${["on", "triggered"].includes(state) ? '' : 'disabled'} ${this._hass.user.is_admin ? '' : 'readonly'}"
                    .hass=${this._hass}
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
                  ${capitalize(localize('ui.panel.overview.hide_excluded', this._hass.language))}
                </button>
              </div>
            `
        : ''}
    `;
  }

  toggleDisableAll(ev: Event) {
    if (!this._hass || !this.schedules) return;
    const checked = (ev.target as HTMLInputElement).checked;
    this.schedules.forEach(el => {
      this._hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
    });
  }

  editItemClick(entity_id: string) {
    if (!this._hass.user.is_admin) return;
    const myEvent = new CustomEvent('editClick', { detail: entity_id });
    this.dispatchEvent(myEvent);
  }

  newItemClick() {
    const myEvent = new CustomEvent('newClick');
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    ${commonStyle}
    scheduler-entity-row {
      cursor: pointer;
      margin: 20px 0px;
    }
    scheduler-entity-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --paper-item-icon-color: var(--disabled-text-color);
    }
    scheduler-entity-row.readonly {
      cursor: default;
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
