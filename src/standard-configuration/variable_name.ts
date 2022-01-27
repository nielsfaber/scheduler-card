import { HomeAssistant } from 'custom-card-helpers';

const variableList: Record<string, Record<string, string>> = {
  climate: {
    temperature: 'ui.card.weather.attributes.temperature',
    target_temp_low: 'ui.panel.lovelace.editor.card.generic.minimum',
    target_temp_high: 'ui.panel.lovelace.editor.card.generic.maximum',
    hvac_mode: 'ui.card.climate.operation',
    preset_mode: 'ui.card.climate.preset_mode',
    fan_mode: 'ui.card.climate.fan_mode',
  },
  cover: {
    position: 'ui.card.cover.position',
    tilt_position: 'ui.card.cover.tilt_position',
  },
  fan: {
    percentage: 'ui.card.fan.speed',
    oscillating: 'ui.card.fan.oscillate',
    direction: 'ui.card.fan.direction',
    preset_mode: 'ui.card.fan.preset_mode',
  },
  humidifier: {
    humidity: 'ui.card.humidifier.humidity',
    mode: 'ui.card.humidifier.mode',
  },
  input_number: {
    value: 'ui.panel.config.helpers.types.input_number',
  },
  input_select: {
    option: 'ui.components.dialogs.input_select.options',
  },
  light: {
    brightness: 'ui.card.light.brightness',
  },
  media_player: {
    source: 'ui.card.media_player.source',
  },
  notify: {
    title: 'ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title',
    message: 'ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message',
  },
  number: {
    value: 'ui.panel.config.helpers.types.input_number',
  },
  select: {
    option: 'ui.components.dialogs.input_select.options',
  },
  water_heater: {
    temperature: 'ui.card.weather.attributes.temperature',
    operation_mode: 'ui.card.water_heater.operation',
    away_mode: 'ui.card.water_heater.away_mode',
  },
};

export const getVariableName = (domain: string, variable: string, hass: HomeAssistant) => {
  if (domain in variableList && variable in variableList[domain]) {
    return hass.localize(variableList[domain][variable]);
  }
  return variable;
};
