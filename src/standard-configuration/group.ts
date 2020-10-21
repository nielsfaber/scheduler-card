import { listVariable, listVariableOption } from "../actionVariables";
import { ActionConfig } from "../types";
import { HassEntity } from "home-assistant-js-websocket";
import { TurnOnAction, TurnOffAction } from "../const";


export function groupActions(entity: HassEntity) {
  const entities = entity.attributes.entity_id!;

  let actions: ActionConfig[] = [TurnOnAction, TurnOffAction];

  return actions;
}