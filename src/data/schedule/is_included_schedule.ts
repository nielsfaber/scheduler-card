import { Schedule, CardConfig } from "../../types";
import { HomeAssistant } from "../../lib/types";
import { computeDomain } from "../../lib/entity";
import { entityIncludedByConfig } from "../actions/entity_included_by_config";
import { resolveTargetLocal, targetEntities, targetIsDynamic } from "../actions/target";


export const isIncludedSchedule = (schedule: Schedule, config: CardConfig, hass?: HomeAssistant) => {
  let entityList: string[] = [];
  let res = true;

  schedule.entries.forEach(entry => {
    entry.slots.forEach(slot => {
      slot.actions.forEach(action => {
        let entities: string[];
        if (targetIsDynamic(action.target) && hass) {
          // expand areas/floors/labels/devices so include/exclude filters
          // keep working for dynamically targeted schedules
          entities = resolveTargetLocal(hass, action.target, computeDomain(action.service), action.target_filter);
          if (!entities.length) entities = [action.service];
        }
        else entities = targetEntities(action.target).length ? targetEntities(action.target) : [action.service];
        entityList = [...entityList, ...entities];
      })
    })
  });

  if (![...new Set(entityList)].every(entityId => entityIncludedByConfig(entityId, config))) return false;

  //filter items by tags
  const filterTags = [config.tags || []].flat();
  if (filterTags.length) {
    res = false;
    if ((schedule.tags || []).some(e => filterTags.includes(e))) res = true;
    else if (filterTags.includes('none') && !schedule.tags?.length) res = true;
    else if (filterTags.includes('enabled') && schedule.enabled) res = true;
    else if (filterTags.includes('disabled') && !schedule.enabled) res = true;
  }

  //filter items by exclude_tags
  const excludeFilters = [config.exclude_tags || []].flat();
  if (excludeFilters.length && res) {
    if ((schedule.tags || []).some(e => excludeFilters.includes(e))) res = false;
    else if (excludeFilters.includes('none') && !schedule.tags?.length) res = false;
    else if (excludeFilters.includes('enabled') && schedule.enabled) res = false;
    else if (excludeFilters.includes('disabled') && !schedule.enabled) res = false;
  }
  return res;
}