import { HomeAssistant } from 'custom-card-helpers/dist/types';
import { CardConfig } from '../types';
import { standardStates } from '../standard-configuration/standardStates';
import { matchPattern } from './filter_entity';

export function computeEntityStates(entity: string, hass: HomeAssistant, config: Partial<CardConfig>) {
  const stateObj = hass.states[entity];

  let statesConfig = standardStates(stateObj);

  if (config.customize) {
    const userConfig = Object.entries(config.customize)
      .filter(([pattern]) => matchPattern(pattern, entity))
      .sort((a, b) => b[0].length - a[0].length)
      .filter(([, config]) => config.states)
      .map(([, config]) => config.states)
      .forEach(e => {
        statesConfig = e;
      });
  }

  return statesConfig;
}
