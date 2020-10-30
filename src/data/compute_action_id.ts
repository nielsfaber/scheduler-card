import { ActionConfig } from '../types';
import { omit } from '../helpers';

export function uniqueId(input: ActionConfig) {
  const sortObject = e =>
    Object.entries(e)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([k, v]) => [k, typeof v === 'object' && v !== null ? sortObject(v) : v])
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

  let obj: any = { service: input.service };
  if (input.service_data && Object.keys(input.service_data).length) {
    obj = { ...obj, service_data: input.service_data };
    obj = sortObject(obj);
  }

  const res = Object.values(obj)
    .map(e =>
      JSON.stringify(e)
        .replace(/[\W]/g, ' ')
        .split(' ')
        .filter(e => e != ' ' && e != '')
        .join('_')
    )
    .join('_');

  return res;
}

export function equalAction(source: ActionConfig, target: ActionConfig) {
  if (uniqueId(source) == uniqueId(target)) return true;
  else if (source.variable)
    return (
      uniqueId(source) == uniqueId({ ...target, service_data: omit(target.service_data, [source.variable.field]) })
    );
  return false;
}
