import { computeDomain, HomeAssistant, computeEntity } from 'custom-card-helpers';
import { Dictionary, EntityConfig, EntityElement, GroupConfig, CardConfig } from './types';
import { DefaultEntityIcon } from './const';
import { default as standardConfig } from './standard-configuration.json';

export function MatchPattern(pattern: string, entity_id: string) {
  let res = false;
  if (pattern.match(/^[a-z0-9_\.]+$/)) {
    if (pattern.includes('.')) res = pattern == entity_id;
    else res = pattern == computeDomain(entity_id);
  } else {
    try {
      if ((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
        if (!pattern.startsWith('/')) {
          pattern = pattern.replace(/\./g, '.').replace(/\*/g, '.*');
          pattern = `/^${pattern}$/`;
        }
        const regex = new RegExp(pattern.slice(1, -1));
        res = regex.test(entity_id);
      }
    } catch (e) {}
  }
  return res;
}

export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export function entityConfig(entity_id: string, config: Partial<CardConfig>, hass: HomeAssistant | null) {
  const output: EntityElement = {
    id: entity_id,
    name: computeEntity(entity_id),
    icon: DefaultEntityIcon,
    actions: [],
  };

  const domain = computeDomain(entity_id);
  if (standardConfig[domain] && (config.standard_configuration === undefined || config.standard_configuration)) {
    Object.assign(output, standardConfig[domain]);
  }

  if (hass && hass.states[entity_id]) {
    Object.assign(output, { name: hass.states[entity_id].attributes.friendly_name || computeEntity(entity_id) });
    Object.assign(output, { icon: hass.states[entity_id].attributes.icon || output.icon });
  }

  if (config.customize) {
    Object.entries(config.customize)
      .filter(([e]) => MatchPattern(e, entity_id))
      .map(([, v]) => v)
      .forEach(el => {
        Object.assign(output, el);
      });
  }
  return output;
}

export function entityFilter(
  entity_id: string,
  config: { include?: string[]; exclude?: string[]; customize?: Dictionary<EntityConfig>; groups?: GroupConfig[] },
  options?: { states?: boolean; actions?: boolean }
) {
  if ((!config.include || !config.include.length) && (!config.groups || !config.groups.length)) return false;
  if (IsSchedulerEntity(entity_id)) return false;
  if (
    config.groups &&
    config.groups.some(group => {
      if (!group.include.find(e => MatchPattern(e, entity_id))) return false;
      if (group.exclude && group.exclude.find(e => MatchPattern(e, entity_id))) return false;
      return true;
    })
  )
    return true;
  if (config.include && !config.include.find(e => MatchPattern(e, entity_id))) return false;
  if (config.exclude && config.exclude.find(e => MatchPattern(e, entity_id))) return false;
  if (options) {
    if (options.states && !entityConfig(entity_id, config, null).states) return false;
    if (options.actions && !entityConfig(entity_id, config, null).actions.length) return false;
  }
  return true;
}
