import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { binarySensorIcon } from './binary_sensor';
import { coverIcon } from './cover';
import { sensorIcon } from './sensor';

export const domainIcons = {
  alarm_control_panel: 'hass:alarm-light-outline',
  automation: 'hass:playlist-play',
  binary_sensor: 'hass:radiobox-blank',
  camera: 'hass:camera',
  climate: 'hass:home-thermometer-outline',
  cover: 'hass:window-shutter',
  device_tracker: 'hass:account',
  fan: 'hass:fan',
  group: 'hass:google-circles-communities',
  humidifier: 'hass:air-humidifier',
  input_boolean: 'hass:drawing',
  input_number: 'hass:ray-vertex',
  input_select: 'hass:format-list-bulleted',
  input_text: 'hass:textbox',
  light: 'hass:lightbulb-outline',
  lock: 'hass:lock-open-outline',
  media_player: 'hass:cast-connected',
  notify: 'hass:message-text-outline',
  person: 'hass:account-outline',
  remote: 'hass:remote',
  scene: 'hass:palette-outline',
  script: 'hass:file-document',
  sensor: 'hass:eye',
  switch: 'hass:flash',
  timer: 'hass:timer',
  vacuum: 'hass:robot-vacuum',
  water_heater: 'hass:water-boiler',
};

export function standardIcon(entity_id: string, hass: HomeAssistant): string {
  const domain = computeDomain(entity_id);
  const stateObj = hass.states[entity_id];

  switch (domain) {
    case 'binary_sensor':
      return binarySensorIcon(stateObj);
    case 'cover':
      return coverIcon(stateObj);
    case 'sensor':
      return sensorIcon(stateObj);
    default:
      if (domain in domainIcons) return domainIcons[domain];
      return 'hass:folder-outline';
  }
}
