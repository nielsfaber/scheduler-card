import { computeDomain, computeEntity } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { hassLocalize } from "../../localize/hassLocalize";
import { Action, CustomConfig } from "../../types";
import { compareActions } from "../actions/compare_actions";
import { parseCustomActions } from "../actions/parse_custom_actions";

export const formatFieldDisplay = (action: Action, field: string, hass: HomeAssistant, customize?: CustomConfig) => {
  const domain = computeDomain(action.service);
  const domainService = computeEntity(action.service);

  let name = hassLocalize(`component.${domain}.services.${domainService}.fields.${field}.name`, hass, false);
  if (
    !name &&
    hass.services[domain] &&
    hass.services[domain][action.service] &&
    hass.services[domain][action.service].fields &&
    hass.services[domain][action.service].fields[field]
  )
    name = String(hass.services[domain][action.service].fields[field].name);

  const entityIds = ["script", "notify"].includes(domain) ? [action.service] : [action.target?.entity_id || []].flat();
  let actionConfig = parseCustomActions(customize || {}, entityIds.length ? entityIds[0] : domain);
  if (actionConfig.length) {
    let res = actionConfig
      .map((customConfig) => {
        if (customConfig.service != action.service || !Object.keys(customConfig.variables || {}).includes(field))
          return null;
        let variableConfig = (customConfig.variables || {})[field];
        return variableConfig.name;
      })
      .filter((e) => e !== undefined);
    if (res.length) return res[0];
  }

  if (!name) name = field.replace(/_/g, " ");

  return name;
};
