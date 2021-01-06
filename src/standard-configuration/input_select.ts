import { HassEntity } from 'home-assistant-js-websocket';
import { listVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const inputSelectOptions = (_localize: LocalizeFunc, stateObj?: HassEntity) => {
  if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
    return stateObj.attributes.options.map(val => {
      return { value: String(val) };
    });
  }
  return [];
};

export const inputSelectActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'input_select.select_option',
    variable: listVariable({
      field: 'option',
      name: hass.localize('ui.components.dialogs.input_select.options'),
      options: inputSelectOptions(hass.localize, stateObj),
    }),
    icon: 'counter',
    name: localize('services.input_select.select_option', hass.language),
  },
];

export const inputSelectStates = (hass: HomeAssistant, stateObj: HassEntity) =>
  inputSelectOptions(hass.localize, stateObj)
    .map(e => Object.assign(e, { name: e.value }));