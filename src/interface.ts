


import { Config } from "./config";
import { IScheduleEntry, IEntry, IHassAction, IHassData, IActionElement, IHassEntity, ILevelVariable, IListVariable, IHassEntry, EVariableType, ICondition, EConditionType, EConditionMatchType, IOptionConfig, } from "./types";
import { getDomainFromEntityId, IsEqual, extend, pick } from "./helpers";
import { parseTimestamp, formatTime, ETimeEvent, EDayType, timeEventToString } from "./date-time";
import { exportVariableServiceData, importHassAction, reverseParseAction } from "./action";

const EntryPattern = /^([0-9]+)?D([0-7]+)?T([0-9SRDUW]+)T?([0-9SRDUW]+)?A([A0-9]+)+(C([C0-9]+))?(F([F0-9]+))?$/
const ActionPattern = /^(A([0-9]+))+$/
const SunTimePattern = /^([0-9]{4})?([SRDUW]{2})([0-9]{4})?$/


export function ImportFromHass(entity: IHassEntity, config: Config) {
  if (!entity.attributes.actions || !entity.attributes.entries) return null;
  let actions = entity.attributes.actions.map(hassAction => {
    let actionCfg = importHassAction(hassAction);
    if (!config.FindEntity(actionCfg.entity)) return null;
    let actions = config.GetActionsForEntity(actionCfg.entity);
    let action = reverseParseAction(actionCfg, actions);
    if (!action) return null;

    let output: Partial<IEntry> = {
      entity: actionCfg.entity,
      action: (action as IActionElement).id
    };

    if (action.variable && action.variable.type == EVariableType.Level) {
      if (action.variable.type == EVariableType.Level) {
        let variable: ILevelVariable;
        if (actionCfg.service_data && action.variable.field in actionCfg.service_data) {
          variable = { type: EVariableType.Level, value: Number(actionCfg.service_data[action.variable.field]), enabled: true };
        }
        else variable = { type: EVariableType.Level, value: null, enabled: false };
        output = extend(output, <IEntry>{ variable: variable });
      }
    } else if (action.variable && action.variable.type == EVariableType.List) {
      let variable: IListVariable;
      if (actionCfg.service_data && action.variable.field in actionCfg.service_data) {
        variable = { type: EVariableType.List, value: String(actionCfg.service_data[action.variable.field]) };
      }
      else variable = { type: EVariableType.List, value: null };
      output = extend(output, <IEntry>{ variable: variable });
    }
    return output;
  });

  let conditions: ICondition[] = entity.attributes.conditions || [];
  let options: IOptionConfig = entity.attributes.options || {};

  let entries: IEntry[] = [];
  entity.attributes.entries.forEach(entry => {
    let res = EntryPattern.exec(entry);
    let entryCfg: Partial<IEntry> = {}

    if (res![1]) {
      let dayType = res![1];
      if (dayType == "0") Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Daily } });
      else if (dayType == "15") Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Workday } });
      else if (dayType == "67") Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Weekend } });
      else Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Daily } }); //fallback case
    }
    else {
      let dayList = res![2].split("").map(Number);
      dayList.sort();
      if (dayList.length == 1 && dayList[0] == 0) Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Daily } });
      else Object.assign(entryCfg, <IEntry>{ days: { type: EDayType.Custom, custom_days: dayList.filter(e => e != 0) } });
    }

    let isSunTime = SunTimePattern.exec(res![3]);
    if (!isSunTime) Object.assign(entryCfg, <IEntry>{ time: { value: parseTimestamp(res![3]) } });
    else Object.assign(entryCfg, <IEntry>{
      time: {
        event: isSunTime![2] == "SR" ? ETimeEvent.Sunrise : ETimeEvent.Sunset,
        value: isSunTime![1] ? -parseTimestamp(isSunTime![1]) : parseTimestamp(isSunTime![3])
      }
    });

    if (res![4]) {
      isSunTime = SunTimePattern.exec(res![4]);
      if (!isSunTime) Object.assign(entryCfg, <IEntry>{ endTime: { value: parseTimestamp(res![4]) } });
      else Object.assign(entryCfg, <IEntry>{
        endTime: {
          event: isSunTime![2] == "SR" ? ETimeEvent.Sunrise : ETimeEvent.Sunset,
          value: isSunTime![1] ? -parseTimestamp(isSunTime![1]) : parseTimestamp(isSunTime![3])
        }
      });
    }

    if (res![6]) {
      let items: number[] = [];
      let type = EConditionType.Any;
      let groups = res![6].match(/C[0-9]+/g);
      groups?.forEach(el => {
        items = items.concat(el.substring(1).split("").map(Number));
        if (el.length > 2) type = EConditionType.All;
      });
      Object.assign(entryCfg, <IEntry>{
        conditions: {
          type: type,
          items: items.filter(e => conditions.length >= (e - 1)).map(e => conditions[e])
        }
      });
    }

    if (res![8]) {
      let groups = res![8].match(/F[0-9]+/g);
      let optionCfg = groups?.map(el => Number(el.substring(1))).reduce((obj, el) => Object.assign(obj, pick(options, [Object.keys(options)[el]])), {});
      Object.assign(entryCfg, <IEntry>{ options: optionCfg });
    }

    let actionNums = String(res![5]).split("A").map(Number);
    return actionNums.filter(e => e !== null && actions[e]).forEach(num => {
      entries.push(<IEntry>extend(actions[num]!, entryCfg));
    });
  });

  if (!entries.length) return null;

  return <IScheduleEntry>{
    entries: entries,
    id: entity.entity_id,
    name: entity.attributes.friendly_name,
    enabled: entity.state != 'off',
    next_trigger: entity.attributes.next_trigger
  };
}

