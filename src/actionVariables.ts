import { LevelVariableConfig, AtLeast, EVariableType, ListVariableConfig, ListVariableOption, Dictionary, Entry, ActionElement, LevelVariable } from "./types";



export function levelVariable(config: AtLeast<LevelVariableConfig, 'field'>) {
  let output: LevelVariableConfig = {
    type: EVariableType.Level,
    field: config.field,
    min: config.min || 0,
    max: config.max || 255,
    step: config.step || 1,
    optional: config.optional || false,
    unit: config.unit || '',
  };
  return output;
}

export function listVariable(config: AtLeast<ListVariableConfig, 'field' | 'options'>) {
  let output: ListVariableConfig = {
    type: EVariableType.List,
    field: config.field,
    options: config.options
  };
  return output;
}

export function listVariableOption(value: any, config: { icons?: Dictionary<string>, name?: string } = {}) {
  let output: ListVariableOption = {
    value: String(value),
  }
  if (config.icons && value in config.icons) output = { ...output, icon: config.icons[value] };
  if (config.name) output = { ...output, name: config.name };
  return output;
}

export function exportActionVariable(action: ActionElement, entry: Entry) {
  if (!entry.variable || !action.variable) return {};
  if (entry.variable.type == EVariableType.Level && action.variable.type == EVariableType.Level) {

    if ((entry.variable as LevelVariable).enabled) {
      return { [action.variable.field]: Number(entry.variable.value) };
    }
    else {
      return {};
    }
  }
  else {
    return { [action.variable.field]: entry.variable.value };
  };
}


// export const DefaultLevelVariableConfig: LevelVariableConfig = {
//   type: EVariableType.Level,
//   field: '',
//   unit: '',
//   min: 0,
//   max: 255,
//   step: 1,
//   optional: false,
// };

// export const DefaultListVariableConfig: ListVariableConfig = {
//   type: EVariableType.List,
//   field: '',
//   options: [],
// };