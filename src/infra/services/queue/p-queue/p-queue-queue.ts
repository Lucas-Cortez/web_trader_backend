import { Queue } from "core/contracts/queue";
import { QueueConsumer } from "core/contracts/queue-consumer";
import { QueueOptions } from "core/contracts/queue-options";
import PQueue from "p-queue";

export class PQueueQueue implements Queue<PQueue> {
  key: string;
  queue: PQueue;
  consumer: QueueConsumer;

  constructor(key: string, consumer: QueueConsumer, options?: QueueOptions) {
    this.key = key;
    this.consumer = consumer;

    this.queue = new PQueue({ concurrency: options?.concurrency || Infinity });
    // this.queue = options ? new PQueue({ concurrency: options.concurrency }) : new PQueue();
  }

  run(): void {}

  add(data: any): void {
    this.queue.add(async () => {
      await this.consumer.handle(data);
    });
  }
}
