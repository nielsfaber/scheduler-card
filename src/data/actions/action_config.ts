import { computeDomain, computeEntity } from "../../lib/entity";
import { matchPattern } from "../../lib/patterns";
import { Action, CustomActionConfig, CustomConfig } from "../../types";
import { ActionConfig, supportedActions } from "../actions/supported_actions";
import { compareActions } from "./compare_actions";


export const actionConfig = (action: Action, customize?: CustomConfig) => {
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

  let entity = action.target?.entity_id;
  if (domain == 'script' || domain == 'notify') entity = entity || action.service;

  const actionConfig: CustomActionConfig[] = Object.entries(customize)
    .filter(([a]) => matchPattern(a, [entity].flat().pop()!))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, b]) => b.actions || [])
    .filter(e => e !== undefined)
    .flat();

  if (actionConfig.length) {
    actionConfig.forEach(customConfig => {
      const match = compareActions(customConfig, action);
      if (!match) return;
      Object.keys(customConfig.variables || {}).forEach(key => {
        config = { ...config, fields: { ...config.fields || {}, [key]: {} } };
      });
      config = {
        ...config,
        name: customConfig.name || config.name,
        icon: customConfig.icon || config.icon,
      };
    })
  }

  return config;
}