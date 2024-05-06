import { HomeAssistant } from "../../lib/types";
import { localize } from "../../localize/localize";
import { TWeekday } from "../../types";

const supportLocaleString = () => {
  try {
    new Date().toLocaleDateString('i');
  } catch (e: any) {
    return e.name === 'RangeError';
  }
  return false;
};

const weekdayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const computeDaysDisplay = (weekdays: TWeekday[], hass: HomeAssistant) => {

  const computeDayDisplay = (weekday: TWeekday) => {
    switch (weekday) {
      case TWeekday.Daily:
        return localize('card.days.daily', hass);
      case TWeekday.Workday:
        return localize('card.days.workdays', hass);
      case TWeekday.Weekend:
        return localize('card.days.weekend', hass);
      case TWeekday.Monday:
      case TWeekday.Tuesday:
      case TWeekday.Wednesday:
      case TWeekday.Thursday:
      case TWeekday.Friday:
      case TWeekday.Saturday:
      case TWeekday.Sunday:
        let date = new Date(2017, 1, 26);
        let dayNumber = weekdayList.findIndex(e => e == weekday);
        if (!supportLocaleString()) return weekdayList[dayNumber];
        date.setDate(date.getDate() + dayNumber);
        return date.toLocaleDateString(hass.locale.language);
      default:
        return '';
    }

  }

  return weekdays.map(computeDayDisplay);
}