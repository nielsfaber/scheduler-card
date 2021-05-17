import { HassEntity } from 'home-assistant-js-websocket';
import { Action } from '../types';
import { LocalizeFunc, HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';
import { levelVariable } from '../data/variables/level_variable';
import { listVariable } from '../data/variables/list_variable';

export const humidifierModes = (localizeFunc: LocalizeFunc, stateObj: HassEntity | undefined, filterCapabilities: boolean) => {
  const modeList = [
    {
      value: 'normal',
      name: localizeFunc('state_attributes.humidifier.mode.normal'),
      icon: 'hass:account-outline',
    },
    {
      value: 'eco',
      name: localizeFunc('state_attributes.humidifier.mode.eco'),
      icon: 'hass:leaf',
    },
    {
      value: 'away',
      name: localizeFunc('state_attributes.humidifier.mode.away'),
      icon: 'hass:car-traction-control',
    },
    {
      value: 'boost',
      name: localizeFunc('state_attributes.humidifier.mode.boost'),
      icon: 'hass:rocket-launch-outline',
    },
    {
      value: 'comfort',
      name: localizeFunc('state_attributes.humidifier.mode.comfort'),
      icon: 'hass:car-seat-cooler',
    },
    {
      value: 'home',
      name: localizeFunc('state_attributes.humidifier.mode.home'),
      icon: 'hass:home-outline',
    },
    {
      value: 'sleep',
      name: localizeFunc('state_attributes.humidifier.mode.sleep'),
      icon: 'hass:account-sleep',
    },
    {
      value: 'auto',
      name: localizeFunc('state_attributes.humidifier.mode.auto'),
      icon: 'hass:autorenew',
    },
    {
      value: 'baby',
      name: localizeFunc('state_attributes.humidifier.mode.baby'),
      icon: 'hass:baby-bottle-outline',
    },
  ];
  const supportedModes: string[] = stateObj && Array.isArray(stateObj.attributes.available_modes) ? stateObj.attributes.available_modes : [];
  return filterCapabilities
    ? modeList.filter(e => supportedModes.find(m => m === e.value))
    : modeList;
};

export const humidifierActions = (hass: HomeAssistant, stateObj: HassEntity | undefined, filterCapabilities: boolean) => {
  const supportedModes = humidifierModes(hass.localize, stateObj, filterCapabilities);

  let actions: Action[] = [
    {
      service: 'humidifier.turn_on',
      icon: 'hass:power',
      name: hass.localize('ui.card.vacuum.actions.turn_on'),
    },
    {
      service: 'turn_off',
      icon: 'hass:power-off',
      name: hass.localize('ui.card.vacuum.actions.turn_off'),
    },
    {
      service: 'humidifier.set_humidity',
      variables: {
        humidity: levelVariable({
          name: hass.localize('ui.card.humidifier.humidity'),
          min: stateObj?.attributes.min_humidity !== undefined
            ? stateObj?.attributes.min_humidity
            : 0,
          max: stateObj?.attributes.max_humidity !== undefined
            ? stateObj?.attributes.max_humidity
            : 100,
          step: 1,
          unit: '%',
        }),
      },
      icon: 'hass:water-percent',
      name: localize('services.humidifer.set_humidity', hass.language),
    }
  ];

  if (supportedModes.length > 1) {
    actions.push(
      {
        service: 'humidifier.set_mode',
        variables: {
          mode: listVariable({
            name: hass.localize('ui.card.humidifier.mode'),
            options: supportedModes,
          })
        },
        icon: 'hass:cog-transfer-outline',
        name: localize('services.climate.set_mode', hass.language),
      }
    );
  }
  return actions;
}