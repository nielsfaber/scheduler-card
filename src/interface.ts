import { EConditionType, ImportedEntry } from './types';
import { parseTimestamp, ETimeEvent, EDayType } from './date-time';

const EntryPattern = /^([0-9]+)?D([0-7]+)?T([0-9SRDUW]+)T?([0-9SRDUW]+)?(A[A0-9]+)+(C([C0-9]+))?(F([F0-9]+))?$/;
const SunTimePattern = /^([0-9]{4})?([SRDUW]{2})([0-9]{4})?$/;

export function importEntry(entryString: string) {
  const res = EntryPattern.exec(entryString)!;

  const entry: ImportedEntry = {
    time: { value: 0 },
    days: { type: EDayType.Daily },
    actions: [],
  };

  if (res[1]) {
    // non custom days
    if (res[1] == '15') Object.assign(entry, { days: { type: EDayType.Workday } });
    else if (res[1] == '67') Object.assign(entry, { days: { type: EDayType.Weekend } });
  } else {
    // custom days
    const dayList = res[2].split('').map(Number);
    dayList.sort();
    if (!(dayList.length == 1 && dayList[0] == 0))
      Object.assign(entry, { days: { type: EDayType.Custom, custom_days: dayList.filter(e => e != 0) } });
  }

  //time
  const isSunTime = SunTimePattern.exec(res[3]);
  if (!isSunTime) Object.assign(entry, { time: { value: parseTimestamp(res[3]) } });
  else
    Object.assign(entry, {
      time: {
        event: isSunTime[2] == 'SR' ? ETimeEvent.Sunrise : ETimeEvent.Sunset,
        value: isSunTime[1] ? -parseTimestamp(isSunTime[1]) : parseTimestamp(isSunTime[3]),
      },
    });

  if (res[4]) {
    //end time is defined
    const isSunTime = SunTimePattern.exec(res[4]);
    if (!isSunTime) Object.assign(entry, { endTime: { value: parseTimestamp(res[4]) } });
    else
      Object.assign(entry, {
        endTime: {
          event: isSunTime[2] == 'SR' ? ETimeEvent.Sunrise : ETimeEvent.Sunset,
          value: isSunTime[1] ? -parseTimestamp(isSunTime[1]) : parseTimestamp(isSunTime[4]),
        },
      });
  }

  //actions
  const actions = res[5].match(/A[0-9]+/g)?.map(e => Number(e.substring(1)));
  Object.assign(entry, { actions: actions });

  if (res[6]) {
    //conditions
    let conditions = res[6].match(/C[0-9]+/g)?.map(e => Number(e.substring(1)));
    if (conditions?.length == 1 && res[7].length > 1) {
      conditions = res[7].split('').map(Number);
      Object.assign(entry, { conditions: { type: EConditionType.All, items: conditions } });
    } else Object.assign(entry, { conditions: { type: EConditionType.Any, items: conditions } });
  }

  if (res[8]) {
    //options
    const options = res[8].match(/F[0-9]+/g)?.map(e => Number(e.substring(1)));
    Object.assign(entry, { options: options });
  }
  return entry;
}
