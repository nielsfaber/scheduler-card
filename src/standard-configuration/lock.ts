import { ActionConfig } from '../types';
import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
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

export const lockStates = (hass: HomeAssistant, stateObj: HassEntity) => [
  {
    value: 'unlocked',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'unlocked' }, hass.language),
    icon: 'hass:lock-open-variant-outline',
  },
  {
    value: 'locked',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'locked' }, hass.language),
    icon: 'hass:lock-outline',
  },
];
