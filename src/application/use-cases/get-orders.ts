import { IUseCase } from "core/contracts/usecase";
import { Order } from "core/domain/entities/order";
import { OrderRepository } from "core/domain/repositories/order.repository";

type GetOrdersInput = { userId: string };
type GetOrdersOutput = Order[];

export class GetOrdersUseCase implements IUseCase<GetOrdersInput, GetOrdersOutput> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: GetOrdersInput): Promise<GetOrdersOutput> {
    const data = await this.orderRepository.getUserOrders(input.userId);
    return data;
  }
}
