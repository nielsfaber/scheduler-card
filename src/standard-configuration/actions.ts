import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable } from '../data/variables/level_variable';
import { listAttribute, numericAttribute } from './attribute';
import { VariableConfig } from './variables';
import { computeSupportedFeatures } from '../data/entities/compute_supported_features';
import { isDefined } from '../helpers';
import { hasOwnProperty } from '@formatjs/intl-utils';

export type ActionItem = {
  supported_feature?: number | ((stateObj?: HassEntity) => number);
  service?: string;
  service_data?: Record<string, string>;
  variables?: Record<string, VariableConfig>;
  condition?: (stateObj: HassEntity | undefined) => boolean;
};

const temperatureVariable = (stateObj: HassEntity | undefined, hass: HomeAssistant) => {
  const tempUnit = hass.config.unit_system.temperature;
  const isFahrenHeit = tempUnit.includes('F');

  return levelVariable({
    min: numericAttribute(stateObj, 'min_temp', isFahrenHeit ? 45 : 7),
    max: numericAttribute(stateObj, 'max_temp', isFahrenHeit ? 95 : 35),
    step: numericAttribute(stateObj, 'target_temp_step', isFahrenHeit ? 1 : 0.1),
    unit: tempUnit,
  });
};

export const hasProperty = (stateObj: HassEntity | undefined, attribute: string) => {
  return (
    isDefined(stateObj) && hasOwnProperty(stateObj, 'attributes') && hasOwnProperty(stateObj.attributes, attribute)
  );
};

