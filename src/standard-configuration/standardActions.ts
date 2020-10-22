import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain, HomeAssistant } from "custom-card-helpers";
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
import { groupActions } from "./group";


export function standardActions(entity_id: string, hass: HomeAssistant): ActionConfig[] {
  const domain = computeDomain(entity_id);
  const stateObj = hass.states[entity_id];
  if (!stateObj) return []; //entity does not exist

  switch (domain) {
    case "alarm_control_panel":
      return alarmControlPanelActions(stateObj);
    case "climate":
      return climateActions(entity_id, hass);
    case "cover":
      return coverActions(stateObj);
    case "fan":
      return fanActions(stateObj);
    case "group":
      const entities: string[] = stateObj.attributes.entity_id! || [];
      const configs = entities.map(e => standardActions(e, hass));
      return groupActions(stateObj, configs);
    case "humidifer":
      return humidifierActions(stateObj);
    case "input_boolean":
      return [
        { ...TurnOnAction, icon: "flash" },
        { ...TurnOffAction, icon: "flash-off" }
      ];
    case "input_number":
      return inputNumberActions(stateObj);
    case "input_select":
      return inputSelectActions(stateObj);
    case "light":
      return lightActions(stateObj);
    case "lock":
      return lockActions;
    case "media_player":
      return mediaPlayerActions(stateObj);
    case "scene":
      return [{ ...TurnOnAction, icon: "play" }];
    case "script":
      return scriptActions(stateObj);
    case "switch":
      return [
        { ...TurnOnAction, icon: "flash" },
        { ...TurnOffAction, icon: "flash-off" }
      ];
    case "vacuum":
      return vacuumActions(stateObj);
    case "water_heater":
      return waterHeaterActions(stateObj);

    default:
      return []
  }
}