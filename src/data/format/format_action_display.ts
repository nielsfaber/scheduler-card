import { Action } from "../../types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { localize } from "../../localize/localize";
import { actionConfig } from "../actions/action_config";
import { formatSelectorDisplay } from "../selectors/format_selector_display";
import { HomeAssistant } from "../../lib/types";


export const formatActionDisplay = (action: Action, hass: HomeAssistant, formatShort = false) => {

  const config = actionConfig(action.service);
  let actionDisplay = '';

  if (config?.translation_key) {
    const translationKey = Array.isArray(config.translation_key)
      ? config.translation_key.filter(e => {
        const sections = e.split(".").slice(4);
        const props = Object.fromEntries(
          sections.map((el, i) => i % 2 == 0 ? [el, sections[i + 1]] : []).filter(el => el.length)
        );
        return Object.keys(props).every(e => Object.keys(action.service_data).includes(e) && action.service_data[e] == props[e]);
      }).reduce((a, b) => a.length > b.length ? a : b)
      : config.translation_key;

    let attributes = formatSelectorDisplay(action, hass);
    actionDisplay = localize(translationKey, hass, Object.keys(attributes).map(e => `{${e}}`), Object.values(attributes));
    if (formatShort) {
      if (Object.keys(attributes).length > 1) {
        const sortAttributes = (fieldA: string, fieldB: string) => {
          const configA = config.fields![fieldA];
          const configB = config.fields![fieldB];
          if (configA.optional && !configB.optional) return 1;
          if (configB.optional && !configA.optional) return -1;
          return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
        }
        attributes = Object.fromEntries(
          Object.entries(attributes).sort(([a,], [b,]) => sortAttributes(a, b))
        )
      }
      return Object.values(attributes).shift();
    }
  }
  else {
    const domain = computeDomain(action.service);
    const service = computeEntity(action.service);

    actionDisplay = hass.localize(`component.${domain}.services.${service}.name`) ||
      hass.services[domain][service].name ||
      service.replace(/_/g, ' ');
  }

  return actionDisplay;
}