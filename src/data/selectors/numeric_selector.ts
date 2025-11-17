import { NumberSelector } from "../../lib/selector";

type NumericSelectorConfig = {
  min?: any;
  max?: any;
  step?: any;
  mode?: any;
  unit?: any;
  optional?: any;
  scale_factor?: any;
};

export const numericSelector = (input: NumericSelectorConfig): NumberSelector => {
  let cfg: NumberSelector = {
    number: {},
  };

  if (Object.keys(input).includes("min") && !isNaN(Number(input.min)))
    cfg = { ...cfg, number: { ...cfg.number, min: Number(input.min) } };
  if (Object.keys(input).includes("max") && !isNaN(Number(input.max)))
    cfg = { ...cfg, number: { ...cfg.number, max: Number(input.max) } };
  if (Object.keys(input).includes("step") && !isNaN(Number(input.step)))
    cfg = { ...cfg, number: { ...cfg.number, step: Number(input.step) } };
  if (Object.keys(input).includes("mode") && ["box", "slider"].includes(input.mode))
    cfg = { ...cfg, number: { ...cfg.number, mode: input.mode } };
  if (Object.keys(input).includes("unit") && input.unit) cfg = { ...cfg, number: { ...cfg.number, unit: input.unit } };
  if (Object.keys(input).includes("optional"))
    cfg = { ...cfg, number: { ...cfg.number, optional: Boolean(input.optional) } };
  if (Object.keys(input).includes("scale_factor") && !isNaN(Number(input.scale_factor)))
    cfg = { ...cfg, number: { ...cfg.number, scale_factor: Number(input.scale_factor) } };

  return cfg;
};
