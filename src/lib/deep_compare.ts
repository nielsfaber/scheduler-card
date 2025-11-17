export const deepCompare = (objA: any, objB: any) => {
  if (typeof objA != typeof objB) return false;
  if (typeof objA === "object" && typeof objB === "object" && objA !== null && objB !== null) {
    const keys = [...new Set([...Object.keys(objA), ...Object.keys(objB)])];
    if (!keys.every((key) => Object.keys(objA).includes(key) && Object.keys(objB).includes(key))) return false;
    return keys.every((key) => deepCompare(objA[key], objB[key]));
  }
  return objA === objB;
};
