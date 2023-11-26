import { TradeType } from "@binance/connector-typescript";
import { Trade } from "application/enums/trade";
import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { Order } from "core/domain/entities/order";
import { OrderPayload } from "core/domain/entities/order-payload";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";
import { OrderRepository } from "core/domain/repositories/order.repository";
import { ProfileRepository } from "core/domain/repositories/profile.repository";
import { BrokerService } from "core/domain/services/broker.service";
import { EncryptionService } from "core/domain/services/encryption.service";

type ProcessOrderInput = OrderPayload;
type ProcessOrderOutput = void;

export class ProcessOrderUseCase implements IUseCase<ProcessOrderInput, ProcessOrderOutput> {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly orderRepository: OrderRepository,
    private readonly encryptionService: EncryptionService,
    private readonly brokerService: BrokerService,
  ) {}

  async execute(input: ProcessOrderInput): Promise<ProcessOrderOutput> {
    const data = await this.apiKeyRepository.getUserKey(input.userId);

    if (!data) throw new AppError({ message: "keys are not registred", statusCode: 404 });

    const key = this.encryptionService.decrypt(data.key);
    const secret = this.encryptionService.decrypt(data.secret);

    const processed = await this.brokerService.makeOrder(
      input.symbol,
      input.tradeType,
      input.quantity,
      key,
      secret,
    );

    if (!processed) throw new AppError({ message: "order was not completed", statusCode: 404 });

    const profile = await this.profileRepository.getProfileById(input.profileId, input.userId);

    if (!profile) throw new AppError({ message: "profile not founded", statusCode: 404 });

    const order = Order.create({
      value: input.quantity,
      trade: input.tradeType,
      symbol: input.symbol,
      profileName: profile.name,
      profileId: input.profileId,
    });

    const createdOrder = await this.orderRepository.create(order);

    await this.profileRepository.updateProfile(
      {
        version: profile.version + 1,
        lastOrderTime: createdOrder.createdAt,
        inPosition: createdOrder.trade === Trade.BUY,
        lastOrderClosingPrice: input.closingPrice,
      },
      input.userId,
    );
  }
}
