import { matchPattern } from "../../lib/patterns";
import { Schedule, CardConfig } from "../../types";


export const isIncludedSchedule = (schedule: Schedule, config: CardConfig) => {
  let entityList: string[] = [];

  schedule.entries.forEach(entry => {
    entry.slots.forEach(slot => {
      slot.actions.forEach(action => {
        let entities = action.target.entity_id ? [action.target.entity_id].flat() : action.service;
        entityList = [...entityList, ...entities];
      })
    })
  });

  return entityList.every(entityId =>
    ((config.include || []).some(e => matchPattern(e, entityId)) ||
      Object.keys(config.customize || {}).some(e => matchPattern(e, entityId))) &&
    !(config.exclude || []).some(e => matchPattern(e, entityId))
  );
}