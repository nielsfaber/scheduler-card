import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { IsSchedulerEntity } from '../entity';
import { localize } from '../localize/localize';

import './scheduler-entity-row';

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends LitElement {

  @property() hass?: HomeAssistant;

  render() {
    if (!this.hass) return html``;
    let scheduleEntities = Object.entries(this.hass.states).filter(([e]) => IsSchedulerEntity(e)).map(([, v]) => v);


    // if (this._config.overview_options.sort) {
    //   items.sort((a, b) => {
    //     const remainingA = getRemaining(a.next_trigger);
    //     const remainingB = getRemaining(b.next_trigger);

    //     if (remainingA !== null && remainingB !== null) {
    //       if (remainingA > remainingB) return 1;
    //       else if (remainingA < remainingB) return -1;
    //       else return a.id < b.id ? 1 : -1;
    //     } else if (remainingB !== null) return 1;
    //     else if (remainingA !== null) return -1;
    //     else return a.id < b.id ? 1 : -1;
    //   });
    // }

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${localize('scheduler')}
          </div>
          <ha-switch
            ?checked=${scheduleEntities.some(el => el.state == "on")}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
        </div>
        <div class="card-content">
        ${!scheduleEntities.length ? localize('instructions.no_entries_defined') : ''}
        ${scheduleEntities.map(e => {
      return html`
            <scheduler-entity-row
              .hass=${this.hass}
              ._config=${{ entity: e.entity_id }}
              @click=${() => this.editItemClick(e.entity_id)}
            >
            </scheduler-entity-row>
          `;
    })}
        </div>
        ${this.hass.user.is_admin ?
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

  toggleDisableAll(ev: Event) {
    if (!this.hass) return;
    let checked = (ev.target as HTMLInputElement).checked;
    let scheduleEntities = Object.entries(this.hass.states).filter(([e]) => IsSchedulerEntity(e)).map(([, v]) => v);
    scheduleEntities.forEach(schedule => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: schedule.entity_id });
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
    .card-header {
      display: flex;
      justify-content: space-between;
    }
    .card-header .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-header ha-switch {
      padding: 5px;
    }
    .card-content {
      flex: 1;
    }
    .card-content > * {
      margin: 20px 0;
    }
    .card-content > *:first-child {
      margin-top: 0;
    }
    .card-content > *:last-child {
      margin-bottom: 0;
    }
    scheduler-entity-row {
      cursor: pointer;
    }
  `;
}