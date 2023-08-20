import { Trade } from "enums/trade";

export function executeOrder(tradeType: Trade, quantity: number, symbol: string) {
  console.log("tradeType", tradeType);
  console.log("quantity", quantity);
  console.log("symbol", symbol);
}
