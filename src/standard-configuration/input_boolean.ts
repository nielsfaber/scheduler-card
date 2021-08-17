import { Action } from '../types';
import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

export const inputBooleanActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
  {
    service: 'input_boolean.turn_on',
    icon: 'hass:flash',
    name: hass.localize('ui.card.vacuum.actions.turn_on'),
  },
  {
    service: 'input_boolean.turn_off',
    icon: 'hass:flash-off',
    name: hass.localize('ui.card.vacuum.actions.turn_off'),
  },
];


export const inputBooleanStates = (hass: HomeAssistant, stateObj: HassEntity) => listVariable({
  options: [
    {
      value: "off",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "off" }, getLocale(hass)),
      icon: "hass:flash-off"
    },
    {
      value: "on",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "on" }, getLocale(hass)),
      icon: "hass:flash"
    }
  ]
});