import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { localize } from '../localize/localize';
import { HomeAssistant } from 'custom-card-helpers';
import { LocalizeFunc } from 'custom-card-helpers/dist/translations/localize';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

export const mediaPlayerSources = (_localize: LocalizeFunc, stateObj?: HassEntity) => {
  if (stateObj && stateObj.attributes.source_list && Array.isArray(stateObj.attributes.source_list)) {
    return Array(stateObj.attributes.source_list).map(val => {
      return { value: String(val) };
    });
  }
  return [];
};

export const mediaPlayerActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => [
  {
    service: 'media_player.turn_on',
    icon: 'hass:power',
    name: hass.localize('ui.card.vacuum.actions.turn_on'),
    supported_feature: 128,
  },
  {
    service: 'media_player.turn_off',
    icon: 'hass:power-off',
    name: hass.localize('ui.card.vacuum.actions.turn_off'),
    supported_feature: 256,
  },
  {
    service: 'media_player.select_source',
    variables: {
      source: listVariable({
        name: hass.localize('ui.card.media_player.source'),
        options: mediaPlayerSources(hass.localize, stateObj),
      })
    },
    icon: 'hass:music-box-multiple-outline',
    name: localize('services.media_player.select_source', getLocale(hass)),
    supported_feature: 2048,
  },
];
