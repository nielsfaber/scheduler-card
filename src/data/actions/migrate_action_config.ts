import { ServiceCall, Action, EVariableType, ListVariable, LevelVariable } from '../../types';
import { HomeAssistant } from 'custom-card-helpers';
import { importAction } from './import_action';
import { compareActions } from './compare_actions';
import { assignAction } from './assign_action';

export const migrateActionConfig = (
  config: ServiceCall,
  entities: string[],
  actions: Action[],
  hass: HomeAssistant
): ServiceCall[] | null => {
  if (!config) return null;

  const action = importAction(config, hass);
  let match = actions.find(e => compareActions(e, action, true));

  if (!match) return null;

  let output: ServiceCall[] | null = entities.map(e => assignAction(e, match!));

  output = Object.keys(match.variables || {})
    .filter(k => Object.keys(config.service_data || {}).includes(k))
    .reduce((output: ServiceCall[] | null, variable) => {
      if (!output) return output;
      switch (match!.variables![variable].type) {
        case EVariableType.Level:
          //keep the selected level variable while maintaining min/max/step size/scale factor
          const levelVariable = match!.variables![variable] as LevelVariable;
          let val = Number(config.service_data![variable]);
          val = val / levelVariable.scale_factor;
          val = Math.round(val / levelVariable.step) * levelVariable.step;
          val = parseFloat(val.toPrecision(12));
          if (val > levelVariable.max) val = levelVariable.max;
          else if (val < levelVariable.min) val = levelVariable.min;
          val = val * levelVariable.scale_factor;
          val = parseFloat(val.toFixed(2));
          return output.map(e => Object.assign(e, { service_data: { ...e.service_data, [variable]: val } }));

        case EVariableType.List:
          const listVariable = match!.variables![variable] as ListVariable;
          if (listVariable.options.some(e => e.value == config.service_data![variable]))
            //keep the selected list variable if it is in common
            return output.map(e =>
              Object.assign(e, { service_data: { ...e.service_data, [variable]: config.service_data![variable] } })
            );
          else return null;

        case EVariableType.Text:
          //keep the selected text variable
          return output.map(e =>
            Object.assign(e, { service_data: { ...e.service_data, [variable]: config.service_data![variable] } })
          );
        default:
          return output;
      }
    }, output);

  return output;
};
