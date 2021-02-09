import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { computeStateDisplay, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const lightActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => {
  const actions: ActionConfig[] = [
    {
      service: 'light.turn_off',
      icon: 'hass:lightbulb-off',
      name: hass.localize('ui.card.media_player.turn_off'),
    },
  ];

  if (
    stateObj &&
    stateObj.attributes.supported_features !== undefined &&
    !(stateObj.attributes.supported_features & 1)
  ) {
    actions.push({
      service: 'light.turn_on',
      icon: 'hass:lightbulb-on',
      name: hass.localize('ui.card.media_player.turn_on'),
    });
  } else {
    actions.push({
      service: 'light.turn_on',
      variable: levelVariable({
        field: 'brightness',
        name: hass.localize('ui.card.light.brightness'),
        min: 0,
        max: 255,
        step: 1,
        unit: '%',
        optional: true,
      }),
      icon: 'hass:lightbulb-on',
      name: localize('services.light.turn_on', hass.language),
      supported_feature: 1,
    });
  }

  return actions;
};

export const lightStates = (hass: HomeAssistant, stateObj: HassEntity) => [
  {
    value: 'off',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'off' }, hass.language),
    icon: 'hass:lightbulb-off',
  },
  {
    value: 'on',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'on' }, hass.language),
    icon: 'hass:lightbulb',
  },
];
