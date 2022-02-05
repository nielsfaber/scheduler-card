type IconList = Record<string, Record<string, Record<string, string>>>;

const actionIcons: IconList = {
  climate: {
    hvac_mode: {
      off: 'mdi:power-off',
      heat: 'mdi:fire',
      cool: 'mdi:snowflake',
      heat_cool: 'mdi:thermometer',
      auto: 'mdi:autorenew',
      dry: 'mdi:water-percent',
      fan_only: 'mdi:fan',
    },
    preset_mode: {
      activity: 'mdi:account-alert-outline',
      away: 'mdi:car-traction-control',
      boost: 'mdi:rocket-launch-outline',
      comfort: 'mdi:car-seat-cooler',
      eco: 'mdi:leaf',
      home: 'mdi:home-outline',
      none: 'mdi:cancel',
      sleep: 'mdi:sleep',
    },
  },
  fan: {
    direction: {
      forward: 'mdi:autorenew',
      reverse: 'mdi:sync',
    },
    oscillating: {
      True: 'mdi:toggle-switch-outline',
      False: 'mdi:toggle-switch-off-outline',
    },
  },
  humidifier: {
    mode: {
      auto: 'mdi:autorenew',
      away: 'mdi:car-traction-control',
      baby: 'mdi:baby-bottle-outline',
      boost: 'mdi:rocket-launch-outline',
      comfort: 'mdi:car-seat-cooler',
      eco: 'mdi:leaf',
      home: 'mdi:home-outline',
      normal: 'mdi:account-outline',
      sleep: 'mdi:sleep',
    },
  },
  water_heater: {
    operation_mode: {
      off: 'mdi:power-off',
      eco: 'mdi:leaf',
      electric: 'mdi:lightning-bolt',
      gas: 'mdi:fire',
      heat_pump: 'mdi:hvac',
      high_demand: 'mdi:water-plus-outline',
      performance: 'mdi:rocket-launch-outline',
    },
    away_mode: {
      on: 'mdi:toggle-switch-outline',
      off: 'mdi:toggle-switch-off-outline',
    },
  },
};

export const getVariableOptionIcon = (domain: string, variable: string, option: string) => {
  if (domain in actionIcons && variable in actionIcons[domain] && option in actionIcons[domain][variable])
    return actionIcons[domain][variable][option];
  return;
};
