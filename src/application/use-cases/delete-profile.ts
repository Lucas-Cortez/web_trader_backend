import { IUseCase } from "core/contracts/usecase";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

type DeleteProfileInput = {
  profileId: string;
  userId: string;
};
type DeleteProfileOutput = { status: string };

export class DeleteProfileUseCase implements IUseCase<DeleteProfileInput, DeleteProfileOutput> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(input: DeleteProfileInput): Promise<DeleteProfileOutput> {
    await this.profileRepository.deleteById(input.profileId, input.userId);
    return { status: "deleted" };
  }
}
