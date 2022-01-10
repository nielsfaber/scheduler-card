import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig, Variable } from '../types';
import { standardStates } from '../standard-configuration/standardStates';
import { isDefined } from '../helpers';
import { matchPattern } from './match_pattern';
import { listVariable } from './variables/list_variable';
import { levelVariable } from './variables/level_variable';

export function computeStates(entity_id: string, hass: HomeAssistant, config: CardConfig): Variable | null {
  //fetch standard states for entity
  let stateConfig = config.standard_configuration ? standardStates(entity_id, hass) : null;

  //get customizations for entity
  const customizedStates = Object.entries(config.customize)
    .filter(([a]) => matchPattern(a, entity_id))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, b]) => b.states)
    .filter(isDefined);
  if (customizedStates.length) {
    customizedStates.forEach(userConfig => {
      if (Array.isArray(userConfig)) {
        stateConfig = listVariable({ options: userConfig.map(e => Object({ value: e })) });
      } else {
        stateConfig = levelVariable(userConfig);
      }
    });
  }
  return stateConfig;
}
