export interface AnalysisStrategy<I> {
  setAndExecuteAnalysis(input: I): void;
  itIsTimeToBuy(): boolean;
  itIsTimeToSell(): boolean;
}
