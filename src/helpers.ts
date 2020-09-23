
import { pick, values, omit, keys, isEqual } from "lodash-es";
import slugify from "slugify";
import { IUserSelection, IEntry, IHassData, IHassAction, IHassEntry, IScheduleEntry, IDictionary, ITimeSlot, IActionElement, IActionVariable } from './types'
import { Config } from './config-parser'
import { localize } from './localize/localize';
import { formatTime, parseTimestamp, ITime, wrapTime, HoursPerDay, MinutesPerHour } from './date-time';


const EntryPattern = /^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/
const ActionPattern = /^(A([0-9]+))+$/
const SunTimePattern = /^([0-9]{4})?(S[SR])([0-9]{4})?$/


export function ExportToHass(entryList: IEntry[], configData: Config): IHassData {
  let hassEntries: IHassEntry[] = [];
  let hassActions: IHassAction[] = [];

  entryList.forEach(entry => {
    let actionCfg = configData.FindAction(entry.entity, entry.action) as IActionElement;
    let hassAction: IHassAction = {
      entity: entry.entity,
      service: getDomainFromEntityId(actionCfg.service) ? actionCfg.service : `${getDomainFromEntityId(entry.entity)}.${actionCfg.service}`
    }
    if (actionCfg.hasOwnProperty('service_data')) Object.assign(hassAction, { service_data: actionCfg.service_data });

    if (entry.levelEnabled) {
      let propertyName = String(actionCfg.variable?.field);
      let val = Number(entry.level);
      let serviceData = hassAction.hasOwnProperty('service_data') ? hassAction.service_data : {};
      Object.assign(serviceData, { [propertyName]: val });
      Object.assign(hassAction, { service_data: serviceData });
    }

    let actionNum = hassActions.findIndex(e => isEqual(e, hassAction));
    if (actionNum < 0) actionNum = hassActions.push(hassAction) - 1;

    let hassEntry: IHassEntry = {
      actions: [actionNum]
    }

    if (!entry.time.event) Object.assign(hassEntry, { time: formatTime(entry.time.value).time });
    else Object.assign(hassEntry, { event: entry.time.event, offset: formatTime(entry.time.value).time, });
    if (entry.days.length) Object.assign(hassEntry, { days: entry.days });

    hassEntries.push(hassEntry);
  });

  return {
    actions: hassActions,
    entries: hassEntries
  }
}

export function getDomainFromEntityId(entity_id: string): string {
  if (entity_id.indexOf('.') === -1) return '';
  let res = String(entity_id.split('.').shift());
  return res;
}

export function CreateSlug(input: IDictionary<any>) {
  let props = keys(input);
  props = props.sort();
  let obj = {};
  props.forEach(prop => obj[prop] = input[prop]);

  return slugify(JSON.stringify(values(obj)).replace(/\W/g, ' '), '_');
}

export function IsSchedulerEntity(entity_id: string) {
  return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
}

