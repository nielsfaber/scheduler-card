
import _ from "lodash";
import { IDictionary, IEntityConfigEntry, IGroupConfigEntry, IButtonEntry, IActionConfigEntry, IConfig } from './types'
import { defaultDomainConfig, getIconForDomain, getIconForAction, getGroupNameForDomain } from './default-config'
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
      _.each(userConfig.groups, this.CreateGroup.bind(this));
    }

    this.discoverExisting = (userConfig.discoverExisting !== undefined) ? userConfig.discoverExisting : true;
  }

  CreateGroup(cfg: object, id: string) {
    let data = { ...cfg };
    if (this.groups[id]) return;
    _.defaults(data, {
      name: getGroupNameForDomain(id),
      domains: [],
      entities: [],
    });
    this.groups[id] = data;
  }

  FindGroupForEntity(entity_id: string): boolean {
    let domain = getDomainFromEntityId(entity_id);
    let res = _.find(this.groups, e => { return e.domains.includes(domain) || e.entities.includes(entity_id) });
    if (res) return true;
    else return false;
  }

  AddEntityToGroup(entity_id: string) {
    let domain = getDomainFromEntityId(entity_id);
    if (this.groups[domain]) this.groups[domain]['entities']!.push(entity_id);
    else this.CreateGroup({ entities: [entity_id], icon: getIconForDomain(domain) }, domain);
  }

  AddEntityInfo(entity_id: string, cfg: IEntityConfigEntry) {
    if (this.entities[entity_id]) Object.assign(this.entities[entity_id], { ...cfg });
    else this.entities[entity_id] = Object.assign({ ...cfg }, { id: entity_id });
    if (!this.FindGroupForEntity(entity_id)) this.AddEntityToGroup(entity_id);
  }

  LoadEntities(entityList: object) {
    _.each(entityList, entity => {
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
      _(entityList)
        .filter(e => IsSchedulerEntity(e.entity_id))
        .map(e => { return e.attributes['actions'] })
        .flatten()
        .each(item => {
          let config = { ...item }
          if (!getDomainFromEntityId(config['entity'])) {
            config['entity'] = getDomainFromEntityId(config['service']) + "." + config['entity'];
            config['service'] = config['service'].split('.').pop();
          }
          this.AddEntityInfo(config['entity'], {
            actions: [_.pick(config, ['service', 'service_data'])]
          });
        })
    }

    _.each(this.entities, (cfg, entity_id) => {
      _.defaults(cfg, {
        name: entityList[entity_id].attributes['friendly_name'],
        icon: getIconForDomain(getDomainFromEntityId(entity_id))
      });

      Object.assign(cfg, {
        actions: _.mapValues(cfg['actions'], action => {
          let config = { ...action };
          _.defaults(config, {
            name: action['service'],
            icon: getIconForAction(action['service'])
          });
          Object.assign(config, { id: CreateSlug(_.pick(action, ['service', 'service_data'])) });
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
    return _.mapValues(this.groups, el => {
      return _.pick(el, ['name', 'icon']);
    });
  }

  GetEntities(group_id: string): IDictionary<IButtonEntry> {
    let entities = {};
    if (!group_id) entities = this.entities;
    else {
      let groupCfg = this.groups[group_id];
      entities = _.pickBy(this.entities, (_entityCfg, entity_id) => {
        let domain = getDomainFromEntityId(entity_id);
        if (groupCfg['domains'] && groupCfg['domains'].includes(domain)) return true;
        else if (groupCfg['entities'] && groupCfg['entities'].includes(entity_id)) return true;
        else return false;
      });
    }

    return _.mapValues(entities, el => {
      return _.pick(el, ['name', 'icon']);
    });
  }

  GetEntity(entity_id: string): IEntityConfigEntry {
    return this.entities[entity_id];
  }

  GetActions(entity_id: string): IDictionary<IButtonEntry> {
    let entityCfg = this.entities[entity_id];
    let actions = _.keyBy(entityCfg['actions'], 'id');

    return _.mapValues(actions, el => {
      return _.pick(el, ['name', 'icon']);
    });
  }

  GetAction(entity_id: string, action_id: string): IActionConfigEntry {
    let entityCfg = this.entities[entity_id];
    return _.find(entityCfg.actions, { id: action_id });
  }

}