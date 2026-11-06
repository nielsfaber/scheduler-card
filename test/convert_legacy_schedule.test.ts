import { describe, expect, it } from 'vitest';
import { convertLegacySchedule, LegacySchedule } from '../src/data/store/convert_legacy_schedule';
import { TConditionLogicType, TWeekday } from '../src/types';
import fixture from './fixtures/scheduler_ws_v3.3.9.json';

const [scheme, single] = fixture as unknown as LegacySchedule[];

describe('convertLegacySchedule', () => {
  it('keeps the schedule metadata', () => {
    const result = convertLegacySchedule(scheme);
    expect(result).toMatchObject({
      schedule_id: scheme.schedule_id,
      entity_id: 'switch.schedule_fixture_scheme',
      name: 'Fixture scheme',
      tags: ['fixture'],
      enabled: true,
      repeat_type: 'repeat',
      timestamps: scheme.timestamps,
      next_entries: [1, 0],
    });
  });

  it('converts weekdays', () => {
    expect(convertLegacySchedule(scheme).entries[0].weekdays).toEqual([
      TWeekday.Monday,
      TWeekday.Tuesday,
      TWeekday.Wednesday,
    ]);
    expect(convertLegacySchedule(single).entries[0].weekdays).toEqual([TWeekday.Weekend]);
  });

  it('converts timeslots and conditions', () => {
    const [morning, evening] = convertLegacySchedule(scheme).entries[0].slots;
    expect(morning.start).toBe('sunrise-00:30');
    expect(morning.stop).toBe('08:00');
    expect(morning.conditions).toEqual({
      type: TConditionLogicType.And,
      items: [{ entity_id: 'binary_sensor.movement_backyard', attribute: 'state', value: 'on', match_type: 'is' }],
      track_changes: true,
    });
    expect(evening.conditions).toEqual({ type: TConditionLogicType.Or, items: [], track_changes: false });
  });

  it('merges actions that only differ in their target', () => {
    const [morning] = convertLegacySchedule(scheme).entries[0].slots;
    expect(morning.actions).toEqual([
      {
        service: 'light.turn_on',
        service_data: { brightness: 120 },
        target: { entity_id: ['light.bed_light', 'light.ceiling_lights'] },
      },
    ]);
  });

  it('keeps different actions apart', () => {
    const [, evening] = convertLegacySchedule(scheme).entries[0].slots;
    expect(evening.actions).toEqual([
      { service: 'light.turn_off', service_data: {}, target: { entity_id: 'light.bed_light' } },
      { service: 'climate.set_temperature', service_data: { temperature: 19 }, target: { entity_id: 'climate.hvac' } },
    ]);
  });

  it('converts single-time schedules with a period', () => {
    const result = convertLegacySchedule(single);
    expect(result).toMatchObject({ repeat_type: 'single', start_date: '2027-03-01', end_date: '2027-03-31' });
    expect(result.entries[0].slots).toHaveLength(1);
    expect(result.entries[0].slots[0].start).toBe('07:30');
  });
});
