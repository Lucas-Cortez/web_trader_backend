import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { email, emailSchema, name, nameSchema, password, passwordSchema } from "utils/schemas";
import { CreateUserDTO } from "./create-user.dto";
import { z } from "zod";

export const registerUserSchema = z
  .object({
    email: emailSchema,
    name: nameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: "password confirmation is wrong",
  });

export class RegisterUserDTO extends CreateUserDTO {
  public readonly passwordConfirmation: password;

  constructor(email: string, name: string, password: string, passwordConfirmation: string) {
    super(email, name, password);
    this.passwordConfirmation = passwordConfirmation;
  }

  public static parse(request: Request) {
    const { email, name, password, passwordConfirmation } = request.body;

    super.validate({
      register: registerUserSchema.safeParse({ email, name, password, passwordConfirmation }),
    });
    // super.validate({
    //   email: emailSchema.safeParse(email),
    //   name: nameSchema.safeParse(name),
    //   password: passwordSchema.safeParse(password),
    // });

    return new RegisterUserDTO(email, name, password, passwordConfirmation);
  }
}
