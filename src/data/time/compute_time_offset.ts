import { roundTime } from "./round_time";

type OffsetType = {
  hours: number;
  minutes: number;
};

export const computeTimeOffset = (time: { hours: number; minutes: number }, referenceTime: string): OffsetType => {
  const reference = new Date(referenceTime);
  const tsReference = reference.getHours() * 3600 + reference.getMinutes() * 60 + reference.getSeconds();

  let offset = time.hours * 3600 + time.minutes * 60 - tsReference;
  const sign = offset < 0 ? -1 : 1;
  offset = Math.abs(offset);

  let hours = Math.floor(offset / 3600);
  let minutes = Math.round((offset - hours * 3600) / 60);

  if (sign < 0) {
    if (hours > 0) hours = -hours;
    minutes = -minutes;
  }

  return roundTime({ hours: hours, minutes: minutes });
};
