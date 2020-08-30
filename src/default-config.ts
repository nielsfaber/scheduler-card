
import { IDictionary, IEntityConfigEntry, IGroupConfigEntry, IUserSelection } from './types'


export const defaultDomainConfig: IDictionary<IEntityConfigEntry> = {
  "light": {
    "actions": [
      {
        "service": "turn_on",
        "icon": "lightbulb-outline",
      },
      {
        "service": "turn_off",
        "icon": "lightbulb-off-outline",
      }
    ]
  },
  "switch": {
    "actions": [
      {
        "service": "turn_on",
      },
      {
        "service": "turn_off",
      }
    ]
  },
  "cover": {
    "actions": [
      {
        "service": "open_cover",
        "name": "open"
      },
      {
        "service": "close_cover",
        "name": "close"
      },
    ]
  },
  "climate": {
    "actions": [
      {
        "service": "set_temperature",
        "service_data": { temperature: 10 },
        "name": "Set to 10C",
        "icon": "thermometer-chevron-down"
      },
      {
        "service": "set_temperature",
        "service_data": { temperature: 22 },
        "name": "Set to 22C",
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
  if (domain == 'light') return 'lightbulb-outline';
  else if (domain == 'cover') return 'window-shutter';
  else if (domain == 'switch') return 'flash';
  else if (domain == 'climate') return 'home-thermometer-outline';
  else if (domain == 'fan') return 'fan';
  else if (domain == 'vacuum') return 'robot-vacuum';
  return 'folder-outline';
}

export function getIconForAction(action: string): string {
  if (action == 'turn_on') return 'toggle-switch-outline';
  else if (action == 'turn_off') return 'toggle-switch-off-outline';
  else if (action == 'open_cover') return 'window-shutter-open';
  else if (action == 'close_cover') return 'window-shutter';
  else if (action == 'set_temperature') return 'thermometer';
  return 'flash';
}

export function getGroupNameForDomain(domain: string): string {
  if (domain == 'light') return 'lights';
  else if (domain == 'cover') return 'covers';
  else if (domain == 'switch') return 'switches';
  else if (domain == 'climate') return 'climate';
  else if (domain == 'fan') return 'fans';
  else if (domain == 'vacuum') return 'vacuum';
  return domain;
}