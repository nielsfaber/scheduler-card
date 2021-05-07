
import { Action } from '../types';
import { computeStateDisplay, HomeAssistant, LocalizeFunc } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';

const climateModes = (localizeFunc: LocalizeFunc, stateObj: HassEntity | undefined, filterCapabilities: boolean) => {
  const modeList = [
    {
      value: 'off',
      icon: 'hass:power-off',
      name: localizeFunc('state_attributes.climate.hvac_action.off'),
    },
    {
      value: 'heat',
      icon: 'hass:fire',
      name: localizeFunc('state_attributes.climate.hvac_action.heating'),
    },
    {
      value: 'cool',
      icon: 'hass:snowflake',
      name: localizeFunc('state_attributes.climate.hvac_action.cooling'),
    },
    {
      value: 'heat_cool',
      icon: 'hass:thermometer',
    },
    {
      value: 'auto',
      icon: 'hass:autorenew',
    },
    {
      value: 'dry',
      icon: 'hass:water-percent',
      name: localizeFunc('state_attributes.climate.hvac_action.drying'),
    },
    {
      value: 'fan_only',
      icon: 'hass:fan',
      name: localizeFunc('state_attributes.climate.hvac_action.fan'),
    },
  ];
  const supportedModes: string[] = stateObj && Array.isArray(stateObj.attributes.hvac_modes) ? stateObj.attributes.hvac_modes : [];
  return filterCapabilities
    ? modeList.filter(e => supportedModes.find(m => m === e.value))
    : modeList;
};

const climatePresets = (localizeFunc: LocalizeFunc, stateObj: HassEntity | undefined, filterCapabilities: boolean) => {
  const presetList = [
    {
      value: 'none',
      name: localizeFunc('state_attributes.climate.preset_mode.none'),
      icon: 'hass:cancel',
    },
    {
      value: 'eco',
      name: localizeFunc('state_attributes.climate.preset_mode.eco'),
      icon: 'hass:leaf',
    },
    {
      value: 'away',
      name: localizeFunc('state_attributes.climate.preset_mode.away'),
      icon: 'hass:car-traction-control',
    },
    {
      value: 'boost',
      name: localizeFunc('state_attributes.climate.preset_mode.boost'),
      icon: 'hass:rocket-launch-outline',
    },
    {
      value: 'comfort',
      name: localizeFunc('state_attributes.climate.preset_mode.comfort'),
      icon: 'hass:car-seat-cooler',
    },
    {
      value: 'home',
      name: localizeFunc('state_attributes.climate.preset_mode.home'),
      icon: 'hass:home-outline',
    },
    {
      value: 'sleep',
      name: localizeFunc('state_attributes.climate.preset_mode.sleep'),
      icon: 'hass:sleep',
    },
    {
      value: 'activity',
      name: localizeFunc('state_attributes.climate.preset_mode.activity'),
      icon: 'hass:account-alert-outline',
    },
  ];
  const supportedPresets: string[] = stateObj && Array.isArray(stateObj.attributes.preset_modes) ? stateObj.attributes.preset_modes : [];
  return filterCapabilities
    ? presetList.filter(e => supportedPresets.find(m => m === e.value) && e.value != 'none')
    : presetList;
};

