import { computeEntity } from 'custom-card-helpers';
import { Action, EVariableType, LevelVariable, ListVariable, TextVariable } from '../../types';
import { levelVariableDisplay } from '../variables/level_variable';
import { PrettyPrintName } from '../../helpers';
import { listVariableDisplay } from '../variables/list_variable';
import { textVariableDisplay } from '../variables/text_variable';

const wildcardPattern = /\{([^\}]+)\}/;
const parameterPattern = /\[([^\]]+)\]/;
const MAX_RECURSION_DEPTH = 100;

export function computeActionDisplay(action: Action) {
  let name = action.name;
  if (!name) name = PrettyPrintName(computeEntity(action.service));

  const replaceWildcards = (string: string, recursionDepth = 0): string => {
    const res = wildcardPattern.exec(string);
    if (!res) return string;
    const field = res[1];

    if (!Object.keys(action.service_data || {}).includes(field)) return string.replace(res[0], '');

    let replacement: string;
    if (Object.keys(action.variables || {}).includes(field)) {
      if (action.variables![field].type == EVariableType.Level)
        replacement = levelVariableDisplay(action.service_data![field], action.variables![field] as LevelVariable);
      else if (action.variables![field].type == EVariableType.List)
        replacement = listVariableDisplay(action.service_data![field], action.variables![field] as ListVariable);
      else replacement = textVariableDisplay(action.service_data![field], action.variables![field] as TextVariable);
    } else {
      replacement = action.service_data![field];
    }
    string = string.replace(res[0], replacement);
    if (recursionDepth >= MAX_RECURSION_DEPTH) return string;
    return replaceWildcards(string);
  };

  const replaceSubstrings = (string: string, recursionDepth = 0): string => {
    const res = parameterPattern.exec(string);
    if (!res) return string;

    const field = res[1].match(wildcardPattern)![1];
    const hasWildcard = Object.keys(action.service_data || {}).includes(field);
    if (hasWildcard) string = string.replace(res[0], replaceWildcards(res[1]));
    else string = string.replace(res[0], '');
    if (recursionDepth >= MAX_RECURSION_DEPTH) return string;
    return replaceSubstrings(string);
  };

  name = replaceSubstrings(name);
  name = replaceWildcards(name);
  return name || '';
}
