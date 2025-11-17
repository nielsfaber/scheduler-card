type DomainEntry = {
  services: Record<string, string>;
  attributes?: Record<string, Record<string, string>>;
};

export const serviceIcons: Record<string, DomainEntry> = {
  alarm_control_panel: {
    services: {
      alarm_arm_away: "mdi:shield-lock",
      alarm_arm_home: "mdi:shield-home",
      alarm_arm_night: "mdi:shield-moon",
      alarm_custom_bypass: "mdi:security",
      alarm_disarm: "mdi:shield-off",
      alarm_trigger: "mdi:bell-ring",
      alarm_arm_vacation: "mdi:shield-airplane",
    },
  },
  automation: {
    services: {
      turn_on: "mdi:robot",
      turn_off: "mdi:robot-off",
      trigger: "mdi:play",
    },
  },
  button: {
    services: {
      press: "mdi:gesture-tap-button",
    },
  },
  climate: {
    services: {
      set_temperature: "mdi:thermometer",
      set_hvac_mode: "mdi:cog-transfer-outline",
      set_preset_mode: "mdi:cloud-download-outline",
      set_fan_mode: "mdi:fan",
      set_humidity: "mdi:water-percent",
      set_swing_mode: "mdi:arrow-oscillating",
    },
    attributes: {
      hvac_mode: {
        auto: "mdi:autorenew",
        cool: "mdi:snowflake",
        dry: "mdi:water-percent",
        fan_only: "mdi:fan",
        heat: "mdi:fire",
        heat_cool: "mdi:thermometer",
        off: "mdi:power",
      },
      preset_mode: {
        activity: "mdi:motion-sensor",
        away: "mdi:account-arrow-right",
        boost: "mdi:rocket-launch",
        comfort: "mdi:sofa",
        eco: "mdi:leaf",
        home: "mdi:home",
        sleep: "mdi:bed",
      },
      fan_mode: {
        diffuse: "mdi:weather-windy",
        focus: "mdi:target",
        high: "mdi:speedometer",
        low: "mdi:speedometer-slow",
        medium: "mdi:speedometer-medium",
        middle: "mdi:speedometer-medium",
        off: "mdi:fan-off",
        on: "mdi:fan",
      },
      swing_mode: {
        both: "mdi:arrow-all",
        horizontal: "mdi:arrow-left-right",
        off: "mdi:arrow-oscillating-off",
        on: "mdi:arrow-oscillating",
        vertical: "mdi:arrow-up-down",
      },
    },
  },
  cover: {
    services: {
      close_cover: "mdi:arrow-down-box",
      close_cover_tilt: "mdi:arrow-bottom-left",
      open_cover: "mdi:arrow-up-box",
      open_cover_tilt: "mdi:arrow-top-right",
      set_cover_position: "mdi:arrow-down-box",
      set_cover_tilt_position: "mdi:arrow-top-right",
    },
  },
  fan: {
    services: {
      oscillate: "mdi:arrow-oscillating",
      set_percentage: "mdi:fan",
      set_preset_mode: "mdi:fan-auto",
      turn_off: "mdi:fan-off",
      turn_on: "mdi:fan",
    },
  },
  humidifier: {
    services: {
      set_humidity: "mdi:water-percent",
      set_mode: "mdi:air-humidifier",
      turn_off: "mdi:air-humidifier-off",
      turn_on: "mdi:air-humidifier",
    },
    attributes: {
      mode: {
        auto: "mdi:refresh-auto",
        away: "mdi:account-arrow-right",
        baby: "mdi:baby-carriage",
        boost: "mdi:rocket-launch",
        comfort: "mdi:sofa",
        eco: "mdi:leaf",
        home: "mdi:home",
        normal: "mdi:water-percent",
        sleep: "mdi:power-sleep",
      },
    },
  },
  input_boolean: {
    services: {
      turn_off: "mdi:toggle-switch-off",
      turn_on: "mdi:toggle-switch",
    },
  },
  input_button: {
    services: {
      press: "mdi:gesture-tap-button",
    },
  },
  input_number: {
    services: {
      set_value: "mdi:counter",
    },
  },
  input_select: {
    services: {
      select_option: "mdi:counter",
    },
  },
  lawn_mower: {
    services: {
      dock: "mdi:home-import-outline",
      start_mowing: "mdi:play",
      pause: "mdi:pause",
    },
  },
  light: {
    services: {
      turn_off: "mdi:lightbulb-off",
      turn_on: "mdi:lightbulb-on",
    },
  },
  lock: {
    services: {
      lock: "mdi:lock",
      unlock: "mdi:lock-open",
    },
  },
  media_player: {
    services: {
      media_play: "mdi:play",
      media_stop: "mdi:stop",
      play_media: "mdi:play",
      select_source: "mdi:import",
      turn_off: "mdi:power",
      turn_on: "mdi:power",
    },
  },
  notify: {
    services: {
      "{entity_id}": "mdi:message-alert",
    },
  },
  scene: {
    services: {
      turn_on: "mdi:play",
    },
  },
  script: {
    services: {
      turn_on: "mdi:flash",
      turn_off: "mdi:flash-off",
      "{entity_id}": "mdi:play",
    },
  },
  select: {
    services: {
      select_option: "mdi:counter",
    },
  },
  switch: {
    services: {
      turn_off: "mdi:toggle-switch-variant-off",
      turn_on: "mdi:toggle-switch-variant",
    },
  },
  vacuum: {
    services: {
      send_command: "mdi:send",
      start: "mdi:play",
      turn_off: "mdi:stop",
      turn_on: "mdi:play",
    },
  },
  valve: {
    services: {
      open_valve: "mdi:valve-open",
      close_valve: "mdi:valve-closed",
      set_valve_position: "mdi:valve",
    },
  },
  water_heater: {
    services: {
      set_away_mode: "mdi:account-arrow-right",
      set_operation_mode: "mdi:water-boiler",
      set_temperature: "mdi:thermometer",
      turn_off: "mdi:water-boiler-off",
      turn_on: "mdi:water-boiler",
    },
    attributes: {
      operation_mode: {
        eco: "mdi:leaf",
        electric: "mdi:lightning-bolt",
        gas: "mdi:fire-circle",
        heat_pump: "mdi:heat-wave",
        high_demand: "mdi:finance",
        off: "mdi:power",
        performance: "mdi:rocket-launch",
      },
    },
  },
};
