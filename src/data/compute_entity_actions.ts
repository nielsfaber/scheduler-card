import {
  CardConfig,
  ActionConfig,
  ActionElement,
  ListVariableConfig,
  LevelVariableConfig,
  EVariableType,
} from '../types';
import { HomeAssistant, computeDomain, computeEntity } from 'custom-card-helpers';
import { omit } from '../helpers';
import { standardActions } from '../standard-configuration/standardActions';
import { matchPattern, entityFilter } from './filter_entity';
import { listVariable, levelVariable } from '../actionVariables';
import { DefaultActionIcon } from '../const';
import { uniqueId, equalAction } from './compute_action_id';
import { VariableSlider } from '../custom-elements/button-group';

export function computeEntityActionConfig(entity: string, hass: HomeAssistant, config: Partial<CardConfig>) {
  const stateObj = hass.states[entity];

  let actionList: ActionConfig[] = [];
  if (config.standard_configuration === undefined || config.standard_configuration) {
    actionList = standardActions(entity, hass, true);
  }
  if (config.customize) {
    const userConfig = Object.entries(config.customize)
      .filter(([pattern]) => matchPattern(pattern, entity))
      .sort((a, b) => b[0].length - a[0].length);

    //excluded actions
    userConfig
      .filter(([, config]) => config.exclude_actions && config.exclude_actions.length)
      .map(([, config]) => config.exclude_actions)
      .reduce((r, a) => r!.concat(a!), [])!
      .forEach(el => {
        if (el == 'all') actionList = [];
        actionList = actionList.filter(
          e =>
            !e.name ||
            !e.name
              .replace(/_/g, ' ')
              .trim()
              .toLowerCase()
              .includes(
                el
                  .replace(/_/g, ' ')
                  .trim()
                  .toLowerCase()
              )
        );
      });

    userConfig
      .filter(([, config]) => config.actions && config.actions.length)
      .map(([, config]) => config.actions)
      .reduce((r, a) => r!.concat(a!), [])!
      .forEach(action => {
        if (!computeDomain(action.service).length)
          action = { ...action, service: computeDomain(entity) + '.' + computeEntity(action.service) };
        let res = actionList.findIndex(el => equalAction(el, action));
        if (res >= 0 && action.service_data && uniqueId(action) != uniqueId(actionList[res])) res = -1;
        if (res >= 0) {
          let item = { ...actionList[res], ...omit(action, ['variable']) };
          if (action.variable) item = { ...item, variable: { ...(item.variable || {}), ...action.variable } };
          actionList = Object.values({ ...actionList, [res]: item }) as ActionConfig[];
        } else actionList.push(action);
      });
  }

  if (stateObj && stateObj.attributes && stateObj.attributes.supported_features) {
    const supportedFeatures = stateObj.attributes.supported_features;
    actionList = actionList.filter(e => !e.supported_feature || e.supported_feature & supportedFeatures);
  }

  actionList = actionList
    .map(action => {
      if (action.variable && action.variable.type == EVariableType.List) {
        const config = action.variable as ListVariableConfig;
        if (!config.options.length) return null;
        else if (config.options.length == 1) {
          const listOption = config.options[0];
          const service_data = { ...(action.service_data || {}), [config.field]: listOption.value };
          return { ...action, icon: listOption.icon || action.icon, service_data: service_data };
        }
      }
      return action;
    })
    .filter(e => e) as ActionConfig[];
  return actionList;
}

export function actionElement(action: ActionConfig) {
  const id = uniqueId(action);
  let item: ActionElement = {
    id: id,
    service: action.service,
    service_data: {}
  };

  item = { ...item, ...omit(action, ['variable']) };
  if (!item.name) item = { ...item, name: computeEntity(action.service) };
  if (!item.icon) item = { ...item, icon: DefaultActionIcon };

  if (action.variable) {
    if ('options' in action.variable) item = { ...item, variable: listVariable(action.variable as ListVariableConfig) };
    else item = { ...item, variable: levelVariable(action.variable as LevelVariableConfig) };
  }
  return item;
}

export function computeEntityActions(entity: string | string[], hass: HomeAssistant, config: Partial<CardConfig>): ActionElement[] {
  if (!Array.isArray(entity)) {
    const actionList = computeEntityActionConfig(entity, hass, config);
    return actionList.map(actionElement);
  }
  else {
    const actions = entity.map(el => computeEntityActions(el, hass, config));
    let actionsList = actions[0]
      .filter(action => actions.every(e => e.map(el => el.id).includes(action.id)))
      .map(action => {
        if (action.variable) {
          if (!actions.every(entityActions => entityActions.find(e => e.id == action.id)!.variable)) return omit(action, ['variable']) as ActionElement;
          else {
            if (action.variable.type == EVariableType.Level) {
              return {
                ...action,
                variable: {
                  ...action.variable,
                  min: Math.max(...actions.map(entityActions => (entityActions.find(e => e.id == action.id)!.variable as LevelVariableConfig).min)),
                  max: Math.min(...actions.map(entityActions => (entityActions.find(e => e.id == action.id)!.variable as LevelVariableConfig).max)),
                  step: Math.max(...actions.map(entityActions => (entityActions.find(e => e.id == action.id)!.variable as LevelVariableConfig).step)),
                }
              }
            } else {
              let options = (action.variable as ListVariableConfig).options;
              actions.forEach(entityActions => {
                let config = (entityActions.find(e => e.id == action.id)!.variable as ListVariableConfig);
                options = options.filter(e => config.options.map(e => e.value).includes(e.value));
              });
              return {
                ...action,
                variable: {
                  ...action.variable,
                  options: options
                }
              }
            }
          }
        }
        return action;
      });
    return actionsList;
  }
}
