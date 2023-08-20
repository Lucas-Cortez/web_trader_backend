import { AnalysisStrategy } from "strategies/AnalysisStrategy";
import { Errors } from "enums/errors";
import { RSI } from "technicalindicators";

const PERIOD = 14;
const OVERBOUGHT = 70;
const OVERSOLD = 30;

type Input = { values: number[] };

export class RsiStrategy implements AnalysisStrategy<Input> {
  private lastRsi?: number;

  setAndExecuteAnalysis(input: Input): void {
    const data = RSI.calculate({ values: input.values, period: PERIOD });

    this.lastRsi = data[data.length - 1];
  }

  itIsTimeToBuy(): boolean {
    if (!this.lastRsi)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[RsiStrategy]: itIsTimeToBuy" });

    return this.lastRsi < OVERSOLD;
  }

  itIsTimeToSell(): boolean {
    if (!this.lastRsi)
      throw new Error(Errors.MISSING_ANALYSIS_DATA, { cause: "[RsiStrategy]: itIsTimeToSell" });

    return this.lastRsi > OVERBOUGHT;
  }
}
