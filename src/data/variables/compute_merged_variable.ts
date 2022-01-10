import { LevelVariable, ListVariable, TextVariable, EVariableType } from '../../types';
import { levelVariable } from './level_variable';
import { listVariable } from './list_variable';
import { textVariable } from './text_variable';
import { isDefined, unique } from '../../helpers';
import { computeVariables } from './compute_variables';

export function computeMergedVariable(
  ...variables: Partial<LevelVariable | ListVariable | TextVariable>[]
): LevelVariable | ListVariable | TextVariable | undefined {
  const types = unique(variables.map(e => e.type).filter(isDefined));
  if (!types.length) {
    variables = Object.values(computeVariables(Object.assign({}, ...variables))!);
    return computeMergedVariable(...variables);
  }

  if (types.length > 1) return undefined;

  if (types[0] == EVariableType.Level) {
    return levelVariable(...(variables as LevelVariable[]));
  } else if (types[0] == EVariableType.List) {
    return listVariable(...(variables as ListVariable[]));
  } else return textVariable(...(variables as TextVariable[]));
}
