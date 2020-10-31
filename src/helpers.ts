import { Entry, Dictionary } from './types';
import { MinutesPerDay } from './date-time';

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

export function calculateTimeline(entries: Entry[]): Entry[] {
  //TBD implementation for sun
  entries.sort((a, b) => (a.time.value > b.time.value ? 1 : -1));
  entries = entries.map(e =>
    e.endTime!.value < e.time.value ? Object.assign(e, { endTime: { value: e.endTime!.value + MinutesPerDay } }) : e
  );

  let startTime = 0;
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.time.value > startTime) {
      entries.splice(
        i,
        0,
        Object.assign(
          {
            time: { value: startTime },
            endTime: { value: entry.time!.value },
          } as Entry,
          pick(entry, ['entity', 'days', 'conditions', 'options'])
        )
      );
    }
    startTime = entry.endTime!.value;
  }
  if (startTime < MinutesPerDay) {
    entries.push(
      Object.assign(
        {
          time: { value: startTime },
          endTime: { value: MinutesPerDay },
        } as Entry,
        pick(entries[0], ['entity', 'days', 'conditions', 'options'])
      )
    );
  }

  return entries;
}
