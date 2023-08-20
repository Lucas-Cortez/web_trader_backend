import { Profile } from "@prisma/client";

export interface ProfileRepository {
  getProfilesBySymbol(symbol: string): Promise<Profile[]>;
}