export const climateActions = (hass: HomeAssistant, stateObj: HassEntity | undefined, filterCapabilities: boolean): Action[] => {
  let hvacModes = climateModes(hass.localize, stateObj, filterCapabilities);
  const supportedModes = hvacModes.map(e => e.value);

  if (hvacModes.length == 1) hvacModes = [];

  const tempVariable = levelVariable({
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
  });

  const actions: Action[] = [
    {
      service: 'climate.set_preset_mode',
      variables: {
        preset_mode: listVariable({
          name: hass.localize('ui.card.climate.preset_mode'),
          options: climatePresets(hass.localize, stateObj, filterCapabilities),
        })
      },
      icon: 'hass:cloud-download-outline',
      name: localize('services.climate.set_preset_mode', hass.language),
      supported_feature: 16,
    },
  ];

  if (supportedModes.includes('off') || !filterCapabilities)
    actions.push({
      service: 'climate.set_hvac_mode',
      service_data: { hvac_mode: 'off' },
      icon: 'hass:power',
      name: hass.localize('ui.card.vacuum.actions.turn_off'),
    });

  if (!supportedModes.includes('off') || !filterCapabilities)
    actions.push({
      service: 'climate.turn_off',
      icon: 'hass:power',
      name: hass.localize('ui.card.vacuum.actions.turn_off'),
    });

  if (supportedModes.includes('heat') || !filterCapabilities)
    actions.push({
      service: 'climate.set_temperature',
      service_data: { hvac_mode: 'heat' },
      variables: {
        temperature: tempVariable,
      },
      icon: 'hass:fire',
      name: localize('services.climate.set_temperature_hvac_mode_heat', hass.language),
      supported_feature: 1,
    });

  if (supportedModes.includes('cool') || !filterCapabilities)
    actions.push({
      service: 'climate.set_temperature',
      service_data: { hvac_mode: 'cool' },
      variables: {
        temperature: tempVariable,
      },
      icon: 'hass:snowflake',
      name: localize('services.climate.set_temperature_hvac_mode_cool', hass.language),
      supported_feature: 1,
    });

  if ((!supportedModes.includes('cool') && !supportedModes.includes('heat')) || !filterCapabilities)
    actions.push({
      service: 'climate.set_temperature',
      variables: {
        temperature: tempVariable
      },
      icon: 'hass:thermometer',
      name: localize('services.climate.set_temperature', hass.language),
      supported_feature: 1,
    });

  if (supportedModes.includes('heat_cool') || !filterCapabilities)
    actions.push({
      service: 'climate.set_temperature',
      service_data: { hvac_mode: 'heat_cool' },
      variables: {
        target_temp_low: levelVariable(tempVariable, { name: hass.localize('ui.panel.lovelace.editor.card.generic.minimum') }),
        target_temp_high: levelVariable(tempVariable, { name: hass.localize('ui.panel.lovelace.editor.card.generic.maximum') }),
      },
      icon: 'hass:fire',
      name: localize('services.climate.set_temperature_hvac_mode_heat_cool', hass.language),
      supported_feature: 2,
    });

  if (filterCapabilities) hvacModes = hvacModes.filter(e => !['off', 'heat', 'cool', 'heat_cool'].includes(e.value));
  if (hvacModes.length)
    actions.push({
      service: 'climate.set_hvac_mode',
      variables: {
        hvac_mode: listVariable({
          name: hass.localize('ui.card.climate.operation'),
          options: hvacModes,
        })
      },
      icon: 'hass:cog-transfer-outline',
      name: localize('services.climate.set_hvac_mode', hass.language),
    });

  return actions;
};

export const climateStates = (hass: HomeAssistant, stateObj: HassEntity) => {
  const modeList = [
    {
      value: 'off',
      icon: 'hass:power-off',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "off" }, hass.language),
    },
    {
      value: 'heat',
      icon: 'hass:fire',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "heat" }, hass.language),
    },
    {
      value: 'cool',
      icon: 'hass:snowflake',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "cool" }, hass.language),
    },
    {
      value: 'heat_cool',
      icon: 'hass:thermometer',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "heat_cool" }, hass.language),
    },
    {
      value: 'auto',
      icon: 'hass:autorenew',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "auto" }, hass.language),
    },
    {
      value: 'dry',
      icon: 'hass:water-percent',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "dry" }, hass.language),
    },
    {
      value: 'fan_only',
      icon: 'hass:fan',
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "fan_only" }, hass.language),
    },
  ];
  return listVariable({
    options: stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)
      ? modeList.filter(e => stateObj.attributes.hvac_modes.includes(e.value))
      : modeList
  })
};