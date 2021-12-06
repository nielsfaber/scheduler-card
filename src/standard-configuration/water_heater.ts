import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { LocalizeFunc, HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

const waterHeaterModes = (
  localizeFunc: LocalizeFunc,
  stateObj: HassEntity | undefined,
  filterCapabilities: boolean
) => {
  const modeList = [
    {
      value: 'off',
      icon: 'hass:power-off',
      name: localizeFunc('component.water_heater.state._.off'),
    },
    {
      value: 'eco',
      icon: 'hass:leaf',
      name: localizeFunc('component.water_heater.state._.eco'),
    },
    {
      value: 'electric',
      icon: 'hass:lightning-bolt',
      name: localizeFunc('component.water_heater.state._.electric'),
    },
    {
      value: 'gas',
      icon: 'hass:fire',
      name: localizeFunc('component.water_heater.state._.gas'),
    },
    {
      value: 'heat_pump',
      icon: 'hass:hvac',
      name: localizeFunc('component.water_heater.state._.heat_pump'),
    },
    {
      value: 'high_demand',
      icon: 'hass:water-plus-outline',
      name: localizeFunc('component.water_heater.state._.high_demand'),
    },
    {
      value: 'performance',
      icon: 'hass:rocket-launch-outline',
      name: localizeFunc('component.water_heater.state._.performance'),
    },
  ];
  const supportedModes: string[] =
    stateObj && Array.isArray(stateObj.attributes.operation_list) ? stateObj.attributes.operation_list : [];
  return filterCapabilities ? modeList.filter(e => supportedModes.find(m => m === e.value)) : modeList;
};

export const waterHeaterActions = (
  hass: HomeAssistant,
  stateObj: HassEntity | undefined,
  filterCapabilities: boolean
): Action[] => [
  {
    service: 'water_heater.set_temperature',
    variables: {
      temperature: levelVariable({
        name: hass.localize('ui.card.weather.attributes.temperature'),
        min:
          stateObj?.attributes.min_temp !== undefined
            ? stateObj?.attributes.min_temp
            : hass.config.unit_system.temperature.includes('F')
            ? 50
            : 10,
        max:
          stateObj?.attributes.max_temp !== undefined
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
      }),
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
        options: waterHeaterModes(hass.localize, stateObj, filterCapabilities),
      }),
    },
    icon: 'hass:cog-transfer-outline',
    name: localize('services.water_heater.set_operation_mode', getLocale(hass)),
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
      }),
    },
    icon: 'hass:car-traction-control',
    name: localize('services.water_heater.set_away_mode', getLocale(hass)),
    supported_feature: 4,
  },
];

export const waterHeaterStates = (hass: HomeAssistant, stateObj: HassEntity) => {
  const modeList = [
    {
      value: 'off',
      icon: 'hass:power-off',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'off' }, getLocale(hass)),
    },
    {
      value: 'eco',
      icon: 'hass:leaf',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'eco' }, getLocale(hass)),
    },
    {
      value: 'electric',
      icon: 'hass:lightning-bolt',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'electric' }, getLocale(hass)),
    },
    {
      value: 'gas',
      icon: 'hass:fire',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'gas' }, getLocale(hass)),
    },
    {
      value: 'heat_pump',
      icon: 'hass:hvac',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'heat_pump' }, getLocale(hass)),
    },
    {
      value: 'high_demand',
      icon: 'hass:water-plus-outline',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'high_demand' }, getLocale(hass)),
    },
    {
      value: 'performance',
      icon: 'hass:rocket-launch-outline',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: 'performance' }, getLocale(hass)),
    },
  ];
  return listVariable({
    options:
      stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)
        ? modeList.filter(e => stateObj.attributes.hvac_modes.includes(e.value))
        : modeList,
  });
};
