import { computeDomain } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { domainIcon } from "../actions/domain_icon";

const FALLBACK_ICON = 'mdi:help';

export const computeEntityIcon = (entityId: string, hass: HomeAssistant) => {
  if (!Object.keys(hass.states).includes(entityId)) {
    return FALLBACK_ICON;
  }

  const stateObj = hass.states[entityId];

  if (stateObj.attributes.icon) return stateObj.attributes.icon;

  const domain = computeDomain(entityId);
  return domainIcon(domain);

}