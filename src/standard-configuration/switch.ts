import { ActionConfig } from '../types';
import { HomeAssistant, stateIcon, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const switchActions = (hass: HomeAssistant, _stateObj?: HassEntity): ActionConfig[] => [
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

export const switchStates = (hass: HomeAssistant, stateObj: HassEntity) => [
  {
    value: 'off',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'off' }, hass.language),
    icon: 'hass:flash-off',
  },
  {
    value: 'on',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'on' }, hass.language),
    icon: 'hass:flash',
  },
];
