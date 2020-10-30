import { CardConfig, EntityElement } from '../types';
import { standardIcon } from '../standard-configuration/standardIcon';
import { matchPattern } from './filter_entity';
import { pick } from '../helpers';
import { HomeAssistant, computeEntity } from 'custom-card-helpers';
import { DeadEntityIcon, DeadEntityName, DefaultEntityIcon } from '../const';

export function parseEntity(entity_id: string, hass: HomeAssistant, config: Partial<CardConfig>) {
  const stateObj = entity_id in hass.states ? hass.states[entity_id] : undefined;

  let entity: EntityElement = {
    id: entity_id,
    name: stateObj ? stateObj.attributes.friendly_name || computeEntity(entity_id) : DeadEntityName,
    icon: stateObj ? stateObj.attributes.icon : DeadEntityIcon,
  };

  if ((config.standard_configuration === undefined || config.standard_configuration) && !entity.icon) {
    entity = { ...entity, icon: standardIcon(entity_id, hass) };
  } else if (!entity.icon) {
    entity = { ...entity, icon: DefaultEntityIcon };
  }

  if (config.customize) {
    const customize = Object.entries(config.customize)
      .filter(([pattern]) => matchPattern(pattern, entity.id))
      .sort((a, b) => b[0].length - a[0].length)
      .map(([, v]) => v)
      .forEach(el => {
        entity = { ...entity, ...pick(el, ['name', 'icon']) };
      });
  }

  return entity;
}
