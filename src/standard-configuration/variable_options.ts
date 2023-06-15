import { HomeAssistant } from 'custom-card-helpers';

type IconList = Record<string, Record<string, Record<string, string>>>;

export const variableOptions: IconList = {
  climate: {
    hvac_mode: {
      off: 'component.climate.entity_component._.state.off',
      heat: 'component.climate.entity_component._.state.heat',
      cool: 'component.climate.entity_component._.state.cool',
      heat_cool: 'component.climate.entity_component._.state.heat_cool',
      dry: 'component.climate.entity_component._.state.dry',
      fan_only: 'component.climate.entity_component._.state.fan_only',
    },
    preset_mode: {
      activity: 'state_attributes.climate.preset_mode.activity',
      away: 'state_attributes.climate.preset_mode.away',
      boost: 'state_attributes.climate.preset_mode.boost',
      comfort: 'state_attributes.climate.preset_mode.comfort',
      eco: 'state_attributes.climate.preset_mode.eco',
      home: 'state_attributes.climate.preset_mode.home',
      none: 'state_attributes.climate.preset_mode.none',
      sleep: 'state_attributes.climate.preset_mode.sleep',
    },
  },
  fan: {
    direction: {
      forward: 'ui.card.fan.forward',
      reverse: 'ui.card.fan.reverse',
    },
    oscillating: {
      True: 'state.default.on',
      False: 'state.default.off',
    },
  },
  humidifier: {
    mode: {
      auto: 'state_attributes.humidifier.mode.auto',
      away: 'state_attributes.humidifier.mode.away',
      baby: 'state_attributes.humidifier.mode.baby',
      boost: 'state_attributes.humidifier.mode.boost',
      comfort: 'state_attributes.humidifier.mode.comfort',
      eco: 'state_attributes.humidifier.mode.eco',
      home: 'state_attributes.humidifier.mode.home',
      normal: 'state_attributes.humidifier.mode.normal',
      sleep: 'state_attributes.humidifier.mode.sleep',
    },
  },
  water_heater: {
    operation_mode: {
      off: 'component.water_heater.entity_component._.state.off',
      eco: 'component.water_heater.entity_component._.state.eco',
      electric: 'component.water_heater.entity_component._.state.electric',
      gas: 'component.water_heater.entity_component._.state.gas',
      heat_pump: 'component.water_heater.entity_component._.state.heat_pump',
      high_demand: 'component.water_heater.entity_component._.state.high_demand',
      performance: 'component.water_heater.entity_component._.state.performance',
    },
    away_mode: {
      on: 'state.default.on',
      off: 'state.default.off',
    },
  },
};

export const getVariableOptions = (domain: string, variable: string) => {
  if (domain in variableOptions && variable in variableOptions[domain])
    return Object.keys(variableOptions[domain][variable]);
  return [];
};

export const getVariableOptionName = (domain: string, variable: string, option: string, hass: HomeAssistant) => {
  if (domain in variableOptions && variable in variableOptions[domain] && option in variableOptions[domain][variable])
    return hass.localize(variableOptions[domain][variable][option]);
  return option;
};
