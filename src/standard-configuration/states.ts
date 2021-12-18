import { numericAttribute, stringAttribute } from './attribute';
import { VariableConfig } from './variables';

const onOffType = { options: ['on', 'off'] };

export const statesList: Record<string, VariableConfig> = {
  alarm_control_panel: {
    template: stateObj => {
      let modes = ['disarmed', 'triggered'];
      const supported = numericAttribute(stateObj, 'supported_features') || 0;
      if (supported & 2) modes = [...modes, 'armed_away'];
      if (supported & 1) modes = [...modes, 'armed_home'];
      if (supported & 4) modes = [...modes, 'armed_night'];
      if (supported & 16) modes = [...modes, 'armed_custom_bypass'];
      return { options: modes };
    },
  },
  binary_sensor: onOffType,
  climate: {
    options: 'hvac_modes',
  },
  cover: { options: ['open', 'closed'] },
  device_tracker: { options: ['home', 'not_home'] },
  fan: onOffType,
  humidifier: onOffType,
  input_boolean: onOffType,
  input_number: {
    min: 'min',
    max: 'max',
    unit: 'unit_of_measurement',
    step: 'step',
  },
  input_select: {
    options: 'options',
  },
  light: onOffType,
  lock: { options: ['locked', 'unlocked'] },
  person: { options: ['home', 'not_home'] },
  proximity: {
    unit: 'unit_of_measurement',
  },
  select: {
    options: 'options',
  },
  sensor: {
    template: stateObj =>
      stateObj && !isNaN(Number(stateObj.state))
        ? stringAttribute(stateObj, 'unit_of_measurement') == '%'
          ? {
              min: 0,
              max: 100,
              unit: '%',
              step: 1,
            }
          : { unit: 'unit_of_measurement' }
        : {},
  },
  sun: { options: ['below_horizon', 'above_horizon'] },
  switch: onOffType,
  water_heater: {
    options: 'operation_list',
  },
};
