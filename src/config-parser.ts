
import { forEach, each, find, has, pick, omit, filter, flatten, map, mapValues, sortBy, omitBy, isUndefined, isEmpty } from "lodash-es";

import { IEntityConfig, IGroupConfig, IGroupElement, IActionConfig, IActionElement, IConfig, IEntityElement, IConfigFull, IHassAction } from './types'
import { defaultDomainConfig, getIconForDomain, getIconForAction, getNameForDomain, getNameForService, getDefaultActionVariableConfig, RoutineAction, supportedFeaturesFilter } from './default-config'
import { getDomainFromEntityId, CreateSlug, IsSchedulerEntity, ImportFromHass, ImportHassAction } from './helpers'


interface IEntity {
  entity_id: string,
  attributes: {
    friendly_name?: string,
    icon?: string,
    supported_features?: number,
    actions?: any
  }
}

export class Config {
  private entities: IEntityElement[];
  private groups: IGroupElement[];
  public userConfig: IConfigFull;

  constructor() {
    this.entities = [];
    this.groups = [];

    this.userConfig = {
      groups: {},
      domains: {},
      entities: {},
      discover_existing: true,
      standard_configuration: true,
    };
  }

  setUserConfig(userConfig: IConfig) {
    Object.assign(this.userConfig, pick(userConfig, ['entities', 'groups', 'discover_existing', 'standard_configuration']));

    if (this.userConfig.standard_configuration) Object.assign(this.userConfig, { domains: defaultDomainConfig });
    if (userConfig.domains) {
      each(userConfig.domains, (cfg, domain) => {
        let domainCfg = { ... this.userConfig.domains };
        Object.assign(domainCfg, { [domain]: cfg });
        this.userConfig.domains = domainCfg;
      });
    }

    if (this.userConfig.groups) {
      each(userConfig.groups, this.AddGroup.bind(this));
    }
  }

  /* Groups functions */
  AddGroup(cfg: IGroupConfig, id: string) {
    if (this.FindGroup(id)) return;

    let data = Object.assign({
      id: id,
      icon: 'folder-outline',
      domains: [],
      entities: [],
      name: getNameForDomain(id)
    }, omitBy({ ...cfg }, isUndefined));

    this.groups.push(data);
  }

  FindGroup(id: string): IGroupElement | null {
    let res = find(this.groups, { id: id });
    if (res) return res;
    else return null;
  }

  AddEntityToGroup(entity_id: string) {
    let domain = getDomainFromEntityId(entity_id);
    let group = find(this.groups, group => {
      return (group.domains.includes(domain) || group.entities.includes(entity_id));
    });
    if (group) return; //nothing to be done

    group = this.FindGroup(domain);
    if (!group) {
      this.AddGroup({
        icon: getIconForDomain(domain),
        entities: [entity_id]
      }, domain);
    }
    else {
      let list = [...group['entities']];
      list.push(entity_id);
      this.groups.forEach((group, i) => {
        if (group['id'] == domain) this.groups[i].entities = list;
      });
    }
  }

  GetGroups(): IGroupElement[] {
    let output = [... this.groups];
    output = sortBy(output, 'name');
    return output;
  }

  /* Entities functions */
  AddEntity(cfg: IEntityConfig, id: string) {
    if (this.FindEntity(id)) return;

    let data: IEntityElement = {
      id: id,
      name: String(id.split('.').pop()),
      icon: getIconForDomain(getDomainFromEntityId(id)),
      actions: []
    }
    if (cfg.hasOwnProperty('name')) Object.assign(data, { name: cfg.name });
    if (cfg.hasOwnProperty('icon')) Object.assign(data, { icon: cfg.icon });

    this.entities.push(data);
    this.AddEntityToGroup(id);
  }

  FindEntity(id: string): IEntityElement | null {
    let res = find(this.entities, { id: id });
    if (res) return res;
    else return null;
  }

