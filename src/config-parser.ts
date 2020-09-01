
import { defaults, forEach, each, find, has, pick, omit, filter, flatten, map, mapValues, keyBy, pickBy } from "lodash-es";

import { IDictionary, IEntityConfigEntry, IGroupConfigEntry, IButtonEntry, IActionConfigEntry, IConfig } from './types'
import { defaultDomainConfig, getIconForDomain, getIconForAction, getNameForDomain, getNameForService } from './default-config'
import { getDomainFromEntityId, CreateSlug, IsSchedulerEntity } from './helpers'



export class Config {
  public entities: IDictionary<IEntityConfigEntry>;
  private groups: IDictionary<IGroupConfigEntry>;
  public next_sunrise?: Date;
  public next_sunset?: Date;
  private userConfig: IConfig;
  private discoverExisting: Boolean;

  constructor(userConfig: IConfig) {
    this.entities = {};
    this.groups = {};

    if (!userConfig['entities'] && !userConfig['domains'] && (userConfig.standardConfiguration === undefined || userConfig.standardConfiguration)) this.userConfig = { domains: defaultDomainConfig };
    else this.userConfig = userConfig;

    if (userConfig.groups) {
      each(userConfig.groups, this.CreateGroup.bind(this));
    }

    this.discoverExisting = (userConfig.discoverExisting !== undefined) ? userConfig.discoverExisting : true;
  }

  CreateGroup(cfg: object, id: string) {
    let data = { ...cfg };
    if (this.groups[id]) return;
    defaults(data, {
      name: getNameForDomain(id),
      domains: [],
      entities: [],
    });
    this.groups[id] = data;
  }

  FindGroupForEntity(entity_id: string): boolean {
    let domain = getDomainFromEntityId(entity_id);
    let res = find(this.groups, e => {
      if (e.domains && Array.isArray(e.domains)) {
        if (e.domains.includes(domain)) return true;
      }
      if (e.entities && Array.isArray(e.entities)) {
        if (e.entities.includes(entity_id)) return true;
      }
      return false;
    });
    if (res) return true;
    else return false;
  }

  AddEntityToGroup(entity_id: string) {
    let domain = getDomainFromEntityId(entity_id);
    if (this.groups[domain]) {
      let list = [... this.groups[domain]['entities']!];
      list.push(entity_id);
      this.groups[domain]['entities'] = list;
    }
    else this.CreateGroup({ entities: [entity_id], icon: getIconForDomain(domain) }, domain);
  }

  AddEntityInfo(entity_id: string, cfg: IEntityConfigEntry) {
    if (this.entities[entity_id]) {
      Object.assign(this.entities[entity_id], omit({ ...cfg }, 'actions'));
      if (has(cfg, 'actions')) {
        each(cfg.actions, action => {
          let match = find(this.entities[entity_id]['actions'], e => { return CreateSlug(pick(e, ['service', 'service_data'])) == CreateSlug(pick(action, ['service', 'service_data'])) });
          if (match) return;
          let actions = [... this.entities[entity_id]['actions']];
          actions.push(action);
          this.entities[entity_id]['actions'] = actions;
        });
      }
    }
    else {
      let entry = Object.assign({ ...cfg }, { id: entity_id });
      defaults(entry, { actions: [] });
      this.entities[entity_id] = entry;
    }
    if (!this.FindGroupForEntity(entity_id)) this.AddEntityToGroup(entity_id);
  }

  LoadEntities(entityList) {
    forEach(entityList, entity => {
      let entity_id: string = entity.entity_id;
      let domain: string = getDomainFromEntityId(entity_id)!;

      if (IsSchedulerEntity(entity_id)) return; //filter schedule items

      if (this.userConfig.domains && domain in this.userConfig.domains) {
        this.AddEntityInfo(entity_id, this.userConfig.domains[domain]);
      }

      if (this.userConfig.entities && entity_id in this.userConfig.entities) {
        this.AddEntityInfo(entity_id, this.userConfig.entities[entity_id]);
      }
    });

    if (this.discoverExisting) {
      let res = filter(entityList, e => IsSchedulerEntity(e.entity_id));
      res = map(res, e => { return e.attributes['actions'] });
      res = flatten(res);
      each(res, item => {
        let config = { ...item }
        if (!getDomainFromEntityId(config['entity'])) {
          config['entity'] = getDomainFromEntityId(config['service']) + "." + config['entity'];
          config['service'] = config['service'].split('.').pop();
        }
        let service_data = omit(config, ['entity', 'service']);
        if (service_data) {
          this.AddEntityInfo(config['entity'], {
            actions: [{ service: config['service'], service_data: service_data }]
          });
        }
        else {
          this.AddEntityInfo(config['entity'], {
            actions: [pick(config, 'service')]
          });
        }
      })
    }

    each(this.entities, (cfg, entity_id) => {
      defaults(cfg, {
        name: entityList[entity_id].attributes['friendly_name'],
        icon: getIconForDomain(getDomainFromEntityId(entity_id))
      });

      Object.assign(cfg, {
        actions: map(cfg['actions'], action => {
          let config = { ...action };
          defaults(config, {
            name: getNameForService(action['service']),
            icon: getIconForAction(action['service'])
          });
          Object.assign(config, { id: CreateSlug(pick(action, ['service', 'service_data'])) });
          return config;
        })
      });
    });

    if (entityList['sun.sun']) {
      this.next_sunrise = new Date(entityList['sun.sun'].attributes.next_rising);
      this.next_sunset = new Date(entityList['sun.sun'].attributes.next_setting);
    }
  }

  GetGroups(): IDictionary<IButtonEntry> {
    return mapValues(this.groups, el => {
      return pick(el, ['name', 'icon']) as IButtonEntry
    });
  }

  GetEntities(group_id: string): IDictionary<IButtonEntry> {
    let entities = {};
    if (!group_id) entities = this.entities;
    else {
      let groupCfg = this.groups[group_id];
      entities = pickBy(this.entities, (_entityCfg, entity_id) => {
        let domain = getDomainFromEntityId(entity_id);
        if (groupCfg['domains'] && groupCfg['domains'].includes(domain)) return true;
        else if (groupCfg['entities'] && groupCfg['entities'].includes(entity_id)) return true;
        else return false;
      });
    }

    return mapValues(entities, el => {
      return pick(el, ['name', 'icon']);
    });
  }

  GetEntity(entity_id: string): IEntityConfigEntry {
    return this.entities[entity_id];
  }

  GetActions(entity_id: string): IDictionary<IButtonEntry> {
    let entityCfg = this.entities[entity_id];
    let actions = keyBy(entityCfg['actions'], 'id');

    return mapValues(actions, el => {
      return pick(el, ['name', 'icon']) as IButtonEntry
    });
  }

  GetAction(entity_id: string, action_id: string): IActionConfigEntry | null {
    let entityCfg = this.entities[entity_id];
    if (!entityCfg) return null;
    let res = find(entityCfg.actions, { id: action_id });
    if (res) return res as IActionConfigEntry;
    else return null;

  }

}