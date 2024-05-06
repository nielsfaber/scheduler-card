import { selectorConfig } from "./selector_config";
import { actionConfig } from "../actions/action_config";
import { HomeAssistant } from "../../lib/types";


export const isSupportedSelector = (service: string, entityId: string | string[] | undefined, field: string, hass: HomeAssistant): boolean => {
  const config = actionConfig(service);

  if (!config || !config.fields || !Object.keys(config.fields).includes(field)) return false;
  const fieldConfig = config.fields[field];

  if (selectorConfig(service, entityId, field, hass) === null) return false;

  if (fieldConfig.supported_features) {
    const entityIds = [entityId || []].flat();
    if (!entityIds.every(e => {
      if (!Object.keys(hass.states).includes(e)) return false;
      const stateObj = hass.states[e];
      if ((!((stateObj.attributes.supported_features || 0) & fieldConfig.supported_features!))) return false;
      return true;
    })) return false;
  }

  return true;
};
