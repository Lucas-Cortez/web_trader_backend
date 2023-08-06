import WebSocket from "ws";

const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcbrl@kline_1m");

ws.on("message", (data: string) => {
  console.log(JSON.parse(data));
});
