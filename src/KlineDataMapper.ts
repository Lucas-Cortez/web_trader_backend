import { KlineData } from "KlineData";

export class KlineDataMapper {
  public static mapData(data: any): KlineData {
    return {
      eventType: data.e,
      eventTime: data.E,
      symbol: data.s,
      candle: {
        startTime: data.k.t,
        closeTime: data.k.T,
        symbol: data.k.s,
        interval: data.k.i,
        firstTradeId: data.k.f,
        lastTradeId: data.k.L,
        openPrice: data.k.o,
        closePrice: data.k.c,
        highPrice: data.k.h,
        lowPrice: data.k.l,
        baseAssetVolume: data.k.v,
        numberOfTrades: data.k.n,
        candleClosed: data.k.x,
        quoteAssetVolume: data.k.q,
        buyBaseAssetVolume: data.k.V,
        buyQuoteAssetVolume: data.k.Q,
        Ignore: data.k.B,
      },
    };
  }
}
