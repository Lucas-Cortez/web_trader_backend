import { PrismaClient } from "@prisma/client";
import { ProfileEntity } from "core/domain/entities/profile";
import { ProfileRepository } from "core/domain/repositories/profile.repository";

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getProfilesFromUser(userId: string): Promise<ProfileEntity[]> {
    const data = await this.prismaClient.profile.findMany({
      where: { userId },
      include: { profilestrategy: true },
    });

    return data.map(({ profilestrategy, lastOrderTime, lastOrderClosingPrice, ...rest }) =>
      ProfileEntity.restore({
        ...rest,
        lastOrderTime: lastOrderTime || undefined,
        lastOrderClosingPrice: lastOrderClosingPrice || undefined,
        strategiesIds: profilestrategy.map((v) => v.strategyId),
      }),
    );
  }

  async createWithStrategies(profile: ProfileEntity, userId: string): Promise<ProfileEntity> {
    const data = await this.prismaClient.profile.create({
      data: {
        userId,
        name: profile.name,
        interval: profile.interval,
        symbol: profile.symbol,
        inPosition: profile.inPosition,
        quantity: profile.quantity,
        stopEnable: profile.stopEnable,
        stopLoss: profile.stopLoss,
        version: profile.version,
        profilestrategy: {
          createMany: { data: [...profile.strategiesIds.map((id) => ({ strategyId: id }))] },
        },
      },
      include: { profilestrategy: true },
    });

    const { profilestrategy, lastOrderTime, lastOrderClosingPrice, ...rest } = data;

    return ProfileEntity.restore({
      ...rest,
      lastOrderTime: lastOrderTime || undefined,
      lastOrderClosingPrice: lastOrderClosingPrice || undefined,
      strategiesIds: profilestrategy.map((v) => v.strategyId),
    });
  }

  async deleteById(id: string, userId: string): Promise<string> {
    await this.prismaClient.$transaction([
      this.prismaClient.profileStrategy.deleteMany({ where: { profile: { id, userId } } }),
      this.prismaClient.profile.delete({ where: { id, userId } }),
    ]);

    return "deleted";
  }

  async getProfileVersion(profileId: string, userId: string): Promise<{ version: number } | null> {
    const data = await this.prismaClient.profile.findUnique({
      where: { userId, id: profileId },
      select: { version: true },
    });

    return data;
  }

  async getProfileById(profileId: string, userId: string): Promise<ProfileEntity | null> {
    const data = await this.prismaClient.profile.findUnique({
      where: { userId, id: profileId },
      include: { profilestrategy: true },
    });

    if (!data) return null;

    const { profilestrategy, lastOrderTime, lastOrderClosingPrice, ...rest } = data;

    const profile = ProfileEntity.restore({
      ...rest,
      lastOrderTime: lastOrderTime || undefined,
      lastOrderClosingPrice: lastOrderClosingPrice || undefined,
      strategiesIds: profilestrategy.map((v) => v.strategyId) || [],
    });

    return profile;
  }
}
