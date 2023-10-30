import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const createApiKeySchema = z.object({
  key: z.string(),
  userId: z.string(),
});

export class CreateApiKeyDto extends Dto {
  constructor(
    public readonly key: string,
    public readonly userId: string,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { key } = request.body;

    super.validate({
      createApiKey: createApiKeySchema.safeParse({
        key,
        userId: user?.id,
      }),
    });

    return new CreateApiKeyDto(key, user?.id || "");
  }
}
