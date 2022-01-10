import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig } from '../../types';
import { entityFilter } from './entity_filter';
import { computeActions } from '../actions/compute_actions';
import { computeStates } from '../compute_states';

export function computeEntities(
  hass: HomeAssistant,
  config: CardConfig,
  options: { filterActions: boolean; filterStates: boolean } = { filterActions: true, filterStates: false }
) {
  let entities = Object.keys(hass.states).filter(e => entityFilter(e, config));

  if ('notify' in hass.services) {
    entities = [
      ...entities,
      ...Object.keys(hass.services['notify'])
        .map(e => `notify.${e}`)
        .filter(e => entityFilter(e, config)),
    ];
  }

  if (options.filterActions && options.filterStates)
    entities = entities.filter(e => computeActions(e, hass, config).length || computeStates(e, hass, config));
  else if (options.filterActions) entities = entities.filter(e => computeActions(e, hass, config).length);
  else if (options.filterStates) entities = entities.filter(e => computeStates(e, hass, config));

  return entities;
}
