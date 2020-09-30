
export const MinutesPerHour = 60;
export const HoursPerDay = 24;
export const MinutesPerDay = HoursPerDay * MinutesPerHour

export enum ETimeEvent {
  Sunrise = "SUNRISE",
  Sunset = "SUNSET"
}

export interface ITime {
  value: number,
  event?: ETimeEvent
}

export enum EDayType {
  Daily = "DAILY",
  Weekdays = "WEEKDAYS",
  Custom = "CUSTOM",
}

export interface IDays {
  type: EDayType,
  custom_days?: number[]
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

export function formatTime(value: number, options: { amPm?: boolean, absolute?: boolean } = {}) {
  let amPmFormat = options.amPm ? options.amPm : false;
  let absolute = options.absolute ? options.absolute : false;

  let hours = value >= 0 ? Math.floor(value / MinutesPerHour) : Math.ceil(value / MinutesPerHour);
  let minutes = value - hours * MinutesPerHour;

  let am_pm = "";
  if (amPmFormat) {
    am_pm = (hours >= 12) ? "PM" : "AM";
    if (hours > 12 || (hours == 12 && minutes > 0)) hours -= 12;
  }

  let hours_string = String(Math.abs(hours)).padStart(2, '0');
  let minutes_string = String(Math.abs(minutes)).padStart(2, '0');
  let signed = (hours < 0 || minutes < 0);

  let output = {
    hours: hours_string,
    minutes: minutes_string,
    time: `${signed && !absolute ? '-' : ''}${hours_string}:${minutes_string}${amPmFormat ? ` ${am_pm}` : ""}`,
    signed: signed,
    amPm: am_pm
  };

  return output;
}


export function wrapTime(value: number, options: { stepSize?: number, signed?: boolean, max?: number } = {}) {
  let stepSize = options.stepSize ? options.stepSize : 1;
  let signed = options.signed ? options.signed : false;
  let max = options.max ? options.max : HoursPerDay * MinutesPerHour;

  let valueRounded = roundTime(value, stepSize);

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
  }
  else if ((res = /^([0-9]{2})([0-9]{2})$/.exec(input)) !== null) {
    [hours, minutes] = [Number(res[1]), Number(res[2])];
  }
  else if ((res = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[\+|\-][0-9]{2}:[0-9]{2}$/.exec(input)) !== null) {
    let ts = new Date(res[0]);
    return parseTimestamp(`${String(ts.getHours()).padStart(2, '0')}:${String(ts.getMinutes()).padStart(2, '0')}`);
  }
  else {
    console.log(`failed to parse timestamp '${input}'`);
  }
  let value = hours * MinutesPerHour + minutes;
  return value;
}

export function daysToArray(dayCfg: IDays): number[] {
  if (dayCfg.type == EDayType.Weekdays) return [1, 2, 3, 4, 5];
  else if (dayCfg.type == EDayType.Custom && dayCfg.custom_days) return dayCfg.custom_days.sort().filter(e => e != 0);
  else return [];
}

export function ArraytoDays(input: number[]): IDays {
  let alldays = [1, 2, 3, 4, 5, 6, 7], weekdays = [1, 2, 3, 4, 5];
  if (input.length == 1 && input[0] == 0) return { type: EDayType.Daily, custom_days: [] };
  let dayArray = [...input].sort().filter(e => e != 0);
  if (dayArray.length == alldays.length && dayArray.every((e, i) => e == alldays[i])) return { type: EDayType.Daily, custom_days: [] };
  else if (dayArray.length == weekdays.length && dayArray.every((e, i) => e == weekdays[i])) return { type: EDayType.Weekdays, custom_days: [] };
  else return { type: EDayType.Custom, custom_days: dayArray };
}

export function stringToTimeEvent(input: string): ETimeEvent {
  if (input == "sunrise") return ETimeEvent.Sunrise;
  return ETimeEvent.Sunset;
}

export function timeEventToString(input: ETimeEvent): string {
  if (input == ETimeEvent.Sunrise) return "sunrise";
  else return "sunset";

}