import { HassEntity } from "home-assistant-js-websocket";
import { ActionConfig } from "../types";
import { TurnOnAction, TurnOffAction } from "../const";
import { computeEntity } from "custom-card-helpers";
import { localize } from "../localize/localize";

export function scriptActions(entity: HassEntity) {

  let actions: ActionConfig[] = [TurnOnAction, TurnOffAction]
  actions.push({
    service: computeEntity(entity.entity_id),
    icon: "play",
    name: localize("services.run_script")
  });

  return actions;
}