import { Dictionary } from './types';
import { ServiceNameTranslations, localize } from './localize/localize';
import { computeDomain, HomeAssistant, computeEntity } from 'custom-card-helpers';
import { capitalize } from './helpers';

export function computeAction(hass: HomeAssistant, service_data: Dictionary<any>) {
  const domain = computeDomain(service_data.service) || computeDomain(service_data.entity);
  const service = computeEntity(service_data.service);

  switch (domain) {
    case 'climate':
      switch (service) {
        case 'set_temperature':
          if (service_data?.temperature) {
            const unit = hass.config.unit_system.temperature;
            const value = Number(service_data.temperature);
            return `${localize('services.set_to')} ${value}${unit}`;
          }
      }
      break;
    case 'cover':
      switch (service) {
        case 'set_position':
          if (service_data?.position) {
            const value = Number(service_data.position);
            return `${localize('services.set_to')} ${value}%`;
          }
      }
      break;
    case 'light':
      switch (service) {
        case 'turn_on':
          if (service_data?.brightness) {
            const value = Math.round(Number(service_data.brightness) / 2.55);
            return `${localize('services.set_to')} ${value}%`;
          }
      }
      break;
    case 'script':
      if (service == computeEntity(service_data.entity)) return 'run';
      break;
  }

  const service_string = ServiceNameTranslations[service]
    ? localize(ServiceNameTranslations[service])
    : service.split('_').join(' ');

  return capitalize(service_string);
}
