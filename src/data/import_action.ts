import { Dictionary, HassAction } from '../types';
import { computeDomain, computeEntity } from 'custom-card-helpers';
import { omit } from '../helpers';

export function importAction(input: Dictionary<any> & { entity: string; service: string }) {
  const entity = computeDomain(input.entity).length
    ? input.entity
    : computeDomain(input.service) + '.' + computeEntity(input.entity);
  const service = computeDomain(input.service).length
    ? input.service
    : computeDomain(input.entity) + '.' + computeEntity(input.service);
  const service_data: Dictionary<any> = {
    ...omit(input, ['entity', 'service', 'service_data']),
    ...input.service_data,
  };

  let output: HassAction = {
    entity: entity,
    service: service,
  };

  if (service_data && Object.keys(service_data).length) output = { ...output, service_data: service_data };

  return output;
}
