import { BollingerBands } from "technicalindicators";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

import { AnalysisStrategy, StrategyInput } from "strategies/AnalysisStrategy";
import { Errors } from "enums/errors";
import { number } from "zod";

const PERIOD = 20;

export class BollingerBandsStrategy implements AnalysisStrategy {
  // private calculatedData?: BollingerBandsOutput[];
  private closingPrice?: number;
  private lastBB?: { upper: number; lower: number };

  setAndExecuteAnalysis(input: StrategyInput): void {
    this.closingPrice = input.closingPrice;

    const data = BollingerBands.calculate({
      period: PERIOD,
      values: input.values,
      stdDev: 2,
    });

    const last = data[data.length - 2];

    this.lastBB = { lower: last.lower, upper: last.upper };
  }

  itsTimeToBuy(): boolean {
    if (!this.lastBB || !this.closingPrice)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[BollingerBandsStrategy]: itsTimeToBuy" });

    const decision = this.closingPrice < this.lastBB.upper;

    return decision;
  }

  itsTimeToSell(): boolean {
    if (!this.lastBB || !this.closingPrice)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[BollingerBandsStrategy]: itsTimeToSell" });

    const decision = this.closingPrice > this.lastBB.lower;

    return decision;
  }
}
