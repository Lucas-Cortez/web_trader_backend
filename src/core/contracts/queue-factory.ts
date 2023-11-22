import { QueueConsumer } from "./queue-consumer";
import { Queue } from "./queue";
import { QueueOptions } from "./queue-options";

export interface QueueFactoryBase<Q extends Queue = Queue> {
  createInstance(key: string, consumer: QueueConsumer, options?: QueueOptions): Q;
}
