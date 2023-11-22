import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";

type ProcessOrderInput = {};
type ProcessOrderOutput = {};

export class ProcessOrderUseCase implements IUseCase<ProcessOrderInput, ProcessOrderOutput> {
  constructor() {}

  async execute(input: ProcessOrderInput): Promise<ProcessOrderOutput> {
    throw new Error("Method not implemented.");
  }
}
