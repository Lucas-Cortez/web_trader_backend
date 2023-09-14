import { BollingerBands, RSI } from "technicalindicators";

const PERIOD = 14;

const bbInput = {
  period: PERIOD,
  values: [
    48.16, 48.61, 48.75, 48.63, 48.74, 49.03, 49.07, 49.32, 49.91, 50.13, 49.53, 49.5, 49.75, 50.03, 50.31,
    50.52, 50.41, 49.34, 49.37, 50.23, 49.24, 49.93, 48.43, 48.18, 46.57, 45.41, 47.77, 47.72, 48.62, 47.85,
  ],
  stdDev: 2,
};

const bb = BollingerBands.calculate(bbInput);

console.log(bb);
console.log(bb.length);
console.log(bbInput.values.length);

const rsiInput = {
  values: [
    127.75, 129.02, 132.75, 145.4, 148.98, 137.52, 147.38, 139.05, 137.23, 149.3, 162.45, 178.95, 200.35,
    221.9, 243.23, 243.52, 286.42, 280.27, 277.35, 269.02, 263.23, 214.9,
  ],
  period: PERIOD,
};

const rsi = RSI.calculate(rsiInput);

console.log(rsi);
console.log(rsi.length);
console.log(rsiInput.values.length);
