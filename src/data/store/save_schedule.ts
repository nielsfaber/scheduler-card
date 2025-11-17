import { isDefined } from "../../lib/is_defined";
import { HomeAssistant } from "../../lib/types";
import { Action, Schedule, ScheduleEntry, TConditionLogicType, TRepeatType, TWeekday, Timeslot } from "../../types";
import { LegacyScheduleConfig, LegacyTimeslot, ServiceCall, WeekdayType } from "./convert_legacy_schedule";

export const saveSchedule = (hass: HomeAssistant, schedule: Schedule): Promise<boolean> => {
  const config = exportSchedule(schedule);
  return hass.callApi("POST", "scheduler/add", config);
};

export const exportSchedule = (schedule: Schedule) => {
  const convertSlot = (slot: Timeslot) => {
    if (!slot.actions.length) return null;

    if (!slot.stop) slot = <Timeslot>Object.fromEntries(Object.entries(slot).filter(([key]) => key != "stop"));

    // if (!slot.conditions.items.length) slot = <Timeslot>Object.fromEntries(
    //   Object.entries(slot).filter(([key,]) => key != 'conditions')
    // );

    return slot;
  };

  const convertEntry = (entry: ScheduleEntry) => {
    return { ...entry, slots: <Timeslot[]>entry.slots.map(convertSlot).filter((e) => e !== null) };
  };

  schedule = { ...schedule, entries: schedule.entries.map(convertEntry) };

  let output: LegacyScheduleConfig = {
    weekdays: schedule.entries[0].weekdays.map(parseWeekdays),
    timeslots: schedule.entries[0].slots.map(parseTimeslot),
    name: schedule.name,
    start_date: schedule.start_date,
    end_date: schedule.end_date,
    repeat_type: schedule.repeat_type,
    tags: schedule.tags || [],
  };
  if (schedule.schedule_id) output = { ...output, schedule_id: schedule.schedule_id };
  return output;
};

const parseWeekdays = (input: TWeekday): WeekdayType => {
  switch (input) {
    case TWeekday.Monday:
      return "mon";
    case TWeekday.Tuesday:
      return "tue";
    case TWeekday.Wednesday:
      return "wed";
    case TWeekday.Thursday:
      return "thu";
    case TWeekday.Friday:
      return "fri";
    case TWeekday.Saturday:
      return "sat";
    case TWeekday.Sunday:
      return "sun";
    case TWeekday.Workday:
      return "workday";
    case TWeekday.Weekend:
      return "weekend";
    default:
      return "daily";
  }
};

const parseTimeslot = (input: Timeslot): LegacyTimeslot => {
  return <LegacyTimeslot>{
    start: input.start,
    stop: input.stop,
    actions: input.actions.map((e) => parseAction(e)).flat(),
    condition_type: input.conditions.items.length
      ? input.conditions.type == TConditionLogicType.And
        ? "and"
        : "or"
      : undefined,
    conditions: input.conditions.items.length ? input.conditions.items : undefined,
    track_conditions: input.conditions.track_changes,
  };
};

const parseAction = (input: Action): ServiceCall | ServiceCall[] => {
  const parseServiceData = (service_data: Record<string, any>) => {
    return Object.keys(service_data)
      .filter((key) => isDefined(service_data[key]))
      .reduce((res, key) => ((res[key] = service_data[key]), res), {});
  };

  if (!input.target) {
    let output: ServiceCall = {
      service: input.service,
      service_data: parseServiceData(input.service_data),
    };
    return output;
  } else if (!Array.isArray(input.target?.entity_id)) {
    let output: ServiceCall = {
      service: input.service,
      service_data: parseServiceData(input.service_data),
      entity_id: input.target?.entity_id,
    };
    return output;
  } else {
    let output = input?.target.entity_id.map(
      (e): ServiceCall => ({
        service: input.service,
        service_data: parseServiceData(input.service_data),
        entity_id: e,
      })
    );
    return output;
  }
};
