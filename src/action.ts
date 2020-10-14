import { localize, ServiceNameTranslations } from './localize/localize';
import { DefaultActionIcon, DefaultLevelVariableConfig, DefaultListVariableConfig } from './const';

import { extend, pick, getDomainFromEntityId, mapObject, omit, removeDomainFromEntityId } from './helpers';
import {
  ActionConfig,
  ActionElement,
  HassEntity,
  LevelVariable,
  LevelVariableConfig,
  ListVariableConfig,
  Dictionary,
  ListVariable,
  HassAction,
  EVariableType,
  ListVariableOption,
} from './types';

export function getActionId(action: ActionConfig | ActionElement) {
  //if (action.hasOwnProperty('id')) return (action as ActionElement).id;
  const sortObject = e =>
    Object.entries(e)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([k, v]) => [k, typeof v === 'object' && v !== null ? sortObject(v) : v])
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

  let obj = pick(action, ['service', 'service_data']);
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

export function CreateAction(cfg: ActionConfig) {
  let data: ActionElement = {
    id: '',
    name:
      cfg.service in ServiceNameTranslations
        ? localize(ServiceNameTranslations[cfg.service])
        : removeDomainFromEntityId(cfg.service),
    icon: DefaultActionIcon,
    service: '',
    routine: false,
  };

  data = extend(data, cfg) as ActionElement;
  data = extend(data, { id: getActionId(data) }) as ActionElement;

  return data;
}

function replaceAttributeTemplate(val: any, entity: HassEntity) {
  if (typeof val != 'string') return val;
  const res = String(val).match(/^attribute:(\w+):?(\w+)?$/);
  if (res === null) return val;
  if (res[1] == 'entity_id') return entity.entity_id;
  if (!(res[1] in entity.attributes)) return null;
  if (res[2] !== undefined) {
    if (Array.isArray(entity.attributes[res[1]]) && entity.attributes[res[1]].includes(res[2])) return res[2];
    return null;
  } else return entity.attributes[res[1]];
}

function filterUnsupportedActions(cfg: ActionConfig, supported_features: number) {
  if (cfg.supported_feature) {
    if ((supported_features & cfg.supported_feature) == 0) return null;
  }

  if (cfg.variable?.supported_feature) {
    if ((supported_features & cfg.variable.supported_feature) == 0) {
      cfg = extend(cfg, { variable: null }, { compact: true }) as ActionConfig;
    }
  }
  return cfg;
}

function extendActionVariables(cfg: ActionConfig, entity: HassEntity) {
  let obj: ActionConfig = { ...cfg };
  let variableCfg: Partial<ListVariableConfig | LevelVariableConfig> = cfg.variable!;

  if (!variableCfg.name) variableCfg = extend(variableCfg, { name: variableCfg.field });

  variableCfg = mapObject(variableCfg, val => replaceAttributeTemplate(val, entity));

  if ('options' in variableCfg) {
    let optionCfg = [...variableCfg.options!];
    const hasValueTemplates = Object.values(optionCfg)
      .map(e => (typeof e == 'object' ? e.value.match(/^attribute:(\w+):\w+$/) : null))
      .find(e => e);
    optionCfg = optionCfg
      .map(e => {
        if (typeof e != 'object') return { value: e } as ListVariableOption;
        return extend(e, { value: replaceAttributeTemplate(e.value, entity) }) as ListVariableOption;
      })
      .filter(e => e.value);
    if (hasValueTemplates) {
      const discoveredOptions: ListVariableOption[] = entity.attributes[hasValueTemplates![1]]
        .filter(e => Object.values(optionCfg).every(el => el.value != e))
        .map(e => {
          value: e;
        });
      optionCfg = optionCfg.concat(discoveredOptions);
    }

    optionCfg.sort((a, b) => {
      const val_a = a.name ? a.name : a.value;
      const val_b = b.name ? b.name : b.value;
      return val_a > val_b ? 1 : -1;
    });
    variableCfg = extend(variableCfg, { options: optionCfg }, { overwrite: true });

    const listCfg = extend(DefaultListVariableConfig, variableCfg) as ListVariableConfig;
    obj = extend(obj, { variable: listCfg }, { overwrite: true }) as ActionConfig;
  } else {
    const levelCfg = extend(DefaultLevelVariableConfig, variableCfg) as LevelVariableConfig;
    obj = extend(obj, { variable: levelCfg }) as ActionConfig;
  }

  return obj;
}

export function GetActionConfig(cfg: ActionConfig, entity: HassEntity) {
  let obj: ActionConfig | null = { ...cfg };
  const domain = getDomainFromEntityId(entity.entity_id);

  if (getDomainFromEntityId(obj.service) == domain)
    obj = extend(obj, { service: removeDomainFromEntityId(obj.service) }) as ActionConfig;

  obj = mapObject(obj, val => replaceAttributeTemplate(val, entity)) as ActionConfig;

  obj = filterUnsupportedActions(obj, entity.attributes.supported_features!);
  if (obj?.variable) obj = extendActionVariables(obj, entity);
  return obj;
}

export function exportVariableServiceData(
  input: LevelVariable | ListVariable,
  cfg: LevelVariableConfig | ListVariableConfig
): Dictionary<string | number> {
  if (input.type == EVariableType.Level) {
    if ((input as LevelVariable).enabled) return { [cfg.field]: Number(input.value) };
    else return {};
  } else if (input.type == EVariableType.List) {
    return { [cfg.field]: String(input.value) };
  } else return {};
}

export function importHassAction(action: HassAction) {
  let entity = action.entity;
  let service = action.service;

  const entity_domain = getDomainFromEntityId(entity);
  const service_domain = getDomainFromEntityId(service);

  if (entity_domain && service_domain) {
    if (entity_domain == service_domain) service = removeDomainFromEntityId(service);
  } else if (!entity_domain) {
    entity = service_domain + '.' + entity;
    service = removeDomainFromEntityId(service);
  }

  const service_data = omit(action, ['service', 'entity', 'service_data']);

  let output = extend(
    {},
    {
      entity: entity,
      service: service,
      service_data: Object.keys(service_data).length ? service_data : null,
    },
    { compact: true }
  ) as HassAction;

  output = extend(output, pick(action, ['service_data'])) as HassAction;
  return output;
}

export function reverseParseAction(hassAction: HassAction, actionConfig: ActionConfig[] | ActionElement[]) {
  const action = importHassAction(hassAction);

  const match = actionConfig.find(cfg => {
    const action_id = getActionId(cfg);
    if (cfg.service != action.service) return false;
    if (action_id == getActionId(action)) return true;
    if (cfg.variable && action.service_data) {
      if (Object.keys(action.service_data).includes(cfg.variable.field)) {
        return (
          action_id ==
          getActionId(extend(action, { service_data: { [cfg.variable.field]: null } }, { compact: true }) as HassAction)
        );
      }
    }
    return action_id == getActionId(extend(action, { service_data: { entity_id: action.entity } }) as HassAction);
  });
  if (match) return match;
  return null;
}
