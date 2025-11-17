import { DEFAULT_PRIMARY_INFO_DISPLAY } from "../../const";
import { sortByName } from "../../lib/sort";
import { HomeAssistant } from "../../lib/types";
import { CardConfig, CustomConfig, DisplayItem, Schedule, ScheduleStorageEntry } from "../../types";
import { computeScheduleDisplay } from "../format/compute_schedule_display";

const sortByRelativeTime = (
  scheduleA: Schedule & { entity_id: string },
  scheduleB: Schedule & { entity_id: string }
) => {
  const remainingA = new Date(scheduleA.timestamps[scheduleA.next_entries[0]]).valueOf();
  const remainingB = new Date(scheduleB.timestamps[scheduleB.next_entries[0]]).valueOf();
  const now = new Date().valueOf();

  const reverse = remainingA < now && remainingB < now;

  if (remainingA !== null && remainingB !== null) {
    if (remainingA < now && remainingB >= now) return 1;
    else if (remainingA >= now && remainingB < now) return -1;
    else if (remainingA > remainingB) return reverse ? -1 : 1;
    else if (remainingA < remainingB) return reverse ? 1 : -1;
    else return scheduleA.entity_id < scheduleB.entity_id ? 1 : -1;
  } else if (remainingB !== null) return 1;
  else if (remainingA !== null) return -1;
  else return scheduleA.entity_id < scheduleB.entity_id ? 1 : -1;
};

const sortByTitle = (
  scheduleA: Schedule,
  scheduleB: Schedule,
  displayFormat: (DisplayItem | string)[] | DisplayItem | string,
  hass: HomeAssistant,
  customize?: CustomConfig
) => {
  try {
    const titleA = computeScheduleDisplay(scheduleA, displayFormat, hass, customize).join();
    const titleB = computeScheduleDisplay(scheduleB, displayFormat, hass, customize).join();
    return sortByName(titleA, titleB);
  } catch (e) {
    return 0;
  }
};

const sortByState = (
  scheduleA: Schedule & { entity_id: string },
  scheduleB: Schedule & { entity_id: string },
  hass: HomeAssistant,
  expiredSchedulesLast: boolean
) => {
  const stateA = hass.states[scheduleA.entity_id]?.state;
  const stateB = hass.states[scheduleB.entity_id]?.state;

  const scheduleA_active = ["on", "triggered"].includes(stateA);
  const scheduleB_active = ["on", "triggered"].includes(stateB);

  if (scheduleA_active && !scheduleB_active) return -1;
  else if (!scheduleA_active && scheduleB_active) return 1;

  if (expiredSchedulesLast) {
    if (stateA != "off" && stateB == "off") return 1;
    else if (stateA == "off" && stateB != "off") return -1;
  }

  return 0;
};

export const sortSchedules = (schedules: ScheduleStorageEntry[], config: CardConfig, hass: HomeAssistant) => {
  const sortingOptions = [config.sort_by].flat();

  if (sortingOptions.includes("relative-time")) {
    schedules = schedules.sort(sortByRelativeTime);
  }

  if (sortingOptions.includes("title")) {
    schedules = schedules.sort((a, b) =>
      sortByTitle(a, b, config.display_options?.primary_info || DEFAULT_PRIMARY_INFO_DISPLAY, hass, config.customize)
    );
  }

  if (sortingOptions.includes("state")) {
    schedules = schedules.sort((a, b) => sortByState(a, b, hass, sortingOptions.includes("relative-time")));
  }

  return schedules;
};
