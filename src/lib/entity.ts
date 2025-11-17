export const computeEntity = (entityId: string): string => entityId.split(".")[1] || "";

export const computeDomain = (entityId: string): string => entityId.split(".")[0] || "";

export const friendlyName = (entityId: string, attributes?: { [key: string]: any }): string =>
  attributes?.friendly_name === undefined
    ? computeEntity(entityId).replace(/_/g, " ")
    : (attributes?.friendly_name ?? "").toString();
