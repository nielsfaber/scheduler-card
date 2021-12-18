import { computeDomain, computeStateDisplay, HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { DefaultActionIcon } from '../const';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';
import { textVariable } from '../data/variables/text_variable';
import { getLocale, isDefined } from '../helpers';
import { localize } from '../localize/localize';
import { Variable } from '../types';
import { statesList } from './states';
import { stateIcon } from './state_icons';
import { parseVariable } from './variables';

export function standardStates(entity_id: string, hass: HomeAssistant): Variable | null {
  const domain = computeDomain(entity_id);
  const stateObj: HassEntity | undefined = hass.states[entity_id];
  if (!stateObj) return null;

  if (!Object.keys(statesList).includes(domain)) return null;

  let stateConfig = parseVariable(statesList[domain], stateObj, hass);

  if ('options' in stateConfig && isDefined(stateConfig.options)) {
    let options = [...stateConfig.options];
    options = options.map(e =>
      Object.assign(e, {
        icon: e.icon ? e.icon : stateIcon(stateObj, e.value, DefaultActionIcon),
        name: e.name ? e.name : getStateName(stateObj, e.value, hass),
      })
    );
    stateConfig = { ...stateConfig, options: options };
    if (!options.length) return null;
    return listVariable(stateConfig);
  } else if ('unit' in stateConfig && isDefined(stateConfig.unit)) {
    return levelVariable(stateConfig);
  } else {
    return textVariable(stateConfig);
  }
}

const getStateName = (stateObj: HassEntity, state: string, hass: HomeAssistant) => {
  const domain = computeDomain(stateObj.entity_id);
  return (
    (stateObj.attributes.device_class &&
      hass.localize(
        `component.${domain}.state.${stateObj.attributes.device_class}.${state}`
      )) ||
    hass.localize(`component.${domain}.state._.${state}`) ||
    state
  );
};
