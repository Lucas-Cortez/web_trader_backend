import { IUser } from "./user";

export interface UserWithKey extends IUser {
  hasKey: boolean;
}
