import { Dto } from "core/contracts/dto";
import { PaginationOptions } from "core/domain/entities/pagination-options";
import { Request } from "express";
import { z } from "zod";

const getProfileOrdersSchema = z.object({
  userId: z.string(),
  profileId: z.string(),
  options: z
    .object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      startTime: z.coerce.date().optional(),
      endTime: z.coerce.date().optional(),
    })
    .optional(),
});

export class GetProfileOrdersDTO extends Dto {
  constructor(
    public readonly userId: string,
    public readonly profileId: string,
    public readonly options?: PaginationOptions,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { profileId } = request.params;
    const { skip, take, startTime, endTime } = request.query;

    const zod = getProfileOrdersSchema.safeParse({
      userId: user?.id,
      profileId,
      options: {
        skip,
        take,
        startTime,
        endTime,
      },
    });

    super.validate({
      getProfileOrdersSchema: zod,
    });

    if (!zod.success) return new GetProfileOrdersDTO(user?.id || "", profileId);

    return new GetProfileOrdersDTO(user?.id || "", profileId, zod.data.options);
  }
}
