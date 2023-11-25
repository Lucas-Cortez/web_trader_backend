import { PrismaClient } from "@prisma/client";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

export class PrismaApiKeyRepository implements ApiKeyRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getUserKey(userId: string): Promise<{ key: string; secret: string } | null> {
    const data = await this.prismaClient.apiKey.findFirst({ where: { userId } });
    if (!data) return null;
    return { key: data.key, secret: data.secret };
  }

  async create(api: { key: string; secret: string }, userId: string): Promise<string> {
    await this.prismaClient.$transaction(async (prisma) => {
      const lastKey = await prisma.apiKey.findFirst({ where: { userId } });
      if (lastKey) await prisma.apiKey.delete({ where: { userId } });
      await prisma.apiKey.create({ data: { key: api.key, secret: api.secret, userId } });
    });
    return "created";
  }

  async delete(userId: string): Promise<string> {
    await this.prismaClient.apiKey.delete({ where: { userId } });

    return "deleted";
  }
}
