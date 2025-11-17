import { computeDomain } from "../../lib/entity";
import { isDefined } from "../../lib/is_defined";
import { matchPattern } from "../../lib/patterns";
import { CustomActionConfig, CustomConfig } from "../../types";

export const parseCustomActions = (customize: CustomConfig, entityOrDomainFilter?: string) => {
  let actionConfig: CustomActionConfig[] = [];

  Object.keys(customize)
    .filter((key) => customize[key].actions?.length)
    .filter(
      (key) =>
        !entityOrDomainFilter ||
        (!entityOrDomainFilter.includes(".") && matchPattern(computeDomain(key), entityOrDomainFilter)) ||
        matchPattern(key, entityOrDomainFilter) ||
        (computeDomain(entityOrDomainFilter) == "script" &&
          customize[key].actions!.find((e) => e.service == entityOrDomainFilter))
    )
    .forEach((key) => {
      Object.values(customize[key].actions!).forEach((config) => {
        if (!config.service.includes(".") && key.includes("."))
          config = { ...config, service: `${computeDomain(key)}.${config.service}` };
        //if (key.includes('.') && !Object.keys(config.service_data).includes('entity_id')) config = { ...config, service_data: { ...config.service_data || {}, entity_id: key }, target: { entity_id: key } };
        if (key.includes(".") && computeDomain(key) != "script") config = { ...config, target: { entity_id: key } };

        if (computeDomain(key) != "script" && computeDomain(entityOrDomainFilter || "") == "script") {
          //allow custom script actions under any domain
          if (config.service != entityOrDomainFilter && entityOrDomainFilter?.includes(".")) return;
          config = { ...config, target: { ...config.target, domain: key } };
        }

        actionConfig.push(<CustomActionConfig>{
          service: config.service,
          service_data: config.service_data || {},
          target: config.target ? config.target : undefined,
          name: config.name || "",
          icon: config.icon || "",
          variables: config.variables,
        });
      });
    });

  return actionConfig;
};

export const parseExcludedActions = (customize: CustomConfig, entityOrDomainFilter?: string) => {
  return Object.keys(customize)
    .filter((key) => customize[key].exclude_actions?.length)
    .filter(
      (key) =>
        !entityOrDomainFilter ||
        (!entityOrDomainFilter.includes(".") && matchPattern(computeDomain(key), entityOrDomainFilter)) ||
        matchPattern(key, entityOrDomainFilter)
    )
    .map((e) => customize[e].exclude_actions)
    .flat()
    .filter(isDefined);
};
