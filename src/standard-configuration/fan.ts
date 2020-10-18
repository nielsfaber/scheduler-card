import { listVariable } from "../actionVariables";
import { ActionConfig } from "../types";
import { HassEntity } from "home-assistant-js-websocket";
import { TurnOnAction, TurnOffAction } from "../const";


export function fanActions(entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;
  const speedModes = entity.attributes.speed_list;


  let actions: ActionConfig[] = [TurnOnAction, TurnOffAction];

  if (supportedFeatures & 1 && speedModes && speedModes.length > 1)
    actions.push(
      {
        service: "set_speed",
        variable: listVariable({
          field: "speed",
          options: speedModes
        })
      });

  if (supportedFeatures & 2)
    actions.push(
      {
        service: "oscillate",
        variable: listVariable({
          field: "speed",
          options: [
            { "value": "True" },
            { "value": "False" }
          ]
        }),
        icon: "arrow-left-right"
      });

  if (supportedFeatures & 4)
    actions.push(
      {
        service: "set_direction",
        variable: listVariable({
          field: "direction",
          options: [
            { "value": "forward" },
            { "value": "reverse" }
          ]
        }),
        icon: "autorenew"
      })

  return actions;
}