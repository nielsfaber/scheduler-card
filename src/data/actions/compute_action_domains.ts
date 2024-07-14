import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { matchPattern } from "../../lib/patterns";
import { computeDomain } from "../../lib/entity";
import { CustomConfig } from "../../types";


const isSupportedDomain = (domain: string, customConfig?: CustomConfig) => {
  let res = Object.keys(supportedActions).includes(domain);
  if (!res && customConfig) {
    return Object.keys(customConfig).map(computeDomain).includes(domain);
  }

  // if(!res) {
  //   console.log(`Domain ${domain} is not supported.`);
  // }
  return res;
};

interface actionItem {
  key: string,
  name: string,
  description: string,
  icon: string;
}


interface entityConfig {
  include?: string[],
  exclude?: string[]
  customize?: CustomConfig
}

export const computeActionDomains = (hass: HomeAssistant, config: entityConfig) => {
  let domains = Object.keys(hass.services).filter(e => isSupportedDomain(e, config.customize));

  domains = domains.filter(domain => {
    return ((config.include || []).map(computeDomain).some(e => matchPattern(e, domain)) ||
      Object.keys(config.customize || {}).map(computeDomain).some(e => matchPattern(e, domain))) &&
      !(config.exclude || []).some(e => matchPattern(e, domain))
  });

  let actionList: actionItem[] = domains.map(e => Object({
    key: e,
    name: hass.localize(`component.${e}.title`) || e.replace(/_/g, " "),
    description: "",
    icon: domainIcon(e)
  }));

  return actionList;
};