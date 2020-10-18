import { HassEntity } from "home-assistant-js-websocket";
import { levelVariable } from "../actionVariables";
import { ActionConfig } from "../types";

export function inputNumberActions(entity: HassEntity) {

  const valueVariable = levelVariable({
    field: "value",
    min: Number(entity.attributes.min),
    max: Number(entity.attributes.max),
    step: Number(entity.attributes.step)
  });

  let actions: ActionConfig[] = [{
    service: "set_value",
    variable: valueVariable,
    icon: "counter"
  }]
  return actions;
}