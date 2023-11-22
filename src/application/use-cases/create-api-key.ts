import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";
import { EncryptionService } from "core/domain/services/encryption.service";

type CreateApiKeyInput = { key: string; secret: string; userId: string };
type CreateApiKeyOutput = { status: string };

export class CreateApiKeyUseCase implements IUseCase<CreateApiKeyInput, CreateApiKeyOutput> {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(input: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
    const encryptedKey = this.encryptionService.encrypt(input.key);
    const encryptedSecret = this.encryptionService.encrypt(input.secret);

    await this.apiKeyRepository.create({ key: encryptedKey, secret: encryptedSecret }, input.userId);

    return { status: "created" };
  }
}
