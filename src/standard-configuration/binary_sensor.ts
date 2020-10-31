import { HassEntity } from 'home-assistant-js-websocket';

export const binarySensorIcon = (stateObj?: HassEntity): string => {
  const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
  switch (deviceClass) {
    case 'battery':
      return 'hass:battery-outline';
    case 'cold':
      return 'hass:snowflake';
    case 'connectivity':
      return 'hass:server-network';
    case 'door':
      return 'hass:door-closed';
    case 'garage_door':
      return 'hass:garage';
    case 'gas':
    case 'power':
    case 'problem':
    case 'safety':
    case 'smoke':
      return 'hass:shield-check';
    case 'heat':
      return 'hass:fire';
    case 'light':
      return 'hass:brightness-5';
    case 'lock':
      return 'hass:lock';
    case 'moisture':
      return 'hass:water';
    case 'motion':
      return 'hass:walk';
    case 'occupancy':
    case 'presence':
      return 'hass:home-outline';
    case 'opening':
      return 'hass:square';
    case 'plug':
      return 'hass:power-plug-outline';
    case 'sound':
      return 'hass:music-note';
    case 'vibration':
      return 'hass:vibrate';
    case 'window':
      return 'hass:window-closed';
    default:
      return 'hass:radiobox-blank';
  }
};
