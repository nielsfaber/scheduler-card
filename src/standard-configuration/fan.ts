import { listVariable } from '../actionVariables';
import { ActionConfig } from '../types';
import { LocalizeFunc, HomeAssistant, stateIcon, computeStateDisplay } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { localize } from '../localize/localize';

const fanSpeeds = (localizeFunc: LocalizeFunc, stateObj?: HassEntity) => {
  const speedList = [
    {
      value: 'off',
      icon: 'hass:fan-off',
      name: localizeFunc('state.default.off').toLowerCase(),
    },
    {
      value: 'low',
      icon: 'hass:fan-speed-1',
      name: localizeFunc('ui.card.climate.low').toLowerCase(),
    },
    {
      value: 'medium',
      icon: 'hass:fan-speed-2',
    },
    {
      value: 'high',
      icon: 'hass:fan-speed-3',
      name: localizeFunc('ui.card.climate.high').toLowerCase(),
    },
  ];

  if (stateObj && stateObj.attributes.speed_list && Array.isArray(stateObj.attributes.speed_list)) {
    return stateObj.attributes.speed_list.map(speed => speedList.find(el => el.value == speed) || { value: speed });
  }
  return speedList;
};

export const fanActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'fan.turn_on',
    icon: 'hass:power',
    name: hass.localize('ui.card.media_player.turn_on'),
  },
  {
    service: 'fan.turn_off',
    icon: 'hass:power-off',
    name: hass.localize('ui.card.media_player.turn_off'),
  },
  {
    service: 'fan.set_speed',
    variable: listVariable({
      field: 'speed',
      name: hass.localize('ui.card.fan.speed'),
      options: fanSpeeds(hass.localize, stateObj),
    }),
    supported_feature: 1,
    icon: 'hass:weather-windy',
    name: localize('services.fan.set_speed', hass.language),
  },
  {
    service: 'fan.oscillate',
    variable: listVariable({
      field: 'oscillating',
      name: hass.localize('ui.card.fan.oscillate'),
      options: [
        {
          value: 'True',
          name: hass.localize('state.default.on'),
          icon: 'hass:flash',
        },
        {
          value: 'False',
          name: hass.localize('state.default.off'),
          icon: 'hass:flash-off',
        },
      ],
    }),
    supported_feature: 2,
    icon: 'hass:arrow-left-right',
    name: localize('services.fan.oscillate', hass.language),
  },
  {
    service: 'fan.set_direction',
    variable: listVariable({
      field: 'direction',
      name: hass.localize('ui.card.fan.direction'),
      options: [
        {
          value: 'forward',
          name: hass.localize('ui.card.fan.forward'),
          icon: 'hass:autorenw',
        },
        {
          value: 'reverse',
          name: hass.localize('ui.card.fan.reverse'),
          icon: 'hass:sync',
        },
      ],
    }),
    supported_feature: 4,
    icon: 'hass:cog-clockwise',
    name: localize('services.fan.set_direction', hass.language),
  },
];

export const fanStates = (hass: HomeAssistant, stateObj: HassEntity) => [
  {
    value: 'off',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'off' }, hass.language),
    icon: 'hass:power-off',
  },
  {
    value: 'on',
    name: computeStateDisplay(hass.localize, { ...stateObj, state: 'on' }, hass.language),
    icon: 'hass:power',
  },
];
