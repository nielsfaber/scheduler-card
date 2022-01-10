import { isDefined } from '../../helpers';
import { EVariableType, TextVariable } from '../../types';

export function textVariable(...config: Partial<TextVariable>[]) {
  //factory function to create ListVariable from configuration

  const name = config.map(e => e.name).filter(isDefined);

  const variable: TextVariable = {
    type: EVariableType.Text,
    name: name.length ? name.reduce((_acc, val) => val) : undefined,
    multiline: config.some(e => e.multiline),
  };
  return variable;
}

export function textVariableDisplay(value: any, _variable: TextVariable): string {
  return String(value);
}
