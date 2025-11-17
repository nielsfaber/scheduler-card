import { HomeAssistant } from '../../lib/types';
import { Schedule, ScheduleStorageEntry } from '../../types';
import { LegacySchedule, convertLegacySchedule } from './convert_legacy_schedule';

export const fetchItems = (hass: HomeAssistant): Promise<ScheduleStorageEntry[]> => {
  console.log("[DEBUG] fetchItems: Calling hass.callWS with type 'scheduler'");
  return hass
    .callWS({
      type: 'scheduler',
    })
    .then((res) => {
      console.log("[DEBUG] fetchItems: WebSocket response received:", res);
      const converted = (res as LegacySchedule[]).map(convertLegacySchedule);
      console.log("[DEBUG] fetchItems: Converted", converted.length, "schedules");
      return converted;
    })
    .catch((error) => {
      console.error("[DEBUG] fetchItems: WebSocket call failed:", error);
      throw error;
    });
};
