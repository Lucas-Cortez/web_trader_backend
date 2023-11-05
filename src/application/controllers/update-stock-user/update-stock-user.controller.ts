import { UpdateStockUserUseCase } from "application/use-cases/update-stock-user";
import { Request, Response } from "express";

export class UpdateStockUserController {
  constructor(private readonly updateStockUserUseCase: UpdateStockUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const data = await this.updateStockUserUseCase({ ...dto });
    return response.status(200).json();
  }
}
