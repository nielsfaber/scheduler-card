import { Action } from "../../types";
import { selectorConfig } from "./selector_config";
import { NumberSelector } from "../../lib/selector";
import { HomeAssistant } from "../../lib/types";

export const formatSelectorDisplay = (action: Action, hass: HomeAssistant) => {
  return Object.fromEntries(
    Object.entries(action.service_data).map(([field, value]) => {
      const selector = selectorConfig(action.service, action.target.entity_id, field, hass);
      if (!selector) return [field, value];

      if (Object.keys(selector).includes('number') && (selector as NumberSelector).number) {
        const config = (selector as NumberSelector).number;
        if (config?.unit_of_measurement) return [field, `${value}${config.unit_of_measurement}`];
      }
      return [field, value];
    })
  )
};