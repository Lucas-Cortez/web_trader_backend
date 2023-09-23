import { ProfileEntity } from "core/domain/entities/profile";

export interface ProfileRepository {
  createWithStrategies(profile: ProfileEntity, userId: string): Promise<ProfileEntity>;
}
