import { DecodedUserToken } from "../entities/token";
import { UserEntity } from "../entities/user";

export interface TokenService {
  verify(token: string): boolean;
  decode(token: string): DecodedUserToken;
  sign(user: UserEntity): { accessToken: string };
}
