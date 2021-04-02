import { levelVariable, listVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { computeStateDisplay, HomeAssistant, LocalizeFunc } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { localize } from '../localize/localize';

const climateModes = (localizeFunc: LocalizeFunc, stateObj?: HassEntity) => {
  const modeList = [
    {
      value: 'off',
      icon: 'hass:power-off',
      name: localizeFunc('state.climate.off'),
    },
    {
      value: 'heat',
      icon: 'hass:fire',
      name: localizeFunc('state.climate.heat'),
    },
    {
      value: 'cool',
      icon: 'hass:snowflake',
      name: localizeFunc('state.climate.cool'),
    },
    {
      value: 'heat_cool',
      icon: 'hass:thermometer',
      name: localizeFunc('state.climate.heat_cool'),
    },
    {
      value: 'auto',
      icon: 'hass:autorenew',
      name: localizeFunc('state_attributes.climate.auto'),
    },
    {
      value: 'dry',
      icon: 'hass:water-percent',
      name: localizeFunc('state.climate.dry'),
    },
    {
      value: 'fan_only',
      icon: 'hass:fan',
      name: localizeFunc('state.climate.fan_only'),
    },
  ];
  if (stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)) {
    return stateObj.attributes.hvac_modes.map(mode => modeList.find(el => el.value == mode) || { value: mode });
  }
  return modeList;
};

const climatePresets = (localizeFunc: LocalizeFunc, stateObj?: HassEntity) => {
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

  if (stateObj && stateObj.attributes.preset_modes && Array.isArray(stateObj.attributes.preset_modes)) {
    return stateObj.attributes.preset_modes.map(
      preset => presetList.find(el => el.value == preset) || { value: preset }
    );
  }
  return presetList;
};

export const climateActions = (
  hass: HomeAssistant,
  stateObj?: HassEntity,
  filterCapabilities?: boolean
): ActionConfig[] => {
  let hvacModes = climateModes(hass.localize, stateObj);
  if (hvacModes.length == 1) hvacModes = [];

  const tempVariable = levelVariable({
    field: 'temperature',
    name: hass.localize('ui.card.weather.attributes.temperature'),
    min: stateObj?.attributes.min_temp,
    max: stateObj?.attributes.max_temp,
    step: stateObj?.attributes.target_temp_step ? stateObj?.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F') ? 1 : 0.5,
    unit: hass.config.unit_system.temperature,
  });

  const actions: ActionConfig[] = [
    {
      service: 'climate.set_preset_mode',
      variable: listVariable({
        field: 'preset_mode',
        name: hass.localize('ui.card.climate.preset_mode'),
        options: climatePresets(hass.localize, stateObj),
      }),
      icon: 'hass:cloud-download-outline',
      name: localize('services.climate.set_preset_mode', hass.language),
      supported_feature: 16,
    },
  ];

  if (!filterCapabilities || hvacModes.find(e => e.value == 'off')) {
    actions.push({
      service: 'climate.set_hvac_mode',
      service_data: { hvac_mode: 'off' },
      icon: 'hass:power',
      name: hass.localize('ui.card.media_player.turn_off'),
    });
    if (filterCapabilities) hvacModes = hvacModes.filter(e => e.value != 'off');
  }
  if (!filterCapabilities || !hvacModes.find(e => e.value == 'off')) {
    actions.push({
      service: 'climate.turn_off',
      icon: 'hass:power',
      name: hass.localize('ui.card.media_player.turn_off'),
    });
  }

  if (!filterCapabilities || (!hvacModes.find(e => e.value == 'cool') && !hvacModes.find(e => e.value == 'heat'))) {
    actions.push({
      service: 'climate.set_temperature',
      variable: tempVariable,
      icon: 'hass:thermometer',
      name: localize('services.climate.set_temperature', hass.language),
      supported_feature: 1,
    });
  }

  if (!filterCapabilities || hvacModes.find(e => e.value == 'heat')) {
    actions.push({
      service: 'climate.set_temperature',
      service_data: { hvac_mode: 'heat' },
      variable: tempVariable,
      icon: 'hass:fire',
      name: localize('services.climate.set_temperature_hvac_mode_heat', hass.language),
      supported_feature: 1,
    });
    if (filterCapabilities) hvacModes = hvacModes.filter(e => e.value != 'heat');
  }

  if (!filterCapabilities || hvacModes.find(e => e.value == 'cool')) {
    actions.push({
      service: 'climate.set_temperature',
      service_data: { hvac_mode: 'cool' },
      variable: tempVariable,
      icon: 'hass:snowflake',
      name: localize('services.climate.set_temperature_hvac_mode_cool', hass.language),
      supported_feature: 1,
    });
    if (filterCapabilities) hvacModes = hvacModes.filter(e => e.value != 'cool');
  }

  actions.push({
    service: 'climate.set_hvac_mode',
    variable: listVariable({
      field: 'hvac_mode',
      name: hass.localize('ui.card.climate.operation'),
      options: hvacModes,
    }),
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
  if (stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)) {
    return modeList.filter(e => stateObj.attributes.hvac_modes.includes(e.value));
  }
  return modeList;
};