import { PrismaClient, Profile } from "@prisma/client";
import { ProfileRepository } from "repositories/profileRepository";

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getProfilesBySymbol(symbol: string): Promise<Profile[]> {
    const profiles = await this.prismaClient.profile.findMany({
      where: { symbol },
    });

    return profiles;
  }
}
