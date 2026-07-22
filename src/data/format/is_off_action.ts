import { Action } from "../../types";
import { computeEntity } from "../../lib/entity";

export const isOffAction = (action: Action): boolean => {
  if (computeEntity(action.service) === 'turn_off') return true;
  if (action.service_data?.state === 'off') return true;
  return false;
};

export const isOnAction = (action: Action): boolean => {
  if (computeEntity(action.service) === 'turn_on') return true;
  if (action.service_data?.state === 'on') return true;
  return false;
};

/**
 * For a turn_on/turn_off action, build its opposite (same domain and
 * target, no extra service data). Returns null for anything else.
 */
export const invertOnOffAction = (action: Action): Action | null => {
  const service = computeEntity(action.service);
  if (service !== 'turn_on' && service !== 'turn_off') return null;
  const domain = action.service.split('.')[0];
  return {
    service: `${domain}.${service === 'turn_on' ? 'turn_off' : 'turn_on'}`,
    service_data: {},
    ...(action.target ? { target: action.target } : {}),
  };
};
