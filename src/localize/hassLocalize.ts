import { HomeAssistant } from "../lib/types";

export const hassLocalize = (searchString: string, hass: HomeAssistant, usePlaceholder = true): string => {
  const translation = hass.localize(searchString);
  if (translation || !usePlaceholder) return translation;
  const placeholder = `{${searchString.split(".").pop()}}`;
  //console.log(`Scheduler-card failed to fetch HA translation '${searchString}'`);
  return placeholder;
};