export function ExportToHass(entryList: IEntry[], configData: Config, friendlyName: string | undefined): IHassData {
  let hassEntries: IHassEntry[] = [];
  let hassActions: IHassAction[] = [];
  let hassConditions: ICondition[] = [];
  let hassOptions: IOptionConfig = {};

  entryList.forEach(entry => {
    let actionCfg = configData.FindAction(entry.entity, entry.action) as IActionElement;
    if (!actionCfg) return;

    let hassAction: IHassAction = {
      entity: entry.entity,
      service: getDomainFromEntityId(actionCfg.service) ? actionCfg.service : `${getDomainFromEntityId(entry.entity)}.${actionCfg.service}`,
      service_data: {}
    }
    if (actionCfg.hasOwnProperty('service_data')) Object.assign(hassAction, { service_data: actionCfg.service_data });
    if ('variable' in entry && 'variable' in actionCfg) Object.assign(hassAction, { service_data: exportVariableServiceData(entry.variable!, actionCfg.variable!) });

    let actionNum = hassActions.findIndex(e => IsEqual(e, hassAction));
    if (actionNum < 0) actionNum = hassActions.push(hassAction) - 1;

    let hassEntry: IHassEntry = {
      actions: [actionNum]
    }

    if (!entry.time.event) Object.assign(hassEntry, { time: formatTime(entry.time.value).time });
    else if (entry.time.event) Object.assign(hassEntry, { time: { event: timeEventToString(entry.time.event), offset: formatTime(entry.time.value).time, } });

    if (entry.endTime) {
      if (!entry.time.event) Object.assign(hassEntry, { end_time: formatTime(entry.endTime.value).time });
      else if (entry.time.event) Object.assign(hassEntry, { end_time: { event: timeEventToString(entry.endTime.event!), offset: formatTime(entry.endTime.value).time, } });
    }
    let dayType = "daily";
    if (entry.days.type == EDayType.Workday) dayType = "workday";
    else if (entry.days.type == EDayType.Weekend) dayType = "weekend";
    else if (entry.days.type == EDayType.Custom) dayType = "custom";

    if (entry.days.type == EDayType.Custom) Object.assign(hassEntry, { days: { type: dayType, list: entry.days.custom_days } });
    else Object.assign(hassEntry, { days: { type: dayType } });

    if ('conditions' in entry) {
      let conditions: number[] = [];
      entry.conditions?.items.forEach(condition => {
        let conditionNum = hassConditions.findIndex(e => IsEqual(e, condition));
        if (conditionNum < 0) conditionNum = hassConditions.push(condition) - 1;
        conditions.push(conditionNum);
      });
      Object.assign(hassEntry, <IHassEntry>{ conditions: { list: conditions, type: entry.conditions!.type } });
    }

    if (entry.options) {
      let options: number[] = [];
      Object.entries(entry.options).forEach(([key, val]) => {
        let optionNum = Object.entries(hassConditions).findIndex(([k, v]) => IsEqual({ [key]: val }, { [k]: v }));
        if (optionNum < 0) {
          Object.assign(hassOptions, { [key]: val });
          optionNum = Object.keys(hassOptions).length - 1;
        }
        options.push(optionNum);
      });
      Object.assign(hassEntry, <IHassEntry>{ options: options });
    }

    hassEntries.push(hassEntry);
  });

  let output = {
    actions: hassActions,
    entries: hassEntries
  };
  if (hassConditions.length) Object.assign(output, { conditions: hassConditions });
  if (friendlyName && friendlyName !== undefined) Object.assign(output, { name: friendlyName });
  if (Object.keys(hassOptions).length) Object.assign(output, { options: hassOptions });
  return output;
}