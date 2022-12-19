import { Dictionary, Timeslot } from './types';
import { stringToTime, timeToString } from './data/date-time/time';
import { FrontendTranslationData, HomeAssistant, NumberFormat } from 'custom-card-helpers';
import { formatAmPm } from './data/date-time/format_time';

export function pick(obj: Dictionary<any> | null | undefined, keys: string[]): Dictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

// export function omit<TValue>(obj: Dictionary<TValue>, keys: string[]): Dictionary<TValue> {
//   if (!obj) return {};
//   return Object.entries(obj)
//     .filter(([key]) => !keys.includes(key))
//     .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
// }

export function flatten<U>(arr: U[][]): U[] {
  if (((arr as unknown) as U[]).every(val => !Array.isArray(val))) {
    return ((arr as unknown) as U[]).slice();
  }
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten((val as unknown) as U[][]) : val), []);
}

export function unique<TValue>(arr: TValue[]) {
  let res: TValue[] = [];
  arr.forEach(item => {
    if (!res.find(e => (typeof item === 'object' ? isEqual(e, item) : e === item))) res.push(item);
  });
  return res;
}

export function isDefined<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function isEqual(...arr: any[]) {
  if (!arr.length) return false;
  const firstItem = arr[0];

  return arr.every(item => {
    return firstItem && item && typeof firstItem === 'object' && typeof item === 'object'
      ? Object.keys(firstItem).length === Object.keys(item).length &&
          Object.keys(firstItem).reduce((res, key) => res && isEqual(firstItem[key], item[key]), true)
      : firstItem === item;
  });
}

export function sortAlphabetically(a: any, b: any) {
  const stringVal = (a: any) => {
    if (typeof a === 'object') {
      return a.name !== undefined
        ? String(a.name)
            .trim()
            .toLowerCase()
        : JSON.stringify(a);
    } else
      return String(a)
        .trim()
        .toLowerCase();
  };
  return stringVal(a) < stringVal(b) ? -1 : 1;
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function PrettyPrintName(input: string): string {
  if (typeof input != typeof 'x') input = String(input);
  return capitalize(input.replace(/_/g, ' '));
}

export function PrettyPrintIcon(input?: string) {
  if (!input) return;
  if (typeof input != typeof 'x') input = String(input);
  if (input.match(/^[a-z]+:[a-z0-9-]+$/i)) return input;
  return `mdi:${input}`;
}

export function calculateTimeline(entries: Timeslot[], hass: HomeAssistant): Timeslot[] {
  //correct timeslots which are outside of 00:00:00 - 23:59:00 window
  entries = entries.map(e =>
    Object({
      ...e,
      start: stringToTime(e.start, hass) < 0 ? '00:00:00' : e.start,
      stop: stringToTime(e.stop!, hass) > 3600 * 24 ? '00:00:00' : e.stop,
    })
  );

  entries = entries.map(e => {
    const duration = stringToTime(e.stop!, hass) - stringToTime(e.start, hass);
    if (duration < 0) {
      if (stringToTime(e.stop!, hass) == 0)
        //if stop time is 00:00:00, this should be mapped as the end of the day
        return {
          ...e,
          stop: timeToString(stringToTime(e.stop!, hass) + 3600 * 24),
        };
      //correct timeslots who have their start and stop point flipped
      else
        return {
          ...e,
          start: e.stop!,
          stop: e.start,
        };
    } else if (duration < 60) {
      //correct timeslots which have a duration shorter than 1 minute
      return {
        ...e,
        start: e.start!,
        stop: timeToString(stringToTime(e.start!, hass) + 60),
      };
    }
    return e;
  });

  //sort chronological
  entries.sort((a, b) => {
    if (stringToTime(a.start, hass) > stringToTime(b.start, hass)) return 1;
    else if (stringToTime(a.start, hass) < stringToTime(b.start, hass)) return -1;
    else return stringToTime(a.stop!, hass) > stringToTime(b.stop!, hass) ? 1 : -1;
  });

  let startTime = '00:00:00';
  let len = entries.length;

  //insert empty timeslots where needed
  for (let i = 0; i < len; i++) {
    const entry = entries[i];
    if (stringToTime(entry.start, hass) > stringToTime(startTime, hass)) {
      entries.splice(
        i,
        0,
        Object.assign(
          { ...entry },
          {
            start: startTime,
            stop: entry.start,
            actions: [],
          }
        )
      );
      len++;
      i++;
    } else if (stringToTime(entry.start, hass) < stringToTime(startTime, hass)) {
      //move timeslot if it is overlapping with previous
      entries = Object.assign(entries, { [i]: { ...entry, start: startTime } });
    }
    startTime = entry.stop!;
  }
  const endOfDay = 24 * 3600;

  //insert empty timeslots at the end when needed
  if (stringToTime(startTime, hass) < endOfDay && stringToTime(startTime, hass) > 0) {
    entries.push(
      Object.assign(
        { ...entries[0] },
        {
          start: startTime,
          stop: timeToString(endOfDay),
          actions: [],
        }
      )
    );
  }

  return entries;
}

export function IsDefaultName(name?: string) {
  if (!name) return false;
  return name.match(/^Schedule\ #[a-f0-9]{6}/) !== null;
}

export const getLocale = (hass: HomeAssistant): FrontendTranslationData =>
  hass.locale || {
    language: hass.language,
    number_format: NumberFormat.system,
  };

export function AsArray<TValue>(value: TValue | TValue[] | null | undefined): TValue[] {
  if (Array.isArray(value)) return value;
  else if (value !== null && value !== undefined) return [value];
  else return [];
}

export function deepCopy<T>(obj: T): T {
  if (obj == null) return obj;

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {} as T);
  }
  return obj;
}
