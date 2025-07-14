import { HomeAssistant } from "../lib/types";

export const hassLocalize = (searchString: string, hass: HomeAssistant, usePlaceholder = true): string => {
  let translation = hass.localize(searchString);
  if (translation || !usePlaceholder) return translation;
  let placeholder = `{${searchString.split(".").pop()}}`;
  //console.log(`Scheduler-card failed to fetch HA translation '${searchString}'`);
  return placeholder;
}