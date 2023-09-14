import { v4 as uuid } from "uuid";

export interface IUser {
  id: string;
  email: string;
  name: string;
  salt: string;
  password: string;
}

export class UserEntity implements IUser {
  private constructor(
    public id: string,
    public email: string,
    public name: string,
    public salt: string,
    public password: string,
  ) {}

  public static restore(user: IUser) {
    return new UserEntity(user.id, user.email, user.name, user.salt, user.password);
  }

  public static create(email: string, name: string, salt: string, password: string) {
    return new UserEntity(uuid(), email, name, salt, password);
  }
}
