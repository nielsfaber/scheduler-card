import { Time, TimeMode } from "../../types";
import { parseTimeString } from "./parse_time_string";
import { addTimeOffset } from "./add_time_offset";
import { HomeAssistant } from "../../lib/types";

export const computeTimestamp = (time: Time | string, hass: HomeAssistant) => {
  if (typeof time == "string") {
    time = parseTimeString(time);
  }

  if (time.mode == TimeMode.Fixed) {
    return time.hours * 3600 + time.minutes * 60;
  } else if (time.mode == TimeMode.Sunrise) {
    const ts_reference = parseTimeString(hass.states["sun.sun"].attributes["next_rising"]);
    const ts = addTimeOffset(ts_reference, time);
    return ts.hours * 3600 + ts.minutes * 60;
  } else {
    const ts_reference = parseTimeString(hass.states["sun.sun"].attributes["next_setting"]);
    const ts = addTimeOffset(ts_reference, time);
    return ts.hours * 3600 + ts.minutes * 60;
  }
};
