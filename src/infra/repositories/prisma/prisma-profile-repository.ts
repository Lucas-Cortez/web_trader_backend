import { PrismaClient } from "@prisma/client";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createWithStrategies(profile: ProfileEntity, userId: string): Promise<ProfileEntity> {
    const data = await this.prismaClient.profile.create({
      data: {
        name: profile.name,
        interval: profile.interval,
        symbol: profile.symbol,
        userId,
        quantity: profile.quantity,
        profilestrategy: {
          createMany: { data: [...profile.strategiesIds.map((id) => ({ strategyId: id }))] },
        },
      },
      include: { profilestrategy: true },
    });

    return ProfileEntity.restore({
      id: data.id,
      name: data.name,
      interval: data.interval,
      symbol: data.symbol,
      quantity: profile.quantity,
      strategiesIds: data.profilestrategy.map((v) => v.strategyId),
    });
  }
}
