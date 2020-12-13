import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable, listVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const humidifierModes = (localizeFunc: LocalizeFunc, stateObj?: HassEntity) => {
  const modeList = [
    {
      value: 'normal',
      name: localizeFunc('state_attributes.humidifier.mode.normal'),
      icon: 'hass:account-outline',
    },
    {
      value: 'eco',
      name: localizeFunc('state_attributes.humidifier.mode.eco'),
      icon: 'hass:leaf',
    },
    {
      value: 'away',
      name: localizeFunc('state_attributes.humidifier.mode.away'),
      icon: 'car-traction-control',
    },
    {
      value: 'boost',
      name: localizeFunc('state_attributes.humidifier.mode.boost'),
      icon: 'rocket-launch-outline',
    },
    {
      value: 'comfort',
      name: localizeFunc('state_attributes.humidifier.mode.comfort'),
      icon: 'car-seat-cooler',
    },
    {
      value: 'home',
      name: localizeFunc('state_attributes.humidifier.mode.home'),
      icon: 'home-outline',
    },
    {
      value: 'sleep',
      name: localizeFunc('state_attributes.humidifier.mode.sleep'),
      icon: 'account-sleep',
    },
    {
      value: 'auto',
      name: localizeFunc('state_attributes.humidifier.mode.auto'),
      icon: 'autorenew',
    },
    {
      value: 'baby',
      name: localizeFunc('state_attributes.humidifier.mode.baby'),
      icon: 'baby-bottle-outline',
    },
  ];
  if (stateObj && stateObj.attributes.operation_list && Array.isArray(stateObj.attributes.operation_list)) {
    return stateObj.attributes.operation_list.map(mode => modeList.find(el => el.value == mode) || { value: mode });
  }
  return modeList;
};

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
      step: stateObj?.attributes.target_temp_step || hass.config.unit_system.temperature.includes('F') ? 1 : 0.5,
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
