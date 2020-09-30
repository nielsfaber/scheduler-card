import { DomainNameTranslations, localize } from "./localize/localize";
import { DefaultGroupIcon, DiscoveredEntitiesGroup } from "./const";
import { extend, getDomainFromEntityId, MatchPattern, pick } from "./helpers";
import { IDictionary, IGroupElement, IGroupConfig } from "./types";
import { default as standardConfig } from './standard-configuration.json';


function GroupId(name: string) {
  let id = name.replace(/[^a-z0-9_]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_');
  return id;
}

export class GroupList {
  groupConfig: IGroupConfig[] = [];
  groups: IGroupElement[] = [];
  standard_configuration: boolean = true;

  constructor() {

  }

  SetConfig(cfg: { groups?: IGroupConfig[], standard_configuration: boolean }) {
    this.groupConfig = cfg.groups || [];
    this.standard_configuration = cfg.standard_configuration;
  }

  Find(group_id: string) {
    return this.groups.find(e => e.id == group_id);
  }

  Get(): IGroupElement[] {
    let output = [... this.groups].filter(e => e.id != DiscoveredEntitiesGroup);
    output.sort((a, b) => (a.name > b.name) ? 1 : -1);
    if (this.Find(DiscoveredEntitiesGroup)) output.push({ ...this.Find(DiscoveredEntitiesGroup)! });
    return output;
  }

  Add(group_id: string, cfg: Partial<IGroupElement>) {
    if (this.Find(group_id)) return;

    let data: IGroupElement = {
      id: group_id,
      name: group_id in DomainNameTranslations ? localize(DomainNameTranslations[group_id]) : group_id,
      icon: DefaultGroupIcon,
      entities: [],
    };
    data = <IGroupElement>extend(data, cfg);
    this.groups.push(data);
  }

  Set(group_id: string, cfg: Partial<IGroupElement>) {
    if (!this.Find(group_id)) throw (`Group '${group_id}' does not exist`);
    for (var i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id == group_id) {
        let group = this.groups[i];
        Object.assign(group, cfg);
        this.groups[i] = group;
        return;
      }
    }
  }

  InGroup(group_id: string, entity_id: string) {
    let group = this.Find(group_id);
    if (!group) return false;

    if (group.entities.includes(entity_id)) return true;

    let groupCfg = this.groupConfig.find(e => GroupId(e.name) == group_id);
    if (!groupCfg) return false;

    if (!groupCfg.include.find(e => MatchPattern(e, entity_id))) return false;
    if (groupCfg.exclude?.find(e => MatchPattern(e, entity_id))) return false;
    return true;
  }

  InConfig(entity_id: string) {
    let res = this.groups.find(e => this.InGroup(e.id, entity_id));
    return (res !== undefined);
  }

  CreateGroups(entity_ids: string[]) {
    this.groupConfig.forEach(cfg => this.Add(GroupId(cfg.name), pick(cfg, ['name', 'icon'])));
    entity_ids.forEach(entity_id => {
      if (this.InConfig(entity_id)) return;
      let domain = getDomainFromEntityId(entity_id);
      let group = this.Find(domain);
      if (group) {
        let entities = [...group.entities];
        entities.push(entity_id);
        this.Set(domain, { entities: entities });
      }
      else {
        let cfg: Partial<IGroupElement> = { entities: [entity_id] }
        if (standardConfig[domain]?.icon && this.standard_configuration) Object.assign(cfg, { icon: standardConfig[domain].icon });
        this.Add(domain, cfg);
      }
    });
  }
}