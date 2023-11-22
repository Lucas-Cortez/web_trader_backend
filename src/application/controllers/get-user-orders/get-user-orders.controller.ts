import { GetUserOrdersDTO } from "application/dtos/get-user-orders.dto";
import { GetUserOrdersUseCase } from "application/use-cases/get-user-orders";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class GetUserOrdersController extends Controller {
  constructor(private readonly getUserOrdersUseCase: GetUserOrdersUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = GetUserOrdersDTO.parse(request);

    const data = await this.getUserOrdersUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
