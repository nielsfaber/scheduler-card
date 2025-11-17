import { computeDomain, friendlyName } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig, DisplayItem, Schedule } from "../../types";
import { computeTimeDisplay } from "./compute_time_display";
import { formatActionDisplay } from "./format_action_display";
import { localize } from "../../localize/localize";
import { capitalizeFirstLetter } from "../../lib/capitalize_first_letter";
import { formatWeekdayDisplay } from "../days";
import { computeEntityDisplay } from "./compute_entity_display";

export const computeScheduleDisplay = (
  schedule: Schedule,
  config: (DisplayItem | string)[] | DisplayItem | string,
  hass: HomeAssistant,
  customize?: CustomConfig
): string[] => {
  const computeDisplay = (item: DisplayItem | string) => {
    switch (item) {
      case DisplayItem.Action:
        const action = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        return capitalizeFirstLetter(formatActionDisplay(action, hass, customize));
      case DisplayItem.Days:
        return capitalizeFirstLetter(formatWeekdayDisplay(schedule.entries[0].weekdays, "long", hass));
      case DisplayItem.Name:
        return capitalizeFirstLetter(schedule.name || "");
      case DisplayItem.AdditionalTasks:
        return schedule.entries[0].slots.length > 1
          ? "+" +
              localize(
                "ui.panel.overview.additional_tasks",
                hass,
                "{number}",
                String(schedule.entries[0].slots.length - 1)
              )
          : "";
      case DisplayItem.Entity:
        const nextAction = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        let entityIds = [nextAction.target?.entity_id || []].flat();
        if (!entityIds.length && ["script", "notify"].includes(computeDomain(nextAction.service)))
          entityIds = [nextAction.service];
        const entityDisplay = entityIds.map((e) => computeEntityDisplay(e, hass, customize)).join(", ");
        return capitalizeFirstLetter(entityDisplay);
      case DisplayItem.RelativeTime:
        return "<relative-time></relative-time>";
      case DisplayItem.Tags:
        return schedule.tags?.map((e) => `<tag>${e}</tag>`).join("");
      case DisplayItem.Time:
        const slot = schedule.entries[0].slots[schedule.next_entries[0] || 0];
        return capitalizeFirstLetter(computeTimeDisplay(slot.start, slot.stop, hass));
      case DisplayItem.Default:
        const nameDisplay = computeDisplay(DisplayItem.Name);
        return nameDisplay
          ? nameDisplay
          : `${computeDisplay(DisplayItem.Entity)}: ${computeDisplay(DisplayItem.Action)}`;
      default:
        const regex = /\{([^\}]+)\}/;
        let res;
        while ((res = regex.exec(item))) {
          item = item.replace(res[0], String(computeDisplay(String(res[1]))));
        }
        return item;
    }
  };

  return [...[config].flat()].map((e) => {
    let result = computeDisplay(e);
    if (!result) return "";
    return result;
  });
};
