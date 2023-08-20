type Symbol = { symbol: string; interval: string };

export function filterSymbolsAndIntervals(obj: Symbol[]) {
  const uniqueValuesMap = new Map<string, Symbol>();

  obj.forEach((v) => {
    const key = `${v.interval}-${v.symbol}`;

    if (!uniqueValuesMap.has(key)) uniqueValuesMap.set(key, v);
  });

  return Array.from(uniqueValuesMap.values());
}
