import { domainIcon } from "./actions/domain_icon";
import { computeDomain } from "../lib/entity";
import { SUPPORTED_CONDITION_DOMAINS } from "./compute_states_for_entity";
import { HomeAssistant } from "../lib/types";
import { matchPattern } from "../lib/patterns";


const isSupportedDomain = (domain: string) => {
  return SUPPORTED_CONDITION_DOMAINS.includes(domain);
};

interface listItem {
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

export const computeConditionDomains = (hass: HomeAssistant, config: entityConfig) => {
  let domains = Object.keys(hass.states)
    .map(e => computeDomain(e))
    .reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], <string[]>[])
    .filter(isSupportedDomain);

  domains = domains.filter(domain => {
    return ((config.include || []).some(e => matchPattern(e, domain)) ||
      Object.keys(config.customize || {}).some(e => matchPattern(e, domain))) &&
      !(config.exclude || []).some(e => matchPattern(e, domain))
  });

  let actionList: listItem[] = domains.map(e => Object({
    key: e,
    name: hass.localize(`component.${e}.title`) || e.replace(/_/g, " "),
    description: "",
    icon: domainIcon(e)
  }));

  return actionList;
};
