import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, computeDomain, TimeFormat, fireEvent } from 'custom-card-helpers';

import { localize } from '../localize/localize';
import { CardConfig, EntityElement, ScheduleConfig, Action, Group, ERepeatType, Timeslot } from '../types';
import { entityGroups } from '../data/entity_group';
import {
  PrettyPrintIcon,
  unique,
  flatten,
  isEqual,
  sortAlphabetically,
  getLocale,
  AsArray,
  deepCopy,
} from '../helpers';

import { commonStyle } from '../styles';
import { parseEntity } from '../data/entities/parse_entity';
import { computeActionDisplay } from '../data/actions/compute_action_display';
import { fetchSchedules } from '../data/websockets';
import { computeEntities } from '../data/entities/compute_entities';
import { computeActions } from '../data/actions/compute_actions';

import { compareActions } from '../data/actions/compare_actions';
import { migrateActionConfig } from '../data/actions/migrate_action_config';
import { assignAction } from '../data/actions/assign_action';
import { stringToTime, roundTime, timeToString } from '../data/date-time/time';
import { formatTime } from '../data/date-time/format_time';
import { ETabOptions } from '../const';

import '../components/button-group';
import '../components/generic-dialog';
import { DialogParams } from '../components/generic-dialog';
import { showDialog } from '../data/custom_dialog';

const defaultTimeslots = [
  {
    start: '00:00:00',
    stop: '08:00:00',
    actions: [],
  },
  {
    start: '08:00:00',
    stop: '16:00:00',
    actions: [],
  },
  {
    start: '16:00:00',
    stop: '00:00:00',
    actions: [],
  },
];

