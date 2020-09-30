import { Config } from './config';
import {
  IScheduleEntry,
  IEntry,
  IHassAction,
  IHassData,
  IActionElement,
  IHassEntity,
  ILevelVariable,
  IListVariable,
  IHassEntry,
  EVariableType,
} from './types';
import { getDomainFromEntityId, IsEqual, omit, extend } from './helpers';
import {
  ITime,
  parseTimestamp,
  formatTime,
  ETimeEvent,
  EDayType,
  ArraytoDays,
  daysToArray,
  timeEventToString,
} from './date-time';
import { exportVariableServiceData, importHassAction, getActionId, reverseParseAction } from './action';

const EntryPattern = /^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/;
const ActionPattern = /^(A([0-9]+))+$/;
const SunTimePattern = /^([0-9]{4})?(S[SR])([0-9]{4})?$/;

export function ImportFromHass(entity: IHassEntity, config: Config) {
  if (!entity.attributes.actions || !entity.attributes.entries) return null;

  let actions = entity.attributes.actions.map((hassAction) => {
    let actionCfg = importHassAction(hassAction);
    if (!config.FindEntity(actionCfg.entity)) return null;
    let actions = config.GetActionsForEntity(actionCfg.entity);
    let action = reverseParseAction(actionCfg, actions);
    if (!action) return null;

    let output: Partial<IEntry> = {
      entity: actionCfg.entity,
      action: (action as IActionElement).id,
    };

    if (action.variable && action.variable.type == EVariableType.Level) {
      if (action.variable.type == EVariableType.Level) {
        let variable: ILevelVariable;
        if (actionCfg.service_data && action.variable.field in actionCfg.service_data) {
          variable = {
            type: EVariableType.Level,
            value: Number(actionCfg.service_data[action.variable.field]),
            enabled: true,
          };
        } else variable = { type: EVariableType.Level, value: null, enabled: false };
        output = extend(output, <IEntry>{ variable: variable });
      }
    } else if (action.variable && action.variable.type == EVariableType.List) {
      let variable: IListVariable;
      if (actionCfg.service_data && action.variable.field in actionCfg.service_data) {
        variable = { type: EVariableType.List, value: String(actionCfg.service_data[action.variable.field]) };
      } else variable = { type: EVariableType.List, value: null };
      output = extend(output, <IEntry>{ variable: variable });
    }
    return output;
  });

  let entries: IEntry[] = [];
  entity.attributes.entries.forEach((entry) => {
    let res = EntryPattern.exec(entry);
    let actionNums = ActionPattern.exec(res![3])!.map(Number);

    let isSunTime = SunTimePattern.exec(res![2]);
    let time: ITime;
    if (!isSunTime) time = { value: parseTimestamp(res![2]) };
    else
      time = {
        event: isSunTime![2] == 'SR' ? ETimeEvent.Sunrise : ETimeEvent.Sunset,
        value: isSunTime![1] ? -parseTimestamp(isSunTime![1]) : parseTimestamp(isSunTime![3]),
      };

    return actionNums
      .filter((e) => actions[e])
      .forEach((num) => {
        entries.push(
          <IEntry>extend(actions[num]!, {
            time: time,
            days: ArraytoDays(res![1].split('').map(Number)),
          }),
        );
      });
  });

  if (!entries.length) return null;

  return <IScheduleEntry>{
    entries: entries,
    id: entity.entity_id,
    enabled: entity.state != 'off',
  };
}

export function ExportToHass(entryList: IEntry[], configData: Config): IHassData {
  let hassEntries: IHassEntry[] = [];
  let hassActions: IHassAction[] = [];

  entryList.forEach((entry) => {
    let actionCfg = configData.FindAction(entry.entity, entry.action) as IActionElement;
    if (!actionCfg) return;

    let hassAction: IHassAction = {
      entity: entry.entity,
      service: getDomainFromEntityId(actionCfg.service)
        ? actionCfg.service
        : `${getDomainFromEntityId(entry.entity)}.${actionCfg.service}`,
      service_data: {},
    };
    if (actionCfg.hasOwnProperty('service_data')) Object.assign(hassAction, { service_data: actionCfg.service_data });
    if ('variable' in entry && 'variable' in actionCfg)
      Object.assign(hassAction, { service_data: exportVariableServiceData(entry.variable!, actionCfg.variable!) });

    let actionNum = hassActions.findIndex((e) => IsEqual(e, hassAction));
    if (actionNum < 0) actionNum = hassActions.push(hassAction) - 1;

    let hassEntry: IHassEntry = {
      actions: [actionNum],
    };

    if (!entry.time.event) Object.assign(hassEntry, { time: formatTime(entry.time.value).time });
    else if (entry.time.event)
      Object.assign(hassEntry, {
        event: timeEventToString(entry.time.event),
        offset: formatTime(entry.time.value).time,
      });

    if (entry.endTime) Object.assign(hassEntry, { end_time: formatTime(entry.endTime.value).time });
    //TBD: endtime with event??

    if (entry.days.type != EDayType.Daily) Object.assign(hassEntry, { days: daysToArray(entry.days) });

    hassEntries.push(hassEntry);
  });

  return {
    actions: hassActions,
    entries: hassEntries,
  };
}
