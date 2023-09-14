import { PrismaClient } from "@prisma/client";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getProfilesBySymbol(symbol: string): Promise<ProfileEntity[]> {
    const profiles = await this.prismaClient.profile.findMany({
      where: { symbol },
    });

    return profiles.map((profile) => ProfileEntity.restore({ ...profile }));
  }
}