export const actionList: Record<string, Record<string, ActionItem>> = {
  alarm_control_panel: {
    alarm_disarm: {},
    alarm_arm_home: {
      supported_feature: 1,
    },
    alarm_arm_away: {
      supported_feature: 2,
    },
    alarm_arm_night: {
      supported_feature: 4,
    },
    alarm_arm_custom_bypass: {
      supported_feature: 16,
    },
    alarm_arm_vacation: {
      supported_feature: 32,
    },
  },
  automation: {
    turn_on: {},
    turn_off: {},
    trigger: {},
  },
  button: {
    press: {},
  },
  climate: {
    turn_off: {
      condition: stateObj => !listAttribute(stateObj, 'hvac_modes').includes('off'),
    },
    _turn_off: {
      service: 'set_hvac_mode',
      service_data: {
        hvac_mode: 'off',
      },
      condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('off'),
    },
    set_temperature: {
      variables: {
        temperature: {},
      },
      supported_feature: 1,
      condition: stateObj =>
        !['heat', 'cool', 'heat_cool', 'auto'].some(e => listAttribute(stateObj, 'hvac_modes').includes(e)),
    },
    heat: {
      service: 'set_temperature',
      service_data: {
        hvac_mode: 'heat',
      },
      variables: {
        temperature: {
          template: temperatureVariable,
        },
      },
      condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('heat'),
    },
    cool: {
      service: 'set_temperature',
      service_data: {
        hvac_mode: 'cool',
      },
      variables: {
        temperature: {
          template: temperatureVariable,
        },
      },
      condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('cool'),
    },
    heat_cool: {
      service: 'set_temperature',
      service_data: {
        hvac_mode: 'heat_cool',
      },
      variables: {
        temperature: {
          template: temperatureVariable,
        },
      },
      condition: stateObj =>
        listAttribute(stateObj, 'hvac_modes').includes('heat_cool') &&
        hasProperty(stateObj, 'temperature') &&
        !hasProperty(stateObj, 'target_temp_low') &&
        !hasProperty(stateObj, 'target_temp_high'),
    },
    heat_cool_range: {
      service: 'set_temperature',
      service_data: {
        hvac_mode: 'heat_cool',
      },
      variables: {
        target_temp_low: {
          template: temperatureVariable,
        },
        target_temp_high: {
          template: temperatureVariable,
        },
      },
      condition: stateObj =>
        listAttribute(stateObj, 'hvac_modes').includes('heat_cool') &&
        hasProperty(stateObj, 'target_temp_low') &&
        hasProperty(stateObj, 'target_temp_high'),
    },
    auto: {
      service: 'set_temperature',
      service_data: {
        hvac_mode: 'auto',
      },
      variables: {
        temperature: {
          template: (stateObj, hass) => {
            return levelVariable({ ...temperatureVariable(stateObj, hass), optional: true });
          },
        },
      },
      condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('auto'),
    },
    set_mode: {
      service: 'set_hvac_mode',
      variables: {
        hvac_mode: {
          template: stateObj => {
            const supportedFeatures = numericAttribute(stateObj, 'supported_features') || 0;
            let modes = listAttribute(stateObj, 'hvac_modes');
            modes = modes.filter(e => !['heat', 'cool', 'heat_cool', 'auto', 'off'].includes(e));
            return { options: modes };
          },
        },
      },
    },
    set_preset: {
      service: 'set_preset_mode',
      variables: {
        preset_mode: {
          options: 'preset_modes',
        },
      },
      supported_feature: 16,
    },
    set_fan_mode: {
      service: 'set_fan_mode',
      variables: {
        fan_mode: {
          options: 'fan_modes',
        },
      },
    },
  },
  cover: {
    close: {
      service: 'close_cover',
      supported_feature: 2,
    },
    open: {
      service: 'open_cover',
      supported_feature: 1,
    },
    set_position: {
      service: 'set_cover_position',
      variables: {
        position: {
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
        },
      },
      supported_feature: 4,
    },
    set_tilt_position: {
      service: 'set_cover_tilt_position',
      variables: {
        tilt_position: {
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
        },
      },
      supported_feature: 128,
    },
  },
  fan: {
    turn_on: {},
    turn_off: {},
    set_percentage: {
      service: 'set_percentage',
      variables: {
        percentage: {
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
        },
      },
      supported_feature: 1,
    },
    set_oscillation: {
      service: 'oscillate',
      variables: {
        oscillating: {
          options: ['True', 'False'],
        },
      },
      supported_feature: 2,
    },
    set_direction: {
      variables: {
        direction: {
          options: ['forward', 'reverse'],
        },
      },
      supported_feature: 4,
    },
    set_preset: {
      service: 'set_preset_mode',
      variables: {
        preset_mode: {
          options: 'preset_modes',
        },
      },
      supported_feature: 8,
    },
  },
  humidifier: {
    turn_on: {},
    turn_off: {},
    set_humidity: {
      variables: {
        humidity: {
          min: 'min_humidity',
          max: 'max_humidity',
          step: 1,
          unit: '%',
        },
      },
    },
    set_mode: {
      variables: {
        mode: {
          options: 'available_modes',
        },
      },
      supported_feature: 1,
    },
  },
  input_boolean: {
    turn_on: {},
    turn_off: {},
  },
  input_button: {
    press: {},
  },
  input_number: {
    set_value: {
      variables: {
        value: {
          min: 'min',
          max: 'max',
          step: 'step',
          unit: 'unit_of_measurement',
        },
      },
    },
  },
  input_select: {
    select_option: {
      variables: {
        option: {
          options: 'options',
        },
      },
    },
  },
  lawn_mower: {
    start_mowing: {
      supported_feature: 1,
    },
    pause: {
      supported_feature: 2,
    },
    dock: {
      supported_feature: 4,
    }
  },
  light: {
    turn_on: {
      condition: stateObj => computeSupportedFeatures(stateObj) == 0,
    },
    _turn_on: {
      variables: {
        brightness: {
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
          scale_factor: 2.55,
          optional: true,
        },
      },
      condition: stateObj => computeSupportedFeatures(stateObj) != 0,
    },
    turn_off: {},
  },
  lock: {
    lock: {},
    unlock: {},
  },
  media_player: {
    turn_on: { supported_feature: 128 },
    turn_off: { supported_feature: 256 },
    select_source: {
      variables: {
        source: {
          options: 'source_list',
        },
      },
      supported_feature: 2048,
    },
  },
  notify: {
    '{entity_id}': {
      variables: {
        title: {},
        message: {
          multiline: true,
        },
      },
    },
  },
  number: {
    set_value: {
      variables: {
        value: {
          min: 'min',
          max: 'max',
          step: 'step',
        },
      },
    },
  },
  scene: {
    turn_on: {},
  },
  script: {
    turn_on: {},
    turn_off: {},
    '{entity_id}': {},
  },
  select: {
    select_option: {
      variables: {
        option: {
          options: 'options',
        },
      },
    },
  },
  switch: {
    turn_on: {},
    turn_off: {},
  },
  vacuum: {
    turn_on: { supported_feature: 1 },
    start: {
      supported_feature: 8192,
    },
    play_pause: {
      supported_feature: 4,
    },
  },
  water_heater: {
    set_temperature: {
      variables: {
        temperature: {
          template: temperatureVariable,
        },
      },
    },
    set_mode: {
      service: 'set_operation_mode',
      variables: {
        operation_mode: {
          options: 'operation_list',
        },
      },
      supported_feature: 2,
    },
    set_away_mode: {
      variables: {
        away_mode: {
          options: ['on', 'off'],
        },
      },
      supported_feature: 4,
    },
  },
};
