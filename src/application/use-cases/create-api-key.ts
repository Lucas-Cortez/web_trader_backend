import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

type CreateApiKeyInput = { key: string; secret: string; userId: string };
type CreateApiKeyOutput = { status: string };

export class CreateApiKeyUseCase implements IUseCase<CreateApiKeyInput, CreateApiKeyOutput> {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async execute(input: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
    await this.apiKeyRepository.create({ key: input.key, secret: input.secret }, input.userId);
    return { status: "created" };
  }
}
