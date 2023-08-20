import { Profile } from "@prisma/client";
import { prisma } from "config/prisma";
import ms from "ms";
import { PrismaProfileRepository } from "repositories/implementation/prisma/prismaProfileRepository";
import { filterOrdersUsers } from "utils/helpers/filterOrdersUsers";
import { filterSymbolsAndIntervals } from "utils/helpers/filterSymbolsAndIntervals";
import { KlineDataMapper } from "utils/mappers/KlineDataMapper";

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

export async function analyze() {
  const candleData = KlineDataMapper.mapData(DATA);

  const prismaProfileRepository = new PrismaProfileRepository(prisma);

  const profiles = await prismaProfileRepository.getProfilesBySymbol(
    candleData.symbol
  );

  const orderProfiles = filterOrdersUsers(candleData.eventTime, profiles);
  const uniqueSymbolsAndIntervals = filterSymbolsAndIntervals(orderProfiles);
}
