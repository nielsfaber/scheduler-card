import { listSelector } from "./selectors/list_selector";
import { numericSelector } from "./selectors/numeric_selector";
import { computeDomain, computeEntity } from "../lib/entity";
import { Selector, StringSelector } from "../lib/selector";
import { HomeAssistant } from "../lib/types";
import { stateIcon } from "./state_icon";

export const SUPPORTED_CONDITION_DOMAINS = [
  'alarm_control_panel',
  'binary_sensor',
  'climate',
  'calendar',
  'cover',
  'device_tracker',
  'fan',
  'humidifier',
  'input_boolean',
  'input_number',
  'input_select',
  'lawn_mower',
  'light',
  'lock',
  'number',
  'person',
  'proximity',
  'select',
  'sensor',
  'sun',
  'switch',
  'timer',
  'valve',
  'water_heater'
]


export const computeStatesForEntity = (entityId: string, hass: HomeAssistant): Selector => {
  const stateObj = Object.keys(hass.states).includes(entityId) ? hass.states[entityId] : undefined;
  const domain = computeDomain(entityId);
  const attr = stateObj?.attributes || {};

  const computeStateIcons = (states?: string[]) => {
    return states?.map(state => Object({
      value: state,
      icon: stateIcon(entityId, state, hass)
    }));
  };

  switch (domain) {
    case 'alarm_control_panel':
      let modes = ['disarmed', 'triggered'];
      if ((attr.supported_features || 0) & 2) modes = [...modes, 'armed_away'];
      if ((attr.supported_features || 0) & 1) modes = [...modes, 'armed_home'];
      if ((attr.supported_features || 0) & 4) modes = [...modes, 'armed_night'];
      if ((attr.supported_features || 0) & 16) modes = [...modes, 'armed_custom_bypass'];
      if ((attr.supported_features || 0) & 32) modes = [...modes, 'armed_vacation'];
      return listSelector({ options: computeStateIcons(modes), translation_key: 'component.alarm_control_panel.entity_component._.state.${value}' });
    case 'binary_sensor':
      return listSelector({ options: computeStateIcons(['on', 'off']), translation_key: 'component.binary_sensor.entity_component.${deviceClass}.state.${value}' });
    case 'climate':
      return listSelector({ options: computeStateIcons(attr.hvac_modes), translation_key: 'component.climate.entity_component._.state.${value}' });
    case 'calendar':
    case 'fan':
    case 'humidifier':
    case 'input_boolean':
    case 'light':
    case 'switch':
      return listSelector({ options: computeStateIcons(['on', 'off']), translation_key: 'component.switch.entity_component._.state.${value}' });
    case 'cover':
      return listSelector({ options: computeStateIcons(['open', 'closed']), translation_key: 'component.cover.entity_component._.state.${value}' });
    case 'device_tracker':
      return listSelector({ options: computeStateIcons(['home', 'not_home']), translation_key: 'component.device_tracker.entity_component._.state.${value}' });
    case 'input_number':
    case 'number':
      return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit_of_measurement: attr.unit_of_measurement });
    case 'input_select':
    case 'select':
      return listSelector({ options: attr.options });
    case 'lawn_mower':
      return listSelector({ options: computeStateIcons(['mowing', 'paused', 'docked']), translation_key: 'component.lawn_mower.entity_component._.state.${value}' });
    case 'lock':
      return listSelector({ options: computeStateIcons(['locked', 'unlocked']), translation_key: 'component.lock.entity_component._.state.${value}' });
    case 'person':
      const zones = Object.keys(hass.states).filter(e => computeDomain(e) == 'zone').map(computeEntity);
      return listSelector({ options: [...new Set(['home', 'not_home', ...zones])] });
    case 'proximity':
      return numericSelector({ mode: 'box', unit_of_measurement: attr.unit_of_measurement });
    case 'sensor':
      return !isNaN(Number(stateObj?.state))
        ? numericSelector({ mode: 'box', unit_of_measurement: attr.unit_of_measurement })
        : <StringSelector>{ text: {} }
    case 'sun':
      return listSelector({ options: computeStateIcons(['above_horizon', 'below_horizon']), translation_key: 'component.sun.entity_component._.state.${value}' });
    case 'timer':
      return listSelector({ options: computeStateIcons(['active', 'paused', 'idle']), translation_key: 'component.timer.entity_component._.state.${value}' });
    case 'valve':
      return listSelector({ options: computeStateIcons(['open', 'closed']), translation_key: 'component.valve.entity_component._.state.${value}' });
    case 'water_heater':
    case 'climate':
      return listSelector({ options: computeStateIcons(attr.operation_list), translation_key: 'component.climate.entity_component._.state.${value}' });
    default:
      return <StringSelector>{ text: {} };
  }
}