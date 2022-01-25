import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { AsArray, capitalize, getLocale, PrettyPrintName, unique } from '../../helpers';
import { localize } from '../../localize/localize';
import { standardIcon } from '../../standard-configuration/standardIcon';
import { Action, CardConfig, Schedule } from '../../types';
import { compareActions } from '../actions/compare_actions';
import { computeActions } from '../actions/compute_actions';
import { computeActionDisplay } from '../actions/compute_action_display';
import { importAction } from '../actions/import_action';
import { parseEntity } from '../entities/parse_entity';
import { computeDaysDisplay } from './compute_days_display';
import { computeTimeDisplay } from './compute_time_display';

export const computeScheduleHeader = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  const primaryInfo = AsArray(
    !config.display_options || !config.display_options.primary_info
      ? '{entity}: {action}'
      : config.display_options.primary_info
  );
  return primaryInfo.map(e => computeItemDisplay(e, schedule, config, hass));
};

export const computeScheduleInfo = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  const primaryInfo = AsArray(
    !config.display_options || !config.display_options.secondary_info
      ? ['relative-time', 'additional-tasks']
      : config.display_options.secondary_info
  );
  return primaryInfo.map(e => computeItemDisplay(e, schedule, config, hass));
};

export const computeScheduleIcon = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  if (config.display_options && config.display_options.icon && config.display_options.icon == 'entity') {
    const entities = computeEntities(schedule, config, hass);
    return unique(entities.map(e => e.icon)).length == 1 ? entities[0].icon : standardIcon(entities[0].id, hass);
  } else {
    const action = computeAction(schedule, config, hass);
    return action.icon;
  }
};

const computeItemDisplay = (
  displayItem: string,
  schedule: Schedule,
  config: CardConfig,
  hass: HomeAssistant
): string => {
  switch (displayItem) {
    case 'default':
      return (
        computeItemDisplay('name', schedule, config, hass) ||
        `${computeItemDisplay('entity', schedule, config, hass)}: ${computeItemDisplay(
          'action',
          schedule,
          config,
          hass
        )}`
      );
    case 'name':
      return schedule.name || '';
    case 'relative-time':
      return `<my-relative-time></my-relative-time>`;
    case 'additional-tasks':
      return schedule.timeslots.length > 1
        ? '+' +
            localize(
              'ui.panel.overview.additional_tasks',
              getLocale(hass),
              '{number}',
              String(schedule.timeslots.length - 1)
            )
        : '';
    case 'time':
      return capitalize(computeTimeDisplay(schedule.timeslots[schedule.next_entries[0]], hass));
    case 'days':
      return capitalize(computeDaysDisplay(schedule.weekdays, hass));
    case 'entity':
      const entities = computeEntities(schedule, config, hass);
      const entityDomains = unique(entities.map(e => computeDomain(e.id)));

      return entities.length == 1
        ? capitalize(PrettyPrintName(entities[0].name || ''))
        : entityDomains.length == 1
        ? `${entities.length}x ${localize(`domains.${entityDomains[0]}`, getLocale(hass)) || entityDomains[0]}`
        : `${entities.length}x entities`;
    case 'action':
      const action = computeAction(schedule, config, hass);
      return capitalize(computeActionDisplay(action));
    case 'tags':
      return (schedule.tags || []).map(e => `<tag>${e}</tag>`).join('');
    default:
      const regex = /\{([^\}]+)\}/;
      let res;
      while ((res = regex.exec(displayItem))) {
        displayItem = displayItem.replace(res[0], String(computeItemDisplay(String(res[1]), schedule, config, hass)));
      }
      return displayItem;
  }
};

export const computeAction = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  const nextEntry = schedule.timeslots[schedule.next_entries[0]];

  const match = computeActions(nextEntry.actions[0].entity_id || nextEntry.actions[0].service, hass, config)
    .filter(e => compareActions(e, nextEntry.actions[0], true))
    .reduce((_acc: Action | undefined, e) => e, undefined);

  return match
    ? {
        ...match,
        service_data: {
          ...match.service_data,
          ...Object.entries(nextEntry.actions[0].service_data || {})
            .filter(([k]) => Object.keys(match.variables || {}).includes(k))
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}),
        },
      }
    : importAction(nextEntry.actions[0], hass);
};

export const computeEntities = (schedule: Schedule, config: CardConfig, hass: HomeAssistant) => {
  const nextEntry = schedule.timeslots[schedule.next_entries[0]];
  const entities = unique(nextEntry.actions.map(e => e.entity_id || e.service)).map(e => parseEntity(e, hass, config));
  return entities;
};
