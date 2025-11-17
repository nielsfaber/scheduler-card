import { computeDomain } from "../../lib/entity";
import { matchPattern } from "../../lib/patterns";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig } from "../../types";
import { domainIcon } from "../actions/domain_icon";

const FALLBACK_ICON = "mdi:help";

const checkIconPrefix = (icon: string) => {
  if (icon.match(/^[a-z]+\:[a-zA-Z\-]+$/)) return icon;
  return `mdi:${icon}`;
};

export const computeEntityIcon = (entityId: string, customize: CustomConfig | undefined, hass: HomeAssistant) => {
  let customConfig = Object.entries(customize || {})
    .filter(([k, v]) => matchPattern(k, entityId) && v.icon)
    .map(([_k, v]) => v);
  if (customConfig.length) {
    return customConfig.map((e) => checkIconPrefix(e.icon!)).shift()!;
  }

  if (!Object.keys(hass.states).includes(entityId)) {
    return FALLBACK_ICON;
  }

  const stateObj = hass.states[entityId];

  if (stateObj.attributes.icon) return stateObj.attributes.icon;

  const domain = computeDomain(entityId);
  return domainIcon(domain);
};
