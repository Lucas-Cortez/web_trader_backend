import { Trade } from "trade";

export function executeOrder(tradeType: Trade, quantity: number, symbol: string) {
  console.log("tradeType", tradeType);
  console.log("quantity", quantity);
  console.log("symbol", symbol);
}
