import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const deleteApiKeySchema = z.object({
  userId: z.string(),
});

export class DeleteApiKeyDto extends Dto {
  constructor(public readonly userId: string) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;

    super.validate({
      deleteApiKey: deleteApiKeySchema.safeParse({
        userId: user?.id,
      }),
    });

    return new DeleteApiKeyDto(user?.id || "");
  }
}
