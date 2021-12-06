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
  return arr.every(e => JSON.stringify(e) === JSON.stringify(arr[0]));
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
  return `hass:${input}`;
}

export function calculateTimeline(entries: Timeslot[]): Timeslot[] {
  //TBD implementation for sun
  entries.sort((a, b) => {
    if (stringToTime(a.start) > stringToTime(b.start)) return 1;
    else if (stringToTime(a.start) < stringToTime(b.start)) return -1;
    else return stringToTime(a.stop!) > stringToTime(b.stop!) ? 1 : -1;
  });

  entries = entries.map(e =>
    stringToTime(e.stop!) < stringToTime(e.start)
      ? {
          ...e,
          stop: timeToString(stringToTime(e.stop!) + 3600 * 24),
        }
      : e
  );
  let startTime = 0;
  let len = entries.length;

  for (let i = 0; i < len; i++) {
    const entry = entries[i];
    if (stringToTime(entry.start) > startTime) {
      entries.splice(
        i,
        0,
        Object.assign(
          { ...entry },
          {
            start: timeToString(startTime),
            stop: entry.start,
            actions: [],
          }
        )
      );
      len++;
      i++;
    }
    startTime = stringToTime(entry.stop!);
  }
  const endOfDay = 24 * 3600;

  if (startTime < endOfDay && startTime > 0) {
    entries.push(
      Object.assign(
        { ...entries[0] },
        {
          start: timeToString(startTime),
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
