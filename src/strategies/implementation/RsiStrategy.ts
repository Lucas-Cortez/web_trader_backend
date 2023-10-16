import { AnalysisStrategy, StrategyInput } from "strategies/AnalysisStrategy";
import { Errors } from "enums/errors";
import { RSI } from "technicalindicators";

const PERIOD = 14;
const OVERBOUGHT = 70;
const OVERSOLD = 30;

export class RsiStrategy implements AnalysisStrategy {
  private lastRsi?: number;

  setAndExecuteAnalysis(input: StrategyInput): void {
    const data = RSI.calculate({ values: input.values, period: PERIOD });
    this.lastRsi = data[data.length - 1];
  }

  itsTimeToBuy(): boolean {
    if (!this.lastRsi)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[RsiStrategy]: itsTimeToBuy" });

    return this.lastRsi < OVERSOLD;
  }

  itsTimeToSell(): boolean {
    if (!this.lastRsi)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[RsiStrategy]: itsTimeToSell" });

    return this.lastRsi > OVERBOUGHT;
  }
}
