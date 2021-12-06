import { WeekdayType, EDayType } from '../../types';

export function weekdayType(weekday: WeekdayType) {
  if (weekday.includes('daily')) return EDayType.Daily;
  if (weekday.includes('workday')) return EDayType.Workday;
  if (weekday.includes('weekend')) return EDayType.Weekend;
  return EDayType.Custom;
}
