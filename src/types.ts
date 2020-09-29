import { ITime, IDays } from './date-time';

export interface IDictionary<TValue> {
  [id: string]: TValue;
}
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/* hass objects */

export interface IHassEntity {
  entity_id: string;
  state: any;
  attributes: {
    friendly_name?: string;
    icon?: string;
    supported_features?: number;
    actions?: IHassAction[];
    entries?: string[];
  };
}

/* groups */

export interface IGroupElement {
  id: string;
  domains: string[];
  entities: string[];
  name: string;
  icon: string;
}

/* entities */

export interface IEntityElement extends IEntityConfig {
  id: string;
  name: string;
  icon: string;
  actions: IActionElement[];
}

export interface IEntityConfig {
  name?: string;
  icon?: string;
  actions?: IActionConfig[];
}

export interface IDomainConfig {
  icon?: string;
  name?: string;
  actions?: IActionConfig[];
  include?: string[];
  exclude?: string[];
}

/* actions */

export interface IActionConfig {
  name?: string;
  service: string;
  service_data?: IDictionary<any>;
  icon?: string;
  variable?: AtLeast<ILevelVariableConfig | IListVariableConfig, 'field'>;
  supported_feature?: number;
  routine?: boolean;
}

export interface IActionElement extends IActionConfig {
  id: string;
  name: string;
  service: string;
  service_data?: IDictionary<any>;
  icon: string;
  variable?: ILevelVariableConfig | IListVariableConfig;
  routine: boolean;
  supported_feature?: number;
}

/* action variables */

export enum EVariableType {
  Level = 'LEVEL',
  List = 'LIST',
}

// export interface IVariable {
//   value: number | string | null,
//   enabled?: boolean,
//   type: EVariableType
// }

export interface ILevelVariable {
  value: number | null;
  enabled: boolean;
  type: EVariableType;
}

export interface IListVariable {
  value: string | null;
  type: EVariableType;
}

export interface ILevelVariableConfig {
  field: string;
  unit: string;
  name: string;
  min: number;
  max: number;
  step: number;
  optional: boolean;
  supported_feature?: number;
  type: EVariableType;
}

export interface IListVariableOption {
  value: string;
  icon?: string;
  name?: string;
}

export interface IListVariableConfig {
  field: string;
  name: string;
  options: IListVariableOption[];
  supported_feature?: number;
  type: EVariableType;
}

/* entries */

export interface IEntry {
  time: ITime;
  days: IDays;
  action: string;
  entity: string;
  variable?: ILevelVariable | IListVariable;
}

export interface ITimeSlot {
  startTime: number;
  endTime: number;
  action?: string;
  variable?: ILevelVariable | IListVariable;
}

export interface IScheduleEntry {
  id: string;
  enabled: boolean;
  entries: IEntry[];
}

/* config */

export interface IConfig {
  groups?: IDictionary<Partial<IGroupElement>>;
  domains?: IDictionary<IDomainConfig>;
  entities?: IDictionary<IEntityConfig>;
  discover_existing?: boolean;
  standard_configuration?: boolean;
}

export interface IUserConfig {
  sunrise: number | null;
  sunset: number | null;
  title: boolean | string;
  am_pm: boolean;
  time_step: number;
  temperature_unit: string;
  is_admin: boolean;
}

/* interface */

export interface IHassAction {
  service: string;
  entity: string;
  service_data?: IDictionary<any>;
}

export interface IHassEntry {
  time?: ITime;
  days?: number[];
  actions: number[];
}

export interface IHassData {
  entries: IHassEntry[];
  actions: IHassAction[];
}

// export interface IActionConfig {
//   name?: string,
//   service: string,
//   service_data?: IDictionary<any>,
//   icon?: string,
//   variable?: AtLeast<TActionVariableConfig, 'field'>,
//   supported_feature?: number,
//   routine?: boolean
// }

// export interface IEntityConfig {
//   icon?: string,
//   name?: string,
//   actions: IActionConfig[]
// }

// export interface IDomainElement {
//   icon: string,
//   name: string,
//   actions: IActionConfig[]
//   include: string[],
//   exclude: string[]
// }

// export interface IConfigFull extends IConfig {
//   groups: IDictionary<Partial<IGroupElement>>,
//   domains: IDictionary<Partial<IDomainElement>>,
//   entities: IDictionary<IEntityConfig>,
//   discover_existing: boolean,
//   standard_configuration: boolean,
// }

// // export interface IUserSelection {
// //   group?: string,
// //   entity: string,
// //   action: string,
// //   newItem: boolean,
// //   actionConfirmed: boolean,
// //   editItem?: string,
// //   time: ITime,
// //   daysCustom: number[],
// //   daysType: string,
// //   levelEnabled: boolean | null,
// //   level: number | null,
// //   plannerSlots?: ITimeSlot[],
// //   activePlannerSlot?: number | null
// // }

// export interface IUserSelection {
//   group?: string,
//   entry: Partial<IEntry>
// }

// export interface IHassEntry {
//   time?: ITime,
//   days?: number[],
//   actions: number[]
// }

// export interface IHassAction {
//   service: string,
//   entity: string,
//   service_data?: IDictionary<any>
// }

// export interface IHassData {
//   entries: IHassEntry[],
//   actions: IHassAction[]
// }

// // export interface IActionVariableConfig {
// //   field: string,
// //   name?: string,
// //   min?: number,
// //   max?: number,
// //   step?: number
// //   optional?: boolean,
// //   show_percentage?: boolean
// // }

// // export interface IActionVariable {
// //   field: string,
// //   unit: string,
// //   name: string,
// //   min: number,
// //   max: number,
// //   step: number,
// //   optional: boolean,
// //   show_percentage: boolean
// // }

// export interface IScheduleEntry {
//   id: string,
//   enabled: boolean,
//   entries: IEntry[],
// }
