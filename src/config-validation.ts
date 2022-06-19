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
    else if (type == 'object') return typeof input === type && input !== null;
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
    Optional(action, 'variables', 'object');
    if (Has(action, 'variables') && Type(action.variables, 'object')) {
      Object.keys(action.variables).forEach(key => {
        tree = baseTree.concat(baseTree, ['variables']);
        if (!Type(key, 'string')) addError(`${key} is not allowed`);
        Required(action.variables, key, 'object');
        if (Has(action.variables, key) && Type(action.variables[key], 'object')) {
          tree.push(key);
          const variableCfg = action.variables[key] as { options?: any; min?: any; max?: any };

          //list variable
          if (RequiredArrayType(variableCfg, 'options', 'object')) {
            variableCfg.options.forEach((option, index) => {
              tree = baseTree.concat(baseTree, ['variables', key, 'options', index]);
              Required(option, 'value', 'string');
              Optional(option, 'name', 'string');
              Optional(option, 'icon', 'string');
            });
          }

          //level variable
          else if (variableCfg.min !== undefined || variableCfg.max !== undefined) {
            Optional(variableCfg, 'min', 'number');
            Optional(variableCfg, 'max', 'number');
            Optional(variableCfg, 'step', 'number');
            Optional(variableCfg, 'scale_factor', 'number');
            Optional(variableCfg, 'optional', 'boolean');
            Optional(variableCfg, 'unit', 'string');
          }

          //text variable
          else {
            Optional(variableCfg, 'multiline', 'boolean');
          }
        }
      });
    }
  };

  Optional(config, 'discover_existing', 'boolean');
  Optional(config, 'standard_configuration', 'boolean');
  Optional(config, 'title', ['boolean', 'string']);
  Optional(config, 'time_step', 'number');
  Optional(config, 'show_header_toggle', 'boolean');
  Optional(config, 'show_add_button', 'boolean');
  Optional(config, 'sort_by', ['string', 'array']);

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

        Optional(entryObj, 'states', ['object', 'array']);
        if (Has(entryObj, 'states') && Type(entryObj.states, 'array')) {
          RequiredArrayType(entryObj, 'states', 'string');
        } else if (Has(entryObj, 'states') && Type(entryObj.states, 'object')) {
          Required(entryObj.states, 'min', 'number');
          Required(entryObj.states, 'max', 'number');
          Optional(entryObj.states, 'step', 'number');
          Optional(entryObj.states, 'scale_factor', 'number');
          Optional(entryObj.states, 'unit', 'string');
        }
      }
    });
  }
  Optional(config, 'tags', ['string', 'array']);
  Optional(config, 'exclude_tags', ['string', 'array']);

  if (errors.length) {
    throw new Error(
      `Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`
    );
  }
}
