import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

export const waterHeaterModes = (_localize: LocalizeFunc, stateObj?: HassEntity) => {
  if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
    return Array(stateObj.attributes.options).map(val => {
      return { value: String(val) };
    });
  }
  return [];
};

export const waterHeaterActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => [
  {
    service: 'water_heater.set_temperature',
    variables: {
      temperature: levelVariable({
        name: hass.localize('ui.card.weather.attributes.temperature'),
        min: stateObj?.attributes.min_temp !== undefined
          ? stateObj?.attributes.min_temp
          : hass.config.unit_system.temperature.includes('F')
            ? 50
            : 10,
        max: stateObj?.attributes.max_temp !== undefined
          ? stateObj?.attributes.max_temp
          : hass.config.unit_system.temperature.includes('F')
            ? 90
            : 30,
        step: stateObj?.attributes.target_temp_step
          ? stateObj?.attributes.target_temp_step
          : hass.config.unit_system.temperature.includes('F')
            ? 1
            : 0.5,
        unit: hass.config.unit_system.temperature,
      })
    },
    icon: 'hass:thermometer',
    name: localize('services.climate.set_temperature', getLocale(hass)),
    supported_feature: 1,
  },
  {
    service: 'water_heater.set_operation_mode',
    variables: {
      operation_mode: listVariable({
        name: hass.localize('ui.card.water_heater.operation'),
        options: waterHeaterModes(hass.localize, stateObj),
      })
    },
    icon: 'hass:cog-transfer-outline',
    name: localize('services.climate.set_mode', getLocale(hass)),
    supported_feature: 2,
  },
  {
    service: 'water_heater.set_away_mode',
    variables: {
      mode: listVariable({
        name: hass.localize('ui.card.water_heater.away_mode'),
        options: [
          {
            value: 'on',
            name: hass.localize('ui.card.input_boolean.on'),
            icon: 'hass:toggle-switch-outline',
          },
          {
            value: 'off',
            name: hass.localize('ui.card.input_boolean.off'),
            icon: 'hass:toggle-switch-off-outline',
          },
        ],
      })
    },
    icon: 'hass:car-traction-control',
    name: localize('services.water_heater.set_away_mode', getLocale(hass)),
    supported_feature: 4,
  },
];
