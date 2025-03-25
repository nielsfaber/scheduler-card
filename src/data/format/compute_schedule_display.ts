import { html } from "lit";
import { friendlyName } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { CustomConfig, DisplayItem, Schedule } from "../../types";
import { computeTimeDisplay } from "./compute_time_display";
import { formatActionDisplay } from "./format_action_display";
import { localize } from "../../localize/localize";
import { computeDayDisplay } from "./compute_days_display";
import { capitalizeFirstLetter } from "../../lib/capitalize_first_letter";


export const computeScheduleDisplay = (schedule: Schedule, config: (DisplayItem | string)[] | DisplayItem | string, hass: HomeAssistant, customize?: CustomConfig) => {

  const computeDisplay = (item: DisplayItem | string) => {

    switch (item) {
      case DisplayItem.Action:
        const action = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        return formatActionDisplay(action, hass, customize);
      case DisplayItem.Days:
        return schedule.entries[0].weekdays.map(e => computeDayDisplay(e, 'long', hass)).join(', ');
      case DisplayItem.Name:
        return schedule.name || '';
      case DisplayItem.AdditionalTasks:
        return schedule.entries[0].slots.length > 1
          ? '+' +
          localize('ui.panel.overview.additional_tasks', hass, '{number}', String(schedule.entries[0].slots.length - 1))
          : '';
      case DisplayItem.Entity:
        const nextAction = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
        const entityIds = [nextAction.target?.entity_id || []].flat();
        const entityDisplay = entityIds.map(e => friendlyName(e, hass.states[e]?.attributes)).join(", ");
        return entityDisplay;

      case DisplayItem.RelativeTime:
        const ts = schedule.timestamps![schedule.next_entries[0] || 0];
        return html`
          <scheduler-relative-time
            .hass=${hass}
            .datetime=${new Date(ts)}
          >
          </scheduler-relative-time>`;
      case DisplayItem.Tags:
        return html`
          <div class="tags">
            ${schedule.tags?.map(e => html`<span class="tag">${e}</span>`)}
          </div>`;
      case DisplayItem.Time:
        const slot = schedule.entries[0].slots[schedule.next_entries[0] || 0];
        return computeTimeDisplay(slot.start, slot.stop, hass);
      case DisplayItem.Default:
        const nameDisplay = computeDisplay(DisplayItem.Name) || computeDisplay(DisplayItem.Entity);
        return nameDisplay
          ? `${capitalizeFirstLetter(nameDisplay)}: ${computeDisplay(DisplayItem.Action)}`
          : `${capitalizeFirstLetter(computeDisplay(DisplayItem.Action))}`;
      default:
        const regex = /(\{[a-z\-]+\})/g;
        if (item.match(regex)) {
          let output = item.split(regex).map(e => {
            let res = e.match(/^\{([a-z\-]+)\}$/);
            if (res) return computeDisplay(res[1]);
            return e;
          });
          return output;
        }
        else return item;
    }
  };

  return [...[config].flat()].map(e => {
    let result = computeDisplay(e);
    if (!result) return '';
    return html`
    ${result}
          <br/>
            `});
}