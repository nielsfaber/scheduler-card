
import { IEntry, IDictionary, IActionElement, IListVariable, ILevelVariable, ILevelVariableConfig, IListVariableConfig, EVariableType } from './types'
import { localize } from './localize/localize';
import { formatTime, ITime, wrapTime, ETimeEvent, IDays, EDayType } from './date-time';
import { UnitPercent, FieldTemperature } from "./const";


export function extend(oldObj: IDictionary<any> | any[], newObj: IDictionary<any> | any[], options: Partial<{ compact: boolean, overwrite: boolean }> = {}) {
  let mergedObj = Array.isArray(oldObj) ? [...oldObj] : { ...oldObj };
  if (oldObj === null) mergedObj = Array.isArray(newObj) ? [] : {};
  if (newObj === null || newObj === undefined) return oldObj;
  let keys = Object.keys(newObj);
  keys.forEach(key => {
    let val = newObj[key];
    if (val === undefined) return;
    if (val === null && options.compact) {
      if (mergedObj[key] !== undefined) delete mergedObj[key];
      return;
    }
    if (Array.isArray(val) && Array.isArray(mergedObj[key]) && !options.overwrite) val = extend(mergedObj[key], val, options);
    else if (typeof val == "object" && val !== null && typeof mergedObj[key] == "object" && !options.overwrite) val = extend(mergedObj[key], val, options);
    if (Array.isArray(newObj)) {
      if (val !== null) {
        if (options.overwrite) mergedObj = val;
        else mergedObj.push(val);
      }
    } else {
      if ((Array.isArray(val) || typeof val == "object") && val !== null && !Object.keys(val).length && options.compact) {
        delete mergedObj[key];
        return;
      }
      Object.assign(mergedObj, { [key]: val });
    }
  })
  return mergedObj;
}

