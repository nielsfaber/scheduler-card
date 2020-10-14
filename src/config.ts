import { EntityConfig, ActionConfig, Dictionary, GroupElement, HassEntity, GroupConfig } from './types';
import { DiscoveredEntitiesGroup } from './const';
import { EntityList, IsSchedulerEntity } from './entity';
import { CreateAction, GetActionConfig, reverseParseAction, importHassAction } from './action';
import { GroupList } from './group';
import { getDomainFromEntityId, pick } from './helpers';

export class Config {
  private entities: EntityList;
  private groups: GroupList;

  discover_existing = true;
  standard_configuration = true;

  constructor() {
    this.entities = new EntityList();
    this.groups = new GroupList();
  }

  setUserConfig(
    cfg: Partial<{
      include: string[];
      exclude: string[];
      groups: GroupConfig[];
      customize: Dictionary<EntityConfig>;
      discover_existing: boolean;
      standard_configuration: boolean;
    }>
  ) {
    if (cfg.discover_existing !== undefined) this.discover_existing = cfg.discover_existing;
    if (cfg.standard_configuration !== undefined) this.standard_configuration = cfg.standard_configuration;

    this.entities.SetConfig({
      include: cfg.include,
      exclude: cfg.exclude,
      customize: cfg.customize,
      standard_configuration: this.standard_configuration,
    });
    this.groups.SetConfig({ groups: cfg.groups, standard_configuration: this.standard_configuration });
  }

  GetGroups(showConditions = false) {
    let groups = this.groups.Get();
    groups = groups.filter(group => {
      const entities = this.GetEntitiesForGroup(group.id, showConditions);
      return entities.length > 0;
    });
    return groups;
  }

  GetEntitiesForGroup(group_id: string, showConditions = false) {
    const group = this.groups.Find(group_id);
    if (!group) return [];
    let entities = this.entities.Get().filter(e => this.groups.GroupHasEntity(group_id, e.id));
    if (showConditions) entities = entities.filter(e => e.states !== undefined);
    else entities = entities.filter(e => e.actions.length > 0);
    return entities;
  }

  FindEntity(entity_id: string | undefined) {
    if (!entity_id) return null;
    const entity = this.entities.Find(entity_id);
    if (!entity) return null;
    return entity;
  }

  FindAction(entity_id: string | undefined, action_id: string | undefined) {
    if (!entity_id || !action_id) return null;
    const entity = this.entities.Find(entity_id);
    if (!entity) return null;

    return entity.actions.find(e => e.id == action_id);
  }

  GetActionsForEntity(entity_id: string | undefined) {
    if (!entity_id) return [];
    const entity = this.entities.Find(entity_id);
    if (!entity) return [];

    const output = [...entity.actions];
    output.sort((a, b) => (a.name > b.name ? 1 : -1));
    return output;
  }

  GetEntityConfig(entity: HassEntity) {
    return this.entities.GetConfig(entity);
  }

  LoadEntities(entityList: HassEntity[]) {
    const included_entities = Object.keys(entityList).filter(entity_id => {
      if (this.entities.InConfig(entity_id)) return true;
      if (this.groups.InConfig(entity_id)) return true;
      return false;
    });

    //load the entities from configuration
    included_entities.forEach(entity_id => {
      const entity = entityList[entity_id];
      const entityConfig = this.GetEntityConfig(entity);
      this.entities.Add(entity_id, entityConfig);
      if (entityConfig.actions) {
        const actionCfg = entityConfig.actions.map(e => GetActionConfig(e, entity)).filter(e => e) as ActionConfig[];
        const actions = actionCfg.map(CreateAction);
        actions.forEach(el => this.entities.AddAction(entity_id, el));
      }
    });

    this.groups.CreateGroups(this.entities.Get().map(e => e.id));

    if (!this.discover_existing) return;
    const discovered_entities: string[] = [];

    Object.entries(entityList)
      .filter(([entity_id]) => IsSchedulerEntity(entity_id))
      .forEach(([, entity]) => {
        const actions = entity.attributes.actions;
        if (!actions) return;

        actions.forEach(action => {
          const domain = getDomainFromEntityId(action.entity) || getDomainFromEntityId(action.service);
          const id = domain + '.' + action.entity.split('.').pop();
          if (!(id in entityList)) return;

          const entity = entityList[id];
          const entityConfig = this.GetEntityConfig(entity);
          if (!this.entities.Find(id)) {
            this.entities.Add(id, entityConfig);
            discovered_entities.push(id);
          }

          let actionConfig = entityConfig.actions ? reverseParseAction(action, entityConfig.actions) : null;
          if (!actionConfig) actionConfig = pick(importHassAction(action), ['service', 'service_data']) as ActionConfig;
          const actionObj = CreateAction(actionConfig);
          this.entities.AddAction(id, actionObj);
        });
      });

    if (discovered_entities.length) {
      const group: Partial<GroupElement> = {
        entities: discovered_entities,
        icon: 'reload-alert',
      };
      this.groups.Add(DiscoveredEntitiesGroup, group);
    }
  }
}
