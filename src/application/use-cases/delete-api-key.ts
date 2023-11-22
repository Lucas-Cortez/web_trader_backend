import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

type DeleteApiKeyInput = { userId: string };
type DeleteApiKeyOutput = { status: string };

export class DeleteApiKeyUseCase implements IUseCase<DeleteApiKeyInput, DeleteApiKeyOutput> {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(input: DeleteApiKeyInput): Promise<DeleteApiKeyOutput> {
    const profiles = await this.profileRepository.getProfilesFromUser(input.userId);

    if (profiles.length) throw new AppError({ statusCode: 406, message: "profiles existing" });

    await this.apiKeyRepository.delete(input.userId);
    return { status: "deleted" };
  }
}
