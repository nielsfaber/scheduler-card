import { isDefined } from "../../lib/is_defined";
import { SelectOption, SelectSelector } from "../../lib/selector";

export const parseListSelectorOption = (input: Record<string, any>) => {
  if (typeof input !== "object") return null;
  if (!Object.keys(input).length || !Object.keys(input).every((e) => typeof e === "string")) return null;

  let cfg: SelectOption = {
    value: "",
    label: "",
  };

  if (Object.keys(input).includes("name")) cfg = { ...cfg, label: String(input.name) };
  else if (Object.keys(input).includes("label")) cfg = { ...cfg, label: String(input.label) };
  else if (Object.keys(input).includes("value")) cfg = { ...cfg, label: String(input.value) };

  if (Object.keys(input).includes("value")) cfg = { ...cfg, value: String(input.value) };
  else if (Object.keys(input).includes("name")) cfg = { ...cfg, value: String(input.name) };
  else if (Object.keys(input).includes("label")) cfg = { ...cfg, value: String(input.label) };

  if (Object.keys(input).includes("icon") && isDefined(input.icon)) cfg = { ...cfg, icon: String(input.icon) };

  if (!cfg.value.length || !cfg.label.length) return null;

  return cfg;
};

export const listSelector = (input: { options: any[] | any; translation_key?: string }): SelectSelector => {
  let cfg: SelectSelector = {
    select: {
      options: Array.isArray(input.options)
        ? input.options.every((e) => typeof e === "string")
          ? input.options
          : input.options.map(parseListSelectorOption).filter(isDefined)
        : [],
    },
  };
  if (input.translation_key) cfg = { ...cfg, select: { ...cfg.select!, translation_key: input.translation_key } };

  return cfg;
};
