import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IUser {
  id: string;
  email: string;
  name: string;
  // hasKey: boolean;
  salt: string;
  password: string;
}

export class UserEntity implements IUser {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly salt: string;
  public readonly password: string;
  // public readonly hasKey: boolean;

  private constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.salt = user.salt;
    this.password = user.password;
    // this.hasKey = user.hasKey;
  }

  public static restore(user: IUser) {
    return new UserEntity(user);
  }

  public static create(user: Omit<IUser, "id">) {
    return new UserEntity({ id: generateObjectId(), ...user });
  }
}
