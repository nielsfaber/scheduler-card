import { LovelaceCardEditor, LovelaceCardConfig } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'scheduler-card-editor': LovelaceCardEditor;
  }
}

export interface Dictionary<TValue> {
  [id: string]: TValue;
}
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export interface ServiceCall {
  service: string;
  entity_id?: string;
  service_data?: Dictionary<any>;
}

export interface Action {
  name?: string;
  service: string;
  service_data?: Dictionary<any>;
  icon?: string;
  variables?: VariableDictionary;
  supported_feature?: number;
}

// //user configured action
// export interface ActionConfig {
//   name?: string;
//   service: string;
//   service_data?: Dictionary<any>;
//   icon?: string;
//   variables?: VariableDictionary;
//   supported_feature?: number;
// }

// export interface ActionElement extends ActionConfig {
//   id: string;
//   name?: string;
//   service: string;
//   service_data: Dictionary<any>;
//   icon?: string;
//   variables: VariableDictionary;
// }

export interface Condition {
  entity_id: string;
  match_type: EConditionMatchType;
  value: string | number;
  attribute: string;
}

export interface Timeslot {
  start: string;
  stop?: string;
  conditions?: Condition[];
  condition_type?: 'or' | 'and';
  track_conditions?: boolean;
  actions: ServiceCall[];
}

export type WeekdayType = ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'workday' | 'weekend' | 'daily')[];

export interface Schedule {
  schedule_id?: string;
  weekdays: WeekdayType;
  timeslots: Timeslot[];
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

export interface ScheduleConfig {
  weekdays: WeekdayType;
  timeslots: Timeslot[];
  repeat_type: ERepeatType;
  name?: string;
  tags: string[];
  start_date?: string;
  end_date?: string;
}

export enum ERepeatType {
  Repeat = 'repeat',
  Pause = 'pause',
  Single = 'single',
}

/* groups */

export interface Group {
  entities: string[];
  name: string;
  icon: string;
}

export interface GroupConfig {
  name: string;
  icon?: string;
  include?: string[];
  exclude?: string[];
}

/* entities */

export interface EntityElement {
  id: string;
  name: string;
  icon?: string;
  exclude_actions?: string[];
}

export interface EntityConfig {
  name?: string;
  icon?: string;
  actions?: Action[];
  exclude_actions?: string[];
  states?: string[] | { min: number; max: number; step?: number; unit?: string };
}

/* action variables */

export enum EVariableType {
  Level = 'LEVEL',
  List = 'LIST',
  Text = 'TEXT',
}

export interface Variable {
  name?: string;
  type: EVariableType;
  supported_feature?: number;
}

export interface ListVariableOption {
  value: string;
  icon?: string;
  name?: string;
}

export interface ListVariable extends Variable {
  options: ListVariableOption[];
}

export interface LevelVariable extends Variable {
  unit: string;
  min: number;
  max: number;
  step: number;
  scale_factor: number;
  optional: boolean;
}

export interface TextVariable extends Variable {
  multiline: boolean;
}

export type VariableDictionary = Dictionary<LevelVariable | ListVariable | TextVariable>;

/* entries */

export interface Entry {
  time: Time;
  endTime?: Time;
  days: Days;
  action: string;
  entity: string;
  variables: VariableDictionary;
  conditions?: ConditionConfig;
  options?: OptionConfig;
}

export interface ImportedEntry {
  time: Time;
  endTime?: Time;
  days: Days;
  actions: number[];
  conditions?: {
    type: EConditionType;
    items: number[];
  };
  options?: number[];
}

/* config */

export interface CardConfig extends LovelaceCardConfig {
  discover_existing: boolean;
  standard_configuration: boolean;
  title: boolean | string;
  time_step: number;
  show_header_toggle: boolean;
  show_add_button?: boolean;
  display_options: {
    primary_info: string[] | string;
    secondary_info: string[] | string;
    icon: string;
  };
  include: string[];
  exclude: string[];
  groups: GroupConfig[];
  customize: Dictionary<EntityConfig>;
  tags?: string[] | string;
  exclude_tags?: string[] | string;
  sort_by: string[] | string;
}

/* interface */

export interface HassEntry {
  time?: Time;
  days?: number[];
  actions: number[];
  conditions?: {
    type: 'or' | 'and';
    list: number[];
  };
  options?: number[];
}

/* other */

export enum EConditionMatchType {
  Equal = 'is',
  Unequal = 'not',
  Below = 'below',
  Above = 'above',
}

export enum EConditionType {
  Any = 'or',
  All = 'and',
}

export interface ConditionConfig {
  type: EConditionType;
  items: Condition[];
}

export interface OptionConfig {
  run_once?: boolean;
}

export enum ETimeEvent {
  Sunrise = 'sunrise',
  Sunset = 'sunset',
}

export interface Time {
  value: number;
  event?: ETimeEvent;
}

export enum EDayType {
  Daily = 'DAILY',
  Workday = 'WORKDAY',
  Weekend = 'WEEKEND',
  Custom = 'CUSTOM',
}

export interface Days {
  type: EDayType;
  custom_days?: number[];
}

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

export interface TagEntry {
  name: string;
  schedules: string[];
}
