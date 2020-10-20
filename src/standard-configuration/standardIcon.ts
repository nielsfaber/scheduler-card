import { HassEntity } from "home-assistant-js-websocket";
import { computeDomain } from "custom-card-helpers";
import { binarySensorIcon } from "./binary_sensor";
import { coverIcon } from "./cover";
import { sensorIcon } from "./sensor";

export const domainIcons = {
  alarm_control_panel: "alarm-light-outline",
  automation: "playlist-play",
  binary_sensor: "radiobox-blank",
  camera: "camera",
  climate: "home-thermometer-outline",
  cover: "window-shutter",
  device_tracker: "account",
  fan: "fan",
  group: "google-circles-communities",
  humidifier: "air-humidifier",
  input_boolean: "drawing",
  input_number: "ray-vertex",
  input_select: "format-list-bulleted",
  input_text: "textbox",
  light: "lightbulb-outline",
  lock: "lock-open-outline",
  media_player: "cast-connected",
  notify: "comment-alert",
  person: "account-outline",
  remote: "remote",
  scene: "palette-outline",
  script: "file-document",
  sensor: "eye",
  switch: "flash",
  timer: "timer",
  vacuum: "robot-vacuum",
  water_heater: "water-boiler",
};

export const standardIcon = (entity: HassEntity): string => {
  const domain = computeDomain(entity.entity_id);

  switch (domain) {
    case "binary_sensor":
      return binarySensorIcon(entity);
    case "cover":
      return coverIcon(entity);
    case "sensor":
      return sensorIcon(entity);
    default:
      if (domain in domainIcons) return domainIcons[domain];
      return "folder-outline";
  }
}