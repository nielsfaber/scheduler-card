import { HomeAssistant } from 'custom-card-helpers/dist/types';
import { HassEntity } from 'home-assistant-js-websocket';

export const deviceTrackerStates = (hass: HomeAssistant, _stateObj: HassEntity) => [
  {
    value: 'home',
    name: hass.localize('state_badge.device_tracker.home', hass.language),
    icon: 'hass:home-outline',
  },
  {
    value: 'not_home',
    name: hass.localize('state_badge.device_tracker.not_home', hass.language),
    icon: 'hass:exit-run',
  },
];