export function ImportFromHass(hassData: any, configData: Config): IScheduleEntry {

  let actions = hassData.attributes['actions'].map(action => {
    let entityId = String(action['entity']);
    let service = String(action['service']);
    let serviceData = Object.entries(action)
      .filter(([key]) => !['entity', 'service'].includes(key))
      .reduce((serviceData, [key, val]) => Object.assign(serviceData, { [key]: val }), {});

    if (!getDomainFromEntityId(entityId)) entityId = `${getDomainFromEntityId(service)}.${entityId}`;
    if (getDomainFromEntityId(service) == getDomainFromEntityId(entityId)) service = String(service.split(".").pop());

    if (!configData.FindEntity(entityId)) return {}; //entity does not exist in configuration
    let actionId = Object.keys(serviceData).length ? CreateSlug({ service: service, service_data: serviceData }) : CreateSlug({ service: service });

    let output: Partial<IEntry> = {
      entity: entityId,
      action: actionId
    };
    if (!configData.FindAction(entityId, actionId)) {
      let matchedAction = configData.GetActionsForEntity(entityId).find(e => (e.hasOwnProperty('variable') && serviceData.hasOwnProperty(e['variable']!['field'])));
      if (matchedAction) {
        let fieldName = matchedAction['variable']!['field'];
        Object.assign(output, { level: Number(serviceData[fieldName]), levelEnabled: true });
        delete serviceData[fieldName];
        actionId = Object.keys(serviceData).length ? CreateSlug({ service: service, service_data: serviceData }) : CreateSlug({ service: service });
      }
      else return output; //action does not exist in configuration
    }
    Object.assign(output, { action: actionId });
    return output;
  });

  let entries: IEntry[] = [];

  hassData.attributes['entries'].forEach(entry => {
    let res = EntryPattern.exec(entry);
    let actionNums = ActionPattern.exec(res![3]);

    let isSunTime = SunTimePattern.exec(res![2]);
    let time: ITime;
    if (!isSunTime) time = { value: parseTimestamp(res![2]) };
    else time = {
      event: isSunTime![2] == "SR" ? "sunrise" : "sunset",
      value: isSunTime![1] ? -parseTimestamp(isSunTime![1]) : parseTimestamp(isSunTime![3])
    };

    actionNums!.map(Number).filter(e => { return !isNaN(e) }).forEach(actionNum => {
      if (actionNum >= actions.length) return;
      entries.push(Object.assign({ ...actions[actionNum] }, {
        time: time,
        days: res![1].split("").map(Number)
      }));
    });
  });

  return {
    id: hassData.entity_id,
    enabled: hassData.state != 'off',
    entries: entries,
  };
}



// let actions: IScheduleAction[] = hassData.attributes['actions'].map(action => {
//   let output = {};
//   let entity_id = getDomainFromEntityId(action['entity']) ? action['entity'] : getDomainFromEntityId(action['service']) + "." + action['entity'];
//   let service = action['service'];
//   let service_data = omit(action, ['service', 'entity']);
//   if (getDomainFromEntityId(entity_id) == getDomainFromEntityId(service)) service = service.split(".").pop();


//   if (!configData.FindEntity(entity_id)) {
//     //console.log(`failed to find entity ${entity_id}!`);
//     return;
//   }
//   Object.assign(output, { entity: entity_id });

//   let action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));

//   if (!configData.FindAction(entity_id, action_id)) {
//     let action = configData.GetActionsForEntity(entity_id).find(e => {
//       if (!e.hasOwnProperty('variable')) return false;
//       if (service_data.hasOwnProperty(e['variable']!['field'])) return true;
//       else return false;
//     });
//     if (action) {
//       let field_name = action['variable']!['field'];
//       Object.assign(output, { level: Number(service_data[field_name]) });
//       service_data = omit(service_data, field_name);
//       action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));
//     }
//     else {
//       //console.log(`failed to find action ${action_id} for entity ${entity_id}!`);
//       return;
//     }
//   }
//   Object.assign(output, { action: action_id });
//   return output;
// });

export function ComputeDaysType(dayArray: number[]): string {
  if (!dayArray || !dayArray.length || dayArray.length == 1 && dayArray[0] == 0) return 'daily';
  else if (dayArray.length == 5 && !dayArray.includes(6) && !dayArray.includes(7)) return 'weekdays';
  else return 'custom';
}

