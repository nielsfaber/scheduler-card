import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from 'custom-card-helpers';
import { levelVariable } from '../data/variables/level_variable';
import { UnitPercent } from '../const';

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

export const sensorStates = (_hass: HomeAssistant, stateObj: HassEntity) => {
  const unit = stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '';
  return levelVariable({
    unit: unit,
    min: unit == UnitPercent ? 0 : undefined,
    max: unit == UnitPercent ? 100 : undefined,
    step: unit == UnitPercent ? 1 : undefined,
  });
}