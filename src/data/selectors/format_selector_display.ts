import { BooleanSelector, NumberSelector, SelectOption, Selector, SelectSelector } from "../../lib/selector";
import { HomeAssistant } from "../../lib/types";
import { hassLocalize } from "../../localize/hassLocalize";
import { roundFloat } from "../../lib/round_float";

export const formatSelectorDisplay = (value: any, selector: Selector | null, hass: HomeAssistant) => {
  if (!selector) return value;

  if (Object.keys(selector).includes("select") && (selector as SelectSelector).select) {
    const config = (selector as SelectSelector).select!;
    let options: SelectOption[] = config.options.map((e) =>
      typeof e == "string" ? Object(<SelectOption>{ value: e, label: e }) : e
    );
    let match = options?.find((e) => e.value == value);
    if (config.translation_key)
      value =
        hassLocalize(config.translation_key.replace("${value}", value), hass, false) || match ? match?.label : value;
    else if (match) value = match.label;
  }

  if (Object.keys(selector).includes("number") && (selector as NumberSelector).number) {
    const config = (selector as NumberSelector).number;
    value = Number(value);
    if (typeof config?.scale_factor === "number") value = value / config.scale_factor;
    if (typeof config?.step === "number") value = Math.round(value / config.step) * config.step;
    value = roundFloat(value);
    if (config?.unit) return `${value}${config.unit}`;
  }

  if (Object.keys(selector).includes("boolean") && (selector as BooleanSelector).boolean) {
    value = Boolean(value) ? "True" : "False";
  }
  return value;
};
