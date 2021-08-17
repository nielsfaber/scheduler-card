import { HomeAssistant, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { listVariable } from '../data/variables/list_variable';
import { Action } from '../types';
import { getLocale } from '../helpers';

export const alarmControlPanelActions = (hass: HomeAssistant, _stateObj: HassEntity): Action[] => [
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

export const alarmControlPanelStates = (hass: HomeAssistant, stateObj: HassEntity) => listVariable({
  options: [
    {
      value: "disarmed",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "disarmed" }, getLocale(hass)),
      icon: 'hass:lock-open-variant-outline',
    },
    {
      value: "armed_away",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "armed_away" }, getLocale(hass)),
      icon: 'hass:exit-run',
    },
    {
      value: "armed_home",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "armed_home" }, getLocale(hass)),
      icon: 'hass:home-outline',
    },
    {
      value: "armed_night",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "armed_night" }, getLocale(hass)),
      icon: 'hass:power-sleep',
    },
    {
      value: "triggered",
      name: computeStateDisplay(hass.localize, { ...stateObj, state: "triggered" }, getLocale(hass)),
      icon: 'hass:alarm-light-outline',
    },
  ]
});
