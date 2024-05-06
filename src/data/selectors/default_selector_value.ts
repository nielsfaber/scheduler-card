import { BooleanSelector, NumberSelector, SelectSelector, Selector, StringSelector } from "../../lib/selector";




export const defaultSelectorValue = (selector: Selector) => {

  if(Object.keys(selector).includes('select') && (selector as SelectSelector).select) {
    const options = (selector as SelectSelector).select!.options;
    return options.length ? options[0] : '';
  }
  else if(Object.keys(selector).includes('number') && (selector as NumberSelector).number) {
    const min = (selector as NumberSelector).number!.min;
    return min !== undefined ? min : 0;
  }
  else if(Object.keys(selector).includes('boolean') && (selector as BooleanSelector).boolean) {
    return false;
  }
  else if(Object.keys(selector).includes('text') && (selector as StringSelector).text) {
    return '';
  }
  else return '';

}