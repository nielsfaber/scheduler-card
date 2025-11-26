import { DEFAULT_INCLUDED_DOMAINS } from "../../const";
import { matchPattern } from "../../lib/patterns";
import { CardConfig } from "../../types";


export const entityIncludedByConfig = (entityOrDomain: string, config: CardConfig) => {
  return ((config.include || DEFAULT_INCLUDED_DOMAINS).some(e => matchPattern(e, entityOrDomain)) ||
    Object.keys(config.customize || {}).some(e => matchPattern(e, entityOrDomain))) &&
    !(config.exclude || []).some(e => matchPattern(e, entityOrDomain))
};