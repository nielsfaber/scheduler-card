import { HomeAssistant } from 'custom-card-helpers';
import { getLocale } from '../helpers';
import { localize } from '../localize/localize';

const domainNames: Record<string, string> = {
  alarm_control_panel: 'domains.alarm_control_panel',
  automation: 'ui.dialogs.quick-bar.commands.navigation.automation',
  binary_sensor: 'domains.binary_sensor',
  calendar: 'panel.calendar',
  climate: 'domains.climate',
  cover: 'domains.cover',
  fan: 'domains.fan',
  group: 'domains.group',
  humidifier: 'domains.humidifier',
  input_boolean: 'domains.input_boolean',
  input_number: 'domains.input_number',
  input_select: 'domains.input_select',
  lawn_mower: 'domains.lawn_mower',
  light: 'domains.light',
  lock: 'domains.lock',
  media_player: 'domains.media_player',
  notify: 'domains.notify',
  person: 'ui.dialogs.quick-bar.commands.navigation.person',
  scene: 'ui.dialogs.quick-bar.commands.navigation.scene',
  script: 'ui.dialogs.quick-bar.commands.navigation.script',
  sensor: 'ui.panel.config.devices.entities.sensor',
  sun: 'ui.panel.config.automation.editor.conditions.type.sun.label',
  switch: 'domains.switch',
  vacuum: 'domains.vacuum',
  water_heater: 'domains.water_heater',
};

export const standardGroupNames = (domain: string, hass: HomeAssistant) => {
  if (domain in domainNames) {
    const translationKey = domainNames[domain];
    const domainTranslation = translationKey.startsWith('domains')
      ? localize(translationKey, getLocale(hass))
      : hass.localize(translationKey);

    if (domainTranslation) return domainTranslation;
  }
  return domain;
};
