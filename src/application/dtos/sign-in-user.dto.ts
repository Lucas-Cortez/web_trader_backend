import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { email, emailSchema, password, passwordSchema } from "utils/schemas";

export class SignInUserDTO extends Dto {
  constructor(
    public readonly email: email,
    public readonly password: password,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { email, password } = request.body;

    super.validate({
      email: emailSchema.safeParse(email),
      password: passwordSchema.safeParse(password),
    });

    return new SignInUserDTO(email, password);
  }
}
