import { QueueConsumer } from "core/contracts/queue-consumer";
import { PQueueQueue } from "./p-queue-queue";
import { QueueOptions } from "core/contracts/queue-options";
import { QueueFactoryBase } from "core/contracts/queue-factory";

export class PQueueQueueFactory implements QueueFactoryBase<PQueueQueue> {
  public createInstance(key: string, consumer: QueueConsumer, options?: QueueOptions): PQueueQueue {
    return new PQueueQueue(key, consumer, options);
  }
}
