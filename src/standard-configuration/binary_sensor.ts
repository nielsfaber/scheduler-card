import { HassEntity } from "home-assistant-js-websocket";


export const binarySensorIcon = (state: HassEntity) => {
  const deviceClass = state.attributes.device_class!;
  switch (deviceClass) {
    case "battery":
      return "battery-outline";
    case "cold":
      return "snowflake";
    case "connectivity":
      return "server-network";
    case "door":
      return "door-closed";
    case "garage_door":
      return "hass:garage"
    case "gas":
    case "power":
    case "problem":
    case "safety":
    case "smoke":
      return "shield-check";
    case "heat":
      return "fire";
    case "light":
      return "brightness-5";
    case "lock":
      return "lock";
    case "moisture":
      return "water";
    case "motion":
      return "walk";
    case "occupancy":
    case "presence":
      return "home-outline";
    case "opening":
      return "hass:square";
    case "plug":
      return "hass:power-plug-outline";
    case "sound":
      return "music-note"
    case "vibration":
      return "vibrate";
    case "window":
      return "window-closed";
    default:
      return "radiobox-blank";
  }
};