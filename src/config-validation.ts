export function ValidateConfig(config: any) {
  const errors: string[] = [];
  let tree: string[] = [];

  const addError = (err: string | undefined) => {
    if (!err) return;
    errors.push(tree.length ? `in ${tree.join('->')}: ${err}` : err);
  };

  const Has = (object: Record<string, any>, key: string) => {
    return object.hasOwnProperty(key);
  };

  const Type = (input: any, type: string | string[]) => {
    if (Array.isArray(type)) return type.some(e => Type(input, e));
    else if (type == 'array') return Array.isArray(input);
    else return typeof input === type;
  };

  const Required = (obj: Record<string, any>, key: string, type: string | string[]) => {
    if (!Has(obj, key)) addError(`missing required property '${key}'`);
    else {
      const res = Type(obj[key], type);
      if (!res) addError(`'${key}' must be of type ${type}`);
    }
  };

  const Optional = (obj: Record<string, any>, key: string, type: string | string[]) => {
    if (!Has(obj, key)) return;
    const res = Type(obj[key], type);
    if (!res) addError(`'${key}' must be of type ${type}`);
  };

  const RequiredArrayType = (obj: Record<string, any>, key: string, type: string | string[]) => {
    let res = true;
    if (Has(obj, key) && Type(obj[key], 'array')) {
      if (obj[key].some(e => !Type(e, type))) {
        addError(`'${key}' must be an array with items of type ${type}`);
        res = false;
      }
    } else {
      res = false;
    }
    return res;
  };

  const validateActionConfig = (action: any) => {
    const baseTree = tree;
    Optional(action, 'name', 'string');
    Optional(action, 'icon', 'string');
    Required(action, 'service', 'string');
    Optional(action, 'service_data', 'object');
    RequiredArrayType(action, 'service_data', 'string');

    if (Has(action, 'service_data') && Type(action.service_data, 'object')) {
      if (Object.keys(action.service_data).some(e => !Type(e, 'string')))
        addError('service_data items must have string as index type');
    }
    Optional(action, 'variable', 'object');
    if (Has(action, 'variable') && Type(action.variable, 'object')) {
      tree.push('variable');
      Required(action.variable, 'field', 'string');
      Optional(action.variable, 'name', 'string');

      //list variable
      if (RequiredArrayType(action.variable, 'options', 'object')) {
        action.variable.options.forEach((option, index) => {
          tree = baseTree.concat(baseTree, ['variable', index]);
          Required(option, 'value', 'string');
          Optional(option, 'name', 'string');
          Optional(option, 'icon', 'string');
        });
      }

      //level variable
      else {
        Optional(action.variable, 'min', 'number');
        Optional(action.variable, 'max', 'number');
        Optional(action.variable, 'step', 'number');
        Optional(action.variable, 'optional', 'boolean');
        Optional(action.variable, 'unit', 'string');
      }
    }
  };

  Optional(config, 'discover_existing', 'boolean');
  Optional(config, 'standard_configuration', 'boolean');
  Optional(config, 'title', ['boolean', 'string']);
  Optional(config, 'time_step', 'number');
  Optional(config, 'show_header_toggle', 'boolean');

  Optional(config, 'include', 'array');
  RequiredArrayType(config, 'include', 'string');

  Optional(config, 'exclude', 'array');
  RequiredArrayType(config, 'exclude', 'string');

  Optional(config, 'display_options', 'object');
  if (Has(config, 'display_options')) {
    tree.push('display_options');
    Optional(config.display_options, 'primary_info', ['string', 'array']);
    Optional(config.display_options, 'secondary_info', ['string', 'array']);
    Optional(config.display_options, 'icon', 'string');
    RequiredArrayType(config.display_options, 'primary_info', 'string');
    RequiredArrayType(config.display_options, 'secondary_info', 'string');
  }
  tree = [];

  Optional(config, 'groups', 'array');
  if (Has(config, 'groups') && Type(config.groups, 'array')) {
    tree.push('groups');
    config.groups.forEach((group, index) => {
      tree = ['groups', index];
      Required(group, 'name', 'string');
      Optional(group, 'icon', 'string');
      Required(group, 'include', 'array');
      Optional(group, 'exclude', 'array');
      RequiredArrayType(group, 'include', 'string');
      RequiredArrayType(group, 'exclude', 'string');
    });
  }
  tree = [];
  Optional(config, 'customize', 'object');
  if (Has(config, 'customize') && Type(config.customize, 'object')) {
    Object.keys(config.customize).forEach(key => {
      tree = ['customize'];
      if (!Type(key, 'string')) addError(`${key} is not allowed`);
      Required(config.customize, key, 'object');
      if (Has(config.customize, key) && Type(config.customize[key], 'object')) {
        tree.push(key);
        const entryObj = config.customize[key] as { actions?: any; states?: any };
        Optional(entryObj, 'name', 'string');
        Optional(entryObj, 'icon', 'string');
        Optional(entryObj, 'actions', 'array');

        if (RequiredArrayType(entryObj, 'actions', 'object')) {
          entryObj.actions.forEach((action, index) => {
            tree = ['customize', key, index];
            validateActionConfig(action);
          });
        }

        tree = ['customize', key];
        Optional(entryObj, 'states', ['array', 'object']);
        RequiredArrayType(entryObj, 'states', 'string');
        if (Has(entryObj, 'states') && Type(entryObj.states[key], 'object')) {
          RequiredArrayType(entryObj, 'states', 'string');
          if (Has(entryObj, 'states') && Type(entryObj.states, 'object')) {
            tree.push('states');
            Required(entryObj.states, 'min', 'number');
            Required(entryObj.states, 'max', 'number');
            Optional(entryObj.states, 'step', 'number');
            Optional(entryObj.states, 'unit', 'string');
          }
        }
      }
    });
  }

  if (errors.length) {
    throw new Error(
      `Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`
    );
  }
}
