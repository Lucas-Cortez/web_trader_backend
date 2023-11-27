import { PaginationOptions } from "core/domain/entities/pagination-options";
import { Order } from "../entities/order";
import { PaginatedOutput } from "../entities/paginated-output";

export interface OrderRepository {
  create(order: Order, userId: string): Promise<Order>;
  getUserOrders(userId: string, options?: PaginationOptions): Promise<{ orders: Order[] } & PaginatedOutput>;
  getProfileOrders(
    profileId: string,
    userId: string,
    options?: PaginationOptions,
  ): Promise<{ orders: Order[] } & PaginatedOutput>;
}