  GetEntitiesForGroup(group_id?: string): IEntityElement[] {
    let output = [... this.entities];
    if (group_id) {
      let group = this.FindGroup(group_id);
      if (!group) return [];
      output = output.filter(e => {
        let domain = getDomainFromEntityId(e.id);
        return (group?.entities.includes(e.id) || group?.domains.includes(domain))
      });
    }
    output = sortBy(output, 'name');
    return output;
  }

  AddActionToEntity(entity_id: string, new_action: IActionElement) {
    if (!this.FindEntity(entity_id)) throw Error(`Entity '${entity_id}' must be created before actions can be assigned`);

    if (this.FindAction(entity_id, new_action.id)) return;
    if (this.GetActionsForEntity(entity_id).find(action => {
      if (!action.hasOwnProperty('variable')) return false;
      if (new_action.hasOwnProperty('service_data') && new_action['service_data']!.hasOwnProperty(action['variable']!['field'])) return true;
      else return false;
    })) return;


    let actions = [... this.GetActionsForEntity(entity_id)];
    actions.push(new_action);
    this.entities.forEach((entity, i) => {
      if (entity['id'] == entity_id) this.entities[i].actions = actions;
    });
  }

  /* Actions functions */
  CreateAction(cfg: IActionConfig): IActionElement {
    let id = CreateSlug(pick(cfg, ['service', 'service_data']));
    let data: IActionElement = {
      id: id,
      name: getNameForService(cfg.service),
      icon: getIconForAction(cfg.service),
      service: cfg.service,
      routine: false
    };

    if (cfg.hasOwnProperty('name')) Object.assign(data, { name: cfg.name });
    if (cfg.hasOwnProperty('icon')) Object.assign(data, { icon: cfg.icon });
    if (cfg.hasOwnProperty('service_data') && Object.keys(cfg.service_data!).length) Object.assign(data, { service_data: cfg.service_data });
    if (cfg.hasOwnProperty('variable')) Object.assign(data, { variable: Object.assign(getDefaultActionVariableConfig(cfg.variable!['field']), cfg.variable) });
    if (cfg.hasOwnProperty('routine')) Object.assign(data, { routine: cfg.routine });
    return data;
  }

  FindAction(entity_id: string, action_id): IActionElement | null {
    let actions = this.GetActionsForEntity(entity_id);

    let action = find(actions, { id: action_id });
    if (action) return action;
    return null;
  }

  GetActionsForEntity(entity_id: string): IActionElement[] {
    let entity = this.FindEntity(entity_id);
    if (!entity) return [];

    let output = [...entity.actions];

    if (output.filter(e => e.routine).length && !find(output, { id: RoutineAction.id })) {
      output.push({ ...RoutineAction });
    }

    output = sortBy(output, 'name');

    return output;
  }


  entityInDomainConfig(entity_id: string) {
    let domain = getDomainFromEntityId(entity_id);
    if (!(domain in this.userConfig.domains)) return false;
    let domainCfg = this.userConfig.domains[domain];
    if (domainCfg.include && !domainCfg.include.includes(entity_id)) return false;
    else if (domainCfg.exclude && domainCfg.exclude.includes(entity_id)) return false;
    else return true;
  }

  entityInEntityConfig(entity_id: string) {
    if (!(entity_id in this.userConfig.entities)) return false;
    else return true;
  }

  getActionConfigForEntity(actionCfg: IActionConfig, entity: IEntity): IActionConfig | null {
    let cfg = { ...actionCfg };
    let domain = getDomainFromEntityId(entity.entity_id);
    if (getDomainFromEntityId(actionCfg.service) == domain) Object.assign(cfg, { service: cfg.service.split('.').pop() });
    if (entity.attributes.hasOwnProperty('supported_features') && supportedFeaturesFilter[domain] && supportedFeaturesFilter[domain][cfg.service]) {
      let filter = supportedFeaturesFilter[domain][cfg.service];
      if (filter instanceof Object && cfg.hasOwnProperty('variable') && (entity.attributes.supported_features! & Number(filter[cfg.variable!.field])) == 0) {
        let { variable, ...newCfg } = cfg;
        return newCfg;
      } else if (!isNaN(filter) && (entity.attributes.supported_features! & Number(filter)) == 0) return null;
    }
    return cfg;
  }

