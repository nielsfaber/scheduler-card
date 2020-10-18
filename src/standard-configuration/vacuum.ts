import { ActionConfig } from "../types";
import { TurnOnAction } from "../const";
import { HassEntity } from "home-assistant-js-websocket";

export const vacuumActions = function (entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;
  let actions: ActionConfig[] = [];

  if (supportedFeatures & 1) actions.push(TurnOnAction);

  if (supportedFeatures & 8192) actions.push({
    service: "start",
    icon: "play-circle-outline"
  });

  if (supportedFeatures & 4) actions.push({
    service: "start_pause",
    icon: "play-circle-outline"
  });

  return actions;
}