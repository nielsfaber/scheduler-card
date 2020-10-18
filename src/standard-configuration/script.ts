import { HassEntity } from "home-assistant-js-websocket";
import { ActionConfig } from "../types";
import { TurnOnAction, TurnOffAction } from "../const";
import { computeEntity } from "custom-card-helpers";

export function scriptActions(entity: HassEntity) {

  let actions: ActionConfig[] = [TurnOnAction, TurnOffAction]
  actions.push({
    service: computeEntity(entity.entity_id),
    name: "run",
    icon: "play",
  });

  return actions;
}