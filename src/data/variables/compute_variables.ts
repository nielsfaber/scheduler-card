import { LevelVariable, ListVariable, TextVariable, TimeVariable, Dictionary, VariableDictionary } from '../../types';
import { listVariable } from './list_variable';
import { levelVariable } from './level_variable';
import { textVariable } from './text_variable';
import { timeVariable } from './time_variable';

export function computeVariables(
  variables?: Dictionary<Partial<LevelVariable | ListVariable | TextVariable>>
): VariableDictionary | undefined {
  if (!Object.keys(variables || {}).length) return undefined;

  return Object.entries(variables!)
    .map(([field, variable]) => {
      if ('options' in variable) {
        return [field, listVariable(variable as ListVariable)];
      } else if ('min' in variable || 'max' in variable) {
        return [field, levelVariable(variable as LevelVariable)];
      } else if ('enable_seconds' in variable) {
        return [field, timeVariable(variable as TimeVariable)];
      } else {
        return [field, textVariable(variable as TextVariable)];
      }
    })
    .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key as string]: val }) : obj), {});
}
