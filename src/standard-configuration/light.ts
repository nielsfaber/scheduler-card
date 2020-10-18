import { HassEntity } from "home-assistant-js-websocket";
import { levelVariable } from "../actionVariables";
import { ActionConfig } from "../types";
import { TurnOnAction, TurnOffAction } from "../const";

export function lightActions(entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;

  const brightnessVariable = levelVariable({
    field: "brightness",
    min: 0,
    max: 255,
    unit: '%',
    optional: true
  });

  let actions: ActionConfig[] = [];

  actions.push({ ...TurnOffAction, icon: "lightbulb-off-outline" });

  if (supportedFeatures & 1) actions.push({ ...TurnOnAction, icon: "lightbulb-outline", variable: brightnessVariable });
  else actions.push({ ...TurnOnAction, icon: "lightbulb-outline" });

  return actions;
}