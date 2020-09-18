
import { forEach, each, find, has, pick, omit, filter, flatten, map, mapValues, sortBy, omitBy, isUndefined, isEmpty } from "lodash-es";

import { IEntityConfig, IGroupConfig, IGroupElement, IActionConfig, IActionElement, IConfig, IEntityElement, IConfigFull } from './types'
import { defaultDomainConfig, getIconForDomain, getIconForAction, getNameForDomain, getNameForService, getDefaultActionVariableConfig } from './default-config'
import { getDomainFromEntityId, CreateSlug, IsSchedulerEntity, PrettyPrintName } from './helpers'

import { parseTimestamp } from './date-time';


export class Config {
  private entities: IEntityElement[];
  private groups: IGroupElement[];
  public next_sunrise?: Date;
  public next_sunset?: Date;
  public userConfig: IConfigFull;
  public sunrise: number | null = null;
  public sunset: number | null = null;

  constructor() {
    this.entities = [];
    this.groups = [];

    this.userConfig = {
      groups: {},
      domains: {},
      entities: {},
      discoverExisting: true,
      standardConfiguration: true,
      title: true,
      am_pm: false,
      time_step: 10
    };
  }

  setUserConfig(userConfig: IConfig) {
    Object.assign(this.userConfig, pick(userConfig, ['entities', 'groups', 'discoverExisting', 'standardConfiguration', 'title', 'am_pm', 'time_step']));

    if (this.userConfig.standardConfiguration) Object.assign(this.userConfig, { domains: defaultDomainConfig });
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

    let data = Object.assign({
      id: id,
      name: id.split('.').pop(),
      icon: getIconForDomain(getDomainFromEntityId(id))
    }, omitBy({ ...cfg }, isUndefined));

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
    let data = {
      id: id,
      name: getNameForService(cfg['service']),
      icon: getIconForAction(cfg['service']),
      service: cfg['service']
    };

    if (has(cfg, 'service_data') && !isEmpty(cfg)) Object.assign(data, pick(cfg, 'service_data'));
    if (has(cfg, 'icon')) Object.assign(data, pick(cfg, 'icon'));
    if (has(cfg, 'name')) Object.assign(data, pick(cfg, 'name'));
    if (has(cfg, 'variable')) Object.assign(data, { variable: Object.assign(getDefaultActionVariableConfig(cfg['variable']!['field']), cfg['variable']) });
    return data;
  }

  FindAction(entity_id: string, action_id): IEntityElement | null {
    let actions = this.GetActionsForEntity(entity_id);
    let action = find(actions, { id: action_id });
    if (action) return action;
    return null;
  }

  GetActionsForEntity(entity_id: string): IActionElement[] {
    let entity = this.FindEntity(entity_id);
    if (!entity) return [];

    let output = [...entity.actions];
    output = sortBy(output, 'name');
    return output;
  }

  LoadEntities(entityList) {
    //load the entities from configuration
    forEach(entityList, entity => {
      let entity_id: string = entity.entity_id;
      let domain: string = getDomainFromEntityId(entity_id)!;

      if (IsSchedulerEntity(entity_id)) return; //filter schedule items

      if (domain in this.userConfig.domains || entity_id in this.userConfig.entities) {
        let entityActions: IActionElement[] = [];
        let cfg: IEntityConfig = {
          actions: [],
          name: entityList[entity_id].attributes['friendly_name'],
          icon: entityList[entity_id].attributes['icon']
        };
        let skip_entity = false;
        if (domain in this.userConfig.domains) {
          if (has(this.userConfig.domains[domain], 'include') && !this.userConfig.domains[domain]['include'].includes(entity_id)) skip_entity = true;
          if (has(this.userConfig.domains[domain], 'exclude') && this.userConfig.domains[domain]['exclude'].includes(entity_id)) skip_entity = true;
          Object.assign(cfg, omit(this.userConfig.domains[domain], 'actions'));

          if (has(this.userConfig.domains[domain], 'actions') && !skip_entity) {
            let actions: IActionElement[] = mapValues(this.userConfig.domains[domain]['actions'], action => {
              action = { ...action };
              if (getDomainFromEntityId(action['service']) == domain) action = Object.assign(action, { service: action['service'].split('.').pop() });
              if (domain == "light" && entity.attributes.hasOwnProperty('supported_features')) {
                let isDimmable = entity.attributes['supported_features'] & 0b1;
                if (!isDimmable && action['variable']) delete action['variable'];
              }
              return this.CreateAction(action)
            });
            each(actions, e => entityActions.push(e));
          }
        }
        if (entity_id in this.userConfig.entities) {
          Object.assign(cfg, omit(this.userConfig.entities[entity_id], 'actions'));
          if (has(this.userConfig.entities[entity_id], 'actions')) {
            let actions: IActionElement[] = mapValues(this.userConfig.entities[entity_id]['actions'], action => {
              action = { ...action };
              if (getDomainFromEntityId(action['service']) == domain) action = Object.assign(action, { service: action['service'].split('.').pop() });
              if (domain == "light" && entity.attributes.hasOwnProperty('supported_features')) {
                let isDimmable = entity.attributes['supported_features'] & 0b1;
                if (!isDimmable && action['variable']) delete action['variable'];
              }
              return this.CreateAction(action)
            });
            each(actions, e => entityActions.push(e));
          }
          skip_entity = false;
        }
        if (skip_entity) return;
        this.AddEntity(cfg, entity_id);
        each(entityActions, e => this.AddActionToEntity(entity_id, e));
      }
    })

    if (this.userConfig.discoverExisting) {
      let res = filter(entityList, e => IsSchedulerEntity(e.entity_id));
      res = map(res, e => { return e.attributes['actions'] });
      res = flatten(res);
      each(res, item => {
        let config = { ...item };
        let entity_id = config['entity'];
        let service = config['service'];
        let service_data = omit(config, ['entity', 'service']);
        if (!getDomainFromEntityId(entity_id)) {
          entity_id = getDomainFromEntityId(service) + "." + entity_id;
          service = service.split('.').pop();
        }

        let action = this.CreateAction({
          service: service,
          service_data: service_data,
        });

        //add the entity if it does not exist
        if (!this.FindEntity(entity_id)) {
          if (!entityList[entity_id]) return; //entity is not in HA (corrupt schedule!)
          let entityCfg: IEntityConfig = {
            actions: [],
            name: entityList[entity_id].attributes['friendly_name'],
            icon: entityList[entity_id].attributes['icon']
          };
          this.AddEntity(entityCfg, entity_id);
        }
        this.AddActionToEntity(entity_id, action);
      });
    }

    if (entityList['sun.sun']) {
      this.next_sunrise = new Date(entityList['sun.sun'].attributes.next_rising);
      this.next_sunset = new Date(entityList['sun.sun'].attributes.next_setting);
      this.sunrise = parseTimestamp(`${String(this.next_sunrise.getHours()).padStart(2, '0')}:${String(this.next_sunrise.getMinutes()).padStart(2, '0')}`);
      this.sunset = parseTimestamp(`${String(this.next_sunset.getHours()).padStart(2, '0')}:${String(this.next_sunset.getMinutes()).padStart(2, '0')}`);
    }
  }


}