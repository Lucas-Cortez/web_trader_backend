import { PrismaClient } from "@prisma/client";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";
import { PaginationOptions } from "core/domain/entities/pagination-options";
import { PaginatedOutput } from "core/domain/entities/paginated-output";
import { Trade } from "application/enums/trade";

const TRADE_MAPPER: Record<string, Trade> = {
  BUY: Trade.BUY,
  SELL: Trade.SELL,
};

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(order: Order, userId: string): Promise<Order> {
    const data = await this.prismaClient.orders.create({ data: { ...order, userId } });

    const newOrder = Order.restore({ ...data, trade: TRADE_MAPPER[order.trade] });

    return newOrder;
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
        orderBy: { createdAt: "desc" },
      }),

      this.prismaClient.orders.count({
        where: { userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
      }),
    ]);

    return {
      orders: orders.map((v) => Order.restore({ ...v, trade: TRADE_MAPPER[v.trade] })),
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
        orderBy: { createdAt: "desc" },
      }),

      this.prismaClient.orders.count({
        where: { profileId, userId, createdAt: { lte: options?.endTime, gte: options?.startTime } },
      }),
    ]);

    return {
      orders: orders.map((v) => Order.restore({ ...v, trade: TRADE_MAPPER[v.trade] })),
      take: options?.take || totalOrders,
      skip: options?.skip || 0,
      total: totalOrders,
    };
  }
}
