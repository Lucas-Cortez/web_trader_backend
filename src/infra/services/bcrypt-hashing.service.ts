import { compare, hash, genSalt } from "bcrypt";
import { HashingService } from "../../core/domain/services/hashing.service";

export class BcryptHashingService implements HashingService {
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
