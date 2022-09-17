import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, computeDomain } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';

import { localize } from '../localize/localize';
import { CardConfig, EntityElement, ScheduleConfig, Action, Group } from '../types';
import { entityGroups } from '../data/entity_group';
import { PrettyPrintIcon, unique, flatten, isEqual, sortAlphabetically, getLocale } from '../helpers';

import { commonStyle } from '../styles';
import { parseEntity } from '../data/entities/parse_entity';
import { computeActionDisplay } from '../data/actions/compute_action_display';
import { fetchSchedules } from '../data/websockets';
import { computeEntities } from '../data/entities/compute_entities';
import { computeActions } from '../data/actions/compute_actions';

import '../components/button-group';
import { compareActions } from '../data/actions/compare_actions';

@customElement('scheduler-editor-card')
export class SchedulerEditorCard extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  config?: CardConfig;

  @property()
  selectedGroup?: Group;

  @property()
  selectedEntities: string[] = [];

  @property()
  selectedAction?: Action | null;

  @property()
  entities?: EntityElement[];

  @property()
  schedule?: ScheduleConfig;

  @property()
  multipleEntity = false;

  @property()
  scheduleEntities: string[] = [];

  @property()
  timeSchemeSelected = false;

  async firstUpdated() {
    this.scheduleEntities = (await fetchSchedules(this.hass!)).map(e => e.entity_id);
    if (this.entities && this.entities.length) {
      const group = this.getGroups().find(group => group.entities.find(e => e == this.entities![0].id));
      if (!group) return;
      this.selectedGroup = group;
      this.selectedEntities = [...this.entities.map(e => e.id)];
      this.multipleEntity = this.selectedEntities.length > 1;
    }

    if (this.schedule) {
      if (this.schedule.timeslots.every(e => e.stop)) this.timeSchemeSelected = true;
      else {
        const actions = unique(flatten(this.schedule.timeslots.map(e => e.actions)));
        const matchedActions = this.getActionsForEntity().filter(e => actions.some(a => compareActions(a, e, true)));
        if (matchedActions.length == 1) this.selectedAction = matchedActions[0];
      }
    }
  }

  getGroups() {
    if (!this.hass || !this.config) return [];
    const entities = computeEntities(this.hass, this.config).filter(
      e => computeDomain(e) !== 'switch' || !this.scheduleEntities.includes(e)
    );
    const groups = entityGroups(entities, this.config, this.hass);
    groups.sort(sortAlphabetically);
    return groups;
  }

  getEntitiesForGroup() {
    if (!this.selectedGroup || !this.hass || !this.config) return [];
    const entities = this.selectedGroup.entities.map(e => parseEntity(e, this.hass!, this.config!));
    entities.sort(sortAlphabetically);
    return entities;
  }

  getActionsForEntity() {
    if (!this.hass || !this.config || !this.selectedEntities.length) return [];
    const actions = computeActions(this.selectedEntities, this.hass!, this.config!).map(e =>
      Object.assign(e, { name: computeActionDisplay(e) })
    );
    actions.sort(sortAlphabetically);
    return actions;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const groups = this.getGroups();
    if (groups.length == 1 && !isEqual(this.selectedGroup, groups[0])) this.selectGroup(groups[0]);
    const entities = this.getEntitiesForGroup();
    if (entities.length == 1 && this.selectedEntities[0] !== entities[0].id) this.selectEntity(entities[0].id);

    const actions = this.getActionsForEntity();

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
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>
          <button-group
            .items=${groups}
            .value=${groups.findIndex(e => isEqual(e, this.selectedGroup))}
            @change=${(ev: CustomEvent) => this.selectGroup(ev.detail)}
          >
            ${localize('ui.panel.entity_picker.no_groups_defined', getLocale(this.hass))}
          </button-group>

          <div class="header">
            ${this.hass.localize('ui.components.entity.entity-picker.entity')}
            ${entities.length > 1
              ? html`
                  <div class="switch">
                    <ha-switch
                      ?checked=${this.multipleEntity}
                      @change=${(ev: Event) => {
                        this.multipleEntity = (ev.target as HTMLInputElement).checked;
                      }}
                    >
                    </ha-switch>
                    ${localize('ui.panel.entity_picker.multiple', getLocale(this.hass))}
                  </div>
                `
              : ''}
          </div>
          <button-group
            .items=${entities}
            .value=${this.selectedEntities}
            @change=${(ev: Event) => this.selectEntity((ev.target as HTMLInputElement).value)}
            ?multiple=${this.multipleEntity}
            ?optional=${true}
          >
            ${!this.selectedGroup
              ? localize('ui.panel.entity_picker.no_group_selected', getLocale(this.hass))
              : localize('ui.panel.entity_picker.no_entities_for_group', getLocale(this.hass))}
          </button-group>

          <div class="header">
            ${this.hass.localize('ui.panel.config.automation.editor.actions.type.device_id.action')}
          </div>
          <button-group
            .items=${actions}
            .value=${actions.findIndex(e => isEqual(e, this.selectedAction))}
            @change=${(ev: CustomEvent) => this.selectAction(ev.detail)}
          >
            ${!this.selectedEntities.length
              ? localize('ui.panel.entity_picker.no_entity_selected', getLocale(this.hass))
              : localize('ui.panel.entity_picker.no_actions_for_entity', getLocale(this.hass))}
          </button-group>
          ${this.makeSchemeButton(actions)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction && !this.timeSchemeSelected}
            >${this.hass.localize('ui.common.next')}</mwc-button
          >
        </div>
      </ha-card>
    `;
  }

  makeSchemeButton(actionConfig: Action[]) {
    if (!actionConfig.length || !this.hass) return html``;
    return html`
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.or.label')}</div>
      <div class="option-list">
        <mwc-button
          class="${this.timeSchemeSelected ? ' active' : ''}"
          @click=${() => this.selectTimeScheme()}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass))}
        </mwc-button>
      </div>
    </div>
    `;
  }

  selectGroup(val: Group) {
    this.selectedGroup = val;
    this.selectedEntities = [];
    this.selectedAction = undefined;
  }

  selectEntity(value: string | string[]) {
    this.selectedEntities = Array.isArray(value) ? value : [value];
    if (this.selectedAction) {
      const availableActions = this.getActionsForEntity();
      this.selectedAction = availableActions.find(e => compareActions(e, this.selectedAction!));
    } else this.selectedAction = undefined;
  }

  selectAction(val: Action) {
    this.selectedAction = val;
    this.timeSchemeSelected = false;
  }

  selectTimeScheme() {
    this.selectedAction = null;
    this.timeSchemeSelected = true;
  }

  cancelClick() {
    const myEvent = new CustomEvent('cancelClick');
    this.dispatchEvent(myEvent);
  }

  nextClick() {
    const myEvent = new CustomEvent('nextClick', {
      detail: {
        entities: this.selectedEntities,
        action: this.selectedAction,
        timeSchemeSelected: this.timeSchemeSelected,
      },
    });
    this.dispatchEvent(myEvent);
  }

  static styles = commonStyle;
}
