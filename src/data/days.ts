import { HomeAssistant } from "../lib/types";
import { localize } from "../localize/localize";
import { TWeekday } from "../types";

const supportLocaleString = () => {
  try {
    new Date().toLocaleDateString('i');
  } catch (e: any) {
    return e.name === 'RangeError';
  }
  return false;
};

export const computeStartOfWeek = (hass: HomeAssistant) => {
  let startOfWeekSetting = (hass.locale as any).first_weekday;

  if (!startOfWeekSetting || startOfWeekSetting == 'language') {
    // @ts-ignore
    if ("weekInfo" in Intl.Locale.prototype) {
      // @ts-ignore
      return new Intl.Locale(hass.locale.language).weekInfo.firstDay % 7;
    }
    else {
      const regionSat = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g)!;
      const regionSun = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g)!;
      const languageSat = ['ar', 'arq', 'arz', 'fa'];
      const languageSun = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g)!;
      const parts = hass.locale.language.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i)!;
      return parts[1] ? (
        regionSun.includes(parts[4]) ? 0 :
          regionSat.includes(parts[4]) ? 6 : 1) : (
        languageSun.includes(parts[1]) ? 0 :
          languageSat.includes(parts[1]) ? 6 : 1);
    }
  }
  else {
    return weekdayList.map(e => e.toLowerCase()).findIndex(e => e == startOfWeekSetting);
  }
}

const findSequences = (list: number[]) => {
  const len: number[] = [];
  for (let i = 0; i < list.length - 1; i++) {
    let j = i + 1;
    while (list[j] - list[j - 1] == 1) j++;
    len.push(j - i);
  }
  return len;
}

//const weekdayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdayList = [
  TWeekday.Sunday,
  TWeekday.Monday,
  TWeekday.Tuesday,
  TWeekday.Wednesday,
  TWeekday.Thursday,
  TWeekday.Friday,
  TWeekday.Saturday,
];

// 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday.

export const formatWeekdayDisplay = (weekdays: TWeekday[], formatType: 'short' | 'long', hass: HomeAssistant) => {

  const computeDayDisplay = (weekday: TWeekday) => {
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
        let dayNumber = weekdayList.findIndex(e => e == weekday);
        if (!supportLocaleString()) return weekdayList[dayNumber];
        date.setDate(date.getDate() + dayNumber);
        return date.toLocaleDateString(hass.locale.language, { weekday: formatType });
      default:
        return '';
    }
  }

  const startOfWeek = computeStartOfWeek(hass);
  const rotateArray = (arr: any[], k: number) => arr.concat(arr).slice(k, k + arr.length);
  let weekdayListOrdered = rotateArray(weekdayList, startOfWeek);

  weekdays.sort((a, b) => {
    let indA = weekdayListOrdered.findIndex(e => e == a);
    let indB = weekdayListOrdered.findIndex(e => e == b);
    return indA - indB;
  })

  const weekdayNums = weekdays.filter(e => weekdayListOrdered.includes(e)).map(e => weekdayListOrdered.findIndex(f => f == e));
  const seq = findSequences(weekdayNums);
  const longestSequence = Math.max(...seq);

  if (weekdayNums.length) {

    if (weekdayNums.length == 6) {
      const missing = [0, 1, 2, 3, 4, 5, 6].filter(e => !weekdayNums.includes(e));
      const missingDay = computeDayDisplay(weekdayListOrdered[missing.pop()!]);
      return localize(
        'ui.components.date.repeated_days_except',
        hass,
        '{excludedDays}',
        missingDay
      )
    }

    const dayNames = weekdayNums.map(e => computeDayDisplay(weekdayListOrdered[e]));

    if (weekdayNums.length >= 3 && longestSequence >= 3) {
      const start = seq.reduce((obj, e, i) => (e == longestSequence ? i : obj), 0);

      dayNames.splice(
        start,
        longestSequence,
        localize(
          'ui.components.date.days_range',
          hass,
          ['{startDay}', '{endDay}'],
          [dayNames[start], dayNames[start + longestSequence - 1]]
        )
      );
    }

    const daysString =
      dayNames.length > 1
        ? `${dayNames.slice(0, -1).join(', ')} ${hass.localize('ui.common.and')} ${dayNames.pop()}`
        : `${dayNames.pop()}`;

    return weekdayNums.length >= 3 && longestSequence >= 3
      ? daysString
      : localize('ui.components.date.repeated_days', hass, '{days}', daysString);
  };

  return weekdays.map(computeDayDisplay).join(', ');
}
