import { Action } from '../types';
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { getLocale } from '../helpers';

export const vacuumActions = (hass: HomeAssistant, _stateObj?: HassEntity): Action[] => [
  {
    service: 'vacuum.turn_on',
    icon: 'hass:power',
    name: hass.localize('ui.card.vacuum.actions.turn_on'),
    supported_feature: 1,
  },
  {
    service: 'vacuum.start',
    icon: 'hass:play-circle-outline',
    name: hass.localize('ui.card.vacuum.start_cleaning'),
    supported_feature: 8192,
  },
  {
    service: 'vacuum.start_pause',
    icon: 'hass:play-circle-outline',
    name: localize('services.vacuum.start_pause', getLocale(hass)),
    supported_feature: 4,
  },
];
