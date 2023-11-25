import { IUseCase } from "core/contracts/usecase";
import { OrderPayload } from "core/domain/entities/order-payload";
import { QueuePayloads } from "core/domain/entities/queue-payloads";
import { QueueService } from "core/domain/services/queue.service";

type CreateOrderInput = OrderPayload;
type CreateOrderOutput = { status: string };

export class CreateOrderUseCase implements IUseCase<CreateOrderInput, CreateOrderOutput> {
  constructor(private readonly queueService: QueueService<QueuePayloads>) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    this.queueService.addToQueue("order", { ...input });

    return { status: "processing" };
  }
}
