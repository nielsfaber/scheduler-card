import { computeDomain } from "../lib/entity";
import { HomeAssistant } from "../lib/types";
import { CustomConfig, CustomEntityConfig } from "../types";

export interface EntityRegistryEntry {
  entity_id: string;
  unique_id: string;
  name: string;
  icon: string;
  platform: string;
}

const computeConfigItem = (registryData: EntityRegistryEntry): [string, Partial<CustomEntityConfig>] => {
  let output: Partial<CustomEntityConfig> = {};
  const serviceId = `${registryData.platform}.${registryData.unique_id}`;

  if (registryData.name) output = { ...output, name: registryData.name };
  if (registryData.icon) output = { ...output, icon: registryData.icon };

  return [serviceId, output];
};

export const loadConfigFromEntityRegistry = async (hass: HomeAssistant) => {
  let output: CustomConfig = {};
  const filteredEntities = Object.keys(hass.states).filter((e) => computeDomain(e) == "script");

  if (filteredEntities.length) {
    await hass
      .callWS({
        type: "config/entity_registry/get_entries",
        entity_ids: filteredEntities,
      })
      .then((res) => {
        output = Object.fromEntries(
          Object.entries(res as Record<string, EntityRegistryEntry>)
            .map(([, v]) => computeConfigItem(v))
            .filter(([, v]) => Object.keys(v).length)
        );
      });
  }
  return output;
};
