export const capitalizeFirstLetter = (input: string) => {
  const output = input.trim();
  return output.charAt(0).toUpperCase() + output.slice(1);
};
