import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { isDefined, omit, pick } from '../helpers';
import { AtLeast, LevelVariable, ListVariable, TextVariable } from '../types';
import { listAttribute, numericAttribute, stringAttribute } from './attribute';

type ListOption = { name: string; icon: string };

type ListVariableConfig = {
  options: string | string[] | Record<string, Partial<ListOption>>;
};

type ListVariableTemplate = (stateObj: HassEntity | undefined, hass: HomeAssistant) => ListVariableConfig;

export type ListVariableType = ListVariableConfig | { template: ListVariableTemplate };

type LevelVariableConfig = {
  min?: string | number;
  max?: string | number;
  step?: string | number;
  unit?: string;
  optional?: boolean;
  scale_factor?: number;
};

type LevelVariableTemplate = (stateObj: HassEntity | undefined, hass: HomeAssistant) => LevelVariableConfig;

export type LevelVariableType = LevelVariableConfig | { template: LevelVariableTemplate };

type TextVariableConfig = {
  multiline?: boolean;
};

export type VariableConfig = ListVariableType | LevelVariableType | TextVariableConfig;

export const parseVariable = (
  config: VariableConfig,
  stateObj: HassEntity | undefined,
  hass: HomeAssistant
): Partial<LevelVariable> | AtLeast<ListVariable, 'options'> | Partial<TextVariable> => {
  const res =
    'template' in config && isDefined(config.template)
      ? { ...omit(config, 'template'), ...config.template(stateObj, hass) }
      : ({ ...config } as ListVariableConfig | LevelVariableConfig | TextVariableConfig);

  if ('options' in res) {
    return parseListVariable(res, stateObj);
  } else if ('min' in res && 'max' in res) {
    return parseLevelVariable(res, stateObj);
  } else {
    return res as TextVariableConfig;
  }
};

export const parseListVariable = (
  config: ListVariableConfig,
  stateObj: HassEntity | undefined
): AtLeast<ListVariable, 'options'> => {
  if (typeof config.options == 'string') {
    const res = listAttribute(stateObj, config.options);
    return {
      options: res.map(e => Object({ value: e })),
    };
  } else if (Array.isArray(config.options)) {
    return {
      options: config.options.map(e => Object({ value: e })),
    };
  } else {
    return {
      options: Object.entries(config.options).map(([k, v]) => Object({ value: k, ...v })),
    };
  }
};

export const parseLevelVariable = (config: LevelVariableConfig, stateObj: HassEntity | undefined) => {
  let result: Partial<LevelVariable> = pick(config, ['unit', 'optional', 'scale_factor']);
  if (isDefined(config.min)) result = { ...result, min: numericAttribute(stateObj, config.min) };
  if (isDefined(config.max)) result = { ...result, max: numericAttribute(stateObj, config.max) };
  if (isDefined(config.step)) result = { ...result, step: numericAttribute(stateObj, config.step) };
  if (isDefined(config.unit) && config.unit == 'unit_of_measurement')
    result = { ...result, unit: stringAttribute(stateObj, config.unit, '') };
  return result;
};
