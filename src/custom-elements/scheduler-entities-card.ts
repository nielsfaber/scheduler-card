import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

import { CardConfig, Dictionary, EntityElement } from '../types';
import { commonStyle } from '../styles';
import { HassEntity } from 'home-assistant-js-websocket';

import './scheduler-entity-row';
import { applyFilters } from '../filter';

@customElement('scheduler-entities-card')
export class SchedulerEntitiesCard extends LitElement {

  @property() hass?: HomeAssistant;
  @property() entities?: HassEntity[];
  @property() config?: CardConfig;
  @property() usedEntities?: Dictionary<EntityElement>;

  render() {
    if (!this.hass || !this.config || !this.entities) return html``;

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
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          <ha-switch
            ?checked=${this.entities.some(el => el.state == "on")}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
        </div>
        <div class="card-content">
          ${this.getRows()}
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

  getRows() {
    if (!this.config || !this.usedEntities) return html``;
    if (!this.entities || !this.entities.length) return html`${localize('instructions.no_entries_defined')}`;
    return this.entities.map(e => {
      let discovered = !(e.attributes.actions!.map(e => e.entity) as string[]).every(e => applyFilters(e, this.config!));
      if (discovered) {
        return html`
          <hui-warning>
            <scheduler-entity-row
              class="${e.state == 'waiting' || e.state == 'triggered' ? '' : 'disabled'}"
              .hass=${this.hass}
              ._config=${{ entity: e.entity_id, config: this.usedEntities }}
              @click=${() => this.editItemClick(e.entity_id)}
            >
            </scheduler-entity-row>
          </hui-warning>
          `;
      }
      else {
        return html`
            <scheduler-entity-row
              class="${e.state == 'waiting' || e.state == 'triggered' ? '' : 'disabled'}"
              .hass=${this.hass}
              ._config=${{ entity: e.entity_id, config: this.usedEntities }}
              @click=${() => this.editItemClick(e.entity_id)}
            >
            </scheduler-entity-row>
          `;
      }
    });
  }

  toggleDisableAll(ev: Event) {
    if (!this.hass || !this.entities) return;
    let checked = (ev.target as HTMLInputElement).checked;
    this.entities.forEach(el => {
      this.hass!.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
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