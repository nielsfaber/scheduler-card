import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { alarmControlPanelActions } from './alarm_control_panel';
import { Action } from '../types';
import { climateActions } from './climate';
import { coverActions } from './cover';
import { fanActions } from './fan';
import { humidifierActions } from './humidifier';
import { inputNumberActions } from './input_number';
import { inputSelectActions } from './input_select';
import { selectActions } from './select';
import { lightActions } from './light';
import { lockActions } from './lock';
import { mediaPlayerActions } from './media_player';
import { scriptActions } from './script';
import { vacuumActions } from './vacuum';
import { waterHeaterActions } from './water_heater';
import { groupActions } from './group';
import { inputBooleanActions } from './input_boolean';
import { sceneActions } from './scene';
import { switchActions } from './switch';
import { automationActions } from './automation';
import { notifyActions } from './notify';

export function standardActions(entity_id: string, hass: HomeAssistant, filterCapabilities = true): Action[] {
  try {
    const domain = computeDomain(entity_id);
    const stateObj = hass.states[entity_id];
    switch (domain) {
      case 'alarm_control_panel':
        return alarmControlPanelActions(hass, stateObj);
      case 'automation':
        return automationActions(hass, stateObj);
      case 'climate':
        return climateActions(hass, stateObj, filterCapabilities);
      case 'cover':
        return coverActions(hass, stateObj);
      case 'fan':
        return fanActions(hass, stateObj);
      case 'group':
        const entities: string[] =
          stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id)
            ? stateObj.attributes.entity_id
            : [];
        const configs = entities.map(e => standardActions(e, hass, filterCapabilities));
        return groupActions(hass, stateObj, configs);
      case 'humidifier':
        return humidifierActions(hass, stateObj, filterCapabilities);
      case 'input_boolean':
        return inputBooleanActions(hass, stateObj);
      case 'input_number':
        return inputNumberActions(hass, stateObj);
      case 'input_select':
        return inputSelectActions(hass, stateObj);
      case 'select':
        return selectActions(hass, stateObj);
      case 'light':
        return lightActions(hass, stateObj);
      case 'lock':
        return lockActions(hass, stateObj);
      case 'media_player':
        return mediaPlayerActions(hass, stateObj);
      case 'notify':
        return notifyActions(hass, entity_id);
      case 'scene':
        return sceneActions(hass, stateObj);
      case 'script':
        return scriptActions(hass, stateObj);
      case 'switch':
        return switchActions(hass, stateObj);
      case 'vacuum':
        return vacuumActions(hass, stateObj);
      case 'water_heater':
        return waterHeaterActions(hass, stateObj, filterCapabilities);

      default:
        return [];
    }
  } catch (e) {
    console.error(
      `Scheduler-card failed to load actions for '${entity_id}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`
    );
    return [];
  }
}
