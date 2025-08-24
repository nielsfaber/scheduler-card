import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { Action, CustomConfig } from "../../types";
import { hassLocalize } from "../../localize/hassLocalize";
import { parseCustomActions, parseExcludedActions } from "./parse_custom_actions";
import { formatActionDisplay } from "../format/format_action_display";
import { caseInsensitiveStringCompare } from "../../lib/string_compare";

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

  const domainName = (domain: string) => hassLocalize(`component.${domain}.title`, hass, false) || domain.replace(/_/g, " ");

  const serviceName = (service: string) => hassLocalize(`component.${domain}.services.${service}.name`, hass, false) ||
    hass.services[domain][service].name ||
    service.replace(/_/g, ' ');

  const serviceDescription = (service: string) => hassLocalize(`component.${domain}.services.${service}.description`, hass, false) || hass.services[domain][service].description;

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

  //get excluded actions for entity
  let excludedActions = parseExcludedActions(customize || {}, domain);
  if (excludedActions.length) {
    actionList = actionList.filter(e => !excludedActions.some(a => {
      return caseInsensitiveStringCompare(computeEntity(e.action.service), a) > 0
        || caseInsensitiveStringCompare(formatActionDisplay(e.action, hass, customize), a) > 0
    }));
  }

  let customActions = parseCustomActions(customize || {}, domain);
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
        target: action.target ? action.target : undefined,
        name: action.name,
        icon: action.icon
      }
    })
  });

  return actionList;
};