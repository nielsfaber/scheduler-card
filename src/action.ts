import { localize, ServiceNameTranslations } from "./localize/localize"
import { DefaultActionIcon, DefaultLevelVariableConfig, DefaultListVariableConfig } from "./const"

import { extend, pick, getDomainFromEntityId, mapObject, omit, removeDomainFromEntityId } from "./helpers";
import { IActionConfig, IActionElement, IHassEntity, ILevelVariable, ILevelVariableConfig, IListVariableConfig, IDictionary, IListVariable, IHassAction, EVariableType, IListVariableOption } from "./types";

export function CreateAction(cfg: IActionConfig) {
  let data: IActionElement = {
    id: '',
    name: cfg.service in ServiceNameTranslations ? localize(ServiceNameTranslations[cfg.service]) : removeDomainFromEntityId(cfg.service),
    icon: DefaultActionIcon,
    service: '',
    routine: false,
  };

  data = <IActionElement>extend(data, cfg);
  data = <IActionElement>extend(data, { id: getActionId(data) });

  return data;
}

export function GetActionConfig(cfg: IActionConfig, entity: IHassEntity) {
  let obj: IActionConfig | null = { ...cfg };
  let domain = getDomainFromEntityId(entity.entity_id);

  if (getDomainFromEntityId(obj.service) == domain) obj = <IActionConfig>extend(obj, { service: removeDomainFromEntityId(obj.service) });

  obj = <IActionConfig>mapObject(obj, val => replaceAttributeTemplate(val, entity));

  obj = filterUnsupportedActions(obj, entity.attributes.supported_features!);
  if (obj?.variable) obj = extendActionVariables(obj, entity);
  return obj;
}


function filterUnsupportedActions(cfg: IActionConfig, supported_features: number) {
  if (cfg.supported_feature) {
    if ((supported_features & cfg.supported_feature) == 0) return null;
  }

  if (cfg.variable?.supported_feature) {
    if ((supported_features & cfg.variable.supported_feature) == 0) {
      cfg = <IActionConfig>extend(cfg, {
        variable: null
      }, { compact: true });
    }
  }
  return cfg;
}

function replaceAttributeTemplate(val: any, entity: IHassEntity) {
  if (typeof val != "string") return val;
  let res = String(val).match(/^attribute:(\w+):?(\w+)?$/);
  if (res === null) return val;
  if (res[1] == 'entity_id') return entity.entity_id;
  if (!(res[1] in entity.attributes)) return null;
  if (res[2] !== undefined) {
    if (Array.isArray(entity.attributes[res[1]]) && entity.attributes[res[1]].includes(res[2])) return res[2];
    return null;
  }
  else return entity.attributes[res[1]];
}

function extendActionVariables(cfg: IActionConfig, entity: IHassEntity) {
  let obj: IActionConfig = { ...cfg };
  let variableCfg: Partial<IListVariableConfig | ILevelVariableConfig> = cfg.variable!;

  if (!variableCfg.name) variableCfg = extend(variableCfg, { name: variableCfg.field });

  variableCfg = mapObject(variableCfg, val => replaceAttributeTemplate(val, entity));

  if ('options' in variableCfg) {
    let optionCfg = [...variableCfg.options!];

    optionCfg = optionCfg.map(e => {
      if (typeof e != "object") return <IListVariableOption>{ value: e };
      return <IListVariableOption>extend(e, { value: replaceAttributeTemplate(e.value, entity) });
    }).filter(e => e.value);
    variableCfg = extend(variableCfg, { options: optionCfg }, { overwrite: true });

    let listCfg = <IListVariableConfig>extend(DefaultListVariableConfig, variableCfg);
    obj = <IActionConfig>extend(obj, <IActionConfig>{ variable: listCfg }, { overwrite: true });
  }
  else {
    let levelCfg = <ILevelVariableConfig>extend(DefaultLevelVariableConfig, variableCfg);
    obj = <IActionConfig>extend(obj, <IActionConfig>{ variable: levelCfg });
  }

  return obj;
}

export function exportVariableServiceData(input: ILevelVariable | IListVariable, cfg: ILevelVariableConfig | IListVariableConfig): IDictionary<string> {
  if (input.type == EVariableType.Level) {
    if ((input as ILevelVariable).enabled) return { [cfg.field]: String(input.value) };
    else return {};
  }
  else if (input.type == EVariableType.List) {
    return { [cfg.field]: String(input.value) };
  }
  else return {};
}

export function importHassAction(action: IHassAction) {
  let entity = action.entity;
  let service = action.service;

  if (getDomainFromEntityId(entity) && getDomainFromEntityId(service)) {
    service = removeDomainFromEntityId(service);
  }
  else if (!getDomainFromEntityId(entity) && getDomainFromEntityId(service)) {
    entity = getDomainFromEntityId(service) + "." + entity;
    service = removeDomainFromEntityId(service);
  }

  let service_data = omit(action, ['service', 'entity', 'service_data']);

  let output = <IHassAction>extend({}, {
    entity: entity,
    service: service,
    service_data: Object.keys(service_data).length ? service_data : null
  }, { compact: true });

  output = <IHassAction>extend(output, pick(action, ['service_data']));
  return output;
}


export function reverseParseAction(hassAction: IHassAction, actionConfig: IActionConfig[] | IActionElement[]) {
  let action = importHassAction(hassAction);
  let match = actionConfig.find(cfg => {
    let action_id = getActionId(cfg);
    if (cfg.service != action.service) return false;
    if (action_id == getActionId(action)) return true;
    if (cfg.variable && action.service_data) {
      if (Object.keys(action.service_data).includes(cfg.variable.field))
        return action_id == getActionId(<IHassAction>extend(action, { service_data: { [cfg.variable.field]: null } }, { compact: true }));
    }
    return false;
  });
  if (match) return match;
  return null;
}
export function getActionId(action: IActionConfig | IActionElement) {
  let sortObject = (e) => Object.entries(e)
    .sort((a, b) => a[0] > b[0] ? 1 : -1)
    .map(([k, v]) => [k, typeof v === 'object' && v !== null ? sortObject(v) : v])
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

  let obj = pick(action, ['service', 'service_data']);
  obj = sortObject(obj);

  let res = Object.values(obj).map(e => JSON.stringify(e).replace(/[\W]/g, ' ').split(' ').filter(e => e != ' ' && e != '').join('_')).join('_');
  return res;
}