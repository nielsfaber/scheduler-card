import { computeDomain, computeEntity } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";




export const formatFieldDisplay = (service: string, field: string, hass: HomeAssistant) => {
  const domain = computeDomain(service);
  const domainService = computeEntity(service);

  return hass.localize(`component.${domain}.services.${domainService}.fields.${field}.name`)
    || hass.services[domain][service].fields[field].name
    || field.replace(/_/g, ' ');
};