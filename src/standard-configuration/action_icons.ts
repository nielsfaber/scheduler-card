import { computeDomain, computeEntity } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { DefaultActionIcon } from '../const';

type IconItem = string | ((action: string, stateObj?: HassEntity) => string);

type IconList = Record<string, Record<string, IconItem>>;

const coverIcon = (action: string, stateObj?: HassEntity) => {
  const closedState = action == 'close';
  switch (stateObj?.attributes.device_class) {
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

const actionIcons: IconList = {
  alarm_control_panel: {
    alarm_disarm: 'mdi:lock-open-variant-outline',
    alarm_arm_home: 'mdi:home-outline',
    alarm_arm_away: 'mdi:exit-run',
    alarm_arm_night: 'mdi:power-sleep',
    alarm_arm_custom_bypass: 'mdi:shield-lock-outline',
    arm_vacation: 'mdi:shield-airplane',
  },
  automation: {
    turn_on: 'mdi:power',
    turn_off: 'mdi:power-off',
    trigger: 'mdi:play',
  },
  button: {
    press: 'mdi:gesture-tap-button',
  },
  climate: {
    turn_off: 'mdi:power-off',
    heat: 'mdi:fire',
    cool: 'mdi:snowflake',
    heat_cool: 'mdi:thermometer',
    heat_cool_range: 'mdi:thermometer',
    set_temperature: 'mdi:thermometer',
    auto: 'mdi:autorenew',
    set_mode: 'mdi:cog-transfer-outline',
    set_preset: 'mdi:cloud-download-outline',
    set_fan_mode: 'mdi:fan',
  },
  cover: {
    close: coverIcon,
    open: coverIcon,
    set_position: 'mdi:ray-vertex',
    set_tilt_position: 'mdi:valve',
  },
  fan: {
    turn_on: 'mdi:power',
    turn_off: 'mdi:power-off',
    set_percentage: 'mdi:weather-windy',
    set_oscillation: 'mdi:arrow-left-right',
    set_direction: 'mdi:cog-clockwise',
    set_preset_mode: 'mdi:cloud-download-outline',
  },
  humidifier: {
    turn_on: 'mdi:power',
    turn_off: 'mdi:power-off',
    set_humidity: 'mdi:water-percent',
    set_mode: 'mdi:cog-transfer-outline',
  },
  input_boolean: {
    turn_on: 'mdi:flash',
    turn_off: 'mdi:flash-off',
  },
  input_button: {
    press: 'mdi:gesture-tap-button',
  },
  input_number: {
    set_value: 'mdi:counter',
  },
  input_select: {
    select_option: 'mdi:counter',
  },
  lawn_mower: {
    start_mowing: 'mdi:play',
    pause: 'mdi:pause',
    dock: 'mdi:home-import-outline'
  },
  light: {
    turn_on: 'mdi:lightbulb',
    turn_off: 'mdi:lightbulb-off',
  },
  lock: {
    lock: 'mdi:lock-outline',
    unlock: 'mdi:lock-open-variant-outline',
  },
  media_player: {
    turn_on: 'mdi:power',
    turn_off: 'mdi:power-off',
    select_source: 'mdi:music-box-multiple-outline',
  },
  notify: {
    '{entity_id}': 'mdi:message-alert',
  },
  number: {
    set_value: 'mdi:counter',
  },
  scene: {
    turn_on: 'mdi:play',
  },
  script: {
    turn_on: 'mdi:flash',
    turn_off: 'mdi:flash-off',
    '{entity_id}': 'mdi:play',
  },
  select: {
    select_option: 'mdi:counter',
  },
  switch: {
    turn_on: 'mdi:flash',
    turn_off: 'mdi:flash-off',
  },
  vacuum: {
    turn_on: 'mdi:power',
    start: 'mdi:play-circle-outline',
    play_pause: 'mdi:play-circule-outline',
  },
  water_heater: {
    set_temperature: 'mdi:thermometer',
    set_mode: 'mdi:cog-transfer-outline',
    set_away_mode: 'mdi:car-traction-control',
  },
};

export const actionIcon = (domain: string, action: string, stateObj: HassEntity | undefined): string | undefined => {
  if (domain in actionIcons && action in actionIcons[domain]) {
    let item = actionIcons[domain][action];
    if (item instanceof Function) {
      item = item(action, stateObj);
    }
    return item;
  }
  return DefaultActionIcon;
};
