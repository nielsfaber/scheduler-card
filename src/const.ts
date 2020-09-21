
import { IUserSelection, IUserConfig } from './types'
import { parseTimestamp } from './date-time'

export const CARD_VERSION = "1.3.3"


// export const DefaultUserSelection: IUserSelection = {
//   group: '',
//   entity: '',
//   action: '',
//   newItem: false,
//   actionConfirmed: false,
//   editItem: '',
//   time: { value: parseTimestamp('12:00') },
//   days: [],
//   daysType: 'daily',
//   levelEnabled: false,
//   level: 0
// }

export const DefaultUserSelection: IUserSelection = {
  group: 'climate',
  entity: 'climate.mqtt_hvac',
  action: 'plan_sequence',
  newItem: true,
  actionConfirmed: true,
  editItem: '',
  time: { value: parseTimestamp('12:00') },
  days: [],
  daysType: 'daily',
  levelEnabled: false,
  level: 0
}

export const DefaultUserConfig: IUserConfig = {
  sunrise: null,
  sunset: null,
  title: true,
  am_pm: false,
  time_step: 10,
}

