import { ActionConfig } from "../types";
import { levelVariable } from "../actionVariables";
import { HassEntity } from "home-assistant-js-websocket";



export function coverActions(entity: HassEntity) {
  const supportedFeatures = entity.attributes.supported_features!;

  let actions: ActionConfig[] = [{
    service: "open_cover",
    icon: coverIconOpen(entity)
  },
  {
    service: "close_cover",
    icon: coverIcon(entity)
  }
  ];

  if (supportedFeatures & 4) {
    actions.push(
      {
        supported_feature: 4,
        service: "set_cover_position",
        variable: levelVariable({
          field: "position",
          min: 0,
          max: 100,
          unit: "%"
        }),
        icon: "ray-vertex"
      })
  }
  return actions;
}


export const coverIcon = (state: HassEntity): string => {
  const deviceClass = state.attributes.device_class!;
  switch (deviceClass) {
    case "garage":
      return "garage";
    case "door":
      return "door-closed";
    case "shutter":
      return "window-shutter";
    case "blind":
      return "blinds";
    case "window":
      return "window-closed";
    default:
      return "window-shutter";
  }
}

export const coverIconOpen = (state: HassEntity): string => {
  const deviceClass = state.attributes.device_class!;
  switch (deviceClass) {
    case "garage":
      return "garage-open";
    case "door":
      return "door-open";
    case "shutter":
      return "window-shutter-open";
    case "blind":
      return "blinds-open";
    case "window":
      return "window-open";
    default:
      return "window-shutter-open";
  }
}