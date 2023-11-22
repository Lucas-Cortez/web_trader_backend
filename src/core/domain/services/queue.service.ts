import { QueueConsumer } from "core/contracts/queue-consumer";
import { Queue } from "core/contracts/queue";
import { QueueFactoryBase } from "core/contracts/queue-factory";
import { QueueOptions } from "core/contracts/queue-options";

export class QueueService<T extends Record<string, any> = Record<string, any>> {
  private queueFactory: QueueFactoryBase;
  private processes: Map<keyof T, Queue> = new Map();

  constructor(queueFactory: QueueFactoryBase) {
    this.queueFactory = queueFactory;
  }

  public addToQueue<K extends keyof T>(key: K, data: T[K]) {
    const queue = this.processes.get(key);

    if (!queue) throw new Error(`Consumer "${key.toString()}" does not exist`);

    queue.add(data);
  }

  public subscribeConsumer(key: keyof T, consumer: QueueConsumer, options?: QueueOptions) {
    const queue = this.queueFactory.createInstance(key.toString(), consumer, options);

    this.processes.set(key, queue);
  }

  public initializeProcesses() {
    console.log("[QUEUE]: initialized");

    Array.from(this.processes.values()).forEach((process) => process.run());
  }
}

type Queues = {
  email: { name: string };
  order: { price: number };
};

// export const queueService = new QueueService<Queues>(new PQueueQueueFactory());
// export const queueOrchestrator = new QueueOrchestrator(new BullQueueFactory());
