import { CreateUserDTO } from "application/dtos/create-user.dto";
import { Request, Response } from "express";
import { CreateUserUseCase } from "application/use-cases/create-user";
import { Controller } from "core/contracts/controller";

export class CreateUserController extends Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = CreateUserDTO.parse(request);

    const data = await this.createUserUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
