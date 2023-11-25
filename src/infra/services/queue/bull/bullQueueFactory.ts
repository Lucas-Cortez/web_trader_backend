import { Consumer } from "queue/contracts/consumer";
import { QueueFactoryBase } from "queue/contracts/factory";
import { QueueOptions } from "queue/contracts/queue-options";
import { BullQueue } from "./bullQueue";

export class BullQueueFactory implements QueueFactoryBase<BullQueue> {
  public createInstance(key: string, consumer: Consumer, options?: QueueOptions): BullQueue {
    return new BullQueue(key, consumer, options);
  }
}
