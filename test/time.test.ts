import { describe, expect, it } from 'vitest';
import { addTimeOffset } from '../src/data/time/add_time_offset';
import { parseTimeString } from '../src/data/time/parse_time_string';
import { roundTime } from '../src/data/time/round_time';
import { timeToString } from '../src/data/time/time_to_string';
import { TimeMode } from '../src/types';

describe('parseTimeString', () => {
  it('parses fixed times', () => {
    expect(parseTimeString('08:05:00')).toEqual({ mode: TimeMode.Fixed, hours: 8, minutes: 5 });
  });

  it('parses sun times with a negative offset', () => {
    expect(parseTimeString('sunrise-00:30')).toEqual({ mode: TimeMode.Sunrise, hours: 0, minutes: -30 });
    expect(parseTimeString('sunrise-01:30:00')).toEqual({ mode: TimeMode.Sunrise, hours: -1, minutes: -30 });
  });

  it('parses sun times with a positive offset', () => {
    expect(parseTimeString('sunset+01:15')).toEqual({ mode: TimeMode.Sunset, hours: 1, minutes: 15 });
  });

  it('rounds seconds to the nearest minute', () => {
    expect(parseTimeString('08:05:40')).toEqual({ mode: TimeMode.Fixed, hours: 8, minutes: 6 });
  });
});

describe('timeToString', () => {
  it.each(['00:00:00', '08:05:00', '23:59:00', 'sunrise-00:30:00', 'sunrise-01:30:00', 'sunset+01:15:00'])(
    'round-trips %s through parseTimeString',
    (input) => {
      expect(timeToString(parseTimeString(input))).toBe(input);
    }
  );

  it('omits seconds when asked', () => {
    expect(timeToString(parseTimeString('08:05'), { seconds: false })).toBe('08:05');
  });

  it('formats 12-hour times', () => {
    expect(timeToString(parseTimeString('00:15'), { am_pm: true, seconds: true })).toBe('12:15:00 am');
    expect(timeToString(parseTimeString('13:45'), { am_pm: true, seconds: false })).toBe('01:45 pm');
  });

  it('wraps 24:00 to 00:00', () => {
    expect(timeToString({ mode: TimeMode.Fixed, hours: 24, minutes: 0 })).toBe('00:00:00');
  });
});

describe('addTimeOffset', () => {
  it('wraps fixed times around midnight', () => {
    expect(addTimeOffset(parseTimeString('23:30'), { minutes: 45 })).toEqual(parseTimeString('00:15'));
    expect(addTimeOffset(parseTimeString('00:10'), { minutes: -20 })).toEqual(parseTimeString('23:50'));
  });

  it('moves sun offsets across zero', () => {
    expect(timeToString(addTimeOffset(parseTimeString('sunrise-00:30'), { hours: 1 }))).toBe('sunrise+00:30:00');
    expect(timeToString(addTimeOffset(parseTimeString('sunset+00:10'), { minutes: -20 }))).toBe('sunset-00:10:00');
  });
});

describe('roundTime', () => {
  it('rounds to the step size', () => {
    expect(roundTime({ hours: 7, minutes: 52 }, 15)).toEqual({ hours: 7, minutes: 45 });
    expect(roundTime({ hours: 7, minutes: 53 }, 15)).toEqual({ hours: 8, minutes: 0 });
  });
});
