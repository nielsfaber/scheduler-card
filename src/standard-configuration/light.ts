import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { computeStateDisplay, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';

export const lightActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => {
  const actions: Action[] = [
    {
      service: 'light.turn_off',
      icon: 'hass:lightbulb-off',
      name: hass.localize('ui.card.media_player.turn_off'),
    },
  ];

  if (stateObj && stateObj.attributes.supported_features !== undefined && !(stateObj.attributes.supported_features & 1)) {
    actions.push({
      service: 'light.turn_on',
      icon: 'hass:lightbulb-on',
      name: hass.localize('ui.card.media_player.turn_on'),
    });
  } else {
    actions.push({
      service: 'light.turn_on',
      variables: {
        brightness: levelVariable({
          name: hass.localize('ui.card.light.brightness'),
          min: 0,
          max: 255,
          step: 1,
          unit: '%',
          optional: true,
        })
      },
      icon: 'hass:lightbulb-on',
      name: localize('services.light.turn_on', hass.language),
      supported_feature: 1,
    });
  }

  return actions;
};


export const lightStates = (hass: HomeAssistant, stateObj: HassEntity) => listVariable({
  options: [
    {
      value: "off",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "off" }, hass.language),
      icon: "hass:lightbulb-off"
    },
    {
      value: "on",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "on" }, hass.language),
      icon: "hass:lightbulb"
    }
  ]
});