  getConfigForEntity(entity: IEntity): IEntityConfig | null {
    let entity_id = entity.entity_id;
    let domain = getDomainFromEntityId(entity_id);
    let cfg: IEntityConfig = { actions: [] };
    if (entity.attributes.hasOwnProperty('friendly_name')) Object.assign(cfg, { name: entity.attributes.friendly_name });
    if (entity.attributes.hasOwnProperty('icon')) Object.assign(cfg, { icon: entity.attributes.icon });

    if (!this.entityInDomainConfig(entity_id) && !this.entityInEntityConfig(entity_id)) return null;
    if (IsSchedulerEntity(entity_id)) return null;
    if (this.entityInDomainConfig(entity_id)) {
      let domainCfg = this.userConfig.domains[domain];
      if (domainCfg.hasOwnProperty('name')) Object.assign(cfg, { name: domainCfg.name });
      if (domainCfg.hasOwnProperty('icon')) Object.assign(cfg, { icon: domainCfg.icon });
      if (domainCfg.hasOwnProperty('actions')) Object.assign(cfg, { actions: [...cfg.actions].concat([...domainCfg.actions].map(e => this.getActionConfigForEntity(e, entity)).filter(e => e) as IActionConfig[]) });
    }
    if (this.entityInEntityConfig(entity_id)) {
      let entityCfg = this.userConfig.entities[entity_id];
      if (entityCfg.hasOwnProperty('name')) Object.assign(cfg, { name: entityCfg.name });
      if (entityCfg.hasOwnProperty('icon')) Object.assign(cfg, { icon: entityCfg.icon });
      if (entityCfg.hasOwnProperty('actions')) Object.assign(cfg, { actions: [...cfg.actions].concat([...entityCfg.actions].map(e => this.getActionConfigForEntity(e, entity)).filter(e => e) as IActionConfig[]) });
    }
    if (!cfg.actions.length) return null;
    return cfg;

  }

  LoadEntities(entityList: IEntity[]) {
    //load the entities from configuration
    forEach(entityList, entity => {
      let cfg = this.getConfigForEntity(entity);
      let entity_id = entity.entity_id;
      if (!cfg) return;
      this.AddEntity(cfg, entity_id);
      cfg.actions.map(this.CreateAction).forEach(e => this.AddActionToEntity(entity_id, e));
    })

    if (this.userConfig.discover_existing) {
      Object.entries(entityList).filter(([id]) => IsSchedulerEntity(id)).forEach(([, entity]: [string, any]) => {
        if (!entity.attributes.hasOwnProperty('actions') || !Array.isArray(entity.attributes.actions)) return;
        entity.attributes.actions.map(el => ImportHassAction(el, this)).forEach((el: IHassAction) => {
          if (!this.FindEntity(el.entity) && el.entity in entityList) {
            let entityCfg = { actions: [] };
            if (entityList[el.entity].attributes.hasOwnProperty('friendly_name')) Object.assign(entityCfg, { name: entityList[el.entity].attributes.friendly_name });
            if (entityList[el.entity].attributes.hasOwnProperty('icon')) Object.assign(entityCfg, { icon: entityList[el.entity].attributes.icon });
            this.AddEntity(entityCfg, el.entity);
          };
          let actionCfg = { ...el };
          if (el.hasOwnProperty('service_data')) {
            let suffix = CreateSlug(Object.values(el.service_data!));
            Object.assign(actionCfg, { name: `${getNameForService(el.service)}_${suffix}` });
          }
          this.AddActionToEntity(el.entity, this.CreateAction(actionCfg));
        });
      });
    }
  }
}