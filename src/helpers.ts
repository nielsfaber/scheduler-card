import {
  Entry,
  Dictionary,
  ActionElement,
  ListVariable,
  LevelVariable,
  LevelVariableConfig,
  ListVariableConfig,
  EVariableType,
} from './types';
import { localize } from './localize/localize';
import { formatTime, Time, ETimeEvent, MinutesPerDay } from './date-time';
import { UnitPercent, FieldTemperature } from './const';


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

export function PrettyPrintTime(
  time: Time,
  options: { amPm: boolean; sunrise: number | null; sunset: number | null; endTime?: Time }
): string {
  const amPmFormat = options.amPm ? options.amPm : false;

  if (!time.event) {
    if (!options.endTime) return localize('time.absolute', '{time}', formatTime(time.value, { amPm: amPmFormat }).time);
    else
      return localize(
        'time.interval',
        ['{startTime}', '{endTime}'],
        [
          formatTime(time.value, { amPm: amPmFormat }).time,
          formatTime(options.endTime.value, { amPm: amPmFormat }).time,
        ]
      );
  }

  let time_string = 'unknown';
  let event_string = '';
  if (time.event === ETimeEvent.Sunrise && options.sunrise !== null) {
    time_string = formatTime(time.value, { absolute: true }).time;
    event_string = localize('time.sun_event_sunrise');
  } else if (time.event == ETimeEvent.Sunset && options.sunset !== null) {
    time_string = formatTime(time.value, { absolute: true }).time;
    event_string = localize('time.sun_event_sunset');
  }

  if (Math.abs(time.value) == 0) return localize('time.at_sun_event', '{sunEvent}', event_string);
  return `${time_string} ${
    formatTime(time.value).signed ? localize('words.before') : localize('words.after')
    } ${event_string}`;
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

// export function PrettyPrintActionVariable(
//   input: LevelVariable | ListVariable,
//   cfg: LevelVariableConfig | ListVariableConfig,
//   options: { temperature_unit: string }
// ): string {
//   if (input.type == EVariableType.Level) {
//     cfg = cfg as LevelVariableConfig;
//     let unit = 'unit' in cfg ? cfg.unit : '';
//     if (!unit.length && cfg.field == FieldTemperature) unit = options.temperature_unit;
//     let value = Number(input.value);
//     if (cfg.unit == UnitPercent) {
//       value = Math.round(((value - cfg.min) / (cfg.max - cfg.min)) * 100);
//       if (value < cfg.min) value = cfg.min;
//       else if (value > cfg.max) value = cfg.max;
//     }
//     return `${value}${unit}`;
//   } else {
//     return PrettyPrintName(String(input.value));
//   }
// }

// export function PrettyPrintAction(entry: Entry, actionCfg: ActionElement, options: { temperature_unit: string }) {
//   let action_string = PrettyPrintName(actionCfg.name);

//   if (entry.hasOwnProperty('variable') && entry.variable && actionCfg.variable) {
//     if (entry.variable.type == EVariableType.Level && !(entry.variable as LevelVariable).enabled)
//       return capitalize(action_string);
//     const value = PrettyPrintActionVariable(entry.variable, actionCfg.variable, options);
//     action_string = `${localize('services.set_to')} ${value}`;
//   }
//   return action_string;
// }

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
// export function PrettyPrintDays(days: Days): string {
//   if (days.type == EDayType.Daily) return localize('fields.day_type_daily');
//   else if (days.type == EDayType.Workday) return `${localize('words.on')} ${localize('fields.day_type_workday')}`;
//   else if (days.type == EDayType.Weekend) return `${localize('words.every')} ${localize('fields.day_type_weekend')}`;
//   else {
//     let dayList = days.custom_days || [];
//     let output = Array();
//     if (dayList.includes(1)) output.push(localize('days_long.mon'));
//     if (dayList.includes(2)) output.push(localize('days_long.tue'));
//     if (dayList.includes(3)) output.push(localize('days_long.wed'));
//     if (dayList.includes(4)) output.push(localize('days_long.thu'));
//     if (dayList.includes(5)) output.push(localize('days_long.fri'));
//     if (dayList.includes(6)) output.push(localize('days_long.sat'));
//     if (dayList.includes(7)) output.push(localize('days_long.sun'));
//     let output_str = output.join(', ');
//     var n = output_str.lastIndexOf(', ');
//     if (n) output_str = output_str.slice(0, n) + output_str.slice(n).replace(', ', ` ${localize('words.and')} `);
//     return `${localize('words.every')} ${output_str}`;
//   }
// }
