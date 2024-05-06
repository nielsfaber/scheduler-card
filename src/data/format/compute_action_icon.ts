import { Action } from "../../types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { serviceIcons } from "./service_icons";
import { HomeAssistant } from "../../lib/types";

const FALLBACK_ICON = 'mdi:flash';

export const computeActionIcon = (action: Action, _hass: HomeAssistant): string => {
  const domain = computeDomain(action.service);
  const domainService = computeEntity(action.service);

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