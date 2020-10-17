import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { CardConfig, ActionElement } from '../types';
import { entityFilter, entityConfig } from '../entity';
import { entityGroups } from '../group';
import { actionConfig } from '../action';
import { CreateTimeScheme } from '../const';
import { PrettyPrintIcon, PrettyPrintName } from '../helpers';

import './button-group';
import { commonStyle } from '../styles';

@customElement('scheduler-editor-card')
export class SchedulerEditorCard extends LitElement {

  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() selectedGroup?: string;
  @property() selectedEntity?: string;
  @property() selectedAction?: string;

  getGroups() {
    if (!this.hass || !this.config) return [];
    let entities = Object.keys(this.hass.states).filter(e => entityFilter(e, this.config!, { actions: true }));
    return entityGroups(entities, this.config!);
  }

  getEntitiesForGroup() {
    if (!this.selectedGroup || !this.hass) return [];
    return this.getGroups()
      .find(e => e.id == this.selectedGroup)!.entities
      .map(e => entityConfig(e, this.config!, this.hass!));
  }

  getActionsForEntity() {
    if (!this.selectedEntity) return [];
    return this.getEntitiesForGroup()
      .find(e => e.id == this.selectedEntity)!
      .actions.map(e => actionConfig(e, this.hass!.states[this.selectedEntity!]))
      .filter(e => e) as ActionElement[];
  }

  render() {
    if (!this.hass || !this.config) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined ? (typeof this.config.title == "string" ? this.config.title : '') : localize('scheduler')}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
          </ha-icon-button>
        </div>
        <div class="card-content">

          <div class="header">${localize('fields.group')}</div>
          <button-group .items=${this.getGroups()} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${localize('instructions.no_groups_defined')}
          </button-group>

          <div class="header">${localize('fields.entity')}</div>
          <button-group .items=${this.getEntitiesForGroup()} value=${this.selectedEntity} @change=${this.selectEntity}>
            ${!this.selectedGroup ? localize('instructions.no_group_selected') : localize('instructions.no_entities_for_group')}
          </button-group>

          <div class="header">${localize('fields.action')}</div>
          <button-group .items=${this.getActionsForEntity()} value=${this.selectedAction} @change=${this.selectAction}>
            ${!this.selectedEntity ? localize('instructions.no_entity_selected') : localize('instructions.no_actions_for_entity')}
          </button-group>
          ${this.makeSchemeButton()}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction}>${localize('actions.next')}</mwc-button>
        </div>
      </ha-card>
      `;
  }

  makeSchemeButton() {
    if (!this.getActionsForEntity().length) return html``;
    return html`
      <div class="header">or</div>
      <div class="option-list">
        <mwc-button
          class="${this.selectedAction == CreateTimeScheme ? ' active' : ''}"
          @click=${() => { this.selectedAction = CreateTimeScheme }}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${PrettyPrintName(CreateTimeScheme)}
        </mwc-button>
      </div>
    </div>
    `;
  }

  selectGroup(ev: Event) {
    let value = (ev.target as HTMLInputElement).value;
    this.selectedGroup = value;
    this.selectedEntity = undefined;
    this.selectedAction = undefined;
  }

  selectEntity(ev: Event) {
    let value = (ev.target as HTMLInputElement).value;
    this.selectedEntity = value;
    this.selectedAction = undefined;
  }

  selectAction(ev: Event) {
    let value = (ev.target as HTMLInputElement).value;
    this.selectedAction = value;
  }

  cancelClick() {
    let myEvent = new CustomEvent("cancelClick");
    this.dispatchEvent(myEvent);
  }

  nextClick() {
    let myEvent = new CustomEvent("nextClick", {
      detail: {
        entity: this.selectedEntity,
        action: this.selectedAction
      }
    });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}