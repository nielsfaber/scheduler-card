import { HassEntity } from "home-assistant-js-websocket";
import { listVariable } from "../actionVariables";
import { ActionConfig } from "../types";

export function inputSelectActions(entity: HassEntity) {
  const options: string[] = entity.attributes.options;
  if (options.length < 2) return [];

  const optionVariable = listVariable({
    field: "option",
    options: options.map(e => ({ value: e }))
  });

  let actions: ActionConfig[] = [{
    service: "select_option",
    variable: optionVariable,
    icon: "counter",
  }]
  return actions;
}