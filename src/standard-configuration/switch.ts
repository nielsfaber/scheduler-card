import { Action } from '../types';
import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { listVariable } from '../data/variables/list_variable';

export const switchActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
  {
    service: 'switch.turn_on',
    icon: 'hass:flash',
    name: hass.localize('ui.card.media_player.turn_on'),
  },
  {
    service: 'switch.turn_off',
    icon: 'hass:flash-off',
    name: hass.localize('ui.card.media_player.turn_off'),
  },
];



export const switchStates = (hass: HomeAssistant, stateObj: HassEntity) => listVariable({
  options: [
    {
      value: "off",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "off" }, hass.language),
      icon: "hass:flash-off"
    },
    {
      value: "on",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "on" }, hass.language),
      icon: "hass:flash"
    }
  ]
});