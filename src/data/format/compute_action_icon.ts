import { Action, CustomConfig } from "../../types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { serviceIcons } from "./service_icons";
import { actionConfig } from "../actions/action_config";

const FALLBACK_ICON = 'mdi:flash';

const checkIconPrefix = (icon: string) => {
  if (icon.match(/^[a-z]+\:[a-zA-Z]+$/)) return icon;
  return `mdi:${icon}`;
}

export const computeActionIcon = (action: Action, customize?: CustomConfig): string => {
  const config = actionConfig(action, customize);
  const domain = computeDomain(action.service);
  const domainService = computeEntity(action.service);

  if (config.icon) return checkIconPrefix(config.icon);

  if (!Object.keys(serviceIcons).includes(domain) || !Object.keys(serviceIcons[domain].services).includes(domainService)) return FALLBACK_ICON;

  if (serviceIcons[domain].attributes !== undefined) {
    let config = serviceIcons[domain].attributes!;
    const key = Object.keys(config).find(e => Object.keys(action.service_data).includes(e));
    if (key && Object.keys(config[key]).includes(action.service_data[key])) {
      return config[key][action.service_data[key]];
    }
  }

  return serviceIcons[domain].services[domainService];
};