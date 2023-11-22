import { CreateApiKeyDto } from "application/dtos/create-api-key.dto";
import { CreateApiKeyUseCase } from "application/use-cases/create-api-key";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class CreateApiKeyController extends Controller {
  constructor(private readonly createApiKeyUseCase: CreateApiKeyUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = CreateApiKeyDto.parse(request);

    const data = await this.createApiKeyUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
