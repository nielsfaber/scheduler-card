import { computeDomain } from "../../lib/entity";
import { matchPattern } from "../../lib/patterns";
import { CustomActionConfig, CustomConfig } from "../../types";

export const parseCustomActions = (customize: CustomConfig, entityOrDomainFilter?: string) => {
  let actionConfig: CustomActionConfig[] = [];

  Object.keys(customize)
    .filter(key => customize[key].actions?.length)
    .filter(key => !entityOrDomainFilter
      || (!entityOrDomainFilter.includes('.') && matchPattern(computeDomain(key), entityOrDomainFilter))
      || matchPattern(key, entityOrDomainFilter)
    )
    .forEach(key => {
      Object.values(customize[key].actions!).forEach(config => {
        if (!config.service.includes('.') && key.includes('.')) config = { ...config, service: `${computeDomain(key)}.${config.service}` };
        //if (key.includes('.') && !Object.keys(config.service_data).includes('entity_id')) config = { ...config, service_data: { ...config.service_data || {}, entity_id: key }, target: { entity_id: key } };
        if (key.includes('.')) config = { ...config, target: { entity_id: key } };

        actionConfig.push(<CustomActionConfig>{
          service: config.service,
          service_data: config.service_data || {},
          target: config.target ? config.target : {},
          name: config.name || "",
          icon: config.icon || "",
          variables: config.variables
        });
      });
    });

  return actionConfig;
}