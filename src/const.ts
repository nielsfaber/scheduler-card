
import { IUserConfig, ILevelVariableConfig, IListVariableConfig, IEntry, EVariableType } from './types'
import { parseTimestamp, EDayType, MinutesPerDay } from './date-time'

export const CARD_VERSION = "1.6.2"

export const DefaultUserConfig: IUserConfig = {
  sunrise: null,
  sunset: null,
  title: true,
  am_pm: false,
  time_step: 10,
  temperature_unit: '',
  is_admin: true
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

export const DefaultTimelineEntries: IEntry[] = [
  {
    time: { value: parseTimestamp('00:00') },
    endTime: { value: parseTimestamp('08:00') },
    days: { type: EDayType.Daily },
    action: '',
    entity: ''
  },
  {
    time: { value: parseTimestamp('08:00') },
    endTime: { value: parseTimestamp('16:00') },
    days: { type: EDayType.Daily },
    action: '',
    entity: ''
  },
  {
    time: { value: parseTimestamp('16:00') },
    endTime: { value: MinutesPerDay },
    days: { type: EDayType.Daily },
    action: '',
    entity: ''
  }
];

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
export const CreateTimeline = "create_timeline"

// export const DefaultRoutineSlots: IEntry[] = [
//   { startTime: parseTimestamp('00:00'), endTime: parseTimestamp('08:00') },
//   { startTime: parseTimestamp('08:00'), endTime: parseTimestamp('16:00') },
//   { startTime: parseTimestamp('16:00'), endTime: HoursPerDay * MinutesPerHour },
// ];