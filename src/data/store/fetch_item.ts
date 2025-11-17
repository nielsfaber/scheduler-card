import { HomeAssistant } from "../../lib/types";
import { ScheduleStorageEntry } from "../../types";
import { LegacySchedule, convertLegacySchedule } from "./convert_legacy_schedule";

export const fetchScheduleItem = (hass: HomeAssistant, schedule_id: string): Promise<ScheduleStorageEntry> =>
  hass
    .callWS({
      type: "scheduler/item",
      schedule_id: schedule_id,
    })
    .then((res) => {
      return convertLegacySchedule(res as LegacySchedule);
    });
