import { UpdateStockUserUseCase } from "application/use-cases/update-stock-user";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class UpdateStockUserController extends Controller {
  constructor(private readonly updateStockUserUseCase: UpdateStockUserUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    // const dto =
    // const data = await this.updateStockUserUseCase({ ...dto });
    return response.status(200).json();
  }
}
