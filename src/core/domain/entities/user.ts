import { generateObjectId } from "utils/helpers/generateObjectId";

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
    return new UserEntity(generateObjectId(), email, name, salt, password);
  }
}
