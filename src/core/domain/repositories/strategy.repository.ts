import { Strategy } from "../entities/strategy";

export interface StrategyRepository {
  getStrategies(): Promise<Strategy[]>;
}
