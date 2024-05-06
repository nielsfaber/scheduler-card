import { computeDomain, computeEntity } from "../../lib/entity";
import { supportedActions } from "../actions/supported_actions";


export const actionConfig = (service: string) => {
  const domain = computeDomain(service);
  const domainService = computeEntity(service);
  if (!Object.keys(supportedActions).includes(domain)) return;
  if (!Object.keys(supportedActions[domain]).includes(domainService)) return;
  return supportedActions[domain][domainService];
}