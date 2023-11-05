import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const deleteProfileSchema = z.object({
  userId: z.string(),
  profileId: z.string(),
});

export class UpdateStockUserDto extends Dto {
  constructor(
    public readonly userId: string,
    public readonly profileId: string,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { profileId } = request.params;
    console.log(request.body);

    const zod = deleteProfileSchema.safeParse({
      userId: user?.id,
      profileId,
    });

    super.validate({
      deleteProfile: zod,
    });

    if (!zod.success) return new UpdateStockUserDto("", "");

    return new UpdateStockUserDto(zod.data.userId, zod.data.profileId);
  }
}
