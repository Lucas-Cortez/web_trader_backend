import { KlineData } from "klineData";

const DATA = {
  e: "kline",
  E: 1692463800004,
  s: "BTCBRL",
  k: {
    t: 1692463740000,
    T: 1692463799999,
    s: "BTCBRL",
    i: "1m",
    f: 27179531,
    L: 27179541,
    o: "131743.00000000",
    c: "131739.00000000",
    h: "131758.00000000",
    l: "131739.00000000",
    v: "0.12110000",
    n: 11,
    x: true,
    q: "15954.74888000",
    V: "0.09851000",
    Q: "12978.65192000",
    B: "0",
  },
};

const builder = {
  eventType: { key: "e" },
  eventTime: { key: "E" },
  symbol: { key: "s" },
  candle: {
    key: "k",
    children: {
      startTime: { key: "t" },
      closeTime: { key: "T" },
      symbol: { key: "s" },
      interval: { key: "i" },
      firstTradeId: { key: "f" },
      lastTradeId: { key: "L" },
      openPrice: { key: "o" },
      closePrice: { key: "c" },
      highPrice: { key: "h" },
      lowPrice: { key: "l" },
      baseAssetVolume: { key: "v" },
      numberOfTrades: { key: "n" },
      candleClosed: { key: "x" },
      quoteAssetVolume: { key: "q" },
      buyBaseAssetVolume: { key: "V" },
      buyQuoteAssetVolume: { key: "Q" },
      Ignore: { key: "B" },
    },
  },
};

type Mapper<T> = {
  [K in keyof T]: { key: string; children?: Mapper<T[K]> };
};

function format<T extends Record<string, any>>(builder: Mapper<T>, rawData: Record<string, any>): T {
  const data: Partial<T> = {};

  for (const key in builder) {
    data[key] = builder[key].children
      ? format(builder[key].children!, rawData[builder[key].key])
      : rawData[builder[key].key];
  }

  return data as T;
}

const data = format<KlineData>(builder, DATA);
console.log(data);
