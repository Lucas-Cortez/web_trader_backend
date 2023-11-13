import { Profile } from "@prisma/client";
import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IProfile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly inPosition: boolean;
  readonly strategiesIds: string[];
  readonly lastOrderTime?: Date;
  readonly lastOrderClosingPrice?: number;
  readonly version: number;
  readonly quantity: number;
  readonly stopLoss: number;
  readonly stopEnable: boolean;
}

export class ProfileEntity implements IProfile {
  public readonly id: string;
  public readonly name: string;
  public readonly interval: string;
  public readonly symbol: string;
  public readonly inPosition: boolean;
  public readonly strategiesIds: string[];
  public readonly quantity: number;
  public readonly lastOrderTime?: Date;
  public readonly lastOrderClosingPrice?: number;
  public readonly stopLoss: number;
  public readonly version: number;
  public stopEnable: boolean;

  private constructor(profile: IProfile) {
    this.id = profile.id;
    this.name = profile.name;
    this.interval = profile.interval;
    this.symbol = profile.symbol;
    this.inPosition = profile.inPosition;
    this.strategiesIds = profile.strategiesIds;
    this.quantity = profile.quantity;
    this.lastOrderTime = profile.lastOrderTime;
    this.lastOrderClosingPrice = profile.lastOrderClosingPrice;
    this.version = profile.version;
    this.stopLoss = profile.stopLoss;
    this.stopEnable = profile.stopEnable;
  }

  public static restore(profile: IProfile) {
    return new ProfileEntity({ ...profile });
  }

  public static create(profile: Omit<IProfile, "id" | "inPosition" | "version">) {
    return new ProfileEntity({ id: generateObjectId(), ...profile, inPosition: false, version: 1 });
  }
}
