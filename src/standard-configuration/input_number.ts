import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { localize } from '../localize/localize';
import { HomeAssistant } from 'custom-card-helpers';

export const inputNumberActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'input_number.set_value',
    variable: levelVariable({
      field: 'value',
      name: hass.localize('ui.panel.config.helpers.types.input_number'),
      min: stateObj && stateObj.attributes.min ? Number(stateObj.attributes.min) : 0,
      max: stateObj && stateObj.attributes.max ? Number(stateObj.attributes.max) : 255,
      step: stateObj && stateObj.attributes.step ? Number(stateObj.attributes.step) : 1,
      unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '',
    }),
    icon: 'hass:counter',
    name: localize('services.input_number.set_value', hass.language),
  },
];
