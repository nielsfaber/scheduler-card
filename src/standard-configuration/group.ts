import { Action, Variable, EVariableType, ListVariable, LevelVariable } from '../types';
import { HassEntity } from 'home-assistant-js-websocket';
import { computeDomain, computeEntity, HomeAssistant } from 'custom-card-helpers';
import { listVariable } from '../data/variables/list_variable';
import { levelVariable } from '../data/variables/level_variable';
import { computeCommonActions } from '../data/actions/compute_common_actions';

export function groupActions(entity: HassEntity, entityActions: Action[][]) {
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
  let commonActions = computeCommonActions(entityActions);
  return commonActions;
}

export const groupStates = (_hass: HomeAssistant, _stateObj: HassEntity, entityStates: Variable[]): Variable | null => {
  if (!entityStates.length) return null;
  if (!entityStates.every(e => e.type == entityStates[0].type)) return null;
  if (entityStates[0].type == EVariableType.List) return listVariable(...entityStates as ListVariable[]);
  else if (entityStates[0].type == EVariableType.Level) return levelVariable(...entityStates as LevelVariable[]);
  else return null;
}