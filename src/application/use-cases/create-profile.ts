import { IUseCase } from "core/contracts/usecase";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

type CreateProfileInput = {
  name: string;
  interval: string;
  symbol: string;
  quantity: number;
  strategiesIds: string[];
  userId: string;
};
type CreateProfileOutput = ProfileEntity;

export class CreateProfileUseCase implements IUseCase<CreateProfileInput, CreateProfileOutput> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(input: CreateProfileInput): Promise<CreateProfileOutput> {
    const profileEntity = ProfileEntity.create(
      input.name,
      input.interval,
      input.symbol,
      input.strategiesIds,
      input.quantity,
    );

    const profile = await this.profileRepository.createWithStrategies(profileEntity, input.userId);

    return profile;
  }
}
