import { HassEntity } from "home-assistant-js-websocket";
import { listVariable } from "../actionVariables";
import { ActionConfig } from "../types";
import { TurnOnAction, TurnOffAction } from "../const";

export function mediaPlayerActions(entity: HassEntity) {
  const sourceListOptions: string[] = Array(entity.attributes.source_list);
  const supportedFeatures = entity.attributes.supported_features!;


  let actions: ActionConfig[] = []

  if (supportedFeatures & 128) actions.push(TurnOnAction);
  if (supportedFeatures & 256) actions.push(TurnOffAction);
  if (supportedFeatures & 2048 && sourceListOptions.length > 1) {
    actions.push({
      service: "select_source",
      variable: listVariable({
        field: "source",
        options: sourceListOptions.map(e => ({ value: e }))
      }),
      icon: "music-box-multiple-outline"
    })
  }


  return actions;
}