import { Action } from '../types';
import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { localize } from '../localize/localize';
import { listVariable } from '../data/variables/list_variable';
import { levelVariable } from '../data/variables/level_variable';
import { getLocale } from '../helpers';

export const fanActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => {
  const actions: Action[] = [
    {
      service: 'fan.turn_on',
      icon: 'hass:power',
      name: hass.localize('ui.card.vacuum.actions.turn_on'),
    },
    {
      service: 'fan.turn_off',
      icon: 'hass:power-off',
      name: hass.localize('ui.card.vacuum.actions.turn_off'),
    },
    {
      service: 'fan.set_percentage',
      variables: {
        percentage: levelVariable({
          name: hass.localize('ui.card.fan.speed'),
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
        }),
      },
      supported_feature: 1,
      icon: 'hass:weather-windy',
      name: localize('services.fan.set_speed', getLocale(hass)),
    },
    {
      service: 'fan.oscillate',
      variables: {
        oscillating: listVariable({
          name: hass.localize('ui.card.fan.oscillate'),
          options: [
            {
              value: 'True',
              name: hass.localize('state.default.on'),
              icon: 'hass:flash',
            },
            {
              value: 'False',
              name: hass.localize('state.default.off'),
              icon: 'hass:flash-off',
            },
          ],
        }),
      },
      supported_feature: 2,
      icon: 'hass:arrow-left-right',
      name: localize('services.fan.oscillate', getLocale(hass)),
    },
    {
      service: 'fan.set_direction',
      variables: {
        direction: listVariable({
          name: hass.localize('ui.card.fan.direction'),
          options: [
            {
              value: 'forward',
              name: hass.localize('ui.card.fan.forward'),
              icon: 'hass:autorenew',
            },
            {
              value: 'reverse',
              name: hass.localize('ui.card.fan.reverse'),
              icon: 'hass:sync',
            },
          ],
        }),
      },
      supported_feature: 4,
      icon: 'hass:cog-clockwise',
      name: localize('services.fan.set_direction', getLocale(hass)),
    },
  ];

  const supportedPresets: string[] =
    stateObj && Array.isArray(stateObj.attributes.preset_modes) ? stateObj.attributes.preset_modes : [];

  if (supportedPresets.length)
    actions.push({
      service: 'fan.set_preset_mode',
      variables: {
        preset_mode: listVariable({
          name: hass.localize('ui.card.fan.preset_mode'),
          options: supportedPresets.map(e => Object({ value: e })),
        }),
      },
      supported_feature: 8,
      icon: 'hass:cloud-download-outline',
      name: localize('services.climate.set_preset_mode', getLocale(hass)),
    });
  return actions;
};

export const fanStates = (hass: HomeAssistant, stateObj: HassEntity) =>
  listVariable({
    options: [
      {
        value: 'off',
        name: computeStateDisplay(hass.localize, { ...stateObj, state: 'off' }, getLocale(hass)),
        icon: 'hass:power-off',
      },
      {
        value: 'on',
        name: computeStateDisplay(hass.localize, { ...stateObj, state: 'on' }, getLocale(hass)),
        icon: 'hass:power',
      },
    ],
  });
