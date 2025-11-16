export const caseInsensitiveStringCompare = (a: string, b: string) => {
  const stringCompare = (a: string, b: string) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  };

  return stringCompare(a.toLowerCase(), b.toLowerCase());
};
