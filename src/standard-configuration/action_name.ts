import { computeDomain, computeEntity, HomeAssistant } from 'custom-card-helpers';
import { getLocale } from '../helpers';
import { localize } from '../localize/localize';

type actionNameTemplate = (action: string) => string;

const actionNamesList: Record<string, Record<string, string | actionNameTemplate>> = {
  alarm_control_panel: {
    alarm_disarm: 'ui.card.alarm_control_panel.disarm',
    alarm_arm_home: 'ui.card.alarm_control_panel.arm_home',
    alarm_arm_away: 'ui.card.alarm_control_panel.arm_away',
    alarm_arm_night: 'ui.card.alarm_control_panel.arm_night',
    alarm_arm_custom_bypass: 'ui.card.alarm_control_panel.arm_custom_bypass',
    alarm_arm_vacation: 'ui.card.alarm_control_panel.arm_vacation',
  },
  automation: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
    trigger: 'ui.card.script.run',
  },
  button: {
    press: 'ui.card.button.press',
  },
  climate: {
    turn_off: 'ui.card.vacuum.actions.turn_off',
    heat: 'services.climate.set_temperature_hvac_mode_heat',
    cool: 'services.climate.set_temperature_hvac_mode_cool',
    heat_cool: 'services.climate.set_temperature_hvac_mode_heat_cool',
    heat_cool_range: 'services.climate.set_temperature_hvac_mode_heat_cool_range',
    auto: 'services.climate.set_temperature_hvac_mode_auto',
    set_temperature: 'services.climate.set_temperature',
    set_mode: 'services.climate.set_hvac_mode',
    set_preset: 'services.climate.set_preset_mode',
    set_fan_mode: 'services.climate.set_fan_mode',
  },
  cover: {
    close: 'services.cover.close_cover',
    open: 'services.cover.open_cover',
    set_position: 'services.cover.set_cover_position',
    set_tilt: 'services.cover.set_cover_tilt_position',
  },
  fan: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
    set_speed: 'services.fan.set_speed',
    set_oscillation: 'services.fan.oscillate',
    set_direction: 'services.fan.set_direction',
    set_preset: 'services.climate.set_preset_mode',
  },
  humidifier: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
    set_humidity: 'services.humidifier.set_humidity',
    set_mode: 'services.humidifier.set_mode',
  },
  input_boolean: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
  },
  input_button: {
    press: 'ui.card.button.press',
  },
  input_number: {
    set_value: 'services.input_number.set_value',
  },
  input_select: {
    select_option: 'services.input_select.select_option',
  },
  lawn_mower: {
    start_mowing: 'ui.card.lawn_mower.actions.start_mowing',
    pause: 'ui.card.timer.actions.pause',
    dock: 'ui.card.lawn_mower.actions.dock'
  },
  light: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
  },
  lock: {
    lock: 'ui.card.lock.lock',
    unlock: 'ui.card.lock.unlock',
  },
  media_player: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
    select_source: 'services.media_player.select_source',
  },
  notify: {
    '{entity_id}': 'services.notify.notify',
  },
  number: {
    set_value: 'services.input_number.set_value',
  },
  scene: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
  },
  script: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
    '{entity_id}': 'services.script.script',
  },
  select: {
    select_option: 'services.input_select.select_option',
  },
  switch: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    turn_off: 'ui.card.vacuum.actions.turn_off',
  },
  vacuum: {
    turn_on: 'ui.card.vacuum.actions.turn_on',
    start: 'ui.card.vacuum.start_cleaning',
    play_pause: 'services.vacuum.start_pause',
  },
  water_heater: {
    set_temperature: 'services.climate.set_temperature',
    set_mode: 'services.water_heater.set_operation_mode',
    set_away_mode: 'services.water_heater.set_away_mode',
  },
};

export const actionName = (domain: string, action: string, hass: HomeAssistant) => {
  if (domain in actionNamesList && action in actionNamesList[domain]) {
    let item = actionNamesList[domain][action];
    if (item instanceof Function) {
      item = item(action);
    }
    return item.startsWith('services') ? localize(item, getLocale(hass)) : hass.localize(item);
  }
  return action;
};
