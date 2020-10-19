import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "custom-card-helpers";
import { StatesConfig } from "../types";
import { alarmControlPanelStates } from "./alarm_control_panel";
import { coverStates } from "./cover";
import { lockStates } from "./lock";


export const standardStates = (entity: HassEntity): StatesConfig | undefined => {
  const domain = computeDomain(entity.entity_id);

  switch (domain) {
    case "alarm_control_panel":
      return alarmControlPanelStates;
    case "binary_sensor":
    case "cover":
      return coverStates;
    case "input_boolean":
    case "switch":
      return ["on", "off"]
    case "lock":
      return lockStates;
    case "person":
      return ["home", "not_home"]
    default:
      return;
  }
}