import { computeDomain } from 'custom-card-helpers';
import { CardConfig, Dictionary, EntityConfig } from '../types';

export function matchPattern(pattern: string, value: string) {
  let res = false;
  if (pattern.match(/^[a-z0-9_\.]+$/)) {
    if (pattern.includes('.')) res = pattern == value;
    else res = pattern == computeDomain(value);
  } else {
    try {
      if ((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
        if (!pattern.startsWith('/')) {
          pattern = pattern.replace(/\./g, '.').replace(/\*/g, '.*');
          pattern = `/^${pattern}$/`;
        }
        const regex = new RegExp(pattern.slice(1, -1));
        res = regex.test(value);
      }
    } catch (e) { }
  }
  return res;
}

export function applyFilters(
  value: string,
  config: { include?: string[]; exclude?: string[]; customize?: Dictionary<EntityConfig> }
) {
  let match = false;
  if (config.include && config.include.find(e => matchPattern(e, value))) match = true;
  else if (config.customize && Object.keys(config.customize).find(e => matchPattern(e, value))) match = true;
  if (config.exclude && config.exclude.find(e => matchPattern(e, value))) match = false;
  return match;
}

export function entityFilter(entity_id: string, config: CardConfig) {
  if (!applyFilters(entity_id, config) && (!config.groups || !config.groups.some(e => applyFilters(entity_id, e))))
    return false;
  return true;
}
