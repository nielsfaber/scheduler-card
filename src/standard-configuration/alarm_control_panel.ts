import { ActionConfig } from '../types';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export const alarmControlPanelActions = (hass: HomeAssistant, _stateObj: HassEntity): ActionConfig[] => [
  {
    service: 'alarm_control_panel.alarm_disarm',
    icon: 'hass:lock-open-variant-outline',
    name: hass.localize('ui.card.alarm_control_panel.disarm'),
  },
  {
    service: 'alarm_control_panel.alarm_arm_home',
    icon: 'hass:home-outline',
    name: hass.localize('ui.card.alarm_control_panel.arm_home'),
    supported_feature: 1,
  },
  {
    service: 'alarm_control_panel.alarm_arm_away',
    icon: 'hass:exit-run',
    name: hass.localize('ui.card.alarm_control_panel.arm_away'),
    supported_feature: 2,
  },
  {
    service: 'alarm_control_panel.alarm_arm_night',
    icon: 'hass:power-sleep',
    name: hass.localize('ui.card.alarm_control_panel.arm_night'),
    supported_feature: 4,
  },
  {
    service: 'alarm_control_panel.alarm_arm_custom_bypass',
    icon: 'hass:shield-lock-outline',
    name: hass.localize('ui.card.alarm_control_panel.arm_custom_bypass'),
    supported_feature: 16,
  },
];

export const alarmControlPanelStates = ['disarmed', 'armed_away', 'armed_home', 'armed_night'];
