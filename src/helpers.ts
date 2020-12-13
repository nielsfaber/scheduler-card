import { Dictionary, Timeslot } from './types';
import { stringToTime, timeToString } from './data/date-time/time';

export function pick(obj: Dictionary<any> | null | undefined, keys: string[]): Dictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function omit(obj: Dictionary<any> | null | undefined, keys: string[]): Dictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function flatten(arr: any[]) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

export function unique(arr: any[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
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
  entries.sort((a, b) => (stringToTime(a.start) > stringToTime(b.start) ? 1 : -1));
  entries = entries.map(e =>
    stringToTime(e.stop!) < stringToTime(e.start)
      ? {
        ...e,
        stop: timeToString(stringToTime(e.stop!) + 3600 * 24)
      }
      : e
  );

  let startTime = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (stringToTime(entry.start) > startTime) {
      entries.splice(
        i,
        0,
        Object({
          start: timeToString(startTime),
          stop: entry.start,
          actions: []
        })
      )
    }
    startTime = stringToTime(entry.stop!);
  }

  const endOfDay = 23 * 3600 + 59 * 60;

  if (startTime < endOfDay) {
    entries.push(
      Object({
        start: timeToString(startTime),
        stop: timeToString(endOfDay),
        actions: []
      })
    );
  }

  return entries;
}
