import { User } from "@prisma/client";

export interface UserRepository {
  getUsersById(id: string): Promise<User | null>;
}
