import { processOrderUseCase } from "application/controllers/process-order";
import { ProcessOrderUseCase } from "application/use-cases/process-order";
import { QueueConsumer } from "core/contracts/queue-consumer";
import { OrderPayload } from "core/domain/entities/order-payload";

type OrderConsumerInput = OrderPayload;

export class OrderConsumer implements QueueConsumer<OrderConsumerInput> {
  constructor(private readonly processOrderUseCase: ProcessOrderUseCase) {}

  public async handle(input: OrderConsumerInput): Promise<void> {
    await this.processOrderUseCase.execute({ ...input });
  }
}

export const orderConsumer = new OrderConsumer(processOrderUseCase);
