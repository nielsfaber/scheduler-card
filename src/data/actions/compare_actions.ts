import { deepCompare } from "../../lib/deep_compare";
import { Action } from "../../types";


export const compareActions = (actionA: Action, actionB: Action) => {

  if (actionA.service !== actionB.service) return false;

  const serviceDataA = actionA.service_data || {};
  const serviceDataB = actionB.service_data || {};

  let serviceArgs = [...new Set([...Object.keys(serviceDataA), ...Object.keys(serviceDataB)])];
  serviceArgs = serviceArgs.filter(e => e != 'entity_id');

  if (!serviceArgs.every(key => {
    if (!Object.keys(serviceDataA).includes(key) || !Object.keys(serviceDataB).includes(key)) return false;
    return deepCompare(serviceDataA[key], serviceDataB[key]);
  })) return false;


  //TBD: handle optional variables
  return true;

};