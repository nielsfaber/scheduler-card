import { NumberSelector } from "../../lib/selector";

export const numericSelector = (input: { min?: any, max?: any, step?: any, mode?: any, unit_of_measurement?: any }): NumberSelector => {
  let cfg: NumberSelector = {
    number: {}
  };

  if (Object.keys(input).includes('min') && !isNaN(Number(input.min)))
    cfg = { ...cfg, number: { ...cfg.number, min: Number(input.min) } };
  if (Object.keys(input).includes('max') && !isNaN(Number(input.max)))
    cfg = { ...cfg, number: { ...cfg.number, max: Number(input.max) } };
  if (Object.keys(input).includes('step') && !isNaN(Number(input.step)))
    cfg = { ...cfg, number: { ...cfg.number, step: Number(input.step) } };
  if (Object.keys(input).includes('mode') && ['box', 'slider'].includes(input.mode))
    cfg = { ...cfg, number: { ...cfg.number, mode: input.mode } };
  if (Object.keys(input).includes('unit_of_measurement') && input.unit_of_measurement)
    cfg = { ...cfg, number: { ...cfg.number, unit_of_measurement: input.unit_of_measurement } };

  return cfg;
}