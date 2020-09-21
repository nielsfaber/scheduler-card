
import { IDictionary, IDomainConfig, IUserSelection, IActionElement } from './types'
import { localize } from './localize/localize';
import { parseTimestamp } from './date-time';


export const defaultDomainConfig: IDictionary<IDomainConfig> = {
  light: {
    actions: [
      {
        service: "turn_on",
        icon: "lightbulb-on-outline",
        variable: { field: "brightness" }
      },
      {
        service: "turn_off",
        icon: "lightbulb-off-outline",
      }
    ]
  },
  switch: {
    actions: [
      {
        service: "turn_on",
      },
      {
        service: "turn_off",
      }
    ]
  },
  cover: {
    actions: [
      {
        service: "open_cover",
        name: localize('services.open_cover')
      },
      {
        service: "close_cover",
        name: localize('services.close_cover')
      },
      {
        service: "set_cover_position",
        name: localize('services.set_position'),
        variable: { field: "position" }
      },
    ]
  },
  climate: {
    actions: [
      {
        service: "set_temperature",
        variable: { field: "temperature" },
        icon: "thermometer",
        allow_sequence: true
      },
      {
        service: "turn_off",
        icon: "thermometer-off"
      }
    ]
  },
  fan: {
    actions: [
      {
        service: "turn_on",
        icon: "fan",
      },
      {
        service: "turn_off",
        icon: "fan-off",
      }
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
  time: { value: parseTimestamp('12:00') },
  days: [],
  daysType: 'daily',
  levelEnabled: false,
  level: 0
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
  else if (action == 'set_cover_position') return 'window-shutter';
  return 'flash';
}

export function getNameForService(service: string): string {
  if (service == 'turn_on') return localize('services.turn_on')
  else if (service == 'turn_off') return localize('services.turn_off')
  else if (service == 'open_cover') return localize('services.open_cover')
  else if (service == 'close_cover') return localize('services.close_cover')
  else if (service == 'set_temperature') return localize('services.set_temperature')
  else if (service == 'set_cover_position') return localize('services.set_position')
  if (service.indexOf('.') !== -1) return service.split('.').pop()!;
  return service;
}

export function getDefaultActionVariableConfig(field_name: string): object {
  const defaultConfig = {
    brightness: {
      name: localize('fields.brightness'),
      unit: "",
      min: 0,
      max: 255,
      step: 1,
      optional: true,
      show_percentage: true
    },
    temperature: {
      name: localize('fields.temperature'),
      unit: "°C",
      min: 10,
      max: 30,
      step: 1,
      optional: false,
      show_percentage: false
    },
    position: {
      name: localize('fields.position'),
      unit: "%",
      min: 0,
      max: 100,
      step: 1,
      optional: false,
      show_percentage: false
    },
    default: {
      name: field_name,
      unit: "",
      min: 0,
      max: 255,
      step: 1,
      optional: false,
      show_percentage: false
    }
  }
  if (defaultConfig[field_name] !== undefined) return { ...defaultConfig[field_name] };
  else return { ...defaultConfig['default'] };
}

export const planSequenceAction: IActionElement = {
  id: 'plan_sequence',
  service: 'plan_sequence',
  name: 'plan sequence',
  icon: 'hass:cog-refresh-outline',
  allow_sequence: false,
};