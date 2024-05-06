import { computeEntity } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";



export const computeEntityDisplay = (entityId: string, hass: HomeAssistant) => {
  if (
    Object.keys(hass.states).includes(entityId) &&
    hass.states[entityId].attributes.friendly_name
  ) return hass.states[entityId].attributes.friendly_name;

  return computeEntity(entityId).replace(/_/g, " ");
}