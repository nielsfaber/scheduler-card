
import { IUserConfig, ILevelVariableConfig, IListVariableConfig, IEntry, EVariableType } from './types'
import { parseTimestamp, EDayType, MinutesPerDay } from './date-time'
import { localize } from './localize/localize'

export const CARD_VERSION = "1.7.5"

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
export const CreateTimeScheme = "make_scheme"

export const DayOptions = [
  { id: 1, name: localize('days_short.mon') },
  { id: 2, name: localize('days_short.tue') },
  { id: 3, name: localize('days_short.wed') },
  { id: 4, name: localize('days_short.thu') },
  { id: 5, name: localize('days_short.fri') },
  { id: 6, name: localize('days_short.sat') },
  { id: 7, name: localize('days_short.sun') }
];

export const DayTypeOptions = [
  { id: EDayType.Daily, name: localize('fields.day_type_daily') },
  { id: EDayType.Workday, name: localize('fields.day_type_workday') },
  { id: EDayType.Weekend, name: localize('fields.day_type_weekend') },
  { id: EDayType.Custom, name: localize('fields.day_type_custom') }
];

export enum EViews {
  Overview = "OVERVIEW",
  NewSchedule = "NEW_SCHEDULE",
  TimePicker = "TIME_PICKER",
  TimeScheme = "TIME_SCHEME",
  Options = "OPTIONS",
}
