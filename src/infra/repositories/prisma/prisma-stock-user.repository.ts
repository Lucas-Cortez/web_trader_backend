import { PrismaClient } from "@prisma/client";
import { StockUser } from "core/domain/entities/stock-user";
import { StockUserRepository } from "core/domain/repositories/stock-user.repository";

export class PrismaStockUserRepository implements StockUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async update(stockUser: Omit<StockUser, "id">, userId: string): Promise<string> {
    await this.prismaClient.stockUser.update({ data: { ...stockUser }, where: { userId } });
    return "updated";
  }
}
