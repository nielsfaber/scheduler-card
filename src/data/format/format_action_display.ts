import { Action, CustomConfig } from "../../types";
import { computeDomain, computeEntity } from "../../lib/entity";
import { localize } from "../../localize/localize";
import { actionConfig } from "../actions/action_config";
import { formatSelectorDisplay } from "../selectors/format_selector_display";
import { HomeAssistant } from "../../lib/types";
import { hassLocalize } from "../../localize/hassLocalize";
import { isDefined } from "../../lib/is_defined";
import { selectorConfig } from "../selectors/selector_config";

const subStringPattern = /\[([^\]]+)\]/;
const wildCardPattern = /\{([^\}]+)\}/;
const MAX_RECURSION_DEPTH = 100;

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

export const formatActionDisplay = (
  action: Action,
  hass: HomeAssistant,
  customize?: CustomConfig,
  formatShort = false,
  eraseHtmlTags = false
) => {
  const config = actionConfig(action, customize);

  let actionDisplay = config.name || "";
  let attributes: Record<string, any> = Object.fromEntries(
    Object.entries(action.service_data)
      .filter(([_, value]) => isDefined(value))
      .map(([field, value]) => {
        const selector = selectorConfig(action.service, action.target?.entity_id, field, hass, customize);
        if (!selector) return [field, null];
        return [field, formatSelectorDisplay(value, selector, hass)];
      })
      .filter(([_, value]) => isDefined(value))
  );

  if (formatShort) {
    // only for timeslot editor
    if (Object.keys(attributes).length > 1) {
      const sortAttributes = (fieldA: string, fieldB: string) => {
        const configA = (!!config.fields && config.fields[fieldA]) || {};
        const configB = (!!config.fields && config.fields[fieldB]) || {};
        if (configA?.optional && !configB.optional) return 1;
        if (configB?.optional && !configA.optional) return -1;
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      };
      attributes = Object.fromEntries(Object.entries(attributes).sort(([a], [b]) => sortAttributes(a, b)));
      return Object.values(attributes).join(", ");
    } else if (Object.keys(attributes).length) {
      return Object.values(attributes)[0];
    }
  }

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

    actionDisplay = localize(
      translationKey,
      hass,
      Object.keys(attributes).map((e) => `{${e}}`),
      Object.values(attributes)
    );
  } else {
    const domain = computeDomain(action.service);
    const service = computeEntity(action.service);
    if (!actionDisplay) actionDisplay = hassLocalize(`component.${domain}.services.${service}.name`, hass, false);
    if (!actionDisplay && Object.keys(hass.services[domain] || {}).includes(service))
      actionDisplay = hass.services[domain][service].name || "";
    if (!actionDisplay) actionDisplay = service.replace(/_/g, " ");
  }

  let matchedSubString: RegExpExecArray | null;
  let it = 0;
  while ((matchedSubString = subStringPattern.exec(actionDisplay)) && it < MAX_RECURSION_DEPTH) {
    it++;
    let matchedWildCard = matchedSubString[1].match(wildCardPattern);
    if (
      matchedWildCard &&
      Object.keys(action.service_data || {}).includes(matchedWildCard[1]) &&
      Object.keys(attributes).includes(matchedWildCard[1])
    ) {
      actionDisplay = actionDisplay.replace(
        matchedSubString[0],
        matchedSubString[1].replace(matchedWildCard[0], attributes[matchedWildCard[1]])
      );
    } else {
      actionDisplay = actionDisplay.replace(matchedSubString[0], "");
    }
  }

  let matchedWildCard: RegExpExecArray | null;
  it = 0;
  while ((matchedWildCard = wildCardPattern.exec(actionDisplay)) && it < MAX_RECURSION_DEPTH) {
    it++;
    if (Object.keys(attributes).includes(matchedWildCard[1])) {
      actionDisplay = actionDisplay.replace(matchedWildCard[0], attributes[matchedWildCard[1]]);
    } else {
      actionDisplay = actionDisplay.replace(matchedWildCard[0], "");
    }
  }

  if (eraseHtmlTags && /<.+?>/g.exec(actionDisplay) !== null) {
    let htmlContent = new DOMParser().parseFromString(actionDisplay, "text/html");
    actionDisplay = htmlContent.body.textContent || "";
  }
  return actionDisplay;
};
