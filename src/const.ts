import { ActionConfig } from './types';
import { EDayType } from './date-time';
import { localize } from './localize/localize';

export const CARD_VERSION = '1.8.2';

export const DefaultTimeStep = 10;

export const DefaultGroupIcon = 'folder-outline';
export const DefaultEntityIcon = 'folder-outline';
export const DefaultActionIcon = 'flash';
export const DeadEntityName = "(unknown entity)";
export const DeadEntityIcon = "help-circle-outline";

export const FieldTemperature = 'temperature';
export const UnitPercent = '%';
export const CreateTimeScheme = 'make_scheme';

export const DayOptions = [
  { id: 1, name: localize('days_short.mon') },
  { id: 2, name: localize('days_short.tue') },
  { id: 3, name: localize('days_short.wed') },
  { id: 4, name: localize('days_short.thu') },
  { id: 5, name: localize('days_short.fri') },
  { id: 6, name: localize('days_short.sat') },
  { id: 7, name: localize('days_short.sun') },
];

export const DayTypeOptions = [
  { id: EDayType.Daily, name: localize('fields.day_type_daily') },
  { id: EDayType.Workday, name: localize('fields.day_type_workday') },
  { id: EDayType.Weekend, name: localize('fields.day_type_weekend') },
  { id: EDayType.Custom, name: localize('fields.day_type_custom') },
];

export enum EViews {
  Overview = 'OVERVIEW',
  NewSchedule = 'NEW_SCHEDULE',
  TimePicker = 'TIME_PICKER',
  TimeScheme = 'TIME_SCHEME',
  Options = 'OPTIONS',
}

export const TurnOnAction: ActionConfig = {
  service: "turn_on",
  icon: "power"
}

export const TurnOffAction: ActionConfig = {
  service: "turn_off",
  icon: "power-off"
}