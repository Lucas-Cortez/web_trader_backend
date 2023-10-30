import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

type DeleteApiKeyInput = { userId: string };
type DeleteApiKeyOutput = { status: string };

export class DeleteApiKeyUseCase implements IUseCase<DeleteApiKeyInput, DeleteApiKeyOutput> {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async execute(input: DeleteApiKeyInput): Promise<DeleteApiKeyOutput> {
    await this.apiKeyRepository.delete(input.userId);
    return { status: "deleted" };
  }
}
