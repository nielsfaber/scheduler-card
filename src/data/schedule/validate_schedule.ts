import { HomeAssistant } from "../../lib/types";
import { Action, Schedule, Timeslot } from "../../types";
import { actionConfig } from "../actions/action_config";
import { computeTimestamp } from "../time/compute_timestamp";


export enum ValidationError {
  OverlappingTime = "overlapping_time",
  MissingTargetEntity = "missing_target_entity",
  MissingServiceParameter = "missing_service_parameter",
  MissingAction = "missing_action"
}


const validateTimebar = (slots: Timeslot[], hass: HomeAssistant) => {
  const res = slots.every((e, i) => {
    const startTime = computeTimestamp(e.start, hass);
    const stopTime = e.stop === undefined ? startTime : computeTimestamp(e.stop!, hass) || 24 * 3600;
    if (startTime > stopTime) return false;
    return slots.every((s, j) => {
      if (j <= i) return true;
      const start = computeTimestamp(s.start, hass);
      return start >= stopTime;
    });
  });
  if (!res) return ValidationError.OverlappingTime;
  return null;
}

const validateAction = (action: Action) => {
  const config = actionConfig(action.service);
  if (config?.target) {
    if (!action.target.entity_id) return ValidationError.MissingTargetEntity;
  }
  if (config?.fields) {
    if (!Object.entries(config.fields).every(([field, fieldConfig]) => {
      if (!Object.keys(action.service_data).includes(field) && !fieldConfig.optional) return false;
      return null;
    })) return ValidationError.MissingServiceParameter;
  }
  return null;
}

export const validateSchedule = (schedule: Schedule, hass: HomeAssistant): ValidationError | null => {
  let errors: ValidationError[] = [];
  errors = [...errors, ...<ValidationError[]>schedule.entries.map(e => validateTimebar(e.slots, hass)).filter(e => e !== null)];

  let actions = schedule.entries.map(e => e.slots.map(f => f.actions)).flat().flat();
  if (!actions.length) errors = [...errors, ValidationError.MissingAction];
  errors = [...errors, ...<ValidationError[]>actions.map(e => validateAction(e)).filter(e => e !== null)];

  if (errors.length) return errors.shift()!;
  else return null;
}