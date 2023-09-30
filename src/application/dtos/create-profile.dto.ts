import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const createProfileSchema = z.object({
  interval: z.string(),
  symbol: z.string(),
  userId: z.string(),
  quantity: z.number().positive(),
  strategiesIds: z.array(z.string().nonempty("must be an id")).nonempty("must contain strategies ids"),
});

export class CreateProfileDTO extends Dto {
  constructor(
    public readonly interval: string,
    public readonly symbol: string,
    public readonly userId: string,
    public readonly quantity: number,
    public readonly strategiesIds: string[],
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { interval, symbol, strategiesIds, quantity } = request.body;
    console.log(request.body);

    super.validate({
      createProfile: createProfileSchema.safeParse({
        interval,
        symbol,
        userId: user?.id,
        strategiesIds,
        quantity,
      }),
    });

    return new CreateProfileDTO(interval, symbol, user?.id || "", quantity, strategiesIds);
  }
}
