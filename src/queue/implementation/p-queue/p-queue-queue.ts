import { Consumer } from "queue/contracts/consumer";
import { Queue } from "queue/contracts/queue";
import { QueueOptions } from "queue/contracts/queue-options";
import PQueue from "p-queue";

export class PQueueQueue implements Queue<PQueue> {
  key: string;
  queue: PQueue;
  consumer: Consumer;

  constructor(key: string, consumer: Consumer, options?: QueueOptions) {
    this.key = key;
    this.consumer = consumer;

    this.queue = options ? new PQueue({ concurrency: options.concurrency }) : new PQueue();
  }

  run(): void {}

  add(data: any): void {
    this.queue.add(async () => {
      await this.consumer.handle(data);
    });
  }
}
