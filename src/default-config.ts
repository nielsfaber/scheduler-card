
import { IDictionary, IDomainConfig, IUserSelection } from './types'
import { localize } from './localize/localize';


export const defaultDomainConfig: IDictionary<IDomainConfig> = {
  "light": {
    "actions": [
      {
        "service": "turn_on",
        "icon": "lightbulb-on-outline",
        "name": localize('services.turn_on')
      },
      {
        "service": "turn_off",
        "icon": "lightbulb-off-outline",
        "name": localize('services.turn_off')
      }
    ]
  },
  "switch": {
    "actions": [
      {
        "service": "turn_on",
        "name": localize('services.turn_on')
      },
      {
        "service": "turn_off",
        "name": localize('services.turn_off')
      }
    ]
  },
  "cover": {
    "actions": [
      {
        "service": "open_cover",
        "name": localize('services.open_cover')
      },
      {
        "service": "close_cover",
        "name": localize('services.close_cover')
      },
    ]
  },
  "climate": {
    "actions": [
      {
        "service": "set_temperature",
        "service_data": { temperature: 10 },
        "name": `${localize('services.set_temperature')} 10C`,
        "icon": "thermometer-chevron-down"
      },
      {
        "service": "set_temperature",
        "service_data": { temperature: 22 },
        "name": `${localize('services.set_temperature')} 22C`,
        "icon": "thermometer-chevron-up"
      },
    ]
  }
}


export const DefaultUserSelection: IUserSelection = {
  group: '',
  entity: '',
  action: '',
  newItem: false,
  actionConfirmed: false,
  editItem: '',
  timeHours: '12',
  timeMinutes: '00',
  days: [],
  daysType: 'daily',
  sun: false
}

export function getIconForDomain(domain: string): string {
  var map = {
    'automation': 'robot',
    'camera': 'camera',
    'climate': 'home-thermometer-outline',
    'cover': 'window-shutter',
    'fan': 'fan',
    'input_number': 'sort-numeric-variant',
    'input_select': 'form-select',
    'input_text': 'form-textbox',
    'input_time': 'clock',
    'light': 'lightbulb-outline',
    'media_player': 'speaker',
    'script': 'script-text',
    'switch': 'flash',
    'vacuum': 'robot-vacuum'
  };
  if (domain in map) return map[domain];
  return 'folder-outline';
}



export function getNameForDomain(domain: string): string {
  let result: string | null = null;
  if (domain == 'climate') result = localize('domains.climate')
  else if (domain == 'cover') result = localize('domains.cover')
  else if (domain == 'fan') result = localize('domains.fan')
  else if (domain == 'light') result = localize('domains.light')
  else if (domain == 'switch') result = localize('domains.switch')
  else if (domain == 'vacuum') result = localize('domains.vacuum')
  if (result) return result;
  else return domain;
}


export function getIconForAction(action: string): string {
  if (action == 'turn_on') return 'toggle-switch-outline';
  else if (action == 'turn_off') return 'toggle-switch-off-outline';
  else if (action == 'open_cover') return 'window-shutter-open';
  else if (action == 'close_cover') return 'window-shutter';
  else if (action == 'set_temperature') return 'thermometer';
  return 'flash';
}

export function getNameForService(service: string): string {
  if (service == 'turn_on') return localize('services.turn_on')
  else if (service == 'turn_off') return localize('services.turn_off')
  else if (service == 'open_cover') return localize('services.open_cover')
  else if (service == 'close_cover') return localize('services.close_cover')
  if (service.indexOf('.') !== -1) return service.split('.').pop()!;
  return service;
}
