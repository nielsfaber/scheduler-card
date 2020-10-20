import { Dictionary, HassAction, ActionElement } from "./types";
import { localize } from "./localize/localize";
import { uniqueId } from "./action";
import { HomeAssistant } from "custom-card-helpers";
import { PrettyPrintName } from "./helpers";

export function formatVariable(variable: string, value: string | number, hass: HomeAssistant) {
  switch (variable) {
    case "position":
      return `${Number(value)}%`;
    case "temperature":
      return `${Number(value)}${hass.config.unit_system.temperature}`;
    case "humidity":
      return `${Number(value)}%`;
    case "brightness":
      return `${Math.round(Number(value) / 2.55)}%`;
    default:
      return `${value}`;
  }
}

export function formatAction(config: ActionElement | HassAction, hass: HomeAssistant) {
  if ("name" in config && config.name) return String(config.name);
  const service = config.service;
  let service_data: Dictionary<any> = { ...config.service_data };

  let translation: string | undefined;
  if (service_data && Object.keys(service_data).length) {
    Object.entries(service_data).forEach(([key, val]) => {
      let id = uniqueId({ service: service, service_data: { [key]: val } });
      let res = localize(`services.${id}`);
      if (res) {
        translation = res;
        delete service_data[key];
      }
    });
  }
  if (!translation && service_data && Object.keys(service_data).length) {
    Object.entries(service_data).forEach(([key]) => {
      let res = localize(`services.${service}_${key}`);
      if (res) translation = res;
    });
  }

  if (!translation) translation = localize(`services.${uniqueId({ service: service })}`) || service;

  const wildcard = translation.match(/\{([^}]+)\}/);
  if (wildcard) {
    let replacement = "";
    if (Object.keys(service_data).length) {
      Object.entries(service_data).forEach(([key, val]) => {
        if (wildcard[1].includes(key))
          replacement = wildcard[1].replace(key, formatVariable(key, val, hass));
      });
    }
    translation = translation.replace(/\{([^}]+)\}/, replacement);
  }
  return PrettyPrintName(translation);
}