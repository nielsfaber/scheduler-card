import { computeEntity } from "../../lib/entity";
import { isDefined } from "../../lib/is_defined";
import { matchPattern } from "../../lib/patterns";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig } from "../../types";

export const computeEntityDisplay = (entityId: string, hass: HomeAssistant, customize?: CustomConfig): string => {
  const customNameConfig = Object.entries(customize || {})
    .filter(([k, v]) => matchPattern(k, entityId) && v.name)
    .map(([_k, v]) => v.name);
  if (customNameConfig.filter(isDefined).length) return customNameConfig.filter(isDefined)[0];
  else if (Object.keys(hass.states).includes(entityId) && hass.states[entityId].attributes.friendly_name)
    return hass.states[entityId].attributes.friendly_name;

  return computeEntity(entityId).replace(/_/g, " ");
};
