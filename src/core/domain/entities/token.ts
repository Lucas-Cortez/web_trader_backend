import { IUser } from "./user";

export interface DecodedUserToken extends Pick<IUser, "id" | "email">, Record<string, any> {
  name?: string;
}
