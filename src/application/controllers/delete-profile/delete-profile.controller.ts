import { DeleteProfileDTO } from "application/dtos/delete-profile.dto";
import { DeleteProfileUseCase } from "application/use-cases/delete-profile";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class DeleteProfileController extends Controller {
  constructor(private readonly deleteProfileUseCase: DeleteProfileUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = DeleteProfileDTO.parse(request);

    const data = await this.deleteProfileUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
