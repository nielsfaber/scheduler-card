import { SelectSelector } from "../../lib/selector";

export const listSelector = (input: { options: string[] | any, translation_key?: string }): SelectSelector => {

  let cfg: SelectSelector = {
    select: {
      options: Array.isArray(input.options) ? input.options : [],
    }
  }
  if (input.translation_key) cfg = { ...cfg, select: { ...cfg.select!, translation_key: input.translation_key } }

  return cfg;
}
