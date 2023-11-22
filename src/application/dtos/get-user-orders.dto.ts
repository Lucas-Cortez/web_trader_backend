import { Dto } from "core/contracts/dto";
import { PaginationOptions } from "core/domain/entities/pagination-options";
import { Request } from "express";
import { z } from "zod";

const getUserOrdersSchema = z.object({
  userId: z.string(),
  options: z
    .object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      startTime: z.coerce.date().optional(),
      endTime: z.coerce.date().optional(),
    })
    .optional(),
});

export class GetUserOrdersDTO extends Dto {
  constructor(
    public readonly userId: string,
    public readonly options?: PaginationOptions,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { profileId } = request.params;
    const { skip, take, startTime, endTime } = request.query;

    const zod = getUserOrdersSchema.safeParse({
      userId: user?.id,
      options: {
        skip,
        take,
        startTime,
        endTime,
      },
    });

    super.validate({
      getUserOrdersSchema: zod,
    });

    if (!zod.success) return new GetUserOrdersDTO(user?.id || "");

    return new GetUserOrdersDTO(user?.id || "", zod.data.options);
  }
}
