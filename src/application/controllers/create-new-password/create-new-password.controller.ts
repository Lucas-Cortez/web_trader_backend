import { CreateNewPasswordDto } from "application/dtos/create-new-password.dto";
import { CreateNewPasswordUseCase } from "application/use-cases/create-new-password";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class CreateNewPasswordController extends Controller {
  constructor(private readonly createNewPasswordUseCase: CreateNewPasswordUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = CreateNewPasswordDto.parse(request);

    const data = await this.createNewPasswordUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
