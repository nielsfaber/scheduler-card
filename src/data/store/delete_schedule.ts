import { HomeAssistant } from "../../lib/types";

export const deleteSchedule = (hass: HomeAssistant, schedule_id: string): Promise<boolean> => {
  return hass.callApi("POST", "scheduler/remove", { schedule_id: schedule_id });
};
