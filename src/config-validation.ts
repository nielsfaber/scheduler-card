
import _ from "lodash";

const TYPE_ARRAY = "array";
const TYPE_OBJECT = "object";
const TYPE_STRING = "string";
const TYPE_BOOLEAN = "boolean";
const TYPE_NUMBER = "number";
const TYPE_OTHER = "unknown";

function Type(item: any) {
  if (Array.isArray(item)) return TYPE_ARRAY;
  else if (typeof item == typeof {}) return TYPE_OBJECT;
  else if (typeof item == typeof "x") return TYPE_STRING;
  else if (typeof item == typeof true) return TYPE_BOOLEAN;
  else if (typeof item == typeof 1) return TYPE_NUMBER;
  else return TYPE_OTHER;
}

function IsType(item: any, type: string) {
  return Type(item) == type;
}

function Required(item: object, key: string, type: string) {
  if (!item || !item.hasOwnProperty(key)) return false;
  else return IsType(item[key], type);
}

function Optional(item: object, key: string, type: string) {
  if (!item || !item.hasOwnProperty(key)) return true;
  else return IsType(item[key], type);
}


export function ValidateConfig(config: any) {
  if (config['entities'] !== undefined) {
    try {
      if (!Required(config, 'entities', TYPE_OBJECT)) throw `Configuration for 'entities' should be of type '${TYPE_OBJECT}', but got '${Type(config['entities'])}'.`;
      _.each(config['entities'], (entityEntry, entry) => {
        if (!IsType(entityEntry, TYPE_OBJECT)) throw `In '${entry}: (...)': expected type '${TYPE_OBJECT}', but got '${Type(entityEntry)}'.`;
        if (!Optional(entityEntry, 'name', TYPE_STRING)) throw `In ${entry} at 'name: ${entityEntry['name']}': expected type '${TYPE_STRING}', but got '${Type(entityEntry['name'])}'.`;
        if (!Optional(entityEntry, 'icon', TYPE_STRING)) throw `In ${entry} at 'icon: ${entityEntry['icon']}': expected type '${TYPE_STRING}', but got '${Type(entityEntry['icon'])}'.`;
        if (!Optional(entityEntry, 'actions', TYPE_ARRAY)) throw `In ${entry} at 'actions: (...)': expected type '${TYPE_ARRAY}', but got '${Type(entityEntry['actions'])}'.`;
        if (entityEntry) {
          _.each(entityEntry['actions'], actionCfg => {
            if (!Required(actionCfg, 'service', TYPE_STRING)) throw `In ${entry}->actions at 'service: ${actionCfg['service']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['service'])}'.`;
            if (!Optional(actionCfg, 'name', TYPE_STRING)) throw `In ${entry}->actions at 'name: ${actionCfg['name']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['name'])}'.`;
            if (!Optional(actionCfg, 'icon', TYPE_STRING)) throw `In ${entry}->actions at 'icon: ${actionCfg['icon']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['icon'])}'.`;
            if (!Optional(actionCfg, 'service_data', TYPE_OBJECT)) throw `In ${entry}->actions at 'service_data: ${actionCfg['service_data']}': expected type '${TYPE_OBJECT}', but got '${Type(actionCfg['service_data'])}'.`;
          });
        }
      });
    }
    catch (e) { throw new Error(`Invalid configuration provided for 'entities'. ${e}`) }
  }

  if (config['domains'] !== undefined) {
    try {
      if (!Required(config, 'domains', TYPE_OBJECT)) throw `Configuration for 'domains' should be of type '${TYPE_OBJECT}', but got '${Type(config['domains'])}'.`;
      _.each(config['domains'], (domainEntry, entry) => {
        if (!IsType(domainEntry, TYPE_OBJECT)) throw `In '${entry}: (...)': expected type '${TYPE_OBJECT}', but got '${Type(domainEntry)}'.`;
        if (!Optional(domainEntry, 'name', TYPE_STRING)) throw `In ${entry} at 'name: ${domainEntry['name']}': expected type '${TYPE_STRING}', but got '${Type(domainEntry['name'])}'.`;
        if (!Optional(domainEntry, 'icon', TYPE_STRING)) throw `In ${entry} at 'icon: ${domainEntry['icon']}': expected type '${TYPE_STRING}', but got '${Type(domainEntry['icon'])}'.`;
        if (!Optional(domainEntry, 'actions', TYPE_ARRAY)) throw `In ${entry} at 'actions: (...)': expected type '${TYPE_ARRAY}', but got '${Type(domainEntry['actions'])}'.`;
        if (domainEntry) {
          _.each(domainEntry['actions'], actionCfg => {
            if (!Required(actionCfg, 'service', TYPE_STRING)) throw `In ${entry}->actions at 'service: ${actionCfg['service']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['service'])}'.`;
            if (!Optional(actionCfg, 'name', TYPE_STRING)) throw `In ${entry}->actions at 'name: ${actionCfg['name']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['name'])}'.`;
            if (!Optional(actionCfg, 'icon', TYPE_STRING)) throw `In ${entry}->actions at 'icon: ${actionCfg['icon']}': expected type '${TYPE_STRING}', but got '${Type(actionCfg['icon'])}'.`;
            if (!Optional(actionCfg, 'service_data', TYPE_OBJECT)) throw `In ${entry}->actions at 'service_data: ${actionCfg['service_data']}': expected type '${TYPE_OBJECT}', but got '${Type(actionCfg['service_data'])}'.`;
          });
        }
      });
    }
    catch (e) { throw new Error(`Invalid configuration provided for 'domains'. ${e}`) }
  }

  if (config['groups'] !== undefined) {
    try {
      if (!Required(config, 'groups', TYPE_OBJECT)) throw `Configuration for 'domains' should be of type '${TYPE_OBJECT}', but got '${Type(config['groups'])}'.`;
      _.each(config['groups'], (groupEntry, entry) => {
        if (!IsType(groupEntry, TYPE_OBJECT)) throw `In '${entry}: (...)': expected type '${TYPE_OBJECT}', but got '${Type(groupEntry)}'.`;
        if (!Optional(groupEntry, 'name', TYPE_STRING)) throw `In ${entry} at 'name: ${groupEntry['name']}': expected type '${TYPE_STRING}', but got '${Type(groupEntry['name'])}'.`;
        if (!Optional(groupEntry, 'icon', TYPE_STRING)) throw `In ${entry} at 'icon: ${groupEntry['icon']}': expected type '${TYPE_STRING}', but got '${Type(groupEntry['icon'])}'.`;
        if (!Optional(groupEntry, 'entities', TYPE_ARRAY)) throw `In ${entry} at 'icon: ${groupEntry['entities']}': expected type '${TYPE_ARRAY}', but got '${Type(groupEntry['entities'])}'.`;
        if (!Optional(groupEntry, 'domains', TYPE_ARRAY)) throw `In ${entry} at 'icon: ${groupEntry['domains']}': expected type '${TYPE_ARRAY}', but got '${Type(groupEntry['domains'])}'.`;
        if (groupEntry) {
          _.each(groupEntry['entities'], entityCfg => {
            if (!IsType(entityCfg, TYPE_STRING)) throw `In ${entry}->entities at '${entityCfg}': expected type '${TYPE_STRING}', but got '${Type(entityCfg)}'.`;
          });
          _.each(groupEntry['domains'], domainCfg => {
            if (!IsType(domainCfg, TYPE_STRING)) throw `In ${entry}->domains at '${domainCfg}': expected type '${TYPE_STRING}', but got '${Type(domainCfg)}'.`;
          });
        }
      });
    }
    catch (e) { throw new Error(`Invalid configuration provided for 'groups'. ${e}`) }
  }

  if (!Optional(config, 'discoverExisting', TYPE_BOOLEAN)) throw new Error(`Invalid configuration provided for 'discoverExisting': expected type '${TYPE_BOOLEAN}', but got '${Type(config['discoverExisting'])}'.`);
  if (!Optional(config, 'standardConfiguration', TYPE_BOOLEAN)) throw new Error(`Invalid configuration provided for 'standardConfiguration': expected type '${TYPE_BOOLEAN}', but got '${Type(config['standardConfiguration'])}'.`);
}
