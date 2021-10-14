import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { listVariable } from '../data/variables/list_variable';
import { getLocale } from '../helpers';

export const selectOptions = (_localize: LocalizeFunc, stateObj?: HassEntity) => {
  if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
    return stateObj.attributes.options.map(val => {
      return { value: String(val) };
    });
  }
  return [];
};

export const selectActions = (hass: HomeAssistant, stateObj?: HassEntity): Action[] => [
  {
    service: 'select.select_option',
    variables: {
      option: listVariable({
        name: hass.localize('ui.components.dialogs.select.options'),
        options: selectOptions(hass.localize, stateObj),
      })
    },
    icon: 'counter',
    name: localize('services.select.select_option', getLocale(hass)),
  },
];

export const selectStates = (hass: HomeAssistant, stateObj: HassEntity) => listVariable({
  options: selectOptions(hass.localize, stateObj)
    .map(e => Object.assign(e, { name: e.value }))
});