import { ETimeEvent } from './types';

export const MinutesPerHour = 60;
export const HoursPerDay = 24;
export const MinutesPerDay = HoursPerDay * MinutesPerHour;

export function roundTime(value: number, stepSize: number, wrapAround: boolean = true) {
  let hours = value >= 0 ? Math.floor(value / MinutesPerHour) : Math.ceil(value / MinutesPerHour);
  let minutes = value - hours * MinutesPerHour;

  if (minutes % stepSize != 0) minutes = Math.round(minutes / stepSize) * stepSize;

  if (minutes >= MinutesPerHour) {
    hours++;
    minutes -= MinutesPerHour;
  }
  if (hours >= HoursPerDay && wrapAround) hours -= HoursPerDay;

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
    if (hours > 12) hours -= 12;
    else if (hours == 0) hours += 12;
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
  } else if ((res = /^([0-9]{2}):([0-9]{2})\ (AM|PM)$/.exec(input)) !== null) {
    [hours, minutes] = [Number(res[1]), Number(res[2])];
    if (hours == 12 && res[3] == 'AM') hours -= 12;
    else if (res[3] == 'PM' && hours != 12) hours += 12;
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

export function stringToTimeEvent(input: string): ETimeEvent {
  if (input == 'sunrise') return ETimeEvent.Sunrise;
  return ETimeEvent.Sunset;
}

export function timeEventToString(input: ETimeEvent): string {
  if (input == ETimeEvent.Sunrise) return 'sunrise';
  else return 'sunset';
}
