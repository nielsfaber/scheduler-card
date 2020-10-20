import { computeDomain, computeEntity } from 'custom-card-helpers';
import {
  ActionConfig,
  ActionElement,
  Dictionary,
  EntityElement,
  HassAction,
  ListVariableConfig,
  LevelVariableConfig,
} from './types';
import { DefaultActionIcon } from './const';
import { pick, omit } from './helpers';
import { listVariable, levelVariable } from './actionVariables';


export function uniqueId(input: ActionConfig) {
  const sortObject = e =>
    Object.entries(e)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([k, v]) => [k, typeof v === 'object' && v !== null ? sortObject(v) : v])
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

  let obj = pick(input, ['service', 'service_data']);
  obj = sortObject(obj);

  const res = Object.values(obj)
    .map(e =>
      JSON.stringify(e)
        .replace(/[\W]/g, ' ')
        .split(' ')
        .filter(e => e != ' ' && e != '')
        .join('_')
    )
    .join('_');

  return res;
}

export function actionConfig(config: ActionConfig) {
  const service = config.service;

  let data: ActionElement = {
    id: '',
    name: config.name,
    icon: config.icon || DefaultActionIcon,
    service: service,
  };
  if (config.service_data && Object.keys(config.service_data).length) Object.assign(data, { service_data: config.service_data });
  if (config.variable) {
    if ("options" in config.variable) Object.assign(data, { variable: listVariable(config.variable as ListVariableConfig) });
    else Object.assign(data, { variable: levelVariable(config.variable as LevelVariableConfig) });
  };

  Object.assign(data, { id: uniqueId(data) });
  return data;
}

export function importAction(config: Dictionary<any>): HassAction {
  let entity = config.entity;
  let service = config.service;

  const entity_domain = computeDomain(entity);
  const service_domain = computeDomain(service);

  if (entity_domain && service_domain) {
    if (entity_domain == service_domain) service = computeEntity(service);
  } else if (!entity_domain) {
    entity = service_domain + '.' + entity;
    service = computeEntity(service);
  }

  let service_data = omit(config, ['service', 'entity', 'service_data']);

  let output: HassAction = {
    entity: entity,
    service: service,
  };
  service_data = { ...service_data, ...config.service_data };
  if (Object.keys(service_data).length) output = { ...output, service_data: service_data };
  return output;
}

export function findActionIndex(
  entity: EntityElement,
  actionCfg: ActionConfig
) {
  const actions = entity.actions.map(actionConfig) as ActionElement[];
  const action_id = uniqueId(omit(actionCfg, ['entity']) as ActionConfig);

  const matches = actions.map(el => {
    if (el.id == action_id) return true;
    if (el.variable && actionCfg.service_data && Object.keys(actionCfg.service_data).includes(el.variable.field)) {
      let service_data = Object.entries(actionCfg.service_data)
        .filter(([key]) => key != el.variable!.field)
        .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
      let modifiedActionCfg = Object.keys(service_data).length ? { ...actionCfg, service_data: service_data } : omit(actionCfg, ['service_data']) as ActionConfig;
      return el.id == uniqueId(modifiedActionCfg);
    }
    return false;
  })
    .map((res, num) => res ? num : null)
    .filter(e => e !== null) as number[];

  return matches;
}

export function findAction(entity: EntityElement, actionCfg: { service: string; service_data?: Dictionary<any> }) {

  const res = findActionIndex(entity, actionCfg);
  if (res.length) return actionConfig(entity.actions[res[0]]);
  else return actionConfig(omit(actionCfg, ['entity']) as HassAction);
}