import { Trade } from "application/enums/trade";

export interface BrokerService {
  makeOrder(
    symbol: string,
    tradeType: Trade,
    quantity: number,
    apiKey: string,
    apiSecret: string,
  ): Promise<boolean>;

  getAccount(apiKey: string, apiSecret: string): Promise<any>;
}
