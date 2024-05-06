




export const roundTime = <T extends { hours: number, minutes: number, seconds?: number }>(time: T, stepSize: number = 1): T => {
  let ts = Math.abs(time.hours) * 3600 + Math.abs(time.minutes) * 60 + (time.seconds || 0);
  const sign = (time.hours < 0 || time.minutes < 0) ? -1 : 1;

  let hours = Math.floor(ts / 3600);
  let minutes = Math.round((ts - hours * 3600) / 60);

  if (minutes % stepSize != 0) minutes = Math.round(minutes / stepSize) * stepSize;

  if (minutes >= 60) {
    hours++;
    minutes -= 60;
  }

  if (sign < 0) {
    if (hours > 0) hours = -hours;
    else minutes = -minutes;
  }

  return { ...time, hours: hours, minutes: minutes };
}