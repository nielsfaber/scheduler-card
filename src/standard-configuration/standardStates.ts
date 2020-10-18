import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "custom-card-helpers";
import { StatesConfig } from "../types";






export const standardStates = (entity: HassEntity): StatesConfig | undefined => {
  const domain = computeDomain(entity.entity_id);

  switch (domain) {
    case "alarm_control_panel":
      return ["disarmed", "armed_away", "armed_home", "armed_night"]
    case "binary_sensor":
    case "cover":
      return ["open", "closed"]
    case "input_boolean":
    case "switch":
      return ["on", "off"]
    case "lock":
      return ["locked", "unlocked"]
    case "person":
      return ["home", "not_home"]
    default:
      return;
  }
}