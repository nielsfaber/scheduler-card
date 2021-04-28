import { computeDomain } from 'custom-card-helpers';

export function matchPattern(pattern: string, value: string) {
  let res = false;
  if (pattern.match(/^[a-z0-9_\.]+$/)) {
    if (pattern.includes('.')) res = pattern == value;
    else res = pattern == computeDomain(value);
  } else {
    try {
      if ((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
        if (!pattern.startsWith('/')) {
          pattern = pattern.replace(/\./g, '.').replace(/\*/g, '.*');
          pattern = `/^${pattern}$/`;
        }
        const regex = new RegExp(pattern.slice(1, -1));
        res = regex.test(value);
      }
    } catch (e) { }
  }
  return res;
}