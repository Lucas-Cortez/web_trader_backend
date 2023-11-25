import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";
import { BrokerService } from "core/domain/services/broker.service";
import { EncryptionService } from "core/domain/services/encryption.service";

type CreateApiKeyInput = { key: string; secret: string; userId: string };
type CreateApiKeyOutput = { status: string };

export class CreateApiKeyUseCase implements IUseCase<CreateApiKeyInput, CreateApiKeyOutput> {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly encryptionService: EncryptionService,
    private readonly brokerService: BrokerService,
  ) {}

  async execute(input: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
    const account = await this.brokerService.getAccount(input.key, input.secret);

    if (!account) throw new AppError({ message: "invalid keys", statusCode: 406 });

    const encryptedKey = this.encryptionService.encrypt(input.key);
    const encryptedSecret = this.encryptionService.encrypt(input.secret);

    await this.apiKeyRepository.create({ key: encryptedKey, secret: encryptedSecret }, input.userId);

    return { status: "created" };
  }
}
