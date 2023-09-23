import { SignInUserDTO } from "application/dtos/sign-in-user.dto";
import { SignInUserUseCase } from "application/use-cases/sign-in-user";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class SignInUserController implements Controller {
  constructor(private readonly signInUserUseCase: SignInUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = SignInUserDTO.parse(request);

    const data = await this.signInUserUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
