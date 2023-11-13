import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const createNewPasswordSchema = z.object({
  key: z.string(),
  secret: z.string(),
  userId: z.string(),
});

export class CreateNewPasswordDto extends Dto {
  constructor(
    public readonly oldPassword: string,
    public readonly newPassword: string,
    public readonly userId: string,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { oldPassword, newPassword } = request.body;

    super.validate({
      createApiKey: createNewPasswordSchema.safeParse({
        oldPassword,
        newPassword,
        userId: user?.id,
      }),
    });

    return new CreateNewPasswordDto(oldPassword, newPassword, user?.id || "");
  }
}
