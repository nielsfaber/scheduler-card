import { Time, TimeMode } from "../../types";

export const addTimeOffset = (time: Time, offsetTime: { hours?: number; minutes?: number }) => {
  let offsetHours = offsetTime.hours || 0;
  let offsetMinutes = offsetTime.minutes || 0;
  if (offsetHours < 0 || offsetMinutes < 0) {
    offsetHours = -Math.abs(offsetHours);
    offsetMinutes = -Math.abs(offsetMinutes);
  }

  let hours = time.hours;
  let minutes = time.minutes;

  hours += offsetHours;
  minutes += offsetMinutes;

  if (minutes >= 60 || (minutes > 0 && hours < 0 && time.mode != TimeMode.Fixed)) {
    hours = hours + 1;
    minutes -= 60;
  } else if (minutes <= -60) {
    hours = hours - 1;
    minutes += 60;
  } else if (
    (minutes < 0 && time.mode == TimeMode.Fixed) ||
    (minutes < 0 && hours > 0 && time.mode != TimeMode.Fixed)
  ) {
    hours = hours - 1;
    minutes += 60;
  }
  if (hours < 0 && time.mode == TimeMode.Fixed) {
    hours += 24;
  } else if (hours >= 24 && time.mode == TimeMode.Fixed) {
    hours -= 24;
  }

  return <Time>{
    mode: time.mode,
    hours: hours,
    minutes: minutes,
  };
};
