import { PaginationOptions } from "core/domain/entities/pagination-options";
import { IUseCase } from "core/contracts/usecase";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";
import { PaginatedOutput } from "core/domain/entities/paginated-output";

type GetProfileOrdersInput = { profileId: string; userId: string; options?: PaginationOptions };
type GetProfileOrdersOutput = { orders: Order[] } & PaginatedOutput;

export class GetProfileOrdersUseCase implements IUseCase<GetProfileOrdersInput, GetProfileOrdersOutput> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: GetProfileOrdersInput): Promise<GetProfileOrdersOutput> {
    const data = await this.orderRepository.getProfileOrders(input.profileId, input.userId, input.options);
    return data;
  }
}
