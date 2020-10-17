import { computeDomain, computeEntity } from 'custom-card-helpers';
import {
  ActionConfig,
  ActionElement,
  Dictionary,
  LevelVariableConfig,
  ListVariableConfig,
  ListVariableOption,
  EntityElement,
  HassAction,
  HassEntity,
} from './types';
import { ServiceNameTranslations, localize } from './localize/localize';
import { DefaultActionIcon, DefaultLevelVariableConfig, DefaultListVariableConfig } from './const';
import { pick, mapObject, omit, extend } from './helpers';

function variableConfig(config: Partial<LevelVariableConfig | ListVariableConfig>, entity: HassEntity) {
  if ('options' in config) {
    const output = { ...DefaultListVariableConfig };
    Object.assign(output, omit(config, ['options']));
    let optionConfig = (config as ListVariableConfig).options as ListVariableOption[] | string;
    if (typeof optionConfig == 'string') {
      const res = optionConfig.match(/^attribute:(\w+)$/);
      if (res && entity.attributes[res[1]]) {
        optionConfig = entity.attributes[res[1]].map(e => Object({ value: e }));
        Object.assign(output, { options: optionConfig });
      }
      return output;
    } else {
      let options: string[] = [];
      optionConfig.forEach(e => {
        const res = e.value.match(/^attribute:(\w+):?\w+$/);
        if (res && entity.attributes[res[1]]) options = options.concat(entity.attributes[res[1]]);
      });
      options = options.filter((v, k, arr) => arr.indexOf(v) === k);

      const newOptionConfig = options.map(e => {
        const match = (optionConfig as ListVariableOption[]).find(k => {
          const res = k.value.match(/^attribute:\w+:(\w+)$/);
          return res && res[1] == e;
        });
        return match ? Object.assign({ ...match }, { value: e }) : { value: e };
      });
      Object.assign(output, { options: newOptionConfig });
      return output;
    }
  } else {
    const output = { ...DefaultLevelVariableConfig };
    config = mapObject(config, v => {
      const res = String(v).match(/^attribute:(\w+)$/);
      return res && entity.attributes[res[1]] ? entity.attributes[res[1]] : v;
    });
    Object.assign(output, config);
    return output;
  }
}

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

export function actionConfig(config: ActionConfig, entity: HassEntity) {
  const service = computeEntity(config.service == 'attribute:entity_id' ? entity.entity_id : config.service);

  const data: ActionElement = {
    id: '',
    name: config.name || (service in ServiceNameTranslations ? localize(ServiceNameTranslations[service]) : service),
    icon: config.icon || DefaultActionIcon,
    service: service,
    routine: false,
  };

  if (config.service_data) Object.assign(data, { service_data: config.service_data });

  if (config.supported_feature && entity) {
    if ((Number(entity.attributes.supported_features) & config.supported_feature) == 0) return null;
  }

  if (
    entity &&
    config.variable &&
    (!config.variable.supported_feature ||
      Number(entity.attributes.supported_features) & config.variable.supported_feature)
  ) {
    Object.assign(data, { variable: variableConfig(config.variable, entity) });
  }

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
  actionCfg: { service: string; service_data?: Dictionary<any> },
  hassEntity: HassEntity
) {
  const actions = entity.actions.map(e => actionConfig(e, hassEntity)).map(e => e) as ActionElement[];
  const action_id = uniqueId(omit(actionCfg, ['entity']));

  const match = actions.find(el => {
    if (el.id == action_id) return true;
    if (el.variable && actionCfg.service_data && Object.keys(actionCfg.service_data).includes(el.variable.field)) {
      return el.id == uniqueId(extend(actionCfg, { service_data: { [el.variable.field]: null } }, { compact: true }));
    }
    return false;
  });
  if (match) return match;
  return actionConfig(omit(actionCfg, ['entity']) as HassAction, hassEntity) as ActionElement;
}
