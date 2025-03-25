import { BooleanSelector, NumberSelector, SelectSelector, Selector, StringSelector } from "../../lib/selector";
import { listSelector } from "./list_selector";
import { numericSelector } from "./numeric_selector";
import { HomeAssistant } from "../../lib/types";
import { computeDomain } from "../../lib/entity";
import { CustomActionConfig, CustomConfig } from "../../types";
import { matchPattern } from "../../lib/patterns";

export const selectorConfig = (service: string, entityId: string | string[] | undefined, field: string, hass: HomeAssistant, customize?: CustomConfig) => {
  const domain = computeDomain(service);
  const entityIds = ['script', 'notify'].includes(domain) ? [service] : [entityId || []].flat();
  let loadedCfg = entityIds.map(e => selectorConfigFromEntity(e, field, hass));
  let selector: Selector | null = mergeSelectors(loadedCfg);

  let customCfg = entityIds.map(e => selectorConfigFromCustomConfig(service, e, field, customize));
  let customSelector: Selector | null = mergeSelectors(customCfg);

  return customSelector || selector;
}

const selectorConfigFromEntity = (entityId: string, field: string, hass: HomeAssistant): Selector | null => {
  const stateObj = Object.keys(hass.states).includes(entityId) ? hass.states[entityId] : null;
  const attr = stateObj?.attributes || {};
  const domain = computeDomain(entityId);
  const searchKey = `${domain}.${field}`;

  switch (searchKey) {
    case 'climate.temperature':
    case 'climate.target_temp_low':
    case 'climate.target_temp_high':
      const isOptional = searchKey == 'climate.temperature' ? ((attr.supported_features || 0) & 2) == 1 : ((attr.supported_features || 0) & 1) == 1;
      return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: attr.target_temp_step, unit_of_measurement: `${hass.config.unit_system.temperature}`, optional: isOptional });
    case 'climate.hvac_mode':
      return listSelector({ options: attr.hvac_modes, translation_key: 'component.climate.entity_component._.state.${value}' });
    case 'climate.preset_mode':
      return listSelector({ options: attr.preset_modes, translation_key: 'state_attributes.climate.preset_mode.${value}' });
    case 'climate.fan_mode':
      return listSelector({ options: attr.fan_modes });
    case 'cover.position':
    case 'cover.tilt_position':
    case 'fan.percentage':
      return numericSelector({ min: 0, max: 100, step: 1, unit_of_measurement: '%' });
    case 'fan.oscillating':
      return <BooleanSelector>{ boolean: {} };
    case 'fan.direction':
      return listSelector({ options: ['forward', 'reverse'], translation_key: 'ui.card.fan.${value}' })
    case 'fan.preset_mode':
      return listSelector({ options: attr.preset_modes });
    case 'humdifier.humidity':
      return numericSelector({ min: attr.min_humidity, max: attr.max_humidity, step: 1, unit_of_measurement: '%' });
    case 'humidity.mode':
      return listSelector({ options: attr.available_modes });
    case 'input_number.value':
    case 'number.value':
      return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit_of_measurement: attr.unit_of_measurement });
    case 'input_select.option':
    case 'select.option':
      return listSelector({ options: attr.options });
    case 'light.brightness':
      return numericSelector({ min: 0, max: 100, step: 1, unit_of_measurement: '%', scale_factor: 2.55 });
    case 'media_player.source':
    case 'notify.title':
      return <StringSelector>{ text: {} };
    case 'notify.message':
      return <StringSelector>{ text: {} };
    case 'water_heater.temperature':
      return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: 0.1, unit_of_measurement: '${hass.config.unit_system.temperature}' });
    case 'water_heater.operation_mode':
      return listSelector({ options: attr.operation_list });
    case 'water_heater.away_mode':
      return <BooleanSelector>{ boolean: {} };
  }

  return null;
}

const selectorConfigFromCustomConfig = (service: string, entityId: string, field: string, customize?: CustomConfig) => {
  const actionConfig: CustomActionConfig[] = Object.entries(customize || {})
    .filter(([a]) => matchPattern(a, [entityId].flat().pop()!))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, b]) => b.actions || [])
    .filter(e => e !== undefined)
    .flat();

  if (actionConfig.length) {
    let res = (actionConfig.map(customConfig => {
      if (customConfig.service != service || !Object.keys(customConfig.variables).includes(field)) return {};
      let variableConfig = customConfig.variables[field];
      if (Object.keys(variableConfig).includes('options')) {
        return listSelector({ options: (variableConfig as any).options.map(e => e.value) });
        //TODO: handle custom name+icon
      } else if (Object.keys(variableConfig).includes('min') && Object.keys(variableConfig).includes('max')) {
        return numericSelector(variableConfig as any);
      } else {
        return <StringSelector>{ text: {} };
      }
    }) as Selector[])
      .filter(e => e !== undefined);
    return mergeSelectors(res);
  }
  return null;
}


const mergeSelectors = (input: (Selector | null)[]) => {
  const isUnique = (input: any[]) => new Set(input).size == 1;

  if (input.some(e => e === null) || !input.length) return null;

  if (input.every(e => e!.hasOwnProperty('select'))) {
    const optionsLists = (input as SelectSelector[]).map(e => e.select!.options).filter(e => e !== undefined) as string[][];
    const commonOptions = optionsLists.length ? optionsLists.reduce((a, b) => a.filter(c => b.includes(c))) : [];
    const translationKeyLists = (input as SelectSelector[]).map(e => e.select!.translation_key).filter(e => e !== undefined) as string[];

    return <SelectSelector>{
      select: {
        options: commonOptions.length ? commonOptions : [],
        translation_key: translationKeyLists.length && isUnique(translationKeyLists) ? translationKeyLists[0] : undefined
      }
    }

  }
  else if (input.every(e => e!.hasOwnProperty('number'))) {
    const minList = (input as NumberSelector[]).map(e => e.number!.min).filter(e => e !== undefined) as number[];
    const maxList = (input as NumberSelector[]).map(e => e.number!.max).filter(e => e !== undefined) as number[];
    const stepList = (input as NumberSelector[]).map(e => e.number!.step).filter(e => e !== undefined) as number[];
    const modeList = (input as NumberSelector[]).map(e => e.number!.mode).filter(e => e !== undefined) as string[];
    const uomList = (input as NumberSelector[]).map(e => e.number!.unit_of_measurement).filter(e => e !== undefined) as string[];
    const optionalList = (input as NumberSelector[]).map(e => e.number!.optional);
    const scaleFactorList = (input as NumberSelector[]).map(e => e.number!.scale_factor).filter(e => e !== undefined) as number[];

    let res = <NumberSelector>{
      number: {
        min: minList.length ? Math.max(...minList) : undefined,
        max: maxList.length ? Math.min(...maxList) : undefined,
        step: stepList.length ? Math.max(...stepList) : undefined,
        mode: modeList.length && isUnique(modeList) ? modeList[0] : undefined,
        unit_of_measurement: uomList.length && isUnique(uomList) ? uomList[0] : undefined,
        optional: optionalList.every(e => e),
        scale_factor: scaleFactorList.length && isUnique(scaleFactorList) ? scaleFactorList[0] : undefined
      }
    };
    return res;
  }
  else if (input.every(e => e!.hasOwnProperty('boolean'))) {
    return <BooleanSelector>{
      boolean: {}
    }
  }
  else if (input.every(e => e!.hasOwnProperty('text'))) {
    return <StringSelector>{
      text: {

      }
    }
  }
  return null;
}