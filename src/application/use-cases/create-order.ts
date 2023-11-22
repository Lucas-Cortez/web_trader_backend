import { Trade } from "application/enums/trade";
import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { QueueService } from "core/domain/services/queue.service";

type CreateOrderInput = { tradeType: Trade; quantity: number; symbol: string; userId: string };
type CreateOrderOutput = { status: string };

type QueueInput = {
  order: CreateOrderInput;
};

export class CreateOrderUseCase implements IUseCase<CreateOrderInput, CreateOrderOutput> {
  constructor(private readonly queueService: QueueService<QueueInput>) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    this.queueService.addToQueue("order", { ...input });

    return { status: "processing" };
  }
}
