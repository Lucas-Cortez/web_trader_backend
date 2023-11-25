import { Trade } from "application/enums/trade";

export interface OrderPayload {
  tradeType: Trade;
  quantity: number;
  symbol: string;
  userId: string;
  profileId: string;
  closingPrice: number;
}
