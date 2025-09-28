import { domainIcon } from "./actions/domain_icon";
import { computeDomain } from "../lib/entity";
import { SUPPORTED_CONDITION_DOMAINS } from "./compute_states_for_entity";
import { HomeAssistant } from "../lib/types";
import { matchPattern } from "../lib/patterns";
import { hassLocalize } from "../localize/hassLocalize";
import { CustomConfig } from "../types";


const isSupportedDomain = (domain: string, customConfig: CustomConfig) => {
  let res = SUPPORTED_CONDITION_DOMAINS.includes(domain);
  if (!res && customConfig) {
    return Object.keys(customConfig).map(computeDomain).includes(domain);
  }
  return res;
}

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
    .filter(e => isSupportedDomain(e, config.customize || {}));

  domains = domains.filter(domain => {
    return ((config.include || []).some(e => matchPattern(computeDomain(e), domain)) ||
      Object.keys(config.customize || {}).some(e => matchPattern(computeDomain(e), domain))) &&
      !(config.exclude || []).some(e => matchPattern(e, domain))
  });

  let actionList: listItem[] = domains.map(e => Object({
    key: e,
    name: hassLocalize(`component.${e}.title`, hass, false) || e.replace(/_/g, " "),
    description: "",
    icon: domainIcon(e)
  }));

  return actionList;
};
