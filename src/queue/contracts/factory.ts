import { Consumer } from "./consumer";
import { Queue } from "./queue";
import { QueueOptions } from "./queue-options";

export interface QueueFactoryBase<Q extends Queue = Queue> {
  createInstance(key: string, consumer: Consumer, options?: QueueOptions): Q;
}
