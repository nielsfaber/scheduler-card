import { HomeAssistant } from "custom-card-helpers";
import { CardConfig, Variable } from "../types";
import { standardStates } from "../standard-configuration/standardStates";

export function computeStates(entity_id: string, hass: HomeAssistant, config: CardConfig): Variable | null {

  //fetch standard states for entity
  return config.standard_configuration
    ? standardStates(entity_id, hass)
    : null;

  //TBD: parse user-configured state configuration
}


