import { deepCompare } from "../../lib/deep_compare";
import { computeDomain } from "../../lib/entity";
import { isDefined } from "../../lib/is_defined";
import { Action, CustomActionConfig } from "../../types";
import { listSelector } from "../selectors/list_selector";

export const compareActions = (actionA: CustomActionConfig, actionB: Action) => {
  if (actionA.service !== actionB.service) return false;

  const serviceDataA = actionA.service_data || {};
  const serviceDataB = actionB.service_data || {};

  const variablesA = actionA.variables || {};

  let serviceArgs = [
    ...new Set([...Object.keys(serviceDataA), ...Object.keys(serviceDataB), ...Object.keys(variablesA)]),
  ];
  serviceArgs = serviceArgs.filter((e) => e != "entity_id");

  if (
    !serviceArgs.every((key) => {
      if (Object.keys(serviceDataA).includes(key) && Object.keys(serviceDataB).includes(key)) {
        return deepCompare(serviceDataA[key], serviceDataB[key]);
      }

      if (Object.keys(variablesA).includes(key)) {
        let variableConfig = variablesA[key];
        let value = serviceDataB[key];

        if (Object.keys(variableConfig).includes("options")) {
          let selector = listSelector({ options: (variableConfig as any).options });
          return isDefined(value)
            ? selector.select?.options.find((e) => (typeof e == "string" ? e == value : e.value == value))
            : true;
          //allow no value set for option (user needs to pick it )
        } else if (Object.keys(variableConfig).includes("min") && Object.keys(variableConfig).includes("max")) {
          if (!isDefined(value) && Object.keys(variableConfig).includes("optional") && (variableConfig as any).optional)
            return true;
          else return typeof value == "number";
        } else {
          return true;
        }
      }
      return false;
    })
  )
    return false;

  return true;
};
