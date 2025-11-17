import { Schedule } from "../../types";

export const removeTimeslot = (schedule: Schedule, entry: number, slotIdx: number): Schedule => {
  let slots = [...schedule.entries[entry].slots];

  const cutIndex = slotIdx == slots.length - 1 ? slotIdx - 1 : slotIdx;

  slots = [
    ...slots.slice(0, cutIndex),
    {
      ...slots[cutIndex! + 1],
      start: slots[cutIndex!].start,
      stop: slots[cutIndex! + 1].stop!,
    },
    ...slots.slice(cutIndex + 2),
  ];

  schedule = {
    ...schedule,
    entries: Object.assign(schedule.entries, {
      [entry]: { ...schedule.entries[entry], slots: slots },
    }),
  };
  return schedule;
};
