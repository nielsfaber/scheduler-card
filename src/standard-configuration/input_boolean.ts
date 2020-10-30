import { ActionConfig } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const inputBooleanActions = (hass: HomeAssistant, _stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'input_boolean.turn_on',
    icon: 'hass:flash',
    name: hass.localize('ui.card.media_player.turn_on'),
  },
  {
    service: 'input_boolean.turn_off',
    icon: 'hass:flash-off',
    name: hass.localize('ui.card.media_player.turn_off'),
  },
];
