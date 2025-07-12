
export const asArray = <T>(value: T | T[] | readonly T[]) => {
  if (value === undefined || value === null || Array.isArray(value)) {
    return value;
  }
  return [value];
}