import { Consumer } from "queue/contracts/consumer";
import { QueueFactoryBase } from "queue/contracts/factory";
import { QueueOptions } from "queue/contracts/queue-options";
import { PQueueQueue } from "./p-queue-queue";

export class PQueueQueueFactory implements QueueFactoryBase<PQueueQueue> {
  public createInstance(key: string, consumer: Consumer, options?: QueueOptions): PQueueQueue {
    return new PQueueQueue(key, consumer, options);
  }
}
