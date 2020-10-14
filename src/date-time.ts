import { localize } from './localize/localize';

export const MinutesPerHour = 60;
export const HoursPerDay = 24;
export const MinutesPerDay = HoursPerDay * MinutesPerHour;

export enum ETimeEvent {
  Sunrise = 'SUNRISE',
  Sunset = 'SUNSET',
}

export interface Time {
  value: number;
  event?: ETimeEvent;
}

export enum EDayType {
  Daily = 'DAILY',
  Workday = 'WORKDAY',
  Weekend = 'WEEKEND',
  Custom = 'CUSTOM',
}

export interface Days {
  type: EDayType;
  custom_days?: number[];
}

export function roundTime(value: number, stepSize: number) {
  let hours = value >= 0 ? Math.floor(value / MinutesPerHour) : Math.ceil(value / MinutesPerHour);
  let minutes = value - hours * MinutesPerHour;

  if (minutes % stepSize != 0) minutes = Math.round(minutes / stepSize) * stepSize;

  if (minutes >= MinutesPerHour) {
    hours++;
    minutes -= MinutesPerHour;
  }
  if (hours >= HoursPerDay) hours -= HoursPerDay;

  return hours * MinutesPerHour + minutes;
}

export function formatTime(value: number, options: { amPm?: boolean; absolute?: boolean } = {}) {
  const amPmFormat = options.amPm ? options.amPm : false;
  const absolute = options.absolute ? options.absolute : false;

  if (value >= MinutesPerDay) value -= MinutesPerDay;

  let hours = value >= 0 ? Math.floor(value / MinutesPerHour) : Math.ceil(value / MinutesPerHour);
  const minutes = value - hours * MinutesPerHour;

  let am_pm = '';
  if (amPmFormat) {
    am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12 || (hours == 12 && minutes > 0)) hours -= 12;
  }

  const hours_string = String(Math.abs(hours)).padStart(2, '0');
  const minutes_string = String(Math.abs(minutes)).padStart(2, '0');
  const signed = hours < 0 || minutes < 0;

  const output = {
    hours: hours_string,
    minutes: minutes_string,
    time: `${signed && !absolute ? '-' : ''}${hours_string}:${minutes_string}${amPmFormat ? ` ${am_pm}` : ''}`,
    signed: signed,
    amPm: am_pm,
  };

  return output;
}

export function wrapTime(value: number, options: { stepSize?: number; signed?: boolean; max?: number } = {}) {
  const stepSize = options.stepSize ? options.stepSize : 1;
  const signed = options.signed ? options.signed : false;
  const max = options.max ? options.max : HoursPerDay * MinutesPerHour;

  const valueRounded = roundTime(value, stepSize);

  if (valueRounded < 0 && !signed) value += HoursPerDay * MinutesPerHour;
  else if (valueRounded >= HoursPerDay * MinutesPerHour) value -= HoursPerDay * MinutesPerHour;

  if (valueRounded < -max) return -max;
  else if (valueRounded > max) return max;
  else return value;
}

export function parseTimestamp(input: string): number {
  let hours, minutes, res;
  if ((res = /^([0-9]{2}):([0-9]{2})$/.exec(input)) !== null) {
    [hours, minutes] = [Number(res[1]), Number(res[2])];
  } else if ((res = /^([0-9]{2})([0-9]{2})$/.exec(input)) !== null) {
    [hours, minutes] = [Number(res[1]), Number(res[2])];
  } else if (
    (res = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[\+|\-][0-9]{2}:[0-9]{2}$/.exec(input)) !== null
  ) {
    const ts = new Date(res[0]);
    return parseTimestamp(`${String(ts.getHours()).padStart(2, '0')}:${String(ts.getMinutes()).padStart(2, '0')}`);
  } else {
    console.log(`failed to parse timestamp '${input}'`);
  }
  const value = hours * MinutesPerHour + minutes;
  return value;
}

export function daysToArray(dayCfg: Days) {
  if (dayCfg.type == EDayType.Daily) return [1, 2, 3, 4, 5, 6, 7];
  else if (dayCfg.type == EDayType.Workday) return [1, 2, 3, 4, 5];
  else if (dayCfg.type == EDayType.Weekend) return [6, 7];
  else if (dayCfg.type == EDayType.Custom) return dayCfg.custom_days as number[];
  else return [];
}

export function stringToTimeEvent(input: string): ETimeEvent {
  if (input == 'sunrise') return ETimeEvent.Sunrise;
  return ETimeEvent.Sunset;
}

export function timeEventToString(input: ETimeEvent): string {
  if (input == ETimeEvent.Sunrise) return 'sunrise';
  else return 'sunset';
}

export function weekdayToString(day: number) {
  switch (day) {
    case 1:
      return localize('days_long.mon');
    case 2:
      return localize('days_long.tue');
    case 3:
      return localize('days_long.wed');
    case 4:
      return localize('days_long.thu');
    case 5:
      return localize('days_long.fri');
    case 6:
      return localize('days_long.sat');
    case 7:
      return localize('days_long.sun');
    default:
      return '';
  }
}

export function weekday(ts: Date) {
  let day = ts.getDay();
  if (day == 0) day = 7;
  return day;
}

export function getRemaining(time_str: string | undefined) {
  if (time_str) {
    const ts = new Date(time_str);
    const now = new Date();
    const remaining = (ts.valueOf() - now.valueOf()) / 1000;
    return Math.round(remaining);
  } else return null;
}
