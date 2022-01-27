import { computeDomain, computeEntity, HomeAssistant } from 'custom-card-helpers';
import { DefaultActionIcon } from '../const';
import { isDefined, pick } from '../helpers';
import { Action, EVariableType, ListVariable } from '../types';
import { parseVariable, VariableConfig } from './variables';
import { ActionItem, actionList } from './actions';
import { HassEntity } from 'home-assistant-js-websocket';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';
import { textVariable } from '../data/variables/text_variable';
import { actionName } from './action_name';
import { actionIcon } from './action_icons';
import { getVariableName } from './variable_name';
import { getVariableOptionName, getVariableOptions } from './variable_options';
import { getVariableOptionIcon } from './variable_icons';
import { listAttribute } from './attribute';
import { groupActions } from './group';

export const standardActions = (entity_id: string, hass: HomeAssistant, filterCapabilities = true): Action[] => {
  const domain = computeDomain(entity_id);

  if (domain == 'group') {
    const stateObj = hass.states[entity_id];
    const subEntities = listAttribute(stateObj, 'entity_id');
    if (!subEntities.length) return [];

    const subActions = subEntities.map(e => standardActions(e, hass, filterCapabilities));
    return groupActions(hass, stateObj, subActions);
  }

  //not supported by standard configuration
  if (!Object.keys(actionList).includes(domain)) return [];

  return Object.entries(actionList[domain])
    .map(([id, config]) => parseAction(id, config, entity_id, hass, filterCapabilities))
    .filter(isDefined);
};

const parseAction = (
  id: string,
  config: ActionItem,
  entity_id: string,
  hass: HomeAssistant,
  filterCapabilities: boolean
): Action | undefined => {
  const domain = computeDomain(entity_id);
  const stateObj = hass.states[entity_id];
  if (config.condition && !config.condition(stateObj)) return;

  if (id.startsWith('_')) id = id = id.substring(1);

  let action: Action = {
    name: '',
    icon: DefaultActionIcon,
    service: config.service ? `${domain}.${config.service}` : `${domain}.${id}`,
    service_data: config.service_data,
  };

  if (config.supported_feature) {
    const supportedFeature =
      config.supported_feature instanceof Function ? config.supported_feature(stateObj) : config.supported_feature;
    action = {
      ...action,
      supported_feature: supportedFeature,
    };
  }

  action = {
    ...action,
    name: actionName(domain, id, hass),
    icon: actionIcon(domain, id, stateObj),
  };

  Object.keys(config.variables || {}).forEach(key => {
    action = {
      ...action,
      variables: {
        ...action.variables,
        [key]: parseActionVariable(domain, key, config.variables![key], stateObj, hass, filterCapabilities),
      },
    };
  });

  //strip actions having no selectable options
  if (
    Object.values(action.variables || {}).some(e => e.type == EVariableType.List && !(e as ListVariable).options.length)
  )
    return;

  //insert entity ID for services notify / script
  const match = action.service.match(/^[a-z_]+\.(\{entity_id\})$/);
  if (match)
    action = {
      ...action,
      service: action.service.replace(match[1], computeEntity(entity_id)),
    };

  return action;
};

const parseActionVariable = (
  domain: string,
  variable: string,
  variableConfig: VariableConfig,
  stateObj: HassEntity | undefined,
  hass: HomeAssistant,
  filterCapabilities: boolean
) => {
  let config = parseVariable(variableConfig, stateObj, hass);
  config = { ...config, name: getVariableName(domain, variable, hass) };
  if ('options' in config && isDefined(config.options)) {
    let options = [...config.options];
    if (!filterCapabilities) {
      const extraOptions = getVariableOptions(domain, variable).filter(k => !options.map(e => e.value).includes(k));
      options = [...options, ...extraOptions.map(e => Object({ value: e }))];
    }
    options = options.map(e =>
      Object.assign(e, {
        name: e.name ? e.name : getVariableOptionName(domain, variable, e.value, hass),
        icon: e.icon ? e.icon : getVariableOptionIcon(domain, variable, e.value),
      })
    );
    config = { ...config, options: options };
    return listVariable(config);
  } else if ('min' in config && isDefined(config.min) && 'max' in config && isDefined(config.max)) {
    return levelVariable(config);
  } else {
    return textVariable(config);
  }
};
