import { CreateApiKeyDto } from "application/dtos/create-api-key.dto";
import { DeleteApiKeyDto } from "application/dtos/delete-api-key.dto";
import { DeleteApiKeyUseCase } from "application/use-cases/delete-api-key";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class DeleteApiKeyController extends Controller {
  constructor(private readonly deleteApiKeyUseCase: DeleteApiKeyUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = DeleteApiKeyDto.parse(request);

    const data = await this.deleteApiKeyUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
