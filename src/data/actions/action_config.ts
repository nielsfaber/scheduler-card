import { computeDomain, computeEntity } from "../../lib/entity";
import { isDefined } from "../../lib/is_defined";
import { Action, CustomConfig } from "../../types";
import { ActionConfig, supportedActions } from "../actions/supported_actions";
import { compareActions } from "./compare_actions";
import { parseCustomActions } from "./parse_custom_actions";


export const actionConfig = (action: Action, customize?: CustomConfig): ActionConfig => {
  const domain = computeDomain(action.service);
  const domainService = computeEntity(action.service);

  let config: ActionConfig = {};

  if (Object.keys(supportedActions).includes(domain)) {
    if (Object.keys(supportedActions[domain]).includes(domainService)) {
      config = { ...config, ...supportedActions[domain][domainService] };
    }
    else if (Object.keys(supportedActions[domain]).includes('{entity_id}')) {
      config = { ...config, ...supportedActions[domain]['{entity_id}'] };
    }
  }

  if (!customize) return config;

  let entity;
  if (['script', 'notify'].includes(domain)) entity = action.service;
  else entity = action.target?.entity_id;
  if (!entity) entity = domain;

  const actionConfig = parseCustomActions(customize, [entity].flat().pop());

  if (actionConfig.length) {
    let res = actionConfig.map(customConfig => {
      const match = compareActions(customConfig, action);
      if (!match) return null;
      let item: ActionConfig = {}; //start with empty config
      Object.keys(customConfig.variables || {}).forEach(key => {
        item = { ...item, fields: { ...item.fields || {}, [key]: {} } };
      });
      return {
        ...item,
        name: customConfig.name || config.name,
        icon: customConfig.icon || config.icon,
        target: customConfig.target || config.target,
      };
    }).filter(isDefined);
    if (res.length && !compareActions(config, action)) return res[0];
  }

  return config;
}