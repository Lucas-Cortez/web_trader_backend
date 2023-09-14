import { compare, hash, genSalt } from "bcrypt";
import { HashingProvider } from "../../core/domain/providers/hashing.provider";

export class BcryptHashingProvider implements HashingProvider {
  async hash(data: string, salt: string) {
    return await hash(data, salt);
  }

  async compare(data: string, encrypted: string) {
    if (!data || !encrypted) {
      return false;
    }

    return await compare(data, encrypted);
  }

  async generateSalt(rounds?: number) {
    return await genSalt(rounds);
  }
}
