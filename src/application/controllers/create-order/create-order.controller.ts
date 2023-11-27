import { CreateOrderDTO } from "application/dtos/create-order.dto";
import { CreateOrderUseCase } from "application/use-cases/create-order";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class CreateOrderController extends Controller {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = CreateOrderDTO.parse(request);

    const data = await this.createOrderUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
