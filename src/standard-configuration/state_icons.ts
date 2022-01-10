import { computeDomain, stateIcon as HaStateIcon } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { DefaultEntityIcon } from '../const';

type IconItem = string | ((stateObj: HassEntity, state: string) => string);

type IconList = Record<string, Record<string, IconItem>>;

const binarySensorIcon = (stateObj: HassEntity, state: string) => {
  return HaStateIcon({ ...stateObj, state: state });
};

const coverIcon = (stateObj: HassEntity, state: string) => {
  const closedState = state == 'closed';
  switch (stateObj.attributes.device_class) {
    case 'garage':
      return closedState ? 'mdi:garage' : 'mdi:garage-open';
    case 'door':
      return closedState ? 'mdi:door-closed' : 'mdi:door-open';
    case 'blind':
      return closedState ? 'mdi:blinds' : 'mdi:blinds-open';
    case 'window':
      return closedState ? 'mdi:window-closed' : 'mdi:window-open';
    default:
      return closedState ? 'mdi:window-shutter' : 'mdi:window-shutter-open';
  }
};

export const stateIcons: IconList = {
  alarm_control_panel: {
    disarmed: 'mdi:lock-open-variant-outline',
    armed_away: 'mdi:exit-run',
    armed_home: 'mdi:home-outline',
    armed_night: 'mdi:power-sleep',
    triggered: 'mdi:alarm-light-outline',
  },
  binary_sensor: {
    on: binarySensorIcon,
    off: binarySensorIcon,
  },
  climate: {
    off: 'mdi:power-off',
    heat: 'mdi:fire',
    cool: 'mdi:snowflake',
    heat_cool: 'mdi:thermometer',
    auto: 'mdi:autorenew',
    dry: 'mdi:water-percent',
    fan_only: 'mdi:fan',
  },
  cover: {
    closed: coverIcon,
    open: coverIcon,
  },
  device_tracker: {
    home: 'mdi:home-outline',
    not_home: 'mdi:exit-run',
  },
  fan: {
    on: 'mdi:power',
    off: 'mdi:power-off',
  },
  humidifier: {
    on: 'mdi:power',
    off: 'mdi:power-off',
  },
  input_boolean: {
    on: 'mdi:flash',
    off: 'mdi:flash-off',
  },
  light: {
    on: 'mdi:lightbulb',
    off: 'mdi:lightbulb-off',
  },
  lock: {
    unlocked: 'mdi:lock-outline',
    locked: 'mdi:lock-open-variant-outline',
  },
  person: {
    home: 'mdi:home-outline',
    not_home: 'mdi:exit-run',
  },
  sensor: {
    unit: 'attributes.unit_of_measurement',
  },
  sun: {
    below_horizon: 'mdi:weather-sunny-off',
    above_horizon: 'mdi:weather-sunny',
  },
  switch: {
    on: 'mdi:flash',
    off: 'mdi:flash-off',
  },
};

export const stateIcon = (stateObj: HassEntity, state?: string, fallback?: string) => {
  const domain = computeDomain(stateObj.entity_id);
  if (!state) state = stateObj.state;

  if (domain in stateIcons && state in stateIcons[domain]) {
    const entry = stateIcons[domain][state];
    return typeof entry == 'string' ? entry : entry(stateObj, state);
  }
  return fallback || DefaultEntityIcon;
};
