import { WeekdayType } from '../../types';

export function weekdayToList(weekday: WeekdayType) {
  let list = weekday
    .map(e => {
      switch (e) {
        case 'mon':
          return 1;
        case 'tue':
          return 2;
        case 'wed':
          return 3;
        case 'thu':
          return 4;
        case 'fri':
          return 5;
        case 'sat':
          return 6;
        case 'sun':
          return 7;
        default:
          return;
      }
    })
    .filter(e => e) as number[];
  return list;
}
