import { HassEntity } from "home-assistant-js-websocket";
import { levelVariable, listVariable, listVariableOption } from "../actionVariables";
import { ActionConfig } from "../types";

const modeIcons = {
  normal: "account-outline",
  eco: "leaf",
  away: "car-traction-control",
  boost: "rocket-launch-outline",
  comfort: "car-seat-cooler",
  home: "home-outline",
  sleep: "sleep",
  auto: "autorenew",
  baby: "baby-bottle-outline"
}

export function humidifierActions(entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;
  const operationModes: string[] = entity.attributes.available_modes;

  const humidityVariable = levelVariable({
    field: "humidity",
    min: entity.attributes.min_humidity,
    max: entity.attributes.max_humidity,
    step: 1,
    unit: '%'
  });

  let actions: ActionConfig[] = [];

  actions.push({
    service: "set_humidity",
    variable: humidityVariable
  });

  if (operationModes && operationModes.length > 1 && supportedFeatures & 1) actions.push({
    service: "set_mode",
    variable: listVariable({
      field: "mode",
      options: operationModes.map(e => listVariableOption(e, { icons: modeIcons }))
    })
  });

  return actions;
}