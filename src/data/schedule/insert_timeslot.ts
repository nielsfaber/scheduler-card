import { HomeAssistant } from "../../lib/types";
import { Schedule, TimeMode } from "../../types";
import { addTimeOffset } from "../time/add_time_offset";
import { computeTimestamp } from "../time/compute_timestamp";
import { parseTimeString } from "../time/parse_time_string";
import { roundTime } from "../time/round_time";
import { timeToString } from "../time/time_to_string";

export const insertTimeslot = (schedule: Schedule, entry: number, slotIdx: number, hass: HomeAssistant): Schedule => {
  let slots = [...schedule.entries[entry].slots];

  let startTime = parseTimeString(slots[slotIdx].start);
  let stopTime = slots[slotIdx].stop === undefined ? startTime : parseTimeString(slots[slotIdx].stop!);

  //convert 00:00 to 24:00 for stoptime
  if (stopTime.mode === TimeMode.Fixed && !stopTime.hours && !stopTime.minutes) {
    stopTime = { ...stopTime, hours: 24 };
  }

  //convert start time to fixed time if needed
  if ([TimeMode.Sunrise, TimeMode.Sunset].includes(startTime.mode)) {
    const referenceTime =
      startTime.mode == TimeMode.Sunrise
        ? hass.states["sun.sun"].attributes["next_rising"]
        : hass.states["sun.sun"].attributes["next_setting"];

    let refTime = parseTimeString(referenceTime);
    startTime = addTimeOffset(refTime, { hours: startTime.hours, minutes: startTime.minutes });
  }

  const tsA = computeTimestamp(startTime, hass);
  const tsB = computeTimestamp(stopTime, hass);
  const offset = (tsB - tsA) / 2;

  const offsetHours = Math.floor(offset / 3600);
  const offsetMinutes = Math.round((offset - offsetHours * 3600) / 60);

  let newStop = addTimeOffset(startTime, { hours: offsetHours, minutes: offsetMinutes });
  newStop = roundTime(newStop, 15);

  slots = [
    ...slots.slice(0, slotIdx),
    { ...slots[slotIdx], stop: timeToString(newStop) },
    {
      ...slots[slotIdx],
      start: timeToString(newStop),
      stop: timeToString(stopTime),
      actions: [],
    },
    ...slots.slice(slotIdx + 1),
  ];

  schedule = {
    ...schedule,
    entries: Object.assign(schedule.entries, {
      [entry]: { ...schedule.entries[entry], slots: slots },
    }),
  };
  return schedule;
};
