import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { CardConfig, EntityElement, GroupElement, ActionElement } from '../types';
import { entityFilter, entityConfig } from '../entity';
import { entityGroups } from '../group';
import { actionConfig } from '../action';
import { CreateTimeScheme, DefaultActionIcon } from '../const';
import { PrettyPrintIcon, PrettyPrintName } from '../helpers';

import './button-group';
import { commonStyle } from '../styles';
import { formatAction } from '../formatAction';

@customElement('scheduler-editor-card')
export class SchedulerEditorCard extends LitElement {

  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() selectedGroup?: string;
  @property() selectedEntity?: string;
  @property() selectedAction?: string;

  getGroups() {
    if (!this.hass || !this.config) return [];

    const entities = Object.keys(this.hass.states)
      .filter(e => entityFilter(e, this.hass!, this.config!, { actions: true }));

    let groups = entityGroups(entities, this.config!);
    groups.sort((a, b) => a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1);

    return groups;
  }

  getEntitiesForGroup(groupConfig: GroupElement[]) {
    if (!this.selectedGroup || !this.hass) return [];

    let entities = groupConfig
      .find(e => e.id == this.selectedGroup)!.entities
      .map(e => entityConfig(e, this.hass!, this.config!))
      .filter(e => e) as EntityElement[];

    entities.sort((a, b) => a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1);
    return entities;
  }

  getActionsForEntity(entityConfig: EntityElement[]) {
    if (!this.selectedEntity) return [];

    const entity = entityConfig
      .find(e => e.id == this.selectedEntity)!;

    let actions = entity
      .actions.map(actionConfig)
      .map(e => e.name ? e : Object.assign(e, { name: formatAction(e, this.hass!) }))
      .map(e => e.icon ? e : Object.assign(e, { icon: DefaultActionIcon }));

    if (entity.exclude_actions) actions = actions.filter(e => !entity.exclude_actions?.includes(e.name!.trim().toLowerCase()));

    actions.sort((a, b) => a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1);
    return actions;
  }


  render() {
    if (!this.hass || !this.config) return html``;

    const groups = this.getGroups();
    if (groups.length == 1 && this.selectedGroup !== groups[0].id) this.selectGroup(groups[0].id);

    const entities = this.getEntitiesForGroup(groups);
    if (entities.length == 1 && this.selectedEntity !== entities[0].id) this.selectEntity(entities[0].id);

    const actions = this.getActionsForEntity(entities);
    //if (actions.length == 1 && this.selectedAction !== actions[0].id) this.selectAction(actions[0].id);

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
          <button-group .items=${groups} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${localize('instructions.no_groups_defined')}
          </button-group>

          <div class="header">${localize('fields.entity')}</div>
          <button-group .items=${entities} value=${this.selectedEntity} @change=${this.selectEntity}>
            ${!this.selectedGroup ? localize('instructions.no_group_selected') : localize('instructions.no_entities_for_group')}
          </button-group>

          <div class="header">${localize('fields.action')}</div>
          <button-group .items=${actions} value=${this.selectedAction} @change=${this.selectAction}>
            ${!this.selectedEntity ? localize('instructions.no_entity_selected') : localize('instructions.no_actions_for_entity')}
          </button-group>
          ${this.makeSchemeButton(actions)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction}>${localize('actions.next')}</mwc-button>
        </div>
      </ha-card>
      `;
  }

  makeSchemeButton(actionConfig: ActionElement[]) {
    if (!actionConfig.length) return html``;
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

  selectGroup(ev: Event | string) {
    let value = typeof ev == "string" ? ev : (ev.target as HTMLInputElement).value;
    this.selectedGroup = value;
    this.selectedEntity = undefined;
    this.selectedAction = undefined;
  }

  selectEntity(ev: Event | string) {
    let value = typeof ev == "string" ? ev : (ev.target as HTMLInputElement).value;
    this.selectedEntity = value;
    this.selectedAction = undefined;
  }

  selectAction(ev: Event | string) {
    let value = typeof ev == "string" ? ev : (ev.target as HTMLInputElement).value;
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