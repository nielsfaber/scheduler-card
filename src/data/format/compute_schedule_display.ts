import { computeDomain, friendlyName } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig, DisplayItem, Schedule } from "../../types";
import { computeTimeDisplay, computeTimeStrings } from "./compute_time_display";
import { formatActionDisplay } from "./format_action_display";
import { localize } from "../../localize/localize";
import { capitalizeFirstLetter } from "../../lib/capitalize_first_letter";
import { formatWeekdayDisplay } from "../days";
import { computeEntityDisplay } from "./compute_entity_display";


export const computeScheduleDisplay = (schedule: Schedule, config: (DisplayItem | string)[] | DisplayItem | string, hass: HomeAssistant, customize?: CustomConfig): string[] => {

  const computeDisplay = (item: DisplayItem | string): string | string[] => {

    switch (item) {
      case DisplayItem.Action:
        const action = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        return capitalizeFirstLetter(formatActionDisplay(action, hass, customize));
      case DisplayItem.Days:
        return capitalizeFirstLetter(formatWeekdayDisplay(schedule.entries[0].weekdays, 'long', hass));
      case DisplayItem.Name:
        return capitalizeFirstLetter(schedule.name || '');
      case DisplayItem.AdditionalTasks: {
        const additionalCount = schedule.entries[0].slots.length - 1;
        return additionalCount > 0
          ? `+${localize(
              'ui.panel.overview.additional_tasks',
              hass,
              '{number}',
              String(additionalCount)
            )}`
          : '';
      }
      case DisplayItem.AdditionalTaskInfo:
        return computeAdditionalTaskInfo(schedule, hass, customize);
      case DisplayItem.Entity:
        const nextAction = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        let entityIds = [nextAction.target?.entity_id || []].flat();
        if (!entityIds.length && ['script', 'notify'].includes(computeDomain(nextAction.service))) entityIds = [nextAction.service];
        const entityDisplay = entityIds.map(e => computeEntityDisplay(e, hass, customize)).join(", ");
        return capitalizeFirstLetter(entityDisplay);
      case DisplayItem.RelativeTime:
        return '<relative-time></relative-time>';
      case DisplayItem.Tags:
        return schedule.tags?.map(e => `<tag>${e}</tag>`).join('') || '';
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
          const replacement = computeDisplay(String(res[1]));
          const replacementString = Array.isArray(replacement)
            ? replacement.join('<br/>')
            : String(replacement);
          item = item.replace(res[0], replacementString);
        }
        return item;
    }
  };

  return [...[config].flat()].flatMap(item => {
    const result = computeDisplay(item);
    const values = Array.isArray(result) ? result : [result];
    return values.filter(entry => Boolean(entry));
  });
}

const computeAdditionalTaskInfo = (schedule: Schedule, hass: HomeAssistant, customize?: CustomConfig): string[] => {
  const entry = schedule.entries?.[0];
  const slots = entry?.slots || [];

  if (!slots.length) return [];

  const stateObj = schedule.entity_id ? hass.states[schedule.entity_id] : undefined;
  const isEnabled = stateObj ? stateObj.state !== 'off' : schedule.enabled !== false;

  const parseIndex = (value: unknown): number | undefined => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length && !Number.isNaN(Number(value))) return Number(value);
    return undefined;
  };

  const currentSlotAttr = parseIndex(stateObj?.attributes?.current_slot);
  const nextEntry = parseIndex(schedule.next_entries?.[0]);

  const activeSlotIndex = typeof currentSlotAttr === 'number'
    ? currentSlotAttr
    : (isEnabled && typeof nextEntry === 'number' && slots.length
      ? (nextEntry + slots.length - 1) % slots.length
      : undefined);

  const startIndex = typeof currentSlotAttr === 'number'
    ? currentSlotAttr
    : (typeof nextEntry === 'number'
      ? (isEnabled && typeof activeSlotIndex === 'number'
        ? activeSlotIndex
        : nextEntry)
      : 0);

  const order = slots.map((_, index) => (startIndex + index) % slots.length);

  return order.map(slotIndex => {
    const slot = slots[slotIndex];
    const action = slot.actions?.[0];
    let actionDisplay = action
      ? formatActionDisplay(action, hass, customize, false, true)
      : '';
    if (!actionDisplay?.trim()) {
      actionDisplay = localize('ui.panel.overview.additional_task_info.no_action', hass);
    }
    actionDisplay = capitalizeFirstLetter(actionDisplay);
    const timeStrings = computeTimeStrings(slot.start, slot.stop, hass).map(capitalizeFirstLetter);
    const timeDisplay = slot.stop
      ? `${timeStrings[0]} → ${timeStrings[1]}`
      : timeStrings[0];

    const classes = ['slot-info'];
    const isActive = isEnabled && typeof activeSlotIndex === 'number' && slotIndex === activeSlotIndex;
    classes.push(isActive ? 'slot-info--active' : 'slot-info--inactive');
    if (!isEnabled) classes.push('slot-info--disabled');

    return `<span class="${classes.join(' ')}"><span class="slot-info__content"><span class="slot-info__label">${actionDisplay}</span></span><span class="slot-info__time">${timeDisplay}</span></span>`;
  });
};
