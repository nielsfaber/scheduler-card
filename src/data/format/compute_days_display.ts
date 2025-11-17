import { HomeAssistant } from "../../lib/types";
import { localize } from "../../localize/localize";
import { TWeekday } from "../../types";

const supportLocaleString = () => {
  try {
    new Date().toLocaleDateString("i");
  } catch (e: any) {
    return e.name === "RangeError";
  }
  return false;
};

const weekdayList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const computeDayDisplay = (input: TWeekday | Date, formatType: "short" | "long", hass: HomeAssistant) => {
  let weekday: TWeekday;

  if (input instanceof Date) {
    let day = input.getDay();
    weekday = TWeekday.Friday;

    if (supportLocaleString()) {
      return input.toLocaleDateString(hass.locale.language, { weekday: formatType });
    } else {
      let day = input.getDay();
      weekday = TWeekday.Friday;
    }
  } else {
    weekday = input;
  }

  switch (weekday) {
    case TWeekday.Daily:
      return localize(`ui.components.date.day_types_${formatType}.daily`, hass);
    case TWeekday.Workday:
      return localize(`ui.components.date.day_types_${formatType}.workdays`, hass);
    case TWeekday.Weekend:
      return localize(`ui.components.date.day_types_${formatType}.weekend`, hass);
    case TWeekday.Monday:
    case TWeekday.Tuesday:
    case TWeekday.Wednesday:
    case TWeekday.Thursday:
    case TWeekday.Friday:
    case TWeekday.Saturday:
    case TWeekday.Sunday:
      let date = new Date(2017, 1, 26);
      let dayNumber = weekdayList.findIndex((e) => e == weekday);
      if (!supportLocaleString()) return weekdayList[dayNumber];
      date.setDate(date.getDate() + dayNumber);
      return date.toLocaleDateString(hass.locale.language, { weekday: formatType });
    default:
      return "";
  }
};
