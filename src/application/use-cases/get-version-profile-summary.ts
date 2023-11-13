import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

type GetVersionProfileSummaryInput = { profileId: string; version: number; userId: string };
type GetVersionProfileSummaryOutput = ProfileEntity | null;

export class GetVersionProfileSummaryUseCase
  implements IUseCase<GetVersionProfileSummaryInput, GetVersionProfileSummaryOutput>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(input: GetVersionProfileSummaryInput): Promise<GetVersionProfileSummaryOutput> {
    const data = await this.profileRepository.getProfileVersion(input.profileId, input.userId);

    if (!data) throw new AppError({ message: "version does not exist", statusCode: 400 });

    if (data.version <= input.version) return null;

    const profile = await this.profileRepository.getProfileById(input.profileId, input.userId);

    if (!profile) throw new AppError({ message: "profile does not exist", statusCode: 400 });

    return profile;
  }
}
