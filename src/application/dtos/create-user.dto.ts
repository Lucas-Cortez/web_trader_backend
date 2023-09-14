import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { email, emailSchema, name, nameSchema, password, passwordSchema } from "utils/schemas";

export class CreateUserDTO extends Dto {
  constructor(
    public readonly email: email,
    public readonly name: name,
    public readonly password: password,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { email, name, password } = request.body;

    super.validate([
      emailSchema.safeParse(email),
      nameSchema.safeParse(name),
      passwordSchema.safeParse(password),
    ]);

    return new CreateUserDTO(email, name, password);
  }
}
