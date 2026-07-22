import { HomeAssistant } from "../../lib/types";
import { Timeslot, Time, TimeMode } from "../../types";
import { computeTimestamp } from "../time/compute_timestamp";
import { timeToString } from "../time/time_to_string";

const SEC_PER_DAY = 24 * 3600;

const tsToString = (ts: number) => {
  const hours = Math.floor(ts / 3600);
  const minutes = Math.round((ts - hours * 3600) / 60);
  const time: Time = { mode: TimeMode.Fixed, hours: hours, minutes: minutes };
  return timeToString(time);
};

/**
 * Carve a new (empty) timeslot spanning [ts0, ts1] out of an existing slot
 * sequence: overlapped slots are truncated to make room, fully covered slots
 * are removed. Returns the new slot list and the index of the carved slot.
 */
export const carveTimeslot = (slots: Timeslot[], ts0: number, ts1: number, hass: HomeAssistant): [Timeslot[], number] => {
  const ranges = slots.map((slot, i) => {
    const start = computeTimestamp(slot.start, hass);
    let stop: number;
    if (slot.stop !== undefined) {
      stop = computeTimestamp(slot.stop, hass);
      if (!stop && start) stop = SEC_PER_DAY;
    } else {
      // Slot without a stop time spans up to the next slot's start
      stop = i + 1 < slots.length
        ? (computeTimestamp(slots[i + 1].start, hass) || SEC_PER_DAY)
        : SEC_PER_DAY;
    }
    return { start, stop };
  });

  // The carved slot inherits its conditions from the first slot it overlaps.
  const donor = slots.find((_, i) => ranges[i].stop > ts0 && ranges[i].start < ts1) || slots[0];

  let out: Timeslot[] = [];
  let insertedIdx = -1;

  slots.forEach((slot, i) => {
    const r = ranges[i];
    // Fully before the carve: keep untouched
    if (r.stop <= ts0) {
      out.push(slot);
      return;
    }
    if (insertedIdx === -1) {
      // First slot that ends past ts0: keep its left remainder (if any),
      // then insert the new slot.
      if (r.start < ts0) out.push({ ...slot, stop: tsToString(ts0) });
      insertedIdx = out.length;
      out.push({
        start: tsToString(ts0),
        stop: tsToString(ts1),
        actions: [],
        conditions: donor.conditions,
      });
    }
    // Fully after the carve: keep untouched
    if (r.start >= ts1) {
      out.push(slot);
      return;
    }
    // Extends past the carve: keep its right remainder.
    // (Fully covered slots reach neither branch and are dropped.)
    if (r.stop > ts1) out.push({ ...slot, start: tsToString(ts1) });
  });

  if (insertedIdx === -1) {
    insertedIdx = out.length;
    out.push({
      start: tsToString(ts0),
      stop: tsToString(ts1),
      actions: [],
      conditions: donor.conditions,
    });
  }

  return [out, insertedIdx];
};
