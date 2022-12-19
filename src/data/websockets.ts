import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { Schedule, ScheduleConfig, TagEntry } from '../types';
import { html, TemplateResult } from 'lit';
import { DialogParams } from '../components/generic-dialog';

export const fetchSchedules = (hass: HomeAssistant): Promise<Schedule[]> =>
  hass.callWS({
    type: 'scheduler',
  });

export const fetchScheduleItem = (hass: HomeAssistant, schedule_id: string): Promise<Schedule> =>
  hass.callWS({
    type: 'scheduler/item',
    schedule_id: schedule_id,
  });

export const saveSchedule = (hass: HomeAssistant, config: ScheduleConfig): Promise<boolean> => {
  return hass.callApi('POST', 'scheduler/add', config);
};

export const editSchedule = (
  hass: HomeAssistant,
  config: ScheduleConfig & { schedule_id: string }
): Promise<boolean> => {
  return hass.callApi('POST', 'scheduler/edit', config);
};

export const deleteSchedule = (hass: HomeAssistant, schedule_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'scheduler/remove', { schedule_id: schedule_id });
};

export const fetchTags = (hass: HomeAssistant): Promise<TagEntry[]> =>
  hass.callWS({
    type: 'scheduler/tags',
  });

export function showErrorDialog(target: HTMLElement, error: string | TemplateResult, hass: HomeAssistant) {
  const params: DialogParams = {
    title: hass.localize('state_badge.default.error'),
    description: error,
    primaryButtonLabel: hass.localize('ui.dialogs.generic.ok'),
    confirm: () => {},
    cancel: () => {},
  };
  fireEvent(target, 'show-dialog', {
    dialogTag: 'generic-dialog',
    dialogImport: () => import('../components/generic-dialog'),
    dialogParams: params,
  });
}

export function handleError(err: { body: { message: string }; error: string }, el: HTMLElement, hass: HomeAssistant) {
  const errorMessage = html`
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;
  showErrorDialog(el, errorMessage, hass);
}
