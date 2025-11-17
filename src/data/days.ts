import { HomeAssistant } from "../lib/types";
import { hassLocalize } from "../localize/hassLocalize";
import { localize } from "../localize/localize";
import { TWeekday } from "../types";
import { computeDayDisplay } from "./format/compute_days_display";

const supportLocaleString = () => {
  try {
    new Date().toLocaleDateString("i");
  } catch (e: any) {
    return e.name === "RangeError";
  }
  return false;
};

export const computeStartOfWeek = (hass: HomeAssistant) => {
  const startOfWeekSetting = (hass.locale as any).first_weekday;

  if (!startOfWeekSetting || startOfWeekSetting == "language") {
    // @ts-ignore
    if ("weekInfo" in Intl.Locale.prototype) {
      // @ts-ignore
      return new Intl.Locale(hass.locale.language).weekInfo.firstDay % 7;
    } else {
      const regionSat = "AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g)!;
      const regionSun =
        "AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(
          /../g
        )!;
      const languageSat = ["ar", "arq", "arz", "fa"];
      const languageSun = "amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g)!;
      const parts = hass.locale.language.match(
        /^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i
      )!;
      return parts[1]
        ? regionSun.includes(parts[4])
          ? 0
          : regionSat.includes(parts[4])
            ? 6
            : 1
        : languageSun.includes(parts[1])
          ? 0
          : languageSat.includes(parts[1])
            ? 6
            : 1;
    }
  } else {
    return weekdayList.map((e) => e.toLowerCase()).findIndex((e) => e == startOfWeekSetting);
  }
};

const findSequences = (list: number[]) => {
  const len: number[] = [];
  for (let i = 0; i < list.length - 1; i++) {
    let j = i + 1;
    while (list[j] - list[j - 1] == 1) j++;
    len.push(j - i);
  }
  return len;
};

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

export const formatWeekdayDisplay = (weekdays: TWeekday[], formatType: "short" | "long", hass: HomeAssistant) => {
  const startOfWeek = computeStartOfWeek(hass);
  const rotateArray = (arr: any[], k: number) => arr.concat(arr).slice(k, k + arr.length);
  const weekdayListOrdered = rotateArray(weekdayList, startOfWeek);

  weekdays.sort((a, b) => {
    const indA = weekdayListOrdered.findIndex((e) => e == a);
    const indB = weekdayListOrdered.findIndex((e) => e == b);
    return indA - indB;
  });

  const weekdayNums = weekdays
    .filter((e) => weekdayListOrdered.includes(e))
    .map((e) => weekdayListOrdered.findIndex((f) => f == e));
  const seq = findSequences(weekdayNums);
  const longestSequence = Math.max(...seq);

  if (weekdayNums.length) {
    if (weekdayNums.length == 6) {
      const missing = [0, 1, 2, 3, 4, 5, 6].filter((e) => !weekdayNums.includes(e));
      const missingDay = computeDayDisplay(weekdayListOrdered[missing.pop()!], formatType, hass);
      return localize("ui.components.date.repeated_days_except", hass, "{excludedDays}", missingDay);
    }

    const dayNames = weekdayNums.map((e) => computeDayDisplay(weekdayListOrdered[e], formatType, hass));

    if (weekdayNums.length >= 3 && longestSequence >= 3) {
      const start = seq.reduce((obj, e, i) => (e == longestSequence ? i : obj), 0);

      dayNames.splice(
        start,
        longestSequence,
        localize(
          "ui.components.date.days_range",
          hass,
          ["{startDay}", "{endDay}"],
          [dayNames[start], dayNames[start + longestSequence - 1]]
        )
      );
    }

    const daysString =
      dayNames.length > 1
        ? `${dayNames.slice(0, -1).join(", ")} ${hassLocalize("ui.common.and", hass)} ${dayNames.pop()}`
        : `${dayNames.pop()}`;

    return weekdayNums.length >= 3 && longestSequence >= 3
      ? daysString
      : localize("ui.components.date.repeated_days", hass, "{days}", daysString);
  }

  return weekdays.map((e) => computeDayDisplay(e, formatType, hass)).join(", ");
};
