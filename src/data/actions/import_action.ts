import { ServiceCall, Action, VariableDictionary, EVariableType, ListVariable } from '../../types';
import { standardActions } from '../../standard-configuration/standardActions';
import { unique } from '../../helpers';
import { HomeAssistant } from 'custom-card-helpers';
import { compareActions } from './compare_actions';
import { listVariable } from '../variables/list_variable';

export function importAction(action: ServiceCall, hass: HomeAssistant): Action {
  const id = action.entity_id || action.service;
  const service = action.service;
  const serviceData = action.service_data || {};
  const serviceArgs = Object.keys(serviceData);

  let actions = standardActions(id, hass, false);
  let matches = actions.filter(e => compareActions(action, e, true));

  if (matches.length == 1) actions = matches;
  else {
    //only find actions with matching service name
    actions = actions.filter(e => e.service == service);

    // if action has a fixed argument, it should be provided to be a match
    actions = actions.filter(e => Object.keys(e.service_data || {}).every(k => serviceArgs.includes(k)));
  }

  if (actions.length > 1) {
    //the match is ambiguous, check service_data to find the action with best overlap

    actions.sort((a, b) => {
      const fixedArgsOverlapA = Object.entries(a.service_data || {})
        .map(([k, v]): number => (k in serviceData ? (serviceData[k] == v ? 1 : -1) : 0))
        .reduce((sum, e) => sum + e, 0);
      const fixedArgsOverlapB = Object.entries(b.service_data || {})
        .map(([k, v]): number => (k in serviceData ? (serviceData[k] == v ? 1 : -1) : 0))
        .reduce((sum, e) => sum + e, 0);

      //if one of the services has more fixed serviceArgs in common, it is preferred
      if (fixedArgsOverlapA > fixedArgsOverlapB) return -1;
      if (fixedArgsOverlapA < fixedArgsOverlapB) return 1;

      const serviceDataA = unique([...Object.keys(a.service_data || {}), ...Object.keys(a.variables || {})]);
      const serviceDataB = unique([...Object.keys(b.service_data || {}), ...Object.keys(b.variables || {})]);

      const overlapA = serviceArgs.filter(e => serviceDataA.includes(e)).length;
      const overlapB = serviceArgs.filter(e => serviceDataB.includes(e)).length;

      //if one of the services has more variable serviceArgs in common, it is preferred
      if (overlapA > overlapB) return -1;
      if (overlapA < overlapB) return 1;

      const extraKeysA = serviceDataA.filter(e => !serviceArgs.includes(e)).length;
      const extraKeysB = serviceDataB.filter(e => !serviceArgs.includes(e)).length;

      //if one of the services has less extra serviceArgs, it is preferred
      if (extraKeysA > extraKeysB) return 1;
      if (extraKeysA < extraKeysB) return -1;
      return 0;
    });
  }
  if (actions.length) {
    // add option to the list if it is not existing
    let variables: VariableDictionary = { ...(actions[0].variables || {}) };
    Object.entries(serviceData).forEach(([key, val]) => {
      if (!Object.keys(variables || {}).includes(key)) return;
      if (variables[key].type != EVariableType.List) return;
      variables = {
        ...variables,
        [key]: (variables[key] as ListVariable).options.some(e => e.value == val)
          ? variables[key]
          : { ...variables[key], options: [...(variables[key] as ListVariable).options, { value: val }] },
      };
    });

    return {
      ...actions[0],
      service_data: { ...(actions[0].service_data || {}), ...serviceData },
      variables: variables,
    };
  } else {
    //unknown action, add from config
    return {
      service: service,
      service_data: action.service_data,
    };
  }
}
