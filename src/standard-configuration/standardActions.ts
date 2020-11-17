import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { alarmControlPanelActions } from './alarm_control_panel';
import { ActionConfig } from '../types';
import { climateActions } from './climate';
import { coverActions } from './cover';
import { fanActions } from './fan';
import { humidifierActions } from './humidifier';
import { inputNumberActions } from './input_number';
import { inputSelectActions } from './input_select';
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

export function standardActions(entity_id: string, hass: HomeAssistant, filterCapabilities = false): ActionConfig[] {
  const domain = computeDomain(entity_id);
  const stateObj = hass.states[entity_id];
  switch (domain) {
    case 'alarm_control_panel':
      return alarmControlPanelActions(hass, stateObj);
    case 'climate':
      return climateActions(hass, stateObj, filterCapabilities);
    case 'cover':
      return coverActions(hass, stateObj);
    case 'fan':
      return fanActions(hass, stateObj);
    case 'group':
      const entities: string[] = stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id) ? stateObj.attributes.entity_id : [];
      const configs = entities.map(e => standardActions(e, hass));
      return groupActions(stateObj, configs);
    case 'humidifer':
      return humidifierActions(hass, stateObj);
    case 'input_boolean':
      return inputBooleanActions(hass, stateObj);
    case 'input_number':
      return inputNumberActions(hass, stateObj);
    case 'input_select':
      return inputSelectActions(hass, stateObj);
    case 'light':
      return lightActions(hass, stateObj);
    case 'lock':
      return lockActions(hass, stateObj);
    case 'media_player':
      return mediaPlayerActions(hass, stateObj);
    case 'scene':
      return sceneActions(hass, stateObj);
    case 'script':
      return scriptActions(hass, stateObj);
    case 'switch':
      return switchActions(hass, stateObj);
    case 'vacuum':
      return vacuumActions(hass, stateObj);
    case 'water_heater':
      return waterHeaterActions(hass, stateObj);

    default:
      return [];
  }
}
