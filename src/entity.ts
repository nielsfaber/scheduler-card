import { IDictionary, IEntityElement, IEntityConfig, IHassEntity, IActionElement, IActionConfig } from "./types";
import { getDomainFromEntityId, extend, omit, keyMap, removeDomainFromEntityId, MatchPattern, mapObject, pick } from "./helpers";
import { DefaultEntityIcon } from "./const";

import { default as standardConfig } from './standard-configuration.json';
import { getActionId } from "./action";


export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export class EntityList {
  entities: IEntityElement[] = [];
  include: string[] = [];
  exclude: string[] = [];
  customize: IDictionary<IEntityConfig> = {};
  standard_configuration: boolean = true;

  constructor() {
  }

  SetConfig(cfg: { include?: string[], exclude?: string[], customize?: IDictionary<IEntityConfig>, standard_configuration: boolean }) {
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
    let customActionCfg: IDictionary<IActionConfig> = {};

    if (standardConfig[domain] && this.standard_configuration) {
      cfg = extend(cfg, omit(standardConfig[domain], ['actions']));
      if (standardConfig[domain]?.actions)
        actionCfg = extend(actionCfg, keyMap(standardConfig[domain].actions!, getActionId));
    }

    cfg = extend(cfg, {
      name: entity.attributes.friendly_name,
      icon: entity.attributes.icon
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


  AddAction(entity_id: string, action: IActionElement) {
    let entity = this.Find(entity_id);
    if (!entity) throw Error(`Entity '${entity_id}' must be created before actions can be assigned`);

    if (entity.actions.find(el => el.id == action.id)) return;

    let actions = [...entity.actions];
    actions.push(action);
    this.Set(entity_id, { actions: actions });
  }

}












