import { HassEntity } from 'home-assistant-js-websocket';

export const sensorIcon = (stateObj: HassEntity) => {
  const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
  switch (deviceClass) {
    case 'humidity':
      return 'hass:water-percent';
    case 'illuminance':
      return 'hass:brightness-5';
    case 'temperature':
      return 'hass:thermometer';
    case 'power':
      return 'hass:flash';
    case 'pressure':
      return 'hass:gauge';
    case 'signal_strength':
      return 'hass:wifi';
    default:
      if (stateObj.attributes.unit_of_measurement == '°C') return 'hass:thermometer';
      if (stateObj.attributes.unit_of_measurement == '°F') return 'hass:thermometer';
      return 'hass:eye';
  }
};
