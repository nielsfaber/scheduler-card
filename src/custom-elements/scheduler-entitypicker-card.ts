import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { CardConfig, EntityElement, GroupElement, ActionElement } from '../types';
import { entityGroups } from '../data/entity_group';
import { CreateTimeScheme } from '../const';
import { PrettyPrintIcon } from '../helpers';

import './button-group';
import { commonStyle } from '../styles';
import { parseEntity } from '../data/parse_entity';
import { computeEntityActions } from '../data/compute_entity_actions';
import { computeActionDisplay } from '../data/compute_action_display';
import { entityFilter } from '../data/filter_entity';

@customElement('scheduler-editor-card')
export class SchedulerEditorCard extends LitElement {
  @property() hass?: HomeAssistant;
  @property() config?: CardConfig;
  @property() selectedGroup?: string;
  @property() selectedEntity?: string;
  @property() selectedAction?: string;
  @property() entity?: EntityElement;

  firstUpdated() {
    if (this.entity) {
      const group = this.getGroups().find(group => group.entities.find(e => e == this.entity!.id));
      if (!group) return;
      this.selectedGroup = group.id;
      this.selectedEntity = this.entity.id;
    }
  }

  getGroups() {
    if (!this.hass || !this.config) return [];

    const entities = Object.keys(this.hass.states)
      .filter(e => entityFilter(e, this.config!))
      .filter(e => computeEntityActions(e, this.hass!, this.config!).length);

    const groups = entityGroups(entities, this.config, this.hass);
    groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));

    return groups;
  }

  getEntitiesForGroup(groupConfig: GroupElement[]) {
    if (!this.selectedGroup || !this.hass || !this.config) return [];
    const entities = groupConfig
      .find(e => e.id == this.selectedGroup)!
      .entities.map(e => parseEntity(e, this.hass!, this.config!));

    entities.sort((a, b) => (a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1));
    return entities;
  }

  getActionsForEntity(_entityConfig: EntityElement[]) {
    if (!this.selectedEntity || !this.hass || !this.config) return [];

    const actions = computeEntityActions(this.selectedEntity, this.hass, this.config).map(e =>
      Object.assign(e, { name: computeActionDisplay(e) })
    );
    actions.sort((a, b) => (a.name!.trim().toLowerCase() < b.name!.trim().toLowerCase() ? -1 : 1));
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
            ${this.config.title !== undefined
        ? typeof this.config.title == 'string'
          ? this.config.title
          : ''
        : localize('ui.panel.common.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>
          <button-group .items=${groups} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${localize('ui.panel.entity_picker.no_groups_defined', this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
          <button-group .items=${entities} value=${this.selectedEntity} @change=${this.selectEntity}>
            ${!this.selectedGroup
        ? localize('ui.panel.entity_picker.no_group_selected', this.hass.language)
        : localize('ui.panel.entity_picker.no_entities_for_group', this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
          <button-group .items=${actions} value=${this.selectedAction} @change=${this.selectAction}>
            ${!this.selectedEntity
        ? localize('ui.panel.entity_picker.no_entity_selected', this.hass.language)
        : localize('ui.panel.entity_picker.no_actions_for_entity', this.hass.language)}
          </button-group>
          ${this.makeSchemeButton(actions)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction}
            >${this.hass.localize('ui.common.next')}</mwc-button
          >
        </div>
      </ha-card>
    `;
  }

  makeSchemeButton(actionConfig: ActionElement[]) {
    if (!actionConfig.length || !this.hass) return html``;
    return html`
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.or.label')}</div>
      <div class="option-list">
        <mwc-button
          class="${this.selectedAction == CreateTimeScheme ? ' active' : ''}"
          @click=${() => {
        this.selectedAction = CreateTimeScheme;
      }}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${localize('ui.panel.entity_picker.make_scheme', this.hass.language)}
        </mwc-button>
      </div>
    </div>
    `;
  }

  selectGroup(ev: Event | string) {
    const value = typeof ev == 'string' ? ev : (ev.target as HTMLInputElement).value;
    this.selectedGroup = value;
    this.selectedEntity = undefined;
    this.selectedAction = undefined;
  }

  selectEntity(ev: Event | string) {
    const value = typeof ev == 'string' ? ev : (ev.target as HTMLInputElement).value;
    this.selectedEntity = value;
    this.selectedAction = undefined;
  }

  selectAction(ev: Event | string) {
    const value = typeof ev == 'string' ? ev : (ev.target as HTMLInputElement).value;
    this.selectedAction = value;
  }

  cancelClick() {
    const myEvent = new CustomEvent('cancelClick');
    this.dispatchEvent(myEvent);
  }

  nextClick() {
    const myEvent = new CustomEvent('nextClick', {
      detail: {
        entity: this.selectedEntity,
        action: this.selectedAction,
      },
    });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
