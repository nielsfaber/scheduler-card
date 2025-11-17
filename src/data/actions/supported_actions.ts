export type ActionConfig = {
  supported_features?: number;
  translation_key?: string | string[];
  fields?: {
    [key: string]: {
      supported_features?: number;
      optional?: boolean;
    };
  };
  target?: {
    entity_id?: string[] | string;
    domain?: string;
  };
  name?: string;
  icon?: string;
};

export const supportedActions: Record<string, Record<string, ActionConfig>> = {
  alarm_control_panel: {
    alarm_disarm: {
      target: {},
    },
    alarm_arm_home: {
      supported_features: 1,
      target: {},
    },
    alarm_arm_away: {
      supported_features: 2,
      target: {},
    },
    alarm_arm_night: {
      supported_features: 4,
      target: {},
    },
    alarm_arm_custom_bypass: {
      supported_features: 16,
      target: {},
    },
    alarm_arm_vacation: {
      supported_features: 32,
      target: {},
    },
  },
  automation: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
    trigger: {
      target: {},
    },
  },
  button: {
    press: {
      target: {},
    },
  },
  climate: {
    turn_off: {
      target: {},
      supported_features: 128,
    },
    turn_on: {
      target: {},
      supported_features: 256,
    },
    set_hvac_mode: {
      translation_key: "services.climate.set_hvac_mode",
      target: {},
      fields: {
        hvac_mode: {},
      },
    },
    set_temperature: {
      translation_key: [
        "services.climate.set_temperature",
        "services.climate.set_temperature_hvac_mode_heat",
        "services.climate.set_temperature_hvac_mode_cool",
        "services.climate.set_temperature_hvac_mode_heat_cool",
      ],
      target: {},
      fields: {
        temperature: {
          supported_features: 1,
        },
        target_temp_high: {
          supported_features: 2,
        },
        target_temp_low: {
          supported_features: 2,
        },
        hvac_mode: {
          optional: true,
        },
      },
    },
    set_preset_mode: {
      translation_key: "services.climate.set_preset_mode",
      supported_features: 16,
      target: {},
      fields: {
        preset_mode: {},
      },
    },
    set_fan_mode: {
      translation_key: "services.climate.set_fan_mode",
      supported_features: 8,
      target: {},
      fields: {
        fan_mode: {},
      },
    },
    set_swing_mode: {
      translation_key: "services.climate.set_swing_mode",
      supported_features: 32,
      target: {},
      fields: {
        swing_mode: {},
      },
    },
  },
  cover: {
    close_cover: {
      supported_features: 2,
      target: {},
    },
    open_cover: {
      supported_features: 1,
      target: {},
    },
    set_cover_position: {
      translation_key: "services.cover.set_cover_position",
      supported_features: 4,
      target: {},
      fields: {
        position: {},
      },
    },
    set_cover_tilt_position: {
      translation_key: "services.cover.set_cover_tilt_position",
      supported_features: 128,
      target: {},
      fields: {
        tilt_position: {},
      },
    },
  },
  fan: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
    set_percentage: {
      translation_key: "services.fan.set_percentage",
      supported_features: 1,
      target: {},
      fields: {
        percentage: {},
      },
    },
    oscillate: {
      translation_key: "services.fan.oscillate",
      supported_features: 2,
      target: {},
      fields: {
        oscillating: {},
      },
    },
    set_direction: {
      translation_key: "services.fan.set_direction",
      supported_features: 4,
      target: {},
      fields: {
        direction: {},
      },
    },
    set_preset_mode: {
      translation_key: "services.climate.set_preset_mode",
      supported_features: 8,
      target: {},
      fields: {
        preset_mode: {},
      },
    },
  },
  humidifier: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
    set_humidity: {
      translation_key: "services.humidifier.set_humidity",
      target: {},
      fields: {
        humidity: {},
      },
    },
    set_mode: {
      translation_key: "services.humidifier.set_mode",
      supported_features: 1,
      target: {},
      fields: {
        mode: {},
      },
    },
  },
  input_boolean: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
  },
  input_button: {
    press: {
      target: {},
    },
  },
  input_number: {
    set_value: {
      translation_key: "services.input_number.set_value",
      target: {},
      fields: {
        value: {},
      },
    },
  },
  input_select: {
    select_option: {
      translation_key: "services.input_select.select_option",
      target: {},
      fields: {
        option: {},
      },
    },
  },
  lawn_mower: {
    start_mowing: {
      target: {},
      supported_features: 1,
    },
    pause: {
      target: {},
      supported_features: 2,
    },
    dock: {
      target: {},
      supported_features: 4,
    },
  },
  light: {
    turn_on: {
      translation_key: "services.light.turn_on",
      target: {},
      fields: {
        brightness: {
          optional: true,
        },
      },
    },
    turn_off: {
      target: {},
    },
  },
  lock: {
    lock: {
      target: {},
    },
    unlock: {
      target: {},
    },
  },
  media_player: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
    select_source: {
      translation_key: "services.media_player.select_source",
      supported_features: 2048,
      target: {},
      fields: {
        source: {},
      },
    },
  },
  notify: {
    "{entity_id}": {
      translation_key: "services.notify.send_message",
      fields: {
        title: {
          optional: true,
        },
        message: {},
      },
    },
  },
  number: {
    set_value: {
      translation_key: "services.input_number.set_value",
      target: {},
      fields: {
        value: {},
      },
    },
  },
  scene: {
    turn_on: {
      target: {},
    },
  },
  script: {
    "{entity_id}": {
      translation_key: "services.script.execute",
    },
  },
  select: {
    select_option: {
      translation_key: "services.input_select.select_option",
      target: {},
      fields: {
        option: {},
      },
    },
  },
  switch: {
    turn_on: {
      target: {},
    },
    turn_off: {
      target: {},
    },
  },
  vacuum: {
    turn_on: {
      supported_features: 1,
      target: {},
    },
    start: {
      supported_features: 8192,
      target: {},
    },
    play_pause: {
      target: {},
    },
  },
  valve: {
    open_valve: {
      supported_features: 1,
      target: {},
    },
    close_valve: {
      supported_features: 2,
      target: {},
    },
    set_valve_position: {
      translation_key: "services.cover.set_cover_position",
      supported_features: 4,
      target: {},
      fields: {
        position: {},
      },
    },
  },
  water_heater: {
    set_temperature: {
      translation_key: "services.climate.set_temperature",
      supported_features: 1,
      target: {},
      fields: {
        temperature: {},
      },
    },
    set_operation_mode: {
      translation_key: "services.water_heater.set_operation_mode",
      supported_features: 2,
      target: {},
      fields: {
        operation_mode: {},
      },
    },
    set_away_mode: {
      translation_key: "services.water_heater.set_away_mode",
      supported_features: 4,
      target: {},
      fields: {
        away_mode: {},
      },
    },
  },
};
