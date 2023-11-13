import { GetVersionProfileSummaryDto } from "application/dtos/get-version-profile-summary.dto";
import { GetVersionProfileSummaryUseCase } from "application/use-cases/get-version-profile-summary";
import { Controller } from "core/contracts/controller";
import { Request, Response } from "express";

export class GetVersionProfileSummaryController extends Controller {
  constructor(private readonly getVersionProfileSummaryUseCase: GetVersionProfileSummaryUseCase) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto = GetVersionProfileSummaryDto.parse(request);

    const data = await this.getVersionProfileSummaryUseCase.execute({ ...dto });

    return response.status(200).json(data);
  }
}
