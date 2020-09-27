import { localize } from "./localize/localize";
import { DefaultGroupIcon } from "./const";
import { extend, getDomainFromEntityId } from "./helpers";
import { IDictionary, IGroupElement } from "./types";
import { default as standardConfig } from './standard-configuration.json';


export function getNameForDomain(domain: string): string {
  let result: string | null = null;
  if (domain == 'climate') result = localize('domains.climate')
  else if (domain == 'cover') result = localize('domains.cover')
  else if (domain == 'fan') result = localize('domains.fan')
  else if (domain == 'light') result = localize('domains.light')
  else if (domain == 'switch') result = localize('domains.switch')
  else if (domain == 'vacuum') result = localize('domains.vacuum')
  if (result) return result;
  else return domain;
}


export class GroupList {
  groupConfig: IDictionary<Partial<IGroupElement>> = {};
  groups: IGroupElement[] = [];

  constructor() {

  }

  SetConfig(cfg: { groups: IDictionary<Partial<IGroupElement>> }) {
    this.groupConfig = cfg.groups;
  }

  Find(group_id: string) {
    return this.groups.find(e => e.id == group_id);
  }

  Get(): IGroupElement[] {
    let output = [... this.groups];
    output.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return output;
  }

  Add(group_id: string, cfg: Partial<IGroupElement>) {
    if (this.Find(group_id)) return;

    let data: IGroupElement = {
      id: group_id,
      name: getNameForDomain(group_id),
      icon: DefaultGroupIcon,
      domains: [],
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
    let domain = getDomainFromEntityId(entity_id);
    if (!group) return false;
    return group.entities.includes(entity_id) || group.domains.includes(domain);
  }

  InConfig(entity_id: string) {
    let res = this.groups.find(e => this.InGroup(e.id, entity_id));
    return (res !== undefined);
  }

  CreateGroups(entity_ids: string[]) {
    Object.entries(this.groupConfig).forEach(([id, cfg]) => this.Add(id, cfg));

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
        if (standardConfig[domain]?.icon) Object.assign(cfg, { icon: standardConfig[domain].icon });
        this.Add(domain, cfg);
      }
    });
  }
}