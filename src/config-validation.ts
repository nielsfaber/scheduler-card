
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, jsonPointers: true });

const ConfigSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    style: {},
    discover_existing: { type: "boolean" },
    standard_configuration: { type: "boolean" },
    title: { type: ["boolean", "string"] },
    am_pm: { type: "boolean" },
    time_step: { type: "integer", minimum: 1, maximum: 60 },
    domains: {
      type: "object",
      additionalProperties: {
        type: ["object", "null", "boolean"],
        properties: {
          icon: { type: "string" },
          actions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                icon: { type: "string" },
                name: { type: "string" },
                service: { type: "string" },
                service_data: { type: "object" },
                variable: {
                  type: "object",
                  oneOf: [
                    {
                      properties: {
                        field: { type: "string" },
                        name: { type: "string" },
                        unit: { type: "string" },
                        min: { type: "number", minimum: 0 },
                        max: { type: "number", minimum: 1 },
                        step: { type: "number", minimum: 0.1 },
                        optional: { type: "boolean" },
                      },
                      required: ['field'],
                      additionalProperties: false
                    },
                    {
                      properties: {
                        field: { type: "string" },
                        name: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              value: { type: "string" },
                              name: { type: "string" },
                              icon: { type: "string" },
                            },
                            required: ["value"],
                            additionalProperties: false
                          },
                        },
                      },
                      required: ["field"],
                      additionalProperties: false
                    }
                  ],
                }
              },
              required: ["service"],
              additionalProperties: false
            },
          },
          include: {
            type: "array",
            "items": { type: "string" }
          },
          exclude: {
            type: "array",
            "items": { type: "string" }
          }
        },
        additionalProperties: false
      }
    },
    entities: {
      type: "object",
      additionalProperties: {
        type: ["object", "null", "boolean"],
        properties: {
          name: { type: "string" },
          icon: { type: "string" },
          actions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                icon: { type: "string" },
                name: { type: "string" },
                service: { type: "string" },
                service_data: { type: "object" },
                variable: {
                  type: "object",
                  oneOf: [
                    {
                      properties: {
                        field: { type: "string" },
                        name: { type: "string" },
                        unit: { type: "string" },
                        min: { type: "number", minimum: 0 },
                        max: { type: "number", minimum: 1 },
                        step: { type: "number", minimum: 0.1 },
                        optional: { type: "boolean" },
                      },
                      required: ['field'],
                      additionalProperties: false
                    },
                    {
                      properties: {
                        field: { type: "string" },
                        name: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              value: { type: "string" },
                              name: { type: "string" },
                              icon: { type: "string" },
                            },
                            required: ["value"],
                            additionalProperties: false
                          },
                        },
                      },
                      required: ["field"],
                      additionalProperties: false
                    }
                  ],
                }
              },
              required: ["service"],
              additionalProperties: false
            },
          }
        },
        additionalProperties: false
      }
    },
    groups: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          icon: { type: "string" },
          entities: { type: "array", items: { type: "string" } },
          domains: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
        oneOf: [
          {
            required: ["entities"]
          },
          {
            required: ["domains"]
          }
        ]
      }
    }
  },
  additionalProperties: false
}

export function ValidateConfig(config: any) {
  let result = ajv.validate(ConfigSchema, config);

  if (!result) {
    let errors = ajv.errors!.map(e => {
      let output = "";
      let path = e.dataPath.substr(1).split('/');
      let item = path.pop();

      if (path.length) output += `in ${path.join('/')} `;
      if (e.keyword == 'type') output += 'type of ';
      if (!item) output += 'card ';
      else if (item) output += `${isNaN(+item) ? `'${item}'` : `[item ${item}]`} `;
      output += e.message;

      if (e.params.hasOwnProperty("additionalProperty")) output += ` '${e.params['additionalProperty']}'`;
      return `${output.charAt(0).toUpperCase() + output.slice(1)}.`;
    });

    throw new Error(`Invalid configuration provided. ${errors.join(` //////////////////////////////////// `)}`);
  }
}