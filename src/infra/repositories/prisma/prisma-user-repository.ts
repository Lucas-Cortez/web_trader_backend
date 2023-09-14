import { PrismaClient } from "@prisma/client";
import { UserEntity } from "core/domain/entities/user";
import { UserRepository } from "core/domain/repositories/user.repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getUserById(id: string): Promise<UserEntity | null> {
    return await this.prismaClient.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaClient.user.findUnique({ where: { email } });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.prismaClient.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        salt: user.salt,
      },
    });
  }
}
