import { DEFAULT_INCLUDED_DOMAINS } from "../../const";
import { computeDomain } from "../../lib/entity";
import { matchPattern } from "../../lib/patterns";
import { CustomConfig } from "../../types";

export const entityIncludedByConfig = (
  entityOrDomain: string,
  config: { include?: string[], exclude?: string[], customize?: CustomConfig }
) => {
  return entityOrDomain.includes('.')
    ? ((config.include || DEFAULT_INCLUDED_DOMAINS).some(e => matchPattern(e, entityOrDomain)) ||
      Object.keys(config.customize || {}).some(e => matchPattern(e, entityOrDomain))) &&
    !(config.exclude || []).some(e => matchPattern(e, entityOrDomain))
    : ((config.include || DEFAULT_INCLUDED_DOMAINS).map(computeDomain).some(e => matchPattern(e, entityOrDomain)) ||
      Object.keys(config.customize || {}).map(computeDomain).some(e => matchPattern(e, entityOrDomain))) &&
    !(config.exclude || []).some(e => matchPattern(e, entityOrDomain))
};