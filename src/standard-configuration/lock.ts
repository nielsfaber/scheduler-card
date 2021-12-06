import { Action } from '../types';
import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

export const lockActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
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

export const lockStates = (hass: HomeAssistant, stateObj: HassEntity) =>
  listVariable({
    options: [
      {
        value: 'unlocked',
        name: computeStateDisplay(hass.localize, { ...stateObj, state: 'unlocked' }, getLocale(hass)),
        icon: 'hass:lock-open-variant-outline',
      },
      {
        value: 'locked',
        name: computeStateDisplay(hass.localize, { ...stateObj, state: 'locked' }, getLocale(hass)),
        icon: 'hass:lock-outline',
      },
    ],
  });
