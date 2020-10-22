import { listVariable, listVariableOption } from "../actionVariables";
import { ActionConfig } from "../types";
import { HassEntity } from "home-assistant-js-websocket";
import { TurnOnAction, TurnOffAction } from "../const";
import { HomeAssistant, computeDomain } from "custom-card-helpers";
import { standardActions } from "./standardActions";
import { uniqueId } from "../action";


export function groupActions(entity: HassEntity, entityActions: ActionConfig[][]) {
  const entities = entity.attributes.entity_id;

  //prepend the entity domain to the services
  entityActions = entityActions.map((actionList, index) => {
    const domain = computeDomain(entities[index]);
    return actionList.map(e => {
      return computeDomain(e.service) == domain ? e : { ...e, service: `${domain}.${e.service}` };
    });
  });

  //find matches
  let actions = entityActions[0].filter(action => {
    return entityActions.every(e => {
      return e.map(uniqueId)
        .includes(uniqueId(action));
    });
  });
  return actions;
}