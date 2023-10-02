import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IProfile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly strategiesIds: string[];
  readonly lastOrder?: Date;
  readonly quantity: number;
}

export class ProfileEntity implements IProfile {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly interval: string,
    public readonly symbol: string,
    public readonly strategiesIds: string[],
    public readonly quantity: number,
    public readonly lastOrder?: Date,
  ) {}

  public static restore(profile: IProfile) {
    return new ProfileEntity(
      profile.id,
      profile.name,
      profile.interval,
      profile.symbol,
      profile.strategiesIds,
      profile.quantity,
      profile.lastOrder,
    );
  }

  public static create(
    name: string,
    interval: string,
    symbol: string,
    strategiesIds: string[],
    quantity: number,
    lastOrder?: Date,
  ) {
    return new ProfileEntity(generateObjectId(), name, interval, symbol, strategiesIds, quantity, lastOrder);
  }
}
