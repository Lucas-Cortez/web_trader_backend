// import * as fs from "fs";
// import * as csv from "csv-parser";
// import * as talib from "talib"; // You'll need to install the TypeScript definitions for the 'talib' library.
// import * as config from "./infra/config"; // Assuming you have a separate config file with constants.

// let closes: number[] = [];
// let in_position: boolean = false;
// let stopReference: number = 0;

// function order(side: string, quantity: number, symbol: string): boolean {
//   // Implement your order function here.
//   // The function should execute a buy/sell order and return true if the order is successful, false otherwise.
//   return false;
// }

// function on_message(ws: any, message: string) {
//   const csvfile = fs.createWriteStream("KlineFiles/historicalKline_1.csv");
//   const candlestick_writer = csv.write({ delimiter: "," });

//   const candlestick: any[] = []; // Replace 'any' with a more specific type for candlestick data.

//   for (const candle of candlestick) {
//     candle[0] = candle[0] / 1000;
//     candlestick_writer.write(candle);
//     closes.push(candle[4]);
//   }

//   csvfile.end();

//   const my_data = fs.createReadStream("KlineFiles/historicalKline_1.csv").pipe(csv());

//   const hClose: number[] = my_data.map((row: any) => parseFloat(row[4]));

//   const { upBand, lwBand } = talib.BBANDS(hClose, config.BB_PERIOD, config.LWBB_MULT, config.UPBB_MULT);

//   const rsi: number[] = talib.RSI(hClose, config.RSI_PERIOD);

//   const last_rsi: number = rsi[rsi.length - 1];

//   const json_message = JSON.parse(message);
//   const candle = json_message["k"];
//   const is_candle_closed = candle["x"];
//   const close = candle["c"];

//   const stopWin = stopReference + stopReference * config.STOP_WIN;
//   const stopLoss = stopReference - stopReference * config.STOP_LOSS;

//   if (is_candle_closed) {
//     if (last_rsi > config.RSI_OVERBOUGHT && close > upBand[upBand.length - 2]) {
//       if (in_position) {
//         const order_succeeded = order("SELL", config.TRADE_QUANTITY1, config.TRADE_SYMBOL1);

//         if (order_succeeded) {
//           in_position = false;
//           stopReference = 0;
//         }
//       }
//     } else if (close > stopWin || close < stopLoss) {
//       if (in_position) {
//         const order_succeeded = order("SELL", config.TRADE_QUANTITY1, config.TRADE_SYMBOL1);

//         if (order_succeeded) {
//           in_position = false;
//           stopReference = 0;
//         }
//       }
//     }

//     if (last_rsi < config.RSI_OVERSOLD && close < lwBand[lwBand.length - 2]) {
//       if (!in_position) {
//         const order_succeeded = order("BUY", config.TRADE_QUANTITY1, config.TRADE_SYMBOL1);

//         if (order_succeeded) {
//           stopReference = close;
//           in_position = true;
//         }
//       }
//     }
//   }
// }
