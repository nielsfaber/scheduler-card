import { CardConfig, ActionConfig, ListVariableConfig, HassAction, EVariableType } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { omit } from '../helpers';
import { standardActions } from '../standard-configuration/standardActions';
import { uniqueId, equalAction } from './compute_action_id';
import { computeEntityActionConfig, actionElement } from './compute_entity_actions';

export function parseAction(action: HassAction, hass: HomeAssistant, config: CardConfig) {
  const entity = action.entity;
  const service = action.service;
  const service_data = action.service_data || {};

  const actionList = computeEntityActionConfig(entity, hass, config);

  const id = uniqueId({ service: service, service_data: service_data });
  let match = actionList.find(e => uniqueId(e) == id);
  if (!match)
    match = actionList.find(
      e =>
        e.variable &&
        uniqueId(e) == uniqueId({ ...action, service_data: omit(action.service_data, [e.variable.field]) })
    );
  if (!match) {
    const actionList = standardActions(entity, hass);
    match = actionList.find(el => equalAction(el, action));
    if (match && match.variable && action.service_data && match.variable.field in action.service_data) {
      if (match.variable!.type == EVariableType.List) {
        let variable = match.variable as ListVariableConfig;
        const value = action.service_data![variable.field];
        variable = { ...variable, options: [variable.options.find(e => e.value == value) || { value: value }] };
        match = {
          ...match,
          variable: { ...variable },
          service_data: { ...match.service_data, [variable.field]: value },
        };
      }
      //match = { ...match, service_data: omit(action.service_data, [match.variable!.field]) };
    }
  }

  if (match) return actionElement(match);
  const actionCfg: ActionConfig = { service: action.service, service_data: action.service_data };
  return actionElement(actionCfg);
}
