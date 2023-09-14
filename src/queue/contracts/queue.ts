import { Consumer } from "./consumer";

export interface Queue<Q = any> {
  readonly key: string;
  readonly queue: Q;
  readonly consumer: Consumer;

  run(): void;
  add(data: any): void;
}
