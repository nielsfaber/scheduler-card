import { computeEntity } from 'custom-card-helpers';
import { Action, EVariableType, LevelVariable } from '../../types';
import { levelVariableDisplay } from '../variables/level_variable';
import { PrettyPrintName } from '../../helpers';

const wildcardPattern = /\{([^\}]+)\}/;
const parameterPattern = /\[([^\]]+)\]/;

export function computeActionDisplay(action: Action) {
  let name = action.name;
  if (!name) name = PrettyPrintName(computeEntity(action.service));

  const res = name.match(parameterPattern);
  if (res) {
    let replacement = '';
    const wildcard = res[1].match(wildcardPattern);
    if (wildcard && action.service_data && wildcard[1] in action.service_data) {
      let value = '';
      if (action.variables && wildcard[1] in action.variables && action.variables[wildcard[1]].type == EVariableType.Level) {
        value = levelVariableDisplay(
          action.service_data[wildcard[1]],
          action.variables[wildcard[1]] as LevelVariable
        );
      } else {
        value = action.service_data[wildcard[1]];
      }
      replacement = res[1].replace(wildcard[0], value);
      return name.replace(res[0], replacement);
    } else {
      return name.replace(res[0], '');
    }
  }

  return name || '';
}

