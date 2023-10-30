import { PrismaClient } from "@prisma/client";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const data = await this.prismaClient.orders.findMany({ where: { userId } });

    return data.map((v) => Order.restore({ ...v }));
  }
}
