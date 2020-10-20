import { HassEntity } from "home-assistant-js-websocket";
import { levelVariable, listVariable } from "../actionVariables";
import { ActionConfig } from "../types";

export function waterHeaterActions(entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;
  const operationModes = entity.attributes.operation_list;
  const tempVariable = levelVariable({
    field: "temperature",
    min: entity.attributes.min_temp,
    max: entity.attributes.max_temp,
    step: 0.5,
  });

  let actions: ActionConfig[] = [];

  if (supportedFeatures & 1) actions.push({
    service: "set_temperature",
    variable: tempVariable,
    icon: "thermometer",
  })

  if (supportedFeatures & 2) actions.push({
    service: "set_operation_mode",
    variable: listVariable({
      field: "operation_mode",
      options: operationModes.map(e => ({ value: e }))
    }),
    icon: "cog-transfer-outline",
  })

  if (supportedFeatures & 4) actions.push({
    service: "set_away_mode",
    variable: listVariable({
      field: "mode",
      options: [
        { value: "on", icon: "toggle-switch-outline" },
        { value: "off", icon: "toggle-switch-off-outline" },
      ]
    }),
    icon: "car-traction-control",
  })
  return actions;
}