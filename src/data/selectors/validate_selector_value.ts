import { NumberSelector, SelectOption, SelectSelector, Selector } from "../../lib/selector";

const validateSelectSelectorValue = (value: string, selector: SelectSelector) => {
  return (selector.select?.options || []).some((e: SelectOption | string) => {
    return typeof e === "object" ? e.value == value : e == value;
  });
};

const validateNumberSelectorValue = (value: number, selector: NumberSelector) => {
  if (isNaN(value)) return false;
  if (selector.number?.min !== undefined && value < selector.number.min) return false;
  if (selector.number?.max !== undefined && value > selector.number.max) return false;
  return true;
};

export const validateSelectorValue = (value: any, selector: Selector) => {
  if ("select" in selector && selector.select !== null) {
    return validateSelectSelectorValue(String(value), selector as SelectSelector);
  } else if ("number" in selector && selector.number !== null) {
    return validateNumberSelectorValue(Number(value), selector as NumberSelector);
  } else if ("text" in selector && selector.text !== null) {
    return String(value).length > 0;
  }
  return true;
};
