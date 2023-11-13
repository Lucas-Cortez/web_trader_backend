import { ProfileEntity } from "core/domain/entities/profile";

export interface ProfileRepository {
  createWithStrategies(profile: ProfileEntity, userId: string): Promise<ProfileEntity>;
  getProfilesFromUser(userId: string): Promise<ProfileEntity[]>;
  deleteById(id: string, userId: string): Promise<string>;
  getProfileVersion(profileId: string, userId: string): Promise<{ version: number } | null>;
  getProfileById(profileId: string, userId: string): Promise<ProfileEntity | null>;
}
