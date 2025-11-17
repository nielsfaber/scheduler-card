export type Selector = BooleanSelector | NumberSelector | SelectSelector | StringSelector;

export type SelectorTemplate = BooleanSelector | NumberSelectorTemplate | SelectSelectorTemplate | StringSelector;

export enum supportedSelectors {
  Boolean = "boolean",
  Select = "select",
  Number = "number",
  Text = "text",
}

export interface BooleanSelector {
  boolean: {} | null;
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface SelectSelector {
  select: {
    multiple?: boolean;
    custom_value?: boolean;
    mode?: "list" | "dropdown";
    options: readonly string[] | readonly SelectOption[];
    translation_key?: string;
    sort?: boolean;
    reorder?: boolean;
  } | null;
}

export interface SelectSelectorTemplate {
  select: {
    multiple?: boolean;
    custom_value?: boolean;
    mode?: "list" | "dropdown";
    options: string | string[];
    translation_key?: string;
    sort?: boolean;
    reorder?: boolean;
  } | null;
}

export interface NumberSelector {
  number: {
    min?: number;
    max?: number;
    step?: number | "any";
    mode?: "box" | "slider";
    unit?: string;
    optional?: boolean;
    scale_factor?: number;
  } | null;
}

export interface NumberSelectorTemplate {
  number: {
    min?: number | string;
    max?: number | string;
    step?: number | string;
    mode?: "box" | "slider";
    unit_of_measurement?: string;
  } | null;
}

export interface StringSelector {
  text: {
    multiline?: boolean;
    type?:
      | "number"
      | "text"
      | "search"
      | "tel"
      | "url"
      | "email"
      | "password"
      | "date"
      | "month"
      | "week"
      | "time"
      | "datetime-local"
      | "color";
    prefix?: string;
    suffix?: string;
    autocomplete?: string;
    multiple?: true;
  } | null;
}
