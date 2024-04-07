import { computeDomain, HomeAssistant, stateIcon } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const binarySensorIcon = (stateObj: HassEntity) => {
  if (stateObj) return stateIcon({ ...stateObj, state: 'off' }) || 'mdi:radiobox-blank';
  else return 'mdi:radiobox-blank';
};

export const sensorIcon = (stateObj: HassEntity) => {
  const deviceClass = stateObj.attributes.device_class || '';
  switch (deviceClass) {
    case 'humidity':
      return 'mdi:water-percent';
    case 'illuminance':
      return 'mdi:brightness-5';
    case 'temperature':
      return 'mdi:thermometer';
    case 'power':
      return 'mdi:flash';
    case 'pressure':
      return 'mdi:gauge';
    case 'signal_strength':
      return 'mdi:wifi';
    default:
      return stateObj.attributes.unit_of_measurement?.includes('°') ? 'mdi:thermometer' : 'mdi:eye';
  }
};

const coverIcon = (stateObj: HassEntity, state?: string) => {
  const closedState = state == 'closed';
  switch (stateObj.attributes.device_class) {
    case 'garage':
      return closedState ? 'mdi:garage' : 'mdi:garage-open';
    case 'door':
      return closedState ? 'mdi:door-closed' : 'mdi:door-open';
    case 'blind':
      return closedState ? 'mdi:blinds' : 'mdi:blinds-open';
    case 'window':
      return closedState ? 'mdi:window-closed' : 'mdi:window-open';
    default:
      return closedState ? 'mdi:window-shutter' : 'mdi:window-shutter-open';
  }
};

export const domainIcons: Record<string, string> = {
  alarm_control_panel: 'mdi:alarm-light-outline',
  automation: 'mdi:playlist-play',
  binary_sensor: 'mdi:radiobox-blank',
  button: 'mdi:gesture-tap-button',
  calendar: 'mdi:calendar',
  camera: 'mdi:camera',
  climate: 'mdi:home-thermometer-outline',
  cover: 'mdi:window-shutter',
  device_tracker: 'mdi:account',
  fan: 'mdi:fan',
  group: 'mdi:google-circles-communities',
  humidifier: 'mdi:air-humidifier',
  input_boolean: 'mdi:drawing',
  input_button: 'mdi:gesture-tap-button',
  input_number: 'mdi:ray-vertex',
  input_select: 'mdi:format-list-bulleted',
  select: 'mdi:format-list-bulleted',
  input_text: 'mdi:textbox',
  lawn_mower: 'mdi:robot-mower',
  light: 'mdi:lightbulb-outline',
  lock: 'mdi:lock-open-outline',
  media_player: 'mdi:cast-connected',
  number: 'mdi:ray-vertex',
  notify: 'mdi:message-text-outline',
  person: 'mdi:account-outline',
  proximity: 'mdi:map-marker-distance',
  remote: 'mdi:remote',
  scene: 'mdi:palette-outline',
  script: 'mdi:file-document',
  sensor: 'mdi:eye',
  sun: 'mdi:white-balance-sunny',
  switch: 'mdi:flash',
  timer: 'mdi:timer',
  vacuum: 'mdi:robot-vacuum',
  water_heater: 'mdi:water-boiler',
};

export const standardIcon = (entity_id: string, hass: HomeAssistant) => {
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
      return 'mdi:folder-outline';
  }
};
