
export interface IDictionary<TValue> {
  [id: string]: TValue;
}

export interface IActionConfig {
  name?: string,
  service: string,
  service_data?: IDictionary<any>,
  icon?: string,
  variable?: IActionVariableConfig
}

export interface IActionElement extends IActionConfig {
  id: string,
  name: string,
  service: string,
  service_data?: IDictionary<any>,
  icon: string,
  variable?: IActionVariable
}

export interface IEntityConfig {
  icon?: string,
  name?: string,
  actions: IActionConfig[]
}

export interface IDomainConfig {
  icon?: string,
  name?: string,
  actions: IActionConfig[]
}
export interface IEntityElement extends IEntityConfig {
  id: string,
  name: string,
  icon: string
  actions: IActionElement[]
}

export interface IGroupConfig {
  domains?: string[],
  entities?: string[],
  name?: string,
  icon?: string,
}

export interface IGroupElement extends IGroupConfig {
  id: string,
  domains: string[],
  entities: string[],
  name: string,
  icon?: string,
}
export interface IConfig {
  groups?: IDictionary<IGroupConfig>,
  domains?: IDictionary<IDomainConfig>,
  entities?: IDictionary<IEntityConfig>,
  discoverExisting?: Boolean,
  standardConfiguration?: Boolean,
  title?: Boolean | string
}

export interface IConfigFull extends IConfig {
  groups: IDictionary<IGroupConfig>,
  domains: IDictionary<IDomainConfig>,
  entities: IDictionary<IEntityConfig>,
  discoverExisting: Boolean,
  standardConfiguration: Boolean,
  title: Boolean | string
}

export interface IUserSelection {
  group?: string,
  entity: string,
  action: string,
  newItem: boolean,
  actionConfirmed: boolean,
  editItem?: string,
  timeHours: string,
  timeMinutes: string,
  days: number[],
  daysType: string,
  sun: boolean,
  levelEnabled: boolean,
  level: number
}

export interface IHassEntry {
  time?: string,
  event?: string,
  offset?: string,
  days?: number[],
  actions: number[]
}

export interface IHassAction {
  service: string,
  entity: string,
  service_data?: IDictionary<any>
}

export interface IHassData {
  entries: IHassEntry[],
  actions: IHassAction[]
}

export interface IScheduleEntry {
  id: string,
  enabled: boolean,
  entries: IHassEntry[],
  actions: IScheduleAction[],
}

export interface IScheduleAction {
  entity: string,
  action: string,
  level?: number
}

export interface IActionVariableConfig {
  field: string,
  name?: string,
  min?: number,
  max?: number,
  step?: number
  optional?: boolean,
  showPercentage?: boolean
}
export interface IActionVariable {
  field: string,
  unit: string,
  name: string,
  min: number,
  max: number,
  step: number,
  optional: boolean,
  showPercentage: boolean
}