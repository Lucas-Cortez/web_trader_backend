import { Order } from "../entities/order";

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
}