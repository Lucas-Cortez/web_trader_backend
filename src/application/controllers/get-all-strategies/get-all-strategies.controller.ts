import { GetAllStrategiesUseCase } from "application/use-cases/get-all-strategies";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class GetAllStrategiesController extends Controller {
  constructor(private readonly getAllStrategiesUseCase: GetAllStrategiesUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const data = await this.getAllStrategiesUseCase.execute();

    return response.status(200).json(data);
  }
}
