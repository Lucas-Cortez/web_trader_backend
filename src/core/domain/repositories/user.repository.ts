import { UserEntity } from "core/domain/entities/user";

export interface UserRepository {
  getUserById(id: string): Promise<UserEntity | null>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
  update(userId: string, partialUser: Partial<UserEntity>): Promise<UserEntity>;
}
