import { deepCompare } from "../../lib/deep_compare";
import { computeDomain } from "../../lib/entity";
import {
  Action,
  ConditionConfig,
  Schedule,
  ScheduleStorageEntry,
  TConditionLogicType,
  TConditionMatchType,
  TRepeatType,
  TWeekday,
  Timeslot,
} from "../../types";

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
  condition_type?: "or" | "and";
  track_conditions?: boolean;
  actions: ServiceCall[];
}

export type WeekdayType = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "workday" | "weekend" | "daily";

export interface LegacySchedule {
  schedule_id?: string;
  weekdays: WeekdayType[];
  timeslots: LegacyTimeslot[];
  enabled: boolean;
  entity_id: string;
  timestamps: string[];
  next_entries: number[];
  repeat_type: TRepeatType;
  name?: string;
  tags?: string[];
  start_date?: string;
  end_date?: string;
}

export interface LegacyScheduleConfig {
  weekdays: WeekdayType[];
  timeslots: LegacyTimeslot[];
  repeat_type: TRepeatType;
  name?: string;
  tags: string[];
  start_date?: string;
  end_date?: string;
  schedule_id?: string;
}

const parseAction = (input: ServiceCall): Action => {
  return <Action>{
    service: input.service,
    service_data: input.service_data,
    target: {
      entity_id: input.entity_id ? input.entity_id : undefined,
    },
  };
};

const parseTimeslot = (input: LegacyTimeslot): Timeslot => {
  return <Timeslot>{
    start: input.start,
    stop: input.stop,
    actions: computeUniqueActions(input.actions.map(parseAction)),
    conditions: <ConditionConfig>{
      type: input.condition_type == "and" ? TConditionLogicType.And : TConditionLogicType.Or,
      items: input.conditions || [],
      track_changes: Boolean(input.track_conditions),
    },
  };
};
const parseWeekdays = (input: WeekdayType): TWeekday => {
  switch (input) {
    case "mon":
      return TWeekday.Monday;
    case "tue":
      return TWeekday.Tuesday;
    case "wed":
      return TWeekday.Wednesday;
    case "thu":
      return TWeekday.Thursday;
    case "fri":
      return TWeekday.Friday;
    case "sat":
      return TWeekday.Saturday;
    case "sun":
      return TWeekday.Sunday;
    case "workday":
      return TWeekday.Workday;
    case "weekend":
      return TWeekday.Weekend;
    default:
      return TWeekday.Daily;
  }
};

export const convertLegacySchedule = (input: LegacySchedule): ScheduleStorageEntry => {
  return <ScheduleStorageEntry>{
    ...Object.fromEntries(Object.entries(input).filter(([key]) => !["slots", "weekdays", ""].includes(key))),
    entries: [
      {
        slots: input.timeslots.map(parseTimeslot),
        weekdays: input.weekdays.map(parseWeekdays),
      },
    ],
  };
};

const computeUniqueActions = (actions: Action[]): Action[] => {
  //combine entityIds of different actions
  if (actions.length == 1) return actions;

  if (actions.every((e) => deepCompare({ ...e, target: undefined }, { ...actions[0], target: undefined }))) {
    const entityIds: string[] = [
      ...new Set(actions.map((e) => e.target?.entity_id).filter((e) => e !== undefined) as string[]),
    ];
    let output: Action = { ...actions[0], target: { entity_id: entityIds.length ? entityIds : undefined } };
    return [output];
  }
  return actions;
};
