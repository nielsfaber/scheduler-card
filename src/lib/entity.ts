import { HomeAssistant } from "./types";
import { computeEntityName } from "../data/format/entity_name";


export const computeEntity = (entityId: string): string => entityId.split(".")[1] || "";

export const computeDomain = (entityId: string): string => entityId.split(".")[0] || "";

export const friendlyName = (hass: HomeAssistant, entityId: string): string => {
  // Resolve from the entity's registry context so names match the built-in cards.
  const name = computeEntityName(hass, hass?.states[entityId], undefined);
  if (name) return name;

  return computeEntity(entityId).replace(/_/g, " ");
};