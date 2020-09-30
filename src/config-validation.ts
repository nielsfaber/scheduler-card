
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
import { default as ConfigSchema } from './config-schema.json';
import { IsReservedGroupName } from "./group";


export function ValidateConfig(config: any) {
  let result = ajv.validate(ConfigSchema, config);
  let errors: string[] = [];

  if (!result) {
    ajv.errors!.forEach(e => {
      let output = "";
      let path = e.dataPath.substr(1).split('/');
      let item = path.pop();

      if (path.length) output += `in ${path.join('/')} `;
      if (e.keyword == 'type') output += 'type of ';
      if (!item) output += 'card ';
      else if (item) output += `${isNaN(+item) ? `'${item}'` : `[item ${item}]`} `;
      output += e.message;

      if (e.params.hasOwnProperty("additionalProperty")) output += ` '${e.params['additionalProperty']}'`;
      errors.push(`${output.charAt(0).toUpperCase() + output.slice(1)}.`);
    });
  }

  if (config.groups && Array.isArray(config.groups)) {
    config.groups.forEach(group => {
      if (group.name && typeof group.name == "string") {
        if (IsReservedGroupName(group.name)) errors.push(`Group '${group.name}' is a reserved group.`);
      }
    });
  }

  if (errors.length) {
    throw new Error(`Invalid configuration provided (${errors.length} error(s)). ${errors.join(` `)}`);
  }
}