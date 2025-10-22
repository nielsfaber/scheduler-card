import { capitalizeFirstLetter } from "../../lib/capitalize_first_letter";
import { HomeAssistant } from "../../lib/types";
import { useAmPm } from "../../lib/use_am_pm";
import { hassLocalize } from "../../localize/hassLocalize";
import { localize } from "../../localize/localize";
import { Time, TimeMode } from "../../types";
import { parseTimeString } from "../time/parse_time_string";
import { timeToString } from "../time/time_to_string";

const formatRelativeTimeString = (input: Time, hass: HomeAssistant) => {
  let eventString =
    input.mode == TimeMode.Sunrise
      ? hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.sunrise', hass)
      : hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.sunset', hass);
  if (hass.language != 'de') eventString = eventString.toLowerCase();

  const offset = input.hours * 3600 + input.minutes * 60;
  if (Math.abs(offset) <= 60)
    return localize('ui.components.time.at_sun_event', hass, '{sunEvent}', eventString);

  let signString = offset < 0
    ? hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.before', hass)
    : hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.after', hass);
  signString = signString.replace(/[^a-z]/gi, '').toLowerCase();

  let timeString = timeToString(input, { seconds: false }).split(/\+|\-/).pop();
  return `${timeString} ${signString} ${eventString}`;
};

export const computeTimeStrings = (startTime: string, stopTime: string | undefined, hass: HomeAssistant): string[] => {

  const amPmFormat = useAmPm(hass.locale);

  const formatTime = (time: string) => {
    const parsed = parseTimeString(time);
    return parsed.mode == TimeMode.Fixed
      ? timeToString(parsed, { am_pm: amPmFormat })
      : formatRelativeTimeString(parsed, hass);
  };

  const startTimeString = formatTime(startTime);

  if (stopTime) {
    const stopTimeString = formatTime(stopTime);
    return [startTimeString, stopTimeString];
  }

  return [startTimeString];
};

export const computeTimeDisplay = (startTime: string, stopTime: string | undefined, hass: HomeAssistant) => {

  const timeStrings = computeTimeStrings(startTime, stopTime, hass);

  if (stopTime) {
    return capitalizeFirstLetter(
      localize('ui.components.time.interval', hass, ['{startTime}', '{endTime}'], timeStrings)
    );
  }

  return capitalizeFirstLetter(
    localize('ui.components.time.absolute', hass, '{time}', timeStrings[0])
  );
}

