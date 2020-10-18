import { ActionConfig } from "../types";
import { HassEntity } from "home-assistant-js-websocket";

export const alarmControlPanelActions = (entity: HassEntity) => {
  const supportedFeatures = entity.attributes.supported_features!;

  let actions: ActionConfig[] = [{
    service: "alarm_disarm",
    icon: "lock-open-variant-outline"
  }];

  if (supportedFeatures & 1) actions.push({
    service: "alarm_arm_home",
    icon: "home-outline"
  });

  if (supportedFeatures & 2) actions.push({
    service: "alarm_arm_away",
    icon: "exit-run"
  });

  if (supportedFeatures & 4) actions.push({
    service: "alarm_arm_night",
    icon: "power-sleep"
  });

  if (supportedFeatures & 16) actions.push({
    service: "alarm_arm_custom_bypass",
    icon: "shield-lock-outline"
  });

  return actions;
}