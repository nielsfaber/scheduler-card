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

export function parseTimestamp(input: string | Date): number {
  let hours, minutes, res;
  if (typeof input == 'object') {
    return parseTimestamp(
      `${String(input.getHours()).padStart(2, '0')}:${String(input.getMinutes()).padStart(2, '0')}`
    );
  }
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

export function sortDaylist(dayList: { id: number, name: string }[], first_weekday?: string) {
  let days_of_the_week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  if (!first_weekday || !days_of_the_week.includes(first_weekday)) return dayList;
  const shiftCount = days_of_the_week.length - days_of_the_week.findIndex(e => e == first_weekday);
  dayList = [...dayList.slice(-shiftCount), ...dayList.slice(0, -shiftCount)];
  return dayList;
}

export function relativeTime(ts: Date, options?: { amPm: boolean }) {
  const now = new Date();
  const secondsRemaining = Math.round((ts.valueOf() - now.valueOf()) / 1000);

  if (secondsRemaining < 5) {
    return localize('time.now');
  }

  if (secondsRemaining < 60) {
    return localize('time.relative', '{time}', localize('time.seconds', '{seconds}', String(secondsRemaining)));
  }

  if (secondsRemaining < 3300) {
    //max 55 mins
    const sec = secondsRemaining % 60;
    const mins = Math.round(secondsRemaining / 60);

    if (sec < 5 || sec > 55) {
      if (mins == 1) return localize('time.relative', '{time}', localize('time.minute'));
      else return localize('time.relative', '{time}', localize('time.minutes', '{minutes}', String(mins)));
    }

    if (Math.floor(secondsRemaining / 60) == 1) {
      const value = Math.round(secondsRemaining - 60);
      return localize(
        'time.relative',
        '{time}',
        `${localize('time.minute')} ${localize('words.and')} ${localize('time.seconds', '{seconds}', String(value))}`
      );
    }

    return localize('time.relative', '{time}', localize('time.minutes', '{minutes}', String(mins)));
  }

  if (Math.floor(secondsRemaining / 3600) == 1) {
    const value = Math.round(secondsRemaining / 60 - 60);
    return localize(
      'time.relative',
      '{time}',
      `${localize('time.hour')} ${localize('words.and')} ${localize('time.minutes', '{minutes}', String(value))}`
    );
  }

  const hoursRemaining = Math.round(secondsRemaining / 3600);

  if (hoursRemaining <= 6) {
    if (hoursRemaining == 1) return localize('time.relative', '{time}', localize('time.hour'));
    else return localize('time.relative', '{time}', localize('time.hours', '{hours}', String(hoursRemaining)));
  }

  const start_of_day = new Date();
  start_of_day.setHours(0, 0, 0, 0);
  const days_diff = Math.floor((ts.valueOf() - start_of_day.valueOf()) / (24 * 3600 * 1000));

  const time = `${formatTime(parseTimestamp(ts), { amPm: options?.amPm }).time}`;

  if (days_diff == 0) {
    if (ts.getHours() == 12 && ts.getMinutes() == 0) return localize('time.absolute', '{time}', localize('time.noon'));
    return localize('time.absolute', '{time}', time);
  }

  if (days_diff == 1) {
    if (ts.getHours() == 0 && ts.getMinutes() == 0)
      return localize('time.absolute', '{time}', localize('time.midnight'));
    if (ts.getHours() == 12 && ts.getMinutes() == 0)
      return `${localize('days.tomorrow')} ${localize('time.absolute', '{time}', localize('time.noon'))}`;
    return `${localize('days.tomorrow')} ${localize('time.absolute', '{time}', time)}`;
  }

  return `${weekdayToString(weekday(ts))} ${localize('time.absolute', '{time}', time)}`;
}

export function PrettyPrintDays(days: Days) {
  function findSequence(days: number[]): number[] {
    const len: number[] = [];
    for (let i = 0; i < days.length - 1; i++) {
      let j = i + 1;
      while (days[j] - days[j - 1] == 1) j++;
      len.push(j - i);
    }
    return len;
  }

  if (days.type == EDayType.Daily) return localize('days.daily');
  else if (days.type == EDayType.Workday) return localize('days.working_days');
  else if (days.type == EDayType.Weekend) return localize('days.weekend');
  else {
    const dayList = days.custom_days || [];
    dayList.sort();
    const output: string[] = dayList.map(weekdayToString);
    const seq = findSequence(dayList);
    const len = Math.max(...seq);
    if (dayList.length == 6) {
      const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !dayList.includes(e));
      return localize('days.daily_except_days', '{days}', weekdayToString(missing.pop()!));
    } else if (dayList.length >= 3 && len >= 3) {
      const seq = findSequence(dayList);
      const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
      output.splice(
        start,
        len,
        localize('days.interval', ['{startDay}', '{endDay}'], [output[start], output[start + len - 1]])
      );
    }
    return output.length > 1
      ? `${output.slice(0, -1).join(', ')} ${localize('words.and')} ${output.pop()}`
      : `${output.pop()}`;
  }
}
