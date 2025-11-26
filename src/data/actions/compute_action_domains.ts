import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { computeDomain } from "../../lib/entity";
import { CustomConfig } from "../../types";
import { hassLocalize } from "../../localize/hassLocalize";
import { entityIncludedByConfig } from "./entity_included_by_config";


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

export interface actionItem {
  key: string,
  name: string,
  description: string,
  icon: string;
}


export interface entityConfig {
  include?: string[],
  exclude?: string[]
  customize?: CustomConfig
}

export const computeActionDomains = (hass: HomeAssistant, config: entityConfig) => {
  let domains = Object.keys(hass.services).filter(e => isSupportedDomain(e, config.customize));

  domains = domains.filter(domain => entityIncludedByConfig(domain, config));

  let actionList = domains.map((e): actionItem => ({
    key: e,
    name: hassLocalize(`component.${e}.title`, hass, false) || e.replace(/_/g, " "),
    description: "",
    icon: domainIcon(e)
  }));

  return actionList;
};