

export interface CardConfig {
  include?: string[];
  exclude?: string[];
  discover_existing?: boolean;
  title?: boolean | string;
  show_header_toggle?: boolean;
  show_toggle_switches?: boolean;
  default_editor?: EditorMode;
  time_step?: number;
  display_options?: {
    primary_info?: (DisplayItem | string)[] | DisplayItem | string;
    secondary_info?: (DisplayItem | string)[] | DisplayItem | string;
    icon?: string;
  };
  sort_by?: string[] | string;
  customize?: CustomConfig;
  tags?: string[] | string;
  exclude_tags?: string[] | string;
  show_add_button?: boolean;
}

export enum EditorMode {
  Single = 'single',
  Scheme = 'scheme',
}
export interface ConditionConfig {
  type: TConditionLogicType,
  items: Condition[],
  track_changes: boolean

}

export interface Timeslot {
  start: string;
  stop?: string;
  actions: Action[];
  conditions: ConditionConfig
}

export interface Schedule {
  entries: ScheduleEntry[];
  entity_id?: string;
  schedule_id?: string;
  next_entries: number[] | [];
  timestamps: string[];
  start_date?: string;
  end_date?: string;
  repeat_type: TRepeatType;
  name?: string;
  tags?: string[];
  enabled: boolean;
}
export type ScheduleStorageEntry = Schedule & { entity_id: string, schedule_id: string };

export interface ScheduleEntry {
  slots: Timeslot[];
  weekdays: TWeekday[],
}

/** HA-style target selection, mirroring the semantics of
 * `selector: { target: {...} }` in HA's automation/script editor.
 * Values may be a scalar or a list (HA components emit both);
 * use normalizeTarget() before persisting or comparing. */
export interface Target {
  entity_id?: string[] | string;
  device_id?: string[] | string;
  area_id?: string[] | string;
  floor_id?: string[] | string;
  label_id?: string[] | string;
}

export const TARGET_KEYS = ['entity_id', 'device_id', 'area_id', 'floor_id', 'label_id'] as const;
export type TargetKey = typeof TARGET_KEYS[number];

/** include/exclude entity patterns stamped into a schedule by the card
 * that saved it; constrains what the dynamic parts of `target` may resolve
 * to at execution time */
export interface TargetFilter {
  include?: string[];
  exclude?: string[];
}

export interface Action {
  service: string;
  service_data: Record<string, any>;
  target?: Target;
  target_filter?: TargetFilter;
}

export enum TWeekday {
  Daily = 'daily',
  Workday = 'workday',
  Weekend = 'weekend',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum TConditionLogicType {
  Or = 'or',
  And = 'and',
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

export type CustomConfig = Record<string, CustomEntityConfig>;

export interface CustomEntityConfig {
  icon?: string;
  name?: string;
  actions?: CustomActionConfig[],
  exclude_actions?: string[]
  states?: string[] | { min: number, max: number, unit?: string, step?: number };
}


export type VariableConfig = {
  name?: string;
  options: {
    value: string;
    icon?: string;
    name?: string;
  }[]
} | {
  name?: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  scale_factor: number;
  optional: boolean;
} | {
  name?: string;
};

export interface CustomActionConfig extends Action {
  name?: string;
  icon?: string;
  service: string;
  service_data: Record<string, any>;
  variables?: Record<string, VariableConfig>;
  target?: {
    entity_id?: string[] | string,
    domain?: string,
  }
}