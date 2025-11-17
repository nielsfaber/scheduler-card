import { isDefined } from "../lib/is_defined";

const hasKey = (obj: Record<string, any>, key: string) => Object.keys(obj).includes(key);
const isTypeBoolean = (obj: any) => typeof obj == "boolean";
const isTypeNumber = (obj: any) => typeof obj == "number";
const isTypeString = (obj: any) => typeof obj == "string";
const isTypeObject = (obj: any) => typeof obj == "object" && !Array.isArray(obj);
const isTypeListOfStrings = (obj: any) => Array.isArray(obj) && obj.every((e) => typeof e == "string");

export const validateConfig = (config: any) => {
  const errors: string[] = [];

  if (hasKey(config, "include") && !isTypeListOfStrings(config.include)) {
    errors.push("'include' must be a list of strings");
  }

  if (hasKey(config, "exclude") && !isTypeListOfStrings(config.exclude)) {
    errors.push("'exclude' must be a list of strings");
  }

  if (hasKey(config, "discover_existing") && !isTypeBoolean(config.discover_existing)) {
    errors.push("'discover_existing' must be a boolean");
  }

  if (hasKey(config, "title") && !isTypeBoolean(config.title) && !isTypeString(config.title)) {
    errors.push("'title' must be a boolean or string");
  }

  if (
    hasKey(config, "time_step") &&
    (!isTypeNumber(config.time_step) || Number(config.time_step) < 1 || Number(config.time_step) > 30)
  ) {
    errors.push("'time_step' must be a number between 1 and 30");
  }

  if (hasKey(config, "show_header_toggle") && !isTypeBoolean(config.show_header_toggle)) {
    errors.push("'show_header_toggle' must be a boolean");
  }

  if (hasKey(config, "show_add_button") && !isTypeBoolean(config.show_add_button)) {
    errors.push("'show_add_button' must be a boolean");
  }

  if (hasKey(config, "display_options")) {
    if (!isTypeObject(config.display_options)) {
      errors.push("'display_options' must be a struct");
    } else {
      if (
        hasKey(config.display_options, "primary_info") &&
        !isTypeString(config.display_options.primary_info) &&
        !isTypeListOfStrings(config.display_options.primary_info)
      ) {
        errors.push("in 'display_options': 'primary_info' must be a string or list of strings");
      }

      if (
        hasKey(config.display_options, "secondary_info") &&
        !isTypeString(config.display_options.secondary_info) &&
        !isTypeListOfStrings(config.display_options.secondary_info)
      ) {
        errors.push("in 'display_options': 'secondary_info' must be a string or list of strings");
      }

      if (
        hasKey(config.display_options, "icon") &&
        (!isTypeString(config.display_options.icon) || !["action", "entity"].includes(config.display_options.icon))
      ) {
        errors.push("in 'display_options': 'icon' must be a set to either 'action' or 'entity' ");
      }
    }
  }
  if (hasKey(config, "sort_by") && !isTypeString(config.sort_by) && !isTypeListOfStrings(config.sort_by)) {
    errors.push("'sort_by' must be a string or list of strings");
  }

  if (hasKey(config, "customize") && !isTypeObject(config.customize)) {
    errors.push("'customize' must be a struct");
  } else if (hasKey(config, "customize")) {
    const customizeErrors = Object.entries(config.customize)
      .map(([key, val]) => validateCustomConfig(key, val))
      .filter(isDefined);
    if (customizeErrors.length) errors.push(...customizeErrors);
  }
  if (hasKey(config, "tags") && !isTypeString(config.tags) && !isTypeListOfStrings(config.tags)) {
    errors.push("'tags' must be a string or list of strings");
  }

  if (hasKey(config, "exclude_tags") && !isTypeString(config.tags) && !isTypeListOfStrings(config.tags)) {
    errors.push("'exclude_tags' must be a string or list of strings");
  }
  if (errors.length) {
    throw new Error(
      `Invalid configuration provided (${errors.length} error${errors.length > 1 ? "s" : ""}): ${errors.join(", ")}.`
    );
  }
  return config;
};

const validateCustomConfig = (key: string, val: any) => {
  //TBD: complete validation for customize input
  if (!isTypeObject(val)) {
    return `'In customize, ${key}' must be a struct`;
  }
  if (hasKey(val, "states")) {
    if (
      !isTypeListOfStrings(val.states) &&
      (!isTypeObject(val.states) ||
        !(
          hasKey(val.states, "min") &&
          isTypeNumber(val.states.min) &&
          hasKey(val.states, "max") &&
          isTypeNumber(val.states.max)
        ))
    ) {
      return `In 'customize' [${key}].states' must be a list of strings or a range of numbers`;
    }
  }
  return;
};
