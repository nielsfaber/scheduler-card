import { Time, TimeMode } from "../../types";
import { roundTime } from "./round_time";

export const parseTimeString = (string: string): Time => {
  if (string.match(/^([0-9:]+)$/)) {
    const parts = string.split(":").map(Number);
    const time = roundTime({ hours: parts[0], minutes: parts[1], seconds: parts[2] });

    return {
      mode: TimeMode.Fixed,
      hours: time.hours,
      minutes: time.minutes,
    };
  }

  const match = string.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);
  if (match) {
    let parts = match[3].split(":").map(Number);
    const time = roundTime({ hours: parts[0], minutes: parts[1], seconds: parts[2] });
    let hours = time.hours;
    let minutes = time.minutes;
    if (match[2] == "-") {
      if (hours > 0) hours = -hours;
      minutes = -minutes;
    }
    return {
      mode: match[1] == "sunrise" ? TimeMode.Sunrise : TimeMode.Sunset,
      hours: hours,
      minutes: minutes,
    };
  }

  const ts = new Date(string);
  const time = roundTime({ hours: ts.getHours(), minutes: ts.getMinutes(), seconds: ts.getSeconds() });
  return {
    mode: TimeMode.Fixed,
    hours: time.hours,
    minutes: time.minutes,
  };
};
