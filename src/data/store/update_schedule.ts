import { HomeAssistant } from "../../lib/types";
import { Schedule } from "../../types";

export const updateSchedule = (hass: HomeAssistant, config: Schedule & { schedule_id: string }): Promise<boolean> => {
  return hass.callApi('POST', 'scheduler/edit', config);
};