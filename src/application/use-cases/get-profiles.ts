import { IUseCase } from "core/contracts/usecase";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

type GetProfilesInput = { userId: string };
type GetProfilesOutput = ProfileEntity[];

export class GetProfilesUseCase implements IUseCase<GetProfilesInput, GetProfilesOutput> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(input: GetProfilesInput): Promise<GetProfilesOutput> {
    const data = await this.profileRepository.getProfilesFromUser(input.userId);

    return data;
  }
}
