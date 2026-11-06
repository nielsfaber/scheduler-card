import { describe, expect, it } from 'vitest';
import { convertSchemeToSingle } from '../src/data/schedule/convert_scheme_to_single';
import { removeTimeslot } from '../src/data/schedule/remove_timeslot';
import { Action, Schedule, TConditionLogicType, Timeslot, TRepeatType, TWeekday } from '../src/types';

const turnOn: Action = { service: 'light.turn_on', service_data: {}, target: { entity_id: 'light.bed_light' } };
const conditions = { type: TConditionLogicType.Or, items: [], track_changes: false };

const slot = (start: string, stop: string | undefined, actions: Action[] = []): Timeslot => ({
  start,
  stop,
  actions,
  conditions,
});

const schedule = (slots: Timeslot[]): Schedule => ({
  entries: [{ slots, weekdays: [TWeekday.Daily] }],
  next_entries: [],
  timestamps: [],
  repeat_type: TRepeatType.Repeat,
  enabled: true,
});

const times = (s: Schedule) => s.entries[0].slots.map((e) => [e.start, e.stop]);

describe('removeTimeslot', () => {
  const slots = () => [
    slot('00:00:00', '08:00:00'),
    slot('08:00:00', '12:00:00', [turnOn]),
    slot('12:00:00', '00:00:00'),
  ];

  it('merges a slot into the next one', () => {
    const result = removeTimeslot(schedule(slots()), 0, 1);
    expect(times(result)).toEqual([
      ['00:00:00', '08:00:00'],
      ['08:00:00', '00:00:00'],
    ]);
    expect(result.entries[0].slots[1].actions).toEqual([]);
  });

  it('merges the last slot into the previous one', () => {
    const result = removeTimeslot(schedule(slots()), 0, 2);
    expect(times(result)).toEqual([
      ['00:00:00', '08:00:00'],
      ['08:00:00', '00:00:00'],
    ]);
  });
});

describe('convertSchemeToSingle', () => {
  it('keeps the first slot with actions as a one-minute timeslot', () => {
    const result = convertSchemeToSingle(
      schedule([slot('00:00:00', '07:00:00'), slot('07:00:00', '09:00:00', [turnOn]), slot('09:00:00', '00:00:00')])
    );
    expect(times(result)).toEqual([
      ['00:00:00', '07:00:00'],
      ['07:00:00', undefined],
      ['07:01:00', '00:00:00'],
    ]);
    expect(result.entries[0].slots[1].actions).toEqual([turnOn]);
  });
});
