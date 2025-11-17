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
      const converted: ScheduleStorageEntry[] = [];
      
      (res as LegacySchedule[]).forEach((item, index) => {
        console.log(`[DEBUG] fetchItems: Converting item ${index}:`, item);
        try {
          const result = convertLegacySchedule(item);
          console.log(`[DEBUG] fetchItems: Item ${index} converted successfully`);
          converted.push(result);
        } catch (error) {
          console.warn(`[DEBUG] fetchItems: Skipping invalid item ${index}:`, error);
          console.warn(`[DEBUG] fetchItems: Invalid item details:`, JSON.stringify(item, null, 2));
          // Continue processing other items instead of throwing
        }
      });
      
      console.log("[DEBUG] fetchItems: Converted", converted.length, "valid schedules out of", (res as LegacySchedule[]).length, "total items");
      return converted;
    })
    .catch((error) => {
      console.error("[DEBUG] fetchItems: WebSocket call failed:", error);
      throw error;
    });
};
