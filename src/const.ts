
import { IDictionary, IDomainConfig, IActionElement, IUserConfig, ILevelVariableConfig, IListVariableConfig, ITimeSlot, IEntry, EVariableType } from './types'
import { parseTimestamp, HoursPerDay, MinutesPerHour, EDayType } from './date-time'

export const CARD_VERSION = "1.5.2"

export const DefaultUserConfig: IUserConfig = {
  sunrise: null,
  sunset: null,
  title: true,
  am_pm: false,
  time_step: 10,
  temperature_unit: '',
  is_admin: true
}

export const DefaultDomainConfig: IDictionary<IDomainConfig> = {
  climate: {},
  cover: {},
  fan: {},
  light: {},
  switch: {},
}

export const DefaultGroupIcon = "folder-outline"
export const DefaultEntityIcon = "folder-outline"
export const DefaultActionIcon = "flash"
export const DiscoveredEntitiesGroup = "discovered"

export const DefaultEntry: IEntry = {
  time: { value: parseTimestamp('12:00') },
  days: { type: EDayType.Daily },
  action: '',
  entity: ''
}

export const RoutineAction: IActionElement = {
  id: 'create_routine',
  service: 'create_routine',
  name: 'create routine',
  icon: 'cog-refresh-outline',
  routine: false,
};


export const DefaultLevelVariableConfig: ILevelVariableConfig = {
  type: EVariableType.Level,
  field: '',
  unit: '',
  name: 'level',
  min: 0,
  max: 255,
  step: 1,
  optional: false,
}

export const DefaultListVariableConfig: IListVariableConfig = {
  type: EVariableType.List,
  field: '',
  name: 'option',
  options: [],
}

export const FieldTemperature = "temperature";
export const UnitPercent = "%";


export const DefaultRoutineSlots: ITimeSlot[] = [
  { startTime: parseTimestamp('00:00'), endTime: parseTimestamp('08:00') },
  { startTime: parseTimestamp('08:00'), endTime: parseTimestamp('16:00') },
  { startTime: parseTimestamp('16:00'), endTime: HoursPerDay * MinutesPerHour },
];