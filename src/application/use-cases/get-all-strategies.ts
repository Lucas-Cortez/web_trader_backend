import { IUseCase } from "core/contracts/usecase";
import { Strategy } from "core/domain/entities/strategy";
import { StrategyRepository } from "core/domain/repositories/strategy.repository";

export type GetAllStrategiesInput = void;
export type GetAllStrategiesOutput = Strategy[];

export class GetAllStrategiesUseCase implements IUseCase<GetAllStrategiesInput, GetAllStrategiesOutput> {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async execute(): Promise<GetAllStrategiesOutput> {
    return await this.strategyRepository.getStrategies();
  }
}
