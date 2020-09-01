
export interface IDictionary<TValue> {
  [id: string]: TValue;
}

export interface IButtonEntry {
  icon?: string,
  name: string,
  key: string,
}

export interface IActionConfigEntry {
  icon?: string,
  name?: string,
  service: string,
  service_data?: IDictionary<any>
}

export interface IEntityConfigEntry {
  id?: string,
  icon?: string,
  name?: string,
  actions: IActionConfigEntry[]
}

export interface IConfig {
  groups?: IDictionary<IGroupConfigEntry>,
  domains?: IDictionary<IEntityConfigEntry>,
  entities?: IDictionary<IEntityConfigEntry>,
  discoverExisting?: Boolean,
  standardConfiguration?: Boolean,
}

export interface IGroupConfigEntry {
  icon?: string,
  name?: string,
  domains?: string[],
  entities?: string[],
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
  sun: boolean
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
}