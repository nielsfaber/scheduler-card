import { ServiceCall, Action } from "../../types";
import { standardActions } from "../../standard-configuration/standardActions";
import { unique } from "../../helpers";
import { HomeAssistant } from "custom-card-helpers";



export function importAction(action: ServiceCall, hass: HomeAssistant): Action {
  const id = action.entity_id || action.service;
  const service = action.service;
  const serviceData = action.service_data || {};
  const serviceArgs = Object.keys(serviceData);

  let actions = standardActions(id, hass);

  //only find actions with matching service name
  actions = actions.filter(e => e.service == service);

  // if action has a fixed argument, it should be provided to be a match 
  actions = actions.filter(e => Object.keys(e.service_data || {}).every(k => serviceArgs.includes(k)));

  if (actions.length > 1) {
    //the match is ambiguous, check service_data to find the action with best overlap

    actions.sort((a, b) => {
      const serviceDataA = unique([...Object.keys(a.service_data || {}), ...Object.keys(a.variables || {})]);
      const serviceDataB = unique([...Object.keys(b.service_data || {}), ...Object.keys(b.variables || {})]);

      const overlapA = serviceArgs.filter(e => serviceDataA.includes(e)).length;
      const overlapB = serviceArgs.filter(e => serviceDataB.includes(e)).length;

      //if one of the services has more serviceArgs in common, it is preferred
      if (overlapA > overlapB) return -1;
      if (overlapA < overlapB) return 1;

      const extraKeysA = serviceDataA.filter(e => !serviceArgs.includes(e)).length;
      const extraKeysB = serviceDataB.filter(e => !serviceArgs.includes(e)).length;

      //if one of the services has less extra serviceArgs, it is preferred
      if (extraKeysA > extraKeysB) return 1;
      if (extraKeysA < extraKeysB) return -1;
      return 0;
    });
  }
  if (actions.length) {
    return {
      ...actions[0],
      service_data: { ...actions[0].service_data || {}, ...serviceData }
    };
  }
  else {
    //unknown action, add from config
    return {
      service: service,
      service_data: action.service_data
    };
  }
}