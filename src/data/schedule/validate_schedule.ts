import { isDefined } from "../../lib/is_defined";
import { NumberSelector } from "../../lib/selector";
import { HomeAssistant } from "../../lib/types";
import { Action, CustomConfig, Schedule, Timeslot } from "../../types";
import { actionConfig } from "../actions/action_config";
import { isSupportedSelector } from "../selectors/is_supported_selector";
import { selectorConfig } from "../selectors/selector_config";
import { computeTimestamp } from "../time/compute_timestamp";

export enum ValidationError {
  OverlappingTime = "overlapping_time",
  MissingTargetEntity = "missing_target_entity",
  MissingServiceParameter = "missing_service_parameter",
  MissingAction = "missing_action",
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
};

const validateAction = (action: Action, hass: HomeAssistant, customize?: CustomConfig) => {
  const config = actionConfig(action, customize);
  if (config?.target) {
    if (!action.target?.entity_id) return ValidationError.MissingTargetEntity;
  }
  if (config?.fields) {
    if (
      !Object.entries(config.fields)
        .filter(([field]) => isSupportedSelector(action, field, hass, customize))
        .every(([field, fieldConfig]) => {
          let selector = selectorConfig(action.service, action.target?.entity_id, field, hass!, customize);
          const isOptional =
            (selector as NumberSelector).number && (selector as NumberSelector).number?.optional
              ? true
              : fieldConfig.optional;
          if (!Object.keys(action.service_data).includes(field) && !isOptional) return false;
          else if (!isDefined(action.service_data[field]) && !isOptional) return false;
          return true;
        })
    )
      return ValidationError.MissingServiceParameter;
  }
  return null;
};

export const validateSchedule = (
  schedule: Schedule,
  hass: HomeAssistant,
  customize?: CustomConfig
): ValidationError | null => {
  let errors: ValidationError[] = [];
  errors = [
    ...errors,
    ...(<ValidationError[]>schedule.entries.map((e) => validateTimebar(e.slots, hass)).filter((e) => e !== null)),
  ];

  let actions = schedule.entries
    .map((e) => e.slots.map((f) => f.actions))
    .flat()
    .flat();
  if (!actions.length) errors = [...errors, ValidationError.MissingAction];
  errors = [
    ...errors,
    ...(<ValidationError[]>actions.map((e) => validateAction(e, hass, customize)).filter((e) => e !== null)),
  ];

  if (errors.length) return errors.shift()!;
  else return null;
};
