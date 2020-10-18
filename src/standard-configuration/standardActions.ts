import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "custom-card-helpers";
import { alarmControlPanelActions } from "./alarm_control_panel";
import { ActionConfig } from "../types";
import { climateActions } from "./climate";
import { coverActions } from "./cover";
import { fanActions } from "./fan";
import { humidifierActions } from "./humidifier";
import { inputNumberActions } from "./input_number";
import { inputSelectActions } from "./input_select";
import { lightActions } from "./light";
import { lockActions } from "./lock";
import { mediaPlayerActions } from "./media_player";
import { scriptActions } from "./script";
import { vacuumActions } from "./vacuum";
import { waterHeaterActions } from "./water_heater";
import { TurnOnAction, TurnOffAction } from "../const";


export function standardActions(entity: HassEntity): ActionConfig[] {
  const domain = computeDomain(entity.entity_id);
  const supportedFeatures = entity.attributes.supported_features;

  switch (domain) {
    case "alarm_control_panel":
      return alarmControlPanelActions(entity);
    case "climate":
      return climateActions(entity);
    case "cover":
      return coverActions(entity);
    case "fan":
      return fanActions(entity);
    case "humidifer":
      return humidifierActions(entity);
    case "input_boolean":
    case "switch":
      return [
        { ...TurnOnAction, icon: "toggle-switch-outline" },
        { ...TurnOffAction, icon: "toggle-switch-off-outline" }
      ];
    case "input_number":
      return inputNumberActions(entity);
    case "input_select":
      return inputSelectActions(entity);
    case "light":
      return lightActions(entity);
    case "lock":
      return lockActions;
    case "media_player":
      return mediaPlayerActions(entity);
    case "scene":
      return [{ ...TurnOnAction, icon: "play" }];
    case "script":
      return scriptActions(entity);
    case "vacuum":
      return vacuumActions(entity);
    case "water_heater":
      return waterHeaterActions(entity);

    default:
      return []
  }
}