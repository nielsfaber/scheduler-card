export const sortByName = (nameA: string, nameB: string) => {
  const stringCompare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  return stringCompare(nameA.toLowerCase(), nameB.toLowerCase());
};