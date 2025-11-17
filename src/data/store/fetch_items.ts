import { HomeAssistant } from "../../lib/types";
import { Schedule, ScheduleStorageEntry } from "../../types";
import { LegacySchedule, convertLegacySchedule } from "./convert_legacy_schedule";

export const fetchItems = (hass: HomeAssistant): Promise<ScheduleStorageEntry[]> =>
  hass
    .callWS({
      type: "scheduler",
    })
    .then((res) => {
      return (res as LegacySchedule[]).map(convertLegacySchedule);
    });
