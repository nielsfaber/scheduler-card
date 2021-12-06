import { HomeAssistant, computeDomain, computeEntity } from 'custom-card-helpers';
import { CardConfig, Action, ListVariable, EVariableType } from '../../types';
import { standardActions } from '../../standard-configuration/standardActions';
import { matchPattern } from '../match_pattern';
import { isDefined, flatten, omit, pick } from '../../helpers';
import { compareActions } from './compare_actions';
import { computeCommonActions } from './compute_common_actions';
import { computeVariables } from '../variables/compute_variables';
import { HassEntity } from 'home-assistant-js-websocket';
import { computeSupportedFeatures } from '../entities/compute_supported_features';
import { computeActionDisplay } from './compute_action_display';

function parseString(str: string) {
  return str
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();
}

export function computeActions(entity_id: string | string[], hass: HomeAssistant, config: CardConfig): Action[] {
  if (Array.isArray(entity_id)) {
    let actions = entity_id.map(e => computeActions(e, hass, config));
    return computeCommonActions(actions);
  }

  const stateObj = hass.states[entity_id] as HassEntity | undefined;

  //fetch standard actions for entity
  let actions = config.standard_configuration ? standardActions(entity_id, hass) : [];

  //get excluded actions for entity
  const excludedActions: string[] = flatten(
    Object.entries(config.customize)
      .filter(([a]) => matchPattern(a, entity_id))
      .sort((a, b) => b[0].length - a[0].length)
      .map(([, b]) => b.exclude_actions)
      .filter(isDefined)
  );
  if (excludedActions.length) {
    actions = actions.filter(e => !excludedActions.some(a => parseString(computeActionDisplay(e)).includes(a)));
  }

  //get customizations for entity
  const customizedActions: Action[] = flatten(
    Object.entries(config.customize)
      .filter(([a]) => matchPattern(a, entity_id))
      .sort((a, b) => b[0].length - a[0].length)
      .map(([, b]) => b.actions)
      .filter(isDefined)
  );
  if (customizedActions.length) {
    customizedActions.forEach(action => {
      //ensure services have domain prefixed
      if (!computeDomain(action.service).length)
        action = { ...action, service: computeDomain(entity_id) + '.' + computeEntity(action.service) };

      //ensure service call has no entity_id
      if (action.service_data) action = { ...action, service_data: omit(action.service_data, 'entity_id') };
      let res = actions.findIndex(e => compareActions(e, action));
      if (res < 0) {
        //try to find it in unfiltered list of built-in actions
        let allActions = config.standard_configuration ? standardActions(entity_id, hass, false) : [];
        const match = allActions.find(e => compareActions(e, action));
        if (match) {
          actions = [...actions, match];
          res = actions.length - 1;
        }
      }

      if (res >= 0) {
        //standard action should be overwritten
        Object.assign(actions, {
          [res]: { ...actions[res], ...omit(action, 'variables') },
        });

        if (Object.keys(action.variables || {}).length) {
          let variableConfig = actions[res].variables || {};

          //merge variable config
          variableConfig = Object.entries(variableConfig)
            .map(([field, variable]) => {
              return Object.keys(action.variables!).includes(field)
                ? [field, { ...variable, ...action.variables![field] }]
                : [field, action.variables![field]];
            })
            .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key as string]: val }) : obj), {});

          //add new variables
          const newVariables = Object.keys(action.variables!).filter(e => !Object.keys(variableConfig).includes(e));

          variableConfig = {
            ...variableConfig,
            ...computeVariables(pick(action.variables, newVariables)),
          };

          Object.assign(actions, {
            [res]: { ...actions[res], variables: variableConfig },
          });
        }
      } else {
        //add a new action
        action = {
          ...action,
          variables: computeVariables(action.variables),
        };
        actions.push(action);
      }
    });
  }

  //filter by supported_features
  const supportedFeatures = computeSupportedFeatures(stateObj);
  actions = actions.filter(e => !e.supported_feature || e.supported_feature & supportedFeatures);

  //list variable with 1 option is not really a variable
  actions = actions.map(action => {
    if (Object.keys(action.variables || {}).length) {
      Object.keys(action.variables!).forEach(field => {
        if (
          action.variables![field].type == EVariableType.List &&
          (action.variables![field] as ListVariable).options.length == 1
        ) {
          action = {
            ...action,
            service_data: {
              ...action.service_data,
              [field]: (action.variables![field] as ListVariable).options[0].value,
            },
            variables: omit(action.variables!, field),
          };
        }
      });
    }
    return action;
  });

  return actions;
}
