import { Trade } from "application/enums/trade";
import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const createOrderSchema = z.object({
  tradeType: z.nativeEnum(Trade),
  userId: z.string(),
  profileId: z.string(),
  closingPrice: z.coerce.number(),
});

export class CreateOrderDTO extends Dto {
  constructor(
    public readonly tradeType: Trade,
    public readonly userId: string,
    public readonly profileId: string,
    public readonly closingPrice: number,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { profileId } = request.params;
    const { tradeType, closingPrice } = request.body;

    const zod = createOrderSchema.safeParse({
      tradeType,
      userId: user?.id,
      profileId,
      closingPrice,
    });

    super.validate({
      createOrderSchema: zod,
    });

    if (!zod.success) throw new Error("zod");

    const data = zod.data;

    return new CreateOrderDTO(data.tradeType, data.userId, data.profileId, data.closingPrice);
  }
}
