import { html } from "lit";
import { friendlyName } from "../../lib/entity";
import { HomeAssistant } from "../../lib/types";
import { DisplayItem, Schedule } from "../../types";
import { computeTimeDisplay } from "./compute_time_display";
import { formatActionDisplay } from "./format_action_display";
import { localize } from "../../localize/localize";
import { computeDaysDisplay } from "./compute_days_display";


export const computeScheduleDisplay = (schedule: Schedule, config: (DisplayItem | string)[] | DisplayItem | string, hass: HomeAssistant) => {

  const computeDisplay = (item: DisplayItem | string) => {

    switch (item) {
      case DisplayItem.Action:
        const action = schedule.entries[0].slots[schedule.next_entries![0]].actions[0];
        return formatActionDisplay(action, hass);
      case DisplayItem.Days:
        return computeDaysDisplay(schedule.entries[0].weekdays, hass);
      case DisplayItem.Name:
        return schedule.name || '';
      case DisplayItem.AdditionalTasks:
        return schedule.entries[0].slots.length > 1
          ? '+' +
          localize('ui.panel.overview.additional_tasks', hass, '{number}', String(schedule.entries[0].slots.length - 1))
          : '';
      case DisplayItem.Entity:
        const nextAction = schedule.entries[0].slots[schedule.next_entries![0]].actions[0];
        const entityIds = [nextAction.target.entity_id || []].flat();
        const entityDisplay = entityIds.map(e => friendlyName(e, hass.states[e].attributes)).join(", ");
        return entityDisplay;

      case DisplayItem.RelativeTime:
        const ts = schedule.timestamps![schedule.next_entries![0]];
        return html`
          <ha-relative-time
            .hass=${hass}
            .datetime=${ts}
          >
          </ha-relative-time>`;
      case DisplayItem.Tags:
        return '';
      case DisplayItem.Time:
        const slot = schedule.entries[0].slots[schedule.next_entries[0]];
        return computeTimeDisplay(slot.start, slot.stop);
      case DisplayItem.Default:
        return computeDisplay(DisplayItem.Name) || `${computeDisplay(DisplayItem.Entity)}: ${computeDisplay(DisplayItem.Action)}`;
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
    if (!result) return;
    return html`
    ${result}
          <br/>
            `});
}