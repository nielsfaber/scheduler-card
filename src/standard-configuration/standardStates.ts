import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { alarmControlPanelStates } from './alarm_control_panel';
import { coverStates } from './cover';
import { lockStates } from './lock';
import { binarySensorStates } from './binary_sensor';
import { inputBooleanStates } from './input_boolean';
import { switchStates } from './switch';
import { personStates } from './person';
import { fanStates } from './fan';
import { lightStates } from './light';
import { climateStates } from './climate';
import { deviceTrackerStates } from './device_tracker';
import { groupStates } from './group';
import { HassEntity } from 'home-assistant-js-websocket';
import { inputSelectStates } from './input_select';
import { selectStates } from './select';
import { Variable } from '../types';
import { isDefined } from '../helpers';
import { inputNumberStates } from './input_number';
import { proximityStates } from './proximity';
import { sensorStates } from './sensor';
import { sunStates } from './sun';
import { waterHeaterStates } from './water_heater';

export function standardStates(entity_id: string, hass: HomeAssistant): Variable | null {
  try {
    const domain = computeDomain(entity_id);
    const stateObj: HassEntity | undefined = hass.states[entity_id];
    if (!stateObj) return null;

    switch (domain) {
      case 'alarm_control_panel':
        return alarmControlPanelStates(hass, stateObj);
      case 'binary_sensor':
        return binarySensorStates(hass, stateObj);
      case 'climate':
        return climateStates(hass, stateObj);
      case 'cover':
        return coverStates(hass, stateObj);
      case 'device_tracker':
        return deviceTrackerStates(hass, stateObj);
      case 'fan':
        return fanStates(hass, stateObj);
      case 'group':
        const entities: string[] =
          stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id)
            ? stateObj.attributes.entity_id
            : [];
        const configs = entities.map(e => standardStates(e, hass)).filter(isDefined);
        return groupStates(hass, stateObj, configs);
      case 'input_boolean':
        return inputBooleanStates(hass, stateObj);
      case 'input_number':
        return inputNumberStates(hass, stateObj);
      case 'input_select':
        return inputSelectStates(hass, stateObj);
      case 'light':
        return lightStates(hass, stateObj);
      case 'lock':
        return lockStates(hass, stateObj);
      case 'person':
        return personStates(hass, stateObj);
      case 'proximity':
        return proximityStates(hass, stateObj);
      case 'select':
        return selectStates(hass, stateObj);
      case 'sensor':
        return sensorStates(hass, stateObj);
      case 'sun':
        return sunStates(hass, stateObj);
      case 'switch':
        return switchStates(hass, stateObj);
      case 'water_heater':
        return waterHeaterStates(hass, stateObj);
      default:
        return null;
    }
  } catch (e) {
    console.error(
      `Scheduler-card failed to load states for '${entity_id}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`
    );
    return null;
  }
}
