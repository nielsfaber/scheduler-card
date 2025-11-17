import { FrontendLocaleData, TimeFormat } from "./types";

export const useAmPm = (locale: FrontendLocaleData): boolean => {
  if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
    const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(testLanguage);
    return test.includes("10");
  }

  return locale.time_format === TimeFormat.am_pm;
};

export enum AmPmFormat {
  AM = "AM",
  PM = "PM",
}

export const convertTo12Hour = (hours: number) => {
  const amPm = hours >= 12 ? AmPmFormat.PM : AmPmFormat.AM;
  const hours12 = hours % 12 || 12;

  return { am_pm: amPm, hours: hours12 };
};

export const convertTo24Hour = (hours12: number, amPm: AmPmFormat) => {
  if (amPm == AmPmFormat.AM) {
    return hours12 == 12 ? 0 : hours12;
  } else {
    return hours12 == 12 ? 12 : hours12 + 12;
  }
};
