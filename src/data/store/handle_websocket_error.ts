import { html } from 'lit';
import { HomeAssistant } from '../../lib/types';
import { GenericDialogParams } from '../../dialogs/generic-dialog';
import { fireEvent } from '../../lib/fire_event';

export const handleWebsocketError = (err: { body: { message: string }; error: string }, el: HTMLElement, hass: HomeAssistant) => {

  const params: GenericDialogParams = {
    title: hass.localize('state_badge.default.error'),
    description: html`
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,
    primaryButtonLabel: hass.localize('ui.common.ok'),
    confirm: () => { },
    cancel: () => { },
  };

  fireEvent(el, 'show-dialog', {
    dialogTag: 'scheduler-generic-dialog',
    dialogImport: () => import('../../dialogs/generic-dialog'),
    dialogParams: params,
  });
}