import { RegisterUserDTO } from "application/dtos/register-user.dto";
import { RegisterUserUseCase } from "application/use-cases/register-user";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class RegisterUserController extends Controller {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = RegisterUserDTO.parse(request);

    const data = await this.registerUserUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
