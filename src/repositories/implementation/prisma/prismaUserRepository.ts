import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "repositories/userRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getUsersById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });

    return user;
  }
}
