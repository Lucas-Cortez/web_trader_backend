import { ZodError, z } from "zod";

export abstract class Dto {
  protected static validate(values: Record<string, z.SafeParseReturnType<any, any>>) {
    // console.log(values);

    Object.entries(values).forEach(([k, v]) => {
      if (!v.success) {
        // console.log({ [k]: v.error.formErrors });
        console.log(v.error.formErrors);

        throw new Error(`[${k}]: ${v.error.formErrors.formErrors[0]}`);
      }
    });
  }
}
