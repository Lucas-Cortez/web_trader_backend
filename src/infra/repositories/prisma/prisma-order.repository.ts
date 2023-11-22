import { PrismaClient } from "@prisma/client";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";
import { PaginationOptions } from "core/domain/entities/pagination-options";
import { PaginatedOutput } from "core/domain/entities/paginated-output";

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(order: Order): Promise<Order> {
    console.log(order);
    throw new Error("Method not implemented.");
  }

  async getUserOrders(
    userId: string,
    options?: PaginationOptions,
  ): Promise<{ orders: Order[] } & PaginatedOutput> {
    const [orders, totalOrders] = await this.prismaClient.$transaction([
      this.prismaClient.orders.findMany({
        where: { userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
        take: options?.take,
        skip: options?.skip,
      }),

      this.prismaClient.orders.count({
        where: { userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
      }),
    ]);

    return {
      orders: orders.map((v) => Order.restore({ ...v })),
      take: options?.take || totalOrders,
      skip: options?.skip || 0,
      total: totalOrders,
    };
  }

  async getProfileOrders(
    profileId: string,
    userId: string,
    options?: PaginationOptions | undefined,
  ): Promise<{ orders: Order[] } & PaginatedOutput> {
    const [orders, totalOrders] = await this.prismaClient.$transaction([
      this.prismaClient.orders.findMany({
        where: { profileId, userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
        take: options?.take,
        skip: options?.skip,
      }),

      this.prismaClient.orders.count({
        where: { profileId, userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
      }),
    ]);

    return {
      orders: orders.map((v) => Order.restore({ ...v })),
      take: options?.take || totalOrders,
      skip: options?.skip || 0,
      total: totalOrders,
    };
  }
}
