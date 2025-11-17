import { computeDomain } from "../lib/entity";
import { HomeAssistant } from "../lib/types";

const stateIcons: Record<string, Record<string, string> | Record<string, Record<string, string>>> = {
  alarm_control_panel: {
    disarmed: "mdi:lock-open-variant-outline",
    armed_away: "mdi:exit-run",
    armed_home: "mdi:home-outline",
    armed_night: "mdi:power-sleep",
    armed_custom_bypass: "mdi:security",
    armed_vacation: "mdi:shield-airplane",
    triggered: "mdi:alarm-light-outline",
  },
  binary_sensor: {
    battery: {
      on: "mdi:battery-outline",
      off: "mdi:battery",
    },
    battery_charging: {
      on: "mdi:battery-charging",
      off: "mdi:battery",
    },
    cold: {
      on: "mdi:snowflake",
      off: "mdi:thermometer",
    },
    connectivity: {
      on: "mdi:server-network",
      off: "mdi:server-network-off",
    },
    door: {
      on: "mdi:door-open",
      off: "mdi:door-closed",
    },
    garage_door: {
      on: "mdi:garage-open",
      off: "mdi:garage",
    },
    power: {
      on: "mdi:power-plug",
      off: "mdi:power-plug-off",
    },
    gas: {
      on: "mdi:alert-circle",
      off: "mdi:check-circle",
    },
    problem: {
      on: "mdi:alert-circle",
      off: "mdi:check-circle",
    },
    safety: {
      on: "mdi:alert-circle",
      off: "mdi:check-circle",
    },
    tamper: {
      on: "mdi:alert-circle",
      off: "mdi:check-circle",
    },
    smoke: {
      on: "mdi:smoke",
      off: "mdi:check-circle",
    },
    heat: {
      on: "mdi:fire",
      off: "mdi:thermometer",
    },
    light: {
      on: "mdi:brightness-7",
      off: "mdi:brightness-5",
    },
    lock: {
      on: "mdi:lock-open",
      off: "mdi:lock",
    },
    moisture: {
      on: "mdi:water",
      off: "mdi:water-off",
    },
    motion: {
      on: "mdi:run",
      off: "mdi:walk",
    },
    occupancy: {
      on: "mdi:home",
      off: "mdi:home-outline",
    },
    opening: {
      on: "mdi:square-outline",
      off: "mdi:square",
    },
    plug: {
      on: "mdi:power-plug",
      off: "mdi:power-plug-off",
    },
    presence: {
      on: "mdi:home",
      off: "mdi:home-outline",
    },
    running: {
      on: "mdi:play",
      off: "mdi:stop",
    },
    sound: {
      on: "mdi:music-note",
      off: "mdi:music-note-off",
    },
    update: {
      on: "mdi:package-up",
      off: "mdi:package",
    },
    vibration: {
      on: "mdi:vibrate",
      off: "mdi:crop-portrait",
    },
    window: {
      on: "mdi:window-open",
      off: "mdi:window-closed",
    },
    _: {
      on: "mdi:checkbox-marked-circle",
      off: "mdi:radiobox-blank",
    },
  },
  calendar: {
    on: "mdi:flash",
    off: "mdi:flash-off",
  },
  cover: {
    garage: {
      closed: "mdi:garage",
      open: "mdi:garage-open",
    },
    door: {
      closed: "mdi:door-closed",
      open: "mdi:door-open",
    },
    blind: {
      closed: "mdi:blinds",
      open: "mdi:blinds-open",
    },
    window: {
      closed: "mdi:window-closed",
      open: "mdi:window-open",
    },
    _: {
      closed: "mdi:window-shutter",
      open: "mdi:window-shutter-open",
    },
  },
  climate: {
    off: "mdi:power-off",
    heat: "mdi:fire",
    cool: "mdi:snowflake",
    heat_cool: "mdi:thermometer",
    auto: "mdi:autorenew",
    dry: "mdi:water-percent",
    fan_only: "mdi:fan",
  },
  device_tracker: {
    home: "mdi:home-outline",
    not_home: "mdi:exit-run",
  },
  fan: {
    on: "mdi:power",
    off: "mdi:power-off",
  },
  humidifier: {
    on: "mdi:power",
    off: "mdi:power-off",
  },
  input_boolean: {
    on: "mdi:flash",
    off: "mdi:flash-off",
  },
  light: {
    on: "mdi:lightbulb",
    off: "mdi:lightbulb-off",
  },
  lawn_mower: {
    mowing: "mdi:play",
    paused: "mdi:pause",
    docked: "mdi:home-import-outline",
  },
  lock: {
    unlocked: "mdi:lock-open-variant-outline",
    locked: "mdi:lock-outline",
  },
  person: {
    home: "mdi:home-outline",
    not_home: "mdi:exit-run",
  },
  sun: {
    below_horizon: "mdi:weather-sunny-off",
    above_horizon: "mdi:weather-sunny",
  },
  switch: {
    on: "mdi:flash",
    off: "mdi:flash-off",
  },
  timer: {
    active: "mdi:play",
    paused: "mdi:pause",
    idle: "mdi:sleep",
  },
  valve: {
    open: "mdi:valve-open",
    closed: "mdi:valve-closed",
  },
  water_heater: {
    off: "mdi:power-off",
    eco: "mdi:leaf",
    electric: "mdi:lightning-bolt",
    gas: "mdi:fire",
    heat_pump: "mdi:hvac",
    high_demand: "mdi:water-plus-outline",
    performance: "mdi:rocket-launch-outline",
  },
};

export const stateIcon = (entityId: string, state: string, hass: HomeAssistant): string | undefined => {
  const domain = computeDomain(entityId);
  if (!Object.keys(stateIcons).includes(domain)) return;

  let iconList = stateIcons[domain];
  const isRecursiveList = typeof Object.values(iconList)[0] === "object";

  if (isRecursiveList) {
    const stateObj = hass.states[entityId];
    const deviceClass = stateObj?.attributes.device_class;

    if (deviceClass && Object.keys(iconList).includes(deviceClass)) {
      iconList = iconList[deviceClass] as Record<string, string>;
    } else {
      iconList = iconList._ as Record<string, string>;
    }
  }

  if (!Object.keys(iconList).includes(state)) return;
  return iconList[state] as string;
};
