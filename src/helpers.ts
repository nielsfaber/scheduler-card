
import { pick, values, omit, keys } from "lodash-es";
import slugify from "slugify";
import { IUserSelection, IHassData, IHassAction, IHassEntry, IScheduleEntry, IDictionary, IScheduleAction } from './types'
import { Config } from './config-parser'
import { localize } from './localize/localize';
import { formatTime, parseTimestamp, ITime, wrapTime } from './date-time';


const EntryPattern = /^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/
const ActionPattern = /^(A([0-9]+))+$/
const SunTimePattern = /^([0-9]{4})?(S[SR])([0-9]{4})?$/

export function ExportToHass(userData: IUserSelection, configData: Config): IHassData {
  let actionCfg = configData.FindAction(userData.entity, userData.action);

  let action = pick(actionCfg, ['service', 'service_data']) as IHassAction;
  Object.assign(action, { entity: userData.entity });

  if (!getDomainFromEntityId(action['service'])) action['service'] = getDomainFromEntityId(action['entity']) + "." + action['service'];

  if (userData.hasOwnProperty('levelEnabled') && userData['levelEnabled']) {
    let key = actionCfg!['variable']['field'];
    let val = userData['level'];
    let service_data = action.hasOwnProperty('service_data') ? action['service_data'] : {};
    Object.assign(action, { service_data: Object.assign(service_data, { [key]: val }) });
  }

  let entry: IHassEntry = {
    actions: [0]
  };

  let ts = userData.time.value;
  if (!userData.time.event) {
    Object.assign(entry, { time: formatTime(ts).time });
  }
  else {
    Object.assign(entry, { event: userData.time.event, offset: formatTime(ts).time });
  }

  if (userData.daysType == 'weekdays') Object.assign(entry, { days: [1, 2, 3, 4, 5] })
  else if (userData.daysType == 'custom') Object.assign(entry, { days: userData.days.sort().filter(e => e != 0) })

  return {
    actions: [action],
    entries: [entry]
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
  let entries = hassData.attributes['entries'].map(entry => {
    let res = EntryPattern.exec(entry);
    let actions = ActionPattern.exec(res![3]);

    let data: IHassEntry = {
      days: res![1].split("").map(Number),
      actions: actions!.map(Number).filter(e => { return !isNaN(e) })
    }


    let is_sun_time = SunTimePattern.exec(res![2]);
    if (!is_sun_time) {
      let val = parseTimestamp(res![2]);
      Object.assign(data, { time: { value: val } });
    }
    else {
      let event = (is_sun_time[2] == "SR") ? "sunrise" : "sunset";
      let val = (is_sun_time[1]) ? -parseTimestamp(is_sun_time![1]) : parseTimestamp(is_sun_time![3]);
      Object.assign(data, { time: { value: val, event: event } });
    }
    return data;
  })

  let actions: IScheduleAction[] = hassData.attributes['actions'].map(action => {
    let output = {};
    let entity_id = getDomainFromEntityId(action['entity']) ? action['entity'] : getDomainFromEntityId(action['service']) + "." + action['entity'];
    let service = action['service'];
    let service_data = omit(action, ['service', 'entity']);
    if (getDomainFromEntityId(entity_id) == getDomainFromEntityId(service)) service = service.split(".").pop();


    if (!configData.FindEntity(entity_id)) {
      //console.log(`failed to find entity ${entity_id}!`);
      return;
    }
    Object.assign(output, { entity: entity_id });

    let action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));

    if (!configData.FindAction(entity_id, action_id)) {
      let action = configData.GetActionsForEntity(entity_id).find(e => {
        if (!e.hasOwnProperty('variable')) return false;
        if (service_data.hasOwnProperty(e['variable']!['field'])) return true;
        else return false;
      });
      if (action) {
        let field_name = action['variable']!['field'];
        Object.assign(output, { level: Number(service_data[field_name]) });
        service_data = omit(service_data, field_name);
        action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));
      }
      else {
        //console.log(`failed to find action ${action_id} for entity ${entity_id}!`);
        return;
      }
    }
    Object.assign(output, { action: action_id });
    return output;
  });

  return {
    id: hassData.entity_id,
    enabled: hassData.state != 'off',
    entries: entries,
    actions: actions,
  };
}

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
  return input.replace(/_/g, ' ');
}

export function PrettyPrintIcon(input: string): string {
  if (typeof input != typeof "x") input = String(input);
  if (input.match(/^[a-z]+:[a-z0-9-]+$/i)) return input;
  return `hass:${input}`;
}