import { z } from 'zod';

export const contractDetails = z.object({
  name: z.string(),
  type: z.enum(['TEXT', 'LOCALDATETIME', 'INTEGER', 'BOOLEAN', 'null']),
  multiple: z.boolean(),
  description: z.string(),
});

type Contract = z.infer<typeof contractDetails> & {
  inputs: Contract[];
};
const contractInnerSchema: z.ZodType<Contract> = contractDetails.extend({
  inputs: z.lazy(() => contractInnerSchema.array()),
});

export const contractSchema = z.object({
  inputs: z.lazy(() => contractInnerSchema.array()),
  constraints: z.array(z.any()),
});

const inputSchema = z.object({
  inputs: z.array(
    z.object({
      inputs: z.array(z.unknown()),
      type: z.enum(['TEXT', 'LOCALDATETIME', 'INTEGER', 'BOOLEAN']).nullable(),
      description: z.string().nullable(),
      name: z.string(),
      multiple: z.boolean(),
    })
  ),
  constraints: z.array(z.unknown()).optional(), // You can specify the correct type here
});

export function createDynamicSchema(data: any) {
  const contract = inputSchema.parse(data);
  let schema = z.object({});

  for (const key in contract.inputs) {
    if (contract.inputs.hasOwnProperty(key)) {
      const value = contract.inputs[key];
      const contractType = value.type;
      let type;
      if (contractType === 'TEXT') {
        type = z.string().describe(value.name);
      } else if (contractType === 'INTEGER') {
        type = z.coerce.number().describe(value.name);
      } else if (contractType === 'BOOLEAN') {
        type = z.boolean().describe(value.name);
      } else if (contractType === 'LOCALDATETIME') {
        type = z.coerce.date().describe(value.name);
      }
      // else if (Array.isArray(contractType)) {
      //   type = z.array(z.unknown()).describe(value.name);
      // }
      else if (contractType === 'object' && contractType !== null) {
        type = createDynamicSchema(value);
      } else if (contractType === null) {
        console.log('null', value.inputs);
        let a = { inputs: value.inputs };
        type = createDynamicSchema(a);
        type.describe(value.name);
        console.log(JSON.stringify(type, null, 2));
      } else {
        type = z.unknown();
      }

      schema = schema.extend({ [value.name]: type });
    }
  }

  return schema;
}

export function createConfig(data: any) {
  const contract = inputSchema.parse(data);
  let result = {};
  for (const key in contract.inputs) {
    const value = contract.inputs[key];
    const name = value.name;
    const type = value.type;
    if (!type) {
      result = { ...result, [name]: createConfig(contract.inputs[key]) };
    } else {
      const description = contract.inputs[key].description;
      result = { ...result, [name]: { description: description } };
    }
  }
  console.log(result);
  result = { ...{ defaultValue: ['peopleInput'] } };
  return result;
}
