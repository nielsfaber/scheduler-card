import { computeDomain, friendlyName } from "../../lib/entity";
import { describeTarget, targetEntities, targetIsDynamic } from "../actions/target";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig, DisplayItem, Schedule } from "../../types";
import { computeTimeDisplay } from "./compute_time_display";
import { formatActionDisplay } from "./format_action_display";
import { localize } from "../../localize/localize";
import { capitalizeFirstLetter } from "../../lib/capitalize_first_letter";
import { formatWeekdayDisplay } from "../days";
import { computeEntityDisplay } from "./compute_entity_display";


export const computeScheduleDisplay = (schedule: Schedule, config: (DisplayItem | string)[] | DisplayItem | string, hass: HomeAssistant, customize?: CustomConfig): string[] => {

  const computeDisplay = (item: DisplayItem | string) => {

    switch (item) {
      case DisplayItem.Action:
        const slotActions = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions;
        const action = slotActions[0];
        let actionDisplay = capitalizeFirstLetter(formatActionDisplay(action, hass, customize));
        if (slotActions.length > 1) {
          actionDisplay += ' +' + localize('ui.panel.overview.additional_tasks', hass, '{number}', String(slotActions.length - 1));
        }
        return actionDisplay;
      case DisplayItem.Days:
        return capitalizeFirstLetter(formatWeekdayDisplay(schedule.entries[0].weekdays, 'long', hass));
      case DisplayItem.Name:
        return capitalizeFirstLetter(schedule.name || '');
      case DisplayItem.AdditionalTasks:
        return schedule.entries[0].slots.length > 1
          ? '+' +
          localize('ui.panel.overview.additional_tasks', hass, '{number}', String(schedule.entries[0].slots.length - 1))
          : '';
      case DisplayItem.Entity:
        const nextAction = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        if (targetIsDynamic(nextAction.target)) {
          // show the target's own references (areas/floors/labels/devices)
          return capitalizeFirstLetter(describeTarget(hass, nextAction.target));
        }
        let entityIds = targetEntities(nextAction.target);
        if (!entityIds.length && ['script', 'notify'].includes(computeDomain(nextAction.service))) entityIds = [nextAction.service];
        const entityDisplay = entityIds.map(e => computeEntityDisplay(e, hass, customize)).join(", ");
        return capitalizeFirstLetter(entityDisplay);
      case DisplayItem.RelativeTime:
        return '<relative-time></relative-time>';
      case DisplayItem.Tags:
        return schedule.tags?.map(e => `<tag>${e}</tag>`).join('');
      case DisplayItem.Time:
        const slot = schedule.entries[0].slots[schedule.next_entries[0] || 0];
        const timeDisplay = computeTimeDisplay(slot.start, slot.stop, hass);
        if (timeDisplay && timeDisplay.trim()) return capitalizeFirstLetter(timeDisplay);

        // fallback: construct a minimal time string if localization failed
        // Basic fallback without localization: show start[-stop] in HH:MM
        const parse = (s: string) => {
          try {
            const parts = s.split(':').map(Number);
            return `${String(parts[0]).padStart(2, '0')}:${String(parts[1]).padStart(2, '0')}`;
          } catch (e) {
            return String(s);
          }
        }
        return capitalizeFirstLetter(slot.stop ? `${parse(slot.start)} - ${parse(slot.stop)}` : `${parse(slot.start)}`);
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

  return [...[config].flat()].map(e => {
    let result = computeDisplay(e);
    if (!result) return '';
    return result;
  });
}