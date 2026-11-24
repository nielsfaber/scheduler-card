/** Match exclusion patterns anywhere in an action name, ignoring case. */
export const matchesExcludedAction = (name: string, pattern: string): boolean =>
  name.toLowerCase().includes(pattern.toLowerCase());
