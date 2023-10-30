import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IProfile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly inPosition: boolean;
  readonly strategiesIds: string[];
  readonly lastOrder?: Date;
  readonly quantity: number;
}

export class ProfileEntity implements IProfile {
  public readonly id: string;
  public readonly name: string;
  public readonly interval: string;
  public readonly symbol: string;
  public readonly inPosition: boolean;
  public readonly strategiesIds: string[];
  public readonly quantity: number;
  public readonly lastOrder?: Date;

  private constructor(profile: IProfile) {
    this.id = profile.id;
    this.name = profile.name;
    this.interval = profile.interval;
    this.symbol = profile.symbol;
    this.inPosition = profile.inPosition;
    this.strategiesIds = profile.strategiesIds;
    this.quantity = profile.quantity;
    this.lastOrder = profile.lastOrder;
  }

  public static restore(profile: IProfile) {
    return new ProfileEntity({ ...profile });
  }

  public static create(profile: Omit<IProfile, "id" | "inPosition">) {
    return new ProfileEntity({ id: generateObjectId(), ...profile, inPosition: false });
  }
}
