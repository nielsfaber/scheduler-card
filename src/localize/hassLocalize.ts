import { HomeAssistant } from "../lib/types";

export const hassLocalize = (searchString: string, hass: HomeAssistant, usePlaceholder = true): string => {
  let translation = hass.localize(searchString);
  if (translation || !usePlaceholder) return translation;
  let placeholder = `{${searchString.split(".").pop()}}`;
  console.log(`Scheduler-card failed to fetch HA translation '${searchString}'`);
  console.log(hass.localize('component.input_boolean.services.turn_on.name'));
  return placeholder;
}