

export interface CardConfig {
  include: string[];
  exclude: string[];
  discover_existing: boolean;
  title: boolean | string;
  show_header_toggle: boolean;
  display_options: {
    primary_info: (DisplayItem | string)[] | DisplayItem | string;
    secondary_info: (DisplayItem | string)[] | DisplayItem | string;
  };
  sort_by: string[] | string;
  customize: Record<string, any>;
}

export interface Timeslot {
  start: string;
  stop?: string;
  actions: Action[];
  conditions: {
    type: TConditionLogicType,
    items: Condition[]
  }
}

export interface Schedule {
  entries: ScheduleEntry[];
  entity_id?: string;
  next_entries: number[];
  timestamps: string[];
  start_date?: string;
  end_date?: string;
  repeat_type: TRepeatType;
  name?: string;
}

export interface ScheduleEntry {
  slots: Timeslot[];
  weekdays: TWeekday[],
}

export interface Action {
  //name: string;
  //icon: string;
  service: string;
  service_data: Record<string, any>;
  target: {
    entity_id?: string[] | string
  }
}

export enum TWeekday {
  Daily = 'Daily',
  Workday = 'Workday',
  Weekend = 'Weekend',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum TConditionLogicType {
  Any = 'or',
  All = 'and',
}

export enum TConditionMatchType {
  Equal = 'is',
  Unequal = 'not',
  Below = 'below',
  Above = 'above',
}

export interface Condition {
  entity_id: string;
  match_type: TConditionMatchType;
  value: string | number;
  attribute: string;
}

export enum DisplayItem {
  Name = 'name',
  RelativeTime = 'relative-time',
  AdditionalTasks = 'additional-tasks',
  Time = 'time',
  Days = 'days',
  Entity = 'entity',
  Action = 'action',
  Tags = 'tags',
  Default = 'default'
}

// export enum SelectorType {
//   Select = 'Select',
//   Number = 'Number'
// }

// export interface SelectOption {
//   value: string;
//   label?: string;
//   icons?: string;
// }

// interface SelectSelector {
//   type: SelectorType.Select,
//   options: SelectOption[],
//   default?: string
// }

// interface NumberSelector {
//   type: SelectorType.Number,
//   min: number,
//   max: number,
//   step: number,
//   default: number
// }

// export type Selector =
//   | SelectSelector
//   | NumberSelector


enum SchedulerEvent {
  ItemCreated = 'scheduler_item_created',
  ItemUpdated = 'scheduler_item_updated',
  ItemRemoved = 'scheduler_item_removed',
  TimerFinished = 'scheduler_timer_finished',
  TimerUpdated = 'scheduler_timer_updated',
}

export interface SchedulerEventData {
  schedule_id: string;
  event: SchedulerEvent;
}


export enum TRepeatType {
  Repeat = 'repeat',
  Pause = 'pause',
  Single = 'single',
}

export enum TimeMode {
  Fixed = 'fixed',
  Sunrise = 'sunrise',
  Sunset = 'sunset'
}

export type Time = {
  mode: TimeMode,
  hours: number,
  minutes: number
};