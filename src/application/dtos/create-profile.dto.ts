import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const createProfileSchema = z
  .object({
    name: z.string(),
    interval: z.string(),
    symbol: z.string(),
    userId: z.string(),
    quantity: z.number().positive(),
    strategiesIds: z.array(z.string().nonempty("must be an id")).nonempty("must contain strategies ids"),
    stopLoss: z.coerce.number().min(0).max(100).default(0),
    stopEnable: z.boolean().default(false),
  })
  .refine((v) => !(v.stopEnable && v.stopLoss === 0), {
    message: "must be greater than zero",
    path: ["stopLoss"],
  });

export class CreateProfileDTO extends Dto {
  constructor(
    public readonly name: string,
    public readonly interval: string,
    public readonly symbol: string,
    public readonly userId: string,
    public readonly quantity: number,
    public readonly strategiesIds: string[],
    public readonly stopEnable: boolean,
    public readonly stopLoss: number,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { interval, symbol, strategiesIds, quantity, name, stopEnable, stopLoss } = request.body;
    console.log(request.body);

    super.validate({
      createProfile: createProfileSchema.safeParse({
        name,
        interval,
        symbol,
        userId: user?.id,
        strategiesIds,
        quantity,
        stopEnable,
        stopLoss,
      }),
    });

    return new CreateProfileDTO(
      name,
      interval,
      symbol,
      user?.id || "",
      quantity,
      strategiesIds,
      stopEnable,
      stopLoss,
    );
  }
}
