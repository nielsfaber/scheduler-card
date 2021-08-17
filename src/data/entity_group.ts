import { Group, CardConfig } from '../types';
import { DefaultGroupIcon } from '../const';
import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { domainIcons } from '../standard-configuration/standardIcon';
import { entityFilter } from './entities/entity_filter';
import { sortAlphabetically, getLocale } from '../helpers';

export function entityGroups(entities: string[], config: Partial<CardConfig>, hass: HomeAssistant) {
  let groups: Group[] = [];

  //create groups from user config
  if (config.groups) {
    config.groups.forEach(el => {
      const group: Group = {
        name: el.name,
        icon: el.icon || DefaultGroupIcon,
        entities: entities.filter(e => entityFilter(e, el)),
      };

      groups.push(group);
    });
  }

  const ungroupedEntities = entities.filter(e => !groups.some(g => g.entities.includes(e)));
  const domains = ungroupedEntities.map(computeDomain).filter((v, k, arr) => arr.indexOf(v) === k);

  //automatically create groups for ungrouped entities
  domains.forEach(domain => {
    const group: Group = {
      name: localize(`domains.${domain}`, getLocale(hass)) || domain,
      icon:
        (config.standard_configuration === undefined || config.standard_configuration) && domain in domainIcons
          ? domainIcons[domain]
          : DefaultGroupIcon,
      entities: ungroupedEntities.filter(e => entityFilter(e, { include: [domain], exclude: [] })),
    };

    groups.push(group);
  });
  return groups;
}
