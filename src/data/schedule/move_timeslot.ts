import { isDefined } from "../../lib/is_defined";
import { HomeAssistant } from "../../lib/types";
import { Time, Timeslot } from "../../types";
import { addTimeOffset } from "../time/add_time_offset";
import { computeTimestamp } from "../time/compute_timestamp";
import { parseTimeString } from "../time/parse_time_string";
import { timeToString } from "../time/time_to_string";

const computeDuration = (timeA: Time | string, timeB: Time | string, hass: HomeAssistant) => {
  let tsA = typeof timeA == 'string'
    ? computeTimestamp(parseTimeString(timeA), hass)
    : computeTimestamp(timeA, hass);

  let tsB = typeof timeB == 'string'
    ? computeTimestamp(parseTimeString(timeB), hass)
    : computeTimestamp(timeB, hass);

  if (tsB > tsA) return 1;
  else if (tsB < tsA) return -1;
  else return 0;
}

const startTime = (s: Timeslot) => parseTimeString(s.start);
const stopTime = (s: Timeslot) => isDefined(s.stop) ? parseTimeString(s.stop!) : addTimeOffset(startTime(s), { minutes: 1 });


export const moveTimeslot = (slots: Timeslot[], slotIdx: number, update: { start?: Time, stop?: Time }, hass: HomeAssistant): [Timeslot[], number] => {
  let slotIdxOut = slotIdx;

  if (update.start) {
    const oldTime = startTime(slots[slotIdx]);
    let newStart = update.start;

    if (computeDuration(oldTime, newStart, hass) < 0) { //start time is moved back in time
      for (let i = slotIdx - 1; i >= 0; i--) { //walk through all slots prior to modified one
        let d1 = computeDuration(startTime(slots[i]), newStart, hass);
        let d2 = computeDuration(stopTime(slots[i]), newStart, hass);

        if (d2 >= 0) break; //previous slot start before new time
        else if (d1 > 0 && d2 < 0) { //new time is within a previous timeslot, limit to slot bounds if action is set, otherwise shorten empty slot
          if (!slots[i].actions.length) slots = Object.assign(slots, { [i]: <Timeslot>{ ...slots[i], stop: timeToString(newStart) } });
          else newStart = stopTime(slots[i]);
          break;
        }
        else if (d1 <= 0) { //previous slot starts after the new time
          if (!slots[i].actions.length) { //erase empty slot
            slots = Object.assign(slots, { [i]: null });
            slotIdxOut = slotIdxOut - 1;
          }
          else { //limit to slot endpoint
            newStart = stopTime(slots[i]);
            break;
          }
        }
      }
    } else if (computeDuration(oldTime, update.start, hass) > 0) {
      //moving ahead in time
      if (isDefined(slots[slotIdx].stop)) { // cap start time to the endpoint of the current slot if it is exceeding
        let stop = slotIdx < (slots.length - 1) ? stopTime(slots[slotIdx]) : parseTimeString('24:00');
        let d1 = computeDuration(stop, newStart, hass);
        if (d1 >= 0) newStart = addTimeOffset(stopTime(slots[slotIdx]), { minutes: -1 });
      }
      else {
        for (let i = (slotIdx + 1); i < slots.length; i++) { //walk through all slots after the modified one
          let newStop = addTimeOffset(newStart, { minutes: 1 });
          let d1 = computeDuration(startTime(slots[i]), newStop, hass);
          let d2 = computeDuration(stopTime(slots[i]), newStop, hass);
          if (d1 <= 0) break; // no overlap
          else if (d1 > 0 && d2 >= 0) { // adjacent slot fully overlapping, erase if empty, otherwise limit the movement
            if (!slots[i].actions.length) slots = Object.assign(slots, { [i]: null });
            else newStart = addTimeOffset(startTime(slots[i]), { minutes: -1 });
          }
          else if (d1 > 0 && d2 < 0) { // partial overlap, move start point of adjacent slot if empty, else limit the movement
            if (!slots[i].actions.length) slots = Object.assign(slots, { [i]: <Timeslot>{ ...slots[i], start: timeToString(newStop) } });
            else newStart = addTimeOffset(startTime(slots[i]), { minutes: -1 });
          }
        }
        slots = slots.filter(isDefined); //remove null slots if created during loop
      }

      if (slotIdx > 0) {
        if (isDefined(slots[slotIdx - 1].stop)) {  //adjust stop time of previous slot to new start time
          slots = Object.assign(slots, { [slotIdx - 1]: <Timeslot>{ ...slots[slotIdx - 1], stop: timeToString(newStart) } });
        }
        else { //insert an empty slot to fill gap
          let start = timeToString(stopTime(slots[slotIdx - 1]));
          let stop = timeToString(newStart);
          slots = [
            ...slots.slice(0, slotIdx),
            <Timeslot>{ ...slots[slotIdx], start: start, stop: stop, actions: [] },
            ...slots.slice(slotIdx),
          ];
          slotIdx = slotIdx + 1;
          slotIdxOut = slotIdx;
        }
      }
    }
    slots = Object.assign(slots, { [slotIdx]: <Timeslot>{ ...slots[slotIdx], start: timeToString(newStart) } });
    slots = slots.filter(isDefined); //remove null slots
    if (slotIdx < (slots.length - 1) && !isDefined(slots[slotIdx].stop)) {
      let d1 = computeDuration(stopTime(slots[slotIdx]), startTime(slots[slotIdx + 1]), hass);
      if (d1 > 0) { // gap is created due to movement to the left
        if (!slots[slotIdx + 1].actions.length) {
          slots = Object.assign(slots, { [slotIdx + 1]: <Timeslot>{ ...slots[slotIdx + 1], start: timeToString(stopTime(slots[slotIdx])) } });
        }
        else {
          slots = [
            ...slots.slice(0, slotIdx + 1),
            <Timeslot>{ ...slots[slotIdx], start: timeToString(stopTime(slots[slotIdx])), stop: timeToString(startTime(slots[slotIdx + 1])), actions: [] },
            ...slots.slice(slotIdx + 1),
          ];
        }
      }
    }
  }
  else if (update.stop) {
    const oldTime = stopTime(slots[slotIdx]);
    let newStop = update.stop;

    if (computeDuration(oldTime, newStop, hass) > 0) {
      //stop time is moved to the right
      for (let i = (slotIdx + 1); i < slots.length; i++) { //walk through all slots after the modified one
        let d1 = computeDuration(startTime(slots[i]), newStop, hass);
        let d2 = computeDuration(stopTime(slots[i]), newStop, hass);

        if (d1 <= 0) break;
        else if (d1 > 0 && d2 >= 0) { //fully overlapping
          if (!slots[i].actions.length) { //erase empty slot
            slots = Object.assign(slots, { [i]: null });
          }
          else { //limit to slot starting point
            newStop = startTime(slots[i]);
            break;
          }
        }
        else if (d1 > 0 && d2 < 0) { // new stop time is within a next timeslot, limit to slot bounds if action is set, otherwise shorten empty slot
          if (!slots[i].actions.length) slots = Object.assign(slots, { [i]: <Timeslot>{ ...slots[i], start: timeToString(newStop) } });
          else newStop = startTime(slots[i]);
        }
      }
    }
    else { //moving back in time, cap to the start time of the current slot
      let d1 = computeDuration(startTime(slots[slotIdx]), newStop, hass);
      if (d1 <= 0) newStop = addTimeOffset(startTime(slots[slotIdx]), { minutes: 1 });
    }
    slots = slots.filter(isDefined); //remove null slots
    slots = Object.assign(slots, { [slotIdx + 1]: <Timeslot>{ ...slots[slotIdx + 1], start: timeToString(newStop) } });
    slots = Object.assign(slots, { [slotIdx]: <Timeslot>{ ...slots[slotIdx], stop: timeToString(newStop) } });
  }
  return [slots, slotIdxOut];
}