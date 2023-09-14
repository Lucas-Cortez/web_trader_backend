import { ProfileEntity } from "core/domain/entities/profile";

export interface ProfileRepository {
  getProfilesBySymbol(symbol: string): Promise<ProfileEntity[]>;
}
