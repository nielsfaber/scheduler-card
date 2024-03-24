import { isDefined } from '../../helpers';
import { EVariableType, TimeVariable } from '../../types';

export function timeVariable(...config: Partial<TimeVariable>[]) {
  //factory function to create TimeVariable from configuration

  const name = config.map(e => e.name).filter(isDefined);

  const variable: TimeVariable = {
    type: EVariableType.Time,
    name: name.length ? name.reduce((_acc, val) => val) : undefined,
    enable_seconds: config.some(e => e.enable_seconds),
  };
  return variable;
}

export function timeVariableDisplay(value: any, _variable: TimeVariable): string {
  return String(value);
}
