import { computeEntity } from "../../lib/entity";
import { isDefined } from "../../lib/is_defined";
import { matchPattern } from "../../lib/patterns";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig } from "../../types";
import { computeEntityName } from "./entity_name";



export const computeEntityDisplay = (entityId: string, hass: HomeAssistant, customize?: CustomConfig): string => {
  const customNameConfig = Object.entries(customize || {}).filter(([k, v]) => matchPattern(k, entityId) && v.name).map(([_k, v]) => v.name);
  const stateObj = hass.states[entityId];

  const customName = customNameConfig.filter(isDefined)[0];
  if (customName !== undefined) {
    // May be a structured name, which has to be resolved from the registry
    // rather than used as-is.
    const resolved = computeEntityName(hass, stateObj, customName);
    if (resolved) return resolved;
  }

  const entityName = computeEntityName(hass, stateObj, undefined);
  if (entityName) return entityName;

  return computeEntity(entityId).replace(/_/g, " ");
}