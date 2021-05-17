import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { computeStateDisplay, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';

export const lightActions = (hass: HomeAssistant, stateObj: HassEntity | undefined): Action[] => {
  const actions: Action[] = [
    {
      service: 'light.turn_off',
      icon: 'hass:lightbulb-off',
      name: hass.localize('ui.card.vacuum.actions.turn_off'),
    },
  ];

  const supportedFeatures = stateObj && stateObj.attributes.supported_features !== undefined
    ? Number(stateObj.attributes.supported_features)
    : 0;

  if (supportedFeatures & 1)
    actions.push({
      service: 'light.turn_on',
      variables: {
        brightness: levelVariable({
          name: hass.localize('ui.card.light.brightness'),
          min: 0,
          max: 100,
          scale_factor: 2.55,
          step: 1,
          unit: '%',
          optional: true,
        })
      },
      icon: 'hass:lightbulb-on',
      name: localize('services.light.turn_on', hass.language),
      supported_feature: 1,
    });
  else
    actions.push({
      service: 'light.turn_on',
      icon: 'hass:lightbulb-on',
      name: hass.localize('ui.card.vacuum.actions.turn_on'),
    });

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