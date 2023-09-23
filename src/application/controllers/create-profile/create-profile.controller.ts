import { CreateProfileDTO } from "application/dtos/create-profile.dto";
import { CreateProfileUseCase } from "application/use-cases/create-profile";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class CreateProfileController implements Controller {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = CreateProfileDTO.parse(request);

    console.log(dto);

    const data = await this.createProfileUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
