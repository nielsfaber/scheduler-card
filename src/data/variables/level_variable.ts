
import { isDefined } from "../../helpers";
import { LevelVariable, EVariableType } from "../../types";

export function levelVariable(...config: Partial<LevelVariable>[]) {
  //factory function to create LevelVariable from configuration

  const min = config.map(e => e.min).filter(isDefined);
  const max = config.map(e => e.max).filter(isDefined);
  const step = config.map(e => e.step).filter(isDefined);
  const optional = config.map(e => e.optional).filter(isDefined);
  const unit = config.map(e => e.unit).filter(isDefined);
  const name = config.map(e => e.name).filter(isDefined);

  const variable: LevelVariable = {
    type: EVariableType.Level,
    min: min.length ? Math.min(...min) : undefined,
    max: max.length ? Math.max(...max) : undefined,
    step: step.length ? Math.max(...step) : undefined,
    optional: optional.length && optional.every(e => e) || false,
    unit: unit.length ? unit.reduce((_acc, val) => val) : undefined,
    name: name.length ? name.reduce((_acc, val) => val) : undefined
  };
  return variable;
}

export function levelVariableDisplay(value: any, variable: LevelVariable): string {
  if (typeof value !== "number") {
    return '';
  }
  if (variable.unit == '%' &&
    variable.min !== undefined &&
    variable.max !== undefined
  ) {
    // show as percentage
    const min = variable.min;
    const max = variable.max;
    const step = variable.step;
    const scaleOffset = variable.min;
    const scaleGain = (variable.max - variable.min) / 100;

    let scaledValue = (value - scaleOffset) / scaleGain;
    scaledValue = step !== undefined
      ? Math.round(scaledValue / step) * step
      : Math.round(scaledValue);
    scaledValue = parseFloat(scaledValue.toPrecision(12));
    if (scaledValue < min) scaledValue = min;
    else if (scaledValue > max) scaledValue = max;

    return `${scaledValue}${variable.unit || ''}`;
  }
  return `${value}${variable.unit || ''}`;
}