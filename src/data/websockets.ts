import { HomeAssistant, fireEvent } from "custom-card-helpers";
import { Schedule, ScheduleConfig } from "../types";
import { TemplateResult, html } from "lit-element";

export const fetchSchedules = (hass: HomeAssistant): Promise<Schedule[]> =>
  hass.callWS({
    type: "scheduler",
  });

export const fetchScheduleItem = (hass: HomeAssistant, schedule_id: string): Promise<Schedule> =>
  hass.callWS({
    type: "scheduler/item",
    schedule_id: schedule_id
  });

export const saveSchedule = (hass: HomeAssistant, config: ScheduleConfig): Promise<boolean> => {
  return hass
    .callApi("POST", "scheduler/add", config)
};

export const editSchedule = (hass: HomeAssistant, config: ScheduleConfig & { schedule_id: string }): Promise<boolean> => {
  return hass
    .callApi("POST", "scheduler/edit", config)
};

export const deleteSchedule = (hass: HomeAssistant, schedule_id: string): Promise<boolean> => {
  return hass
    .callApi("POST", "scheduler/remove", { schedule_id: schedule_id })
};

export function showErrorDialog(target: HTMLElement, error: string | TemplateResult) {
  fireEvent(target, 'show-dialog', {
    dialogTag: 'dialog-error',
    dialogImport: () => import('../components/dialog-error'),
    dialogParams: { error: error }
  });
}

export function handleError(err: { body: { message: string }, error: string }, el: HTMLElement) {
  let errorMessage = html`
    <b>Something went wrong!</b><br>
    ${err.body.message}<br><br>
    ${err.error}<br><br>
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;
  showErrorDialog(el, errorMessage);
}