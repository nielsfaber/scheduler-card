import { deepCompare } from "../../lib/deep_compare";
import { computeDomain } from "../../lib/entity";
import { Action, ConditionConfig, Schedule, ScheduleStorageEntry, TConditionLogicType, TConditionMatchType, TRepeatType, TWeekday, Target, TargetFilter, TARGET_KEYS, Timeslot } from "../../types";
import { normalizeTarget } from "../actions/target";


interface Dictionary<TValue> {
  [id: string]: TValue;
}

export interface ServiceCall {
  service: string;
  /** legacy flat single-entity target (pre-v5 storage) */
  entity_id?: string;
  /** HA-style target object (storage v5+) */
  target?: Target;
  /** include/exclude patterns constraining dynamic target resolution */
  target_filter?: TargetFilter | null;
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
  // v5+ storage: target object as-is; pre-v5: wrap flat entity_id
  const target = normalizeTarget(input.target)
    || normalizeTarget({ entity_id: input.entity_id ? [input.entity_id] : undefined });
  return <Action>{
    service: input.service,
    service_data: input.service_data,
    target: target || {},
    ...(input.target_filter ? { target_filter: input.target_filter } : {})
  }
}

const parseTimeslot = (input: LegacyTimeslot): Timeslot => {
  return <Timeslot>{
    start: input.start,
    stop: input.stop,
    actions: computeUniqueActions(input.actions.map(parseAction)),
    conditions: <ConditionConfig>{
      type: input.condition_type == 'and' ? TConditionLogicType.And : TConditionLogicType.Or,
      items: (input.conditions || []),
      track_changes: Boolean(input.track_conditions)
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


export const convertLegacySchedule = (input: LegacySchedule): ScheduleStorageEntry => {
  return <ScheduleStorageEntry>{
    ...Object.fromEntries(Object.entries(input).filter(([key]) => !['slots', 'weekdays', ''].includes(key))),
    entries: [
      {
        slots: input.timeslots.map(parseTimeslot),
        weekdays: input.weekdays.map(parseWeekdays),
      }
    ]
  };
}


const computeUniqueActions = (actions: Action[]): Action[] => {
  //combine the targets of actions that are otherwise identical
  //(legacy storage kept one action per targeted entity); actions with
  //differing service/service_data remain separate list entries
  if (actions.length <= 1) return actions;

  let groups: Action[][] = [];
  actions.forEach(action => {
    const group = groups.find(g =>
      deepCompare({ ...g[0], target: undefined, target_filter: undefined }, { ...action, target: undefined, target_filter: undefined })
    );
    if (group) group.push(action);
    else groups.push([action]);
  });

  return groups.map(group => {
    if (group.length == 1) return group[0];
    let merged: Target = {};
    TARGET_KEYS.forEach(key => {
      const values = [...new Set(group.map(e => [e.target?.[key] || []].flat()).flat())];
      if (values.length) merged = { ...merged, [key]: values.sort() };
    });
    let output: Action = { ...group[0], target: merged };
    const filter = group.map(e => e.target_filter).find(e => e);
    if (filter) output = { ...output, target_filter: filter };
    return output;
  });
}