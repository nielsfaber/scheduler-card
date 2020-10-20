import { computeEntity } from 'custom-card-helpers';
import { Dictionary, EntityConfig, EntityElement, GroupConfig, CardConfig } from './types';
import { DefaultEntityIcon } from './const';
import { standardActions } from './standard-configuration/standardActions';
import { HassEntity } from 'home-assistant-js-websocket';
import { matchPattern, applyFilters } from './filter';
import { standardIcon } from './standard-configuration/standardIcon';
import { standardStates } from './standard-configuration/standardStates';
import { omit, PrettyPrintName } from './helpers';
import { findActionIndex, actionConfig } from './action';


export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export function entityConfig(entity: HassEntity | undefined, config: Partial<CardConfig>) {
  if (!entity) return;
  const entity_id = typeof entity == "string" ? entity : entity.entity_id;

  let output: EntityElement = {
    id: entity_id,
    name: entity.attributes.friendly_name || computeEntity(entity_id),
    icon: DefaultEntityIcon,
    actions: [],
  };

  if (config.standard_configuration === undefined || config.standard_configuration) {
    output = { ...output, actions: [...standardActions(entity)], icon: standardIcon(entity), states: standardStates(entity) }
  }
  output = { ...output, icon: entity.attributes.icon || output.icon };

  if (config.customize) {
    const customize = Object.entries(config.customize)
      .filter(([e]) => matchPattern(e, entity_id))
      .map(([, v]) => v);
    customize.forEach(el => {
      output = { ...output, ...omit(el, ['actions', 'exclude_actions']) };
      if (el.actions) {
        el.actions.forEach(action => {
          const indexes = findActionIndex(output, action);
          let actions = output.actions;
          if (indexes.length) actions = output.actions.map((e, i) => indexes.includes(i) ? Object.assign(e, action) : e);
          else output.actions.push(action);
          output = { ...output, actions: actions };
        });
      }
      if (el.exclude_actions) {
        let list = el.exclude_actions.map(e => e.replace(/_/g, ' ').trim().toLowerCase());
        if (output.exclude_actions) list = list.concat(output.exclude_actions).filter((v, k, arr) => arr.indexOf(v) === k);
        output = { ...output, exclude_actions: list };
      }
    });
  }

  return output;
}

export function entityFilter(
  entity: HassEntity,
  config: { include?: string[]; exclude?: string[]; customize?: Dictionary<EntityConfig>; groups?: GroupConfig[] },
  options?: { states?: boolean; actions?: boolean }
) {
  const entity_id = entity.entity_id;

  if (IsSchedulerEntity(entity_id)) return false;
  else if (!applyFilters(entity_id, config) && (!config.groups || !config.groups.some(e => applyFilters(entity_id, e)))) return false;
  if (options) {
    const entityCfg = entityConfig(entity, config);
    if (!entityCfg) return false;
    if (options.states && !entityCfg.states) return false;
    if (options.actions && !entityCfg.actions.length) return false;
  }
  return true;
}
