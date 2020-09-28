import { IDictionary, IDomainConfig, IEntityElement, IEntityConfig, IHassEntity, IActionElement, IActionConfig } from "./types";
import { getDomainFromEntityId, extend, omit, keyMap, filterObject, removeDomainFromEntityId } from "./helpers";
import { DefaultEntityIcon } from "./const";

import { default as standardConfig } from './standard-configuration.json';
import { getActionId } from "./action";


export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export class EntityList {
  domainConfig: IDictionary<IDomainConfig> = {};
  entityConfig: IDictionary<IEntityConfig> = {};
  entities: IEntityElement[] = [];
  standard_configuration: boolean = true;

  constructor() {
  }

  SetConfig(cfg: { domains: IDictionary<IDomainConfig>, entities: IDictionary<IDomainConfig>, standard_configuration: boolean }) {
    this.domainConfig = cfg.domains;
    this.entityConfig = cfg.entities;
    this.standard_configuration = cfg.standard_configuration;
  }

  InDomainCfg(entity_id: string) {
    let domain = getDomainFromEntityId(entity_id);
    if (!(domain in this.domainConfig)) return false;
    let domainCfg = this.domainConfig[domain];
    if (typeof domainCfg == "boolean" && !domainCfg) return false;
    if (domainCfg?.include && !domainCfg.include.includes(entity_id)) return false;
    if (domainCfg?.exclude && domainCfg.exclude.includes(entity_id)) return false;
    return true;
  }

  InEntityCfg(entity_id: string) {
    return (entity_id in this.entityConfig);
  }

  InConfig(entity_id: string) {
    if (IsSchedulerEntity(entity_id)) return false;
    return (this.InDomainCfg(entity_id) || this.InEntityCfg(entity_id));
  }

  Find(entity_id: string) {
    return this.entities.find(el => el.id == entity_id);
  }

  Get(entities: string[] | string = []): IEntityElement[] {
    let output: IEntityElement[] = [];
    if (!entities || !entities.length) output = [... this.entities];
    else {
      let list = Array.isArray(entities) ? entities : [entities];
      list.filter(e => this.Find(e) !== undefined).forEach(e => output.push({ ...this.entities[e] }));
    }
    output.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return output;
  }

  Add(entity_id: string, cfg: IEntityConfig) {
    if (this.Find(entity_id)) return;
    let data: IEntityElement = {
      id: entity_id,
      name: removeDomainFromEntityId(entity_id),
      icon: DefaultEntityIcon,
      actions: []
    }
    data = <IEntityElement>extend(data, omit(cfg, ['actions']));
    this.entities.push(data);
  }

  Set(entity_id: string, cfg: Partial<IEntityElement>) {
    if (!this.Find(entity_id)) throw (`Entity '${entity_id}' does not exist`);
    for (var i = 0; i < this.entities.length; i++) {
      if (this.entities[i].id == entity_id) {
        let entity = this.entities[i];
        Object.assign(entity, cfg);
        this.entities[i] = entity;
        return;
      }
    }
  }

  GetConfig(entity: IHassEntity) {
    let entity_id = entity.entity_id;
    let domain = getDomainFromEntityId(entity_id);

    let cfg: IEntityConfig = {
      actions: [],
    };
    let actionCfg: IDictionary<IActionConfig> = {};

    let actionFilter: string[] = [];

    if (standardConfig[domain] && this.standard_configuration) {
      cfg = extend(cfg, omit(standardConfig[domain], ['actions']));
      //if (this.domainConfig[domain] === undefined || this.domainConfig[domain] === null || typeof this.domainConfig[domain] != "boolean" || this.domainConfig[domain]) {
      if (standardConfig[domain]?.actions)
        actionCfg = extend(actionCfg, keyMap(standardConfig[domain].actions!, getActionId));
      //}
    }

    cfg = extend(cfg, {
      name: entity.attributes.friendly_name,
      icon: entity.attributes.icon
    });

    if (this.InDomainCfg(entity_id)) {
      cfg = extend(cfg, omit(this.domainConfig[domain], ['actions']));
      if (this.domainConfig[domain] && this.domainConfig[domain].actions) {
        let domainActionCfg = keyMap(this.domainConfig[domain].actions!, getActionId);
        actionCfg = extend(actionCfg, domainActionCfg);
        actionFilter = actionFilter.concat(Object.keys(domainActionCfg));
      }
    }

    if (this.InEntityCfg(entity_id)) {
      cfg = extend(cfg, omit(this.entityConfig[entity_id], ['actions']));
      if (this.entityConfig[entity_id] && this.entityConfig[entity_id].actions) {
        let entityActionCfg = keyMap(this.entityConfig[entity_id].actions!, getActionId);
        actionCfg = extend(actionCfg, entityActionCfg);
        actionFilter = actionFilter.concat(Object.keys(entityActionCfg));
      }
    }

    if (actionFilter.length) {
      actionCfg = filterObject(actionCfg, (_, key) => actionFilter.includes(key));
    }

    cfg = extend(cfg, { actions: Object.values(actionCfg) });
    return cfg;
  }


  AddAction(entity_id: string, action: IActionElement) {
    let entity = this.Find(entity_id);
    if (!entity) throw Error(`Entity '${entity_id}' must be created before actions can be assigned`);

    if (entity.actions.find(el => el.id == action.id)) return;

    let actions = [...entity.actions];
    actions.push(action);
    this.Set(entity_id, { actions: actions });
  }

}












