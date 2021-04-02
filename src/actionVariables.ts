import {
  LevelVariableConfig,
  AtLeast,
  EVariableType,
  ListVariableConfig,
  ListVariableOption,
  Dictionary,
  Entry,
  ActionElement,
  LevelVariable,
} from './types';
import { PrettyPrintName } from './helpers';

export function levelVariable(config: AtLeast<LevelVariableConfig, 'field'>) {
  const output: LevelVariableConfig = {
    type: EVariableType.Level,
    field: config.field,
    name: config.name || config.field,
    min: config.min || 0,
    max: config.max || 255,
    step: config.step || 1,
    optional: config.optional || false,
    unit: config.unit || '',
  };
  return output;
}

export function listVariable(config: AtLeast<ListVariableConfig, 'field' | 'options'>) {
  const options: ListVariableOption[] = [];
  config.options.forEach(e => options.push({ ...e }));
  const output: ListVariableConfig = {
    type: EVariableType.List,
    field: config.field,
    name: config.name || config.field,
    options: options.map(e => (e.name ? e : Object.assign(e, { name: PrettyPrintName(e.value) }))),
  };
  return output;
}

export function listVariableOption(value: any, config: { icons?: Dictionary<string>; name?: string } = {}) {
  let output: ListVariableOption = {
    value: String(value),
  };
  if (config.icons && value in config.icons) output = { ...output, icon: config.icons[value] };
  if (config.name) output = { ...output, name: config.name };
  return output;
}

export function exportActionVariable(action: ActionElement, entry: Entry) {
  if (!entry.variable || !action.variable) return {};
  if (entry.variable.type == EVariableType.Level && action.variable.type == EVariableType.Level) {
    if ((entry.variable as LevelVariable).enabled) {
      return { [action.variable.field]: Number(entry.variable.value) };
    } else {
      return {};
    }
  } else {
    return { [action.variable.field]: String(entry.variable.value) };
  }
}

export function computeLevelVariableDisplay(value: number, config: LevelVariableConfig) {
  if (config.unit == '%') {
    const min = config.min;
    const max = config.max;
    const step = config.step;
    const scaleOffset = config.min;
    const scaleGain = (config.max - config.min) / 100;

    let scaledValue = (value - scaleOffset) / scaleGain;
    scaledValue = Math.round(scaledValue / step) * step;
    scaledValue = parseFloat(scaledValue.toPrecision(12));
    if (scaledValue < min) scaledValue = min;
    else if (scaledValue > max) scaledValue = max;

    return `${scaledValue}${config.unit}`;
  }
  return `${value}${config.unit}`;
}
