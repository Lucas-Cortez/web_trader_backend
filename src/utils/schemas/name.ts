import { z } from "zod";

export const nameSchema = z.string();
export type name = z.infer<typeof nameSchema>;
