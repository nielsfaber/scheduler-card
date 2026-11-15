import { HomeAssistant } from '../../lib/types';
import { Condition, ConditionConfig, TConditionLogicType, TConditionMatchType } from '../../types';

// Mirrors validate_condition() of the scheduler component
export const evaluateCondition = (condition: Condition, hass: HomeAssistant): boolean => {
  const state = hass.states[condition.entity_id];
  if (!state || state.state === 'unavailable') return false;

  let required: string | number = condition.value;
  let actual: string | number = state.state;

  if (
    [TConditionMatchType.Below, TConditionMatchType.Above].includes(condition.match_type) &&
    typeof required === 'string'
  ) {
    required = Number(required);
  }

  if (typeof required === 'number') {
    actual = Number(actual);
    if (actual === null || Number.isNaN(actual) || Number.isNaN(required)) return false;
  } else {
    actual = String(actual).toLowerCase();
    required = String(required).toLowerCase();
  }

  switch (condition.match_type) {
    case TConditionMatchType.Equal:
      return actual === required;
    case TConditionMatchType.Unequal:
      return actual !== required;
    case TConditionMatchType.Below:
      return actual < required;
    case TConditionMatchType.Above:
      return actual > required;
    default:
      return false;
  }
};

export const evaluateConditions = (config: ConditionConfig | undefined, hass: HomeAssistant): boolean => {
  const items = config?.items || [];
  if (!items.length) return true;
  return config!.type === TConditionLogicType.Or
    ? items.some((e) => evaluateCondition(e, hass))
    : items.every((e) => evaluateCondition(e, hass));
};
