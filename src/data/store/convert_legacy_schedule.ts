import { HomeAssistant } from "../../lib/types";
import { Action, Condition, Schedule, TConditionLogicType, TConditionMatchType, TWeekday, Timeslot } from "../../types";


interface Dictionary<TValue> {
  [id: string]: TValue;
}

export interface ServiceCall {
  service: string;
  entity_id?: string;
  service_data?: Dictionary<any>;
}

interface LegacyCondition {
  entity_id: string;
  match_type: TConditionMatchType;
  value: string | number;
  attribute: string;
}

export interface LegacyTimeslot {
  start: string;
  stop?: string;
  conditions?: LegacyCondition[];
  condition_type?: 'or' | 'and';
  track_conditions?: boolean;
  actions: ServiceCall[];
}

export type WeekdayType = ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'workday' | 'weekend' | 'daily');

export enum ERepeatType {
  Repeat = 'repeat',
  Pause = 'pause',
  Single = 'single',
}

export interface LegacySchedule {
  schedule_id?: string;
  weekdays: WeekdayType[];
  timeslots: LegacyTimeslot[];
  enabled: boolean;
  entity_id: string;
  timestamps: string[];
  next_entries: number[];
  repeat_type: ERepeatType;
  name?: string;
  tags?: string[];
  start_date?: string;
  end_date?: string;
}


export interface LegacyScheduleConfig {
  weekdays: WeekdayType[];
  timeslots: LegacyTimeslot[];
  repeat_type: ERepeatType;
  name?: string;
  tags: string[];
  start_date?: string;
  end_date?: string;
}



const parseAction = (input: ServiceCall): Action => {
  return <Action>{
    service: input.service,
    service_data: input.service_data,
    target: {
      entity_id: input.entity_id
    }
  }
}

const parseTimeslot = (input: LegacyTimeslot): Timeslot => {
  return <Timeslot>{
    start: input.start,
    stop: input.stop,
    actions: input.actions.map(parseAction),
    conditions: {
      type: input.condition_type == 'and' ? TConditionLogicType.All : TConditionLogicType.Any,
      items: (input.conditions || [])
    }
  }
}
const parseWeekdays = (input: WeekdayType): TWeekday => {
  switch (input) {
    case 'mon':
      return TWeekday.Monday;
    case 'tue':
      return TWeekday.Tuesday;
    case 'wed':
      return TWeekday.Wednesday;
    case 'thu':
      return TWeekday.Thursday;
    case 'fri':
      return TWeekday.Friday;
    case 'sat':
      return TWeekday.Saturday;
    case 'sun':
      return TWeekday.Sunday;
    case 'workday':
      return TWeekday.Workday;
    case 'weekend':
      return TWeekday.Weekend;
    default:
      return TWeekday.Daily;
  }
}


export const convertLegacySchedule = (input: LegacySchedule): Schedule & { entity_id: string } => {
  return <Schedule & { entity_id: string }>{
    entries: [
      {
        slots: input.timeslots.map(parseTimeslot),
        weekdays: input.weekdays.map(parseWeekdays),
      }
    ],
    entity_id: input.entity_id,
    next_entries: input.next_entries,
    timestamps: input.timestamps
  };
}


