import { HomeAssistant } from "../../lib/types";
import { Schedule } from "../../types";
import { exportSchedule } from "./save_schedule";

export const updateSchedule = (hass: HomeAssistant, schedule: Schedule & { schedule_id: string }): Promise<boolean> => {
  const config = exportSchedule(schedule);
  return hass.callApi("POST", "scheduler/edit", config);
};
