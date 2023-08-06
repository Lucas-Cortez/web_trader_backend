export type KlineData = {
  eventType: string;
  eventTime: number;
  symbol: string;
  candle: {
    startTime: number;
    closeTime: number;
    symbol: string;
    interval: string;
    firstTradeId: number;
    lastTradeId: number;
    openPrice: string;
    closePrice: string;
    highPrice: string;
    lowPrice: string;
    baseAssetVolume: string;
    numberOfTrades: number;
    candleClosed: boolean;
    quoteAssetVolume: string;
    buyBaseAssetVolume: string;
    buyQuoteAssetVolume: string;
    Ignore: string;
  };
};
