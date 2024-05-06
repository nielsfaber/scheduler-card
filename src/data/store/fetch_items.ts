import { HomeAssistant } from "../../lib/types";
import { Schedule } from "../../types";
import { LegacySchedule, convertLegacySchedule } from "./convert_legacy_schedule";

export const fetchItems = (hass: HomeAssistant): Promise<Record<string, Schedule & { entity_id: string }>> =>
  hass.callWS({
    type: 'scheduler',
  })
    .then(res => {
      return Object.fromEntries(
        (res as LegacySchedule[]).map(el => [el.schedule_id!, convertLegacySchedule(el)])
      )
    })
