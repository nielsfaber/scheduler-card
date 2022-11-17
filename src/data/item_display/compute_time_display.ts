import { HomeAssistant, TimeFormat } from 'custom-card-helpers';
import { getLocale } from '../../helpers';
import { localize } from '../../localize/localize';
import { ETimeEvent, Timeslot } from '../../types';
import { formatTime } from '../date-time/format_time';
import { stringToDate } from '../date-time/string_to_date';
import { parseRelativeTime, stringToTime } from '../date-time/time';

export const computeTimeDisplay = (entry: Timeslot, hass: HomeAssistant) => {
  const computeRelativeTimeString = (timeString: string) => {
    const res = parseRelativeTime(timeString);
    if (!res) return timeString;

    const eventString =
      res.event == ETimeEvent.Sunrise
        ? getLocale(hass).language == 'de'
          ? hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise')
          : hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').toLowerCase()
        : getLocale(hass).language == 'de'
        ? hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset')
        : hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset').toLowerCase();
    if (Math.abs(stringToTime(res.offset, hass)) < 5 * 60)
      return localize('ui.components.time.at_sun_event', getLocale(hass), '{sunEvent}', eventString);

    const signString =
      res.sign == '-'
        ? hass
            .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
            .replace(/[^a-z]/gi, '')
            .toLowerCase()
        : hass
            .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
            .replace(/[^a-z]/gi, '')
            .toLowerCase();

    const timeStr = formatTime(stringToDate(res.offset), getLocale(hass), TimeFormat.twenty_four);

    return `${timeStr} ${signString} ${eventString}`;
  };

  if (!entry.stop) {
    const timeString = entry.start;
    if (parseRelativeTime(timeString)) return computeRelativeTimeString(timeString);
    else {
      const time = stringToDate(timeString);
      return localize('ui.components.time.absolute', getLocale(hass), '{time}', formatTime(time, getLocale(hass)));
    }
  } else {
    const start = parseRelativeTime(entry.start)
      ? computeRelativeTimeString(entry.start)
      : formatTime(stringToDate(entry.start), getLocale(hass));
    const end = parseRelativeTime(entry.stop)
      ? computeRelativeTimeString(entry.stop)
      : formatTime(stringToDate(entry.stop), getLocale(hass));
    return localize('ui.components.time.interval', getLocale(hass), ['{startTime}', '{endTime}'], [start, end]);
  }
};
