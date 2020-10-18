import { computeDomain, computeEntity } from 'custom-card-helpers';
import {
  ActionConfig,
  ActionElement,
  Dictionary,
  EntityElement,
  HassAction,
} from './types';
import { ServiceNameTranslations, localize } from './localize/localize';
import { DefaultActionIcon } from './const';
import { pick, omit, extend } from './helpers';
import { HassEntity } from 'home-assistant-js-websocket';


export function uniqueId(input: Partial<ActionElement>) {
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

  const data: ActionElement = {
    id: '',
    name: config.name || (service in ServiceNameTranslations ? localize(ServiceNameTranslations[service]) : service),
    icon: config.icon || DefaultActionIcon,
    service: service,
  };
  if (config.service_data) Object.assign(data, { service_data: config.service_data });
  if (config.variable) Object.assign(data, { variable: config.variable });

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

  const service_data = omit(config, ['service', 'entity', 'service_data']);

  let output = extend(
    {},
    {
      entity: entity,
      service: service,
      service_data: Object.keys(service_data).length ? service_data : null,
    },
    { compact: true }
  ) as HassAction;

  output = extend(output, pick(config, ['service_data'])) as HassAction;
  return output;
}

export function findAction(
  entity: EntityElement,
  actionCfg: { service: string; service_data?: Dictionary<any> }
) {
  const actions = entity.actions.map(actionConfig).map(e => e) as ActionElement[];
  const action_id = uniqueId(omit(actionCfg, ['entity']));

  const match = actions.find(el => {
    if (el.id == action_id) return true;
    if (el.variable && actionCfg.service_data && Object.keys(actionCfg.service_data).includes(el.variable.field)) {
      return el.id == uniqueId(extend(actionCfg, { service_data: { [el.variable.field]: null } }, { compact: true }));
    }
    return false;
  });

  if (match) return match;
  return actionConfig(omit(actionCfg, ['entity']) as HassAction) as ActionElement;
}
