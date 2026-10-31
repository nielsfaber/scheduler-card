export const isTemplate = (value: any) => {
  return typeof value == 'string' && /\{\{|\{%/.test(value);
};
