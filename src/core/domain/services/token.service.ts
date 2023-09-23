import { UserEntity } from "../entities/user";

type DecodedUserToken = any;

export interface TokenService {
  verify(token: string): boolean;
  decode(token: string): DecodedUserToken;
  sign(user: UserEntity): { accessToken: string };
}
