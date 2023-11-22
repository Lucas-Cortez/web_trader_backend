import { PaginationOptions } from "core/domain/entities/pagination-options";
import { IUseCase } from "core/contracts/usecase";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";
import { PaginatedOutput } from "core/domain/entities/paginated-output";

type GetUserOrdersInput = { userId: string; options?: PaginationOptions };
type GetUserOrdersOutput = { orders: Order[] } & PaginatedOutput;

export class GetUserOrdersUseCase implements IUseCase<GetUserOrdersInput, GetUserOrdersOutput> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: GetUserOrdersInput): Promise<GetUserOrdersOutput> {
    const data = await this.orderRepository.getUserOrders(input.userId, input.options);
    return data;
  }
}
