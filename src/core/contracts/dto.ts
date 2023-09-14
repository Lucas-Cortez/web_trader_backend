import { z } from "zod";

export abstract class Dto {
  protected static validate(values: z.SafeParseReturnType<any, any>[]) {
    if (!values.every((v) => v.success)) throw new Error("create user parse failed");
  }
}
