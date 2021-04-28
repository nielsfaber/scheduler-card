import { Action, EVariableType, LevelVariable } from "../../types";


export function compareActions(...actions: Action[]) {
  const serviceArgs = (a: Action) => {
    return Object.keys(a.service_data || {})
      .filter(e => !Object.keys(a.variables || {}).includes(e))
  };
  const variableArgs = (a: Action) => {
    return Object.keys(a.variables || {})
      .filter(e => !(a.variables![e].type == EVariableType.Level && (a.variables![e] as LevelVariable).optional))
  };

  const baseService = actions[0].service;
  const baseArgs = serviceArgs(actions[0]);
  const baseVars = variableArgs(actions[0]);

  return actions.every(e => {
    //actions should have the same service
    if (e.service !== baseService) return false;

    //actions should have all fixed service_data in common
    if (!baseArgs.every(v => serviceArgs(e).includes(v) && actions[0].service_data![v] == e.service_data![v])) return false;

    const remainingArgs = variableArgs(e).filter(e => !baseVars.includes(e));

    //actions should have same number of service_data
    if (remainingArgs.length) return false;

    return true;
  }
  );
}