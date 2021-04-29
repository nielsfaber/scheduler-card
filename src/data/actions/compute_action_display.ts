import { computeEntity } from 'custom-card-helpers';
import { Action, EVariableType, LevelVariable, ListVariable, TextVariable } from '../../types';
import { levelVariableDisplay } from '../variables/level_variable';
import { PrettyPrintName } from '../../helpers';
import { listVariableDisplay } from '../variables/list_variable';
import { textVariableDisplay } from '../variables/text_variable';

const wildcardPattern = /\{[^\}]+\}/g;
const parameterPattern = /\[([^\]]+)\]/;

export function computeActionDisplay(action: Action) {
  let name = action.name;
  if (!name) name = PrettyPrintName(computeEntity(action.service));

  const res = name.match(parameterPattern);
  if (res) {
    let replacement = res[1];
    const matches = res[1].match(wildcardPattern);
    if (matches && matches.length && matches.every(wildcard => {
      const field = wildcard.substring(1, wildcard.length - 1);
      if (!Object.keys(action.service_data || {}).includes(field)) return false;
      let value = '';
      if (Object.keys(action.variables || {}).includes(field)) {
        if (action.variables![field].type == EVariableType.Level)
          value = levelVariableDisplay(action.service_data![field], action.variables![field] as LevelVariable);
        else if (action.variables![field].type == EVariableType.List)
          value = listVariableDisplay(action.service_data![field], action.variables![field] as ListVariable);
        else
          value = textVariableDisplay(action.service_data![field], action.variables![field] as TextVariable);
      } else {
        value = action.service_data![field];
      }
      replacement = replacement.replace(wildcard, value);
      return true;
    })) {
      return name.replace(res[0], replacement);
    }
    else {
      return name.replace(res[0], '');
    }
  }
  return name || '';
}

