import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

type CreateApiKeyInput = { key: string; userId: string };
type CreateApiKeyOutput = { status: string };

export class CreateApiKeyUseCase implements IUseCase<CreateApiKeyInput, CreateApiKeyOutput> {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async execute(input: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
    await this.apiKeyRepository.create(input.key, input.userId);
    return { status: "created" };
  }
}
