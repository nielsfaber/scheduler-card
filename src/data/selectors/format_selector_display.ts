import { Action, CustomConfig } from "../../types";
import { selectorConfig } from "./selector_config";
import { NumberSelector, SelectSelector } from "../../lib/selector";
import { HomeAssistant } from "../../lib/types";

export const formatSelectorDisplay = (action: Action, hass: HomeAssistant, customize?: CustomConfig) => {
  return Object.fromEntries(
    Object.entries(action.service_data).map(([field, value]) => {
      const selector = selectorConfig(action.service, action.target?.entity_id, field, hass, customize);
      if (!selector) return [field, value];

      if (Object.keys(selector).includes('select') && (selector as SelectSelector).select) {
        const config = (selector as SelectSelector).select;
        if (config?.translation_key) value = hass.localize(config.translation_key.replace('${value}', value)) || value;
      }

      if (Object.keys(selector).includes('number') && (selector as NumberSelector).number) {
        const config = (selector as NumberSelector).number;
        value = Number(value);
        if (typeof config?.scale_factor === 'number') value = value / config.scale_factor;
        if (typeof config?.step === 'number') value = Math.round(value / config.step) * config.step;
        if (config?.unit_of_measurement) return [field, `${value}${config.unit_of_measurement}`];
      }
      return [field, value];
    })
  )
};