import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable, listVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const waterHeaterModes = (_localize: LocalizeFunc, stateObj?: HassEntity) => {
  if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
    return Array(stateObj.attributes.options).map(val => {
      return { value: String(val) };
    });
  }
  return [];
};

export const waterHeaterActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'water_heater.set_temperature',
    variable: levelVariable({
      field: 'temperature',
      name: hass.localize('ui.card.weather.attributes.temperature'),
      min: stateObj?.attributes.min_temp,
      max: stateObj?.attributes.max_temp,
      step: stateObj?.attributes.target_temp_step ? stateObj?.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F') ? 1 : 0.5,
      unit: hass.config.unit_system.temperature,
    }),
    icon: 'hass:thermometer',
    name: localize('services.climate.set_temperature', hass.language),
    supported_feature: 1,
  },
  {
    service: 'water_heater.set_operation_mode',
    variable: listVariable({
      field: 'operation_mode',
      name: hass.localize('ui.card.water_heater.operation'),
      options: waterHeaterModes(hass.localize, stateObj),
    }),
    icon: 'hass:cog-transfer-outline',
    name: localize('services.climate.set_mode', hass.language),
    supported_feature: 2,
  },
  {
    service: 'water_heater.set_away_mode',
    variable: listVariable({
      field: 'mode',
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
    }),
    icon: 'hass:car-traction-control',
    name: localize('services.water_heater.set_away_mode', hass.language),
    supported_feature: 4,
  },
];
