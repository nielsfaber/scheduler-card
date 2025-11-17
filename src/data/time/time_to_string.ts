import { AmPmFormat, convertTo12Hour } from "../../lib/use_am_pm";
import { Time, TimeMode } from "../../types";

type FormatOptions = {
  seconds?: boolean;
  am_pm?: boolean;
};

export const timeToString = (input: Time, formatOptions: FormatOptions = { seconds: true }) => {
  let output = "";

  if (input.hours >= 24) input.hours -= 24;

  if (input.mode == TimeMode.Fixed && formatOptions.am_pm) {
    const amPm = convertTo12Hour(input.hours).am_pm;
    const hours12 = convertTo12Hour(input.hours).hours;
    output = String(hours12).padStart(2, "0") + ":" + String(input.minutes).padStart(2, "0");
    if (formatOptions.seconds) output += ":00";
    output += " " + (amPm === AmPmFormat.AM ? "am" : "pm");
  } else if (input.mode == TimeMode.Fixed) {
    output = String(input.hours).padStart(2, "0") + ":" + String(input.minutes).padStart(2, "0");
    if (formatOptions.seconds) output += ":00";
  } else {
    output =
      input.mode +
      (input.hours < 0 || input.minutes < 0 ? "-" : "+") +
      String(Math.abs(input.hours)).padStart(2, "0") +
      ":" +
      String(Math.abs(input.minutes)).padStart(2, "0");
    if (formatOptions.seconds) output += ":00";
  }

  return output;
};
