import { GetProfilesUseCase } from "application/use-cases/get-profiles";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class GetProfilesController extends Controller {
  constructor(private readonly getProfilesUseCase: GetProfilesUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const data = await this.getProfilesUseCase.execute({ userId: request.user?.id || "" });

    return response.status(200).json(data);
  }
}
