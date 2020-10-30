import { computeEntity } from 'custom-card-helpers';
import { ActionElement, EVariableType, LevelVariableConfig } from '../types';
import { computeLevelVariableDisplay } from '../actionVariables';

const wildcardPattern = /\{([^\}]+)\}/;
const parameterPattern = /\[([^\]]+)\]/;

export function computeActionDisplay(action: ActionElement) {
  let name = action.name;
  if (!name) name = computeEntity(action.service);

  const res = name.match(parameterPattern);
  if (res) {
    let replacement = '';
    const wildcard = res[1].match(wildcardPattern);

    if (wildcard && action.service_data && wildcard[1] in action.service_data) {
      let value = '';
      if (action.variable && action.variable.field == wildcard[1] && action.variable.type == EVariableType.Level) {
        value = computeLevelVariableDisplay(
          action.service_data[action.variable.field],
          action.variable as LevelVariableConfig
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
