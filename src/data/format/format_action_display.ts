import { Action, CustomConfig } from "../../types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { localize } from "../../localize/localize";
import { actionConfig } from "../actions/action_config";
import { formatSelectorDisplay } from "../selectors/format_selector_display";
import { HomeAssistant } from "../../lib/types";


const translationKeyOverlap = (key: string, action: Action): number => {

  const serviceName = computeEntity(action.service);
  if (key.indexOf(serviceName) != -1) key = key.substring(key.indexOf(serviceName) + serviceName.length + 1);

  return Object.keys(action.service_data).reduce((acc, arg) => {
    if (key.indexOf(arg) == -1) return acc;
    let subKey = key.substring(key.indexOf(arg) + arg.length + 1);
    if (subKey == action.service_data[arg]) return acc + key.length + subKey.length + 1;
    return acc;
  }, 0);
};

export const formatActionDisplay = (action: Action, hass: HomeAssistant, customize?: CustomConfig, formatShort = false) => {
  const config = actionConfig(action, customize);

  let actionDisplay = config.name || '';


  if (config?.translation_key && !actionDisplay) {
    let translationKey: string = "";
    if (Array.isArray(config.translation_key)) {
      let translations = config.translation_key;
      translations.sort((a, b) => {
        let overlapA = translationKeyOverlap(a, action);
        let overlapB = translationKeyOverlap(b, action);
        if (overlapA != overlapB) return overlapB - overlapA;
        return a.length - b.length;
      });
      translationKey = translations[0];
    } else translationKey = config.translation_key;

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
        return Object.values(attributes).shift();
      }
      else if (Object.keys(attributes).length) {
        return Object.values(attributes)[0];
      }
    }
  }
  else {
    const domain = computeDomain(action.service);
    const service = computeEntity(action.service);
    if (!actionDisplay) actionDisplay = hass.localize(`component.${domain}.services.${service}.name`);
    if (!actionDisplay && Object.keys(hass.services[domain] || {}).includes(service)) actionDisplay = hass.services[domain][service].name || '';
    if (!actionDisplay) actionDisplay = service.replace(/_/g, ' ');
  }

  return actionDisplay;
}