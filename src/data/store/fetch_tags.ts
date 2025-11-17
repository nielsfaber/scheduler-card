import { HomeAssistant } from "../../lib/types";

export interface TagEntry {
  name: string;
  schedules: string[];
}

export const fetchTags = (hass: HomeAssistant): Promise<TagEntry[]> =>
  hass.callWS({
    type: "scheduler/tags",
  });
