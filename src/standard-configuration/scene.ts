import { Action } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const sceneActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
  {
    service: 'scene.turn_on',
    icon: 'hass:play',
    name: hass.localize('ui.card.vacuum.actions.turn_on'),
  },
];
