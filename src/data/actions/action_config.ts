import { computeDomain, computeEntity } from "../../lib/entity";
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
    } else if (Object.keys(supportedActions[domain]).includes("{entity_id}")) {
      config = { ...config, ...supportedActions[domain]["{entity_id}"] };
    }
  }

  if (!customize) return config;

  let entity;
  if (["script", "notify"].includes(domain)) entity = action.service;
  else entity = action.target?.entity_id;
  if (!entity) entity = domain;

  const actionConfig = parseCustomActions(customize, [entity].flat().pop());

  if (actionConfig.length) {
    actionConfig.forEach((customConfig) => {
      const match = compareActions(customConfig, action);
      if (!match) return;
      config = {}; //start with empty config
      Object.keys(customConfig.variables || {}).forEach((key) => {
        config = { ...config, fields: { ...(config.fields || {}), [key]: {} } };
      });
      config = {
        ...config,
        name: customConfig.name || config.name,
        icon: customConfig.icon || config.icon,
        target: customConfig.target || config.target,
      };
    });
  }

  return config;
};
