import { HomeAssistant } from "../../lib/types";
import { Action, Schedule, ScheduleEntry, TConditionLogicType, TWeekday, Timeslot } from "../../types";
import { ERepeatType, LegacyScheduleConfig, LegacyTimeslot, ServiceCall, WeekdayType } from "./convert_legacy_schedule";

export const saveSchedule = (hass: HomeAssistant, schedule: Schedule): Promise<boolean> => {
  const config = exportSchedule(schedule);
  return hass.callApi('POST', 'scheduler/add', config);
};

const exportSchedule = (schedule: Schedule) => {
  const convertSlot = (slot: Timeslot) => {

    if (!slot.actions.length) return null;

    if (!slot.stop) slot = <Timeslot>Object.fromEntries(
      Object.entries(slot).filter(([key,]) => key != 'stop')
    );

    if (!slot.conditions.items.length) slot = <Timeslot>Object.fromEntries(
      Object.entries(slot).filter(([key,]) => key != 'conditions')
    );

    return slot;
  }

  const convertEntry = (entry: ScheduleEntry) => {
    return { ...entry, slots: <Timeslot[]>entry.slots.map(convertSlot).filter(e => e !== null) }
  }

  schedule = { ...schedule, entries: schedule.entries.map(convertEntry) }

  let output: LegacyScheduleConfig = {
    weekdays: schedule.entries[0].weekdays.map(parseWeekdays),
    timeslots: schedule.entries[0].slots.map(parseTimeslot),
    name: schedule.name,
    start_date: schedule.start_date,
    end_date: schedule.end_date,
    repeat_type: ERepeatType.Repeat,  //TBD
    tags: [], //TBD
  };
  return output;
}

const parseWeekdays = (input: TWeekday): WeekdayType => {
  switch (input) {
    case TWeekday.Monday:
      return 'mon';
    case TWeekday.Tuesday:
      return 'tue';
    case TWeekday.Wednesday:
      return 'wed';
    case TWeekday.Thursday:
      return 'thu';
    case TWeekday.Friday:
      return 'fri';
    case TWeekday.Saturday:
      return 'sat';
    case TWeekday.Sunday:
      return 'sun';
    case TWeekday.Workday:
      return 'workday';
    case TWeekday.Weekend:
      return 'weekend';
    default:
      return 'daily';
  }
}


const parseTimeslot = (input: Timeslot): LegacyTimeslot => {
  return <LegacyTimeslot>{
    start: input.start,
    stop: input.stop,
    actions: input.actions.map(parseAction),
    condition_type: input.conditions.items.length
      ? input.conditions.type == TConditionLogicType.All ? 'and' : 'or'
      : undefined,
    conditions: input.conditions.items.length
      ? input.conditions.items
      : undefined
  }
}


const parseAction = (input: Action): ServiceCall => {
  return <ServiceCall>{
    service: input.service,
    service_data: input.service_data,
    entity_id: input.target.entity_id
  }
}