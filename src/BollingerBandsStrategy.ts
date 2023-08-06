import { BollingerBands } from "technicalindicators";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

import { AnalysisStrategy } from "AnalysisStrategy";
import { Errors } from "errors";

const PERIOD = 20;

type Input = {
  values: number[];
  closingPrice: number;
};

export class BollingerBandsStrategy implements AnalysisStrategy<Input> {
  private calculatedData?: BollingerBandsOutput[];
  private closingPrice?: number;

  setAndExecuteAnalysis(input: Input): void {
    this.closingPrice = input.closingPrice;
    this.calculatedData = BollingerBands.calculate({
      period: PERIOD,
      values: input.values,
      stdDev: 2,
    });
  }

  itIsTimeToBuy(): boolean {
    if (!this.calculatedData || !this.closingPrice)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[BollingerBandsStrategy]: itIsTimeToBuy" });

    const decision = this.closingPrice < this.calculatedData[this.calculatedData.length - 2].upper;
    return decision;
  }

  itIsTimeToSell(): boolean {
    if (!this.calculatedData || !this.closingPrice)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[BollingerBandsStrategy]: itIsTimeToSell" });

    const decision = this.closingPrice > this.calculatedData[this.calculatedData.length - 2].lower;
    return decision;
  }
}
