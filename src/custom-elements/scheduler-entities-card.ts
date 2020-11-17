import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import { CardConfig, ScheduleEntity } from '../types';
import { commonStyle } from '../styles';
import { HassEntity } from 'home-assistant-js-websocket';

import './scheduler-entity-row';
import { importAction } from '../data/import_action';
import { IsSchedulerEntity, entityFilter } from '../data/filter_entity';
import { capitalize } from '../helpers';

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends LitElement {
  @property() _hass?: HomeAssistant;
  @property() config?: CardConfig;

  @property() showDiscovered = false;

  schedules: HassEntity[] = [];
  scheduleEntities: string[] = [];

  loadSchedules() {
    if (!this._hass || !this.config) return;

    let schedules = Object.entries(this._hass.states)
      .filter(([k]) => IsSchedulerEntity(k))
      .map(([, v]) => v);

    if (this.config.discover_existing !== undefined && !this.config.discover_existing) {
      schedules = schedules.filter(el =>
        (el.attributes.actions.map(importAction).map(e => e.entity) as string[]).every(
          e => this._hass!.states[e] && entityFilter(e, this.config!)
        )
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
            ${this.config.title !== undefined
        ? typeof this.config.title == 'string'
          ? this.config.title
          : ''
        : localize('ui.panel.common.title', this._hass.language)}
          </div>
          ${this.schedules.length && this.config.show_header_toggle
        ? html`
                <ha-switch
                  ?checked=${this.schedules.some(el => el.state == 'waiting' || el.state == 'triggered')}
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
          >${this._hass.localize('ui.components.area-picker.add_dialog.add')}
          </mwc-button>
        </div>
      </ha-card>
      `
        : ''}
      </ha-card>
    `;
  }
  getRows() {
    if (!this.config || !this._hass || !this.schedules) return html``;
    if (!this.schedules.length) {
      return html`
        <div>
          ${localize('ui.panel.overview.no_entries', this._hass.language)}
        </div>
      `;
    }
    const includedSchedules: ScheduleEntity[] = [];
    const excludedEntities: ScheduleEntity[] = [];

    this.schedules
      .map(e => e.entity_id)
      .forEach(entity_id => {
        const entity = this._hass!.states[entity_id] as ScheduleEntity;
        const discovered = !entity.attributes
          .actions!.map(importAction)
          .every(e => entityFilter(e.entity, this.config!));
        if (discovered) excludedEntities.push(entity);
        else includedSchedules.push(entity);
      });

    return html`
      ${includedSchedules.map(entity => {
      return html`
          <scheduler-entity-row
            class="${entity.state == 'waiting' || entity.state == 'triggered' ? '' : 'disabled'}"
            .hass=${this._hass}
            .schedule_entity=${entity.entity_id}
            .config=${this.config}
            @click=${() => this.editItemClick(entity.entity_id)}
          >
          </scheduler-entity-row>
        `;
    })}
      ${excludedEntities.length
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
              ${excludedEntities.map(entity => {
            return html`
                  <scheduler-entity-row
                    class="${entity.state == 'waiting' || entity.state == 'triggered' ? '' : 'disabled'}"
                    .hass=${this._hass}
                    .schedule_entity=${entity.entity_id}
                    .config=${this.config}
                    @click=${() => this.editItemClick(entity.entity_id)}
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