export function PrettyPrintDays(dayArray: number[]): string {
  if (ComputeDaysType(dayArray) == 'daily') return localize('fields.day_type_daily');
  else if (ComputeDaysType(dayArray) == 'weekdays') return `${localize('words.on')} ${localize('fields.day_type_weekdays')}`;
  else {
    let output = Array();
    if (dayArray.includes(1)) output.push(localize('days_long.mon'));
    if (dayArray.includes(2)) output.push(localize('days_long.tue'));
    if (dayArray.includes(3)) output.push(localize('days_long.wed'));
    if (dayArray.includes(4)) output.push(localize('days_long.thu'));
    if (dayArray.includes(5)) output.push(localize('days_long.fri'));
    if (dayArray.includes(6)) output.push(localize('days_long.sat'));
    if (dayArray.includes(7)) output.push(localize('days_long.sun'));
    let output_str = output.join(', ');
    var n = output_str.lastIndexOf(', ');
    if (n) output_str = output_str.slice(0, n) + output_str.slice(n).replace(', ', ` ${localize('words.and')} `);
    return `${localize('words.every')} ${output_str}`;
  }
}

export function PrettyPrintTime(time: ITime, options: { amPm: boolean, sunrise: number | null, sunset: number | null }): string {
  let amPmFormat = (options.amPm) ? options.amPm : false;

  if (!time.event) return `${localize('words.at')} ${formatTime(time.value, { amPm: amPmFormat }).time}`;

  let time_string = "unknown";
  if (time.event == "sunrise" && options.sunrise !== null) {
    let time_with_offset = wrapTime(Number(options.sunrise) + time.value);
    time_string = formatTime(time_with_offset, { amPm: amPmFormat }).time;
  }
  else if (time.event == "sunset" && options.sunset !== null) {
    let time_with_offset = wrapTime(Number(options.sunset) + time.value);
    time_string = formatTime(time_with_offset, { amPm: amPmFormat }).time;
  }

  if (Math.abs(time.value) == 0) return `${localize('words.at')} ${localize(`words.${time.event}`)} (${time_string})`;
  else return `${formatTime(time.value, { absolute: true }).time} ${formatTime(time.value).signed ? localize('words.before') : localize('words.after')} ${localize(`words.${time.event}`)} (${time_string})`;
}

export function PrettyPrintName(input: string): string {
  if (typeof input != typeof "x") input = String(input);
  return capitalize(input.replace(/_/g, ' '));
}

export function PrettyPrintIcon(input: string): string {
  if (typeof input != typeof "x") input = String(input);
  if (input.match(/^[a-z]+:[a-z0-9-]+$/i)) return input;
  return `hass:${input}`;
}

export function PrettyPrintAction(entry: IEntry, actionCfg: IActionElement) {
  let action_string = PrettyPrintName(actionCfg.name);

  if (entry.hasOwnProperty('level')) {
    let cfg = actionCfg.variable as IActionVariable;
    let value = Number(entry.level);
    let unit = cfg.hasOwnProperty('unit') ? cfg.unit : "";
    if (cfg.show_percentage) {
      value = Math.round(((value - cfg.min) / (cfg.max - cfg.min)) * 100);
      if (value < cfg.min) value = cfg.min;
      else if (value > cfg.max) value = cfg.max;
      unit = "%";
    }
    action_string = `${localize('services.set_to')} ${value}${unit}`;
  }
  return capitalize(action_string);
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function calculateTimeSlots(entries: IEntry[]): ITimeSlot[] {
  let slots = entries.map(entry => {
    let output: ITimeSlot = {
      startTime: entry.time.value,
      endTime: entry.time.value,
      action: entry.action,
    }
    if (entry.hasOwnProperty('level')) Object.assign(output, { level: entry.level });
    if (entry.hasOwnProperty('levelEnabled')) Object.assign(output, { levelEnabled: entry.levelEnabled });
    return output;
  });

  if (!slots.find(e => (e.startTime == 0))) slots.push({
    startTime: 0,
    endTime: 0
  });

  slots.sort((a, b) => {
    if (a.startTime > b.startTime) return 1;
    else if (a.startTime < b.startTime) return -1;
    return 0;
  });

  let endTime = MinutesPerHour * HoursPerDay;
  let i;
  for (i = slots.length - 1; i >= 0; i--) {
    slots[i].endTime = endTime;
    endTime = slots[i].startTime;
  }

  return slots;
}

