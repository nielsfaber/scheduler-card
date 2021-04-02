import { HassEntity } from 'home-assistant-js-websocket';
import { ActionConfig } from '../types';
import { HomeAssistant } from 'custom-card-helpers';

export const automationActions = (hass: HomeAssistant, _stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'automation.turn_on',
    icon: 'hass:flash',
    name: hass.localize('ui.card.media_player.turn_on'),
  },
  {
    service: 'automation.turn_off',
    icon: 'hass:flash-off',
    name: hass.localize('ui.card.media_player.turn_off'),
  },
  {
    service: 'automation.trigger',
    icon: 'hass:play',
    name: hass.localize('ui.card.script.run'),
  },
];
