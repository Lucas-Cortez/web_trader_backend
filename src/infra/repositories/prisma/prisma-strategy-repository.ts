import { PrismaClient } from "@prisma/client";
import { Strategy } from "core/domain/entities/strategy";
import { StrategyRepository } from "core/domain/repositories/strategy.repository";

export class PrismaStrategyRepository implements StrategyRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getStrategies(): Promise<Strategy[]> {
    const data = await this.prismaClient.strategy.findMany();

    return data.map((v) => new Strategy(v.id, v.tag, v.name, v.title, v.description));
  }
}
