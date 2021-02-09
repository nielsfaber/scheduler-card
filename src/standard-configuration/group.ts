import { ActionConfig, ListVariableOption } from '../types';
import { HassEntity } from 'home-assistant-js-websocket';
import { computeDomain, computeEntity, HomeAssistant } from 'custom-card-helpers';
import { uniqueId } from '../data/compute_action_id';

export function groupActions(entity: HassEntity, entityActions: ActionConfig[][]) {
  const entities: string[] =
    entity && entity.attributes.entity_id && Array.isArray(entity.attributes.entity_id)
      ? entity.attributes.entity_id
      : [];
  //find matches
  const mixedDomains = entities.map(e => computeDomain(e)).filter((v, k, arr) => arr.indexOf(v) === k).length > 1;
  if (mixedDomains) {
    entityActions = entityActions.map(actionList => {
      return actionList.map(action => {
        if (computeEntity(action.service) == 'turn_on' || computeEntity(action.service) == 'turn_off') {
          return {
            ...action,
            service: 'homeassistant' + '.' + computeEntity(action.service),
            icon: computeEntity(action.service) == 'turn_on' ? 'flash' : 'flash-off',
          };
        }
        return action;
      });
    });
  }
  if (!entityActions.length) return [];

  const actions = entityActions[0].filter(action => {
    return entityActions.every(e => {
      return e.map(el => uniqueId(el)).includes(uniqueId(action));
    });
  });
  return actions;
}

export const groupStates = (_hass: HomeAssistant, _stateObj: HassEntity, entityStates: ListVariableOption[][]) => {
  if (!entityStates.length || !Array.isArray(entityStates[0])) return [];
  let states = [...entityStates[0]];
  if (!states.length) return [];

  entityStates
    .filter(e => Array.isArray(e))
    .forEach(entity => {
      states = states.filter(e => {
        return entity.find(el => el.value == e.value);
      });
    });

  return states;
};
