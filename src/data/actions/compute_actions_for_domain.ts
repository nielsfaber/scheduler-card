import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { computeDomain } from "../../lib/entity";
import { Action, CustomConfig } from "../../types";

export interface actionItem {
  key: string,
  name: string,
  description: string,
  icon: string;
  action: Action;
}

// const serviceByEntityId = (hass: HomeAssistant, domain: string, action: string) => {
//   return (
//     Object.keys(hass.services).includes(domain) &&
//     Object.keys(hass.services[domain]).includes(action) &&
//     Object.keys(hass.states).includes(`${domain}.${action}`)
//   );
// }

export const computeActionsForDomain = (hass: HomeAssistant, domain: string, customize?: CustomConfig) => {

  const isSupportedAction = (action: string) => {
    if (!Object.keys(supportedActions).includes(domain)) return false;
    let res = Object.keys(supportedActions[domain]).includes(action);
    if (!res && Object.keys(supportedActions[domain]).includes('{entity_id}')) {
      // allow script/notify services by entity_id
      if (['turn_on', 'turn_off', 'reload', 'toggle', 'test'].includes(action)) res = false; //hidden actions for script entities 
      else res = true;
    }
    return res;
  };

  const services = Object.keys(hass.services).includes(domain)
    ? Object.keys(hass.services[domain]).filter(isSupportedAction)
    : [];

  const domainName = (domain: string) => hass.localize(`component.${domain}.title`) || domain.replace(/_/g, " ");

  const serviceName = (service: string) => hass.localize(`component.${domain}.services.${service}.name`) ||
    hass.services[domain][service].name ||
    service.replace(/_/g, ' ');

  const serviceDescription = (service: string) => hass.localize(`component.${domain}.services.${service}.description`) || hass.services[domain][service].description;

  let actionList: actionItem[] = services.map(e => Object(<actionItem>{
    key: e,
    name: `${domainName(domain)}: ${serviceName(e)}`,
    description: serviceDescription(e),
    icon: domainIcon(domain),
    action: <Action>{
      service: e.includes('.') ? e : `${domain}.${e}`,
      service_data: {},
      target: hass.services[domain][e].target ? {} : undefined
    }
  }));

  let customActions = Object.keys(customize || {}).filter(e => computeDomain(e) == domain).map(e => (customize || {})[e].actions || []).flat();
  customActions.forEach(action => {
    let key = action.service;
    while (actionList.find(e => e.key == key)) key += '_2';

    actionList.push({
      key: key,
      name: action.name || "",
      description: action.name || "",
      icon: action.icon || domainIcon(domain),
      action: <Action>{
        service: action.service.includes('.') ? action.service : `${domain}.${action.service}`,
        service_data: action.service_data || {},
        target: action.target ? {} : undefined,
        name: action.name,
        icon: action.icon
      }
    })
  });

  return actionList;
};