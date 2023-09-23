import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IProfile {
  readonly id: string;
  readonly interval: string;
  readonly symbol: string;
  readonly strategiesIds: string[];
  readonly lastOrder?: Date;
}

export class ProfileEntity implements IProfile {
  private constructor(
    public id: string,
    public interval: string,
    public symbol: string,
    public strategiesIds: string[],
    public lastOrder?: Date,
  ) {}

  public static restore(profile: IProfile) {
    return new ProfileEntity(
      profile.id,
      profile.interval,
      profile.symbol,
      profile.strategiesIds,
      profile.lastOrder,
    );
  }

  public static create(interval: string, symbol: string, strategiesIds: string[], lastOrder?: Date) {
    return new ProfileEntity(generateObjectId(), interval, symbol, strategiesIds, lastOrder);
  }
}
