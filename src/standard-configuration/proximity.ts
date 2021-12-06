import { HomeAssistant } from 'custom-card-helpers/dist/types';
import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable } from '../data/variables/level_variable';

export const proximityStates = (_hass: HomeAssistant, stateObj: HassEntity) =>
  levelVariable({
    unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '',
  });
