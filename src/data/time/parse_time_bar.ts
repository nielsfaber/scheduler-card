import { HomeAssistant } from "../../lib/types";
import { Schedule, ScheduleEntry, TimeMode, Timeslot } from "../../types";
import { addTimeOffset } from "./add_time_offset";
import { computeTimestamp } from "./compute_timestamp";
import { parseTimeString } from "./parse_time_string";
import { timeToString } from "./time_to_string";

export const parseTimeBar = (schedule: Schedule, hass: HomeAssistant): Schedule => {
  const processSlots = (slots: Timeslot[]): Timeslot[] => {
    //correct timeslots which are outside of 00:00:00 - 23:59:00 window
    slots = slots.map(
      (e): Timeslot => ({
        ...e,
        start: computeTimestamp(e.start, hass) < 0 ? "00:00:00" : e.start,
        stop: e.stop ? (computeTimestamp(e.stop, hass) > 3600 * 24 ? "00:00:00" : e.stop) : undefined,
      })
    );

    slots = slots.map((slot) => {
      //correct timeslots who have their start and stop point flipped
      if (slot.stop && computeTimestamp(slot.start, hass) > computeTimestamp(slot.stop, hass)) {
        if (computeTimestamp(slot.stop, hass) == 0)
          //if stop time is 00:00:00, this should be mapped as the end of the day
          return {
            ...slot,
            stop: timeToString(addTimeOffset(parseTimeString(slot.stop), { hours: 24 })),
          };
        //correct timeslots who have their start and stop point flipped
        else slot = { ...slot, start: slot.stop, stop: slot.start };
      }
      //correct timeslots which have a duration shorter than 1 minute
      if (slot.stop && computeTimestamp(slot.stop, hass) - computeTimestamp(slot.start, hass) < 60) {
        slot = { ...slot, stop: timeToString(addTimeOffset(parseTimeString(slot.start), { minutes: 1 })) };
      }
      return slot;
    });

    slots.sort((a, b) => {
      if (computeTimestamp(a.start, hass) > computeTimestamp(b.start, hass)) return 1;
      else if (computeTimestamp(a.start, hass) < computeTimestamp(b.start, hass)) return -1;
      else return computeTimestamp(a.stop || a.start, hass) > computeTimestamp(b.stop || b.start, hass) ? 1 : -1;
    });

    let startTime = "00:00:00";
    let len = slots.length;

    //insert empty timeslots where needed
    for (let i = 0; i < len; i++) {
      const slot = slots[i];
      if (computeTimestamp(slot.start, hass) > computeTimestamp(startTime, hass)) {
        slots.splice(
          i,
          0,
          Object.assign({ ...slot }, <Timeslot>{
            start: startTime,
            stop: slot.start,
            actions: [],
            conditions: slot.conditions,
          })
        );
        len++;
        i++;
      } else if (computeTimestamp(slot.start, hass) < computeTimestamp(startTime, hass)) {
        //move timeslot if it is overlapping with previous
        slots = Object.assign(slots, { [i]: { ...slot, start: startTime } });
      }
      startTime = slot.stop || slot.start;
    }
    const endOfDay = 24 * 3600;

    //insert empty timeslots at the end when needed
    if (computeTimestamp(startTime, hass) < endOfDay && computeTimestamp(startTime, hass) > 0) {
      slots.push(<Timeslot>{
        start: startTime,
        stop: timeToString({ mode: TimeMode.Fixed, hours: 24, minutes: 0 }),
        actions: [],
        conditions: slots[0].conditions,
      });
    }

    return slots;
  };

  schedule = {
    ...schedule,
    entries: schedule.entries.map((entry): ScheduleEntry => ({ ...entry, slots: processSlots(entry.slots) })),
  };

  return schedule;
};
