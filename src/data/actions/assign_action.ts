import { Action, EVariableType, LevelVariable, ListVariable, ServiceCall, TextVariable } from "../../types";



export const assignAction = (entity_id: string, action: Action) => {
  let output: ServiceCall = {
    entity_id: entity_id,
    service: action.service,
    service_data: { ...action.service_data }
  };

  Object.entries(action.variables || {}).forEach(([key, config]) => {
    const serviceArgs = Object.keys(output.service_data || {});
    if (serviceArgs.includes(key)) return;

    if (config.type == EVariableType.Level) {
      config = config as LevelVariable;
      output = {
        ...output,
        service_data: {
          ...output.service_data,
          [key]: config.min || 0
        }
      };
    }
    else if (config.type == EVariableType.List) {
      config = config as ListVariable;
      output = {
        ...output,
        service_data: {
          ...output.service_data,
          [key]: config.options.length
            ? config.options[0].value
            : undefined
        }
      };
    }
    else if (config.type == EVariableType.Text) {
      config = config as TextVariable;
      output = {
        ...output,
        service_data: {
          ...output.service_data,
          [key]: ''
        }
      };
    }
  });

  return output;
}