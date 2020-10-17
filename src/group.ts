import { GroupElement, CardConfig } from './types';
import { DefaultGroupIcon } from './const';
import { entityFilter } from './entity';
import { computeDomain } from 'custom-card-helpers';
import { DomainNameTranslations, localize } from './localize/localize';
import { default as standardConfig } from './standard-configuration.json';

export function entityGroups(entities: string[], config: Partial<CardConfig>) {
  const groups: GroupElement[] = [];

  //create groups from user config
  if (config.groups) {
    config.groups.forEach(el => {
      const group: GroupElement = {
        id: el.name,
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
    const group: GroupElement = {
      id: domain,
      name: domain in DomainNameTranslations ? localize(DomainNameTranslations[domain]) : domain,
      icon:
        (config.standard_configuration === undefined || config.standard_configuration) &&
        domain in standardConfig &&
        standardConfig[domain].icon
          ? standardConfig[domain].icon
          : DefaultGroupIcon,
      entities: ungroupedEntities.filter(e => entityFilter(e, { include: [domain] })),
    };

    groups.push(group);
  });

  return groups;
}
