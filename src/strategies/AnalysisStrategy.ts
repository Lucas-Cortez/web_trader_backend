export type StrategyInput = { values: number[]; closingPrice: number };

export interface AnalysisStrategy {
  setAndExecuteAnalysis(input: StrategyInput): void;
  itsTimeToBuy(): boolean;
  itsTimeToSell(): boolean;
}
