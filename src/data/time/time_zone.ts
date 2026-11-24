import { HomeAssistant, TimeZone } from '../../lib/types';

// Time zone for displaying dates, following the time zone setting in the user profile
// (same logic as the Home Assistant frontend). Returns undefined for the browser time zone.
export const resolveTimeZone = (hass: HomeAssistant): string | undefined =>
  hass.locale?.time_zone === TimeZone.server && hass.config?.time_zone ? hass.config.time_zone : undefined;

// Calendar date and time of day of a date object in the given time zone
export const getDateParts = (dateObj: Date, timeZone?: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(dateObj);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((e) => e.type == type)!.value);

  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hours: value('hour'),
    minutes: value('minute'),
  };
};
