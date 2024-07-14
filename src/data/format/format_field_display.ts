import { computeDomain, computeEntity } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { Action, CustomConfig } from "../../types";
import { compareActions } from "../actions/compare_actions";




export const formatFieldDisplay = (action: Action, field: string, hass: HomeAssistant, customize?: CustomConfig) => {
  const domain = computeDomain(action.service);
  const domainService = computeEntity(action.service);

  let name = hass.localize(`component.${domain}.services.${domainService}.fields.${field}.name`);
  if (!name &&
    hass.services[domain] &&
    hass.services[domain][action.service] &&
    hass.services[domain][action.service].fields &&
    hass.services[domain][action.service].fields[field]
  ) name = String(hass.services[domain][action.service].fields[field].name);

  const match = Object.entries(customize || {})
    .filter(([key]) => key == domain || key == action.service)
    .map(([_key, e]) => (e.actions || []).filter(a => compareActions(a, action)))
    .flat()
    .find(e => Object.keys(e.variables).includes(field));

  if (match) name = match.variables[field].name || '';

  if (!name) name = field.replace(/_/g, ' ');

  return name;
};