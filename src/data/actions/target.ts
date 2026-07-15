import { HomeAssistant } from "../../lib/types";
import { Action, CardConfig, Target, TargetFilter, TargetKey, TARGET_KEYS } from "../../types";
import { entityIncludedByConfig } from "./entity_included_by_config";
import { computeDomain, friendlyName } from "../../lib/entity";

/** coerce every present target key to a sorted, de-duplicated string[] and
 * drop empty keys; returns undefined for an effectively empty target */
export const normalizeTarget = (target?: Target | null): Target | undefined => {
  if (!target) return undefined;
  let output: Target = {};
  TARGET_KEYS.forEach(key => {
    const value = [target[key] || []].flat().filter(e => e);
    if (value.length) output = { ...output, [key]: [...new Set(value)].sort() };
  });
  return Object.keys(output).length ? output : undefined;
};

export const isEmptyTarget = (target?: Target | null): boolean =>
  normalizeTarget(target) === undefined;

/** target contains device/area/floor/label references whose entity
 * membership is resolved at execution time by the backend */
export const targetIsDynamic = (target?: Target | null): boolean => {
  const normalized = normalizeTarget(target);
  if (!normalized) return false;
  return (<TargetKey[]>['device_id', 'area_id', 'floor_id', 'label_id'])
    .some(key => (normalized[key] || []).length);
};

export const targetEntities = (target?: Target | null): string[] =>
  [(normalizeTarget(target) || {}).entity_id || []].flat();

/** derive the include/exclude patterns to stamp into a schedule from the
 * saving card's configuration (customize keys count as included, matching
 * entityIncludedByConfig); returns undefined when the config imposes no
 * restriction, so unrestricted schedules carry no filter */
export const buildTargetFilter = (config?: { include?: string[], exclude?: string[], customize?: Record<string, any> }): TargetFilter | undefined => {
  if (!config) return undefined;
  const include = [...(config.include || []), ...Object.keys(config.customize || {})];
  const exclude = [...(config.exclude || [])];
  if (!include.length && !exclude.length) return undefined;
  let filter: TargetFilter = {};
  if (include.length) filter = { ...filter, include: [...new Set(include)] };
  if (exclude.length) filter = { ...filter, exclude: [...new Set(exclude)] };
  return filter;
};

const filterAsConfig = (filter?: TargetFilter | null) =>
  ({ include: filter?.include, exclude: filter?.exclude });

/** ask the backend to expand a target into concrete entity IDs, using the
 * same resolve_target() that schedule execution uses */
export const resolveTarget = (hass: HomeAssistant, target: Target, domain?: string, filter?: TargetFilter): Promise<string[]> =>
  hass
    .callWS<{ entities: string[] }>({
      type: 'scheduler/resolve_target',
      target: normalizeTarget(target) || {},
      ...(domain ? { domain: domain } : {}),
      ...(filter ? { target_filter: filter } : {}),
    })
    .then(res => res.entities);

/** client-side approximation of the backend resolution, for synchronous
 * display contexts (card filtering, row icons). Uses hass.entities /
 * hass.devices / hass.areas registry mirrors. */
export const resolveTargetLocal = (hass: HomeAssistant, target?: Target | null, domain?: string, filter?: TargetFilter | null): string[] => {
  const normalized = normalizeTarget(target);
  if (!normalized) return [];

  const entities = (hass as any).entities || {};
  const devices = (hass as any).devices || {};
  const areas = (hass as any).areas || {};

  const explicit = [normalized.entity_id || []].flat();
  const deviceIds = new Set([normalized.device_id || []].flat());
  const areaIds = new Set([normalized.area_id || []].flat());
  const floorIds = new Set([normalized.floor_id || []].flat());
  const labelIds = new Set([normalized.label_id || []].flat());

  Object.values(areas).forEach((area: any) => {
    if (area.floor_id && floorIds.has(area.floor_id)) areaIds.add(area.area_id);
    if ((area.labels || []).some((l: string) => labelIds.has(l))) areaIds.add(area.area_id);
  });
  Object.values(devices).forEach((device: any) => {
    if ((device.labels || []).some((l: string) => labelIds.has(l))) deviceIds.add(device.id);
  });
  const areaDeviceIds = new Set(
    Object.values(devices)
      .filter((device: any) => device.area_id && areaIds.has(device.area_id))
      .map((device: any) => device.id)
  );

  const filterDomain = domain && domain != 'homeassistant' ? domain : undefined;
  const resolved = new Set(explicit);

  Object.values(entities).forEach((entry: any) => {
    if (entry.disabled_by || entry.hidden_by || entry.entity_category) return;
    let include = false;
    if (entry.device_id && deviceIds.has(entry.device_id)) include = true;
    else if (entry.area_id) include = areaIds.has(entry.area_id);
    else if (entry.device_id && areaDeviceIds.has(entry.device_id)) include = true;
    if (!include && (entry.labels || []).some((l: string) => labelIds.has(l))) include = true;
    if (!include) return;
    if (filterDomain && computeDomain(entry.entity_id) != filterDomain) return;
    if (filter && !entityIncludedByConfig(entry.entity_id, filterAsConfig(filter))) return;
    resolved.add(entry.entity_id);
  });

  return [...resolved].sort();
};

/** entities to derive selector configuration and display from: explicit
 * entities for static targets; locally resolved entities (same-domain,
 * enabled, non-diagnostic) for dynamic targets */
export const actionTargetEntities = (hass: HomeAssistant, action: Action): string[] => {
  if (!targetIsDynamic(action.target)) return targetEntities(action.target);
  return resolveTargetLocal(hass, action.target, computeDomain(action.service), action.target_filter);
};

/** representative entity for selector configuration (e.g. min/max of a
 * temperature slider): first explicit entity, else first locally resolved */
export const representativeEntity = (hass: HomeAssistant, action: Action): string | undefined => {
  const explicit = targetEntities(action.target);
  if (explicit.length) return explicit[0];
  if (!targetIsDynamic(action.target)) return undefined;
  const domain = computeDomain(action.service);
  return resolveTargetLocal(hass, action.target, domain, action.target_filter).shift();
};

/** short human-readable description of a target's references, e.g.
 * "Kitchen, First floor, 2 more" — uses registry names where available */
export const describeTarget = (hass: HomeAssistant, target?: Target | null, maxItems = 3): string => {
  const normalized = normalizeTarget(target);
  if (!normalized) return '';

  const areas = (hass as any).areas || {};
  const devices = (hass as any).devices || {};
  const floors = (hass as any).floors || {};

  const names: string[] = [
    ...[normalized.floor_id || []].flat().map(e => floors[e]?.name || e),
    ...[normalized.area_id || []].flat().map(e => areas[e]?.name || e),
    ...[normalized.label_id || []].flat(),
    ...[normalized.device_id || []].flat().map(e => devices[e]?.name_by_user || devices[e]?.name || e),
    ...[normalized.entity_id || []].flat().map(e => hass.states[e] ? friendlyName(e, hass.states[e].attributes) : e),
  ];

  if (names.length <= maxItems) return names.join(', ');
  return [...names.slice(0, maxItems), `+${names.length - maxItems}`].join(', ');
};
