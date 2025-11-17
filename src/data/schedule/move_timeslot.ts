import { isDefined } from "../../lib/is_defined";
import { HomeAssistant } from "../../lib/types";
import { Time, TimeMode, Timeslot } from "../../types";
import { addTimeOffset } from "../time/add_time_offset";
import { computeTimestamp } from "../time/compute_timestamp";
import { parseTimeString } from "../time/parse_time_string";
import { timeToString } from "../time/time_to_string";

const computeDuration = (timeA: Time | string, timeB: Time | string, hass: HomeAssistant) => {
  let tsA = typeof timeA == "string" ? computeTimestamp(parseTimeString(timeA), hass) : computeTimestamp(timeA, hass);

  let tsB = typeof timeB == "string" ? computeTimestamp(parseTimeString(timeB), hass) : computeTimestamp(timeB, hass);

  if (tsB > tsA) return 1;
  else if (tsB < tsA) return -1;
  else return 0;
};

const startTime = (s: Timeslot) => parseTimeString(s.start);
const stopTime = (s: Timeslot) => {
  if (isDefined(s.stop)) {
    const time = parseTimeString(s.stop!);
    if (time.hours == 0 && time.minutes == 0 && time.mode == TimeMode.Fixed) return { ...time, hours: 24 };
    return time;
  } else {
    return addTimeOffset(startTime(s), { minutes: 1 });
  }
};

export const moveTimeslot = (
  slots: Timeslot[],
  slotIdx: number,
  update: { start?: Time; stop?: Time },
  hass: HomeAssistant
): [Timeslot[], number] => {
  let slotIdxOut = slotIdx;

  if (update.stop) {
    [slots, slotIdxOut] = moveTimeslot(slots, slotIdx + 1, { start: update.stop }, hass);
    return [slots, slotIdxOut - 1];
  }

  if (update.start) {
    let oldTime = startTime(slots[slotIdx]);
    let newTime = update.start;

    if (computeDuration(oldTime, newTime, hass) < 0) {
      //time is moved backwards
      let timeLimit = startTime(slots[slotIdx]);
      for (let i = slotIdx - 1; i >= 0; i--) {
        //walk through all slots prior to modified one
        if (slots[i].actions.length) {
          timeLimit = i == slotIdx - 1 ? addTimeOffset(startTime(slots[i]), { minutes: 1 }) : stopTime(slots[i]);
          break;
        }
        timeLimit = startTime(slots[i]);
      }
      if (computeDuration(timeLimit, newTime, hass) < 0) {
        newTime = timeLimit; //cap time to the limit (user entered an illegal value)
      }

      slots = Object.assign(slots, { [slotIdx]: <Timeslot>{ ...slots[slotIdx], start: timeToString(newTime) } });
      for (let i = slotIdx - 1; i >= 0; i--) {
        //walk through all slots prior to modified one
        let d1 = computeDuration(startTime(slots[i]), newTime, hass);
        let d2 = computeDuration(stopTime(slots[i]), newTime, hass);

        if (d1 > 0 && d2 < 0) {
          //timeslot has partial overlap with the new time point, it should be shortened.
          slots = Object.assign(slots, { [i]: <Timeslot>{ ...slots[i], stop: timeToString(newTime) } });
          break;
        } else if (d2 >= 0) {
          //timeslot slot ends before the new time point, stop iterating
          break;
        } else if (d1 <= 0) {
          //new time point causes timeslot to be fully overlapped, erase it
          slots = Object.assign(slots, { [i]: null });
          slotIdxOut = slotIdxOut - 1;
        }
      }

      if (!isDefined(slots[slotIdx].stop)) {
        //slot has no stop time, so moving the start point to the left requires the next slot to be made longer
        if (isDefined(slots[slotIdx + 1].stop) && !slots[slotIdx + 1].actions.length) {
          //stretch next slot
          slots = Object.assign(slots, {
            [slotIdx + 1]: <Timeslot>{ ...slots[slotIdx + 1], start: timeToString(stopTime(slots[slotIdx])) },
          });
        } else {
          //insert new filler behind
          slots = [
            ...slots.slice(0, slotIdx + 1),
            <Timeslot>{
              ...slots[slotIdx],
              start: timeToString(stopTime(slots[slotIdx])),
              stop: timeToString(startTime(slots[slotIdx + 1])),
              actions: [],
            },
            ...slots.slice(slotIdx + 1),
          ];
        }
      }
    } else if (computeDuration(oldTime, newTime, hass) > 0) {
      //time is moved forward
      let timeLimit = addTimeOffset(stopTime(slots[slotIdx]), { minutes: -1 });
      if (!isDefined(slots[slotIdx].stop)) {
        for (let i = slotIdx + 1; i < slots.length; i++) {
          //walk through all slots after the modified one
          if (slots[i].actions.length) {
            timeLimit = i == slotIdx + 1 ? addTimeOffset(stopTime(slots[i]), { minutes: -1 }) : startTime(slots[i]);
            break;
          }
          timeLimit = stopTime(slots[i]);
        }
      }
      if (computeDuration(timeLimit, newTime, hass) > 0 && computeTimestamp(timeLimit, hass) > 0) {
        newTime = timeLimit; //cap time to the limit (user entered an illegal value)
      }
      slots = Object.assign(slots, { [slotIdx]: <Timeslot>{ ...slots[slotIdx], start: timeToString(newTime) } });

      if (slotIdx > 0 && isDefined(slots[slotIdx - 1].stop)) {
        //stretch previous slot
        slots = Object.assign(slots, {
          [slotIdx - 1]: <Timeslot>{ ...slots[slotIdx - 1], stop: timeToString(newTime) },
        });
      } else {
        //insert new filler before
        slots = [
          ...slots.slice(0, slotIdx),
          <Timeslot>{
            ...slots[slotIdx],
            start: slotIdx > 0 ? timeToString(stopTime(slots[slotIdx - 1])) : "00:00:00",
            stop: timeToString(newTime),
            actions: [],
          },
          ...slots.slice(slotIdx),
        ];
        slotIdxOut = slotIdx + 1;
      }

      for (let i = slotIdxOut + 1; i < slots.length; i++) {
        //walk through all slots after the modified one
        let newStopTime = stopTime(slots[slotIdxOut]);
        let d1 = computeDuration(startTime(slots[i]), newStopTime, hass);
        let d2 = computeDuration(stopTime(slots[i]), newStopTime, hass);

        if (d1 > 0 && d2 < 0) {
          //timeslot has partial overlap with the new time point, it should be shortened.
          slots = Object.assign(slots, { [i]: <Timeslot>{ ...slots[i], start: timeToString(newStopTime) } });
        } else if (d1 < 0) {
          //timeslot slot ends before the new time point, stop iterating
          break;
        } else if (d2 >= 0) {
          //new time point causes timeslot to be fully overlapped, erase it
          slots = Object.assign(slots, { [i]: null });
        }
      }
    }
  }

  slots = slots.filter(isDefined); //remove null slots if created during loop
  return [slots, slotIdxOut];
};
