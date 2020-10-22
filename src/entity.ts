import { computeEntity, computeDomain, HomeAssistant } from 'custom-card-helpers';
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

export function entityConfig(entity_id: string, hass: HomeAssistant, config: Partial<CardConfig>) {
  const stateObj = hass.states[entity_id];
  if (!stateObj) return;

  let output: EntityElement = {
    id: entity_id,
    name: stateObj.attributes.friendly_name || computeEntity(entity_id),
    icon: DefaultEntityIcon,
    actions: [],
  };

  if (config.standard_configuration === undefined || config.standard_configuration) {
    output = { ...output, actions: [...standardActions(entity_id, hass)], icon: standardIcon(stateObj), states: standardStates(stateObj) }
  }
  output = { ...output, icon: stateObj.attributes.icon || output.icon };

  if (config.customize) {
    const customize = Object.entries(config.customize)
      .filter(([e]) => matchPattern(e, entity_id))
      .map(([, v]) => v);
    customize.forEach(el => {
      output = { ...output, ...omit(el, ['actions', 'exclude_actions']) };
      if (el.actions) {
        el.actions.forEach(action => {
          if (computeDomain(action.service) == computeDomain(entity_id)) action = { ...action, service: computeEntity(action.service) }
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

export function entityFilter(entity_id: string, hass: HomeAssistant,
  config: CardConfig,
  options?: { states?: boolean; actions?: boolean }
) {
  if (IsSchedulerEntity(entity_id)) return false;
  else if (!applyFilters(entity_id, config) && (!config.groups || !config.groups.some(e => applyFilters(entity_id, e)))) return false;
  if (options) {
    const entityCfg = entityConfig(entity_id, hass, config);
    if (!entityCfg) return false;
    if (options.states && !entityCfg.states) return false;
    if (options.actions && !entityCfg.actions.length) return false;
  }
  return true;
}
