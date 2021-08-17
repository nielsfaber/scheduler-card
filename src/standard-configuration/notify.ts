import { Action } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { textVariable } from '../data/variables/text_variable';
import { localize } from '../localize/localize';
import { getLocale } from '../helpers';

export const notifyActions = (hass: HomeAssistant, service_id: string): Action[] => {

  let action: Action = {
    service: service_id,
    icon: 'hass:message-alert',
    name: localize('services.notify.notify', getLocale(hass)),
    variables: {
      title: textVariable({
        name: hass.localize('ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title'),
      }),
      message: textVariable({
        name: hass.localize('ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message'),
        multiline: true
      }),
    }
  };

  return [action];
};