import { HassEntity } from 'home-assistant-js-websocket';
import { computeDomain } from 'custom-card-helpers';
import { unique } from '../../helpers';

export const colorModesToSupportedFeatures = (colorModes: any) => {
  if (!colorModes || !Array.isArray(colorModes)) return 0;
  let features: number[] = colorModes.map(mode => {
    switch (mode) {
      case 'brightness':
      case 'color_temp':
      case 'hs':
      case 'xy':
      case 'rgb':
      case 'rgbw':
      case 'rgbww':
        return 1;
      case 'unknown':
      case 'onoff':
      case 'white':
      default:
        return 0;
    }
  });
  features = unique(features);
  return features.reduce((acc, val) => acc | val, 0);
};

export const computeSupportedFeatures = (stateObj: HassEntity | undefined) => {
  if (!stateObj) return 0;
  const domain = computeDomain(stateObj.entity_id);

  switch (domain) {
    case 'light':
      return colorModesToSupportedFeatures(stateObj.attributes.supported_color_modes);
    default:
      return stateObj.attributes.supported_features || 0;
  }
};
