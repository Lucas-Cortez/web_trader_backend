import ms from "ms";
import { v4 as uuid } from "uuid";

export interface IProfile {
  readonly id: string;
  readonly interval: string;
  readonly symbol: string;
  readonly lastTransaction?: Date;
  readonly lastAnalysis?: Date;
  // readonly userId: string;
}

export class ProfileEntity implements IProfile {
  private constructor(
    public id: string,
    public interval: string,
    public symbol: string,
    public lastTransaction?: Date,
    public lastAnalysis?: Date, // public userId: string
  ) {}

  public static restore(profile: IProfile) {
    return new ProfileEntity(
      profile.id,
      profile.interval,
      profile.symbol,
      profile.lastTransaction,
      profile.lastAnalysis,
    );
  }

  public static create(interval: string, symbol: string) {
    return new ProfileEntity(uuid(), interval, symbol);
  }

  public isTimeToAnalyze(timestamp: number) {
    if (!this.lastAnalysis || !this.lastTransaction) return true;

    const lastTransactionSeconds = this.lastTransaction.getTime();

    const nextTransactionSeconds = lastTransactionSeconds + ms(this.interval);

    return timestamp > nextTransactionSeconds;
  }
}
