import { Trade } from "application/enums/trade";
import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { QueuePayloads } from "core/domain/entities/queue-payloads";
import { ProfileRepository } from "core/domain/repositories/profile.repository";
import { QueueService } from "core/domain/services/queue.service";

type CreateOrderInput = {
  tradeType: Trade;
  userId: string;
  profileId: string;
  closingPrice: number;
};
type CreateOrderOutput = { status: string };

export class CreateOrderUseCase implements IUseCase<CreateOrderInput, CreateOrderOutput> {
  constructor(
    private readonly queueService: QueueService<QueuePayloads>,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const profile = await this.profileRepository.getProfileById(input.profileId, input.userId);

    if (!profile) throw new AppError({ message: "profile does not exist", statusCode: 404 });

    this.queueService.addToQueue("order", {
      closingPrice: input.closingPrice,
      userId: input.userId,
      tradeType: input.tradeType,
      profileId: profile.id,
      symbol: profile.symbol,
      quantity: profile.quantity,
    });

    return { status: "processing" };
  }
}