export function pick(obj: IDictionary<any> | null | undefined, keys: string[]): IDictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key,]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function omit(obj: IDictionary<any> | null | undefined, keys: string[]): IDictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key,]) => !keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function mapObject(obj: Object, func: Function) {
  return Object.entries(obj)
    .map(([key, val]) => [key, func(val, key)])
    .filter(([, v]) => v !== null && v !== undefined)
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function filterObject(obj: Object, func: Function) {
  return Object.entries(obj)
    .filter(([key, val]) => func(val, key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function keyMap(arr: any[], func: Function) {
  return arr.reduce((obj, val) => Object.assign(obj, { [func(val)]: val }), {});
}

export function getDomainFromEntityId(entity_id: string): string {
  if (entity_id.indexOf('.') === -1) return '';
  let res = String(entity_id.split('.').shift());
  return res;
}

export function removeDomainFromEntityId(entity_id: string): string {
  if (entity_id.indexOf('.') === -1) return entity_id;
  let res = String(entity_id.split('.').pop());
  return res;
}

export function PrettyPrintDays(days: IDays): string {
  if (days.type == EDayType.Daily) return localize('fields.day_type_daily');
  else if (days.type == EDayType.Weekdays) return `${localize('words.on')} ${localize('fields.day_type_weekdays')}`;
  else {
    let dayList = days.custom_days || [];
    let output = Array();
    if (dayList.includes(1)) output.push(localize('days_long.mon'));
    if (dayList.includes(2)) output.push(localize('days_long.tue'));
    if (dayList.includes(3)) output.push(localize('days_long.wed'));
    if (dayList.includes(4)) output.push(localize('days_long.thu'));
    if (dayList.includes(5)) output.push(localize('days_long.fri'));
    if (dayList.includes(6)) output.push(localize('days_long.sat'));
    if (dayList.includes(7)) output.push(localize('days_long.sun'));
    let output_str = output.join(', ');
    var n = output_str.lastIndexOf(', ');
    if (n) output_str = output_str.slice(0, n) + output_str.slice(n).replace(', ', ` ${localize('words.and')} `);
    return `${localize('words.every')} ${output_str}`;
  }
}

export function PrettyPrintTime(time: ITime, options: { amPm: boolean, sunrise: number | null, sunset: number | null }): string {
  let amPmFormat = (options.amPm) ? options.amPm : false;

  if (!time.event) return `${localize('words.at')} ${formatTime(time.value, { amPm: amPmFormat }).time}`;

  let time_string = "unknown";
  let event_string = "";
  if (time.event === ETimeEvent.Sunrise && options.sunrise !== null) {
    let time_with_offset = wrapTime(Number(options.sunrise) + time.value);
    time_string = formatTime(time_with_offset, { amPm: amPmFormat }).time;
    event_string = "sunrise";
  }
  else if (time.event == ETimeEvent.Sunset && options.sunset !== null) {
    let time_with_offset = wrapTime(Number(options.sunset) + time.value);
    time_string = formatTime(time_with_offset, { amPm: amPmFormat }).time;
    event_string = "sunset";
  }

  if (Math.abs(time.value) == 0) return `${localize('words.at')} ${localize(`words.${time.event}`)} (${time_string})`;
  else return `${formatTime(time.value, { absolute: true }).time} ${formatTime(time.value).signed ? localize('words.before') : localize('words.after')} ${localize(`words.${event_string}`)} (${time_string})`;
}

export function PrettyPrintName(input: string): string {
  if (typeof input != typeof "x") input = String(input);
  return capitalize(input.replace(/_/g, ' '));
}

export function PrettyPrintIcon(input: string): string {
  if (typeof input != typeof "x") input = String(input);
  if (input.match(/^[a-z]+:[a-z0-9-]+$/i)) return input;
  return `hass:${input}`;
}

export function PrettyPrintAction(entry: IEntry, actionCfg: IActionElement, options: { temperature_unit: string }) {
  let action_string = PrettyPrintName(actionCfg.name);

  if (entry.hasOwnProperty('variable') && entry.variable && actionCfg.variable) {
    let value = PrettyPrintActionVariable(entry.variable, actionCfg.variable, options);
    action_string = `${localize('services.set_to')} ${value}`;
  }
  return capitalize(action_string);
}


export function PrettyPrintActionVariable(input: ILevelVariable | IListVariable, cfg: ILevelVariableConfig | IListVariableConfig, options: { temperature_unit: string }): string {
  if (input.type == EVariableType.Level) {
    cfg = cfg as ILevelVariableConfig;
    let unit = 'unit' in cfg ? cfg.unit : "";
    if (!unit.length && cfg.field == FieldTemperature) unit = options.temperature_unit;
    let value = Number(input.value);
    if (cfg.unit == UnitPercent) {
      value = Math.round(((value - cfg.min) / (cfg.max - cfg.min)) * 100);
      if (value < cfg.min) value = cfg.min;
      else if (value > cfg.max) value = cfg.max;
    }
    return `${value}${unit}`;
  }
  else {
    return String(input.value);
  }
}



export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function IsEqual(inA: any[] | IDictionary<any>, inB: any[] | IDictionary<any>) {
  if (Array.isArray(inA) && Array.isArray(inB)) {
    let objA = [...inA].sort();
    let objB = [...inB].sort();
    if (objA.length !== objA.length) return false;

    for (var i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) return false;
    }

    return true;
  }
  else if (typeof inA == "object" && typeof inB == "object") {
    let objA = { ...inA };
    let objB = { ...inB };
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      const valA = objA[key];
      const valB = objB[key];
      const areObjects = typeof valA == "object" && typeof valB == "object" && valA !== null && valB !== null;
      if (areObjects && !IsEqual(valA, valB) || !areObjects && valA !== valB) return false;
    }

    return true;
  }
  else return false;
};


export function MatchPattern(pattern: string, entity_id: string) {
  let res = false;
  if (pattern.match(/^[a-z0-9_\.]+$/)) {
    if (pattern.includes(".")) res = pattern == entity_id;
    else res = pattern == getDomainFromEntityId(entity_id);
  }
  else {
    try {
      if ((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
        if (!pattern.startsWith('/')) {
          pattern = pattern
            .replace(/\./g, '\.')
            .replace(/\*/g, '.*');
          pattern = `/^${pattern}$/`;
        }
        let regex = new RegExp(pattern.slice(1, -1));
        res = regex.test(entity_id);
      }
    }
    catch (e) { }
  }
  return res;
}