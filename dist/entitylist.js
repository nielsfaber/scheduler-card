

class Entitylist {
  constructor(hass) {
    this._hass = hass;
    this.entities = {};
    this.groups = [];
  }

  Parselist(cfg) {
    var domain_config = cfg['domains'];
    var entity_config = cfg['entities'];
    var groups = cfg['groups'];
    if (!groups) groups = {};

    var included_domains = (domain_config) ? Object.keys(domain_config) : [];
    var included_entities = (entity_config) ? Object.keys(entity_config) : [];

    Object.keys(this._hass.states).forEach(entity_id => {
      var domain = entity_id.split('.').shift();
      if (included_domains.includes(domain)) {
        if (this.entities[entity_id] === undefined) this.entities[entity_id] = new Entity(this._hass.states[entity_id]);
        this.entities[entity_id].Set(domain_config[domain]);
      }
      if (included_entities.includes(entity_id)) {
        if (this.entities[entity_id] === undefined) this.entities[entity_id] = new Entity(this._hass.states[entity_id]);
        this.entities[entity_id].Set(entity_config[entity_id]);
      }
    });

    if (!Object.keys(groups).length) {
      var standard_groups = Object.keys(this.entities).map(el => { return el.split('.').shift() }).filter((value, index, self) => { return self.indexOf(value) === index }).sort();
      standard_groups = standard_groups.reduce((a, b) => (a[b] = { 'domains': [b] }, a), {});
      groups = standard_groups;
    }

    Object.keys(groups).forEach(group_id => {
      var groupCfg = groups[group_id];
      var group = new Group(groupCfg, group_id);
      if (groupCfg.domains !== undefined) {
        groupCfg['domains'].forEach(domain => {
          group.AddEntities(Object.keys(this.entities)
            .filter(entity => this.entities[entity].domain == domain)
            .map(entity => this.entities[entity]))
        });
      }
      if (groupCfg.entities !== undefined) {
        groupCfg['entities'].forEach(entity => {
          group.AddEntities(this.entities[entity]);
        });
      }
      this.groups[group.id] = group;
    });
  }

  Entities(entity_id = null) {
    if (!entity_id) return this.entities;
    return this.entities[entity_id];
  }

  Groups(group_id = null) {
    if (!group_id) return this.groups;
    return this.groups[group_id];
  }

}

export default Entitylist;


class Group {
  constructor(cfg, id) {
    Object.assign(this, {
      id: id,
      name: id,
      icon: 'folder-outline',
    });

    Object.keys(cfg).forEach(prop => {
      if (this[prop] !== undefined) this[prop] = cfg[prop];
    });

    this.entities = [];
  }

  AddEntities(entities) {
    if (!entities) return;
    if (!Array.isArray(entities)) entities = [entities];
    entities.forEach(entity => {
      if (this.entities.find(el => el.id == entity.id)) return;
      this.entities.push(entity);
    });
  }
}




class Entity {
  constructor(hassConfig) {
    Object.assign(this, {
      id: hassConfig.entity_id,
      domain: hassConfig.entity_id.split('.').shift(),
      name: hassConfig.entity_id,
      icon: 'toy-brick-outline',
    });
    this._actions = [];

    if (hassConfig.attributes['friendly_name'] !== undefined) this.name = hassConfig.attributes['friendly_name'];
    if (hassConfig.attributes['icon'] !== undefined) this.icon = hassConfig.attributes['icon'];
    this.services = {};
  }

  Set(cfg) {
    if (cfg !== undefined && cfg !== null) {
      Object.keys(cfg).forEach(prop => {
        if (this[prop] !== undefined) this[prop] = cfg[prop];
      });
    }
  }

  set actions(actions) {
    actions
      .map(e => new Action(e))
      .forEach(action => {
        if (this.actions.find(el => el.id == action.id)) return;
        this._actions.push(action);
      });
  }

  get actions() {
    return this._actions;
  }

  GetActions(cfg = null) {
    if (!cfg) return this.actions;
    else if (typeof cfg == 'string') return this.actions.find(el => el.id == cfg);
    //get from hass entity properties
    if (!cfg.service_data) cfg.service_data = {};
    var new_action = new Action(cfg);

    var existing_action = this.actions.find(el => el.id == new_action.id);
    if (existing_action) return existing_action;

    this._actions.push(new_action);
    return new_action;
  }
}


class Action {
  constructor(cfg, id) {
    Object.assign(this, {
      name: '<no name>',
      icon: 'flash',
      service: null,
      service_data: {}
    });
    if (cfg !== undefined) {
      Object.keys(cfg).forEach(prop => {
        if (this[prop] !== undefined) this[prop] = cfg[prop];
      });
      if (cfg['name'] == undefined && cfg['service']) {
        var service = cfg.service;
        service = service.split('.').pop();
        if (this.service_data['entity_id']) service = `${service}_${service_data['entity_id'].split('.').join('_')}`;
        this['name'] = service.split('_').join(' ');
      }
      this.id = Array(this.service, JSON.stringify(this.service_data)).join(' ').replace(/[^a-z0-9+]+/gi, ' ').trim().split(' ').join('_').replace(/_+/g, '_');
      if (this.name == '<no name>') this.name = this.id.split('_').join(' ');
    }
  }
}

