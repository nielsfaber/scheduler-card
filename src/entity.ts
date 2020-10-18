import { computeDomain, HomeAssistant, computeEntity } from 'custom-card-helpers';
import { Dictionary, EntityConfig, EntityElement, GroupConfig, CardConfig } from './types';
import { DefaultEntityIcon } from './const';
import { standardActions } from './standard-configuration/standardActions';
import { HassEntity } from 'home-assistant-js-websocket';
import { matchPattern, applyFilters } from './filter';
import { standardIcon } from './standard-configuration/standardIcon';
import { standardStates } from './standard-configuration/standardStates';


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
    Object.entries(config.customize)
      .filter(([e]) => matchPattern(e, entity_id))
      .map(([, v]) => v)
      .forEach(el => {
        Object.assign(output, el);
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
