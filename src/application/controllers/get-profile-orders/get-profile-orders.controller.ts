import { GetProfileOrdersDTO } from "application/dtos/get-profile-orders.dto";
import { GetProfileOrdersUseCase } from "application/use-cases/get-profile-orders";
import { GetProfilesUseCase } from "application/use-cases/get-profiles";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class GetProfileOrdersController extends Controller {
  constructor(private readonly getProfileOrdersUseCase: GetProfileOrdersUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = GetProfileOrdersDTO.parse(request);

    const data = await this.getProfileOrdersUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
