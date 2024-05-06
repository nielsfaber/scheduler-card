import { Selector, SelectorTemplate } from "../../lib/selector";


export type ActionConfig = {
  supported_features?: number,
  translation_key?: string | string[],
  fields?: {
    [key: string]: {
      supported_features?: number,
      optional?: boolean
    }
  },
  target?: object
}

export const supportedActions: Record<string, Record<string, ActionConfig>> = {
  alarm_control_panel: {
    alarm_disarm: {
      target: {}
    },
    alarm_arm_home: {
      target: {}
    },
    alarm_arm_away: {
      target: {}
    },
    alarm_arm_night: {
      target: {}
    },
    alarm_arm_custom_bypass: {
      target: {}
    },
    alarm_arm_vacation: {
      target: {}
    },
  },
  automation: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    },
    trigger: {
      target: {}
    },
  },
  button: {
    press: {
      target: {}
    },
  },
  climate: {
    turn_off: {
      target: {}
    },
    set_hvac_mode: {
      fields: {
        hvac_mode: {}
      }
    },
    set_temperature: {
      translation_key: [
        'services.climate.set_temperature',
        'services.climate.set_temperature_hvac_mode_heat',
        'services.climate.set_temperature_hvac_mode_cool',
        'services.climate.set_temperature_hvac_mode_heat_cool'
      ],
      target: {},
      fields: {
        temperature: {
          supported_features: 1
        },
        target_temp_high: {
          supported_features: 2
        },
        target_temp_low: {
          supported_features: 2
        },
        hvac_mode: {
          optional: true
        }
      }
    },
    set_preset_mode: {
      target: {},
      fields: {
        preset_mode: {
        }
      }
    },
    set_fan_mode: {
      target: {},
      fields: {
        fan_mode: {
        }
      }
    },
  },
  cover: {
    close_cover: {
      target: {}
    },
    open_cover: {
      target: {}
    },
    set_position: {
      target: {},
      fields: {
        position: {
        }
      }
    },
    set_tilt_position: {
      target: {},
      fields: {
        tilt_position: {
        }
      }
    },
  },
  fan: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    },
    set_percentage: {
      target: {},
      fields: {
        percentage: {}
      }
    },
    oscillate: {
      target: {},
      fields: {
        oscillating: {}
      }
    },
    set_direction: {
      target: {},
      fields: {
        direction: {}
      }
    },
    set_preset_mode: {
      target: {},
      fields: {
        preset_mode: {
        }
      }
    },
  },
  humidifier: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    },
    set_humidity: {
      target: {},
      fields: {
        humidity: {
        }
      }
    },
    set_mode: {
      target: {},
      fields: {
        mode: {
        }
      }
    },
  },
  input_boolean: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    }
  },
  input_button: {
    press: {
      target: {}
    },
  },
  input_number: {
    set_value: {
      target: {},
    }
  },
  input_select: {
    select_option: {
      target: {},
      fields: {
        option: {
        }
      }
    },
  },
  light: {
    turn_on: {
      target: {},
      fields: {
        brightness: {
          optional: true
        }
      }
    },
    turn_off: {
      target: {}
    }
  },
  lock: {
    lock: {
      target: {}
    },
    unlock: {
      target: {}
    },
  },
  media_player: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    },
    select_source: {
      target: {},
      fields: {
        source: {
        }
      }
    },
  },
  notify: {
    '{any}': {
      fields: {
        title: {
        },
        message: {
        }
      }
    },
  },
  number: {
    set_value: {
      target: {},
      fields: {
        value: {
        }
      }
    },
  },
  scene: {
    turn_on: {
      target: {}
    },
  },
  script: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    },
    '{entity_id}': {},
  },
  select: {
    select_option: {
      target: {},
      fields: {
        option: {
        }
      }
    },
  },
  switch: {
    turn_on: {
      target: {}
    },
    turn_off: {
      target: {}
    }
  },
  vacuum: {
    turn_on: {
      target: {}
    },
    start: {
      target: {}
    },
    play_pause: {
      target: {}
    },
  },
  water_heater: {
    set_temperature: {
      target: {},
      fields: {
        temperature: {
        }
      }
    },
    set_operation_mode: {
      target: {},
      fields: {
        operation_mode: {
        }
      }
    },
    set_away_mode: {
      target: {},
      fields: {
        away_mode: {
        }
      }
    }
  }
};
