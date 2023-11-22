import { QueueConsumer } from "./queue-consumer";

export interface Queue<Q = any> {
  readonly key: string;
  readonly queue: Q;
  readonly consumer: QueueConsumer;

  run(): void;
  add(data: any): void;
}
