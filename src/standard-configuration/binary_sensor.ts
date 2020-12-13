import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant, stateIcon, computeStateDisplay } from 'custom-card-helpers';

export const binarySensorIcon = (stateObj?: HassEntity): string => {
  if (stateObj) return stateIcon({ ...stateObj, state: "off" }) || "hass:radiobox-blank";
  else return "hass:radiobox-blank";
};

export const binarySensorStates = (hass: HomeAssistant, stateObj: HassEntity) => [
  {
    value: "off",
    name: computeStateDisplay(hass.localize, { ...stateObj, state: "off" }, hass.language),
    icon: stateIcon({ ...stateObj, state: "off" })
  },
  {
    value: "on",
    name: computeStateDisplay(hass.localize, { ...stateObj, state: "on" }, hass.language),
    icon: stateIcon({ ...stateObj, state: "on" })
  }
];