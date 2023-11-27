import { Trade } from "application/enums/trade";
import { BrokerService } from "core/domain/services/broker.service";
import { OrderStatus, OrderType, Side, Spot } from "@binance/connector-typescript";
import axios from "axios";

const side = {
  [Trade.BUY]: Side.BUY,
  [Trade.SELL]: Side.SELL,
};

export class BinanceBrokerService implements BrokerService {
  // private readonly baseUrl = "https://testnet.binance.vision";
  // private readonly baseUrl = process.env.BROKER_API_URL;
  private readonly baseUrl = process.env.FRONT_END_URL + "/api";

  private clientFactory(apiKey: string, apiSecret: string) {
    return new Spot(apiKey, apiSecret, { baseURL: this.baseUrl });
  }

  async getAccount(apiKey: string, apiSecret: string): Promise<any> {
    // const client = this.clientFactory(apiKey, apiSecret);

    try {
      const params = new URLSearchParams({ key: apiKey, secret: apiSecret });
      console.log(params);

      // const account = await client.accountInformation();

      const account = await axios.get(`${this.baseUrl}/broker/account?${params.toString()}`);
      console.log(account);

      return account;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async makeOrder(
    symbol: string,
    tradeType: Trade,
    quantity: number,
    apiKey: string,
    apiSecret: string,
  ): Promise<boolean> {
    const client = this.clientFactory(apiKey, apiSecret);

    console.log({ apiKey, apiSecret });

    try {
      const response = await client.testNewOrder(symbol, side[tradeType], OrderType.MARKET, { quantity });
      console.log(response);

      if (!(response.status === OrderStatus.FILLED)) return false;

      return true;
    } catch (error) {
      console.log(error);

      if (error instanceof Error) console.log(error.message);

      return false;
    }
  }
}
