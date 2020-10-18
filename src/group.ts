import { GroupElement, CardConfig } from './types';
import { DefaultGroupIcon } from './const';
import { entityFilter } from './entity';
import { computeDomain } from 'custom-card-helpers';
import { DomainNameTranslations, localize } from './localize/localize';
import { domainIcons } from './standard-configuration/standardIcon';
import { applyFilters } from './filter';



export function entityGroups(entities: string[], config: Partial<CardConfig>) {
  const groups: GroupElement[] = [];

  //create groups from user config
  if (config.groups) {
    config.groups.forEach(el => {
      const group: GroupElement = {
        id: el.name,
        name: el.name,
        icon: el.icon || DefaultGroupIcon,
        entities: entities.filter(e => applyFilters(e, el)),
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
          domain in domainIcons
          ? domainIcons[domain]
          : DefaultGroupIcon,
      entities: ungroupedEntities.filter(e => applyFilters(e, { include: [domain] })),
    };

    groups.push(group);
  });

  return groups;
}
