import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { computeDomain, computeEntity } from "../../lib/entity";

interface actionItem {
  key: string,
  name: string,
  description: string,
  icon: string;
}

const serviceByEntityId = (hass: HomeAssistant, domain: string, action: string) => {
  return (
    Object.keys(hass.services).includes(domain) &&
    Object.keys(hass.services[domain]).includes(action) &&
    Object.keys(hass.states).includes(`${domain}.${action}`)
  );
}

export const computeActionsForDomain = (hass: HomeAssistant, domain: string) => {

  const isSupportedAction = (action: string) => {
    if (!Object.keys(supportedActions).includes(domain)) return false;
    let res = Object.keys(supportedActions[domain]).includes(action);
    if (!res && serviceByEntityId(hass, domain, action)) {
      // allow script services by entity_id
      res = Object.keys(supportedActions[domain]).includes('{entity_id}');
    }
    if (!res && Object.keys(supportedActions[domain]).includes('{any}')) {
      // allow all notify services
      res = true;
    }
    // if(!res) {
    //   console.log(`Action ${domain}.${action} is not supported.`);
    // }
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

  let actionList: actionItem[] = services.map(e => Object({
    key: e,
    name: `${domainName(domain)}: ${serviceName(e)}`,
    description: serviceDescription(e),
    icon: domainIcon(domain)
  }));

  return actionList;
};