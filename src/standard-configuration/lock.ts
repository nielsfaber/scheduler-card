import { ActionConfig } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const lockActions = (hass: HomeAssistant, _stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'lock.unlock',
    icon: 'hass:lock-open-variant-outline',
    name: hass.localize('ui.card.lock.unlock'),
  },
  {
    service: 'lock.lock',
    icon: 'hass:lock-outline',
    name: hass.localize('ui.card.lock.lock'),
  },
];

export const lockStates = ['locked', 'unlocked'];