@customElement('scheduler-editor-entity')
export class SchedulerEditorEntity extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  config?: CardConfig;

  @property()
  selectedGroup?: Group;

  @property()
  selectedAction?: Action | null;

  @property()
  entities: string[] = [];

  @property()
  schedule?: ScheduleConfig;

  @property()
  multipleEntity = false;

  @property()
  scheduleEntities: string[] = [];

  @property()
  timeSchemeSelected = false;

  actions?: Action[];

  @property({ type: Boolean })
  editItem = false;

  cardEmbeddedInPopup?: boolean;

  provideHass(el: any) {
    el.hass = this.hass;
  }

  async firstUpdated() {
    this.scheduleEntities = (await fetchSchedules(this.hass!)).map(e => e.entity_id);
    if (this.entities && this.entities.length) {
      const group = this.getGroups().find(group => group.entities.find(e => e == this.entities![0]));
      if (!group) return;
      this.selectedGroup = group;
      this.multipleEntity = this.entities.length > 1;
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

  getActionsForEntity(entityIds?: string[]) {
    if (!entityIds) entityIds = this.entities;
    if (!this.hass || !this.config || !entityIds.length) return [];
    const actions = computeActions(entityIds, this.hass!, this.config!).map(e =>
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
    if (entities.length == 1 && this.entities[0] !== entities[0].id) this.selectEntity(entities[0].id);

    const actions = this.getActionsForEntity();

    return html`
      <div class="content">
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
          .value=${this.entities}
          @change=${this.selectEntity}
          ?multiple=${this.multipleEntity}
          ?optional=${true}
          id="selectedEntity"
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
          @change=${this.selectAction}
          id="selectedAction"
        >
          ${!this.entities.length
            ? localize('ui.panel.entity_picker.no_entity_selected', getLocale(this.hass))
            : localize('ui.panel.entity_picker.no_actions_for_entity', getLocale(this.hass))}
        </button-group>
        ${this.makeSchemeButton(actions)}
      </div>
      <div class="buttons ${!this.schedule || !this.editItem ? 'centered' : ''}">
        ${!this.schedule
          ? html`
              <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction && !this.timeSchemeSelected}
                >${this.hass.localize('ui.common.next')}</mwc-button
              >
            `
          : html`
              ${this.editItem
                ? html`
                    <mwc-button
                      class="warning"
                      @click=${() => this.dispatchEvent(new CustomEvent('deleteClick', { detail: this.schedule }))}
                    >
                      ${this.hass.localize('ui.common.delete')}
                    </mwc-button>
                  `
                : ''}
              <mwc-button
                @click=${() => this.dispatchEvent(new CustomEvent('saveClick', { detail: this.schedule }))}
                ?disabled=${!this.schedule?.timeslots.filter(e => e.actions.length).length}
              >
                ${this.hass.localize('ui.common.save')}
              </mwc-button>
            `}
      </div>
    `;
  }

  makeSchemeButton(actionConfig: Action[]) {
    if (!actionConfig.length || !this.hass) return html``;
    return html`
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.or.label')}</div>
      <div class="option-list">
        <mwc-button
          class="${this.timeSchemeSelected ? ' active' : ''}"
          @click=${this.selectTimeScheme}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass))}
        </mwc-button>
      </div>
    </div>
    `;
  }

  selectGroup(val: Group) {
    this.selectedGroup = val;
    this.entities = [];
    this.selectedAction = undefined;
  }

  async selectEntity(ev: string | string[] | Event) {
    const value = typeof ev == 'object' ? AsArray(((ev as Event).target as HTMLInputElement).value) : AsArray(ev);
    let action = this.selectedAction;
    if (action) {
      let availableActions = this.getActionsForEntity(value);
      //handle case of script entities, where service is equal to the entity ID
      if (this.entities.every(e => computeDomain(e) == 'script') && this.entities.includes(action.service)) {
        action = { ...action, service: 'script.script' };
        availableActions = availableActions.map(a =>
          value.includes(a.service) ? { ...a, service: 'script.script' } : a
        );
        action = availableActions.find(e => compareActions(e, action!));
        action = { ...action, service: value[0] };
      } else action = availableActions.find(e => compareActions(e, action!));
    } else action = undefined;

    if (this.schedule && value.length && (this.timeSchemeSelected || this.selectedAction)) {
      const res = await this.migrateSchedule(value, this.timeSchemeSelected ? null : action!);
      if (!res) {
        this.selectedAction = null;
        if (typeof ev == 'object') (ev as Event).stopPropagation();
        (this.shadowRoot!.querySelector('#selectedEntity') as any).value = this.entities;
        return;
      }
      this.entities = value;
      this.selectedAction = action;

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: res,
        })
      );
    } else {
      this.entities = value;
      this.selectedAction = action;
    }
  }

  async selectAction(ev: CustomEvent) {
    const val = ev.detail as Action;
    if (this.schedule) {
      const res = await this.migrateSchedule(this.entities, val);
      if (!res) {
        this.selectedAction = null;
        ev.stopPropagation();
        (this.shadowRoot!.querySelector('#selectedAction') as any).value = null;
        return;
      } else {
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: res,
          })
        );
      }
    }
    this.selectedAction = val;
    this.timeSchemeSelected = false;
  }

  async selectTimeScheme(ev: Event) {
    if (this.schedule) {
      const res = await this.migrateSchedule(this.entities, null);
      if (!res) {
        ev.stopPropagation();
        return;
      } else {
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: res,
          })
        );
      }
    }
    this.selectedAction = null;
    this.timeSchemeSelected = true;
  }

  nextClick() {
    if (!this.hass || !this.config || (!this.selectedAction && !this.timeSchemeSelected)) return;
    const defaultTags = AsArray(this.config.tags).length == 1 ? AsArray(this.config.tags).slice(0, 1) : [];

    if (!this.timeSchemeSelected) {
      let now = stringToTime(formatTime(new Date(), getLocale(this.hass), TimeFormat.twenty_four), this.hass);
      now = roundTime(now, this.config.time_step, { wrapAround: true });
      this.actions = [this.selectedAction!];

      const defaultTimeslot: Timeslot = {
        start: timeToString(now),
        actions: this.entities.map(e => assignAction(e, this.actions![0])),
      };

      this.schedule = {
        weekdays: ['daily'],
        timeslots: [defaultTimeslot],
        repeat_type: ERepeatType.Repeat,
        tags: defaultTags,
      };
    } else {
      this.actions = computeActions(this.entities, this.hass, this.config);
      this.schedule = {
        weekdays: ['daily'],
        timeslots: defaultTimeslots,
        repeat_type: ERepeatType.Repeat,
        tags: defaultTags,
      };
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          schedule: this.schedule,
          entities: this.entities.map(e => parseEntity(e, this.hass!, this.config!)),
          actions: this.actions,
          tab: ETabOptions.Time,
        },
      })
    );
  }

  private migrateSchedule(
    entities: string[],
    selectedAction: Action | null
  ): Promise<false | { schedule: ScheduleConfig; actions: Action[]; entities: EntityElement[] }> {
    let canMigrate = true;
    let schedule: ScheduleConfig = deepCopy(this.schedule!);

    const actions = selectedAction !== null ? [selectedAction] : computeActions(entities, this.hass!, this.config!);

    if (!this.timeSchemeSelected) {
      //migrate a simple schedule

      if (selectedAction !== null) {
        const newActions =
          migrateActionConfig(schedule.timeslots[0].actions[0], entities, actions, this.hass!) ||
          entities.map(e => assignAction(e, actions[0]));

        schedule = {
          ...schedule,
          timeslots: [
            {
              ...schedule.timeslots[0],
              actions: newActions,
            },
          ],
        };
      } else {
        schedule = {
          ...schedule,
          timeslots: defaultTimeslots,
        };
        canMigrate = false;
      }
    } else {
      //migrate a timescheme
      if (selectedAction !== null) {
        let now = stringToTime(formatTime(new Date(), getLocale(this.hass!), TimeFormat.twenty_four), this.hass!);
        now = roundTime(now, this.config!.time_step, { wrapAround: true });

        const defaultTimeslot: Timeslot = {
          start: timeToString(now),
          actions: entities.map(e => assignAction(e, actions![0])),
        };

        schedule = { ...schedule, timeslots: [defaultTimeslot] };
        canMigrate = false;
      } else {
        const oldActions = schedule.timeslots.map(e => e.actions[0]);
        const newActions = oldActions.map(v => migrateActionConfig(v, entities, actions, this.hass!));

        canMigrate = oldActions.every((e, i) => newActions[i] !== null && compareActions(e, newActions[i]![0]));

        schedule = {
          ...schedule,
          timeslots: schedule.timeslots.map((slot, i) => Object.assign(slot, { actions: newActions[i] || [] })),
        };
      }
    }

    const output = {
      schedule: schedule,
      actions: actions,
      entities: entities.map(e => parseEntity(e, this.hass!, this.config!)),
    };

    return new Promise(resolve => {
      if (!canMigrate) {
        const params: DialogParams = {
          title: localize('ui.dialog.confirm_migrate.title', getLocale(this.hass!)),
          description: localize('ui.dialog.confirm_migrate.description', getLocale(this.hass!)),
          primaryButtonLabel: this.hass!.localize('ui.common.yes'),
          secondaryButtonLabel: this.hass!.localize('ui.common.no'),
          cancel: () => {
            resolve(false);
          },
          confirm: () => {
            resolve(output);
          },
        };
        showDialog(
          this,
          {
            dialogTag: 'generic-dialog',
            dialogImport: () => import('../components/generic-dialog'),
            dialogParams: params,
          },
          this.cardEmbeddedInPopup
        );
      } else resolve(output);
    });
  }

  static styles = css`
    ${commonStyle}
  `;
}
