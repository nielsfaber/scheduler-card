import { supportedActions } from "./supported_actions";
import { domainIcon } from "./domain_icon";
import { HomeAssistant } from "../../lib/types";
import { CardConfig } from "../../types";
import { matchPattern } from "../../lib/patterns";


const isSupportedDomain = (domain: string) => {
  const res = Object.keys(supportedActions).includes(domain);
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
  customize?: Record<string, any>
}

export const computeActionDomains = (hass: HomeAssistant, config: entityConfig) => {
  let domains = Object.keys(hass.services).filter(isSupportedDomain);

  domains = domains.filter(domain => {
    return ((config.include || []).some(e => matchPattern(e, domain)) ||
      Object.keys(config.customize || {}).some(e => matchPattern(e, domain))) &&
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