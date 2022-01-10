import { CardConfig, EntityElement } from '../../types';
import { standardIcon } from '../../standard-configuration/standardIcon';
import { matchPattern } from '../match_pattern';
import { pick } from '../../helpers';
import { HomeAssistant, computeEntity, computeDomain } from 'custom-card-helpers';
import { DeadEntityIcon, DeadEntityName, DefaultEntityIcon, NotifyDomain } from '../../const';

export function parseEntity(entity_id: string, hass: HomeAssistant, config: Partial<CardConfig>) {
  const stateObj = entity_id in hass.states ? hass.states[entity_id] : undefined;

  let entity: EntityElement = {
    id: entity_id,
    name: stateObj ? stateObj.attributes.friendly_name || computeEntity(entity_id) : DeadEntityName,
    icon: stateObj ? stateObj.attributes.icon : DeadEntityIcon,
  };

  if (!stateObj && computeDomain(entity_id) == NotifyDomain) {
    let name = computeEntity(entity_id);
    let icon = standardIcon(entity_id, hass);
    if (name.includes('mobile_app_')) {
      name = name.split('mobile_app_').pop()!;
      if (`device_tracker.${name}` in hass.states) {
        const deviceTracker = hass.states[`device_tracker.${name}`];
        name = deviceTracker.attributes.friendly_name || name;
        icon = 'hass:cellphone-text';
      }
    }
    entity = {
      ...entity,
      name: name,
      icon: icon,
    };
  }

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
