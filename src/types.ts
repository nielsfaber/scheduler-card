

import { ITime, IDays } from './date-time';
import { LovelaceCardConfig } from 'custom-card-helpers';

export interface IDictionary<TValue> {
  [id: string]: TValue;
}
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;


/* hass objects */

export interface IHassEntity {
  entity_id: string,
  state: any,
  attributes: {
    friendly_name?: string,
    icon?: string,
    supported_features?: number,
    actions?: IHassAction[],
    entries?: string[],
    next_trigger?: string,
    conditions?: ICondition[],
    options?: IOptionConfig
  }
}

/* groups */

export interface IGroupElement {
  id: string,
  entities: string[],
  name: string,
  icon: string,
}

export interface IGroupConfig {
  name: string,
  icon: string,
  include: string[],
  exclude?: string[],
}

/* entities */

export interface IEntityElement extends IEntityConfig {
  id: string,
  name: string,
  icon: string,
  actions: IActionElement[],
  states?: string[] | { min: number, max: number, step?: number, unit?: string }
}

export interface IEntityConfig {
  name?: string,
  icon?: string,
  actions?: IActionConfig[],
  states?: string[] | { min: number, max: number, step?: number, unit?: string }
}

/* actions */

export interface IActionConfig {
  name?: string,
  service: string,
  service_data?: IDictionary<any>,
  icon?: string,
  variable?: AtLeast<ILevelVariableConfig | IListVariableConfig, 'field'>,
  supported_feature?: number,
  routine?: boolean
}

export interface IActionElement extends IActionConfig {
  id: string,
  name: string,
  service: string,
  service_data?: IDictionary<any>,
  icon: string,
  variable?: ILevelVariableConfig | IListVariableConfig,
  routine: boolean
  supported_feature?: number,
}

/* action variables */


export enum EVariableType {
  Level = "LEVEL",
  List = "LIST",
}

// export interface IVariable {
//   value: number | string | null,
//   enabled?: boolean,
//   type: EVariableType
// }

export interface ILevelVariable {
  value: number | null,
  enabled: boolean,
  type: EVariableType
}

export interface IListVariable {
  value: string | null,
  type: EVariableType
}

export interface ILevelVariableConfig {
  field: string,
  unit: string,
  name: string,
  min: number,
  max: number,
  step: number,
  optional: boolean,
  supported_feature?: number,
  type: EVariableType,
}

export interface IListVariableOption {
  value: string,
  icon?: string,
  name?: string,
}

export interface IListVariableConfig {
  field: string,
  name: string,
  options: IListVariableOption[],
  supported_feature?: number,
  type: EVariableType,
}

/* entries */

export interface IEntry {
  time: ITime,
  endTime?: ITime,
  days: IDays,
  action: string,
  entity: string,
  variable?: ILevelVariable | IListVariable,
  conditions?: IConditionConfig,
  options?: IOptionConfig
}

export interface IScheduleEntry {
  id: string,
  enabled: boolean,
  entries: IEntry[],
  next_trigger: string | undefined,
  name?: string,
}

/* config */

export interface IUserConfig {
  sunrise: number | null,
  sunset: number | null,
  title: boolean | string,
  am_pm: boolean,
  time_step: number,
  temperature_unit: string
  is_admin: boolean
}



export interface ICardConfig extends LovelaceCardConfig {
  discover_existing?: boolean,
  standard_configuration?: boolean,
  title?: boolean | string,
  am_pm?: boolean,
  time_step?: number,
  include?: string[],
  exclude?: string[],
  groups?: IGroupConfig[],
  customize?: IDictionary<IEntityConfig>,
}


/* interface */

export interface IHassAction {
  service: string,
  entity: string,
  service_data?: IDictionary<any>
}

export interface IHassEntry {
  time?: ITime,
  days?: number[],
  actions: number[],
  conditions?: {
    type: "or" | "and",
    list: number[]
  },
  options?: number[]
}

export interface IHassData {
  entries: IHassEntry[],
  actions: IHassAction[],
  conditions?: ICondition[]
}

/* other */


export enum EConditionMatchType {
  Equal = "is",
  Unequal = "not",
  Below = "below",
  Above = "above"
}

export interface ICondition {
  entity: string,
  match_type: EConditionMatchType,
  state: string | number
}

export enum EConditionType {
  Any = "or",
  All = "and",
}

export interface IConditionConfig {
  type: EConditionType,
  items: ICondition[],
}

export interface IOptionConfig {
  run_once?: boolean,
}

export interface IOptionPanelCfg {
  conditions?: IConditionConfig,
  friendly_name?: string,
  options?: IOptionConfig,
}