import { Dictionary } from '../../types';
import { matchPattern } from '../match_pattern';

type FilterType = { include?: string[]; exclude?: string[]; customize?: Dictionary<any>; groups?: FilterType[] };

export function entityFilter(entity_id: string, config: FilterType) {
  const applyFilter = (value: string, filter: FilterType) => {
    return (
      ((filter.include || []).some(e => matchPattern(e, value)) ||
        Object.keys(filter.customize || {}).some(e => matchPattern(e, value))) &&
      !(filter.exclude || []).some(e => matchPattern(e, value))
    );
  };
  return config.groups?.some(group => applyFilter(entity_id, group)) || applyFilter(entity_id, config);
}
