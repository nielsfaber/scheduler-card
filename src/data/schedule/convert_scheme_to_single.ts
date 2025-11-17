import { Schedule, Timeslot } from "../../types";
import { addTimeOffset } from "../time/add_time_offset";
import { parseTimeString } from "../time/parse_time_string";
import { timeToString } from "../time/time_to_string";

export const convertSchemeToSingle = (schedule: Schedule) => {
  const convertSlots = (slots: Timeslot[]) => {
    let idx = slots.findIndex((e) => e.actions.length);
    if (idx < 0) idx = Math.floor(slots.length / 2);

    let currSlot = { ...slots[idx], stop: undefined };
    const conditions = currSlot.conditions;
    const startTime = currSlot.start;
    const stopTime = timeToString(addTimeOffset(parseTimeString(startTime), { minutes: 1 }));

    slots = [
      <Timeslot>{ start: "00:00:00", stop: startTime, actions: [], conditions: conditions },
      currSlot,
      <Timeslot>{ start: stopTime, stop: "00:00:00", actions: [], conditions: conditions },
    ];
    return slots;
  };

  schedule = {
    ...schedule,
    entries: schedule.entries.map((e) => Object({ ...e, slots: convertSlots(e.slots) })),
  };
  return schedule;
};
