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
  alarm_control_panel: 'hass:alarm-light-outline',
  automation: 'hass:playlist-play',
  binary_sensor: 'hass:radiobox-blank',
  calendar: 'hass:calendar',
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
  select: 'hass:format-list-bulleted',
  input_text: 'hass:textbox',
  light: 'hass:lightbulb-outline',
  lock: 'hass:lock-open-outline',
  media_player: 'hass:cast-connected',
  number: 'hass:ray-vertex',
  notify: 'hass:message-text-outline',
  person: 'hass:account-outline',
  proximity: 'hass:map-marker-distance',
  remote: 'hass:remote',
  scene: 'hass:palette-outline',
  script: 'hass:file-document',
  sensor: 'hass:eye',
  sun: 'hass:white-balance-sunny',
  switch: 'hass:flash',
  timer: 'hass:timer',
  vacuum: 'hass:robot-vacuum',
  water_heater: 'hass:water-boiler',
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
      return 'hass:folder-outline';
  }
};
