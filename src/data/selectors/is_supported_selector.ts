import { selectorConfig } from "./selector_config";
import { actionConfig } from "../actions/action_config";
import { HomeAssistant } from "../../lib/types";
import { Action, CustomConfig } from "../../types";


export const isSupportedSelector = (action: Action, field: string, hass: HomeAssistant, customize?: CustomConfig): boolean => {
  const service = action.service;
  const entityId = action.target?.entity_id;
  const config = actionConfig(action, customize);

  if (!config || !config.fields || !Object.keys(config.fields).includes(field)) return false;
  const fieldConfig = config.fields[field];

  if (selectorConfig(service, entityId, field, hass, customize) === null) return false;

  if (Object.keys(action.service_data || {}).includes(field)) {
    //allow modifying a previously set parameter 
    return true;
  }

  if (fieldConfig.supported_features) {
    const entityIds = [entityId || []].flat();
    if (!entityIds.every(e => {
      if (!Object.keys(hass.states).includes(e)) return false;
      const stateObj = hass.states[e];
      return ((stateObj.attributes.supported_features || 0) & fieldConfig.supported_features!) == 1;
    })) return false;
  }

  return true;
};
