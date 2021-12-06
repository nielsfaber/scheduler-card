import { isDefined } from '../../helpers';
import { Action, VariableDictionary, EVariableType, ListVariable } from '../../types';
import { compareActions } from './compare_actions';
import { computeMergedVariable } from '../variables/compute_merged_variable';

export function computeCommonActions(actionLists: Action[][]) {
  //calculate actions that are in common for all

  if (actionLists.length == 1) return actionLists[0];

  let commonActions = actionLists[0].filter(action =>
    actionLists.slice(1).every(list => list.some(e => compareActions(action, e)))
  );

  commonActions = commonActions
    .map(action => {
      const mergedVariables: VariableDictionary = Object.entries(action.variables || {})
        .map(([field, variable]) => {
          //compute action per entity
          const actions = actionLists.map(e => e.find(k => compareActions(k, action)));

          //remove the variable if it is not in common
          if (!actions.every(e => e && e.variables && field in e.variables)) {
            return [field, undefined];
          }

          const variables = actions.map(e => e!.variables![field]);

          if (!variables.every(e => variable.type == e.type)) return [field, undefined];

          //compute intersection of variables
          return [field, computeMergedVariable(...variables)];
        })
        .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key as string]: val }) : obj), {});

      if (Object.values(mergedVariables).find(e => e.type == EVariableType.List && !(e as ListVariable).options.length))
        return undefined;

      action = {
        ...action,
        variables: mergedVariables,
      };

      return action;
    })
    .filter(isDefined);

  return commonActions;
}
