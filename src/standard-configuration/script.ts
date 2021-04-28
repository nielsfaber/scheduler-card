import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { computeEntity, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const scriptActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => {
  const actions: Action[] = [
    {
      service: 'script.turn_on',
      icon: 'hass:flash',
      name: hass.localize('ui.card.media_player.turn_on'),
    },
    {
      service: 'script.turn_off',
      icon: 'hass:flash-off',
      name: hass.localize('ui.card.media_player.turn_off'),
    },
  ];

  if (stateObj) {
    actions.push({
      service: 'script' + '.' + computeEntity(stateObj.entity_id),
      icon: 'hass:play',
      name: localize('services.script.script', hass.language),
    });
  }

  return actions;
};
