import { ActionConfig } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const sceneActions = (hass: HomeAssistant, _stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'scene.turn_on',
    icon: 'hass:play',
    name: hass.localize('ui.card.media_player.turn_on'),
  },
];
