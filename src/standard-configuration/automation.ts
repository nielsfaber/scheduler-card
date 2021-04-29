import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { HomeAssistant } from 'custom-card-helpers';

export const automationActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
  {
    service: 'automation.turn_on',
    icon: 'hass:flash',
    name: hass.localize('ui.card.vacuum.actions.turn_on'),
  },
  {
    service: 'automation.turn_off',
    icon: 'hass:flash-off',
    name: hass.localize('ui.card.vacuum.actions.turn_off'),
  },
  {
    service: 'automation.trigger',
    icon: 'hass:play',
    name: hass.localize('ui.card.script.run'),
  },
];
