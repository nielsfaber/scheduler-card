import { Dictionary, EntityElement, EntityConfig, HassEntity, ActionElement, ActionConfig } from './types';
import { getDomainFromEntityId, extend, omit, keyMap, removeDomainFromEntityId, MatchPattern } from './helpers';
import { DefaultEntityIcon } from './const';

import { default as standardConfig } from './standard-configuration.json';
import { getActionId } from './action';

export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export class EntityList {
  entities: EntityElement[] = [];
  include: string[] = [];
  exclude: string[] = [];
  customize: Dictionary<EntityConfig> = {};
  standard_configuration = true;

  SetConfig(cfg: {
    include?: string[];
    exclude?: string[];
    customize?: Dictionary<EntityConfig>;
    standard_configuration: boolean;
  }) {
    this.standard_configuration = cfg.standard_configuration;
    this.include = cfg.include || [];
    this.exclude = cfg.exclude || [];
    this.customize = cfg.customize || {};
  }

  InConfig(entity_id: string) {
    if (IsSchedulerEntity(entity_id)) return false;
    if (!this.include.find(e => MatchPattern(e, entity_id))) return false;
    if (this.exclude.find(e => MatchPattern(e, entity_id))) return false;
    return true;
  }

  Find(entity_id: string) {
    return this.entities.find(el => el.id == entity_id);
  }

  Get(entities: string[] | string = []): EntityElement[] {
    let output: EntityElement[] = [];
    if (!entities || !entities.length) output = [...this.entities];
    else {
      const list = Array.isArray(entities) ? entities : [entities];
      list.filter(e => this.Find(e) !== undefined).forEach(e => output.push({ ...this.entities[e] }));
    }
    output.sort((a, b) => (a.name > b.name ? 1 : -1));
    return output;
  }

  Add(entity_id: string, cfg: EntityConfig) {
    if (this.Find(entity_id)) return;
    let data: EntityElement = {
      id: entity_id,
      name: removeDomainFromEntityId(entity_id),
      icon: DefaultEntityIcon,
      actions: [],
    };
    data = extend(data, omit(cfg, ['actions'])) as EntityElement;
    this.entities.push(data);
  }

  Set(entity_id: string, cfg: Partial<EntityElement>) {
    if (!this.Find(entity_id)) throw `Entity '${entity_id}' does not exist`;
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].id == entity_id) {
        const entity = this.entities[i];
        Object.assign(entity, cfg);
        this.entities[i] = entity;
        return;
      }
    }
  }

  GetConfig(entity: HassEntity) {
    const entity_id = entity.entity_id;
    const domain = getDomainFromEntityId(entity_id);

    let cfg: EntityConfig = {
      actions: [],
    };
    let actionCfg: Dictionary<ActionConfig> = {};
    let customActionCfg: Dictionary<ActionConfig> = {};

    if (standardConfig[domain] && this.standard_configuration) {
      cfg = extend(cfg, omit(standardConfig[domain], ['actions']));
      if (standardConfig[domain]?.actions)
        actionCfg = extend(actionCfg, keyMap(standardConfig[domain].actions!, getActionId));
    }

    cfg = extend(cfg, {
      name: entity.attributes.friendly_name,
      icon: entity.attributes.icon,
    });

    Object.entries(this.customize).forEach(([pattern, customCfg]) => {
      if (!MatchPattern(pattern, entity_id)) return;
      cfg = extend(cfg, omit(customCfg, ['actions']));
      if (customCfg.actions) customActionCfg = extend(customActionCfg, keyMap(customCfg.actions!, getActionId));
    });
    if (Object.keys(customActionCfg).length) {
      //actionCfg = pick(actionCfg, Object.keys(customActionCfg));
      actionCfg = extend(actionCfg, customActionCfg);
    }

    cfg = extend(cfg, { actions: Object.values(actionCfg) });
    return cfg;
  }

  AddAction(entity_id: string, action: ActionElement) {
    const entity = this.Find(entity_id);
    if (!entity) throw Error(`Entity '${entity_id}' must be created before actions can be assigned`);

    if (entity.actions.find(el => el.id == action.id)) return;

    const actions = [...entity.actions];
    actions.push(action);
    this.Set(entity_id, { actions: actions });
  }
}
